import { promptForDeadlineFrequency } from "./promptForDeadlineFrequency";
import { promptForNextCommitDeadline } from "./promptForNextCommitDeadline";
import { nextDeadlineDate } from "./nextDeadlineDate";
import { Input as InitInput } from "./init";
import { StreamOptions } from "inquirer";

export interface Input
  extends Pick<
      InitInput,
      "commitFrequency" | "nextCommitDeadlineDate" | "lockTerminal" | "logError"
    >,
    Required<Pick<InitInput, "currentDate">> {
  readonly streamOptions?: StreamOptions;
}
/**
 *
 * Given the command line options, optionally prompt
 * for the deadline date and commit frequency.
 */
export const getDeadlineDateAndFrequency = async ({
  commitFrequency,
  nextCommitDeadlineDate,
  lockTerminal,
  logError,
  currentDate,
  streamOptions
}: Input) => {
  if (commitFrequency && nextCommitDeadlineDate) {
    return {
      commitFrequency,
      nextCommitDeadlineDate
    };
  }
  /**
   * Implies that next commit deadline is not set
   */
  if (commitFrequency) {
    const prompt = () =>
      promptForNextCommitDeadline({
        logError,
        streamOptions
      });
    const numberOfDays = await (lockTerminal ? lockTerminal(prompt) : prompt());
    if (!numberOfDays) {
      return null;
    }
    return {
      commitFrequency,
      nextCommitDeadlineDate: nextDeadlineDate({
        currentDate,
        numberOfDays
      })
    };
  }
  const prompt = () =>
    promptForDeadlineFrequency({
      logError,
      streamOptions
    });
  const numberOfDays = await (lockTerminal ? lockTerminal(prompt) : prompt());

  if (!numberOfDays) {
    return null;
  }
  return {
    commitFrequency: commitFrequency ?? numberOfDays,
    nextCommitDeadlineDate:
      nextCommitDeadlineDate ??
      nextDeadlineDate({
        currentDate,
        numberOfDays
      })
  };
};
