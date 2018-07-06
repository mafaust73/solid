/**
 * Represents a vertex of a polygon.
 */
export class Vertex {
  constructor(position, normal) {
    this.position = position;
    this.normal = normal;
  }

  /**
   * Creates a digital clone.
   */
  clone() {
    return new Vertex(this.position.clone(), this.normal.clone());
  }

  /**
   * Invert all orientation-specific data (e.g. vertex normal). Called when the
   *  orientation of a polygon is flipped.
   */
  flip() {
    this.normal = this.normal.negated();
  }

  /**
   * Create a new vertex between this vertex and `other` by linearly
   * interpolating all properties using a parameter of `t`. Subclasses should
   * override this to interpolate additional properties.
   */
  interpolate(other, t) {
    return new Vertex(this.position.lerp(other.position, t), this.normal.lerp(other.normal, t));
  }
}
