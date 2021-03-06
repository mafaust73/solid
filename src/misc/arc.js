import { Point } from "./point";
const RIGHT = new Point(1, 0);

export function angle(delta) {
  let angle = Math.atan2(delta.v, delta.u);
  if (delta.v < 0) {
    angle += 2 * Math.PI;
  }

  return angle;
}

/**
 * Calculate an arc.
 * @param {Point} start the start point
 * @param {Point} center the cener point
 * @param {Point} end the end point
 * @param {Boolean} cs clockwise?
 * @param {Integer} resolution the number of steps
 */
export function arc(start, center, end, cw, resolution) {
  let deltaStart = start.minus(center);
  let deltaEnd = end.minus(center);

  /*if (deltaStart.length() !== deltaEnd.length()) {
    throw `Lengths are different ${deltaStart.length()} !== ${deltaEnd.length()}. Never reaching the end!`;
  }*/

  let negate = false;
  let startAngle = angle(deltaStart);
  let endAngle = angle(deltaEnd);
  let deltaAngle = endAngle - startAngle;
  if (endAngle < startAngle && cw !== true) {
    negate = true;
    deltaAngle += 2 * Math.PI;
  }

  if (cw === false) {
    negate = true;
  }

  let points = [];
  for (let i = 1; i <= resolution; i++) {
    let angle = (deltaAngle * i) / resolution;
    let uv = deltaStart.rotate(angle);
    let n = negate ? uv.unit().negated() : uv.unit();
    points.push({ pt: center.plus(uv), n: n });
    angle += deltaAngle;
  }

  return points;
}
