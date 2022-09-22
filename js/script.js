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

        
        let min = +rangeInput.getAttribute('min'),
            max = +rangeInput.getAttribute('max'),
            step = +rangeInput.getAttribute('step'),
            val_ = +rangeInput.value;

        rangeInput.addEventListener('input', function() {
            let val = +rangeInput.value,
                position = 100 / (max - step) * (val - step);

            rangeTrack.style.width = `${position}%`;
            rangeNum.value = `${val}`;
        });

        rangeNum.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, '')
            if (this.value > max) {
                this.value = max
            }
            if(this.value < min) {
                return
            }
            if (this.value > min && this.value <= max)  {
                rangeTrack.style.width = `${100 / (max - step) * (this.value - step)}%`;
                val_ = this.value   
            }
        })
    }

    range(".calc__range__input--1", ".calc__range__track--1", ".calc__field--1")
    range(".calc__range__input--2", ".calc__range__track--2", ".calc__field--2")

})