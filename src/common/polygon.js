import { Plane } from "./plane";

/**
 * Represents a convex polygon. The vertices used to initialize a polygon must
 * be coplanar and form a convex loop.
 */
export class Polygon {
  /**
   * @param {Array<Vertex>} vertices the vertices
   * @param {String} [material] optional material name
   */
  constructor(vertices, material) {
    this.vertices = vertices;
    this.material = material || null;
    this.plane = Plane.fromPoints(vertices[0].position, vertices[1].position, vertices[2].position);
  }

  /**
   * Creates a digital clone of this polygon.
   * @returns {Polygon}
   */
  clone() {
    let vertices = this.vertices.map(v => v.clone());
    return new Polygon(vertices, this.material);
  }

  /**
   * Flip the polygon by reversing the vertices and flipping the normals.
   */
  flip() {
    this.vertices.reverse().map(v => v.flip());
    this.plane.flip();
  }
}
