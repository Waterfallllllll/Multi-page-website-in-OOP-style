import Slider from "./modules/slider";
import PlayVideo from "./modules/playVideo";

window.addEventListener("DOMContentLoaded", () => {
	const slider = new Slider(".page", ".next");
	slider.filterSlides();
	slider.render();

	const video = new PlayVideo(".showup .play", ".overlay");
	video.init();
});