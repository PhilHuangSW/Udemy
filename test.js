// function makeColor(r, g, b) {
//   const color = {};
//   color.r = r;
//   color.g = g;
//   color.b = b;
//   color.rgb = function () {
//     const { r, g, b } = this;
//     return `rgb(${r},${g},${b})`
//   }
//   return color;
// }

function Color(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
  console.log(this);
}

Color.prototype.rgb = function () {
  const { r, g, b } = this;
  return `rgb(${r},${g},${b})`
}

Color.prototype.hex = function () {
  const { r, g, b } = this;
  return '#' + ((1 << 25) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

Color.prototype.rgba = function (a = 1.0) {
  const { r, g, b } = this;
  return `rgb(${r},${g},${b},${a})`
}

const color1 = new Color(50, 60, 190);
const h1 = document.querySelector('h1');