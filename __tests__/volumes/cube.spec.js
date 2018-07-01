import { Cube } from "../../src/volumes/cube";
import { ZERO, Vector } from "../../src/common/common";

describe("cube", () => {
  test("cube", () => {
    let cube = new Cube(ZERO, new Vector(2, 4, 6));

    expect(cube.polygons.length).toBe(6);
    expect(cube.polygons[0].plane).toEqual({ normal: { x: -1, y: 0, z: 0 }, w: 2 });
    expect(cube.polygons[1].plane).toEqual({ normal: { x: 1, y: 0, z: 0 }, w: 2 });

    expect(cube.polygons[2].plane).toEqual({ normal: { x: 0, y: -1, z: 0 }, w: 4 });
    expect(cube.polygons[3].plane).toEqual({ normal: { x: 0, y: 1, z: 0 }, w: 4 });

    expect(cube.polygons[4].plane).toEqual({ normal: { x: 0, y: 0, z: -1 }, w: 6 });
    expect(cube.polygons[5].plane).toEqual({ normal: { x: 0, y: 0, z: 1 }, w: 6 });
  });
});
