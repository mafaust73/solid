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

function normal(axes, a, b) {
  let d = b.minus(a);
  let n = vec(axes, -d.v, d.u).unit();
  return n;
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
    this.d.push({ cmd: "c" });
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
          positions = positions.concat(pts.map(p => p.pt));
          break;
        default:
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

  /**
   * Return the path points as 3d vertices with normals.
   * @param {String} [axes] the optional 3d plane (default: xz)
   * @param {Number} [resolution] the optional resolution for approximating curves (default: 10)
   * @returns {Array<Vertex>}
   */
  segments(axes, resolution) {
    resolution = resolution || 10;
    axes = axes || "xz";
    let last = null;

    let segments = [];

    let current = this.d[0].pt;
    for (let i = 1; i < this.d.length; i++) {
      switch (this.d[i].cmd) {
        case "l":
          {
            let n = normal(axes, current, this.d[i].pt);
            segments.push({
              a: new Vertex(vec(axes, current.u, current.v), n),
              b: new Vertex(vec(axes, this.d[i].pt.u, this.d[i].pt.v), n)
            });
          }
          break;
        case "a":
          {
            let pts = arc(current, this.d[i].center, this.d[i].pt, this.d[i].cw, resolution);

            for (let p = 0; p < pts.length; p++) {
              let a = p === 0 ? current : pts[p - 1];
              let b = pts[p];

              if (p === 0) {
                segments.push({
                  a: new Vertex(vec(axes, a.u, a.v), vec(axes, a.u, a.v).unit()),
                  b: new Vertex(vec(axes, b.pt.u, b.pt.v), vec(axes, b.n.u, b.n.v))
                });
              } else {
                segments.push({
                  a: new Vertex(vec(axes, a.pt.u, a.pt.v), vec(axes, a.n.u, a.n.v)),
                  b: new Vertex(vec(axes, b.pt.u, b.pt.v), vec(axes, b.n.u, b.n.v))
                });
              }
            }
          }
          break;
        case "c":
          {
            let n = normal(axes, current, this.d[0].pt);
            segments.push({
              a: new Vertex(vec(axes, current.u, current.v), n),
              b: new Vertex(vec(axes, this.d[0].pt.u, this.d[0].pt.v), n)
            });
          }
          break;
      }
      current = this.d[i].pt;
    }

    return segments;
  }

  toSVG(resolution) {
    let segs = this.segments("xy", resolution);
    let svg = "<svg>\n";

    segs.forEach(s => {
      svg += `<line x1="${s.a.position.x}" y1="${-s.a.position.y}" x2="${s.b.position.x}" y2="${-s.b.position
        .y}" style="stroke:black;stroke-width:0.25px;fill:none"/>\n`;

      svg += `<line x1="${s.a.position.x}" y1="${-s.a.position.y}" x2="${s.a.position.x + s.a.normal.x * 5}" y2="${-s.a.position.y -
        s.a.normal.y * 5}" style="stroke:lime;stroke-width:0.1px;fill:none"/>\n`;
      svg += `<line x1="${s.b.position.x}" y1="${-s.b.position.y}" x2="${s.b.position.x + s.b.normal.x * 5}" y2="${-s.b.position.y -
        s.b.normal.y * 5}" style="stroke:lime;stroke-width:0.1px;fill:none"/>\n`;
    });
    svg += "</svg>";
    return svg;
  }
}
