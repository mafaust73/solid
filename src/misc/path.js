import { Vector } from "../common/vector";
import { Vertex } from "../common/vertex";
import { Point } from "./point";
import { arc } from "./arc";

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
   * @param {Point} pt
   * @returns {this}
   */
  moveTo(pt) {
    if (this.d.length !== 0) {
      throw "Multiple Segments not allowed.";
    }

    this.d.push({ cmd: "m", pt: pt });
    return this;
  }

  /**
   * Line to a given coordinate.
   * @param {Point} pt
   * @returns {this}
   */
  lineTo(pt) {
    if (this.d.length === 0) {
      throw "Currently not positioned. Use moveTo first!";
    }
    this.d.push({ cmd: "l", pt: pt });
    return this;
  }

  arcTo(end, center, cw) {
    if (this.d.length === 0) {
      throw "Currently not positioned. Use moveTo first!";
    }
    this.d.push({ cmd: "a", pt: end, center: center, cw: cw });
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
    this.d = [this.d[0]].concat(this.d.slice(1).reverse());
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

    let positions = [];

    let current = this.d[0].pt;
    positions.push(current);
    for (let i = 1; i < this.d.length; i++) {
      switch (this.d[i].cmd) {
        case "l":
          positions.push(this.d[i].pt);
          break;
        case "a":
          let pts = arc(current, this.d[i].center, this.d[i].pt, this.d[i].cw, resolution);
          positions = positions.concat(pts);
          break;
      }
      current = this.d[i].pt;
    }

    return positions.map((a, i) => {
      let b = positions[(i + 1) % positions.length];
      let d = b.minus(a);
      let n = vec(axes, -d.v, d.u).unit();
      return new Vertex(vec(axes, a.u, a.v), n);
    });
  }

  toSVG(resolution) {
    let pts = this.points("xy", resolution);
    let svg = "<svg>\n";

    for (let i = 0; i < pts.length; i++) {
      let a = pts[i];
      svg += `<line x1="${a.position.x}" y1="${-a.position.y}" x2="${a.position.x + a.normal.x * 5}" y2="${-a.position.y -
        a.normal.y * 5}" style="stroke:lime;stroke-width:0.1px;fill:none"/>`;
    }

    for (let i = 0; i < pts.length; i++) {
      let a = pts[i];
      let b = pts[(i + 1) % pts.length];
      svg += `<line x1="${a.position.x}" y1="${-a.position.y}" x2="${b.position.x}" y2="${-b.position
        .y}" style="stroke:black;stroke-width:0.25px;fill:none"/>`;
    }
    svg += "</svg>";
    return svg;
  }
}
