class Point {}

class ColorPoint extends Point {
  // 调用父类的 constructor(x, y)
  constructor(x, y, color) {
    super(x, y);
    this.color = color;
  }

  toString() {
    return this.color + " " + super.toString(); // 调用父类的 toString()
  }
}

console.log(Object.getPrototypeOf(ColorPoint));
