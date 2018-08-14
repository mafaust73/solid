import { CSG, Vector } from "../src/common/common";
import { Cube } from "../src/volumes/cube";
import fs from "fs";

export class Camera {
  constructor(position, lookat) {
    this.position = position;
    this.lookat = lookat;

    this.normal = this.lookat.minus(this.position).normalized();
  }

  action(node) {
    node.polygons.forEach(polygon => {
      // project
      // rendervar svg = "";
      let points = polygon.vertices.map(vx => `${vx.position.x}, ${vx.position.y}`).join(" ");
      //svg += `<polygon points="${points}" style="stroke:green;fill:none" />\n`;
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
    this.traverse(csg.bspNode());
  }
}

describe("incubator", () => {
  test.skip("incubator", () => {
    let cube = new Cube(new Vector(0, 0, 0), new Vector(10, 10, 10));

    //fs.writeFileSync("incubator.svg", svg);
    expect(1).toBe(1);
  });
});
