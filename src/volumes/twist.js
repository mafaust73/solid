import { CSG, Vector, Vertex, Polygon } from "../common/common";

function transform(vx, h, alpha) {
  let p = vx.position.rotateY(alpha);
  p.y = h;
  let n = vx.normal.rotateY(alpha);
  return new Vertex(p, n);
}

export class Twist extends CSG {
  constructor(path, aspect, length, resolution, stacks) {
    super();

    let segments = path.segments("xz", resolution);
    for (let i = 1; i <= stacks; i++) {
      let t0 = (i - 1) / stacks;
      let h0 = t0 * length;
      let alpha0 = ((h0 * aspect) / 180) * Math.PI;

      let t1 = i / stacks;
      let h1 = t1 * length;
      let alpha1 = ((h1 * aspect) / 180) * Math.PI;

      segments.forEach(segment => {
        let a = transform(segment.a, h0, alpha0);
        let b = transform(segment.b, h0, alpha0);
        let c = transform(segment.b, h1, alpha1);
        let d = transform(segment.a, h1, alpha1);
        this.polygons.push(new Polygon([a, b, c]));
        this.polygons.push(new Polygon([a, c, d]));
      });
    }
  }
}
