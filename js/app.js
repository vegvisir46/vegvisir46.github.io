(() => {
  "use strict";

  function isWebp() {
    function testWebP(callback) {
      let webP = new Image;
      webP.onload = webP.onerror = function () {
        callback(2 == webP.height);
      };
      webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    testWebP((function (support) {
      let className = true === support ? "webp" : "no-webp";
      document.documentElement.classList.add(className);
    }));
  }

  let addWindowScrollEvent = false;
  setTimeout((() => {
    if (addWindowScrollEvent) {
      let windowScroll = new Event("windowScroll");
      window.addEventListener("scroll", (function (e) {
        document.dispatchEvent(windowScroll);
      }));
    }
  }), 0);
  const header = document.querySelector(".header");
  const headerContainer = document.querySelector(".header__container");
  const burger = document.querySelector("#burger");
  const headerMenu = document.querySelector(".menu__body");
  const script_anchors = document.querySelectorAll('a[href*="#"]');
  const animItems = document.querySelectorAll(".anim-item");
  console.log(animItems);
  window.addEventListener("scroll", (() => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      headerContainer.style.height = "3.75rem";
      header.style.background = "linear-gradient(20deg, rgb(16, 16, 16), rgb(57, 57, 57))";
    } else {
      headerContainer.style.height = "5rem";
      header.style.background = "";
    }
  }));
  window.addEventListener("scroll", (() => {
    let scrollDistance = window.scrollY;
    document.querySelectorAll("section").forEach(((el, i) => {
      if (el.offsetTop - header.clientHeight <= scrollDistance) {
        document.querySelectorAll(".menu__link").forEach((el => {
          if (el.classList.contains("active")) el.classList.remove("active");
        }));
        document.querySelectorAll(".menu__item")[i].querySelector("a").classList.add("active");
      }
    }));
  }));
  burger.addEventListener("click", (() => {
    burger.classList.toggle("active");
    headerMenu.classList.toggle("active");
  }));
  for (let anchor of script_anchors) anchor.addEventListener("click", (function (e) {
    e.preventDefault();
    const blockID = anchor.getAttribute("href").substr(1);
    document.getElementById(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
    if (burger.classList.contains("active")) {
      burger.classList.toggle("active");
      headerMenu.classList.toggle("active");
    }
  }));
  window.addEventListener("scroll", animScroll);

  function animScroll() {
    for (let i = 0; i < animItems.length; i++) {
      const animItem = animItems[i];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;
      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) animItemPoint = window.innerHeight - window.innerHeight / animStart;
      if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) animItem.classList.add("active"); else animItem.classList.remove("active");
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    };
  }

  animScroll();
  window["FLS"] = true;
  isWebp();
})();