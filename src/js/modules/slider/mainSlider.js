import Slider from "./slider";

export default class MainSlider extends Slider {
	constructor(object) {
		//При попытке получить доступ к какому-либо свойству объекта, свойство вначале ищется в самом объекте, затем в прототипе объекта, после чего в прототипе прототипа, и так далее. Поиск ведётся до тех пор, пока не найдено свойство с совпадающим именем или не достигнут конец цепочки прототипов.
		super(object);
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