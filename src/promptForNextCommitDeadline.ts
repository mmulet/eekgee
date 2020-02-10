import { createPromptModule, StreamOptions } from "inquirer";
import { neverDefault } from "./neverDefault";
import { ILogStringError } from "./ILogStringError";

const tomorrow = "tomorrow";
const week = "in a week";
const month = "in 30 days";
const custom = "custom";

export interface Input extends ILogStringError {
  /**
   * Used for testing. Replace stdin | stdout
   * with custom streams
   */
  readonly streamOptions?: StreamOptions;
}
/**
 *
 * Ask the user for the next commit deadline.
 * Returns null on error
 */
export const promptForNextCommitDeadline = async ({
  logError,
  streamOptions
}: Input) => {
  const prompt = createPromptModule(streamOptions);
  const { deadline: value } = await prompt<{
    deadline: typeof tomorrow | typeof week | typeof month | typeof custom;
  }>([
    {
      type: "list",
      message: "When will your next commit (or beep) be?",
      name: "deadline",
      choices: [tomorrow, week, month, custom]
    }
  ]);
  const numberOfDays =
    value == tomorrow
      ? 1
      : value == week
      ? 7
      : value == month
      ? 30
      : value === custom
      ? (
          await prompt<{
            deadline: number;
          }>([
            {
              type: "number",
              message: "You will commit (or beep) in _ days: (enter a number) ",
              name: "deadline"
            }
          ])
        ).deadline
      : (neverDefault(value), 0);
  if (numberOfDays < 0 || isNaN(numberOfDays)) {
    logError(`Invalid commit frequency`);
    return null;
  }
  return numberOfDays;
};
