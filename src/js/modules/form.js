export default class Form {
	constructor(form) {
		this.form = document.querySelectorAll(form);
		this.inputs = document.querySelectorAll("input");
		this.emailInput = document.querySelectorAll("[data-email]");
		this.phoneInput = document.querySelectorAll("[data-phone]");
		this.spinner = "../assets/img/spinner.gif";
		this.ok = "../assets/img/ok.png";
		this.fail = "../assets/img/fail.png";
	}

	mask() {
		const setCursorPosition = (pos, elem) => {
			elem.focus();

			if (elem.setSelectionRange) {
				elem.setSelectionRange(pos, pos);
			} else if (elem.createTextRange) {
				const range = elem.createTextRange();

				range.collapse(true);
				range.moveEnd("character", pos);
				range.moveStart("character", pos);
				range.select();
			}
		};

		function createMask(event) {
			let matrix = "+1 (___) ___-____",
				i = 0,
				def = matrix.replace(/\D/g, ""),
				val = this.value.replace(/\D/g, "");
                
			if (def.length >= val.length) {
				val = def;
			}

			const position = this.value.selectionStart;

			if (position < 2) {
				event.preventDefault();
			}
        
			this.value = matrix.replace(/./g, function(a) {
				if (/[_\d]/.test(a) && i < val.length) {        
					return val.charAt(i++);
				} else {
					if (i >= val.length) {
						return "";
					} else {
						return a;
					}
				}
			});
        
			if (event.type == "blur") {
				if (this.value.length == 2) {
					return this.value = "";
				}
			} else {
				setCursorPosition(this.value.length, this); //this - текущий элемент
			}
		}

		this.phoneInput.forEach(input => {
			input.addEventListener("input", createMask);
			input.addEventListener("focus", createMask);
			input.addEventListener("blur", createMask);
			input.addEventListener("keydown", createMask);
		});
	}

	checkTextInput() {

		this.emailInput.forEach(item => {
			item.addEventListener("keypress", (e) => {
				if (e.key.match(/[^a-z 0-9]/ig)) {
					e.preventDefault();
				}
			});

			item.addEventListener("input", () => {
				if (item.value.replace(/./g, function (a) {
					if (/[^a-z 0-9]/.test(a)) {
						return item.value = "";
					} 
				}));
			});
		});
	}

	clearInputs() {
		this.inputs.forEach(item => {
			item.value = "";
		});
	}

	forms() {
		this.checkTextInput();
		this.mask();
		
		this.form.forEach(item => {
			item.addEventListener("submit", (e) => {
				e.preventDefault();

				const statusImg = document.createElement("img");
				statusImg.classList.add("animated", "fadeInUp");
				statusImg.style.display = "block";
				statusImg.style.margin = "0 auto";
				statusImg.style.marginTop = "20%";

				const formData = new FormData(item);

				item.style.display = "none";
				item.parentNode.append(statusImg);
				statusImg.setAttribute("src", this.spinner);
				
				this.getResources("../assets/question.php", formData)
					.then((data) => {
						console.log(data);
						item.parentNode.append(statusImg);
						statusImg.setAttribute("src", this.ok);
					})
					.catch((err) => {
						console.error(err);
						item.parentNode.append(statusImg);
						statusImg.setAttribute("src", this.fail);
					 })
					.finally(() => {
						 setTimeout(() => {
							statusImg.remove();
							 item.style.display = "block";
							 item.classList.add("animated", "fadeInUp");
							 this.clearInputs();		
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