import { Vector } from "../common/vector";
import { Vertex } from "../common/vertex";

/**
 * Create a 3d vector of u-v in the axes plane.
 * @param {String} axes xy, xz, yx, ...
 * @param {Number} u
 * @param {Number} v
 * @returns {Vector}
 */
function vec(axes, u, v) {
  let t = new Vector();
  t[axes[0]] = u;
  t[axes[1]] = v;
  return t;
}

/**
 * Defines a 2d path in u-v coordinates.
 */
export class Path {
  constructor() {
    this.d = [];
  }

  /**
   * Move to a given coordinate.
   * @param {Number} u
   * @param {Number} v
   * @returns {this}
   */
  moveTo(u, v) {
    if (this.d.length !== 0) {
      throw "Multiple Segments not allowed.";
    }

    this.d.push({ cmd: "m", u: u, v: v });
    return this;
  }

  /**
   * Line to a given coordinate.
   * @param {Number} u
   * @param {Number} v
   * @returns {this}
   */
  lineTo(u, v) {
    if (this.d.length === 0) {
      throw "Currently not positioned. Use moveTo first!";
    }
    this.d.push({ cmd: "l", u: u, v: v });
    return this;
  }

  /**
   * Close path.
   * @returns {this}
   */
  close() {
    return this;
  }

  /**
   * Reverse the path order
   */
  reverse() {
    this.d = this.d.reverse();
  }

  /**
   * Return the path points as 3d vertices with normals.
   * @param {String} [axes] the optional 3d plane (default: xz)
   * @param {Number} [resolution] the optional resolution for approximating curves (default: 10)
   * @returns {Array<Vertex>}
   */
  points(axes, resolution) {
    resolution = resolution || 10;
    axes = axes || "xz";
    let last = null;
    let positions = this.d.map(d => ({ u: d.u, v: d.v }));

    return positions.map((a, i) => {
      let b = positions[(i + 1) % positions.length];

      let du = b.u - a.u;
      let dv = b.v - a.v;

      let n = vec(axes, dv, -du).unit();
      return new Vertex(vec(axes, a.u, a.v), n);
    });
  }
}
