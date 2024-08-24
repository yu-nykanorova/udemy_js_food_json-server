/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/


window.addEventListener("DOMContentLoaded", () => {
  const calculator = require("./modules/calculator");
  const callMe = require("./modules/callMe");
  const cards = require("./modules/cards");
  const modal = require("./modules/modal");
  const slider = require("./modules/slider");
  const tabs = require("./modules/tabs");
  const timer = require("./modules/timer");

  calculator();
  callMe();
  cards();
  modal();
  slider();
  tabs();
  timer();
 
});


/******/ })()
;
//# sourceMappingURL=script.js.map