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

	nextSlider() {
		Array.from(this.slides).forEach((item, i) => {

			if (item.parentElement.classList.contains("feed__slider")) {
				if (item.nextElementSibling.classList.contains("slick-prev") || item.nextElementSibling.classList.contains("slick-next")) {
					if (i == 0) {
						this.container.appendChild(this.slides[i + 2]);
						this.container.appendChild(this.slides[i + 1]);
						this.container.appendChild(this.slides[i]);
						this.activeTrigger();
					}
				} else {
					if (i == 0) {
						
						this.container.appendChild(item);
						this.activeTrigger();
					}
				}
			} else {
				if (i == 0) {
						
					this.container.appendChild(item);
					this.activeTrigger();
				}
			}
		});
	}

	bindTriggers() {

		this.next.forEach(item => {
			item.addEventListener("click", () => this.nextSlider());
		});

		this.prev.forEach(item => {
			item.addEventListener("click", () => {

				Array.from(this.slides).forEach((item, i) => {

					if (item.parentElement.classList.contains("feed__slider")) {
						if (this.slides[this.slides.length - 1].classList.contains("slick-prev") || this.slides[this.slides.length - 1].classList.contains("slick-next")) {
							if (i == 0) {
								this.container.insertBefore(this.slides[this.slides.length - 3], this.slides[0]);
								this.activeTrigger();
							}
						} else {
							if (i == 0) {
						
								this.container.insertBefore(this.slides[this.slides.length - 1], this.slides[0]);
								this.activeTrigger();
							}
						}
					} else {
						if (i == 0) {
						
							this.container.insertBefore(this.slides[this.slides.length - 1], this.slides[0]);
							this.activeTrigger();
						}	
					}
				});
			});
		});
	}

	init() {
		this.container.style.cssText = "display: flex; flex-wrap: wrap; align-items: flex-start; overflow: hidden";
		this.bindTriggers();
		this.activeTrigger();

		if (this.autoPlay) {
			setInterval(() => this.nextSlider(), 5000);
		}
	}
}