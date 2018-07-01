import { Vector } from "../../src/common/vector";
import { Cylinder } from "../../src/volumes/cylinder";
import { Wavefront } from "../../src/io/wavefront";
import fs from "fs";

describe("cylinder", () => {
  test("cylinder", () => {
    let cylinder = new Cylinder(new Vector(0, 0, 0), new Vector(0, 1, 0), 1, 10, 6);

    let compare = new Wavefront().write(cylinder);
    expect(compare).toMatchSnapshot();
  });
  test("cylinder diag", () => {
    let cylinder = new Cylinder(new Vector(0, 0, 0), new Vector(1, 1, 1), 1, 10, 6);

    let compare = new Wavefront().write(cylinder);
    expect(compare).toMatchSnapshot();
  });
});
