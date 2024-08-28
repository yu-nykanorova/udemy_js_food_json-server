  import calculator from "./modules/calculator";
  import callMe from "./modules/callMe";
  import cards from "./modules/cards";
  import modal from "./modules/modal";
  import slider from "./modules/slider";
  import tabs from "./modules/tabs";
  import timer from "./modules/timer";
  import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(() => openModal("[data-modal]", modalTimerId), 50000);

  calculator();
  callMe("form", modalTimerId);
  cards();
  modal("[data-modal-open]", "[data-modal]", modalTimerId);
  slider({
    container: ".offer__slider",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    slide: ".offer__slide",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner"  
  });
  tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  timer(".timer", "2024-09-30");
 
});

