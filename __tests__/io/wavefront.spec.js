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
f 3//3 2//2 1//1
f 4//4 3//3 1//1
f 7//7 6//6 5//5
f 8//8 7//7 5//5
f 11//11 10//10 9//9
f 12//12 11//11 9//9
f 15//15 14//14 13//13
f 16//16 15//15 13//13
f 19//19 18//18 17//17
f 20//20 19//19 17//17
f 23//23 22//22 21//21
f 24//24 23//23 21//21
`;

    const cube = new Cube(ZERO, ONE);
    expect(new Wavefront().write(cube)).toBe(expected);
  });
});
