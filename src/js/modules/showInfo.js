export default class ShowInfo {
	constructor(trigger) {
		this.trigger = document.querySelectorAll(trigger);
	}

	init() {
		this.trigger.forEach(element => {
			
			element.addEventListener("click", (e) => {
				const elem = element.parentElement.nextElementSibling;

				if (elem.style.display == "block") {
					elem.classList.remove("animated", "animate__fadeIn");
					elem.classList.add("animated", "animate__fadeOut");

					elem.addEventListener("animationend", function handleAnimationEnd(){
						elem.style.display = "none";
						elem.removeEventListener("animationend", handleAnimationEnd);
					});
				} else {
					elem.classList.remove("animated", "animate__fadeOut");
					elem.classList.add("animated", "animate__fadeIn");

					elem.style.display = "block";
				}	
			});
		});
	}
}