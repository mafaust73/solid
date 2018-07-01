import { Vector, UNIT_X, UNIT_Y } from "../../src/common/vector";
import { Cube } from "../../src/volumes/cube";
import { Cylinder } from "../../src/volumes/cylinder";
import { Cone } from "../../src/volumes/cone";
import { Wavefront } from "../../src/io/wavefront";
import { Path } from "../../src/misc/path";
import { Twist } from "../../src/volumes/twist";
import { Lathe } from "../../src/volumes/lathe";

import fs from "fs";

describe("csg", () => {
  test("invert, union, subtract, intersect", () => {
    const a = new Cube(new Vector(-0.5, -0.5, -0.5), new Vector(1, 1, 1));
    const b = new Cube(new Vector(0.5, 0.5, 0.5), new Vector(1, 1, 1));

    const alias = new Wavefront();
    expect(alias.write(a.union(b))).toMatchSnapshot();
    expect(alias.write(a.subtract(b))).toMatchSnapshot();
    expect(alias.write(a.intersect(b))).toMatchSnapshot();
    expect(alias.write(a.invert())).toMatchSnapshot();
  });
});
