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
plusBtn.forEach((item) => 
    item.addEventListener('click', increse_people));

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

const citiesCardsBox = document.querySelector('.cities-card-box');
citiesCardsBox.lastElementChild.addEventListener('visibilityChange', ()=>{alert('Hello')});

// functions move city card
const citiesBtn_r = document.getElementById('cities-right');
const citiesBtn_l = document.getElementById('cities-left');
let cityMovedCounter = 0;
function moveCitiesCardLeft () {
    const citiesCardsBox = document.querySelector('.cities-card-box');
    const numberOfChild = citiesCardsBox.childElementCount;
    let numberVisibleCard = 3;
    if (citiesCardsBox.offsetParent.offsetWidth < 992) {
        numberVisibleCard = 1;
    } else if (citiesCardsBox.offsetParent.offsetWidth >= 992 && citiesCardsBox.offsetParent.offsetWidth < 1200){
        numberVisibleCard = 2;
    } else {
        numberVisibleCard = 3;
    }
    if(numberOfChild - numberVisibleCard > cityMovedCounter){
        cityMovedCounter++;
        citiesCardsBox.style.transform = `translateX(${-399 * cityMovedCounter}px)`;
    }
}
function moveCitiesCardRight () {
    const citiesCardsBox = document.querySelector('.cities-card-box');
    if(cityMovedCounter > 0){
        cityMovedCounter--;
        citiesCardsBox.style.transform = `translateX(${-399 * cityMovedCounter}px)`;
    }
}
citiesBtn_l.addEventListener('click', moveCitiesCardLeft);
citiesBtn_r.addEventListener('click', moveCitiesCardRight);

// functions move testimonial card
const testimonialsBtn_l = document.getElementById('testimonials-left');
const testimonialsBtn_r = document.getElementById('testimonials-right');
let testimonialsMoveCounter = 0;
function moveTestimonialsCardLeft () {
    const testiomonalsCardBox = document.querySelector('.testimonials-card-box');
    let moveWholeCard = 335;
    if (testiomonalsCardBox.offsetParent.offsetWidth >= 992 && testiomonalsCardBox.offsetParent.offsetWidth < 1200){
        moveWholeCard = 320;
    } else {
        moveWholeCard = 335;
    }
    const viisibleWidth = testiomonalsCardBox.offsetWidth - testiomonalsCardBox.parentElement.previousElementSibling.offsetWidth;
    const numberOfScroll = Math.trunc((viisibleWidth) / moveWholeCard);
    const restWidth = (testiomonalsCardBox.offsetWidth - moveWholeCard * numberOfScroll) % testiomonalsCardBox.parentElement.previousElementSibling.offsetWidth;
    if (numberOfScroll === 0 && testimonialsMoveCounter === 0){
        testiomonalsCardBox.style.transform = `translateX(${- restWidth}px)`; 
        testimonialsMoveCounter++;
    }else if (testimonialsMoveCounter <= numberOfScroll){
        testimonialsMoveCounter++;
        if (testimonialsMoveCounter > numberOfScroll){
            testiomonalsCardBox.style.transform = `translateX(${-moveWholeCard * (testimonialsMoveCounter - 1) - restWidth}px)`;
        } else {
            testiomonalsCardBox.style.transform = `translateX(${-moveWholeCard * testimonialsMoveCounter}px)`;
        }
    }
}
function moveTestimonialsCardRight () {
    const testiomonalsCardBox = document.querySelector('.testimonials-card-box');
    let moveWholeCard = 335;
    if (testiomonalsCardBox.offsetParent.offsetWidth >= 992 && testiomonalsCardBox.offsetParent.offsetWidth < 1200){
        moveWholeCard = 320;
    } else {
        moveWholeCard = 335;
    }
    const viisibleWidth = testiomonalsCardBox.offsetWidth - testiomonalsCardBox.parentElement.previousElementSibling.offsetWidth;
    const numberOfScroll = Math.trunc((viisibleWidth) / moveWholeCard);
    const restWidth = (testiomonalsCardBox.offsetWidth - moveWholeCard * numberOfScroll) % testiomonalsCardBox.parentElement.previousElementSibling.offsetWidth;
    if (numberOfScroll === 0 && testimonialsMoveCounter > 0){
        testiomonalsCardBox.style.transform = `translateX(0)`;
        testimonialsMoveCounter--;
    }else if (testimonialsMoveCounter > 0){
        testimonialsMoveCounter--;
        if (testimonialsMoveCounter > numberOfScroll){
            testiomonalsCardBox.style.transform = `translateX(${-moveWholeCard * (testimonialsMoveCounter - 1) - restWidth}px)`;
        } else {
            testiomonalsCardBox.style.transform = `translateX(${-moveWholeCard * testimonialsMoveCounter}px)`;
        }
    }
}
testimonialsBtn_l.addEventListener('click', moveTestimonialsCardLeft);
testimonialsBtn_r.addEventListener('click', moveTestimonialsCardRight);

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
    overflowContent(); // changing of padding for sliders
    // close burger menu during resizing 
    if(burgerMenu.classList.contains('active-burger')){
        activeBurger();
    }
}
function overflowContent () {
    const container = document.querySelectorAll('.overflow-container');
    container.forEach((item) => {
        item.style.paddingLeft = item.previousElementSibling.offsetLeft + 'px';
    });
}
overflowContent();
changePosMenuForResponsive();
window.addEventListener("resize", changePosMenuForResponsive);

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
