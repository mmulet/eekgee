import { Writable } from "stream";
/**
 * For testing only. Fakes a writable stream.
 * But saves what was written as a string
 */
export class SaveWritable extends Writable {
  strings: string[] = [];
  _write = (value: any) => {
    this.strings.push(value.toString());
  };
  printStrings = () => this.strings.join("\n");
}
