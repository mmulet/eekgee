import { createPromptModule, StreamOptions } from "inquirer";
import { neverDefault } from "./neverDefault";
import { ILogStringError } from "./ILogStringError";

const daily = "daily";
const weekly = "weekly";
const monthly = "monthly (every 30 days)";
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
 * Ask the user for the next deadline frequency.
 * Returns null on error
 */
export const promptForDeadlineFrequency = async ({ logError, streamOptions }: Input) => {
  const prompt = createPromptModule(streamOptions);
  const { deadline: value } = await prompt<{
    deadline: typeof daily | typeof weekly | typeof monthly | typeof custom;
  }>([
    {
      type: "list",
      message: "How often will you commit (or beep)?",
      name: "deadline",
      choices: [daily, weekly, monthly, custom]
    }
  ]);
  const numberOfDays =
    value == daily
      ? 1
      : value == weekly
      ? 7
      : value == monthly
      ? 30
      : value === custom
      ? (
          await prompt<{
            deadline: number;
          }>([
            {
              type: "number",
              message:
                "You will commit (or beep) every _ days: (enter a number) ",
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

