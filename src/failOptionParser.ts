import { OptionParser } from "./OptionParser";
import { errorOption } from "./errorOption";
export interface Input {
  readonly parser: OptionParser;
  readonly optionName: string;
}
/**
 * This logs all options to console.error and quits the process
 * @example
 *  .option("-d, --deadline <date>", `The next commit date`, 
    failOptionParser({
      optionName: "-d, --deadline",
      parser: parseDateOption
    }))
 */
export const failOptionParser = ({ optionName, parser }: Input) =>
  errorOption({
    optionName,
    parser,
    onError: error => {
      console.error(error);
      process.exit(-1);
    }
  });
