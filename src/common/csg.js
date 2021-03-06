import { BspNode } from "./bspNode";
import { POSITIVE_INFINITY, NEGATIVE_INFINITY } from "./vector";

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

  material(mat) {
    this.polygons.forEach(polygon => (polygon.material = mat));
  }

  /**
   * Calculate the extends of the csg object.
   * @returns {Object}
   * @example { min: Vector, center: Vector, max: Vector }
   */
  extends() {
    let mi = POSITIVE_INFINITY;
    let mx = NEGATIVE_INFINITY;

    this.polygons.forEach(polygon => {
      polygon.vertices.forEach(vertex => {
        mi = mi.min(vertex.position);
        mx = mx.max(vertex.position);
      });
    });

    return { min: mi, center: mx.plus(mi).dividedBy(2), max: mx };
  }

  /**
   * Create a clone of this csg instance.
   */
  clone() {
    return new CSG(this.polygons.map(p => p.clone()));
  }

  /**
   * Perform a subtract operation.
   * @param {CSG} csg the csg object to be subtracted
   * @returns {CSG}
   */
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

  /**
   * Creates a bsp node from this csg item.
   * @return {BspNode}
   */
  bspNode() {
    return new BspNode(this.clone().polygons);
  }
}
