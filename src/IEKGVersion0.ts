export interface IEKGVersion0 {
  /**
   * Version of this interface
   */
  readonly version: "0.0";
  /**
   * The date this was updated
   */
  readonly updateDate: number;
  /**
   * The current status of this project
   */
  readonly status: "dead" | "alive";
  /**
   * The pending date of the next commit.
   * If currentDate > nextCommitDate consider
   * this project to be dead.
   */
  readonly nextCommitDeadlineDate: number;
  /**
   * in days. After beeping, this number of
   * days will become the deadline
   */
  readonly commitFrequency: number;
}
