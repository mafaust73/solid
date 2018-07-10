import { CSG, Vector, ZERO, ONE, UNIT_Y } from "../src/common/common";
import { Lathe, Twist, Cylinder, Cone, Sphere, Cube } from "../src/volumes/volumes";
import { Path } from "../src/misc/path";
import { Point } from "../src/misc/point";
import { Povray } from "../src/io/povray";
import fs from "fs";

let povray = new Povray();

function saveAs(name, csg) {
  fs.writeFileSync(`./scenes/${name}.pov`, povray.write(csg));
}

// https://schneidwerkzeugmechaniker.info/mediawiki/images/thumb/3/3a/Bohrer3a.jpg/600px-Bohrer3a.jpg
function drill(d, rd, b) {
  d = d || 18;
  rd = rd || 17;
  b = b || 2;

  return new Path()
    .moveTo(new Point(-b / 2, d / 2))
    .lineTo(new Point(b / 2, d / 2))
    .lineTo(new Point(b / 2, rd / 2))
    .arcTo(new Point(rd / 2, 0), new Point(0, 0), true)
    .arcTo(new Point(b / 2, 0), new Point((rd + b) / 4, 0), false)
    .lineTo(new Point(b / 2, -d / 2))
    .lineTo(new Point(-b / 2, -d / 2))
    .lineTo(new Point(-b / 2, -rd / 2))
    .arcTo(new Point(-rd / 2, 0), new Point(0, 0), true)
    .arcTo(new Point(-b / 2, 0), new Point(-(rd + b) / 4), false)
    .close();
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
    let csg = new Twist(drill(18, 17, 2), 5, 80, 20, 64);
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
