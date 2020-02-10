import { ErrorCollector } from "./ErrorCollector.test.utility";
import { getDeadlineDateAndFrequency } from "./getDeadlineDateAndFrequency";
import { Readable } from "stream";
import { FakeWritable } from "./FakeWritable.test.utility";
const currentDate = 0;
test("No frequency or deadline", async () => {
  const errors = new ErrorCollector();
  const data = await getDeadlineDateAndFrequency({
    ...errors,
    currentDate,
    streamOptions: {
      input: Readable.from(["\n"]) as any,
      output: new FakeWritable() as any
    }
  });
  expect(data).toEqual({
    commitFrequency: 1,
    nextCommitDeadlineDate: 86400000
  });
});

test("Only frequency", async () => {
  const errors = new ErrorCollector();
  const data = await getDeadlineDateAndFrequency({
    ...errors,
    currentDate,
    streamOptions: {
      input: Readable.from(["\n"]) as any,
      output: new FakeWritable() as any
    },
    commitFrequency: 10
  });
  expect(data).toEqual({
    commitFrequency: 10,
    nextCommitDeadlineDate: 86400000
  });
});

test("Only deadline", async () => {
  const errors = new ErrorCollector();
  const data = await getDeadlineDateAndFrequency({
    ...errors,
    currentDate,
    streamOptions: {
      input: Readable.from(["\n"]) as any,
      output: new FakeWritable() as any
    },
    nextCommitDeadlineDate: 2
  });
  expect(data).toEqual({
    commitFrequency: 1,
    nextCommitDeadlineDate: 2
  });
});

test("Both", async () => {
  const errors = new ErrorCollector();
  const data = await getDeadlineDateAndFrequency({
    ...errors,
    currentDate,
    streamOptions: {
      input: Readable.from(["\n"]) as any,
      output: new FakeWritable() as any
    },
    commitFrequency: 15,
    nextCommitDeadlineDate: 2
  });
  expect(data).toEqual({
    commitFrequency: 15,
    nextCommitDeadlineDate: 2
  });
});
