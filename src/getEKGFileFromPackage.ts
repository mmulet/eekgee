import { packageNameToPackageJSON } from "./packageNameToPackageJSON";
import { loadJSON } from "./loadJSON";
import { resolve } from "path";
import { defaultEkgFilename } from "./defaultEkgFilename";
import { IEKG } from "./IEKG";
import { ILogStringError } from "./ILogStringError";
export interface Input extends ILogStringError {
  readonly packageName: string;
}
/**
 *
 * Given a package name. Get the ekg file located in
 * that package.
 * @returns the ekg file on success. Null on error,
 * and undefined if the ekg file cannot be found
 */
export const getEKGFileFromPackage = async ({
  packageName,
  logError
}: Input) => {
  const file = await loadJSON<{
    readonly eekgee?: string | IEKG;
  }>({
    filePath: packageNameToPackageJSON(packageName),
    logError
  });
  const packagePath = require.resolve(packageName);
  if (file?.eekgee) {
    if (typeof file.eekgee !== "string") {
      return file.eekgee;
    }
    const result = loadJSON<IEKG>({
      filePath: resolve(packagePath, file.eekgee),
      logError
    });
    /**
     * If the file is not found but the eekgee entry
     * in the package.json exists. Then this is an
     * error rather than a file not found result.
     */
    if (result == undefined) {
      logError(
        `Could not load eekgee file referenced from ${packageName}/package.json`
      );
      return null;
    }
  }
  return await loadJSON<IEKG>({
    filePath: resolve(packageName, defaultEkgFilename),
    logError
  });
};
