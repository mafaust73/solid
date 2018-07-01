/**
 * Export as Povray scene file.
 */
export class Povray {
  /**
   * Encode csg node.
   * @param {CSG} csg the node
   * @returns {String} the result
   */
  write(csg) {
    let result = "";

    let e = csg.extends();
    console.log(e);
    let cam = e.max
      .minus(e.center)
      .times(2)
      .plus(e.center);
    result += `camera { location <${cam.x},${cam.y},${cam.z}> look_at <${e.center.x},${e.center.y},${e.center.z}> }\n`;
    result += `light_source { <${cam.x},${cam.y},${cam.z}> color rgb<1, 1, 1> }\n`;

    result += "mesh {\n";

    csg.polygons.forEach(p => {
      for (let i = 2; i < p.vertices.length; i++) {
        let a = p.vertices[0];
        let b = p.vertices[i - 1];
        let c = p.vertices[i];

        result += "  smooth_triangle {\n";
        result += `    <${a.position.x}, ${a.position.y}, ${a.position.z}>, <${a.normal.x}, ${a.normal.y}, ${a.normal.z}>,\n`;
        result += `    <${b.position.x}, ${b.position.y}, ${b.position.z}>, <${b.normal.x}, ${b.normal.y}, ${b.normal.z}>,\n`;
        result += `    <${c.position.x}, ${c.position.y}, ${c.position.z}>, <${c.normal.x}, ${c.normal.y}, ${c.normal.z}>\n`;
        result += "  }\n";
      }
    });
    result += "  texture{ pigment { color rgb<0,0.5,1> } }\n";
    result += "}";
    return result;
  }
}
