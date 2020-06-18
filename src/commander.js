import formatter from "./formatters/stylish";
import toParsit from "./parsers";
import makeTree from "./tree";
import plain from "./formatters/plain";
import toJson from "./formatters/toJson";

const { program } = require("commander");

program
  .version("0.0.1")
  .arguments("<firstConfig> <secondConfig> <format>")
  .description("Compares two configuration files and shows a difference.")
  .option("-f, --format [type]", "output format")
  .action(function getPath(firstConfig, secondConfig, format = 'recursive') {
    const file1 = toParsit(firstConfig);
    const file2 = toParsit(secondConfig);
    const tree = makeTree(file1, file2);
    if (format === 'plain') {
      console.log(plain(tree));
    }
    if (format === 'json') {
      console.log(toJson(tree));
    }
    if (format === 'recursive') { 
      console.log(formatter(tree));
    }
  });
program.parse(process.argv);

