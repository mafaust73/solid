import { Lathe } from "../../src/volumes/lathe";
import { Vector } from "../../src/common/common";
import { Wavefront } from "../../src/io/wavefront";
import { Path } from "../../src/misc/path";
import { Point } from "../../src/misc/point";

describe("lathe", () => {
  test("simple", () => {
    let path = new Path()
      .moveTo(new Point(0, 1))
      .lineTo(new Point(1, 1))
      .lineTo(new Point(1, -1))
      .lineTo(new Point(0, -1));
    let lathe = new Lathe(path, 10, 4);
    expect(new Wavefront().write(lathe)).toMatchSnapshot();
  });
});
