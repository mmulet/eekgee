import ora from "ora";
import { init, Input as InitInput } from "./init";
import { OmitStrict } from "./OmitStrict";
import { setTimeout as sT } from "timers";
import { promisify } from "util";
import { defaultEkgFilename } from "./defaultEkgFilename";
import { spinnerLog } from "./spinnerLog";
import { spinnerError } from "./spinnerError";
const setTimeout = promisify(sT);

export interface Input
  extends OmitStrict<InitInput, "logString" | "logError" | "lockTerminal"> {
  readonly spinner?: ora.Ora;
}

export const initWithLog = async ({ spinner = ora(""), ...input }: Input) => {
  const output = await init({
    ...input,
    logString: spinnerLog(spinner),
    logError: spinnerError(spinner),
    lockTerminal: async func => {
      spinner.stop();
      const output = await func();
      spinner.start();
      return output;
    }
  });
  if (spinner.text) {
    output ? spinner.succeed() : spinner.fail();
  }
  return output;
};
