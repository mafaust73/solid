/*function radiosity() {
  global_settings {
    assumed_gamma 2.2
    adc_bailout 1/255
    charset utf8
    // 1 unit in coordinate system = 1 cm
    // To calculate SSLT for different materials
    mm_per_unit 10
    // Only with +q9 or higher
    subsurface {
        // Number of sample rays for diffuse (first value) and single
        // (second value) scattering
        // Lower values -> better performance
        samples 50, 50
        // Use subsurface scattering on radiosity photons
        radiosity on
    }

    radiosity {
        gray_threshold 0.0
        brightness 1
        // not smaller than 0.0039
        adc_bailout 0.005
        // not lower than 2 for isosurfaces, not bigger than 3
        recursion_limit 3
        // lowers error bound during pretrace, removes blotches (default 0.5)
        low_error_factor 0.5
        // Fraction of screen to follow bounced rays (default 0.015)
        // Too small → rendering gets slow; too high → no natural darkening
        // of crevices as rays get reused
        minimum_reuse 0.015
        maximum_reuse 0.2
        // Min and maxsize of block in mosaic preview during pretrace
        // default 0.08
        pretrace_start 0.08
        // not smaller than 0.02 (default 0.04)
        pretrace_end 0.04
        count 150
        // Max number of radiosity values to be blended together (default
        // 4, max 20)
        // Smaller than 4 → patchiness
        nearest_count 10
        // lower error bound → more artifacts (requires higher count), but
        // also higher quality
        error_bound 0.4
    }
}

}*/
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
