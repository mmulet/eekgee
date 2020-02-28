/**
 *  Get the EKG package name from the package name.
 * Convert organization packages just like in Typescript
 * @example
 * //output is "@eekgee/left-pad"
 * packageNameToEKGPackageName({packageName: "left-pad"})
 *
 * //output is "@eekgee/babel__core"
 * packageNameToEKGPackageName({packageName: "@babel/core"})
 */
export const packageNameToEKGPackageName = (packageName: string) =>
  `@eekgee/${packageName.replace(
    /^@([^\/]+)\//g,
    (_, orgName) => `${orgName}__`
  )}`;
