import { ZERO, ONE } from "../../src/common/vector";
import { Cube } from "../../src/volumes/cube";
import { Wavefront } from "../../src/io/wavefront";

describe("wavefront", () => {
  test("wavefront", () => {
    const cube = new Cube(ZERO, ONE);
    expect(new Wavefront().write(cube)).toMatchSnapshot();
  });
});
