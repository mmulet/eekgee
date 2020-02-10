import commander from "commander";
import { defaultEkgFilename } from "./defaultEkgFilename";

/**
 *
 * Add the options for working directory
 * and fileName
 */
export const ekgFileInputOptions = (program: commander.Command) => {
  program
    .option(
      "-C, --chdir <directory>",
      "Change working directory",
      process.cwd()
    )
    .option(
      "-f, --fileName <name>",
      `The file name of the configuration file. (default: "${defaultEkgFilename}")`
    );
  return program;
};
export interface IEKGFileInputOptionInput {
  readonly chdir: string;
  readonly fileName?: string;
}
