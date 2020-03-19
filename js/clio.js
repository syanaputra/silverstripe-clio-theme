(function($) {
    var initializeMaterialForm = function() {
        $('body').on('focus', '.material-form .form-control', function() {
            var $this = $(this),
                $group = $this.closest('.form-group');

            $group.addClass('active focus');
        });

        $('body').on('blur', '.material-form .form-control', function() {
            var $this = $(this),
                $group = $this.closest('.form-group');

            if($this.val() == "") {
                $group.removeClass('active');
            }
            else {
                $group.addClass('active');
            }

            $group.removeClass('focus');
        })

        testMaterialFormInputs();
    };

    var testMaterialFormInputs = function() {
        $('.material-form .form-control').trigger('blur');
    }

    var iniateHeaderDummy = function() {
        var $headerDummy = $('.header-dummy'),
            $header = $('.header'),
            dummyHeader = $header.data('dummy-header') ? true : false,
            $afterHeader = $header.next();

        if($header.data('header-affix')) {
            if (!$headerDummy.length) {
                if (!$header.hasClass('header--homepage')) {
                    $headerDummy = $("<div class='header-dummy'></div>");
                    $headerDummy.insertBefore($header);
                    $headerDummy.height($header.outerHeight());
                }

                $header.addClass('header--initiated');
                $header.affix('checkPosition');
            }
        }

        if(!dummyHeader) {
            $headerDummy.hide();
        }
    }

    var showMobileMenu = function() {
        var $body = $('body'),
            $mobileMenu = $('.menu-mobile'),
            $mainNav = $('.main-navigation'),
            windowHeight = $(window).height(),
            navHeight = $mainNav.outerHeight();

        $body.addClass('menu--active');
        $mobileMenu.css('height', windowHeight - navHeight);
        $mobileMenu.slideDown();
    }

    var hideMobileMenu = function() {
        var $body = $('body'),
            $mobileMenu = $('.menu-mobile');

        $body.removeClass('menu--active');
        $mobileMenu.slideUp();
    }

    var initiateMobileMenu = function() {
        // Toggle
        $('body').on('click', '[data-toggle-mobile-menu]', function(e) {
            e.preventDefault();

            var $this = $(this);

            $this.toggleClass('active');

            if($this.hasClass('active')) {
                showMobileMenu();
            }
            else {
                hideMobileMenu();
            }
        });
    }

    var showSearchModal = function() {
        var $body = $('body'),
            $searchContainer = $('.search-container'),
            $searchInput = $searchContainer.find('input');

        $body.addClass('search--active');
        $searchContainer.addClass('search-container--active');

        if($searchInput.length) {
            $searchInput.first().focus();
        }
    }

    var hideSearchModal = function() {
        var $body = $('body'),
            $searchContainer = $('.search-container');

        $body.removeClass('search--active');
        $searchContainer.removeClass('search-container--active');
    }

    var initiateSearchForm = function() {
        // Toggle
        $('body').on('click', '[data-toggle-search-modal]', function(e) {
            e.preventDefault();

            var $this = $(this);

            $this.toggleClass('active');

            if($this.hasClass('active')) {
                showSearchModal();
            }
            else {
                hideSearchModal();
            }
        });

        // Close Search Form
        $('body').on('click', '[data-close-search-modal]', function(e) {
            e.preventDefault();

            hideSearchModal();
        });
    };

    var autoHeightSlick = function() {
        $('.slick-carousel').each(function () {
            var $this = $(this),
                $slickTrack = $this.find('.slick-track'),
                slickTrackHeight = $slickTrack.height(),
                $slickSlide = $this.find('.slick-slide');

            $slickSlide.height('auto').css('height', slickTrackHeight + 'px');
        });
    };

    var initMiniFeaturesSlider = function() {
        var $slider = $('.mini-features__slider');

        $slider.each(function() {
            var $this = $(this),
                $nav = $this.find('.slick__navigation');

            $this.slick({
                slide: '.mini-features__slider__item',
                slidesToShow: 3,
                slidesToScroll: 3,
                arrows: true,
                dots: false,
                appendArrows: $nav,
                appendDots: $nav,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }
                ],
            });
        });
    };

    $(function() {
        // Initialize Material Form
        initializeMaterialForm();

        // Slick Carousel
        var $slick = $('.slick-carousel');
        $slick.each(function() {
            var $this = $(this),
                autoplay = $this.data('autoplay') || false,
                $nav = $this.find('.slick__navigation');

            $this.slick({
                slide: '.slick-carousel__item',
                autoplay: autoplay,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: true,
                appendArrows: $nav,
                appendDots: $nav,
            });
        });

        autoHeightSlick();

        // Mini Features Slider
        initMiniFeaturesSlider();

        // Header
        iniateHeaderDummy();

        // Mobile Menu
        initiateMobileMenu();

        // Search Form
        initiateSearchForm();

        // Affix
        var $header = $('.header');

        if($header.length && $header.data('header-affix')) {
            $header.affix({
                offset: {
                    top: 60,
                    bottom: 200,
                }
            });

            $header.on('affixed.bs.affix', function () {
                var $this = $(this),
                    $preheader = $this.find('.pre-header'),
                    $toBeHidden = $this.find('.hide-on-affix'),
                    delay = 0,
                    speed = 120;

                $this.removeClass('header--white-text');

                if ($preheader.length) {
                    delay += speed;
                    $preheader.slideUp({
                        duration: speed,
                        easing: 'linear',
                    });
                }

                if ($toBeHidden.length) {
                    setTimeout(function() {
                        $toBeHidden.slideUp({
                            duration: speed,
                            easing: 'linear',
                        });
                    }, delay);
                }
            });

            $header.on('affix-top.bs.affix', function () {
                var $this = $(this),
                    $preheader = $this.find('.pre-header'),
                    $toBeDisplayed = $this.find('.hide-on-affix'),
                    delay = 0,
                    speed = 120;

                if ($this.data('white-text')) {
                    $this.addClass('header--white-text');
                }

                if ($preheader.length) {
                    delay += speed;
                    $preheader.slideDown({
                        duration: speed,
                        easing: 'linear',
                    });
                }

                if ($toBeDisplayed.length) {
                    setTimeout(function() {
                        $toBeDisplayed.slideDown({
                            duration: speed,
                            easing: 'linear',
                        });
                    }, delay);
                }
            });

            // First time firing
            $header.affix('checkPosition');
            if($header.hasClass('affix')) {
                $header.trigger('affixed.bs.affix');
            }
            else if($header.hasClass('affix-top')) {
                $header.trigger('affix-top.bs.affix');
            }
        }

        // On window resize
        $(window).on('resize', function() {
            autoHeightSlick();
        });
    });

    $(window).on('load', function() {
        // Masonry
        var $masonryGrid = $('.masonry-grid').masonry({
            columnWidth: '.masonry-grid__sizer',
            itemSelector: '.masonry-grid__item',
            percentPosition: true,
        });

        // layout Masonry after each image loads
        $masonryGrid.imagesLoaded().progress( function() {
            $masonryGrid.masonry('layout');
        });
    });

})(jQuery);
