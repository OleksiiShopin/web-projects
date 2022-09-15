// This code empowers all input tags having a placeholder and data-slots attribute
document.addEventListener("DOMContentLoaded", () => {
  for (const el of document.querySelectorAll("[data-mask][data-slots]")) {
    const pattern = el.getAttribute("data-mask"),
      slots = new Set(el.dataset.slots || "_"),
      prev = ((j) =>
        Array.from(pattern, (c, i) => (slots.has(c) ? (j = i + 1) : j)))(0),
      first = [...pattern].findIndex((c) => slots.has(c)),
      accept = new RegExp(el.dataset.accept || "\\d", "g"),
      clean = (input) => {
        input = input.match(accept) || [];
        return Array.from(pattern, (c) =>
          input[0] === c || slots.has(c) ? input.shift() || c : c
        );
      },
      format = () => {
        const [i, j] = [el.selectionStart, el.selectionEnd].map((i) => {
          i = clean(el.value.slice(0, i)).findIndex((c) => slots.has(c));
          return i < 0
            ? prev[prev.length - 1]
            : back
            ? prev[i - 1] || first
            : i;
        });
        el.value = clean(el.value).join``;
        el.setSelectionRange(i, j);
        back = false;
      };
    let back = false;
    el.addEventListener("keydown", (e) => (back = e.key === "Backspace"));
    el.addEventListener("input", format);
    el.addEventListener("focus", format);
    el.addEventListener("blur", () => el.value === pattern && (el.value = ""));
  }
});

window.addEventListener("scroll", () => {
  const buttonUp = document.querySelector(".up-button");
  const questionSection = document.querySelector(".questions");
  if (
    this.scrollY >=
    questionSection.offsetTop - questionSection.scrollHeight
  ) {
    buttonUp.classList.add("up-button-visible");
  } else {
    buttonUp.classList.remove("up-button-visible");
  }
});

const categoryLinkList = document.querySelectorAll(".category__list__item");
const furnituresList = document.querySelectorAll(".category__furnitures");
function activeCategorylink() {
  categoryLinkList.forEach((item) => item.classList.remove("active-category"));
  this.classList.add("active-category");
  activeCategoryFurnitures(this);
  return false;
}
function activeCategoryFurnitures(linkItem) {
  furnituresList.forEach((item) => {
    item.classList.remove("active-furnitures");
    if (linkItem.getAttribute("data-furniture") === item.getAttribute("id")) {
      item.classList.add("active-furnitures");
    }
  });
}
categoryLinkList.forEach((item) =>
  item.addEventListener("click", activeCategorylink)
);

//promo swiper
const promoSwiperText = new Swiper(".promo-swiper-text", {
  spaceBetween: 0,
  effect: "fade",
  simulateTouch: false,
});

const promoSwiperImg = new Swiper(".promo-swiper-img", {
  spaceBetween: 0,
  effect: "fade",
  simulateTouch: false,
  navigation: {
    nextEl: "#promo-button-right",
    prevEl: "#promo-button-left",
  },
  controller: {
    control: promoSwiperText,
  },
  on: {
    slideChange: currentIndex,
  },
  autoplay: {
    delay: 15000,
    disableOnInteraction: false,
  },
});

function currentIndex() { // change number of counter promo slider
  const counter = document.querySelector(".counter__current-count");
  counter.textContent = `0${promoSwiperText.activeIndex + 1}`;
}

//advanteges slider
const advantageSwiper = new Swiper(".advantagesSwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  speed: 400,
  navigation: {
    nextEl: "#advantage-button-right",
    prevEl: "#advantage-button-left",
  },
  breakpoints: {
    1900: {
      spaceBetween: 30,
    },
    1400: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 20,
    }
  }
});

// menu script
const menuButton = document.querySelector('.js-menu-button');

function activeMenu () {
    const menu = document.querySelector('.js-menu');
    menu.classList.toggle("active-menu");
}

menuButton.addEventListener('click', activeMenu);
