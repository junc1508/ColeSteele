

class Color {
	constructor(r, g, b, name) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.name = name;
	}
	greet() {
		return `HELLO FROM ${this.name}`;
	}

	innerRGB() {
		const { r, g, b } = this;
		return `${r}, ${g}, ${b}`;
	}

	rgb() {
		return `rgb(${this.innerRGB()})`;
	}
	hex() {
		const { r, g, b } = this;
		return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}
	rgba(a = 1.0) {
		return `rgba(${this.innerRGB()}, ${a})`;
	}

}

const c1 = new Color(255, 69, 89, "tomato");
const white = new Color(255, 255, 255, 'white');




// Color.prototype.rgba = function (a = 1.0) {
// 	const { r, g, b } = this;
// 	return `rgba(${ r }, ${ g }, ${ b }, ${ a })`;
// };