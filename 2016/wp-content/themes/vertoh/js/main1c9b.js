$(document).ready(function () {
    $(".royalSlider").royalSlider({
        controlNavigation: 'thumbnails',
        thumbs: {
            // thumbnails options go gere
            arrowsAutoHide: true,
            appendSpan: true,
            spacing: 30
        },
        video: {
            autoHideControlNav: true,
            autoHideBlocks: true
        }

        // visibleNearby: {
        // 	enabled: true,
        // 	centerArea: 0.8,
        // 	center: true,
        // 	breakpoint: 650,
        // 	breakpointCenterArea: 0.64,
        // 	navigateByCenterClick: true
        // }
    });

    // The header logic.
    // -----------------------------------------------------

    // When the header will shrink:
    if ($('body').hasClass('home')) {
        var shrinkHeader = 300;
    } else {
        var shrinkHeader = 100;
    }
    if ($('.header-sticked').hasClass('no-scroll'))
        var shrinkHeader = 30;

    if ($('header.header').hasClass("secound")) {
        shrinkHeader = $('.site-slider').height();
        if (shrinkHeader <= 60) {
            shrinkHeader = 100;
        }
    }

    $('.flip-container .front').each(function () {
        var width = $(this).parent().width();
        $(this).width(width);

        $(this).css('position', 'absolute');
    });

    $('.flip-container .back').each(function () {
        var width = $(this).parent().width();
        $(this).width(width - 80);

        $(this).css('position', 'absolute');
    });


    var v2 = $('.header-sticked').hasClass("v2");
    $('.header-sticked .menu-handler').data('prev-color', $('.header-sticked .menu-handler').css('color'));
    $(window).scroll(function () {
        var scroll = getCurrentScroll();
        if (scroll >= shrinkHeader) {
            $('.header-sticked').addClass('shrink');
            if (!v2)
                $('.header-sticked').addClass('v2');
            //$('.header-sticked .menu-handler').removeAttr('style');
            $('.header-sticked .menu-handler').css('color', '');
        }
        else {
            $('.header-sticked').removeClass('shrink');
            if (!v2)
                $('.header-sticked').removeClass('v2');
            // $('.header-sticked .menu-handler').attr('style', 'color:' + $('.header-sticked .menu-handler').data('prev-color') + ';');
            $('.header-sticked .menu-handler').css('color', $('.header-sticked .menu-handler').data('prev-color'));
        }

        if (jQuery('.countdown').length) {
            if (elementIsOnScreen(jQuery('.countdown'))) {
                jQuery('.countdown').TimeCircles().start();
            } else {
                jQuery('.countdown').TimeCircles().stop();
            }
        }
    });


    // Slide left for showing the menu.
    $('.menu-handler').click(function () {
        $('nav.nav-wrapper').animate({left: 0}, 300);
        $('.menu-handler').css('visibility', 'hidden');
    });

    // Slide left for showing the menu.
    $('.close-menu').click(function () {
        $('nav.nav-wrapper').animate({left: -280}, 300);
        $('.menu-handler').css('visibility', 'visible');
    });

    $('.nav-wrapper ul li.menu-item-has-children').click(function () {
        submenu = jQuery(this).find('ul').first();
        if (submenu.is(':hidden')) {
            submenu.show();
            jQuery(this).addClass('expanded');
        } else {
            submenu.hide();
            jQuery(this).removeClass('expanded');
        }
    });

    $('.nav-wrapper ul li a').click(function (e) {
        e.stopImmediatePropagation();
    });

    $('.nav-wrapper ul li i.fa-chevron-down').click(function (e) {
        e.preventDefault();
        submenu = jQuery(this).next('ul');
        if (submenu.is(':hidden')) {
            jQuery(this).parent().addClass('expanded');
            submenu.show();
        } else {
            jQuery(this).parent().removeClass('expanded');
            submenu.hide();
        }
        return false;
    });

    // Add sticky elements.
    $('.has-sticky').stickem();
    $('.big-sponsors .has-sticky').stickem({
        offset: 70
    });

    $('.page-template-speakers-php .speaker-about, .home .speaker-about').each(function (i, el) {
        if ($(this).html() == '')
            $(this).parent().find('.read-more-link').show();
    });

    var cities = $(".carousel-cities");
    cities.owlCarousel({
        items: 6,
        itemsMobile: 2,
        navigation: false,
        navigationText: ["<i class='left fa fa-chevron-left'></i>", "<i class='right fa fa-chevron-right'></i>"],
        pagination: false,
        transitionStyle: 'fade',
        afterAction: function () {
            refreshMapTextFit();
        }
    });

    $("#pagination-carousel").owlCarousel({
        itemsMobile: [479, 3],
        itemsTablet: [768, 5]
    });


    // Custom JS actions for the site:
    // -----------------------------------------------------
    // 


    $('.carousel-cities .city').click(function () {
        if (!$(this).hasClass('active')) {
            $('.carousel-cities .owl-item .city').removeClass('active');
            $(this).addClass('active');
        }
    });

    $('#carousel-gallery-player .item').click(function () {
        if (!$(this).hasClass('active')) {
            $('#carousel-gallery-player .owl-item .item').removeClass('active');
            $(this).addClass('active');
        }
    });

    // Create the countdown timer.
    $(".countdown").TimeCircles({
        "animation": "smooth",
        "bg_width": 0.9,
        "fg_width": 0.01,
        "circle_bg_color": vertoh_timer_colors.color,
        "time": {
            "Days": {
                "text": vertoh_timer_labels.days,
                "color": "#CCCCCC",
                "show": true
            },
            "Hours": {
                "text": vertoh_timer_labels.hours,
                "color": "#CCCCCC",
                "show": true
            },
            "Minutes": {
                "text": vertoh_timer_labels.minutes,
                "color": "#CCCCCC",
                "show": true
            },
            "Seconds": {
                "text": vertoh_timer_labels.seconds,
                "color": "#CCCCCC",
                "show": true
            }
        }
    });

    //sponsorsHeight($('.flipper'));
    mapSwapCarousel();
    abso();
    refreshExhibitorsTextFit();

    $(window).resize(function () {
        abso();
        //sponsorsHeight($('.flipper'));
        mapSwapCarousel();
        $(".countdown").TimeCircles().rebuild();
        refreshMapTextFit();
        refreshExhibitorsTextFit();
    });

    // Dynamicly change the images listed in sessions windows
    // in the homepage carousel.
    $('.sessions-images').each(function () {
        manyImages($(this));
    });

    $('.speakers').each(function () {
        manyImages($(this));
    });

    $('.schedule-single .images').each(function () {
        manyImages($(this), 1);
    });

    // Fix schedule dropdown issue
    $('.schedule .dropdown-toggle').on('click', function () {
        if ($('li.dropdown').hasClass('open')) {
            // the fix goes here
        }
    });

    $('a > img').each(function () {
        // Which images will have the overlay
        link = $(this).parent().attr('href');

        if (!$(this).closest('.no-overlay').length && !$(this).closest('.entry-content').length && !$(this).closest('.entry').length) {
            $(this).wrap('<div class="tint"></div>');
        }

        if ($(this).hasClass('session-image')) {
            $(this).before('<a href="' + link + '" class="sessions-icon fa-stack fa-lg pull-right">' +
                    '<i class="fa fa-circle-thin fa-stack-2x"></i>' +
                    '<i class="fa fa-plus fa-stack-1x"></i>' +
                    '</a>');
        }
    });

    $('a.jump-link, .back-to-top-icon').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    $('.social-links .icons > a').each(function () {
        $(this).children().before($(this).html()).addClass('bottom');
    });

    // Media icons
    jQuery('#tile_media .rsThumbsContainer .rsThumb').each(function (i, el) {
        url = jQuery(el).find('img').first().attr('src');
        if (url) {
            if (url.match(/youtu\.be/i) || url.match(/youtube\.com/i) || url.match(/vimeo\.com/i) || url.match(/vimeocdn\.com/i)) {
                jQuery(el).addClass('class-video');
            } else {
                jQuery(el).addClass('class-img');
            }
        }
    });

    // swipe on carousels
    jQuery('.carousel:not(#maps-slider)').swipe({
        swipeLeft: function (event, direction, distance, duration, fingerCount) {
            jQuery(document).scrollTop(jQuery(this).offset().top);
            jQuery(this).carousel('next');
        },
        swipeRight: function () {
            jQuery(document).scrollTop(jQuery(this).offset().top);
            if (jQuery(this).find('.carousel-indicators .active').index() > 0) {
                jQuery(this).carousel('prev');
            } else {
                jQuery(this).carousel(jQuery(this).find('.carousel-indicators [data-slide-to]').last().index());
            }
        },
        threshold: 100
    });

    //open current menu item
    var activeMenuItem = jQuery('.main-navigation .current-menu-item');
    if (activeMenuItem.length) {
        parent = activeMenuItem.parent();
        if (parent.length && jQuery(parent).hasClass('sub-menu')) {
            parent.parent().find('.fa-chevron-down').first().trigger('click');
        }
    }

    jQuery('iframe[src="about:blank"]').hide();

    var scrollDownArrow = jQuery('.site-slider .jump-link');
    if (scrollDownArrow.length && scrollDownArrow.attr('href') === '') {
        scrollDownArrow.attr('href', '#' + jQuery('section[id]:first').attr('id') + '_anchor');
    }

    jQuery('.contacts form').submit(function () {
        var hasError = false;
        jQuery('.input-group', this).removeClass('error');
        if (!hasError) {
            jQuery('.contacts .alert, .contacts .info').remove();
            jQuery.ajax({
                url: ajaxurl,
                data: jQuery(this).serialize(),
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    if (data.sent === true)
                        jQuery('.contacts form').slideUp("fast", function () {
                            jQuery('.contacts form').before('<p class="info">' + data.message + '</p>');
                        });
                    else {
                        if (data.errorField != '')
                            jQuery('[name=' + data.errorField + ']').closest('.input-group').addClass('error');
                    }
                },
                error: function (data) {
                    jQuery('.contacts form').before('<p class="alert">' + data.message + '</p>');
                }
            });
        }
        return false;
    });

    if (jQuery('#main-slider .carousel-inner .item').length <= 1) {
        jQuery('#main-slider .owl-buttons').hide();
    } else {
        jQuery('#main-slider .owl-buttons').show();
    }

    if (jQuery('#maps-slider .carousel-inner:first .item').length <= 1) {
        jQuery('#maps-slider .carousel-control').hide();
    } else {
        jQuery('#maps-slider .carousel-control').show();
    }

    $('nav.navbar li:has(.sub-menu)').prepend('<span class="menu-item__submenu-icon"></span>')

    $('.menu-item__submenu-icon').each(function () {
        new SubMenu($(this));
    });
    $('.pbs').remove();
});

function parallax() {
    var scrolled = $(window).scrollTop();
    $('.bg').css('top', -(scrolled * 0.2) + 'px');
}

function getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

function abso() {
    $('.fullscreen .section-content .owl-wrapper-outer img').css({
        width: $(window).width(),
        height: $(window).height()
    });
}

function manyImages($e, sub) {
    if (typeof sub === 'undefined')
        sub = 0;
    // console.log(sub);

    // Get the number of images in each session.
    var imagesCount = ($e.children().length) - sub; // This is the last link

    // When there are more then 2, the styles will be diferent.
    if (imagesCount > 2) {
        $e.addClass('many-images');
    }

    // console.log($e.html() + " - found: " + imagesCount);
}

// Video slider
var headerVideo = document.getElementById('header-video');

function videoPlay() {
    headerVideo.play();
}

function videoPause() {
    headerVideo.pause();
}

function sponsorsHeight($sponsorImageClass) {
    var i = 0;

    // $sponsorImageClass - The class of the hodlers. usually ".flipper"
    $sponsorImageClass.each(function () {
        var frontHeight = $(this).find('.front img').height();
        var frontWidth = $(this).find('.front img').width();
        $(this).outerHeight(frontHeight);
        $(this).find('.back').outerHeight(frontHeight);
        $(this).find('.back').outerWidth(frontWidth);
    });
}

function mapSwapCarousel() {
    var viewportWidth = $(window).width();
    if (viewportWidth < 500) {
        $('.swap-cities-map').before($('.swap-cities-list'));
    } else {
        $('.swap-cities-map').after($('.swap-cities-list'));
    }
}

function refreshMapTextFit() {
    textFit(jQuery('#maps-slider .carousel-cities .owl-item .city a'), {alignHoriz: true, alignVert: true, maxFontSize: 18, suppressErrors: true});
}

function refreshExhibitorsTextFit() {
    textFit(jQuery('.exhibitors-wrapper .exhibitor-name'), {alignHoriz: false, alignVert: true, maxFontSize: 24, suppressErrors: false});
    textFit(jQuery('.exhibitors-wrapper .exhibitor-about'), {alignHoriz: false, alignVert: true, maxFontSize: 16, suppressErrors: false});
}

function elementIsOnScreen(element) {
    var viewport = {};
    viewport.top = jQuery(window).scrollTop();
    viewport.bottom = viewport.top + jQuery(window).height();
    var bounds = {};
    bounds.top = element.offset().top;
    bounds.bottom = bounds.top + element.outerHeight();
    return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
}

var SubMenu = function (obj) {

    //private properties
    var _obj = obj;

    //private methods

    var _addEvents = function () {

        _obj.on({
            click: function () {
                var curItem = $(this),
                        parent = curItem.parent('li');

                if (parent.hasClass('opened')) {
                    parent.removeClass('opened');
                } else {
                    parent.addClass('opened');
                }

                return false;
            }
        });

    },
            _init = function () {
                _addEvents();
            };

    //public properties

    //public methods

    _init();
};
