import commander from "commander";
import { failOptionParser } from "./failOptionParser";
import { parseDateOption } from "./parseDateOption";
import { initWithLog } from "./initWithLog";
import {
  ekgFileInputOptions,
  IEKGFileInputOptionInput
} from "./ekgFileInputOptions";
import { nowOption, INowOptionInput } from "./nowOption";
import { logOptions, ILogOptionsInput } from "./logOptions";
import { init } from "./init";
import { logLevelToLogFunctions } from "./logLevelToLogFunctions";

/**
 *
 * Command line options for the init command
 * @example
 * initCommandLine(program);
 */
export const initCommandLine = (program: commander.Command) => {
  const program1 = program
    .command("init")
    .description("Create a new configuration file");
  const program2 = ekgFileInputOptions(program1);
  const program3 = logOptions(program2);
  nowOption(program3)
    .option(
      "-d, --deadline <date>",
      `The next commit date`,
      failOptionParser({
        optionName: "-d, --deadline",
        parser: parseDateOption
      })
    )
    .action(
      ({
        chdir,
        fileName,
        deadline,
        now,
        dryRun,
        logLevel
      }: {
        readonly deadline?: number;
      } & IEKGFileInputOptionInput &
        INowOptionInput &
        ILogOptionsInput) => {
        const input = {
          directoryPath: chdir,
          ekgFileName: fileName,
          nextCommitDeadlineDate: deadline,
          currentDate: now,
          ...(dryRun
            ? {}
            : {
                writeFile: async () => {}
              })
        };
        if (logLevel === "verbose" || logLevel === "v") {
          initWithLog(input);
          return;
        }
        const logFuncs = logLevelToLogFunctions(logLevel);
        if (!logFuncs) {
          return;
        }
        init({
          ...input,
          ...logFuncs,
          lockTerminal: f => f()
        });
        return;
      }
    );
};
