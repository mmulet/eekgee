import { packageNameToEKGPackageName } from "./packageNameToEKGPackageName";
import { List, Record, Map } from "immutable";
import { downloadPackage } from "./downloadPackage";
import { neverDefault } from "./neverDefault";
import { ListErrorCollector } from "./ListErrorCollector";
import {
  getEKGFilesFromNodeModules,
  PackagesResult
} from "./getEKGFilesFromNodeModules";
import { IPackagesInput } from "./IPackagesInput";

export interface Input extends IPackagesInput {
  /**
   * @default "an absolute path to eekgee_modules"
   *  should be an absolute path
   */
  readonly installFolder: string;
}
/**
 *
 * for the list of packages, check eekgee modules
 * with the same name. IF not found, try to
 * download the package from the repository
 */
export const getEKGFileFromEekgeeModules = async ({
  packages,
  installFolder
}: Input) => {
  const { paths: oldPaths } = module;
  module.paths = [installFolder];
  const packagesToDownload = packages.reduce((result, packageName) => {
    const ekgPackageName = packageNameToEKGPackageName(packageName);
    try {
      require.resolve(ekgPackageName);
      return result;
    } catch (err) {
      return result.push(ekgPackageName);
    }
  }, List<string>());

  const errors = new ListErrorCollector();
  const downloadedPackages = await Promise.all(
    packagesToDownload.map((packageName, index) =>
      /**
       * @todo pass in options
       */
      downloadPackage({
        packageName,
        installFolder,
        logError: errors.getLogError(index)
      })
    )
  );
  const { exist, errors: downloadErrors, notFound } = downloadedPackages.reduce(
    (result, downloadedPackageResult, index) => {
      const packageName = packagesToDownload.get(index)!;
      if (downloadedPackageResult) {
        return result.update("exist", e => e.push(packageName));
      }
      if (downloadedPackageResult === undefined) {
        return result.update("notFound", n => n.push(packageName));
      }
      if (downloadedPackageResult === null) {
        return result.update("errors", e =>
          e.set(packageName, errors.errors[index] ?? List())
        );
      }
      neverDefault(downloadedPackageResult);
      return result;
    },
    new EKGPackages()
  );
  /**
   * This will search install folder because of module.paths = [installFolder]
   */
  const packagesResult = await getEKGFilesFromNodeModules({
    packages: exist.toArray(),
    /**
     * @todo allow ignoring errors here?
     */
    ignoreErrors: false
  });
  /**
   * restore paths
   */
  module.paths = oldPaths;
  /**
   * merge the two results
   */
  return new PackagesResult({
    errors: downloadErrors.merge(packagesResult.errors),
    notFound: notFound.merge(packagesResult.notFound),
    loaded: packagesResult.loaded
  });
};
export interface IEKGPackages {
  readonly exist: List<string>;
  readonly errors: Map</**packageName */ string, List<string>>;
  readonly notFound: List<string>;
}

export class EKGPackages extends Record<IEKGPackages>({
  exist: List(),
  errors: Map(),
  notFound: List()
}) {}
