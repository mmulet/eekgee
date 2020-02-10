import { IEkgFileInput } from "./IEkgFileInput";
import { defaultEkgFilename } from "./defaultEkgFilename";
import { resolve } from "path";
import { ILogString } from "./ILogString";
import { ILogStringError } from "./ILogStringError";
import { IEKGVersion0 } from "./IEKGVersion0";
import { IEKG } from "./IEKG";
import { neverDefault } from "./neverDefault";
import { nextDeadlineDate } from "./nextDeadlineDate";
import { promises } from "fs";

export interface Input extends IEkgFileInput, ILogString, ILogStringError {
  /**
   * @default now
   */
  readonly currentDate?: number;
  readonly readFile?: (path: string) => Promise<Buffer>;
  readonly writeFile?: typeof promises.writeFile;
}
/**
 *
 * Refreshes the .ekg to make sure it's alive
 * Like a beep on an electrocardiogram, the
 * beep lets you know a project is still alive.
 */
export const beep = async ({
  directoryPath,
  logError,
  logString,
  ekgFileName = defaultEkgFilename,
  readFile = promises.readFile,
  writeFile = promises.writeFile,
  currentDate = Date.now()
}: Input) => {
  try {
    const filePath = resolve(directoryPath, ekgFileName);
    logString(`Reading and Parsing ${filePath}`);
    const file = (await readFile(filePath)).toString();
    const ekg: IEKG = JSON.parse(file);
    switch (ekg.version) {
      case "0.0":
        const { commitFrequency } = ekg;
        const newEkg: IEKGVersion0 = {
          ...ekg,
          updateDate: currentDate,
          status: "alive",
          nextCommitDeadlineDate: nextDeadlineDate({
            currentDate,
            numberOfDays: commitFrequency
          })
        };
        logString(`Saving new file`);
        const content = JSON.stringify(newEkg);
        await writeFile(filePath, content);
        return true;
      default:
        neverDefault(ekg.version);
        logError(
          `Unsupported ekg config file version ${ekg.version}. Please update eekgee.`
        );
        return null;
    }
  } catch (err) {
    logError(err.message);
    return null;
  }
};
