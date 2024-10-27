export default class PlayVideo {
	constructor(trigger, overlay) {
		this.trigger = document.querySelectorAll(trigger);
		this.overlay = document.querySelector(overlay);
		this.close = this.overlay.querySelector(".close");
		this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
	}

	closeButton() {
		
		this.close.addEventListener("click", () => {
			this.overlay.style.display = "none";
			this.player.clearVideo();
			this.player.destroy(); // Есть и другой метод удаления в видео
		});
	}

	triggerButton() {

		this.trigger.forEach((item, i) => {

			try {
				const blockedBlock = item.closest(".module__video-item").nextElementSibling;

				if (i % 2 == 0) {
					blockedBlock.setAttribute("data-disabled", "true");
				}
			 } catch (e) {
				
			}
			
			item.addEventListener("click", () => {
				if (!item.closest(".module__video-item") || item.closest(".module__video-item").getAttribute("data-disabled") !== "true") {

					this.activeBtn = item;
					this.overlay.style.display = "flex";
					this.createPlayer(item.getAttribute("data-url"));
				}
			});
		});
	}

	createPlayer(url) {

		this.player = new YT.Player("frame", {
			height: "360",
			width: "640",
			videoId: `${url}`,
			events: {
				"onStateChange": this.onPlayerStateChange
			}
		});
	}

	onPlayerStateChange(state) {
		const blockedBlock = this.activeBtn.closest(".module__video-item").nextElementSibling;
		const playBtn = this.activeBtn.querySelector("svg").cloneNode(true);

		if (state.data == 0) {
			const blockedBtn = blockedBlock.querySelector(".play__circle");

			blockedBtn.classList.remove("closed");
			blockedBlock.style.opacity = "1";
			blockedBtn.querySelector("svg").remove();
			blockedBtn.appendChild(playBtn);
			blockedBlock.style.filter = "none";
			blockedBlock.querySelector(".play__text").textContent = "play video";
			blockedBlock.querySelector(".play__text").classList.remove("attention");

			blockedBlock.setAttribute("data-disabled", "false");
		}
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