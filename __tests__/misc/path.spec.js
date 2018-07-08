import { Path } from "../../src/misc/path";

describe("path", () => {
  test("simple", () => {
    let path = new Path()
      .moveTo(-1, -1)
      .lineTo(1, -1)
      .lineTo(1, 1)
      .lineTo(-1, 1)
      .close();

    expect(path.points("xy")).toEqual([
      { normal: { x: 0, y: -1, z: 0 }, position: { x: -1, y: -1, z: 0 } },
      { normal: { x: 1, y: 0, z: 0 }, position: { x: 1, y: -1, z: 0 } },
      { normal: { x: 0, y: 1, z: 0 }, position: { x: 1, y: 1, z: 0 } },
      { normal: { x: -1, y: 0, z: 0 }, position: { x: -1, y: 1, z: 0 } }
    ]);
    expect(path.points("xz")).toEqual(path.points());
    expect(path.points("xz")).toEqual([
      { normal: { x: 0, y: 0, z: -1 }, position: { x: -1, y: 0, z: -1 } },
      { normal: { x: 1, y: 0, z: 0 }, position: { x: 1, y: 0, z: -1 } },
      { normal: { x: 0, y: 0, z: 1 }, position: { x: 1, y: 0, z: 1 } },
      { normal: { x: -1, y: 0, z: 0 }, position: { x: -1, y: 0, z: 1 } }
    ]);

    expect(() => new Path().lineTo(1, 1)).toThrow("Currently not positioned. Use moveTo first!");
    expect(() => new Path().moveTo(1, 1).moveTo(2, 2)).toThrow("Multiple Segments not allowed.");
  });

  test("reverse", () => {
    let path = new Path()
      .moveTo(0, 0)
      .lineTo(1, 0)
      .lineTo(0, 1);

    expect(path.points("xy")).toEqual([
      { normal: { x: 0, y: -1, z: 0 }, position: { x: 0, y: 0, z: 0 } },
      { normal: { x: 0.7071067811865475, y: 0.7071067811865475, z: 0 }, position: { x: 1, y: 0, z: 0 } },
      { normal: { x: -1, y: 0, z: 0 }, position: { x: 0, y: 1, z: 0 } }
    ]);
    path.reverse();
    expect(path.points("xy")).toEqual([
      { normal: { x: -0.7071067811865475, y: -0.7071067811865475, z: 0 }, position: { x: 0, y: 1, z: 0 } },
      { normal: { x: 0, y: 1, z: 0 }, position: { x: 1, y: 0, z: 0 } },
      { normal: { x: 1, y: 0, z: 0 }, position: { x: 0, y: 0, z: 0 } }
    ]);
  });
});
