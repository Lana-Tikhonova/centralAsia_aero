$(document).ready(function () {
    // select
    $('.form-select').select2({
        minimumResultsForSearch: Infinity,
        width: 'auto',
    });

    // Популярные материалы
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

    // открытие меню в футере на мобилке
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

    // Мероприятия
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
    // открытие моб. меню
    $('.menu_btn').on('click', function () {
        $('.menu_btn').toggleClass('active');
        $('.mobile_menu').toggleClass('active');
        $('body').toggleClass('locked');
    });

    // галерея в статье
    const swiperGallery = new Swiper('.gallery_slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // открытие картинки во весь экран
    if ($('[data-fancybox="gallery"]').length) {
        $('[data-fancybox="gallery"]').fancybox({
            idleTime: false,
            animationEffect: 'fade',
            smallBtn: false,
            contentClick: 'close',
            mobile: {
                clickSlide: 'close',
            },
        });
    }
});
