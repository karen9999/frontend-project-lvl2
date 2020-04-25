import diff from "../src/index";

const differenceBetweenFile = `{\n    host: hexlet.io\n  + verbose: true\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n}`;

test("diff", () => {
  expect(
    diff("../before.json", "../after.json")).toEqual(differenceBetweenFile);
  expect(diff("../file1.yaml", "../file2.yaml")).toEqual(differenceBetweenFile);
  expect(diff("../file1.ini", "../file2.ini")).toEqual(differenceBetweenFile);
});
