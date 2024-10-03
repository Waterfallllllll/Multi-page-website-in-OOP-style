/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
  }
  slideIncrement(n) {
    return this.slideIndex += n;
  }
  render() {
    this.btns.forEach(item => {
      item.addEventListener("click", () => {
        Array.from(this.slides).forEach(item => {
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
/* harmony import */ var _mainSlider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mainSlider */ "./src/js/modules/slider/mainSlider.js");
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");


class MiniSlider extends _slider__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(object) {
    super(object);
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
    this.next.forEach(item => {
      item.addEventListener("click", () => this.nextSlider());
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
    });
  }
  init() {
    this.container.style.cssText = "display: flex; flex-wrap: wrap; align-items: flex-start; overflow: hidden";
    this.bindTriggers();
    this.activeTrigger();
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
    this.slides = this.container.children;
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
});
/******/ })()
;
//# sourceMappingURL=script.js.map