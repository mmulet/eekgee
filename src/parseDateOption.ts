/**
 *
 * Parse a date.
 * @example
 * parseDateOption(console.error)("0")
 */
export const parseDateOption = (onError: (error: string) => void) => (
  string: string
) => {
  const intValue = parseInt(string);
  if (isNaN(intValue)) {
    onError(`Could not parse int.`);
    return NaN;
  }
  if (intValue < 0) {
    onError(`Not a valid date`);
    return NaN;
  }
  return intValue;
};
