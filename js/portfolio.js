const buttonMore = document.querySelector('.big-firstrow');
const moreInfo = document.querySelector('.test');

buttonMore.addEventListener('click', function() {
    moreInfo.classList.toggle('test-visible');
})
moreInfo.addEventListener('click', function() {
    moreInfo.classList.toggle('test-visible');
})