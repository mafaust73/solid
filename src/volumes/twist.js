import { CSG, Vector, Vertex, Polygon, UNIT_Y } from "../common/common";

function transform(vx, h, alpha) {
  let p = vx.position.rotateY(alpha);
  p.y = h;
  let n = vx.normal.rotateY(alpha);
  return new Vertex(p, n);
}

export class Twist extends CSG {
  constructor(path, aspect, length, resolution, stacks) {
    super();

    // BOTTOM
    let tris = path.triangulate("xz", resolution);
    tris.forEach(t => {
      let a = new Vertex(t[0], UNIT_Y.negated());
      let b = new Vertex(t[1], UNIT_Y.negated());
      let c = new Vertex(t[2], UNIT_Y.negated());
      this.polygons.push(new Polygon([c, b, a]));
    });

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

    // TOP
    let alpha = ((length * aspect) / 180) * Math.PI;
    tris.forEach(t => {
      let a = new Vertex(t[0], UNIT_Y);
      let b = new Vertex(t[1], UNIT_Y);
      let c = new Vertex(t[2], UNIT_Y);
      this.polygons.push(new Polygon([transform(a, length, alpha), transform(b, length, alpha), transform(c, length, alpha)]));
    });
  }
}
