import toParsit from "../src/parser.js";

test("parsing", () => {
  expect(toParsit("/home/karen/after.json")).toEqual({
    timeout: 20,
    verbose: true,
    host: "hexlet.io",
  });
  expect(toParsit("/home/karen/qwe.yaml")).toEqual({
    timeout: 20,
    verbose: true,
    host: "hexlet.io",
  });
});
