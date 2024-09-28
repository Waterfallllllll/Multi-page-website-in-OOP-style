export default class Slider {
	constructor(page, btns) {
		this.page = document.querySelector(page);
		this.slides = this.page.children;
		this.btns = document.querySelectorAll(btns);
		this.slideIndex = 0;
	}

	filterSlides(n) {
		if (n < 0) {
			this.slideIndex = this.slides.length;
		}

		if (n > this.slides.length - 1) {
			this.slideIndex = 0;
		}

		Array.from(this.slides).forEach(item => {
			item.style.display = "none";
		});

		this.slides[this.slideIndex].style.display = "block";
	}


	slideIncrement(n) {
		return this.slideIndex += n;
	}

	render() {
		this.btns.forEach(item => {
			item.addEventListener("click", () => {
				Array.from(this.slides).forEach(item => {
					item.classList.add("animated", "animate__fadeInUp");
				});

				this.filterSlides(this.slideIncrement(1));

				if (this.slideIndex == 2) {
					const teacher = document.querySelector(".hanson");
					teacher.style.display = "none";
					
					setTimeout(() => {
						teacher.style.display = "block";
						teacher.classList.add("animated", "animate__fadeInUp");
					}, 3000);
				}
			});

			item.parentElement.previousElementSibling.addEventListener("click", () => {
				this.filterSlides(this.slideIndex = 0);
			});
		});
	}
}
