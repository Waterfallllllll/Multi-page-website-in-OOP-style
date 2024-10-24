import MainSlider from "./modules/slider/mainSlider";
import PlayVideo from "./modules/playVideo";
import MiniSlider from "./modules/slider/miniSlider";
import DifferenceCards from "./modules/differenceCards";
import Form from "./modules/form";

window.addEventListener("DOMContentLoaded", () => {

	const slider = new MainSlider({btns: ".next", container: ".page"});
	slider.filterSlides();
	slider.render();

	const moduleSlider = new MainSlider({ container: ".moduleapp", btns: ".next" });
	moduleSlider.filterSlides();
	moduleSlider.render();

	const firstMiniSlider = new MiniSlider({ container: ".showup__content-slider", prev: ".showup__prev", next: ".showup__next",  activeClass: "card-active", animate: true, btns: ".next"});
	firstMiniSlider.init();

	const secondMiniSlider = new MiniSlider({ container: ".modules__content-slider", prev: ".slick-prev", next: ".slick-next", activeClass: "card-active", animate: true, autoPlay: true });
	secondMiniSlider.init();

	const thirdMiniSlider = new MiniSlider({ container: ".feed__slider", prev: ".slick-prev", next: ".slick-next", activeClass: "feed__item-active"});
	thirdMiniSlider.init();

	new PlayVideo(".showup .play", ".overlay").init();
	new PlayVideo(".module__wrapper .play", ".overlay").init();

	new DifferenceCards(".officerold", ".officernew", ".officer__card-item").init();

	new Form(".form").forms();
});