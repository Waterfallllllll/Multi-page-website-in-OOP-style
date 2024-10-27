export default class Download {
	constructor(trigger) {
		this.trigger = document.querySelectorAll(trigger);
		this.path = "assets/img/Bitmap.jpg";
	}

	download(path) {
		const element = document.createElement("a");

		element.setAttribute("href", path);
		element.setAttribute("download", "picture");
		
		element.style.display = "none";
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	init() {
		this.trigger.forEach(item => {
			item.addEventListener("click", () => {
				this.download(this.path);
			});
		});
	}
}