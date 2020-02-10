import { LogLevel } from "./LogLevel";
import { neverDefault } from "./neverDefault";
/**
 *
 * Get the correct log and error functions
 * for each log level except verbose
 */
export const logLevelToLogFunctions = (
  logLevel: Exclude<LogLevel, "verbose" | "v">
) => {
  switch (logLevel) {
    case "still":
    case "s":
      return {
        logError: console.error,
        logString: console.log
      };
    case "quiet":
    case "q":
      return {
        logError: console.error,
        logString: () => {}
      };
    case "silent":
    case "i":
      return {
        logError: () => {},
        logString: () => {}
      };
    default:
      neverDefault(logLevel);
      console.error(`Unrecognized log level ${logLevel}.
\tExpected quiet, silent, still, or verbose`);
      return null;
  }
};
