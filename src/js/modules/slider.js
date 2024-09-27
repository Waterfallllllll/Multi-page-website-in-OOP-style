export default class Slider {
	constructor(page, btns) {
		this.page = document.querySelector(page);
		this.slides = this.page.children;
		this.btns = document.querySelectorAll(btns);
		this.slideIndex = 3;
	}

	filterSlides(n) {
		if (n < 0) {
			this.slideIndex = this.slides.length;
		}

		if (n > this.slideIndex.length) {
			this.slideIndex = 0;
		}

		console.log(this.slides);

		this.slides.forEach(item => {
			item.style.display = "none";
		});

		this.slides[this.slideIndex].style.display = "block";
	}

	render() {
		this.filterSlides(1);
	}
}