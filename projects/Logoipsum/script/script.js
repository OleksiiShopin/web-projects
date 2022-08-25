let replaceNavControl = 0;
function replaceNav() {
  const container = document.querySelector(".header__container");
  const menu = document.querySelector(".menu");
  const navigation = document.querySelector(".header__nav");
  const getStartButton = document.querySelector(".header-button");
  const BRAICKPOINT_WIDTH = 991;
  let removeNav, removeButton;
  if (window.innerWidth <= BRAICKPOINT_WIDTH && replaceNavControl == 0) {
    removeNav = container.removeChild(navigation);
    removeButton = container.removeChild(getStartButton);

    menu.appendChild(removeButton);
    menu.appendChild(removeNav);

    replaceNavControl = 1;
  } else if (
    window.innerWidth >= BRAICKPOINT_WIDTH &&
    replaceNavControl === 1
  ) {
    removeNav = menu.removeChild(navigation);
    removeButton = menu.removeChild(getStartButton);

    container.appendChild(removeNav);
    container.appendChild(removeButton);

    replaceNavControl = 0;
  }
  menuSwiper.slidePrev();
}

const menuButton = document.querySelector(".menu-button");
function openMenu() {
  menuSwiper.slideNext();
}
menuButton.addEventListener("click", openMenu, true);
let menuSwiper = new Swiper(".swiper", {
  slidesPerView: "auto",
  resistanceRatio: 0,
  slideToClickedSlide: true,
  on: {
    slideChange: function () {
      let slider = this;
      console.log(this);
      if (slider.activeIndex === 1) {
        menuButton.classList.add("cross");
        // required because of slideToClickedSlide
        menuButton.removeEventListener("click", openMenu, true);
      } else {
        menuButton.classList.remove("cross");
      }
      if (slider.activeIndex === 0) {
        menuButton.addEventListener("click", openMenu, true);
      }
    },
  },
  // breakpoints: {
  //   992: {
  //     enabled: false,
  //   },
  //   100: {
  //     enabled: true,
  //   },
  // },
});

replaceNav();
window.addEventListener("resize", replaceNav);
