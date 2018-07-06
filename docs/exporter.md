# Exporter

Exports any CSG object into a certain file format.

## Alias Wavefront OBJ

Creates a Alias Wavefront OBJ file.

```
import { Wavefront, Cube, ZERO, ONE } from "solid";
import fs from "fs";

let csg = new Cube(ZERO, ONE);

let obj = new Wavefron().write(csg);

fs.writeFileSync("cube.obj", obj);
```

## PoV-Ray

Creates a Persistence of Vision Raytracer (PoV-Ray) file.
A camera and light source is automatically added.

```
import { Povray, Cube, ZERO, ONE } from "solid";
import fs from "fs";

let csg = new Cube(ZERO, ONE);

let obj = new Povray().write(csg);

fs.writeFileSync("cube.pov", obj);
```

Render with `povray +ua cube.pov`. UA for transparent background.
