import commander from "commander";
import { LogLevel } from "./LogLevel";
/**
 *
 * Adds a dry option to a command.
 * And a log level option to a command
 */
export const logOptions = (program: commander.Command) =>
  program
    .option("-d, --dry-run", "Preform the operation without saving any changes")
    .option(
      "-l, --log-level <level>",
      "v or verbose : Log with animations.\ns or still   : Log without animations.\nq or quiet   : Only log errors.\ni or silent  : Do not log anything\n_",
      "verbose"
    );

export interface ILogOptionsInput {
  readonly dryRun?: boolean;
  readonly logLevel: LogLevel;
}
