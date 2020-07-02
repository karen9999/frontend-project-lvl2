import fs from "fs";
import path from "path";
import diff from "../src";

const getFixturePath = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);
const differenceBetweenFile = fs.readFileSync(
  getFixturePath("difference.txt"),
  "utf-8"
);

test("diff", () => {
  expect(
    diff(getFixturePath("before.json"), getFixturePath("after.json"))
  ).toEqual(differenceBetweenFile);
  expect(
    diff(getFixturePath("before.yaml"), getFixturePath("after.yaml"))
  ).toEqual(differenceBetweenFile);
  expect(
    diff(getFixturePath("before.ini"), getFixturePath("after.ini"))
  ).toEqual(differenceBetweenFile);
});
