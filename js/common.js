$(document).ready(function () {
    $('.form-select').select2({
        minimumResultsForSearch: Infinity,
        width: 'auto',
    });
    const swiperPopular = new Swiper('.popular_slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        pagination: {
            el: '.swiper-pagination',
        },
        breakpoints: {
            577: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            993: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1201: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        },
    });

    $('.dropdown_btn').on('click', function (e) {
        e.preventDefault();
        $('.dropdown_btn')
            .not(this)
            .removeClass('active')
            .next('.dropdown_block')
            .slideUp('ease-out');
        $(this)
            .toggleClass('active')
            .next('.dropdown_block')
            .slideToggle('ease-out');
    });

    const swiperEvents = new Swiper('.events_slider', {
        slidesPerView: 1,
        grid: {
            rows: 2,
            fill: 'column',
        },
        spaceBetween: 10,
        navigation: {
            nextEl: '.events_section .swiper-button-next',
            prevEl: '.events_section .swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
        },
        breakpoints: {
            769: {
                slidesPerView: 2,
                grid: {
                    rows: 3,
                    fill: 'column',
                },
                spaceBetween: 20,
            },
            1201: {
                slidesPerView: 3,
                grid: {
                    rows: 2,
                    fill: 'column',
                },
                spaceBetween: 20,
            },
        },
    });

    //календарь
    const datapiskers = document.querySelectorAll('.date_input_input');

    datapiskers.forEach((datapisker) => {
        let datapickerGrid;
        if (window.innerWidth <= 992) {
            datapickerGrid = 1;
        } else {
            datapickerGrid = 2;
        }

        const picker = new easepick.create({
            element: datapisker,
            css: [
                'vendors/easepick/easepick.css',
                'vendors/easepick/customize_easepick.css',
            ],
            setup(picker) {
                // Обработчик выбора даты
                picker.on('select', () => {
                    const parent = datapisker.closest('.date_input');
                    parent.classList.add('completed');
                    const clearButton =
                        parent.querySelector('.date_input_clear');
                    if (clearButton) {
                        clearButton.classList.add('show');
                    }
                });

                // Обработчик очистки
                picker.on('clear', () => {
                    const parent = datapisker.closest('.date_input');
                    parent.classList.remove('completed');
                    const clearButton =
                        parent.querySelector('.date_input_clear');
                    if (clearButton) {
                        clearButton.classList.remove('show');
                    }
                });
            },
            lang: 'ru-US',
            format: 'DD.MM.YYYY',
            zIndex: 10,
            grid: datapickerGrid,
            calendars: datapickerGrid,
            RangePlugin: {
                delimiter: ' - ',
            },
            locale: {
                previousMonth:
                    '<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 8.5L1.5 5L4.5 1.5" stroke="#858585" stroke-width="1.5" stroke-linecap="round"/></svg>',
                nextMonth:
                    '<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 8.5L4.5 5L1.5 1.5" stroke="#858585" stroke-width="1.5" stroke-linecap="round"/></svg>',
            },
            plugins: ['RangePlugin'],
        });
        $('.date_input_clear').on('click', function () {
            const pickerBtnParentInput =
                this.parentNode.querySelector('.date_input_input');
            if (picker.options.element == pickerBtnParentInput) {
                picker.clear();
                this.parentNode.classList.remove('completed');
                $(this).remove();
            }
        });
    });

    // видео
    const players = Array.from(document.querySelectorAll('.player_video')).map(
        (p) =>
            new Plyr(p, {
                autoplay: false,
            })
    );

    // // анимация
    // let offset
    // if ($(window).width() > 576) {
    //     offset = 100;
    // } else {
    //     offset = 0;
    // }
    // AOS.init({
    //     easing: 'ease-in-out',
    //     delay: 100,
    //     once: true,
    //     duration: 700,
    //     offset: offset,
    // });
    // открытие моб. меню
    $('.menu_btn').on('click', function () {
        $('.menu_btn').toggleClass('active');
        $('.mobile_menu').toggleClass('active');
        $('body').toggleClass('locked');
    });

    // // маска для телефона
    // const phoneInputs = document.querySelectorAll('.form_input[name="tel"]');
    // phoneInputs.forEach((input) => {
    //     IMask(input, {
    //         mask: '+{7}(000)000-00-00',
    //     });
    // });

    // // открытие модаки
    // // нужно только поменять значени в data-modal и data-open-modal
    // const body = document.querySelector('body');
    // let getScrollWidth = () => window.innerWidth - document.documentElement.offsetWidth;
    // let browserScrollWidth = getScrollWidth();

    // document.addEventListener('click', (e) => {
    //     const target = e.target;
    //     if (target.closest('[data-open-modal]')) {
    //         e.preventDefault();
    //         const targetId = target.closest('[data-open-modal]').dataset.openModal;
    //         const selectedModal = document.querySelector(`[data-modal="${targetId}"]`);
    //         selectedModal.classList.add('show');
    //         body.classList.add('locked');
    //         if (getScrollWidth() == 0) {
    //             body.style.paddingRight = `${browserScrollWidth}px`;
    //         }
    //     }
    //     if (target.closest('[data-modal-close]')) {
    //         e.preventDefault();
    //         let modalOpen = document.querySelector('.modal.show');
    //         document.querySelector('.modal.show').classList.remove('show');
    //         body.classList.remove('locked');
    //         body.style.paddingRight = ``;
    //     }
    //     if (target.closest('.modal') && !target.closest('.modal-content')) {
    //         e.preventDefault();
    //         let modalOpen = document.querySelector('.modal.show');
    //         document.querySelector('.modal.show').classList.remove('show');
    //         body.classList.remove('locked');
    //         body.style.paddingRight = ``;
    //     }
    // });

    // // копированиe URL в буфер обмена
    // $('.copy_block').click(function () {
    //     var url = window.location.href;
    //     var $button = $(this);
    //     console.log($button);
    //     navigator.clipboard.writeText(url).then(function () {
    //         $button.addClass('copied');
    //         setTimeout(() => {
    //             $button.removeClass('copied');
    //         }, 3000);
    //     }, function (err) {
    //         console.error('Ошибка копирования URL в буфер обмена: ', err);
    //     });
    // });

    // $('.faq_item').first().find('.faq_item_content').slideToggle()
    // $('.faq_item').first().addClass('active')

    // $(".faq_item").click(function () {
    //     $('.faq_item').not(this).removeClass('active').children('.faq_item_content').slideUp("ease-out")
    //     $(this).toggleClass("active").children(".faq_item_content").slideToggle("ease-out")
    // })

    // $('.requirements_item').first().find('.requirements_item_content').slideToggle()
    // $('.requirements_item').first().addClass('active')

    // $(".requirements_item").click(function () {
    //     $('.requirements_item').not(this).removeClass('active').children('.requirements_item_content').slideUp("ease-out")
    //     $(this).toggleClass("active").children(".requirements_item_content").slideToggle("ease-out")
    // })
});
