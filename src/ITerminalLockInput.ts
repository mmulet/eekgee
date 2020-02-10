/**
 * The command line interface uses a package that
 * takes ownership of the terminal. If two functions
 * uses the terminal at the same time, errors occur.
 * To prevent this, use this mutex to ensure that only
 * one function uses the terminal at a time.
 *
 * If you are calling a function that takes in a terminalLock,
 * but you are not currently using the terminal, it's safe to
 * pass in a no-op. You only need this if you are using
 * ora, inquirer or similar before you call a function that
 * uses this input.
 * @example
 *
 * const funcThatNeedsTheLock = (input: ITerminalLockInput) => {
 *    //...
 * }
 * 
 * //This func needs a lock because we use ora
 * const func1 = () => {
 *  const spinner = ora("Hello world");
 *  funcThatNeedsTheLock({
 *    lockTerminal: async f => {
 *      spinner.stop();
 *      await f();
 *      spinner.start();
 *    }
 *  });
 * }
 * 
 * //This func doesn't because we are not using ora (or similar)
 * const func = () => {
 *    console.log("Hello world")
 *    funcThatNeedsTheLock({});
 * }
 */
export interface ITerminalLockInput {
  /**
   * Lock the terminal. Then give control of the terminal
   * to @param functionThatUsesTheTerminal once the function
   * completes, give control
   * @example
   * const func1 = () => {
   *    writeToTerminal();
   *    return 5;
   * }
   * const five = lockTerminal(async () => writeToTerminal());
   */
  readonly lockTerminal?: <T>(
    functionThatUsesTheTerminal: () => Promise<T>
  ) => Promise<T>;
}
