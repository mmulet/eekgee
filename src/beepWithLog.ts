import ora from "ora";
import { beep, Input as BeepInput } from "./beep";
import { OmitStrict } from "./OmitStrict";
import { setTimeout as sT } from "timers";
import { promisify } from "util";
import { IEKGVersion0 } from "./IEKGVersion0";
import { spinnerLog } from "./spinnerLog";
import { spinnerError } from "./spinnerError";
const setTimeout = promisify(sT);

export interface Input extends OmitStrict<BeepInput, "logString" | "logError"> {
  readonly spinner?: ora.Ora;
}

export const beepWithLog = async ({ spinner = ora(""), ...input }: Input) => {
  const output = await beep({
    ...input,
    logString: spinnerLog(spinner),
    logError: spinnerError(spinner)
  });
  if (spinner.text) {
    output ? spinner.succeed() : spinner.fail();
  }
  return output;
};

