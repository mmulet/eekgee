import { Writable } from "stream";
/**
 * For testing only. Fakes a writable stream
 */
export class FakeWritable extends Writable {
  _write = () => {};
}
