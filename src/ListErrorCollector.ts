import { List } from "immutable";

/**
 * A class to collect errors for a list
 * of elements
 */
export class ListErrorCollector {
  readonly errors: {
    [key: number]: List<string> | undefined;
  } = {};
  /**
   * A function to generate a function to add an error
   * to our error collection
   */
  readonly getLogError = (index: number) => (err: string) => {
    this.errors[index] = (this.errors[index] ?? List()).push(err);
  };
}
