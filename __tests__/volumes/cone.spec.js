import { Vector } from "../../src/common/vector";
import { Cone } from "../../src/volumes/cone";
import { Wavefront } from "../../src/io/wavefront";
import fs from "fs";

describe("cone", () => {
  test("radiusStart is zero & closed", () => {
    let cone = new Cone(new Vector(0, 0, 0), new Vector(0, 1, 0), 0, 1, true, 3);

    let compare = new Wavefront().write(cone);
    expect(compare).toMatchSnapshot();
  });

  test("radiusStart is zero & open", () => {
    let cone = new Cone(new Vector(0, 0, 0), new Vector(0, 1, 0), 0, 1, false, 3);
    let compare = new Wavefront().write(cone);
    expect(compare).toMatchSnapshot();
  });

  test("radiusEnd is zero & closed", () => {
    let cone = new Cone(new Vector(0, 0, 0), new Vector(0, 1, 0), 1, 0, true, 3);

    let compare = new Wavefront().write(cone);
    expect(compare).toMatchSnapshot();
  });

  test("radiusEnd is zero & open", () => {
    let cone = new Cone(new Vector(0, 0, 0), new Vector(0, 1, 0), 1, 0, false, 3);
    let compare = new Wavefront().write(cone);
    expect(compare).toMatchSnapshot();
  });

  test("closed", () => {
    let cone = new Cone(new Vector(0, 0, 0), new Vector(0, 1, 0), 1, 2, true, 3);

    let compare = new Wavefront().write(cone);
    expect(compare).toMatchSnapshot();
  });

  test("open", () => {
    let cone = new Cone(new Vector(0, 0, 0), new Vector(0, 1, 0), 1, 2, false, 3);

    let compare = new Wavefront().write(cone);
    expect(compare).toMatchSnapshot();
  });
});
