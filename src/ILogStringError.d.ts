export interface ILogStringError {
  readonly logError: (string: string) => void | Promise<void>;
}
