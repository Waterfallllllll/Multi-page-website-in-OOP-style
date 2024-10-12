export default class Form {
	constructor(form) {
		this.form = document.querySelectorAll(form);
		this.spinner = "../assets/img/spinner.gif";
		this.ok = "../assets/img/ok.png";
		this.fail = "../assets/img/fail.png";
	}

	forms() {
		
		this.form.forEach(item => {
			item.addEventListener("submit", (e) => {
				e.preventDefault();

				const statusImg = document.createElement("img");
				statusImg.classList.add("animated", "fadeInUp");
				statusImg.style.display = "block";
				statusImg.style.margin = "0 auto";
				statusImg.style.marginTop = "20%";

				const formData = new FormData(item);
				
				this.getResources("../assets/question.php", formData)
					.then((data) => {
						console.log(data);
						item.style.display = "none";
						item.parentNode.append(statusImg);
						statusImg.setAttribute("src", this.ok);
					})
					.catch(err => console.error(err))
					.finally(() => {
						 setTimeout(() => {
							statusImg.remove();
							 item.style.display = "block";
							item.classList.add("animated","fadeInUp");
						}, 2000);
					});
			});
		});
	}

	async getResources(path, data) {
		const res = await fetch(path, {
			method: "POST",
			body: data
		});

		if (!res.ok) { 

			throw new Error(`Could not fetch ${url}, status: ${res.status}`); 
		}

		return await res.text(); 
	}
}