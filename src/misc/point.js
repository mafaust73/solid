export class Point {
  constructor(u, v) {
    this.u = u || 0;
    this.v = v || 0;
  }

  clone() {
    return new Point(this.u, this.v);
  }

  negated() {
    return new Point(-this.u, -this.v);
  }

  plus(a) {
    return new Point(this.u + a.u, this.v + a.v);
  }

  minus(a) {
    return new Point(this.u - a.u, this.v - a.v);
  }

  times(a) {
    return new Point(this.u * a, this.v * a);
  }

  dividedBy(a) {
    return new Point(this.u / a, this.v / a);
  }

  dot(a) {
    return this.u * a.u + this.v * a.v;
  }

  lerp(a, t) {
    let du = a.u - this.u;
    let dv = a.v - this.v;
    return new Point(this.u + t * du, this.v + t * dv);
  }

  length() {
    return Math.sqrt(this.u * this.u + this.v * this.v);
  }

  unit() {
    return this.dividedBy(this.length());
  }

  rotate(alpha) {
    let c = Math.cos(alpha);
    let s = Math.sin(alpha);

    return new Point(this.u * c - this.v * s, this.u * s + this.v * c);
  }
}
