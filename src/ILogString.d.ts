/**
 * Interface to an object that implements a log function
 */
export interface ILogString {
  readonly logString: (string: string) => void | Promise<void>;
}
