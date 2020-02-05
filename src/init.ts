import { ILogString } from "./ILogString";
import { promises } from "fs";
import { ILogStringError } from "./ILogStringError";
import { resolve } from "path";
import { promptForDeadlineDate } from "./promptForDeadlineDate";

export interface Input extends ILogString, ILogStringError {
  /**
   * File path to current directory in which to init
   */
  readonly directoryPath: string;
  /**
   * optional file name to use instead of .ekg
   * @default .ekg
   */
  readonly ekgFileName?: string;
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
}

/**
 *
 * Creates a new .ekg file at current directory.
 * Fails if .ekg file already exists.
 * @returns {true | null} true on success, null on error or failure
 */
export const init = async ({
  logString,
  directoryPath,
  ekgFileName,
  logError,
  nextCommitDeadlineDate: maybeNextCommitDeadlineDate,
  currentDate = Date.now()
}: Input) => {
  logString("Looking for old .ekg in current directory");
  const directoryEntries = await promises.readdir(directoryPath, {
    withFileTypes: true
  });
  {
    const file = directoryEntries.find(
      ({ name }) => name === (ekgFileName ?? ".ekg")
    );
    if (file != undefined) {
      logError("Can not init because file already exists");
      return null;
    }
  }
  const nextCommitDeadlineDate =
    maybeNextCommitDeadlineDate ??
    (await promptForDeadlineDate({
      currentDate
    }));
  //   promises.writeFile(resolve(directoryPath, ekgFileName));
};
