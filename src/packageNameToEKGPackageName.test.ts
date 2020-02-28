import { packageNameToEKGPackageName } from "./packageNameToEKGPackageName";
test("non-scoped", () => {
  expect(packageNameToEKGPackageName("left-pad")).toBe("@eekgee/left-pad");
});

test("scoped", () => {
  expect(packageNameToEKGPackageName("@babel/core")).toBe(
    "@eekgee/babel__core"
  );
});
