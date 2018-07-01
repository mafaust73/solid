import { Vector } from "../../src/common/vector";
import { Sphere } from "../../src/volumes/sphere";
import { Wavefront } from "../../src/io/wavefront";
import { Povray } from "../../src/io/povray";

import fs from "fs";

describe("sphere", () => {
  test("sphere", () => {
    let sphere = new Sphere(new Vector(0, 0, 0), 1, 16);

    let compare = new Wavefront().write(sphere);
    fs.writeFileSync("/home/faust/sphere.obj", compare);

    fs.writeFileSync("/home/faust/sphere.pov", new Povray().write(sphere));

    expect(compare).toMatchSnapshot();
  });
});
