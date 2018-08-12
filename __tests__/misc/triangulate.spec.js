import { Point } from "../../src/misc/point";

const module = require("../../src/misc/triangulate");

describe("internal function tests", () => {
  test("wrap", () => {
    const wrap = module.__get__("wrap");
    expect(wrap(0, 3)).toBe(0);
    expect(wrap(1, 3)).toBe(1);
    expect(wrap(2, 3)).toBe(2);
    expect(wrap(3, 3)).toBe(0);
    expect(wrap(4, 3)).toBe(1);
    expect(wrap(-1, 3)).toBe(2);
    expect(wrap(-2, 3)).toBe(1);
    expect(wrap(-3, 3)).toBe(0);
  });

  test("onRightSide", () => {
    const onRightSide = module.__get__("onRightSide");
    let a = new Point(0, 0);
    let b = new Point(10, 10);

    expect(onRightSide(new Point(5, 6), a, b)).toBe(false);
    expect(onRightSide(new Point(6, 5), a, b)).toBe(true);
  });

  test("isPointInTriangle", () => {
    const isPointInTriangle = module.__get__("isPointInTriangle");
    let a = new Point(0, 0);
    let b = new Point(5, 5);
    let c = new Point(10, 0);

    expect(isPointInTriangle(new Point(5, 2), a, b, c)).toBe(true);
    expect(isPointInTriangle(new Point(1, 3), a, b, c)).toBe(false);
    expect(isPointInTriangle(new Point(1, -3), a, b, c)).toBe(false);
    expect(isPointInTriangle(new Point(8, 3), a, b, c)).toBe(false);
  });

  test("isReflexVertex", () => {
    const isReflexVertex = module.__get__("isReflexVertex");
    let a = new Point(0, 0);
    let b = new Point(5, 5);
    let c = new Point(10, 0);

    expect(isReflexVertex(a, b, c)).toBe(true);
  });

  test("isEar", () => {
    const isEar = module.__get__("isEar");
    let a = new Point(0, 0);
    let b = new Point(5, 5);
    let c = new Point(10, 0);

    expect(isEar([a, b, c], 0)).toBe(true);
  });

  test("findEar", () => {
    const findEar = module.__get__("findEar");
    let a = new Point(0, 0);
    let b = new Point(5, 5);
    let c = new Point(10, 0);
    expect(findEar([a, b, c])).toBe(0);
  });
});

describe("triangulate", () => {
  const triangulate = module.triangulate;

  test("quad", () => {
    let points = [new Point(0, 0), new Point(0, 10), new Point(10, 10), new Point(10, 0)];
    let tris = triangulate(points);
    expect(tris.length).toBe(2);
    expect(tris).toEqual([[{ u: 10, v: 0 }, { u: 0, v: 0 }, { u: 0, v: 10 }], [{ u: 0, v: 10 }, { u: 10, v: 10 }, { u: 10, v: 0 }]]);
  });

  test("complex", () => {
    let points = [new Point(0, 20), new Point(30, 50), new Point(40, 30), new Point(70, 20), new Point(30, 0)];

    let tris = triangulate(points);
    expect(tris.length).toBe(3);
    expect(tris).toEqual([
      [{ u: 30, v: 0 }, { u: 0, v: 20 }, { u: 30, v: 50 }],
      [{ u: 30, v: 0 }, { u: 30, v: 50 }, { u: 40, v: 30 }],
      [{ u: 40, v: 30 }, { u: 70, v: 20 }, { u: 30, v: 0 }]
    ]);
  });
});
