import { ZERO, ONE } from "../../src/common/vector";
import { Cube } from "../../src/volumes/cube";
import { Wavefront } from "../../src/io/wavefront";

describe("wavefront", () => {
  test("wavefront", () => {
    const expected = `v -1 -1 -1
v -1 -1 1
v -1 1 1
v -1 1 -1
v 1 -1 -1
v 1 1 -1
v 1 1 1
v 1 -1 1
v -1 -1 -1
v 1 -1 -1
v 1 -1 1
v -1 -1 1
v -1 1 -1
v -1 1 1
v 1 1 1
v 1 1 -1
v -1 -1 -1
v -1 1 -1
v 1 1 -1
v 1 -1 -1
v -1 -1 1
v 1 -1 1
v 1 1 1
v -1 1 1
vn -1 0 0
vn -1 0 0
vn -1 0 0
vn -1 0 0
vn 1 0 0
vn 1 0 0
vn 1 0 0
vn 1 0 0
vn 0 -1 0
vn 0 -1 0
vn 0 -1 0
vn 0 -1 0
vn 0 1 0
vn 0 1 0
vn 0 1 0
vn 0 1 0
vn 0 0 -1
vn 0 0 -1
vn 0 0 -1
vn 0 0 -1
vn 0 0 1
vn 0 0 1
vn 0 0 1
vn 0 0 1
f 1//1 2//2 3//3
f 1//1 3//3 4//4
f 5//5 6//6 7//7
f 5//5 7//7 8//8
f 9//9 10//10 11//11
f 9//9 11//11 12//12
f 13//13 14//14 15//15
f 13//13 15//15 16//16
f 17//17 18//18 19//19
f 17//17 19//19 20//20
f 21//21 22//22 23//23
f 21//21 23//23 24//24
`;

    const cube = new Cube(ZERO, ONE);
    expect(new Wavefront().write(cube)).toBe(expected);
  });
});