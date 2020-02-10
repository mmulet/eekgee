#!/usr/bin/env node
import { Command } from "commander";
import { initCommandLine } from "./initCommandLine";
import { beepCommandLine } from "./beepCommandLine";

export const main = () => {
  const program = new Command();
  program.version("0.0.1");

  initCommandLine(program);
  beepCommandLine(program);

  program.command("*").action(() => {});
  program.parse(process.argv);
};
if (require.main === module) {
  main();
}
