import fs from "fs";

/**
 * Export as Alias Wavefront obj file.
 */
export class Wavefront {
  /**
   * Encode csg node to obj.
   * @param {CSG} csg the node
   * @returns {String} the obj file
   */
  write(csg) {
    let vertices = "";
    let normals = "";
    let faces = "";

    let offset = 0;
    csg.polygons.forEach(p => {
      let a = p.vertices[0].position;
      let b = p.vertices[1].position;

      vertices += `v ${a.x} ${a.y} ${a.z}\n`;
      vertices += `v ${b.x} ${b.y} ${b.z}\n`;

      a = p.vertices[0].normal;
      b = p.vertices[1].normal;
      normals += `vn ${a.x} ${a.y} ${a.z}\n`;
      normals += `vn ${b.x} ${b.y} ${b.z}\n`;

      for (let i = 2; i < p.vertices.length; i++) {
        let c = p.vertices[i].position;
        vertices += `v ${c.x} ${c.y} ${c.z}\n`;
        c = p.vertices[i].normal;
        normals += `vn ${c.x} ${c.y} ${c.z}\n`;

        let ax = 1 + offset;
        let bx = 1 + offset + i - 1;
        let cx = 1 + offset + i;
        faces += `f ${ax}//${ax} ${bx}//${bx} ${cx}//${cx}\n`;
      }

      offset += p.vertices.length;
    });

    return vertices + normals + faces;
  }
}
