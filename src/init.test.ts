import { init } from "./init";
import { defaultEkgFilename } from "./defaultEkgFilename";
import { ErrorCollector } from "./ErrorCollector.test.utility";
import { IEKGVersion0 } from "./IEKGVersion0";

test("init fail", async () => {
  const errorCollector = new ErrorCollector();
  const output = await init({
    ...errorCollector,
    logString: () => {},
    readdir: async () => [defaultEkgFilename],
    directoryPath: "",
    lockTerminal: f => f(),
    writeFile: async () => {},
    commitFrequency: 1,
    currentDate: 0,
    nextCommitDeadlineDate: 1
  });
  expect(output).toBeNull();
  expect(errorCollector.printErrors()).toBe(
    "Can not init because .ekg already exists"
  );
});
test("init pass", async () => {
  const errorCollector = new ErrorCollector();
  let outContent = "";
  const output = await init({
    ...errorCollector,
    logString: () => {},
    readdir: async () => [],
    directoryPath: "",
    lockTerminal: f => f(),
    writeFile: async (_path, content) => {
      outContent = content;
    },
    commitFrequency: 1,
    currentDate: 0,
    nextCommitDeadlineDate: 1
  });
  expect(output).toBeTruthy();
  expect(errorCollector.printErrors()).toBe("");
  const ekgFile: IEKGVersion0 = {
    commitFrequency: 1,
    nextCommitDeadlineDate: 1,
    status: "alive",
    updateDate: 0,
    version: "0.0"
  };
  expect(JSON.parse(outContent)).toEqual(ekgFile);
});
