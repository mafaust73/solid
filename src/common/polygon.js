import { Plane } from "./plane";

/**
 * Represents a convex polygon. The vertices used to initialize a polygon must
 * be coplanar and form a convex loop. They do not have to be `CSG.Vertex`
 * instances but they must behave similarly (duck typing can be used for
 * customization).
 *
 * Each convex polygon has a `shared` property, which is shared between all
 * polygons that are clones of each other or were split from the same polygon.
 * This can be used to define per-polygon properties (such as surface color).
 */
export class Polygon {
  constructor(vertices, shared) {
    this.vertices = vertices;
    this.shared = shared;
    this.plane = Plane.fromPoints(vertices[0].position, vertices[1].position, vertices[2].position);
  }

  clone() {
    let vertices = this.vertices.map(v => v.clone());
    return new Polygon(vertices, this.shared);
  }

  flip() {
    this.vertices.reverse().map(v => v.flip());
    this.plane.flip();
  }
}
