# Performance

A simple sphere-sphere subtract test is performed to measure the performance.

```javascript
let a = new Sphere(new Vector(-0.5, 0.0, 0.0), 1, resolution);
let b = new Sphere(new Vector(0.5, 0.0, 0.0), 1, resolution);

let t0 = Date.now();
let c = a.subtract(b);
let t1 = Date.now();
```

| resolution | #polygons/sphere | total [ms]       | time/polygon [ms]    |
| ---------- | ---------------- | ---------------- | -------------------- |
| 10         | 100              | 181 (221 \*)     | 1.81 (2.21 \*)       |
| 20         | 400              | 2025 (1784 \*)   | 5.0625 (4.46 \*)     |
| 30         | 900              | 5534 (6007 \*)   | 6.1489 (6.6744 \*)   |
| 40         | 1600             | 16284 (18299 \*) | 10.1775 (11.4369 \*) |
| 50         | 2500             | 39659 (44452 \*) | 15.8636 (17.7808 \*) |

\* Times of the original version.

Still a long way to go.
