// This is 'script.js' file for Coastal Hacks Hackathon

const open1 = document.querySelector('#open1');
const open2 = document.querySelector('#open2');

const close1 = document.querySelector('#close1');
const close2 = document.querySelector('#close2');

const openOne = document.querySelector('.popupContainer');
const openTwo = document.querySelector('.modelContainer');

open1.addEventListener("click", () => {
    openOne.classList.add("show");
});

open2.addEventListener("click", () => {
    openTwo.classList.add("show");
});

close1.addEventListener("click", () => {
    openOne.classList.remove("show");
});

close2.addEventListener("click", () => {
    openTwo.classList.remove("show");
});