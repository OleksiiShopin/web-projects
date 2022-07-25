// appearance of a table for selecting the number of people
const paramButton = document.getElementById('mPerson');
paramButton.addEventListener('click', (evntBtn) => {
    const personTable = document.querySelector('.people');
    if (personTable.classList.contains('focus-people')) {
        personTable.classList.remove('focus-people');
        evntBtn.target.classList.remove('focus-person');
    } else {
        personTable.classList.add('focus-people');
        evntBtn.target.classList.add('focus-person');
    }
})
// calculation of the number of people and the functionality of the buttons + and -
const total = document.querySelector('.total');
let countTotal = total.textContent;

function increse_people () {
    let numberPlus = Number(this.previousElementSibling.textContent);
    const elemClass = this.previousElementSibling.className;
    if (numberPlus < 9){
        numberPlus++;
        this.previousElementSibling.textContent = numberPlus;
        countTotal++;
    }
    document.getElementsByName(elemClass)[0].value = numberPlus;
    document.querySelector('.total').innerHTML = countTotal;
}
function decrease_people () {
    let numberMinus = Number(this.nextElementSibling.textContent);
    const elemClass = this.nextElementSibling.className;
    if (elemClass !== 'adults' && numberMinus > 0) {
        numberMinus--;
        this.nextElementSibling.textContent = numberMinus;
        countTotal--;
    }else if (numberMinus > 1){
        numberMinus--;
        this.nextElementSibling.textContent = numberMinus;
        countTotal--;
    }
    document.getElementsByName(elemClass)[0].value = numberMinus;
    document.querySelector('.total').innerHTML = countTotal;
}
const minusBtn = document.querySelectorAll('.btn-min');
const plusBtn = document.querySelectorAll('.btn-pls');
minusBtn.forEach((item) => 
    item.addEventListener('click', decrease_people));
plusBtn.forEach((item) => {
    item.addEventListener('click', increse_people)
});

var swiper = new Swiper(".citiesSwiper", { //swiper for cities card
    slidesPerView: "auto",
    spaceBetween: 35,
    speed: 500,
    grabCursor: true,
    rewind: true,
    navigation: {
        nextEl: '#cities-left',
        prevEl: '#cities-right',
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});
var swiper = new Swiper(".testimonialsSwiper", { //swiper for testimonials card
    slidesPerView: "auto",
    spaceBetween: 35,
    speed: 1000,
    grabCursor: true,
    navigation: {
        nextEl: '#testimonials-left',
        prevEl: '#testimonials-right',
    },
    scrollbar: {
        el: '.swiper-scrollbar',
        hide: true,
    },
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    breakpoints: {
        375: {
            spaceBetween: 10,
        },
        425: {
            spaceBetween: 20,
        },
        992: {
            spaceBetween: 20,
        },
        1200: {
            spaceBetween: 35,
        }
    },
});

// active button in about block
const aboutBtn_l = document.getElementById('about-left');
const aboutBtn_r = document.getElementById('about-right');

let countOfscroll = 0;
let countControl = 0;
function moveAboutCardLeft () {
    if (countControl === 0){
        const aboutCardsBox = document.querySelector('.about-destination-box');
        let widthAboutCard = aboutCardsBox.firstElementChild.offsetWidth + 35;
        if (!aboutCardsBox.lastElementChild.classList.contains('active-desc')){
            countControl++;
            countOfscroll++;
            const Active = aboutCardsBox.children[countOfscroll];
            if (countOfscroll !== 0){
                Active.previousElementSibling.classList.remove('active-desc');
            }
            aboutCardsBox.style.transform = `translateX(${-widthAboutCard * countOfscroll}px)`;
            window.setTimeout(()=> {
                Active.classList.add('active-desc');
                countControl = 0;
            },
            1000);
        }
    }
}
function moveAboutCardRight () {
    if (countControl === 0){
        const aboutCardsBox = document.querySelector('.about-destination-box');
        let widthAboutCard = aboutCardsBox.firstElementChild.offsetWidth + 35;
        if (!aboutCardsBox.firstElementChild.classList.contains('active-desc')){
            countControl++;
            countOfscroll--;
            const Active = aboutCardsBox.children[countOfscroll];
            Active.nextElementSibling.classList.remove('active-desc');
            aboutCardsBox.style.transform = `translateX(${-widthAboutCard * countOfscroll}px)`;
            window.setTimeout(()=> {
                Active.classList.add('active-desc');
                countControl = 0;
            },
            1000);
        }
    }
}
aboutBtn_l.addEventListener('click', moveAboutCardLeft);
aboutBtn_r.addEventListener('click', moveAboutCardRight);

//slider function
const sliders = document.querySelector('.slider');
let x1 = null;
let x2 = null;
let diff = 0;

function slideStart(event) {
    const firstTouch = event.touches[0];
    x1 = firstTouch.clientX;
}
function slideMove(event) {
    if (!x1){
        return false;
    }
    x2 = event.touches[0].clientX;
    diff = x1 - x2;
    const curentPos = (-(this.firstElementChild.offsetWidth) + 35) * countOfscroll - diff;
    if(this.classList.contains('about-destination-box')){
        this.children[countOfscroll].classList.remove('active-desc');
    }
    if ((this.style.transform == "translateX(0px)" || this.style.transform == '') && diff < 0){
        return false;
    } else if((this.style.transform == `translateX(${(this.firstElementChild.offsetWidth + 35) * (this.childElementCount - 1)}px)`) && diff > 0){
        return false;
    }
    this.style.transform = `translateX(${curentPos}px)`;
}
function slideEnd(event) {
    if(this.classList.contains('about-destination-box')){
        const moveCountSwipe = Math.trunc(diff / (this.firstElementChild.offsetWidth + 35));
        if (diff === 0){
            x1 = x2 = null;
            return false;
        }else if (Math.abs(diff) < (this.firstElementChild.offsetWidth / 2)){
            countOfscroll--;
            moveAboutCardLeft();
        } else if (diff < 0 && countOfscroll !== 0){
            countOfscroll += moveCountSwipe;
            moveAboutCardRight();
        } else if (diff > 0 && countOfscroll !== 2){
            countOfscroll += moveCountSwipe;
            moveAboutCardLeft();
        } else {
            countOfscroll--;
            moveAboutCardLeft();
        }
        x1 = x2 = null;
        diff = 0;
    }
}
sliders.addEventListener('touchstart', slideStart);
sliders.addEventListener('touchmove', slideMove);
sliders.addEventListener('touchend', slideEnd);

//burger menu activation 
const burgerMenu = document.querySelector('.burger-menu');
function activeBurger () {
    const wSize = window.innerWidth;
    const burgerNav = document.querySelector('.burger-nav');
    const headBtn = document.querySelector('.head-btn');
    burgerMenu.classList.toggle('active-burger');
    if(window.innerWidth < 600){
        headBtn.classList.toggle('active-burger');
    }
    if (burgerMenu.classList.contains('active-burger')){
        burgerNav.style.width = wSize / 2 + "px";
        burgerMenu.style.transform = `translateX(${(-wSize) / 2 + (burgerNav.firstElementChild.offsetLeft + burgerMenu.offsetWidth) / 2}px)`;
    } else {
        burgerNav.style.width = 0;
        burgerMenu.style.transform = `translateX(0px)`;
    }
}
burgerMenu.addEventListener('click', activeBurger);

// responsive design of navigation
let replaceNavIndex = -1;
function changePosMenuForResponsive () {
    const navigation = document.getElementById('header-nav');
    const burgerNav = document.querySelector('.burger-nav');
    const header = document.querySelector('.header');
    const posForNav = document.querySelector('.header-right');
    if(window.innerWidth < 992 && replaceNavIndex === -1){
        const removeObj = header.removeChild(navigation);
        burgerNav.appendChild(removeObj);
        replaceNavIndex = 1;
    } else if (window.innerWidth >= 992 && replaceNavIndex === 1) {
        const removeObj = burgerNav.removeChild(navigation);
        header.insertBefore(removeObj, posForNav);
        replaceNavIndex = -1;
    }
}
function overflowContent () {
    const container = document.querySelectorAll('.overflow-container');
    container.forEach((item) => {
        item.style.paddingLeft = item.previousElementSibling.offsetLeft + 'px';
    });
}
function aboutArrowPosChanges () {
    const aboutDestinationContainer = document.querySelector('.about-destination-container');
    const aboutHeader = document.querySelector('.about-header');
    const aboutButtons = document.querySelector('.about-buttons')
    let removeItem;
    if (window.innerWidth >= 992 && aboutHeader.lastElementChild.classList.contains('about-buttons')) {
        removeItem = aboutHeader.children.removeChild(aboutButtons);
        aboutDestinationContainer.appendChild(removeItem);
    }
    if(window.innerWidth < 992 && !aboutHeader.lastElementChild.classList.contains('about-buttons')) {
        removeItem = aboutDestinationContainer.removeChild(aboutButtons);
        aboutHeader.appendChild(removeItem);
    }
}
function respinsiveChanges () {
    changePosMenuForResponsive();
    overflowContent(); // changing of padding for sliders
    // close burger menu during resizing 
    if(burgerMenu.classList.contains('active-burger')){
        activeBurger();
    }
    aboutArrowPosChanges(); // about buttons replace to about header and vice versa
}
overflowContent();
changePosMenuForResponsive();
aboutArrowPosChanges();
window.addEventListener("resize", respinsiveChanges);
