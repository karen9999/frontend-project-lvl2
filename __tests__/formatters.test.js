import fs from "fs";
import path from "path";
import plain from "../src/formatters/plain";
import stylish from "../src/formatters/stylish";
import toJson from "../src/formatters/toJson";
import makeTree from "../src/tree";
import toParsit from "../src/parsers";

const getFixturePath = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);
const tree1 = makeTree(
  toParsit(getFixturePath("recursive1.json")),
  toParsit(getFixturePath("recursive2.json"))
);
const tree2 = makeTree(
  toParsit(getFixturePath("recursive1.ini")),
  toParsit(getFixturePath("recursive2.ini"))
);
const tree3 = makeTree(
  toParsit(getFixturePath("recursive1.yaml")),
  toParsit(getFixturePath("recursive2.yaml"))
);

const recursiveDifference = fs.readFileSync(
  getFixturePath("recursiveDifference.txt"),
  "utf-8"
);

test("recursive formatter", () => {
  expect(stylish(tree1)).toEqual(recursiveDifference);
  expect(stylish(tree2)).toEqual(recursiveDifference);
  expect(stylish(tree3)).toEqual(recursiveDifference);
});

const plainDifference = fs.readFileSync(
  getFixturePath("plainDifference.txt"),
  "utf-8"
);

test("plain formatter", () => {
  expect(plain(tree1)).toEqual(plainDifference);
  expect(plain(tree2)).toEqual(plainDifference);
  expect(plain(tree3)).toEqual(plainDifference);
});

const differenceInJSON = fs.readFileSync(
  getFixturePath("differenceInJSON.txt"),
  "utf-8"
);

test("JSON formatter", () => {
  expect(toJson(tree1)).toEqual(differenceInJSON);
  expect(toJson(tree2)).toEqual(differenceInJSON);
  expect(toJson(tree3)).toEqual(differenceInJSON);
});
