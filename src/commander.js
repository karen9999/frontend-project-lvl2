import genDifference from "./index.js";
import toParsit from "./parser.js";

const { program } = require("commander");

program
  .version("0.0.1")
  .arguments("<firstConfig> <secondConfig>")
  .description("Compares two configuration files and shows a difference.")
  .option("-f, --format [type]", "output format")
  .action(function getPath(firstConfig, secondConfig) {
    const file1 = toParsit(firstConfig);
    const file2 = toParsit(secondConfig);
    console.log(genDifference(file1, file2));
  });

program.parse(process.argv);
