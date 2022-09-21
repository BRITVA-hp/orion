document.addEventListener('DOMContentLoaded', () => {

    // burger
    const burger = document.querySelector('.header__burger')
    const menu = document.querySelector('.menu')
    const menuClose = document.querySelectorAll('[data-menuClose]')

    burger.addEventListener('click', () => {
        menu.classList.add('menu--active')
    })
    menuClose.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('menu--active')
        })
    })
    menu.addEventListener('click', (e) => {
        if (e.target.classList.contains('menu')) {
            menu.classList.remove('menu--active')
        }
    })

    // range
    function range(rangeInput_, rangeTrack_, rangeNum_) {
        const rangeInput = document.querySelector(rangeInput_),
              rangeTrack = document.querySelector(rangeTrack_),
              rangeNum = document.querySelector(rangeNum_);

        rangeInput.addEventListener('input', function() {
            let val = +this.value,
                min = +this.getAttribute('min'),
                max = +this.getAttribute('max'),
                step = +this.getAttribute('step'),
                position = 100 / (max - step) * (val - step);

            rangeTrack.style.width = `${position}%`;
            rangeNum.textContent = `${val}`;
        });
    }

    range(".calc__range__input--1", ".calc__range__track--1", ".calc__field__text--1")

})