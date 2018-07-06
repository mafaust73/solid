import { Vector, UNIT_X, UNIT_Y } from "../../src/common/vector";
import { Vertex } from "../../src/common/vertex";
import { Polygon } from "../../src/common/polygon";
import { Plane } from "../../src/common/plane";

describe("plane", () => {
  test("init", () => {
    let a = new Vector(-10, 0, -10);
    let b = new Vector(10, 0, -10);
    let c = new Vector(10, 0, 10);

    let p = new Plane(UNIT_X, 1);
    expect(p).toEqual({ normal: { x: 1, y: 0, z: 0 }, w: 1 });
    expect(p.dump()).toBe("PLANE (1, 0, 0)@1");

    let plane = Plane.fromPoints(a, b, c);
    expect(plane).toEqual({ normal: { x: 0, y: -1, z: 0 }, w: -0 });
    plane.flip();
    expect(plane).toEqual({ normal: { x: 0, y: 1, z: 0 }, w: 0 });
    expect(plane.clone()).toEqual({ normal: { x: 0, y: 1, z: 0 }, w: 0 });
  });

  test("split", () => {
    // Clip plane is Z Axis
    let plane = new Plane(UNIT_X, 0);

    // 20x20 rectangle in XZ plane around origin
    let v = [
      new Vertex(new Vector(-10, 0, -10), UNIT_Y),
      new Vertex(new Vector(10, 0, -10), UNIT_Y),
      new Vertex(new Vector(10, 0, 10), UNIT_Y),
      new Vertex(new Vector(-10, 0, 10), UNIT_Y)
    ];

    let p = new Polygon(v, null);
    let coplanarFront = [];
    let coplanarBack = [];
    let front = [];
    let back = [];
    plane.splitPolygon(p, coplanarFront, coplanarBack, front, back);

    expect(coplanarFront.length).toBe(0);
    expect(coplanarBack.length).toBe(0);
    expect(front.length).toBe(1);
    expect(back.length).toBe(1);

    const expectedFront = [
      new Vertex(new Vector(0, 0, -10), UNIT_Y),
      new Vertex(new Vector(10, 0, -10), UNIT_Y),
      new Vertex(new Vector(10, 0, 10), UNIT_Y),
      new Vertex(new Vector(0, 0, 10), UNIT_Y)
    ];

    expect(front[0].vertices).toEqual(expectedFront);

    const expectedBack = [
      new Vertex(new Vector(-10, 0, -10), UNIT_Y),
      new Vertex(new Vector(0, 0, -10), UNIT_Y),
      new Vertex(new Vector(0, 0, 10), UNIT_Y),
      new Vertex(new Vector(-10, 0, 10), UNIT_Y)
    ];

    expect(back[0].vertices).toEqual(expectedBack);
  });

  test("split coplanar back", () => {
    // Clip plane is Z Axis
    let plane = new Plane(UNIT_Y, 0);

    // 20x20 rectangle in XZ plane around origin
    let v = [
      new Vertex(new Vector(-10, 0, -10), UNIT_Y),
      new Vertex(new Vector(10, 0, -10), UNIT_Y),
      new Vertex(new Vector(10, 0, 10), UNIT_Y),
      new Vertex(new Vector(-10, 0, 10), UNIT_Y)
    ];

    let p = new Polygon(v, null);
    let coplanarFront = [];
    let coplanarBack = [];
    let front = [];
    let back = [];
    plane.splitPolygon(p, coplanarFront, coplanarBack, front, back);

    expect(coplanarFront.length).toBe(0);
    expect(coplanarBack.length).toBe(1);
    expect(front.length).toBe(0);
    expect(back.length).toBe(0);
  });

  test("split coplanar front", () => {
    // Clip plane is Z Axis
    let plane = new Plane(UNIT_Y, 0);

    // 20x20 rectangle in XZ plane around origin
    let v = [
      new Vertex(new Vector(-10, 0, 10), UNIT_Y),
      new Vertex(new Vector(10, 0, 10), UNIT_Y),
      new Vertex(new Vector(10, 0, -10), UNIT_Y),
      new Vertex(new Vector(-10, 0, -10), UNIT_Y)
    ];

    let p = new Polygon(v, null);
    let coplanarFront = [];
    let coplanarBack = [];
    let front = [];
    let back = [];
    plane.splitPolygon(p, coplanarFront, coplanarBack, front, back);

    expect(coplanarFront.length).toBe(1);
    expect(coplanarBack.length).toBe(0);
    expect(front.length).toBe(0);
    expect(back.length).toBe(0);
  });

  test.skip("random split", () => {
    // Clip plane is Z Axis
    let plane = new Plane(UNIT_Y, 0);
    const NUM = 1000000;
    let polys = [];
    for (let n = 0; n < NUM; n++) {
      let v = [
        new Vertex(new Vector(Math.random() * 100.0, 0, Math.random() * 100.0), UNIT_Y),
        new Vertex(new Vector(Math.random() * 100.0, 0, Math.random() * 100.0), UNIT_Y),
        new Vertex(new Vector(Math.random() * 100.0, 0, Math.random() * 100.0), UNIT_Y),
        new Vertex(new Vector(Math.random() * 100.0, 0, Math.random() * 100.0), UNIT_Y)
      ];

      polys.push(new Polygon(v, null));
    }

    let coplanarFront = [];
    let coplanarBack = [];
    let front = [];
    let back = [];
    let t0 = Date.now();
    for (let n = 0; n < NUM; n++) {
      plane.splitPolygon(polys[n], coplanarFront, coplanarBack, front, back);
    }
    let t1 = Date.now();
    console.log(t1 - t0);
  });

  // TODO: FRONT & BACK cases not covered
});
