import { CSG, Vector, Vertex, Polygon } from "../common/common";

export class Cube extends CSG {
  constructor(center, radius) {
    super();

    this.polygons = [
      { index: [0, 4, 6, 2], normal: new Vector(-1, 0, 0) },
      { index: [1, 3, 7, 5], normal: new Vector(+1, 0, 0) },
      { index: [0, 1, 5, 4], normal: new Vector(0, -1, 0) },
      { index: [2, 6, 7, 3], normal: new Vector(0, +1, 0) },
      { index: [0, 2, 3, 1], normal: new Vector(0, 0, -1) },
      { index: [4, 5, 7, 6], normal: new Vector(0, 0, +1) }
    ].map(info => {
      return new Polygon(
        info.index.map(i => {
          let pos = new Vector(
            center.x + radius.x * (2 * !!(i & 1) - 1),
            center.y + radius.y * (2 * !!(i & 2) - 1),
            center.z + radius.z * (2 * !!(i & 4) - 1)
          );
          return new Vertex(pos, info.normal);
        })
      );
    });
  }
}
