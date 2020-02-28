import {
  getEKGFilesFromNodeModules,
  PackagesResult as InnerResult,
  Input as FromNodeModuleInput
} from "./getEKGFilesFromNodeModules";
import {
  getEKGFileFromEekgeeModules,
  Input as FromEekgeeModules
} from "./getEKGFileFromEekgeeModules";
import { Record, List, Map } from "immutable";
import { IEKG } from "./IEKG";
import { IPackagesInput } from "./IPackagesInput";

export interface Input
  extends Pick<FromNodeModuleInput, "ignoreErrors">,
    Pick<FromEekgeeModules, "installFolder">,
    IPackagesInput {}

export const getAllPackageEKGFiles = async ({
  packages,
  ignoreErrors,
  installFolder
}: Input) => {
  const packagesResult = await getEKGFilesFromNodeModules({
    packages,
    ignoreErrors
  });

  const eekgeeResult = await getEKGFileFromEekgeeModules({
    packages: packagesResult.notFound.toArray(),
    installFolder
  });
  /**
   * merge Results
   */
  const newResult = new InnerResult({
    loaded: eekgeeResult.loaded.merge(packagesResult.loaded),
    errors: eekgeeResult.errors.merge(packagesResult.errors),
    /**
     * because getEKGFileFromEekgeeModules uses the notFound
     * from packagesResult, the only items left un-found,
     * are from eekgeeResult
     */
    notFound: eekgeeResult.notFound
  });
  /**
   * @todo for the newResult.notFound use the github
   * api to determine what the ekgFile should be,
   * then create a pull request on the ekg definitions
   * repo. Also, check what the rate limit would be
   * on the github api, and maybe prompt the user
   * to login to github, both the for the rate limit
   * and for the pull request
   */

  return new PackagesResult();
};

export interface IPackagesResult {
  readonly loaded: Map</** packageName */ string, IEKG>;
  readonly errors: Map</**packageName */ string, List<string>>;
}

export class PackagesResult extends Record<IPackagesResult>({
  loaded: Map(),
  errors: Map()
}) {}
