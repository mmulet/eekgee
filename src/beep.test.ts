import { beep } from "./beep";
import { IEKGVersion0 } from "./IEKGVersion0";
import { ErrorCollector } from "./ErrorCollector.test.utility";

test("test beep", async () => {
  const testData: IEKGVersion0 = {
    version: "0.0",
    updateDate: 0,
    status: "alive",
    nextCommitDeadlineDate: 1,
    commitFrequency: 1
  };
  const errors = new ErrorCollector();
  let outputContent = "";
  const success = await beep({
    directoryPath: "",
    readFile: async () => Buffer.from(JSON.stringify(testData), "utf8"),
    currentDate: 1,
    ...errors,
    logString: () => {},
    writeFile: async (_path, content) => {
      outputContent = content;
    }
  });

  expect(errors.printErrors()).toBeFalsy();
  expect(success).toBeTruthy();
  const successData: IEKGVersion0 = {
    version: "0.0",
    updateDate: 1,
    status: "alive",
    nextCommitDeadlineDate: 86400001,
    commitFrequency: 1
  };
  expect(JSON.parse(outputContent)).toEqual(successData);
});
