const nav = document.getElementById('nav');
const checkbox = document.getElementById('menu-btn');

checkbox.addEventListener('change', function () {
    if (this.checked) {
        nav.style.backgroundColor = '#30332eaa';
    } else {
        nav.style.backgroundColor = '';
    }
})
