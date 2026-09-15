jQuery(window).on('load', function () {
    jQuery('.scavanger').each(function(){
        var pos = jQuery(this).data('pos');
    
        if(pos == 'fixed')
        {
            var pos_top = jQuery(this).data('top');
            var pos_left = jQuery(this).data('left');
    
            if(pos_top && pos_left)
            {
                jQuery(this).css({
                    'left': pos_left,
                    'top': pos_top,
                }).removeClass('hide');
            }
        }
        else if(pos == 'random')
        {
            let bodyHeight = parseFloat(jQuery('body').css('height'));
            let bodyWidth = parseFloat(jQuery('body').css('width'));
            let bannerSecHeight = parseFloat(jQuery('#section-banner').css('height'));
            let headerHeight = parseFloat(jQuery('#_header-2-225').css('height'));
            let footerHeight = parseFloat(jQuery('#section-20-225').css('height'));
            var topMin = bannerSecHeight + headerHeight + 20;
            var topMax = bodyHeight - (footerHeight + 30);
            var leftMin = 30;
            var leftMax = bodyWidth - 30;
            var rand_top = Math.floor(Math.random() * (topMax - topMin + 1) + topMin);
            var rand_left = Math.floor(Math.random() * (leftMax - leftMin + 1) + leftMin);
            
            console.log("random top: ", rand_top);
            console.log("random left: ", rand_left);
            if(rand_top && rand_left)
            {
                 jQuery(this).css({
                    'left': rand_left +'px',
                    'top': rand_top +'px',
                }).removeClass('hide');
            }
        }
    });
});

jQuery(document).ready(function(){
    // jQuery('body').on('click', '.scavanger', function(){
    //     //alert('Click event triggered');
    //     var self = jQuery(this);
    //     var post_id = jQuery(this).data('post');
    //     var user_id = jQuery(this).data('user');
    //     var index = jQuery(this).data('index');
    //     var event_name = jQuery(this).data('gamify-event');
    //     jQuery.ajax({
    //         method: "POST",
    //         url: mypl_custom.ajax_url,
    //         data: {                    
    //             'action'    : 'HandleScavangerClick',
    //             'post_id'   : post_id,
    //             'user_id'   : user_id,
    //             'index_id'  : index,
    //             'event_name' : event_name
    //         },
    //         success: function (resp) {
    //             if(resp.success)
    //             {
    //                 jQuery(self).hide().remove();
    //                 startConfetti();
                    
    //                 setTimeout(function(){ 
    //                     stopConfetti(); 
    //                 }, 2000);
    //             }
    //         }
    //     });
    // });
});

