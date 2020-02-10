import commander from "commander";
import { failOptionParser } from "./failOptionParser";
import { parseDateOption } from "./parseDateOption";
/**
 *
 * Adds the now option to a command
 */
export const nowOption = (program: commander.Command) =>
  program.option(
    "-n, --now <date>",
    `The current date: (default: Date.now() )`,
    failOptionParser({
      optionName: "-n, --now",
      parser: parseDateOption
    })
  );
export interface INowOptionInput {
  readonly now?: number;
}
