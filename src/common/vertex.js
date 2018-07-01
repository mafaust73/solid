/**
 * Represents a vertex of a polygon. Use your own vertex class instead of this
 * one to provide additional features like texture coordinates and vertex
 * colors. Custom vertex classes need to provide a `pos` property and `clone()`,
 * `flip()`, and `interpolate()` methods that behave analogous to the ones
 * defined by `CSG.Vertex`. This class provides `normal` so convenience
 * functions like `CSG.sphere()` can return a smooth vertex normal, but `normal`
 * is not used anywhere else.
 */
export class Vertex {
  constructor(position, normal) {
    this.position = position;
    this.normal = normal;
  }

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
