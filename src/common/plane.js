import { Polygon } from "./polygon";

/// the tolerance used by `splitPolygon()` to decide if a point is on the plane.
const PLANE_EPSILON = 1e-5;

const COPLANAR = 0;
const FRONT = 1;
const BACK = 2;
const SPANNING = 3;

/**
 * A plane.
 */
export class Plane {
  constructor(normal, w) {
    this.normal = normal;
    this.w = w;
  }

  /**
   * Returns a textural representation of this plane.
   * @returns {String}
   */
  dump() {
    return `PLANE (${this.normal.x}, ${this.normal.y}, ${this.normal.z})@${this.w}`;
  }

  /**
   * Construct a plane from three points.
   * @param {Vector} a point 1
   * @param {Vector} b point 2
   * @param {Vector} c point 3
   * @returns {Plane}
   */
  static fromPoints(a, b, c) {
    let n = b
      .minus(a)
      .cross(c.minus(a))
      .unit();
    return new Plane(n, n.dot(a));
  }

  /**
   * Returns a digital clone of this plane.
   * @returns {Plane}
   */
  clone() {
    return new Plane(this.normal.clone(), this.w);
  }

  /**
   * Flips the plane.
   */
  flip() {
    this.normal = this.normal.negated();
    this.w = -this.w;
  }

  /**
   * Split `polygon` by this plane if needed, then put the polygon or polygon
   * fragments in the appropriate lists. Coplanar polygons go into either
   * `coplanarFront` or `coplanarBack` depending on their orientation with
   * respect to this plane. Polygons in front or in back of this plane go into
   * either `front` or `back`.
   * @param {Polygon} polygon the polygon to be splitted
   * @param {Array<Polygon>} coplanarFront array of coplanar front polygons
   * @param {Array<Polygon>} coplanarBack array of coplanar back polygons
   * @param {Array<Polygon>} front array of front polygons
   * @param {Array<Polygon>} back array of back polygons
   */
  splitPolygon(polygon, coplanarFront, coplanarBack, front, back) {
    // Classify each point as well as the entire polygon into one of the above four classes.
    let polygonType = 0;
    let types = polygon.vertices.map(v => {
      let t = this.normal.dot(v.position) - this.w;
      let type = t < -PLANE_EPSILON ? BACK : t > PLANE_EPSILON ? FRONT : COPLANAR;
      polygonType |= type;
      return type;
    });

    // Put the polygon in the correct list, splitting it when necessary.
    switch (polygonType) {
      case COPLANAR:
        (this.normal.dot(polygon.plane.normal) > 0 ? coplanarFront : coplanarBack).push(polygon);
        break;
      case FRONT:
        front.push(polygon);
        break;
      case BACK:
        back.push(polygon);
        break;

      default:
        // Split into front and back parts
        let f = [];
        let b = [];
        for (let i = 0; i < polygon.vertices.length; i++) {
          let j = (i + 1) % polygon.vertices.length;
          let ti = types[i];
          let tj = types[j];
          let vi = polygon.vertices[i];
          let vj = polygon.vertices[j];

          if (ti !== BACK) {
            f.push(vi);
          }
          if (ti !== FRONT) {
            b.push(ti != BACK ? vi.clone() : vi);
          }

          if ((ti | tj) === SPANNING) {
            let t = (this.w - this.normal.dot(vi.position)) / this.normal.dot(vj.position.minus(vi.position));
            let v = vi.interpolate(vj, t);
            f.push(v);
            b.push(v.clone());
          }
        }

        if (f.length >= 3) {
          front.push(new Polygon(f, polygon.material));
        }
        if (b.length >= 3) {
          back.push(new Polygon(b, polygon.material));
        }

        break;
    }
  }
}
