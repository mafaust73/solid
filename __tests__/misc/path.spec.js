import { Path } from "../../src/misc/path";
import { Point } from "../../src/misc/point";

describe("path", () => {
  test("simple", () => {
    let path = new Path()
      .moveTo(new Point(-1, -1))
      .lineTo(new Point(1, -1))
      .lineTo(new Point(1, 1))
      .lineTo(new Point(-1, 1))
      .close();

    expect(path.points("xy")).toEqual([
      { normal: { x: 0, y: 1, z: 0 }, position: { x: -1, y: -1, z: 0 } },
      { normal: { x: -1, y: 0, z: 0 }, position: { x: 1, y: -1, z: 0 } },
      { normal: { x: 0, y: -1, z: 0 }, position: { x: 1, y: 1, z: 0 } },
      { normal: { x: 1, y: 0, z: 0 }, position: { x: -1, y: 1, z: 0 } }
    ]);
    expect(path.points("xz")).toEqual(path.points());
    expect(path.points("xz")).toEqual([
      { normal: { x: 0, y: 0, z: 1 }, position: { x: -1, y: 0, z: -1 } },
      { normal: { x: -1, y: 0, z: 0 }, position: { x: 1, y: 0, z: -1 } },
      { normal: { x: 0, y: 0, z: -1 }, position: { x: 1, y: 0, z: 1 } },
      { normal: { x: 1, y: 0, z: 0 }, position: { x: -1, y: 0, z: 1 } }
    ]);

    expect(() => new Path().lineTo(new Point(1, 1))).toThrow("Currently not positioned. Use moveTo first!");
    expect(() => new Path().moveTo(new Point(1, 1)).moveTo(new Point(2, 2))).toThrow("Multiple Segments not allowed.");
    expect(() => new Path().arcTo(new Point(1, 1), new Point(0, 0), true)).toThrow("Currently not positioned. Use moveTo first!");
  });

  test("arcTo", () => {
    let path = new Path().moveTo(new Point(0, 1)).arcTo(new Point(1, 0), new Point(0, 0), true);

    expect(path.points("xz", 2)).toEqual([
      { normal: { x: 0.3826834323650898, y: 0, z: 0.9238795325112867 }, position: { x: 0, y: 0, z: 1 } },
      { normal: { x: 0.9238795325112867, y: 0, z: 0.3826834323650899 }, position: { x: 0.7071067811865475, y: 0, z: 0.7071067811865476 } },
      { normal: { x: -0.7071067811865475, y: 0, z: -0.7071067811865476 }, position: { x: 1, y: 0, z: 6.123233995736766e-17 } }
    ]);
  });

  test("reverse", () => {
    let path = new Path()
      .moveTo(new Point(0, 0))
      .lineTo(new Point(1, 0))
      .lineTo(new Point(0, 1));

    expect(path.d).toEqual([{ cmd: "m", pt: { u: 0, v: 0 } }, { cmd: "l", pt: { u: 1, v: 0 } }, { cmd: "l", pt: { u: 0, v: 1 } }]);
    expect(path.points("xy")).toEqual([
      { normal: { x: 0, y: 1, z: 0 }, position: { x: 0, y: 0, z: 0 } },
      { normal: { x: -0.7071067811865475, y: -0.7071067811865475, z: 0 }, position: { x: 1, y: 0, z: 0 } },
      { normal: { x: 1, y: 0, z: 0 }, position: { x: 0, y: 1, z: 0 } }
    ]);
    path.reverse();
    expect(path.d).toEqual([{ cmd: "m", pt: { u: 0, v: 0 } }, { cmd: "l", pt: { u: 0, v: 1 } }, { cmd: "l", pt: { u: 1, v: 0 } }]);
    expect(path.points("xy")).toEqual([
      { normal: { x: -1, y: 0, z: 0 }, position: { x: 0, y: 0, z: 0 } },
      { normal: { x: 0.7071067811865475, y: 0.7071067811865475, z: 0 }, position: { x: 0, y: 1, z: 0 } },
      { normal: { x: 0, y: -1, z: 0 }, position: { x: 1, y: 0, z: 0 } }
    ]);
  });

  test("complex drill path", () => {
    // https://schneidwerkzeugmechaniker.info/mediawiki/images/thumb/3/3a/Bohrer3a.jpg/600px-Bohrer3a.jpg
    let d = 18;
    let rd = 17;
    let b = 2;

    let path = new Path()
      .moveTo(new Point(-b / 2, d / 2))
      .lineTo(new Point(b / 2, d / 2))
      .lineTo(new Point(b / 2, rd / 2))
      .arcTo(new Point(rd / 2, 0), new Point(0, 0), true)
      .arcTo(new Point(b / 2, 0), new Point((rd + b) / 4, 0), false)
      .lineTo(new Point(b / 2, -d / 2))
      .lineTo(new Point(-b / 2, -d / 2))
      .lineTo(new Point(-b / 2, -rd / 2))
      .arcTo(new Point(-rd / 2, 0), new Point(0, 0), true)
      .arcTo(new Point(-b / 2, 0), new Point(-(rd + b) / 4), false)
      .close();

    let result = path.toSVG(10);
    expect(path.d.length).toBe(11);
    expect(result).toMatchSnapshot();
  });
});
