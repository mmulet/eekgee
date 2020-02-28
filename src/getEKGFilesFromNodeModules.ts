import { List, Record, Map } from "immutable";
import { getEKGFileFromPackage } from "./getEKGFileFromPackage";
import { getShouldIgnoreErrorForThisPackage } from "./getShouldIgnoreErrorForThisPackage";
import { neverDefault } from "./neverDefault";
import { ListErrorCollector } from "./ListErrorCollector";
import { IEKG } from "./IEKG";
import { IPackagesInput } from "./IPackagesInput";

export interface Input extends IPackagesInput {
  /**
   * Normally if a package encounters an error. It will stop processing
   * that package. If we ignore errors we will continue the processing
   * as if that package was not found.
   * True to do this for all packages
   * or a list of package names
   */
  readonly ignoreErrors: boolean | string[];
}
/**
 *
 * for the list of packages, Check for a node module
 * with that name, then check the package.json
 * for an eekgee entry. Or check the folder
 * for a ekg file
 */
export const getEKGFilesFromNodeModules = async ({
  packages,
  ignoreErrors
}: Input) => {
  const errors = new ListErrorCollector();
  const resolvedPackages = await Promise.all(
    packages.map((packageName, index) =>
      getEKGFileFromPackage({
        packageName,
        logError: errors.getLogError(index)
      })
    )
  );
  const shouldIgnoreErrorForThisPackage = getShouldIgnoreErrorForThisPackage(
    ignoreErrors
  );
  return resolvedPackages.reduce((result, resolvedPackage, index) => {
    const packageName = packages[index];
    if (resolvedPackage) {
      return result.update("loaded", l => l.set(packageName, resolvedPackage));
    }
    if (resolvedPackage == undefined) {
      return result.update("notFound", n => n.push(packageName));
    }
    if (resolvedPackage === null) {
      if (shouldIgnoreErrorForThisPackage(packageName)) {
        return result.update("notFound", n => n.push(packageName));
      }
      return result.update("errors", e =>
        e.set(packageName, errors.errors[index] ?? List())
      );
    }
    neverDefault(resolvedPackage);
    return result;
  }, new PackagesResult());
};
export interface IPackages {
  readonly loaded: Map</** packageName */ string, IEKG>;
  readonly errors: Map</**packageName */ string, List<string>>;
  readonly notFound: List<string>;
}

export class PackagesResult extends Record<IPackages>({
  loaded: Map(),
  errors: Map(),
  notFound: List()
}) {}
