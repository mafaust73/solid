import { CSG, Vector, Vertex, Polygon } from "../common/common";

export class Cone extends CSG {
  constructor(start, end, radiusStart, radiusEnd, closed, resolution) {
    super();

    let ray = end.minus(start);
    let axisZ = ray.unit();
    let isY = Math.abs(axisZ.y) > 0.5;
    let axisX = new Vector(isY ? 1 : 0, !isY ? 1 : 0, 0).cross(axisZ).unit();
    let axisY = axisX.cross(axisZ).unit();

    let vxStart = new Vertex(start, axisZ.negated());
    let vxEnd = new Vertex(end, axisZ.unit());

    if (radiusStart === 0) {
      for (let i = 0; i < resolution; i++) {
        let t0 = (i / resolution) * 2 * Math.PI;
        let t1 = (((i + 1) % resolution) / resolution) * 2 * Math.PI;

        let d0 = axisX.times(Math.cos(t0)).plus(axisY.times(Math.sin(t0)));
        let p0 = end.plus(d0.times(radiusEnd));
        let d1 = axisX.times(Math.cos(t1)).plus(axisY.times(Math.sin(t1)));
        let p1 = end.plus(d1.times(radiusEnd));
        this.polygons.push(new Polygon([vxStart, new Vertex(p0, d0.unit()), new Vertex(p1, d1.unit())]));

        if (closed === true) {
          this.polygons.push(new Polygon([vxEnd, new Vertex(p1, vxEnd.normal.clone()), new Vertex(p0, vxEnd.normal.clone())]));
        }
      }
    } else if (radiusEnd === 0) {
      for (let i = 0; i < resolution; i++) {
        let t0 = (i / resolution) * 2 * Math.PI;
        let t1 = (((i + 1) % resolution) / resolution) * 2 * Math.PI;

        let d0 = axisX.times(Math.cos(t0)).plus(axisY.times(Math.sin(t0)));
        let p0 = start.plus(d0.times(radiusStart));
        let d1 = axisX.times(Math.cos(t1)).plus(axisY.times(Math.sin(t1)));
        let p1 = start.plus(d1.times(radiusStart));
        this.polygons.push(new Polygon([vxEnd, new Vertex(p1, d1.unit()), new Vertex(p0, d0.unit())]));

        if (closed === true) {
          this.polygons.push(new Polygon([vxStart, new Vertex(p0, vxStart.normal.clone()), new Vertex(p1, vxStart.normal.clone())]));
        }
      }
    } else {
      for (let i = 0; i < resolution; i++) {
        let t0 = (i / resolution) * 2 * Math.PI;
        let t1 = ((i + 1) / resolution) * 2 * Math.PI;

        let d0 = axisX.times(Math.cos(t0)).plus(axisY.times(Math.sin(t0)));
        let d1 = axisX.times(Math.cos(t1)).plus(axisY.times(Math.sin(t1)));

        let sp0 = start.plus(d0.times(radiusStart));
        let sp1 = start.plus(d1.times(radiusStart));
        let ep0 = end.plus(d0.times(radiusEnd));
        let ep1 = end.plus(d1.times(radiusEnd));

        let a = new Vertex(sp0, d0.unit());
        let b = new Vertex(sp1, d1.unit());
        let c = new Vertex(ep1, d1.unit());
        let d = new Vertex(ep0, d0.unit());

        this.polygons.push(new Polygon([c, b, a]));
        this.polygons.push(new Polygon([d, c, a]));

        if (closed === true) {
          this.polygons.push(new Polygon([vxStart, new Vertex(sp0, vxStart.normal.clone()), new Vertex(sp1, vxStart.normal.clone())]));
          this.polygons.push(new Polygon([vxEnd, new Vertex(ep1, vxEnd.normal.clone()), new Vertex(ep0, vxEnd.normal.clone())]));
        }
      }
    }
  }
}
