export default class Slider {
	constructor({container = null, btns = null, prev = null, next = null, activeClass = "", animate, autoPlay} = {}) {
		this.container = document.querySelector(container);
		this.slides = this.container.children;
		this.btns = document.querySelectorAll(btns);
		this.slideIndex = 0;
		this.prev = document.querySelectorAll(prev);
		this.next = document.querySelectorAll(next);
		this.activeClass = activeClass;
		this.animate = animate;
		this.autoPlay = autoPlay;
	}

	
}
