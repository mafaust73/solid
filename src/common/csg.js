import { BspNode } from "./bspNode";

/**
 * A csg geometry.
 */
export class CSG {
  /**
   * @param {Array<Polygon>} [polygons] optional polygons
   */
  constructor(polygons) {
    this.polygons = polygons || [];
  }

  /**
   * Create a clone of this csg instance.
   */
  clone() {
    return new CSG(this.polygons.map(p => p.clone()));
  }

  subtract(csg) {
    let a = new BspNode(this.clone().polygons);
    let b = new BspNode(csg.clone().polygons);

    a.invert();
    a.clipTo(b);
    b.clipTo(a);
    b.invert();
    b.clipTo(a);
    b.invert();
    a.build(b.allPolygons());
    a.invert();
    return new CSG(a.allPolygons());
  }

  /**
   * Return a new CSG solid representing space in either this solid or in the
   * solid `csg`. Neither this solid nor the solid `csg` are modified.
   * @param {CSG} csg the csg item to be merged
   * @return {CSG}
   */
  union(csg) {
    let a = new BspNode(this.clone().polygons);
    let b = new BspNode(csg.clone().polygons);
    a.clipTo(b);
    b.clipTo(a);
    b.invert();
    b.clipTo(a);
    b.invert();
    a.build(b.allPolygons());
    return new CSG(a.allPolygons());
  }

  intersect(csg) {
    let a = new BspNode(this.clone().polygons);
    let b = new BspNode(csg.clone().polygons);
    a.invert();
    b.clipTo(a);
    b.invert();
    a.clipTo(b);
    b.clipTo(a);
    a.build(b.allPolygons());
    a.invert();
    return new CSG(a.allPolygons());
  }

  /**
   * Returns the inverted solid
   * @returns {CSG}
   */
  invert() {
    let csg = this.clone();
    csg.polygons.forEach(p => p.flip());
    return csg;
  }
}