import genDifference from "..";

const { program } = require("commander");

program
  .version("0.0.1")
  .arguments("<firstConfig> <secondConfig>")
  .description("Compares two configuration files and shows a difference.")
  .option("-f, --format [type]", "output format")
  .action(function getPath(firstConfig, secondConfig) {
    console.log(genDifference(firstConfig, secondConfig));
  });
program.parse(process.argv);
