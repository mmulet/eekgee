import commander from "commander";
import {
  ekgFileInputOptions,
  IEKGFileInputOptionInput
} from "./ekgFileInputOptions";
import { nowOption, INowOptionInput } from "./nowOption";
import { beepWithLog } from "./beepWithLog";
import { logOptions, ILogOptionsInput } from "./logOptions";
import { beep } from "./beep";
import { logLevelToLogFunctions } from "./logLevelToLogFunctions";

export interface Input {}
/**
 *
 *  Command line options for the beep command
 */
export const beepCommandLine = (program: commander.Command) => {
  const program1 = program
    .command("beep")
    .description("Beep the ekg to say the project is still alive");
  const program2 = nowOption(program1);
  const program3 = logOptions(program2);
  ekgFileInputOptions(program3).action(
    ({
      chdir,
      fileName,
      now,
      dryRun,
      logLevel
    }: IEKGFileInputOptionInput & INowOptionInput & ILogOptionsInput) => {
      const input = {
        directoryPath: chdir,
        ekgFileName: fileName,
        currentDate: now,
        ...(dryRun
          ? {}
          : {
              writeFile: async () => {}
            })
      };
      if (logLevel === "verbose" || logLevel === "v") {
        beepWithLog(input);
        return;
      }
      const logFuncs = logLevelToLogFunctions(logLevel);
      if (!logFuncs) {
        return;
      }
      beep({
        ...input,
        ...logFuncs
      });
      return;
    }
  );
};
