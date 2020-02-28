import { ILogStringError } from "./ILogStringError";
import {
  getAllPackageEKGFiles,
  Input as GetEKGInput
} from "./getAllPackageEKGFiles";
import { resolve } from "path";

export interface Input
  extends Partial<Pick<GetEKGInput, "ignoreErrors" | "installFolder">>,
    ILogStringError {
  /**
   * The name of the package. The package location
   * will be resolved by nodejs by
   * @example
   * require(`${packageName}/package.json`)
   */
  readonly packageName: string | string[];
}
/**
 *
 * Measures the pulse of a dependency ( to see if it is dead or not)
 */
export const getHeartBeat = async ({
  packageName,
  ignoreErrors = false,
  installFolder = resolve(process.argv0, "eekgee_modules")
}: Input) => {
  /**
   * @todo parse package.json
   * for the dependency list and dependencies' dependencies, etc
   */
  const packages =
    typeof packageName === "string" ? [packageName] : packageName;
  const packageResult = await getAllPackageEKGFiles({
    packages,
    installFolder,
    ignoreErrors
  });
  /**
   * @todo from the result
   * show errors for the erroneous packages.
   * and then parse the ekg file and decided if the package is healthy or not
   */
};
