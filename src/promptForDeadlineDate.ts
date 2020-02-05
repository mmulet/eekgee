import { createPromptModule } from "inquirer";
//@ts-ignore
import datePicker from "inquirer-datepicker-prompt";
import { neverDefault } from "./neverDefault";

const tomorrow = "tomorrow";
const week = "in a week";
const month = "in a month";
export interface Input {
  /**
   * the current date as unix time stamp
   */
  readonly currentDate: number;
}
export const promptForDeadlineDate = async ({ currentDate }: Input) => {
  const prompt = createPromptModule();
  prompt.registerPrompt("datetime", datePicker);
  const value = await prompt<typeof tomorrow | typeof week | typeof month>([
    {
      type: "list",
      message: "When will you next commit be?",
      name: "deadline",
      choices: [tomorrow, week, month]
    }
  ]);
  const offset =
    value == tomorrow
      ? /**
         * 24 hours in miliseconds
         */
        8.64e7
      : value == week
      ? /**
         * 1 week in miliseconds
         */
        6.048e8
      : value == month
      ? /**
         * 1 month in milliseconds
         */
        2.628e9
      : (neverDefault(value), 0);
  return currentDate + offset;
};
