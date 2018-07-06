import { Vector, ZERO, ONE } from "../../src/common/vector";
import { Cube } from "../../src/volumes/cube";
import { Povray } from "../../src/io/povray";

describe("povray", () => {
  test("povray", () => {
    const expected = `camera { location <2,2,2> look_at <0,0,0> }
light_source { <2,2,2> color rgb<1, 1, 1> }
mesh {
  smooth_triangle {
    <-1, -1, -1>, <-1, 0, 0>,
    <-1, -1, 1>, <-1, 0, 0>,
    <-1, 1, 1>, <-1, 0, 0>
  }
  smooth_triangle {
    <-1, -1, -1>, <-1, 0, 0>,
    <-1, 1, 1>, <-1, 0, 0>,
    <-1, 1, -1>, <-1, 0, 0>
  }
  smooth_triangle {
    <1, -1, -1>, <1, 0, 0>,
    <1, 1, -1>, <1, 0, 0>,
    <1, 1, 1>, <1, 0, 0>
  }
  smooth_triangle {
    <1, -1, -1>, <1, 0, 0>,
    <1, 1, 1>, <1, 0, 0>,
    <1, -1, 1>, <1, 0, 0>
  }
  smooth_triangle {
    <-1, -1, -1>, <0, -1, 0>,
    <1, -1, -1>, <0, -1, 0>,
    <1, -1, 1>, <0, -1, 0>
  }
  smooth_triangle {
    <-1, -1, -1>, <0, -1, 0>,
    <1, -1, 1>, <0, -1, 0>,
    <-1, -1, 1>, <0, -1, 0>
  }
  smooth_triangle {
    <-1, 1, -1>, <0, 1, 0>,
    <-1, 1, 1>, <0, 1, 0>,
    <1, 1, 1>, <0, 1, 0>
  }
  smooth_triangle {
    <-1, 1, -1>, <0, 1, 0>,
    <1, 1, 1>, <0, 1, 0>,
    <1, 1, -1>, <0, 1, 0>
  }
  smooth_triangle {
    <-1, -1, -1>, <0, 0, -1>,
    <-1, 1, -1>, <0, 0, -1>,
    <1, 1, -1>, <0, 0, -1>
  }
  smooth_triangle {
    <-1, -1, -1>, <0, 0, -1>,
    <1, 1, -1>, <0, 0, -1>,
    <1, -1, -1>, <0, 0, -1>
  }
  smooth_triangle {
    <-1, -1, 1>, <0, 0, 1>,
    <1, -1, 1>, <0, 0, 1>,
    <1, 1, 1>, <0, 0, 1>
  }
  smooth_triangle {
    <-1, -1, 1>, <0, 0, 1>,
    <1, 1, 1>, <0, 0, 1>,
    <-1, 1, 1>, <0, 0, 1>
  }
  texture{ pigment { color rgb<0,0.5,1> } }
}`;
    const cube = new Cube(ZERO, ONE);

    let result = new Povray().write(cube);
    expect(result).toBe(expected);
  });
});
