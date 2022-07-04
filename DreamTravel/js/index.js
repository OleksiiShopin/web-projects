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
            const oldActive = document.querySelector('.active-desc');
            oldActive.classList.remove('active-desc');
            aboutCardsBox.style.transform = `translateX(${-widthAboutCard * countOfscroll}px)`;
            window.setTimeout(()=> {
                oldActive.nextElementSibling.classList.add('active-desc');
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
            const oldActive = document.querySelector('.active-desc');
            oldActive.classList.remove('active-desc');
            aboutCardsBox.style.transform = `translateX(${-widthAboutCard * countOfscroll}px)`;
            window.setTimeout(()=> {
                oldActive.previousElementSibling.classList.add('active-desc');
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
    const viisibleWidth = testiomonalsCardBox.offsetWidth - testiomonalsCardBox.parentElement.offsetWidth;
    const numberOfScroll = Math.trunc((viisibleWidth) / moveWholeCard);
    const restWidth = (testiomonalsCardBox.offsetWidth - moveWholeCard * numberOfScroll) % testiomonalsCardBox.parentElement.offsetWidth;
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
    const viisibleWidth = testiomonalsCardBox.offsetWidth - testiomonalsCardBox.parentElement.offsetWidth;
    const numberOfScroll = Math.trunc((viisibleWidth) / moveWholeCard);
    const restWidth = (testiomonalsCardBox.offsetWidth - moveWholeCard * numberOfScroll) % testiomonalsCardBox.parentElement.offsetWidth;
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
    } else {
        burgerNav.style.width = 0;
    }
}
burgerMenu.addEventListener('click', activeBurger);
let replaceNavIndex = -1;
function changePosMenuForResponsive () {
    console.log(window.innerWidth);
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
changePosMenuForResponsive();
window.addEventListener("resize", changePosMenuForResponsive);

