import { promptForNextCommitDeadline } from "./promptForNextCommitDeadline";
import { Readable } from "stream";
import { ErrorCollector } from "./ErrorCollector.test.utility";
import { FakeWritable } from "./FakeWritable.test.utility";

test("promptForNextCommitDeadline tomorrow", async () => {
  const errors = new ErrorCollector();
  const readable = Readable.from(["\n"]);
  const writable = new FakeWritable();
  const date = await promptForNextCommitDeadline({
    ...errors,
    streamOptions: {
      input: readable as any,
      output: writable as any
    }
  });
  expect(errors.printErrors()).toBeFalsy();
  expect(date).toBe(1);
});

test("promptForNextCommitDeadline week", async () => {
  const errors = new ErrorCollector();
  const readable = Readable.from(["j", "\n"]);
  const writable = new FakeWritable();
  const date = await promptForNextCommitDeadline({
    ...errors,
    streamOptions: {
      input: readable as any,
      output: writable as any
    }
  });
  expect(errors.printErrors()).toBeFalsy();
  expect(date).toBe(7);
});

test("promptForNextCommitDeadline month", async () => {
  const errors = new ErrorCollector();
  const readable = Readable.from(["j", "j", "\n"]);
  const writable = new FakeWritable();
  const date = await promptForNextCommitDeadline({
    ...errors,
    streamOptions: {
      input: readable as any,
      output: writable as any
    }
  });
  expect(errors.printErrors()).toBeFalsy();
  expect(date).toBe(30);
});

test("promptForNextCommitDeadline custom", async () => {
  const errors = new ErrorCollector();
  const readable = Readable.from(["j", "j", "j", "\n", "5", "\n", "5", "\n"]);
  const writable = new FakeWritable();
  const date = await promptForNextCommitDeadline({
    ...errors,
    streamOptions: {
      input: readable as any,
      output: writable as any
    }
  });
  expect(errors.printErrors()).toBeFalsy();
  expect(date).toBe(5);
});
