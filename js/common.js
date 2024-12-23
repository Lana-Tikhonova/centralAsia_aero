$(document).ready(function () {
    // анимация
    let offset;
    if ($(window).width() > 576) {
        offset = 100;
    } else {
        offset = 0;
    }
    AOS.init({
        easing: 'ease-in-out',
        delay: 100,
        once: true,
        duration: 700,
        offset: offset,
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

    // select
    let select = $('.form-select').select2({
        minimumResultsForSearch: Infinity,
        width: 'auto',
    });

    select.on('select2:select', function (e) {
        sendAllData();
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

                    sendAllData();
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

                    sendAllData();
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
                this.classList.remove('show');
                sendAllData();
            }
        });
    });

    // Обработчик клика на чекбоксах
    $('.search_tags_list input[type="checkbox"]').on('change', function () {
        sendAllData(); // Отправка данных при изменении состояния чекбокса
    });

    // Функция отправки всех данных
    function sendAllData() {
        let dataToSend = collectData();
        sendData(dataToSend);
    }
    // Cбор всех данных
    function collectData() {
        let dataToSend = {};

        // с селектов
        $('.form-select').each(function () {
            let name = $(this).attr('name');
            let value = $(this).val();
            dataToSend[name] = value;
        });

        //  с поля даты
        $('.date_input_input').each(function () {
            let name = $(this).attr('name');
            let value = $(this).val();
            dataToSend[name] = value;
        });

        // Собираем данные с чекбоксов
        let tags = [];
        $('.search_tags_list .tag input[type="checkbox"]:checked').each(
            function () {
                tags.push($(this).val());
            }
        );
        if (tags.length > 0) {
            dataToSend['tags'] = tags; // Добавляем массив выбранных тегов
        }

        return dataToSend;
    }

    // Функция отправки всех данных
    function sendData(dataToSend) {
        console.log('Отправка данных на сервер', dataToSend);
        $.ajax({
            url: '/',
            type: 'POST',
            data: dataToSend,
            success: function (response) {
                console.log('Ответ от сервера:', response);
            },
            error: function (xhr, status, error) {
                console.error('Ошибка при отправке данных:', error);
            },
        });
    }

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

    // открытие рекламы
    $('.plate_block_label').on('click', function () {
        $(this).find('.plate_block_label_dropdown').toggleClass('active');
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.plate_block_label').length) {
            $('.plate_block_label_dropdown').removeClass('active');
        }
    });

    // видео
    const players = Array.from(document.querySelectorAll('.player_video')).map(
        (p) =>
            new Plyr(p, {
                autoplay: false,
            })
    );

    // показывать 2 строки тегов на стр поиска
    const maxRows = 2; // Максимальное количество строк

    const $searchTagsList = $('.search_tags_list');
    const $labels = $searchTagsList.find('.tag');
    const $toggleButton = $searchTagsList.find('.search_tags_btn');

    function updateLabelVisibility() {
        const containerWidth = $searchTagsList.width();
        const buttonWidth = $toggleButton.outerWidth(true); // Ширина кнопки
        const availableWidth = containerWidth - buttonWidth; // Доступная ширина

        let currentRowWidth = 0;
        let rowCount = 1;
        let isOverflowing = false;

        $labels.each(function () {
            const elementWidth = $(this).outerWidth(true);

            if (currentRowWidth + elementWidth > availableWidth) {
                rowCount++;
                currentRowWidth = 0;
            }

            if (rowCount > maxRows) {
                $(this).addClass('hidden');
                isOverflowing = true;
            } else {
                $(this).removeClass('hidden');
                currentRowWidth += elementWidth;
            }
        });

        if (isOverflowing) {
            $toggleButton.show();
        } else {
            $toggleButton.hide();
        }

        // Убедиться, что кнопка всегда последняя
        $toggleButton.appendTo($searchTagsList);
    }

    $toggleButton.on('click', function () {
        if ($searchTagsList.hasClass('expanded')) {
            $(this).removeClass('active');
            $searchTagsList.removeClass('expanded');
            updateLabelVisibility();
        } else {
            $(this).addClass('active');
            $labels.removeClass('hidden');
            $searchTagsList.addClass('expanded');
        }
    });

    $(window).on('resize', function () {
        if (!$searchTagsList.hasClass('expanded')) {
            updateLabelVisibility();
        }
    });

    updateLabelVisibility();

    // Блок "Поделиться"
    const shareList = document.querySelector('.share_list');
    if (shareList) {
        shareList.addEventListener('click', function (event) {
            // Если клик был на иконке, переходим к кнопке
            const button = event.target.closest('button');
            if (!button) return; // Если клик не на кнопке, ничего не делаем

            const social = button.getAttribute('data-social');
            if (!social) return; // Если нет атрибута data-social, ничего не делаем

            // Получаем данные из мета-тегов
            const title =
                document.querySelector('meta[property="og:title"]')?.content ||
                document.title;
            const description =
                document.querySelector('meta[property="og:description"]')
                    ?.content || '';
            const imageUrl =
                document.querySelector('meta[property="og:image"]')?.content ||
                '';
            const pageUrl =
                document.querySelector('meta[property="og:url"]')?.content ||
                window.location.href;

            // Генерируем ссылки для социальных сетей
            const socialUrls = {
                facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    window.location.href
                )}`,
                vkontakte: `https://vk.com/share.php?url=${encodeURIComponent(
                    window.location.href
                )}`,
                telegram: `https://t.me/share/url?url=${encodeURIComponent(
                    window.location.href
                )}`,
                x: `https://x.com/intent/tweet?url=${encodeURIComponent(
                    window.location.href
                )}`,
                odnoklassniki: `https://connect.ok.ru/offer?url=${encodeURIComponent(
                    window.location.href
                )}`,
                viber: `viber://forward?text=${encodeURIComponent(
                    title + ' - ' + description + ' ' + pageUrl
                )}`,
                whatsapp: `https://wa.me/?text=${encodeURIComponent(
                    title + ' - ' + description + ' ' + pageUrl
                )}`,
            };

            // Для Viber, открываем приложение напрямую
            if (social === 'viber') {
                window.location.href = socialUrls.viber; // Переход по URL для Viber
            } else {
                // Для других соц.сетей открываем ссылку в новом окне
                const shareUrl = socialUrls[social];
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                } else {
                    console.error(`Сеть ${social} не поддерживается`);
                }
            }
        });
    }
});
