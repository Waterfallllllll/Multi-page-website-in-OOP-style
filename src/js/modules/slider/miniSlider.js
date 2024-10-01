import Slider from "./slider";

export default class MiniSlider extends Slider {
	constructor(object) {
		super(object);
	}

	activeTrigger() {

		Array.from(this.slides).forEach(item => {
			item.classList.remove(this.activeClass);
		});

		this.slides[0].classList.add(this.activeClass);

		if (this.animate) {
			
			Array.from(this.slides).forEach((item, i) => {
				if (i == 0) {
					item.querySelector(".card__title").style.opacity = "1";
					item.querySelector(".card__controls-arrow").style.opacity = "1";
				} else {
					item.querySelector(".card__title").style.opacity = "0.4";
					item.querySelector(".card__controls-arrow").style.opacity = "0";
				}
			});
		}
	}

	bindTriggers() {

		this.next.forEach(item => {
			item.addEventListener("click", () => {
				this.container.appendChild(this.slides[0]);
				this.activeTrigger();
			});
		});

		this.prev.forEach(item => {
			item.addEventListener("click", () => {
				this.container.insertBefore(this.slides[this.slides.length - 1], this.slides[0]);
				this.activeTrigger();
			});
		});
	}

	init() {
		this.container.style.cssText = "display: flex; flex-wrap: wrap; align-items: flex-start; overflow: hidden";
		this.bindTriggers();
		this.activeTrigger();
	}
}