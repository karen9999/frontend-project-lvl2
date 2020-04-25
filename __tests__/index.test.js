import diff from "../src/index";
const path = require("path");

const differenceBetweenFile = `{\n    host: hexlet.io\n  + verbose: true\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n}`;
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test("diff", () => {
  expect(
    diff(getFixturePath("before.json"), getFixturePath("after.json"))).toEqual(differenceBetweenFile);
  expect(diff(getFixturePath("before.yaml"), getFixturePath("after.yaml"))).toEqual(differenceBetweenFile);
  expect(diff(getFixturePath("before.ini"), getFixturePath("after.ini"))).toEqual(differenceBetweenFile);
});
