import { extract, PacoteOptions } from "pacote";
import { ILogStringError } from "./ILogStringError";
import { resolve } from "path";

export interface Input extends ILogStringError {
  readonly packageName: string;
  readonly installFolder: string;
  readonly options?: PacoteOptions;
}
/**
 *
 * Downloads a package to eekgee_modules
 * @Returns true on success If success, null if failure,
 * and undefined if the package is not found
 */
export const downloadPackage = ({
  packageName,
  installFolder,
  options,
  logError
}: Input) =>
  extract(packageName, resolve(installFolder, packageName), options)
    .then(() => true as const)
    .catch(err => {
      if (err.code === "E404") {
        return undefined;
      }
      logError(err.message);
      return null;
    });
