//This functions makes and returns an object every time it is called.
// The resulting objects all follow the same "recipe"
//the equation is from stackflow
function hex(r, g, b) {
	return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

function rgb(r, g, b) {
	return `rgb(${r}, ${g}, ${b})`;
}

function makeColor(r, g, b) {
	// starts empty
	const color = {};
	// add some properties
	color.r = r;
	color.g = g;
	color.b = b;
	// add some methods
	color.rgb = function () {
		const { r, g, b } = this;
		return `rgb(${r}, ${g}, ${b})`;
	}
	color.hex = function () {
		const { r, g, b } = this;
		return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
	}


	return color;
}

// example of instance of factory function 
//has its own function - not equal
const firstColor = makeColor(35, 255, 150);
const black = makeColor(0, 0, 0);
console.log(black.hex === firstColor.hex)
