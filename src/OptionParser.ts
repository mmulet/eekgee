/**
 * A type that takes in a function that reports/handles
 * errors. and returns a parser.
 * @example
 * const p : OptionParser = (onError) => (string) => {
 *      const num = parseInt(string);
 *      if(isNaN(num)){
 *          onError(`Not a number`)
 *          return 0;
 *      }
 *      return num;
 * }
 * const five = p(console.error)("5")
 */
export type OptionParser = (
  onError: (error: string) => void
) => (string: string) => any;
