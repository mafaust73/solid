import { CSG, Vector } from "../src/common/common";
import { Cube } from "../src/volumes/cube";
import { Cylinder } from "../src/volumes/cylinder";
import fs from "fs";

export class Camera {
  constructor(position, lookat) {
    this.position = position;
    this.lookat = lookat;

    // this.normal = new Vector(0, -1, 0); //this.lookat.minus(this.position).unit();
    // this.u = new Vector(1, 0, 0);
    // this.v = new Vector(0, 0, 1);

    this.position = new Vector(-20, 0, 0);
    this.normal = new Vector(1, 0, 0);
    this.u = new Vector(0, 0, 1);
    this.v = new Vector(0, 1, 0);

    this.svg = "";
  }

  action(node) {
    node.polygons.forEach(polygon => {
      // project
      let points = polygon.vertices
        .map(vx => {
          let dist = vx.position.minus(this.position).dot(this.normal);
          return vx.position.minus(this.normal.times(dist));
        })
        .map(v => ({ x: v.dot(this.u), y: v.dot(this.v) }))
        .map(v => `${v.x}, ${v.y}`)
        .join(" ");

      // rendervar svg = "";
      //let points = polygon.vertices.map(vx => `${vx.position.x}, ${vx.position.y}`).join(" ");
      this.svg += `<polygon points="${points}" style="${polygon.material}" />\n`;
    });
  }

  traverse(node) {
    if (!node) {
      return;
    }

    let sign = node.plane.sign(this.position);
    if (sign === -1) {
      this.traverse(node.front);
      this.action(node);
      this.traverse(node.back);
    } else {
      this.traverse(node.back);
      this.action(node);
      this.traverse(node.front);
    }
  }

  render(csg) {
    this.svg = "<svg>\n";
    this.traverse(csg.bspNode());
    this.svg += "</svg>";
    return this.svg;
  }
}

describe("incubator", () => {
  test("incubator", () => {
    const cube = new Cube(new Vector(0, 0, 0), new Vector(10, 10, 10));
    cube.material("stroke:none;fill:green;fill-opacity:0.5");
    const cube1 = new Cube(new Vector(0, -10, 0), new Vector(8, 5, 8));
    cube1.material("stroke:none;fill:red;fill-opacity:0.5");
    const cylinder = new Cylinder(new Vector(0, -10, 0), new Vector(0, 20, 0), 4, 10, 6);
    cylinder.material("stroke:none;fill:blue;fill-opacity:0.5");

    let csg = cube.union(cube1).subtract(cylinder);
    let camera = new Camera(new Vector(0, 20, 0), new Vector(0, 0, 0));

    let svg = camera.render(csg);
    fs.writeFileSync("incubator.svg", svg);
    expect(1).toBe(1);
  });
});
