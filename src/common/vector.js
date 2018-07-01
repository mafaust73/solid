export class Vector {
  constructor(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  min(v) {
    return new Vector(Math.min(this.x, v.x), Math.min(this.y, v.y), Math.min(this.z, v.z));
  }
  max(v) {
    return new Vector(Math.max(this.x, v.x), Math.max(this.y, v.y), Math.max(this.z, v.z));
  }

  clone() {
    return new Vector(this.x, this.y, this.z);
  }

  negated() {
    return new Vector(-this.x, -this.y, -this.z);
  }

  plus(a) {
    return new Vector(this.x + a.x, this.y + a.y, this.z + a.z);
  }

  minus(a) {
    return new Vector(this.x - a.x, this.y - a.y, this.z - a.z);
  }

  times(a) {
    return new Vector(this.x * a, this.y * a, this.z * a);
  }

  dividedBy(a) {
    return new Vector(this.x / a, this.y / a, this.z / a);
  }

  dot(a) {
    return this.x * a.x + this.y * a.y + this.z * a.z;
  }

  lerp(a, t) {
    let dx = a.x - this.x;
    let dy = a.y - this.y;
    let dz = a.z - this.z;
    return new Vector(this.x + t * dx, this.y + t * dy, this.z + t * dz);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  unit() {
    return this.dividedBy(this.length());
  }

  cross(a) {
    return new Vector(this.y * a.z - this.z * a.y, this.z * a.x - this.x * a.z, this.x * a.y - this.y * a.x);
  }

  rotateY(alpha) {
    let c = Math.cos(alpha);
    let s = Math.sin(alpha);

    return new Vector(this.x * c + this.z * s, this.y, -this.x * s + this.z * c);
  }
}

export const NEGATIVE_INFINITY = new Vector(-Infinity, -Infinity, -Infinity);
export const POSITIVE_INFINITY = new Vector(Infinity, Infinity, Infinity);

export const ZERO = new Vector(0, 0, 0);
export const ONE = new Vector(1, 1, 1);

export const UNIT_X = new Vector(1, 0, 0);
export const UNIT_Y = new Vector(0, 1, 0);
export const UNIT_Z = new Vector(0, 0, 1);
