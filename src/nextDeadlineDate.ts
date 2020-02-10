export interface Input {
  readonly currentDate: number;
  readonly numberOfDays: number;
}
/**
 * 
 * compute the next deadline date from the current date
 * and the number of days until the deadline
 */
export const nextDeadlineDate = ({ currentDate, numberOfDays }: Input) =>
  currentDate + numberOfDays * 86400000; //1 day in milliseconds
