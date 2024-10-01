export default class PlayVideo {
	constructor(trigger, overlay) {
		this.trigger = document.querySelectorAll(trigger);
		this.overlay = document.querySelector(overlay);
		this.close = this.overlay.querySelector(".close");
	}

	closeButton() {
		
		this.close.addEventListener("click", () => {
			this.overlay.style.display = "none";
			this.player.clearVideo();
			this.player.destroy(); // Есть и другой метод удаления в видео
		});
	}

	triggerButton() {

		this.trigger.forEach(item => {
			item.addEventListener("click", () => {
				this.overlay.style.display = "flex";
				this.createPlayer(item.getAttribute("data-url"));
			});
		});
	}

	createPlayer(url) {

		this.player = new YT.Player("frame", {
			height: "360",
			width: "640",
			videoId: `${url}`
		});
	}

	init() {

		const tag = document.createElement("script");

		tag.src = "https://www.youtube.com/iframe_api";
		const firstScriptTag = document.getElementsByTagName("script")[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		this.triggerButton();
		this.closeButton();
	}
}