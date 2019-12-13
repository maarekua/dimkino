const test = document.querySelector('.test');
const show = document.querySelector('.show');
show.addEventListener('click', () => test.style.display = 'block');
test.addEventListener('click', () => test.style.display = '');