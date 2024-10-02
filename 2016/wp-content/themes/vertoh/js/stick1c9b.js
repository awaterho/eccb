/**
 * stick date titles to top
 * @param stickies
 */
function stickyTitles(stickies) {
    var self = this,
            isLoaded = false;

    this.load = function() {
        stickies.each(function() {
            var thisSticky = jQuery(this);
            if (!self.isLoaded) {
                thisSticky.wrap('<div class="followWrap" />');
                thisSticky.parent().height(thisSticky.outerHeight());
            }

            jQuery.data(thisSticky[0], 'pos', thisSticky.offset().top);
        });

        self.isLoaded = true;
    };

    this.scroll = function() {
        var offsetTop = (parseInt(jQuery(document.body).css('padding-top')) || 0) + 55, // 33px allocated by nav-tabs
                isFloating = false;

        stickies.each(function(i) {

            var thisSticky = jQuery(this),
                    pos = thisSticky.hasClass('fixed')
                    ? jQuery.data(thisSticky[0], 'pos')
                    : thisSticky.offset().top;

            jQuery.data(thisSticky[0], 'pos', pos);
            pos -= offsetTop;

            if (pos <= jQuery(window).scrollTop()) {
                if (!thisSticky.hasClass('fixed')) {
                    $('.schedule-heading .dropdown').removeClass('open');
                }
                thisSticky.addClass("fixed container");

            } else {
                if (thisSticky.hasClass('fixed')) {
                    $('.schedule-heading .dropdown').removeClass('open');
                }
                thisSticky.removeClass("fixed container");
            }

            // Remove the fixed class if the sedction is no longer in the viewport
            // This + 220 is because of the paddings and margins that form empty space.

            if ($('.sticked .end-div').offset().top < (jQuery(window).scrollTop() + 220)) {
                thisSticky.removeClass("fixed container");
            }

        });

        if (isFloating) {
            jQuery('.schedule').addClass('floating');
        }
        else {
            jQuery('.schedule').removeClass('floating');

        }
    }
}

// expand menu on click
jQuery('.schedule > ul li a').click(function(event) {
    event.preventDefault();
    jQuery(this).toggleClass('expand');
});


function loadStickyTitles() {
    var newStickies = new stickyTitles(jQuery(".day-floating"));
    newStickies.load();

    jQuery(window).on("resize", newStickies.load);
    jQuery(window).on("scroll", newStickies.scroll);
}

jQuery(document).ready(function() {
    loadStickyTitles();
});
