import { Point } from "../../src/misc/point";

describe("point init", () => {
  test("setup", () => {
    expect(new Point()).toEqual({ u: 0, v: 0 });
    expect(new Point(1, 2)).toEqual({ u: 1, v: 2 });
  });

  test("clone", () => {
    expect(new Point().clone()).toEqual({ u: 0, v: 0 });
    expect(new Point(1, 2).clone()).toEqual({ u: 1, v: 2 });
  });
});

describe("math", () => {
  const a = new Point(1, 2);
  const b = new Point(3, 2);

  test("negated", () => {
    expect(a.negated()).toEqual({ u: -1, v: -2 });
    expect(a).toEqual({ u: 1, v: 2 });
  });

  test("length", () => {
    expect(new Point(5, 0).length()).toBe(5);
    expect(a.length()).toBe(Math.sqrt(5));
  });

  test("unit", () => {
    expect(new Point(5, 0).unit()).toEqual({ u: 1, v: 0 });
  });

  test("plus", () => {
    expect(a.plus(b)).toEqual({ u: 4, v: 4 });
    expect(a).toEqual({ u: 1, v: 2 });
    expect(b).toEqual({ u: 3, v: 2 });
  });

  test("minus", () => {
    expect(a.minus(b)).toEqual({ u: -2, v: 0 });
    expect(a).toEqual({ u: 1, v: 2 });
    expect(b).toEqual({ u: 3, v: 2 });
  });

  test("times / dividedBy", () => {
    expect(a.times(5)).toEqual({ u: 5, v: 10 });
    expect(a).toEqual({ u: 1, v: 2 });

    expect(a.dividedBy(2)).toEqual({ u: 0.5, v: 1 });
    expect(a).toEqual({ u: 1, v: 2 });
  });

  test("lerp", () => {
    expect(a.lerp(b, 0)).toEqual(a);
    expect(a.lerp(b, 1)).toEqual(b);
    expect(a.lerp(b, 0.5)).toEqual({ u: 2, v: 2 });
  });

  test("rotate", () => {
    expect(new Point(1, 0).rotate(Math.PI / 2)).toEqual({ u: 6.123233995736766e-17, v: 1 });
  });

  test("dot", () => {
    expect(a.dot(b)).toBe(7);
  });

  test("cross", () => {
    expect(a.cross(b)).toBe(-4);
  });
});
