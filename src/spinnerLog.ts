import ora from "ora";
/**
 *
 * Succeed current spinner and start a new one
 * @example
 * spinner.start("Try to do something")
 * spinnerLog(spinner)("Try to do something else")
 * //will print
 * //${checkMark} Try to do something
 * //${animation} Try do do something else
 */
export const spinnerLog = (spinner: ora.Ora) => (string: string) => {
  if (spinner.text) {
    spinner.succeed();
  }
  spinner.start(string);
};
