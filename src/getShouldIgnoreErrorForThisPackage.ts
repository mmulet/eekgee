import { Input } from "./getHeartBeat";

/**
 *
 * For @see measurePulse
 * gets the function that tells you whether
 * you should ignore an error for a package
 */
export const getShouldIgnoreErrorForThisPackage = (
  ignoreErrors: Input["ignoreErrors"]
): ShouldIgnoreErrors => {
  if (typeof ignoreErrors === "boolean") {
    return ignoreErrors ? alwaysShouldIgnoreErrors : neverShouldIgnoreErrors;
  }
  const set = new Set(ignoreErrors);
  return (packageName: string) => set.has(packageName);
};

export interface ShouldIgnoreErrors {
  (packageName: string): boolean;
}

const alwaysShouldIgnoreErrors: ShouldIgnoreErrors = () => true;
const neverShouldIgnoreErrors: ShouldIgnoreErrors = () => false;
