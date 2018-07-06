import { CSG, Vector, Vertex, Polygon } from "../common/common";

export class Cylinder extends CSG {
  constructor(start, end, radius, resolution) {
    super();

    let ray = end.minus(start);
    let axisZ = ray.unit();
    let isY = Math.abs(axisZ.y) > 0.5;
    let axisX = new Vector(isY ? 1 : 0, !isY ? 1 : 0, 0).cross(axisZ).unit();
    let axisY = axisX.cross(axisZ).unit();
    let startVertex = new Vertex(start, axisZ.negated());
    let endVertex = new Vertex(end, axisZ.unit());

    function point(stack, slice, normalBlend) {
      let angle = slice * Math.PI * 2;
      let out = axisX.times(Math.cos(angle)).plus(axisY.times(Math.sin(angle)));
      let pos = start.plus(ray.times(stack)).plus(out.times(radius));
      let normal = out.times(1 - Math.abs(normalBlend)).plus(axisZ.times(normalBlend));
      return new Vertex(pos, normal);
    }

    for (let i = 0; i < resolution; i++) {
      let t0 = i / resolution,
        t1 = (i + 1) / resolution;
      this.polygons.push(new Polygon([startVertex, point(0, t0, -1), point(0, t1, -1)]));
      this.polygons.push(new Polygon([point(0, t1, 0), point(0, t0, 0), point(1, t0, 0), point(1, t1, 0)]));
      this.polygons.push(new Polygon([endVertex, point(1, t1, 1), point(1, t0, 1)]));
    }
  }
}
