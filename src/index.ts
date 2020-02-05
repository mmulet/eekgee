import { Command } from "commander";

export const main = () => {
  const program = new Command();
  program.version("0.0.1");

  program.command("init").action(() => {});
  program.command("*").action(() => {});
};
if (require.main === module) {
  main();
}
