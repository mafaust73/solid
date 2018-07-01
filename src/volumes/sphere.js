import { CSG, Vector, Vertex, Polygon } from "../common/common";

export class Sphere extends CSG {
  constructor(center, radius, resolution) {
    super();

    let vertices;

    function vertex(theta, phi) {
      theta *= Math.PI * 2;
      phi *= Math.PI;
      let dir = new Vector(Math.cos(theta) * Math.sin(phi), Math.cos(phi), Math.sin(theta) * Math.sin(phi));
      return new Vertex(center.plus(dir.times(radius)), dir);
    }

    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        let vertices = [];

        vertices.push(vertex(i / resolution, j / resolution));
        if (j > 0) vertices.push(vertex((i + 1) / resolution, j / resolution));
        if (j < resolution - 1) vertices.push(vertex((i + 1) / resolution, (j + 1) / resolution));
        vertices.push(vertex(i / resolution, (j + 1) / resolution));
        this.polygons.push(new Polygon(vertices));
      }
    }
  }
}
