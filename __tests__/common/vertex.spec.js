import { Vector } from "../../src/common/vector";
import { Vertex } from "../../src/common/vertex";

describe("vertex", () => {
  test("init", () => {
    let v = new Vertex(new Vector(1, 2, 3), new Vector(0, 1, 0));
    expect(v.position).toEqual({ x: 1, y: 2, z: 3 });
    expect(v.normal).toEqual({ x: 0, y: 1, z: 0 });
  });

  test("clone", () => {
    let v = new Vertex(new Vector(1, 2, 3), new Vector(0, 1, 0));
    let v1 = v.clone();
    expect(v1.position).toEqual({ x: 1, y: 2, z: 3 });
    expect(v1.normal).toEqual({ x: 0, y: 1, z: 0 });
  });

  test("flip", () => {
    let v = new Vertex(new Vector(1, 2, 3), new Vector(0, 1, 0));
    v.flip();
    expect(v.position).toEqual({ x: 1, y: 2, z: 3 });
    expect(v.normal).toEqual({ x: 0, y: -1, z: 0 });
  });
});
