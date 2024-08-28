/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
    const result = document.querySelector(".calculating__result span");
    let sex, height, weight, age, ratio;
  
    if (localStorage.getItem("sex")) {
      sex = localStorage.getItem("sex");
    } else {
      sex = "female";
      localStorage.setItem("sex", "female");
    }
  
    if (localStorage.getItem("ratio")) {
      ratio = localStorage.getItem("ratio");
    } else {
      ratio = 1.375;
      localStorage.setItem("ratio", 1.375);
    }
  
    function initLocalSettings(selector, activeClass) {
      const elements = document.querySelectorAll(selector);
  
      elements.forEach(elem => {
        elem.classList.remove(activeClass);
        if (elem.getAttribute("id") === localStorage.getItem("sex")) {
          elem.classList.add(activeClass);
        }
        if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
          elem.classList.add(activeClass);
        }
      })
    }
  
    initLocalSettings("#gender div", "calculating__choose-item_active");
    initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");
  
    function calcTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
        result.textContent = "____";
        return;
      }
  
      if(sex === "female") {
        result.textContent = Math.round(((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio));
      } else {
        result.textContent = Math.round(((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio));
      }
    }
  
    calcTotal();
  
    function getStaticInfo(selector, activeClass) {
      const elements = document.querySelectorAll(`${selector} div`);
      elements.forEach(elem => {
       
        elem.addEventListener("click", (event) => {
          
          if (event.target.getAttribute("data-ratio")) {
            ratio = +event.target.getAttribute("data-ratio");
            localStorage.setItem("ratio", +event.target.getAttribute("data-ratio"));
          } else {
            sex = event.target.getAttribute("id");
            localStorage.setItem("sex", event.target.getAttribute("id"));
          }
    
          elements.forEach(elem => {
            elem.classList.remove(activeClass);
          });
  
          event.target.classList.add(activeClass);
  
          calcTotal();
        });
      });
    }
  
    getStaticInfo("#gender", "calculating__choose-item_active");
    getStaticInfo(".calculating__choose_big", "calculating__choose-item_active");
  
    function getDynamicInfo(selector) {
      const input = document.querySelector(selector);
  
      input.addEventListener("input", () => {
        
        if (input.value.match(/\D/g)) {
          input.style.border = "1px solid red";
        } else {
          input.style.border = "none";
        }
        
        switch(input.getAttribute("id")) {
          case "height":
            height = +input.value;
            break;
          case "weight":
            weight = +input.value;
            break;
          case "age":
            age = +input.value;
            break;
        }
        calcTotal();
      });
    }
  
    getDynamicInfo("#height");
    getDynamicInfo("#weight");
    getDynamicInfo("#age");
  
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/callMe.js":
/*!******************************!*\
  !*** ./js/modules/callMe.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function callMe(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);
  
    const message = {
      loading: "icons/spinner-solid.svg",
      success: "Спасибо! Скоро мы с Вами свяжемся",
      failure: "Что-то пошло не так..."
    };
  
    forms.forEach(item => {
      bindPostData(item);
    });
  
    function bindPostData(form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
  
        let statusMessage = document.createElement("img");
  
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
                  display: block;
                  margin: 10px auto 0;
                  width: 40px;
              `;
  
        form.insertAdjacentElement("afterend", statusMessage);
        
        const formData = new FormData(form);
  
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
  
        (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
        .then(data => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        }).catch(() => {
          showThanksModal(message.failure);
        }).finally(() => {
          form.reset();
        });
      });
    }
  
    function showThanksModal(message) {
      const prevModalDialog = document.querySelector(".modal__dialog");
      
      prevModalDialog.classList.add("hide");
      
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)("[data-modal]", modalTimerId);
      
      const thanksModal = document.createElement("div");
      
      thanksModal.classList.add("modal__dialog");
      thanksModal.innerHTML = `
              <div class="modal__content">
                  <div class="modal__close" data-close>&times;</div>
                  <div class="modal__title">${message}</div>
              </div>
          `;
  
      document.querySelector("[data-modal]").append(thanksModal);
  
      setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add("show");
        prevModalDialog.classList.remove("hide");
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)("[data-modal]");
      }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (callMe);

// forms "Call me" with XMLHttpRequest

/*const forms = document.querySelectorAll("form");

const message = {
    loading: "icons/spinner-solid.svg",
    success: "Спасибо! Скоро мы с Вами свяжемся",
    failure: "Что-то пошло не так..."
};

forms.forEach(item => {
    postData(item);
});

function postData(form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const statusMessage = document.createElement("img");
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 10px auto 0;
            width: 40px;
        `;
        form.insertAdjacentElement("afterend", statusMessage);

        const request = new XMLHttpRequest();
        request.open("POST", "server.php");

        request.setRequestHeader("Content-type", "application/json");
        const formData = new FormData(form);

        const object = {};
        formData.forEach(function(value, key) {
            object[key] = value;
        });

        const json = JSON.stringify(object);

        request.send(json);

        request.addEventListener("load", () => {
            if (request.status === 200) {
                console.log(request.response);
                showThanksModal(message.success);
                form.reset();
                statusMessage.remove();
            } else {
                showThanksModal(message.failure);
            }
        });
    });
}

function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

    modal.append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add("show");
        prevModalDialog.classList.remove("hide");
        closeModal();
    }, 4000);
}*/

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    const menuContainer = document.querySelector(".menu__field .container");
    menuContainer.innerHTML = "";
  
    class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.classes = classes;
        this.transfer = 27;
        this.changeToUAH();
      }
      changeToUAH() {
        this.price = this.price * this.transfer;
      }
      render() {
        const element = document.createElement("div");
        if (this.classes.lenght === 0) {
          this.element = "menu__item";
          element.classList.add(this.element);
        } else {
          this.classes.forEach(className => element.classList.add(className));
        }
        element.innerHTML = `
                  <img src=${this.src} alt=${this.alt}>
                  <h3 class="menu__item-subtitle">${this.title}</h3>
                  <div class="menu__item-descr">${this.descr}</div>
                  <div class="menu__item-divider"></div>
                  <div class="menu__item-price">
                      <div class="menu__item-cost">Цена:</div>
                      <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                  </div>
              `;
        this.parent.append(element);
      }
    }
  
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)("http://localhost:3000/menu")
      .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
          new MenuCard(img, altimg, title, descr, price, ".menu .container", "menu__item").render();
        });
      });
  
    // получение данных и формирование карточек товара по факту без класса
    
    // getResource("http://localhost:3000/menu")
    //   .then(data => createCard(data));
  
    //   function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //       price *= 27;
    //       const element = document.createElement("div");
  
    //       element.classList.add("menu__item");
  
    //       element.innerHTML = `
    //         <img src=${img} alt=${altimg}>
    //         <h3 class="menu__item-subtitle">${title}</h3>
    //         <div class="menu__item-descr">${descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //         </div>
    //       `;
  
    //       document.querySelector(".menu .container").append(element);
    //     });
    //   }
  
    // получение данных библиотека axios + класс конструктор
  
    // axios.get("http://localhost:3000/menu")
    //   .then(data => {
    //     data.data.forEach(({img, altimg, title, descr, price}) => {
    //       new MenuCard(img, altimg, title, descr, price, ".menu .container", "menu__item").render();
    //     });
    //   });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
  
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    const modalButtonOpen = document.querySelectorAll(triggerSelector);
    const input = document.querySelector(".modal form .modal-input");
  
    modalButtonOpen.forEach(btn => {
      btn.addEventListener("click", () => openModal(modalSelector, modalSelector));
    });
  
    modal.addEventListener("click", event => {
      if (event.target === modal || event.target.getAttribute("data-close") == "") {
        closeModal(modalSelector);
      }
    });
  
    document.addEventListener("keydown", event => {
      if (event.code === "Escape" && modal.classList.contains("show")) {
        closeModal(modalSelector);
      }
    });
  
    function showModalByScroll() {
      if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal(modalSelector, modalTimerId);
        window.removeEventListener("scroll", showModalByScroll);
      }
    }
  
    window.addEventListener("scroll", showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const prev = document.querySelector(prevArrow);
    const next = document.querySelector(nextArrow);
    const total = document.querySelector(totalCounter);
    const currentSlide = document.querySelector(currentCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    const width = window.getComputedStyle(slidesWrapper).width;
  
    let slideIndex = 1;
    let offset = 0;
  
    // showSlides(slideIndex);
  
    // function showSlides(n) {
    //   if(n > slides.length) {
    //     slideIndex = 1;
    //   }
      
    //   if (n < 1) {
    //     slideIndex = slides.length;
    //   }
  
    //   slides.forEach(slide => slide.style.display = "none");
    //   slides[slideIndex - 1].style.display = "block";
  
    //   if (slideIndex < 10) {
    //     currentSlide.textContent = `0${slideIndex}`;
    //   } else {
    //     currentSlide.textContent = slideIndex;
    //   }
    // }
  
    // function plusSlides(n) {
    //   showSlides(slideIndex += n);
    // }
    
    // prev.addEventListener("click", () => {
    //   plusSlides(-1);
      
    // });
    
    // next.addEventListener("click", () => {
    //   plusSlides(1);
    // });
  
    function addZero(length, current, total) {
        if (length < 10) {
        total.textContent = `0${length}`;
        current.textContent = `0${slideIndex}`;
        } else {
        total.textContent = length;
        current.textContent = slideIndex;
        }
    }
  
    addZero(slides.length, currentSlide, total);  
  
    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";
  
    slidesWrapper.style.overflow = "hidden";
  
    slides.forEach(slide => {
        slide.style.width = width;
    });
  
    slider.style.position = "relative";
  
    const indicators = document.createElement("ol");
    const dots = [];
    indicators.classList.add("carousel-indicators");
    slider.append(indicators);
  
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i + 1);
        dot.classList.add("dot");
        if (i == 0) {
            dot.style.opacity = 1;
        } 
        indicators.append(dot);
        dots.push(dot);
    }
  
    function changeDotsOpacity(dots) {
        dots.forEach(dot => dot.style.opacity = "0.5");
        dots[slideIndex - 1].style.opacity = 1;
    }
  
    function deleteNotDigits(str) {
        return +str.replace(/\D/g, "");
    }
  
    next.addEventListener("click", () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
      slidesField.style.transform = `translateX(-${offset}px)`;
  
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
      
      addZero(slides.length, currentSlide, total);
  
      changeDotsOpacity(dots);
      
    });
  
    prev.addEventListener("click", () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
    
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
      
      addZero(slides.length, currentSlide, total);
  
      changeDotsOpacity(dots);
  
    });
  
    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-to");
  
            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
  
            slidesField.style.transform = `translateX(-${offset}px)`;
  
            addZero(slides.length, currentSlide, total);
  
            changeDotsOpacity(dots);
        });
    });
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector);
    const tabsContent = document.querySelectorAll(tabsContentSelector);
    const tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
        item.classList.add("hide");
        item.classList.remove("show", "fade");
        });
        tabs.forEach(item => {
        item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", event => {
        const target = event.target;
            if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                hideTabContent();
                showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {

    function getTimeRemaining(endtime) {
      let days, hours, minutes, seconds;
      const t = Date.parse(endtime) - Date.parse(new Date());
      if (t <= 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
      } else {
        days = Math.floor(t / (1000 * 60 * 60 * 24)), seconds = Math.floor(t / 1000 % 60), minutes = Math.floor(t / 1000 / 60 % 60), hours = Math.floor(t / (1000 * 60 * 60) % 24);
      }
      return {
        "total": t,
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds
      };
    }
  
    function getZero(num) {
      if (num >= 0 && num < 10) {
        return `0${num}`;
      } else return num;
    }
  
    function setClock(selector, endtime) {
      const timer = document.querySelector(selector);
      const days = timer.querySelector("#days");
      const hours = timer.querySelector("#hours");
      const minutes = timer.querySelector("#minutes");
      const seconds = timer.querySelector("#seconds");
      const timeInterval = setInterval(updateClock, 1000);
      
      updateClock();
  
      function updateClock() {
        const t = getTimeRemaining(endtime);
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);
        if (t.total <= 0) {
          clearInterval(timeInterval);
        }
      }
    }
  
    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "applicstion/json"
      },
      body: data
    });

    return await res.json();
  };

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
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
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_callMe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/callMe */ "./js/modules/callMe.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
  
  
  
  
  
  
  
  

window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)("[data-modal]", modalTimerId), 50000);

  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_callMe__WEBPACK_IMPORTED_MODULE_1__["default"])("form", modalTimerId);
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])("[data-modal-open]", "[data-modal]", modalTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
    container: ".offer__slider",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    slide: ".offer__slide",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner"  
  });
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])(".timer", "2024-09-30");
 
});


/******/ })()
;
//# sourceMappingURL=bundle.js.map