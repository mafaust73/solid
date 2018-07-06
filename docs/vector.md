# Vector

Create a vector using `new Vector(x, y, z)`, e.g. `new Vector(1, 0, 0)`;

## Operations

All operations are immutable, i.e. returning always a new vector.

| Operation                        | Method                               |
| -------------------------------- | ------------------------------------ |
| a + b                            | a.plus(b)                            |
| a - b                            | a.minus(b)                           |
| a \* 7                           | a.times(7)                           |
| a / 7                            | a.dividedBy(7)                       |
| a ⋅ b                            | a.dot(b)                             |
| a ⨯ b                            | a.cross(b)                           |
| -a                               | a.negated()                          |
| Interpolate between vectors      | a.lerp(b, t) with 0 ≤ t ≤ 1          |
| Length of a vector               | a.length()                           |
| Normalize a vector to length = 1 | a.unit()                             |
| Rotate around y-axis             | a.rotateY(alpha) with 0 ≤ alpha ≤ 2π |
| Return a digital copy            | a.clone()                            |

## Constants

The library provides constants for

| Constant          | Value                                    |
| ----------------- | ---------------------------------------- |
| ZERO              | new Vector(0, 0, 0)                      |
| ONE               | new Vector(1, 1, 1)                      |
| UNIT_X            | new Vector(1, 0, 0)                      |
| UNIT_Y            | new Vector(0, 1, 0)                      |
| UNIT_Z            | new Vector(0, 0, 1)                      |
| POSITIVE_INFINITY | new Vector(Infinity, Infinity, Infinity) |
| NEGATIVE_INFINITY | new Vector(Infinity, Infinity, Infinity) |
