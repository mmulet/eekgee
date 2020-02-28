import { ILogStringError } from "./ILogStringError";
import { promises } from "fs";

export interface Input extends ILogStringError {
  readonly filePath: string;
}
/**
 *
 * @returns JSON on success, null on error,
 * and undefined if the file does not exist
 */
export const loadJSON = async <T>({
  filePath,
  logError
}: Input): Promise<T | null | undefined> => {
  try {
    const file = (await promises.readFile(filePath)).toString();
    return JSON.parse(file);
  } catch (err) {
    if (err.code == "ENOENT") {
      return undefined;
    }
    logError(`Could not load ${filePath}: ${err}`);
    return null;
  }
};
