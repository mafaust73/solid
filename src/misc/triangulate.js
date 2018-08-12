import { Point } from "./point";

/**
 * Wrap an index accordings to the array length.
 * @param {Integer} index the index
 * @param {Integer} length the array length
 * @returns {Integer} the wrapped index.
 */
function wrap(index, length) {
  if (index < 0) {
    return index + length;
  } else if (index >= length) {
    return index - length;
  }

  return index;
}
/**
 * Point in triangle check
 * @param {Point} p the point to be checked
 * @param {Point} a
 * @param {Point} b
 * @param {Point} c
 * @return {Boolean}
 */
function isPointInTriangle(p, a, b, c) {
  return onRightSide(p, a, b) && onRightSide(p, b, c) && onRightSide(p, c, a);
}

/**
 * Checks, if p is on the right side of ab
 * @param {Point} p
 * @param {Point} a
 * @param {Point} b
 * @returns {Boolean}
 */
function onRightSide(p, a, b) {
  let ba = b.minus(a);
  let pa = p.minus(a);

  return ba.cross(pa) < 0;
}

/**
 * Check, if we have a reflex vertex, i.e. angle is greater than 180.
 * @returns {Boolean}
 */
function isReflexVertex(a, b, c) {
  let u = b.minus(a);
  let v = b.minus(c);

  if (u.dot(v) > 0) {
    return true;
  }

  return onRightSide(b, c, a);
}

/**
 * Tests, if vertex i is an ear
 * @returns {Boolean}
 */
function isEar(points, ix) {
  let e1 = wrap(ix - 1, points.length);
  let e2 = wrap(ix, points.length);
  let e3 = wrap(ix + 1, points.length);

  let a = points[e1];
  let b = points[e2];
  let c = points[e3];

  if (!isReflexVertex(a, b, c)) {
    return false;
  }

  for (let j = 0; j < points.length; j++) {
    // Don't check vertices of triangle itself
    if (j == e1 || j == e2 || j == e3) {
      continue;
    }

    // Check, if point lies inside the triangle abc
    if (isPointInTriangle(points[j], a, b, c)) {
      return false;
    }
  }

  return true;
}

/**
 * Searches for an ear in the surface.
 */
function findEar(points) {
  for (let i = 0; i < points.length; i++) {
    if (isEar(points, i)) {
      return i;
    }
  }

  return false;
}

/**
 * Triangulate a set of points
 * @param {Array<Point>} points the polygon to be triangulated
 * @param {Array<[Point, Point, Point]>}
 */
export function triangulate(points) {
  let triangles = [];

  if (!points || points.length < 3) {
    return triangles;
  }

  while (points.length > 3) {
    let ear = findEar(points);
    if (ear === false) {
      // There is no reflex vertex left, so do normal triangulation
      for (let i = 1; i < points.length; i += 2) {
        triangles.push([points[wrap(0, points.length)], points[wrap(i, points.length)], points[wrap(i + 1, points.length)]]);
      }

      return triangles;
    }

    triangles.push([points[wrap(ear - 1, points.length)], points[wrap(ear, points.length)], points[wrap(ear + 1, points.length)]]);
    points.splice(ear, 1);
  }

  triangles.push([points[0], points[1], points[2]]);
  return triangles;
}
