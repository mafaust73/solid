import { Vector, ZERO, ONE } from "../../src/common/vector";
import { Cube } from "../../src/volumes/cube";
import { Sphere } from "../../src/volumes/sphere";
import { Povray } from "../../src/io/povray";
import { Wavefront } from "../../src/io/wavefront";

import fs from "fs";

describe("povray", () => {
  test("povray", () => {
    const cube = new Cube(ZERO, ONE);
    const sphere = new Sphere(ZERO, 1.25, 24);

    let result = new Wavefront().write(cube.subtract(sphere));
    fs.writeFileSync("~/example.obj", result);

    result = new Povray().write(cube.subtract(sphere));
    fs.writeFileSync("~/example.pov", result);
    expect(result).toBe("");
  });
});
