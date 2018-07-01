import { CSG, Vector, Vertex, Polygon } from "../common/common";

// TODO, not finished
export class Lathe extends CSG {
  constructor(path, resolution, slices) {
    super();

    let points = path.points("xy", resolution);
    let n = points.length;
    let p0 = points.map(vx => vx.clone());
    for (let i = 1; i <= slices; i++) {
      let t = i / slices;
      let alpha = t * Math.PI * 2.0;

      let p1 = points.map(vx => {
        let p = vx.position.rotateY(alpha);
        let n = vx.normal.rotateY(alpha);
        return new Vertex(p, n);
      });

      for (let j = 0; j < n; j++) {
        let a = p0[j];
        let b = p0[(j + 1) % n];
        let c = p1[(j + 1) % n];
        let d = p1[j];

        this.polygons.push(new Polygon([c, b, a]));
        this.polygons.push(new Polygon([d, c, a]));
      }

      p0 = p1;
    }
  }
}
