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

    // range, calc

    // маска
    function prettify(num) {
        var n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }

    // вычисление платежа
    function getPayment(sum, period, rate) {
        // *
        // * sum - сумма кредита
        // * period - срок в годах
        // * rate - годовая ставка в процентах
        // * 
        let i,
            koef,
            payment;

        // ставка в месяц
        i = (rate / 12) / 100;

        // коэффициент аннуитета
        koef = (i * (Math.pow(1 + i, period * 12))) / (Math.pow(1 + i, period * 12) - 1);

        // итог
        payment = (sum * koef).toFixed();
        return prettify(payment);
    };

    function range(rangeInput_, rangeTrack_, rangeNum_, resultField, periodOrSum, reverse = false) {
        const rangeInput = document.querySelector(rangeInput_),
              rangeTrack = document.querySelector(rangeTrack_),
              rangeNum = document.querySelector(rangeNum_),
              result = document.querySelector(resultField);

        
        let min = +rangeInput.getAttribute('min'),
            max = +rangeInput.getAttribute('max'),
            step = +rangeInput.getAttribute('step'),
            val_ = +rangeInput.value;

        rangeInput.addEventListener('input', function() {
            const periodOrSum_ = document.querySelector(periodOrSum).value
            let val = +rangeInput.value,
                position = 100 / (max - step) * (val - step);

            rangeTrack.style.width = `${position}%`;
            rangeNum.value = `${val}`;
            reverse ? result.textContent = getPayment(periodOrSum_, val, 4) : result.textContent = getPayment(val, periodOrSum_, 4)
        });

        rangeNum.addEventListener('input', function () {
            const periodOrSum_ = document.querySelector(periodOrSum).value
            this.value = this.value.replace(/\D/g, '')
            if (this.value > max) {
                this.value = max
            }
            if(this.value < min) {
                return
            }
            if (this.value >= min && this.value <= max)  {
                rangeTrack.style.width = `${100 / (max - step) * (this.value - step)}%`;
                val_ = this.value   
            }
            reverse ? result.textContent = getPayment(periodOrSum_, this.value, 4) : result.textContent = getPayment(this.value, periodOrSum_, 4)
        })
    }

    range(".calc__range__input--1", ".calc__range__track--1", ".calc__field--1", '.calc__wrap__card__title--1 span', ".calc__range__input--2")
    range(".calc__range__input--2", ".calc__range__track--2", ".calc__field--2", '.calc__wrap__card__title--1 span', ".calc__range__input--1", true)

    //faq
    const tabs = document.querySelectorAll('.faq__item')
    const tabsTriggers = document.querySelectorAll('.faq__item__header')
    const tabsContents = document.querySelectorAll('.faq__item__content')

    tabsTriggers.forEach((trigger, triggerIndex, array) => {
        trigger.addEventListener('click', () => {
            tabs[triggerIndex].classList.toggle('faq__item--active')
            if (tabs[triggerIndex].classList.contains('faq__item--active')) {
                tabsContents[triggerIndex].style.height= tabsContents[triggerIndex].scrollHeight + 'px'
            } else {
                tabsContents[triggerIndex].style = ''
            }
        })
    })

    //video
    function video(triggers, _video, _modalVideo, _modalVideoClose) {
        const play = document.querySelectorAll(triggers),
            video = document.querySelector(_video),
            modalVideo = document.querySelector(_modalVideo),
            modalVideoClose = document.querySelector(_modalVideoClose);

        play.forEach(item => {
            item.addEventListener('click', (e) => {
                const path = e.currentTarget.getAttribute('data-video');
                modalVideo.classList.add('modal--active');
                document.body.style.overflow = 'hidden';
                video.setAttribute('src', path);
                video.play();
            });
        });

        modalVideo.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal__container')) {
                modalVideo.classList.remove('modal--active');
                video.pause();
                document.body.style.overflow = '';
            }
        });
        modalVideoClose.addEventListener('click', () => {
            modalVideo.classList.remove('modal--active');
            video.pause();
            document.body.style.overflow = '';
        })
    }

    video('.reviews__card__play', '#video', '.modal-video', '.modal-video__close');


    //slider
    function slider(window, field, cards, dotsWrap, dotClass, dotClassActive, arrowPrev, arrowNext, arrowClass, progress) {
        const window_ = document.querySelector(window),
            field_ = document.querySelector(field),
            cards_ = document.querySelectorAll(cards),
            arrowPrev_ = document.querySelector(arrowPrev),
            arrowNext_ = document.querySelector(arrowNext),
            progress_ = document.querySelector(progress);

        let startPoint,
            swipeAction,
            endPoint,
            sliderCounter = 0,
            dots_ = [];

        // Устанавливаем фиксированную ширину поля слайдов

        // field_.style.width = `${cardWidth * cards_.length + (margin * (cards_.length - 1))}px`;
        // field_.style.marginLeft = 'auto';
        // field_.style.marginRight = 'auto';
        // field_.style.display = 'flex';

        //Устанавливаем ширину бегунка прогресс-бара
        progress_.style.width = 100 / cards_.length + '%'

        //Вычисление нужного свойство у элемента (у нас margin-right)

        function getCompStyle(elem, property) {
            return +getComputedStyle(elem)[property].replace(/\D/g, '')
        }

        // Слайд следующий

        function slideNext() {
            sliderCounter++;
            arrowNext_.classList.remove(arrowClass);
            arrowPrev_.classList.remove(arrowClass);
            if (sliderCounter >= cards_.length) {
                sliderCounter = cards_.length - 1;
            }
            if ((sliderCounter + 1) == cards_.length) {
                arrowNext_.classList.add(arrowClass);
            }
            if (dotsWrap) {
                dots_.forEach((item, index)=> {
                item.classList.remove(dotClassActive);
                if (index == sliderCounter) {
                    item.classList.add(dotClassActive);
                }
                });
            }
            field_.style.transform = `translateX(-${(cards_[0].scrollWidth + getCompStyle(cards_[0], 'marginRight')) * sliderCounter}px)`;
            progress_.style.left = (100 / cards_.length) * sliderCounter + '%'
        }

        // Слайд предыдущий

        function slidePrev() {
            sliderCounter--;
            arrowNext_.classList.remove(arrowClass);
            arrowPrev_.classList.remove(arrowClass);
            if (sliderCounter <= 0) {
                sliderCounter = 0;
            }
            if (sliderCounter == 0) {
                arrowPrev_.classList.add(arrowClass);
            }
            if (dotsWrap) {
                dots_.forEach((item, index)=> {
                    item.classList.remove(dotClassActive);
                    if (index == sliderCounter) {
                        item.classList.add(dotClassActive);
                    }
                });
            }
            field_.style.transform = `translateX(-${(cards_[0].scrollWidth + getCompStyle(cards_[0], 'marginRight')) * sliderCounter}px)`;
            progress_.style.left = (100 / cards_.length) * sliderCounter + '%'
        }

        // Рендер точек

        if (dotsWrap) {
            const dotsWrap_ = document.querySelector(dotsWrap);

            cards_.forEach(() => {
                const dot = document.createElement('div');
                dot.classList.add(dotClass);
                dotsWrap_.appendChild(dot);
                dots_.push(dot);
            });
            dots_[0].classList.add(dotClassActive);
            dots_.forEach((item, index) => {
                item.addEventListener('click', () => {
                    sliderCounter = index;
                    arrowNext_.classList.remove(arrowClass);
                    arrowPrev_.classList.remove(arrowClass);
                    if (sliderCounter == 0) {
                        arrowPrev_.classList.add(arrowClass);
                    }
                    if ((sliderCounter + 1) == cards_.length) {
                        arrowNext_.classList.add(arrowClass);
                    }
                    dots_.forEach(item_ => {
                        item_.classList.remove(dotClassActive);
                    });
                    item.classList.add(dotClassActive);
                    field_.style.transform = `translateX(-${(cards_[0].scrollWidth + getCompStyle(cards_[0], 'marginRight')) * sliderCounter}px)`;
                });
            });
        }

        // Переключение на стрелки

        arrowPrev_.addEventListener('click', () => {
            slidePrev();
        });

        arrowNext_.addEventListener('click', () => {
            slideNext();
        });

        // Свайп слайдов тач-событиями

        window_.addEventListener('touchstart', (e) => {
            startPoint = e.changedTouches[0].pageX;
        });

        window_.addEventListener('touchmove', (e) => {
            swipeAction = e.changedTouches[0].pageX - startPoint;
            field_.style.transform = `translateX(${swipeAction + (-(cards_[0].scrollWidth + getCompStyle(cards_[0], 'marginRight')) * sliderCounter)}px)`;
        });

        window_.addEventListener('touchend', (e) => {
            endPoint = e.changedTouches[0].pageX;
            if (Math.abs(startPoint - endPoint) > 50) {
                arrowNext_.classList.remove(arrowClass);
                arrowPrev_.classList.remove(arrowClass);
                if (endPoint < startPoint) {
                    slideNext();
                } else {
                    slidePrev();
                }
            } else {
                field_.style.transform = `translateX(-${(cards_[0].scrollWidth + getCompStyle(cards_[0], 'marginRight')) * sliderCounter}px)`;
            }
        });
    }
    slider(
        '.comments__window',
        '.comments__field',
        '.comments__card',
        false,
        false,
        false,
        '.comments__arrow--prev',
        '.comments__arrow--next',
        'comments__arrow--inactive',
        '.comments__progress__inner'
    );


    // функция для модалки

    function calcScroll() {
        let div = document.createElement('div');
        
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        
        document.body.appendChild(div);
        let scarollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        
        return scarollWidth;
    }

    let scrollWidth = calcScroll();

    function modal(modal, modalActiveClass, triggers, modalClose) {
        const triggers_ = document.querySelectorAll(triggers),
                modal_ = document.querySelector(modal),
                modalClose_ = document.querySelector(modalClose);

        if (triggers_.length > 0) {
            triggers_.forEach(item => {
                item.addEventListener('click', () => {
                    modal_.classList.add(modalActiveClass);
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scrollWidth}px`;
                });
            });

            modalClose_.addEventListener('click', () => {
                modal_.classList.remove(modalActiveClass);
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px';
            });

            modal_.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal__container')) {
                    modal_.classList.remove(modalActiveClass);
                    document.body.style.overflow = '';
                    document.body.style.marginRight = '0px';
                }
            });
        }
    }

    modal('.modal-main', 'modal--active', '[data-modal]', '.modal-main__close');


})