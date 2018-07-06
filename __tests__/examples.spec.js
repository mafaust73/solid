import { CSG, Vector, ZERO, ONE, UNIT_Y } from "../src/common/common";
import { Lathe, Twist, Cylinder, Cone, Sphere, Cube } from "../src/volumes/volumes";
import { Path } from "../src/misc/path";
import { Povray } from "../src/io/povray";
import fs from "fs";

let povray = new Povray();

function saveAs(name, csg) {
  fs.writeFileSync(`./scenes/${name}.pov`, povray.write(csg));
}

describe("examples", () => {
  test("cube", () => {
    let csg = new Cube(ZERO, ONE);
    saveAs("cube", csg);
  });

  test("sphere", () => {
    let csg = new Sphere(ZERO, 1, 32);
    saveAs("sphere", csg);
  });

  test("cylinder", () => {
    let csg = new Cylinder(ZERO, UNIT_Y, 1, 32);
    saveAs("cylinder", csg);
  });

  test("cone", () => {
    let csg = new Cone(ZERO, UNIT_Y, 1, 0.25, true, 32);
    saveAs("cone", csg);
  });

  test("lathe", () => {
    let path = new Path()
      .moveTo(0, 0)
      .lineTo(2, 0)
      .lineTo(2, 0.25)
      .lineTo(0.25, 0.4)
      .lineTo(0.25, 4)
      .lineTo(2, 4.5)
      .lineTo(2.5, 5.0)
      .lineTo(3, 6)
      .lineTo(2.75, 6)
      .lineTo(1.5, 4.4)
      .lineTo(0, 5.2);

    path.reverse();
    let csg = new Lathe(path, 10, 32);
    saveAs("lathe", csg);
  });

  test("twist", () => {
    let path = new Path()
      .moveTo(-1, 1)
      .lineTo(1, 1)
      .lineTo(1, -1)
      .lineTo(-1, -1);
    let csg = new Twist(path, 0.5, 10, 10, 32);
    saveAs("twist", csg);
  });

  test("operations", () => {
    let cube = new Cube(ZERO, ONE);
    let sphere = new Sphere(ZERO, 1.2, 32);

    saveAs("union", cube.union(sphere));
    saveAs("subtract", cube.subtract(sphere));
    saveAs("intersect", cube.intersect(sphere));
  });
});
