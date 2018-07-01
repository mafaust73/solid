import { NEGATIVE_INFINITY, POSITIVE_INFINITY, ZERO, ONE, UNIT_X, UNIT_Y, UNIT_Z, Vector } from "../../src/common/vector";

describe("vector init", () => {
  test("unit", () => {
    expect(NEGATIVE_INFINITY).toEqual({ x: -Infinity, y: -Infinity, z: -Infinity });
    expect(POSITIVE_INFINITY).toEqual({ x: Infinity, y: Infinity, z: Infinity });

    expect(ZERO).toEqual({ x: 0, y: 0, z: 0 });
    expect(ONE).toEqual({ x: 1, y: 1, z: 1 });

    expect(UNIT_X).toEqual({ x: 1, y: 0, z: 0 });
    expect(UNIT_Y).toEqual({ x: 0, y: 1, z: 0 });
    expect(UNIT_Z).toEqual({ x: 0, y: 0, z: 1 });
  });

  test("setup", () => {
    expect(new Vector()).toEqual({ x: 0, y: 0, z: 0 });
    expect(new Vector(1, 2, 3)).toEqual({ x: 1, y: 2, z: 3 });
  });

  test("clone", () => {
    expect(new Vector().clone()).toEqual({ x: 0, y: 0, z: 0 });
    expect(new Vector(1, 2, 3).clone()).toEqual({ x: 1, y: 2, z: 3 });
  });
});

describe("math", () => {
  const a = new Vector(1, 2, 3);
  const b = new Vector(3, 2, 1);

  test("min, max", () => {
    expect(a.min(b)).toEqual({ x: 1, y: 2, z: 1 });
    expect(a.max(b)).toEqual({ x: 3, y: 2, z: 3 });
  });

  test("negated", () => {
    expect(a.negated()).toEqual({ x: -1, y: -2, z: -3 });
    expect(a).toEqual({ x: 1, y: 2, z: 3 });
  });

  test("length", () => {
    expect(new Vector(5, 0, 0).length()).toBe(5);
    expect(a.length()).toBe(Math.sqrt(14));
  });

  test("unit", () => {
    expect(new Vector(5, 0, 0).unit()).toEqual(UNIT_X);
  });

  test("cross", () => {
    expect(UNIT_X.cross(UNIT_Y)).toEqual(UNIT_Z);
    expect(UNIT_Y.cross(UNIT_X)).toEqual(UNIT_Z.negated());
  });

  test("plus", () => {
    expect(a.plus(b)).toEqual({ x: 4, y: 4, z: 4 });
    expect(a).toEqual({ x: 1, y: 2, z: 3 });
    expect(b).toEqual({ x: 3, y: 2, z: 1 });
  });

  test("minus", () => {
    expect(a.minus(b)).toEqual({ x: -2, y: 0, z: 2 });
    expect(a).toEqual({ x: 1, y: 2, z: 3 });
    expect(b).toEqual({ x: 3, y: 2, z: 1 });
  });

  test("times / dividedBy", () => {
    expect(a.times(5)).toEqual({ x: 5, y: 10, z: 15 });
    expect(a).toEqual({ x: 1, y: 2, z: 3 });

    expect(a.dividedBy(2)).toEqual({ x: 0.5, y: 1, z: 1.5 });
    expect(a).toEqual({ x: 1, y: 2, z: 3 });
  });

  test("lerp", () => {
    expect(a.lerp(b, 0)).toEqual(a);
    expect(a.lerp(b, 1)).toEqual(b);
    expect(a.lerp(b, 0.5)).toEqual({ x: 2, y: 2, z: 2 });
  });

  test("rotateY", () => {
    expect(a.rotateY(Math.PI / 2)).toEqual({ x: 3, y: 2, z: -0.9999999999999998 });
  });
});
