import genDifference from "./index.js";

const { program } = require("commander");
const fs = require("fs");

program
  .version("0.0.1")
  .arguments("<firstConfig> <secondConfig>")
  .description("Compares two configuration files and shows a difference.")
  .option("-f, --format [type]", "output format")
  .action(function (firstConfig, secondConfig) {
    const file1 = JSON.parse(fs.readFileSync(firstConfig));
    const file2 = JSON.parse(fs.readFileSync(secondConfig));
    console.log(genDifference(file1, file2));
  });

program.parse(process.argv);
