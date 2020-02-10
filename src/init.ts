import { ILogString } from "./ILogString";
import { promises } from "fs";
import { ILogStringError } from "./ILogStringError";
import { resolve } from "path";
import { ITerminalLockInput } from "./ITerminalLockInput";
import { IEKGVersion0 } from "./IEKGVersion0";
import { defaultEkgFilename } from "./defaultEkgFilename";
import { IEkgFileInput } from "./IEkgFileInput";
import { getDeadlineDateAndFrequency } from "./getDeadlineDateAndFrequency";
import { retry } from "./retry";

export interface Input
  extends ILogString,
    ILogStringError,
    ITerminalLockInput,
    IEkgFileInput {
  /**
   * If the date is not provided. This will prompt the user for a date.
   * @default prompt-user-for-value
   */
  readonly nextCommitDeadlineDate?: number;
  /**
   * The current Date. Used to calculate nextCommitDeadlineDate if
   * nextCommitDeadlineDate is not provided.
   * @default Date.now()
   */
  readonly currentDate?: number;
  /**
   * in days. The number of days will become the deadline
   */
  readonly commitFrequency?: number;

  readonly readdir?: (path: string) => Promise<string[]>;
  readonly writeFile?: typeof promises.writeFile;
}

/**
 *
 * Creates a new .ekg file at current directory.
 * Fails if .ekg file already exists.
 * @returns true on success, null on error or failure
 */
export const init = async ({
  logString,
  directoryPath,
  logError,
  nextCommitDeadlineDate: maybeNextCommitDeadlineDate,
  commitFrequency: maybeCommitFrequency,
  lockTerminal,
  ekgFileName = defaultEkgFilename,
  currentDate = Date.now(),
  readdir = promises.readdir,
  writeFile = promises.writeFile
}: Input): Promise<true | null> => {
  try {
    logString(
      `Looking for conflicting old ${ekgFileName} in current directory`
    );
    const directoryEntries = await readdir(directoryPath);
    {
      const file = directoryEntries.find(name => name === ekgFileName);
      if (file != undefined) {
        logError(`Can not init because ${ekgFileName} already exists`);
        return null;
      }
    }
    const deadlineAndFrequency = await retry(3, () =>
      getDeadlineDateAndFrequency({
        commitFrequency: maybeCommitFrequency,
        nextCommitDeadlineDate: maybeNextCommitDeadlineDate,
        logError,
        lockTerminal,
        currentDate
      })
    );
    if (!deadlineAndFrequency) {
      return null;
    }
    const { nextCommitDeadlineDate, commitFrequency } = deadlineAndFrequency;

    const initialEKGFile: IEKGVersion0 = {
      version: "0.0",
      updateDate: currentDate,
      status: "alive",
      commitFrequency,
      nextCommitDeadlineDate
    };
    logString(`Saving configuration file: ${ekgFileName}`);
    await writeFile(
      resolve(directoryPath, ekgFileName),
      JSON.stringify(initialEKGFile)
    );
    return true;
  } catch (err) {
    logError(err.message);
    return null;
  }
};