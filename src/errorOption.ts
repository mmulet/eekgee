import { OptionParser } from "./OptionParser";

export interface Input {
  readonly optionName: string;
  readonly onError: (error: string) => void;
  readonly parser: OptionParser;
}

/**
 *
 * Adds the words `Invalid ${optionName} option
 * to a parser error message`
 * @example
 * const test = (parser: OptionParser<any>) => {
 * //Let's say this makes an error message that says
 * //"Does not compute"
 * parser(console.error)("57");
 * //This will make an error message that says:
 * //"Invalid -d, --dentist option
 * //     Does not compute"
 * errorOption({
 *      parser,
 *      onError: console.error,
 *      optionName: "-d, --dentist"
 * })("57")
 * }
 */
export const errorOption = ({ parser, onError, optionName }: Input) =>
  parser((error: string) =>
    onError(`Invalid ${optionName} option.\n\t${error}`)
  );
