export default class DifferenceCards {
	constructor(officerOld, officerNew, items) {
		this.officerOld = document.querySelector(officerOld);
		this.officerNew = document.querySelector(officerNew);
		this.itemsOld = this.officerOld.querySelectorAll(items);
		this.itemsNew = this.officerNew.querySelectorAll(items);
		this.itemsOldCounter = 0;
		this.itemsNewCounter = 0;
	}

	addCard(container, items, counter) {

		container.querySelector(".plus").addEventListener("click", () => {
			if (counter != items.length - 2) {
				items[counter].style.display = "flex";
				counter++;
			} else {
				items[counter].style.display = "flex";
				items[items.length - 1].remove();
			}
		});
	}

	clearList(items) {
		items.forEach((element, i, arr) => {
			if (i != arr.length - 1) {
				element.classList.add("animated", "fadeIn");
				element.style.display = "none";
			} 
		});
	}

	init() {
		this.clearList(this.itemsOld);
		this.clearList(this.itemsNew);
		this.addCard(this.officerOld, this.itemsOld, this.itemsOldCounter);
		this.addCard(this.officerNew, this.itemsNew, this.itemsNewCounter);
	}
}