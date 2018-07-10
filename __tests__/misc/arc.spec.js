import { Point } from "../../src/misc/point";
import { angle, arc } from "../../src/misc/arc";

import fs from "fs";

const EPSILON = 1e-6;

function svg(name, start, center, end, points) {
  let txt = "<svg>\n";
  for (let i = 1; i < points.length; i++) {
    let a = points[i - 1];
    let b = points[i];

    txt += `<line x1="${a.u}" y1="${-a.v}" x2="${b.u}" y2="${-b.v}" style="stroke:black;stroke-width:1px;fill:none" />\n`;
  }
  for (let i = 0; i < points.length; i++) {
    let a = points[i];
    txt += `<circle cx="${a.u}" cy="${-a.v}" r="3" style="stroke:none;fill:#00ff0099" />\n`;
  }

  txt += `<circle cx="${start.u}" cy="${-start.v}" r="10" style="stroke:none;fill:#ff0000" />\n`;
  txt += `<circle cx="${center.u}" cy="${-center.v}" r="8" style="stroke:none;fill:#ff9900" />\n`;
  txt += `<circle cx="${end.u}" cy="${-end.v}" r="10" style="stroke:none;fill:#ff00ff" />\n`;

  txt += "</svg>";
  fs.writeFileSync(name, txt);
}

expect.extend({
  toAlmostBe(received, expected) {
    let pass = Math.abs(received - expected) < EPSILON;
    return {
      pass: pass,
      message: () => `expected ${received} almost equal to ${expected}`
    };
  }
});

describe("angle", () => {
  test("0, 45, 90, 135, 180, 225, 270, 315", () => {
    expect(angle(new Point(100, 0))).toAlmostBe((0 * Math.PI) / 180);
    expect(angle(new Point(100, 100))).toAlmostBe((45 * Math.PI) / 180);
    expect(angle(new Point(0, 100))).toAlmostBe((90 * Math.PI) / 180);
    expect(angle(new Point(-100, 100))).toAlmostBe((135 * Math.PI) / 180);
    expect(angle(new Point(-100, 0))).toAlmostBe((180 * Math.PI) / 180);
    expect(angle(new Point(-100, -100))).toAlmostBe((225 * Math.PI) / 180);
    expect(angle(new Point(0, -100))).toAlmostBe((270 * Math.PI) / 180);
    expect(angle(new Point(100, -100))).toAlmostBe((315 * Math.PI) / 180);
  });
});

describe("arc", () => {
  test("cw", () => {
    let start = new Point(0, 100);
    let end = new Point(100, 0);
    let center = new Point(0, 0);

    let result = arc(start, center, end, true, 10);
    svg("cw.svg", start, center, end, result);
    result = arc(end, center, start, true, 10);
    svg("cw1.svg", end, center, start, result);

    result = arc(end, center, start, false, 10);
    svg("cw2.svg", end, center, start, result);

    result = arc(start, center, end, false, 10);
    svg("cw3.svg", start, center, end, result);

    start = new Point(-100, 0);
    end = new Point(100, 0);
    center = new Point(0, 0);

    result = arc(start, center, end, true, 10);
    svg("cw4.svg", start, center, end, result);
    result = arc(start, center, end, false, 10);
    svg("cw5.svg", start, center, end, result);

    /*expect(result).toEqual([
      { u: 15.643446504023087, v: 98.76883405951378 },
      { u: 30.901699437494738, v: 95.10565162951535 },
      { u: 45.399049973954675, v: 89.10065241883679 },
      { u: 58.778525229247315, v: 80.90169943749474 },
      { u: 70.71067811865474, v: 70.71067811865476 },
      { u: 80.90169943749474, v: 58.778525229247315 },
      { u: 89.10065241883677, v: 45.39904997395469 },
      { u: 95.10565162951535, v: 30.901699437494745 },
      { u: 98.76883405951378, v: 15.643446504023093 },
      { u: 100, v: 6.123233995736766e-15 }
    ]);*/
  });

  /*test("ccw", () => {
    let start = new Point(0, 100);
    let end = new Point(100, 0);
    let center = new Point(0, 0);

    let result = arc(start, center, end, false, 10);
    expect(result).toEqual([
      { u: -45.399049973954675, v: 89.10065241883679 },
      { u: -80.90169943749474, v: 58.778525229247315 },
      { u: -98.76883405951378, v: 15.643446504023093 },
      { u: -95.10565162951536, v: -30.901699437494734 },
      { u: -70.71067811865476, v: -70.71067811865474 },
      { u: -30.901699437494752, v: -95.10565162951535 },
      { u: 15.643446504023073, v: -98.76883405951378 },
      { u: 58.7785252292473, v: -80.90169943749474 },
      { u: 89.10065241883677, v: -45.39904997395469 },
      { u: 100, v: -1.8369701987210297e-14 }
    ]);
  });*/
});
