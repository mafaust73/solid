import { NEGATIVE_INFINITY, POSITIVE_INFINITY, UNIT_X, UNIT_Y, UNIT_Z, Vector } from "./vector";
import { Plane } from "./plane";

function findSplittingPlane(plane, polygons) {
  let minScore = Infinity;
  let splittingPlane = null;
  polygons.forEach(p => {
    let score = p.plane.normal.dot(plane.normal);
    if (score < minScore) {
      splittingPlane = p.plane;
      minScore = score;
    }
  });

  return plane.clone();
}

/**
 * Holds a node in a BSP tree. A BSP tree is built from a collection of polygons
 * by picking a polygon to split along. That polygon (and all other coplanar
 * polygons) are added directly to that node and the other polygons are added to
 * the front and/or back subtrees. This is not a leafy BSP tree since there is
 * no distinction between internal and leaf nodes.
 */
export class BspNode {
  constructor(polygons) {
    this.plane = null;
    this.front = null;
    this.back = null;
    this.polygons = [];
    if (polygons) {
      let t0 = Date.now();
      this.build(polygons);
      let t1 = Date.now();
      //console.log(t1 - t0, "ms");
    }
  }

  dump() {
    // ${this.plane.dump()}
    return `(${this.polygons.length} ${this.front ? this.front.dump() : ""} ${this.back ? this.back.dump() : ""})`;
  }

  clone() {
    let node = new BSPNode();
    node.plane = this.plane !== null && this.plane.clone();
    node.front = this.front !== null && this.front.clone();
    node.back = this.back !== null && this.back.clone();
    node.polygons = this.polygons.map(p => p.clone());
    return node;
  }

  // Convert solid space to empty space and empty space to solid space.
  invert() {
    this.polygons.forEach(p => p.flip());
    this.plane.flip();
    if (this.front !== null) {
      this.front.invert();
    }
    if (this.back !== null) {
      this.back.invert();
    }
    let temp = this.front;
    this.front = this.back;
    this.back = temp;
  }

  /**
   * Recursively remove all polygons in `polygons` that are inside this BSP tree.
   * @returns {Array<Polygon>}
   */
  clipPolygons(polygons) {
    if (this.plane === null) {
      return polygons.slice();
    }
    let front = [];
    let back = [];
    polygons.forEach(p => this.plane.splitPolygon(p, front, back, front, back));

    if (this.front !== null) {
      front = this.front.clipPolygons(front);
    }

    if (this.back !== null) {
      back = this.back.clipPolygons(back);
    } else {
      back = [];
    }

    return front.concat(back);
  }

  /**
   * Remove all polygons in this BSP tree that are inside the other BSP tree `bsp`.
   * @param {BspNode} bsp the other bsp tree
   */
  clipTo(bsp) {
    this.polygons = bsp.clipPolygons(this.polygons);
    if (this.front) {
      this.front.clipTo(bsp);
    }
    if (this.back) {
      this.back.clipTo(bsp);
    }
  }

  /**
   * Return a list of all polygons in this BSP tree.
   * @returns {Array<Polygon>}
   */
  allPolygons() {
    let polygons = this.polygons.slice();
    if (this.front) {
      polygons = polygons.concat(this.front.allPolygons());
    }

    if (this.back) {
      polygons = polygons.concat(this.back.allPolygons());
    }

    return polygons;
  }

  /**
   * Build a BSP tree out of `polygons`.
   * When called on an existing tree, the new polygons are filtered down
   * to the bottom of the tree and become new nodes there.
   * Each set of polygons is partitioned using the first polygon
   * (no heuristic is used to pick a good split).
   */
  build(polygons) {
    if (!polygons || !polygons.length) {
      return;
    }

    if (!this.plane) {
      // TODO: Find a better plane
      //this.plane = polygons[0].plane.clone();
      this.plane = findSplittingPlane(polygons[0].plane, polygons);
    }

    let front = [];
    let back = [];
    polygons.forEach(p => this.plane.splitPolygon(p, this.polygons, this.polygons, front, back));

    if (front.length) {
      if (!this.front) {
        this.front = new BspNode();
      }

      this.front.build(front);
    }

    if (back.length) {
      if (!this.back) {
        this.back = new BspNode();
      }
      this.back.build(back);
    }
  }
}
