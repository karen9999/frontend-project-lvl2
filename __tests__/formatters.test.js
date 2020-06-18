import plain from "../src/formatters/plain";
import stylish from "../src/formatters/stylish";
import toJson from "../src/formatters/toJson";
import makeTree from "../src/tree";
import toParsit from "../src/parsers";

const path = require("path");

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

const recursiveDifference =
  "{\n    group1: {\n      + baz: bars\n      - baz: bas\n        foo: bar\n      + nest: str\n      - nest: {\n            key: value\n        }\n    }\n}";

test("recursive formatter", () => {
  expect(stylish(tree1)).toEqual(recursiveDifference);
  expect(stylish(tree2)).toEqual(recursiveDifference);
  expect(stylish(tree3)).toEqual(recursiveDifference);
});

const plainDifference =
  "Property group1.baz was changed from bas to bars\nProperty group1.nest was changed from [complex value] to str\n";

test("plain formatter", () => {
  expect(plain(tree1)).toEqual(plainDifference);
  expect(plain(tree2)).toEqual(plainDifference);
  expect(plain(tree3)).toEqual(plainDifference);
});

const differenceInJSON =
  '[{"name":"group1","status":"unmodified","currentValue":"","previousValue":"","children":[{"name":"baz","status":"modified","currentValue":"bars","previousValue":"bas","children":[]},{"name":"foo","status":"unmodified","currentValue":"bar","previousValue":"","children":[]},{"name":"nest","status":"modified","currentValue":"str","previousValue":{"key":"value"},"children":[]}]}]';

test("JSON formatter", () => {
  expect(toJson(tree1)).toEqual(differenceInJSON);
  expect(toJson(tree2)).toEqual(differenceInJSON);
  expect(toJson(tree3)).toEqual(differenceInJSON);
});
