/**
 *
 * Retry an async function multiple times.
 * Use for user input. So that if the user
 * makes a mistake, the program doesn't immediately
 * crash and you can try again
 */
export const retry = async <T>(
  numberOfTimes: number,
  func: () => Promise<T | null>
) => {
  for (let i = 0; i < numberOfTimes; i++) {
    try {
      const output = await func();
      if (output != null) {
        return output;
      }
      continue;
    } catch (err) {
      continue;
    }
  }
  return null;
};
