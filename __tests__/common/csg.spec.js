import { Vector, UNIT_X, UNIT_Y } from "../../src/common/vector";
import { Cube } from "../../src/volumes/cube";
import { Sphere } from "../../src/volumes/sphere";
import { Wavefront } from "../../src/io/wavefront";

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

  test.skip("performance", () => {
    for (let i = 10; i < 60; i += 10) {
      let a = new Sphere(new Vector(-0.5, 0.0, 0.0), 1, i);
      let b = new Sphere(new Vector(0.5, 0.0, 0.0), 1, i);

      let t0 = Date.now();
      a.subtract(b);
      let t1 = Date.now();
      let dt = t1 - t0;
      console.log(`resolution ${i} #${a.polygons.length} ${dt}ms = ${dt / a.polygons.length}`);
    }
  });
});
