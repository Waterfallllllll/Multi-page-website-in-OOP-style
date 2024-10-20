/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/differenceCards.js":
/*!*******************************************!*\
  !*** ./src/js/modules/differenceCards.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DifferenceCards)
/* harmony export */ });
class DifferenceCards {
  constructor(officerOld, officerNew, items) {
    this.officerOld = document.querySelector(officerOld);
    this.officerNew = document.querySelector(officerNew);
    try {
      this.itemsOld = this.officerOld.querySelectorAll(items);
      this.itemsNew = this.officerNew.querySelectorAll(items);
    } catch (e) {}
    this.itemsOldCounter = 0;
    this.itemsNewCounter = 0;
  }
  addCard(container, items, counter) {
    try {
      container.querySelector(".plus").addEventListener("click", () => {
        if (counter != items.length - 2) {
          items[counter].style.display = "flex";
          counter++;
        } else {
          items[counter].style.display = "flex";
          items[items.length - 1].remove();
        }
      });
    } catch (e) {}
  }
  clearList(items) {
    try {
      items.forEach((element, i, arr) => {
        if (i != arr.length - 1) {
          element.classList.add("animated", "fadeIn");
          element.style.display = "none";
        }
      });
    } catch (e) {}
  }
  init() {
    this.clearList(this.itemsOld);
    this.clearList(this.itemsNew);
    this.addCard(this.officerOld, this.itemsOld, this.itemsOldCounter);
    this.addCard(this.officerNew, this.itemsNew, this.itemsNewCounter);
  }
}

/***/ }),

/***/ "./src/js/modules/form.js":
/*!********************************!*\
  !*** ./src/js/modules/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Form)
/* harmony export */ });
class Form {
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
      this.value = matrix.replace(/./g, function (a) {
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
      item.addEventListener("keypress", e => {
        if (e.key.match(/[^a-z 0-9]/ig)) {
          e.preventDefault();
        }
      });
      item.addEventListener("input", () => {
        if (item.value.replace(/./g, function (a) {
          if (/[^a-z 0-9]/.test(a)) {
            return item.value = "";
          }
        })) ;
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
      item.addEventListener("submit", e => {
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
        this.getResources("../assets/question.php", formData).then(data => {
          console.log(data);
          item.parentNode.append(statusImg);
          statusImg.setAttribute("src", this.ok);
        }).catch(err => {
          console.error(err);
          item.parentNode.append(statusImg);
          statusImg.setAttribute("src", this.fail);
        }).finally(() => {
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

/***/ }),

/***/ "./src/js/modules/playVideo.js":
/*!*************************************!*\
  !*** ./src/js/modules/playVideo.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlayVideo)
/* harmony export */ });
class PlayVideo {
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

/***/ }),

/***/ "./src/js/modules/slider/mainSlider.js":
/*!*********************************************!*\
  !*** ./src/js/modules/slider/mainSlider.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MainSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(object) {
    //При попытке получить доступ к какому-либо свойству объекта, свойство вначале ищется в самом объекте, затем в прототипе объекта, после чего в прототипе прототипа, и так далее. Поиск ведётся до тех пор, пока не найдено свойство с совпадающим именем или не достигнут конец цепочки прототипов.
    super(object);
  }
  filterSlides(n) {
    try {
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
    } catch (e) {}
  }
  slideIncrement(n) {
    return this.slideIndex += n;
  }
  render() {
    try {
      this.btns.forEach(item => {
        item.addEventListener("click", () => {
          Array.from(this.slides).forEach((item, i, arr) => {
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
    } catch (e) {}
  }
}

/***/ }),

/***/ "./src/js/modules/slider/miniSlider.js":
/*!*********************************************!*\
  !*** ./src/js/modules/slider/miniSlider.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MiniSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MiniSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(object) {
    super(object);
    this.intervalId;
  }
  activeTrigger() {
    Array.from(this.slides).forEach(item => {
      item.classList.remove(this.activeClass);
    });
    this.slides[0].classList.add(this.activeClass);
    if (this.animate) {
      Array.from(this.slides).forEach((item, i) => {
        if (i == 0) {
          item.querySelector(".card__title").style.opacity = "1";
          item.querySelector(".card__controls-arrow").style.opacity = "1";
        } else {
          item.querySelector(".card__title").style.opacity = "0.4";
          item.querySelector(".card__controls-arrow").style.opacity = "0";
        }
      });
    }
  }
  nextSlider() {
    Array.from(this.slides).forEach((item, i) => {
      if (item.parentElement.classList.contains("feed__slider")) {
        if (item.nextElementSibling.classList.contains("slick-prev") || item.nextElementSibling.classList.contains("slick-next")) {
          if (i == 0) {
            this.container.appendChild(this.slides[i + 2]);
            this.container.appendChild(this.slides[i + 1]);
            this.container.appendChild(this.slides[i]);
            this.activeTrigger();
          }
        } else {
          if (i == 0) {
            this.container.appendChild(item);
            this.activeTrigger();
          }
        }
      } else {
        if (i == 0) {
          this.container.appendChild(item);
          this.activeTrigger();
        }
      }
    });
  }
  bindTriggers() {
    if (this.autoPlay) {
      this.container.addEventListener("mouseover", () => {
        clearInterval(this.intervalId);
      });
      this.container.addEventListener("mouseout", () => {
        this.intervalId = setInterval(() => this.nextSlider(), 5000);
      });
    }
    this.next.forEach(item => {
      item.addEventListener("click", () => this.nextSlider());
      if (this.autoPlay) {
        item.addEventListener("mouseover", () => {
          clearInterval(this.intervalId);
        });
        item.addEventListener("mouseout", () => {
          this.intervalId = setInterval(() => this.nextSlider(), 5000);
        });
      }
    });
    this.prev.forEach(item => {
      item.addEventListener("click", () => {
        Array.from(this.slides).forEach((item, i) => {
          if (item.parentElement.classList.contains("feed__slider")) {
            if (this.slides[this.slides.length - 1].classList.contains("slick-prev") || this.slides[this.slides.length - 1].classList.contains("slick-next")) {
              if (i == 0) {
                this.container.insertBefore(this.slides[this.slides.length - 3], this.slides[0]);
                this.activeTrigger();
              }
            } else {
              if (i == 0) {
                this.container.insertBefore(this.slides[this.slides.length - 1], this.slides[0]);
                this.activeTrigger();
              }
            }
          } else {
            if (i == 0) {
              this.container.insertBefore(this.slides[this.slides.length - 1], this.slides[0]);
              this.activeTrigger();
            }
          }
        });
      });
      if (this.autoPlay) {
        item.addEventListener("mouseover", () => {
          clearInterval(this.intervalId);
        });
        item.addEventListener("mouseout", () => {
          this.intervalId = setInterval(() => this.nextSlider(), 5000);
        });
      }
    });
  }
  init() {
    try {
      this.container.style.cssText = "display: flex; flex-wrap: wrap; align-items: flex-start; overflow: hidden";
      this.bindTriggers();
      this.activeTrigger();
      if (this.autoPlay) {
        this.intervalId = setInterval(() => this.nextSlider(), 5000);
      }
    } catch (e) {}
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider.js":
/*!*****************************************!*\
  !*** ./src/js/modules/slider/slider.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Slider)
/* harmony export */ });
class Slider {
  constructor({
    container = null,
    btns = null,
    prev = null,
    next = null,
    activeClass = "",
    animate,
    autoPlay
  } = {}) {
    this.container = document.querySelector(container);
    try {
      this.slides = this.container.children;
    } catch (e) {}
    this.btns = document.querySelectorAll(btns);
    this.slideIndex = 0;
    this.prev = document.querySelectorAll(prev);
    this.next = document.querySelectorAll(next);
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoPlay = autoPlay;
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_slider_mainSlider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/slider/mainSlider */ "./src/js/modules/slider/mainSlider.js");
/* harmony import */ var _modules_playVideo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/playVideo */ "./src/js/modules/playVideo.js");
/* harmony import */ var _modules_slider_miniSlider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider/miniSlider */ "./src/js/modules/slider/miniSlider.js");
/* harmony import */ var _modules_differenceCards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/differenceCards */ "./src/js/modules/differenceCards.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./src/js/modules/form.js");





window.addEventListener("DOMContentLoaded", () => {
  const slider = new _modules_slider_mainSlider__WEBPACK_IMPORTED_MODULE_0__["default"]({
    btns: ".next",
    container: ".page"
  });
  slider.filterSlides();
  slider.render();
  const firstMiniSlider = new _modules_slider_miniSlider__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: ".showup__content-slider",
    prev: ".showup__prev",
    next: ".showup__next",
    activeClass: "card-active",
    animate: true,
    btns: ".next"
  });
  firstMiniSlider.init();
  const secondMiniSlider = new _modules_slider_miniSlider__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: ".modules__content-slider",
    prev: ".slick-prev",
    next: ".slick-next",
    activeClass: "card-active",
    animate: true,
    autoPlay: true
  });
  secondMiniSlider.init();
  const thirdMiniSlider = new _modules_slider_miniSlider__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: ".feed__slider",
    prev: ".slick-prev",
    next: ".slick-next",
    activeClass: "feed__item-active"
  });
  thirdMiniSlider.init();
  const video = new _modules_playVideo__WEBPACK_IMPORTED_MODULE_1__["default"](".showup .play", ".overlay");
  video.init();
  new _modules_differenceCards__WEBPACK_IMPORTED_MODULE_3__["default"](".officerold", ".officernew", ".officer__card-item").init();
  new _modules_form__WEBPACK_IMPORTED_MODULE_4__["default"](".form").forms();
});
/******/ })()
;
//# sourceMappingURL=script.js.map