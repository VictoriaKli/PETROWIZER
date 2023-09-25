"use strict";

$(document).ready(function () {

   /* Константы
    ==========================================================================*/
    const body = $('body'),
    overlay = $('.js-overlay'),
    html = $('html');

    // Хедер
    const search = $('.js-search-fixed'),
    searchDrop = $('.js-search-dropdown'),
    header = $('.js-header'),
    headerCatalogDropdown = $('.js-header-catalog'),
    headerBigCatalogDropdown = $('.js-header-catalog-big'),
    cartLink = $(".js-cart-link"),
    dropdownCartContainer = $(".js-fixed-cart"),
    cartItems = $(".js-fixed-cart-item"),
    personalLink = $('.js-header-personal-link'),
    personalDropdownContainer = $('.js-header-personal'),
    mobileBurgerLink = $('.js-mobile-burger'),
    mobileDropdown = $('.js-mobile-dropdown');


  /* Поиск
    ==========================================================================*/

    function searchDropdown() {
      $('.js-search-link').click(function(e) {
        e.preventDefault();
        if (!search.hasClass('is-show')) {
          resetHeader()
          search.addClass('is-show');
          body.addClass('search-open');
        }
      });
      $('body').on('input', ".js-search-input", function() {
        if ($(this).val().length >= 1) {
          searchDrop.addClass('is-show');
        } else {
          searchDrop.removeClass('is-show');
        }
      });

      $('.js-search-clear').click(() => $('.js-search-input').val(''));

      $(window).click(function(e) {
        if (search.hasClass('is-show') && $(e.target).hasClass('overlay')) {
          search.removeClass('is-show');
          searchDrop.removeClass('is-show');
          body.removeClass('search-open');
        }
      });
    }
    function clearSearch() {
      search.removeClass('is-show');
      searchDrop.removeClass('is-show');
      body.removeClass('search-open');
    }

    searchDropdown();






    function headerMenuDropdown() {
      $('.js-header-menu-item').mouseenter(function () {
        var dropdown = $(this).find('.js-menu-dropdown');

        $('.js-select-block').removeClass('is-open');
        $('.js-select-list').removeClass('is-open');

        if (!$(this).hasClass('is-open')) {
          resetHeader();
          $(this).addClass('is-open');
          dropdown.addClass('is-show');
          body.addClass('dropdown-open');
        }

        dropdown.mouseenter(function () {
          $(this).parents('.js-header-menu-item').addClass('is-open');
          $(this).addClass('is-show');
          body.addClass('dropdown-open');

        });
        $(this).mouseleave(function () {
          clearHeaderMenuDropdown();
        });
        dropdown.mouseleave(function () {
          clearHeaderMenuDropdown();
        });
      });
    }

    function clearHeaderMenuDropdown() {
      $('.js-header-menu-item').removeClass('is-open');
      $('.js-menu-dropdown').removeClass('is-show');
      body.removeClass('dropdown-open');
    }

    headerMenuDropdown();

    function dropdownCart() {
      let  cartHeight = 0;

      cartLink.mouseenter(function() {
        if (!$(this).hasClass("is-active") && !html.hasClass("mobile")) {
          resetHeader();
          setPosition($(this), '.js-fixed-cart');
          $(this).addClass("is-active");
          dropdownCartContainer.addClass("is-show");
          body.addClass("cart-open");
        }
        });

        cartLink.click(function() {
          if (!$(this).hasClass("is-active")) {
            resetHeader();
            setPosition($(this), '.js-fixed-cart');
            $(this).addClass("is-active");
            dropdownCartContainer.addClass("is-show");
            body.addClass("cart-open");
          } else {
            dropdownCartClear();
          }

          });

      if (cartItems.length > 3) {
        let paddingBottom =  dropdownCartContainer.find(".js-custom-scroll").css('paddingTop');

        for (let i = 0; i <= cartItems.length; i++) {
          if (i === 3) {
            dropdownCartContainer.find(".js-custom-scroll").css('height',  (cartHeight - 1 + +paddingBottom.replace("px", "")) + "px");
            $(".js-custom-scroll").mCustomScrollbar();
            break;
          }
          cartHeight += cartItems[i].offsetHeight;
        }
      }
      dropdownCartContainer.mouseenter(function() {
        $(this).mouseleave(function() {
          dropdownCartClear();
        });
      });

      document.addEventListener("click", function(e) {
        console.log()
        if (!withinBoundaries(".js-fixed-cart", e) && !withinBoundaries(".js-cart-mobile", e)  && cartLink.hasClass("is-active")) {
          dropdownCartClear();
        }
      });

    }

    function dropdownCartClear() {
      cartLink.removeClass('is-active');
      dropdownCartContainer.removeClass('is-show');
      body.removeClass('cart-open');
    }

    function dropdownPersonal() {
      personalLink.mouseenter(function() {
        if (!$(this).hasClass("is-active")) {
          resetHeader();
          setPosition($(this), '.js-header-personal');
          $(this).addClass("is-active");
          personalDropdownContainer.addClass("is-show");
          body.addClass("personal-open");
        }
        });

        personalDropdownContainer.mouseenter(function() {
          $(this).mouseleave(function() {
            dropdownPersonalClear();
          });
        });
        document.addEventListener("click", function(e) {
          if (!withinBoundaries(".js-header-personal", e) && personalLink.hasClass("is-active")) {
            dropdownPersonalClear();
          }
        });
    }

    dropdownPersonal();

    function dropdownPersonalClear() {
      personalLink.removeClass("is-active");
      personalDropdownContainer.removeClass("is-show");
      body.removeClass("personal-open");
    }

    dropdownCart();

    function fixedHeader() {
      if ($(window).scrollTop() > header.height() && $(window).width() > 992) {
        resetHeader();
        body.addClass("is-fixed");
      } else {
        body.removeClass("is-fixed");
      }
    }
    fixedHeader();

    window.addEventListener("scroll", function() {
      fixedHeader();
    }, {passive: true});


    function mobileMenu() {
      mobileBurgerLink.click(function(e) {
        e.preventDefault();

        if (!$(this).hasClass('active')) {
          resetHeader();
          mobileBurgerLink.addClass('active');
          body.addClass('mobile-open');
          mobileDropdown.addClass('is-show');
        } else {
          mobileMenuClear();
        }

      })
    }
    function mobileMenuClear() {
      mobileBurgerLink.removeClass('active');
      body.removeClass('mobile-open');
      mobileDropdown.removeClass('is-show');
    }

    mobileMenu();

    function mobileMenuDropdown() {
      $('.js-mobile-menu-arrow').click(function() {
        let parent = $(this).parent(),
        dropdown = $(this).parents('.js-mobile-menu-item').find('.js-mobile-menu-list');
        if (!parent.hasClass('is-open')) {
          parent.addClass('is-open');
          dropdown.slideDown();
        } else {
          parent.removeClass('is-open');
          dropdown.slideUp();
        }
      });
    }

    mobileMenuDropdown();


    function resetHeader() {
      // clearCatalog();
      clearSearch();
      // headerBigCatalogClear();
      dropdownCartClear();
      dropdownPersonalClear();
      mobileMenuClear();
    }


  /* Слайдеры
  ==========================================================================*/

  $('.js-homescreen-slider').slick({
    slidesToShow: 1,
    arrows: true,
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    pauseOnHover: false,
    pauseOnFocus: false,
    appendArrows: $(".js-slider-arrows"),
    prevArrow: '<button aria-label="Предыдущий слайд" class="slider-arrow slider-prev"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#slider-arrow"></use></svg></button>',
    nextArrow: '<button aria-label="Следующий слайд" class="slider-arrow slider-next"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#slider-arrow"></use></svg></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true
        }
      }
    ]
  });

  slickControlSlides('.js-homescreen-slider');

  /* Главная страница
  ==========================================================================*/

  function mpPayment() {
    $('.js-payment-more').click(function(e) {
      e.preventDefault();

      let parent = $(this).parents('.js-payment-item');
      if (!parent.hasClass('is-open')) {
        parent.addClass('is-open');
      } else {
        parent.removeClass('is-open');
      }
    });
  }

  mpPayment();

  /* Общее
  ==========================================================================*/

  $('.js-custom-scroll').mCustomScrollbar();

  function setPosition(parent, target) {
    let parentLeft = parent[0].getBoundingClientRect().left,
    parentWidth = parent.width();
    $(target).css('right', Math.round($(window).width() - (parentLeft + parentWidth)) + "px");
  }

  function withinBoundaries(selector, event) {
    return event.composedPath().includes(document.querySelector(selector));
  }

  function slickControlSlides(slickSelector) {

    const sliderSelector = $(slickSelector); // Объявляем селектор слайдера

    if (sliderSelector.hasClass("slick-initialized")) {
      // Проверяем наличие slick'а

      let paramSlides = sliderSelector.slick("slickGetOption", "slidesToShow"), // Получаем количество параметр количества слайдов
        slickSlides = sliderSelector.find(".slick-slide:not(.slick-cloned)"), // Получаем все сайлды кроме клонов
        slickArrows = sliderSelector.slick("slickGetOption", "arrows"), // Получаем количество параметр наличия стрелок
        slickInfinite = sliderSelector.slick("slickGetOption", "infinite"); // Проверяем наличие цикличности

      // Если слайдер не цикличный, то меняем состояние кнопок
      if (!slickInfinite) {
        // Устанавливаем селектор для навигации
        let nav = $(slickSelector).parent().find(".section__nav");

        // Устанавливаем disabled по умолчанию для кнопки prev
        nav.find(".btn_prev").addClass("disabled");

        $(slickSelector).on(
          "afterChange",
          function (event, slick, currentSlide, nextSlide) {
            // Снимаем класс для всех кнопок
            if (currentSlide >= 1) {
              nav.find(".slick-btn").removeClass("disabled");
            }
            // Устанавливаем класс для кнопки prev
            if (currentSlide == 0) {
              nav.find(".btn_prev").addClass("disabled");
            } else {
              nav.find(".btn_prev").removeClass("disabled");
            }
            // Устанавливаем класс для кнопки next
            if (currentSlide == slickSlides.length - 1) {
              nav.find(".btn_next").addClass("disabled");
            } else {
              nav.find(".btn_next").removeClass("disabled");
            }
          }
        );
      }
      // Отключаем трансформацию slick-track'а при недостатке слайдов
      paramSlides >= slickSlides.length
        ? sliderSelector.addClass("slick-no-transform")
        : sliderSelector.removeClass("slick-no-transform");
      // Проверяем количество слайдов и отключаем стрелки
      if (paramSlides >= slickSlides.length) {
        $(slickSelector).parent().find(".banner-mp__nav").css('display', 'none');
      } else if (paramSlides === 1) {
        $(slickSelector).parent().find(".banner-mp__nav").css('display', 'none');
      }else {
        $(slickSelector).parent().find(".banner-mp__nav").css('display', 'flex');
      }
      // Убираем точки
      if (slickSlides.length == 1) {
        $(slickSelector).find(".slick-dots").css("opacity", "0");
      }
      // Устанавливаем прогрессбар для каждой точки
      if (slickSlides.length > 1
        && ($(slickSelector).find('.slick-dots').length && $(slickSelector).hasClass('is-progress'))
        && !$(slickSelector).hasClass("has-progress")) {

          $(slickSelector).addClass("has-progress");
          $(_progressBarDotsSelector).find('svg').remove();

          let _progressBarDotsSelector = `${slickSelector} .slick-dots .slick-active button`,
          _progressBar = '',
          _dotsParams = {
            strokeWidth: 1,
            easing: 'linear',
            duration: 3000,
            color: '#FFFFFF',
            trailColor: '#ababac',
            trailWidth: 1,
            svgStyle: {
              width: '100%',
              height: '100%'
            }
          };

            if ($(slickSelector).hasClass("has-progress")) {
              _progressBar = new ProgressBar.Line(_progressBarDotsSelector, _dotsParams);
              _progressBar.animate(1);

                $(slickSelector).on('beforeChange', function (event, slick) {
                  if (_progressBar !== '' && $(slickSelector).hasClass('slick-dotted')) {
                      _progressBar.destroy();
                      _progressBar = '';
                  }
                });

                $(slickSelector).on('afterChange', function (event, slick) {
                  if (_progressBar == '' && $(slickSelector).hasClass('slick-dotted')) {
                    _progressBar = new ProgressBar.Line(_progressBarDotsSelector, _dotsParams);
                    _progressBar.animate(1);
                  } else {
                    _progressBar = '';
                  }
              });
            } else if (_progressBar !== '') {
              _progressBar.destroy();
            } else {
              _progressBar = '';
            }
      }

      // Устанавливаем обработчик события на ресайз
      if (!$(slickSelector).hasClass("observer")) {
        $(slickSelector).addClass("observer");
        window.addEventListener(
          "resize",
          function () {
            slickControlSlides(slickSelector);
          },
          { passive: true }
        );
      }
    }
  }



  /* Инпуты в стиле материал
  ==========================================================================*/
  $(".js-material-input").each(function () {
    if ($(this).find("input,textarea").val()) {
      $(this).addClass("active");
    } else {
      $(this).removeClass("active");
    }
  });
  $(".js-material-input")
    .find("input,textarea")
    .focusin(function () {
      $(this).closest(".js-material-input").addClass("focus");
      if ($(window).width() < 992)
        $(this).parents(".modal").css("overflow-y", "hidden");
    });
  $(".js-material-input")
    .find("input,textarea")
    .focusout(function () {
      $(this).closest(".js-material-input").removeClass("focus");
      if ($(window).width() < 992)
        $(this).parents(".modal").css("overflow-y", "auto");
    });

  function onInput() {
    if ($(this).val()) {
      $(this).closest(".js-material-input").addClass("active");
    } else {
      $(this).closest(".js-material-input").removeClass("active");
    }
  }
  $("body").on("input", ".js-material-input input", onInput);
  $("body").on("input", ".js-material-input textarea", onInput);

  $(".modal").on("touchstart", function () {
    $(this).css("overflow-y", "auto");
  });

  $(".js-touchspin").TouchSpin();
  $(".js-touchspin-plus").click(function (e) {
    e.preventDefault();
    $(this).parent().find(".js-touchspin").trigger("touchspin.uponce");
  });
  $(".js-touchspin-minus").click(function (e) {
    e.preventDefault();
    $(this).parent().find(".js-touchspin").trigger("touchspin.downonce");
  });

  /* Маска для телефонов
	==========================================================================*/

  const phones = document.getElementsByClassName("js-phone");
  for (let i = 0; i < phones.length; i++) {
    let cleave = new Cleave(phones[i], {
      numericOnly: true,
      delimiters: [" (", ") ", "-", "-"],
      blocks: [1, 3, 3, 2, 2],
    });
  };

  $('.js-header-mob-menu-icon').click(function () {
    if (!$(this).hasClass('is-active')) {
      $(this).addClass('is-active');
      $(this).parents('.js-header-mob-menu-item').addClass('is-active');
      $(this).parents('.js-header-mob-menu-item').find('.js-header-mob-menu-dropdown').slideDown();
    } else {
      $(this).removeClass('is-active');
      $(this).parents('.js-header-mob-menu-item').removeClass('is-active');
      $(this).parents('.js-header-mob-menu-item').find('.js-header-mob-menu-dropdown').slideUp();
    }
    $('.js-header-mob-menu-icon').not(this).removeClass('is-active');
    $('.js-header-mob-menu-icon').not(this).parents('.js-header-mob-menu-item').removeClass('is-active');
    $('.js-header-mob-menu-icon').not(this).parents('.js-header-mob-menu-item').find('.js-header-mob-menu-dropdown').slideUp();
  });


  $('.js-select-block').click(function(){
    if(!$(this).closest('.js-select').find('.js-select-list').hasClass('is-open')){
      $(this).closest('.js-select').find('.js-select-list').addClass('is-open');
      $(this).addClass('is-open');
      body.addClass('dropdown-open');
    } else{
      $(this).closest('.js-select').find('.js-select-list').removeClass('is-open');
      $(this).removeClass('is-open');
      body.removeClass('dropdown-open');
    }

  },
  );

  $('.js-select-item').click(function(){
    if(!$(this).hasClass('is-active')){
      $(this).addClass('is-active');
    } else{
      $(this).removeClass('is-active');
    }
    $('.js-select-block').removeClass('is-open');
    $('.js-select-list').removeClass('is-open');
    $('.js-select-item').not(this).removeClass('is-active');
    $(this).closest('.js-select').find('.js-select-value').text($(this).text());
    body.removeClass('dropdown-open');
  });

  overlay.click(function(){
    $('.js-select-list').removeClass('is-open');
    $('.js-select-item').not(this).removeClass('is-active');
    body.removeClass('dropdown-open');
  });

  $('.js-burger').click(function () {
    if (!$(this).hasClass('is-active')) {
      $(this).addClass('is-active');
      $(this).parents('.js-header').addClass('mobile-open');
      $(this).parents('.js-header').find('.js-header-mobile').addClass('is-open');
    } else {
      $(this).removeClass('is-active');
      $(this).parents('.js-header').find('.js-header-mobile').removeClass('is-open');
      $(this).parents('.js-header').removeClass('mobile-open');
    }
  });

  $(".js-preloader").addClass("is-hide");
});
