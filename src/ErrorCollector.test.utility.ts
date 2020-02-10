import { ILogStringError } from "./ILogStringError";
/**
 * Collect errors. Used for testing
 * @example
 * const errorCollector = new ErrorCollector();
 * someFunction({logError: errorCollector.logError});
 * console.error(errorCollector.printErrors());
 */
export class ErrorCollector implements ILogStringError {
  readonly errors: string[] = [];
  readonly logError = (err: string) => {
    this.errors.push(err);
  };
  readonly isEmpty = () => this.errors.length <= 0;
  readonly printErrors = () => this.errors.join("\n");
}
