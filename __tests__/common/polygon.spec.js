import { Vector, UNIT_Y } from "../../src/common/vector";
import { Vertex } from "../../src/common/vertex";
import { Polygon } from "../../src/common/polygon";

describe("polygon", () => {
  test("polygon", () => {
    let v = [new Vertex(new Vector(0, 0, 0), UNIT_Y), new Vertex(new Vector(10, 0, 0), UNIT_Y), new Vertex(new Vector(0, 0, 10), UNIT_Y)];
    let p = new Polygon(v, 42);

    expect(p.vertices.length).toBe(3);
    expect(p.vertices[0]).toEqual({ position: { x: 0, y: 0, z: 0 }, normal: { x: 0, y: 1, z: 0 } });
    expect(p.vertices[1]).toEqual({ position: { x: 10, y: 0, z: 0 }, normal: { x: 0, y: 1, z: 0 } });
    expect(p.vertices[2]).toEqual({ position: { x: 0, y: 0, z: 10 }, normal: { x: 0, y: 1, z: 0 } });
    expect(p.shared).toBe(42);
    expect(p.plane.normal).toEqual({ x: 0, y: -1, z: 0 });
    expect(p.plane.w).toBe(0);

    let p1 = p.clone();
    expect(p1.vertices.length).toBe(3);
    expect(p1.vertices[0]).toEqual({ position: { x: 0, y: 0, z: 0 }, normal: { x: 0, y: 1, z: 0 } });
    expect(p1.vertices[1]).toEqual({ position: { x: 10, y: 0, z: 0 }, normal: { x: 0, y: 1, z: 0 } });
    expect(p1.vertices[2]).toEqual({ position: { x: 0, y: 0, z: 10 }, normal: { x: 0, y: 1, z: 0 } });
    expect(p1.shared).toBe(42);
    expect(p1.plane.normal).toEqual({ x: 0, y: -1, z: 0 });
    expect(p1.plane.w).toBe(0);

    p1.flip();
    expect(p1.vertices.length).toBe(3);
    expect(p1.vertices[2]).toEqual({ position: { x: 0, y: 0, z: 0 }, normal: { x: 0, y: -1, z: 0 } });
    expect(p1.vertices[1]).toEqual({ position: { x: 10, y: 0, z: 0 }, normal: { x: 0, y: -1, z: 0 } });
    expect(p1.vertices[0]).toEqual({ position: { x: 0, y: 0, z: 10 }, normal: { x: 0, y: -1, z: 0 } });
    expect(p1.shared).toBe(42);
    expect(p1.plane.normal).toEqual({ x: 0, y: 1, z: 0 });
    expect(p1.plane.w).toBe(-0);
  });
});
