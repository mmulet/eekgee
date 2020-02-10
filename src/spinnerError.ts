import ora from "ora";
/**
 *
 * Fail current spinner and fail on a new error
 * @example
 * spinner.start("Try to do something");
 * spinnerError(spinner)("fail at something")
 * //will print
 * //X Try to do something
 * //X fail at something
 */
export const spinnerError = (spinner: ora.Ora) => (string: string) => {
  if (spinner.text) {
    spinner.fail();
    spinner.text = "";
  }
  spinner.fail(string);
};
