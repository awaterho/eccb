/**
 * --------------------------------------------------------------------
 * jQuery customInput plugin
 * Author: Maggie Costello Wachs maggie@filamentgroup.com, Scott Jehl, scott@filamentgroup.com
 * Copyright (c) 2009 Filament Group 
 * licensed under MIT (filamentgroup.com/examples/mit-license.txt)
 * --------------------------------------------------------------------
 */
jQuery.fn.customInput = function(){
	var $ = jQuery;
	return $(this).each(function(){	
		if($(this).is('[type="checkbox"],[type="radio"]')){
			var input = $(this);

			// get the associated label using the input's id
            if( $('label[for='+input.attr('id')+']').length > 0 ) {
                //var label  = $('label[for='+input.attr('id')+']');
                var label = $(this).parent().find('label[for='+input.attr('id')+']'); // allow 2 forms with the same id on the page
                // wrap the input + label in a div
                input.add(label).wrapAll('<div class="custom-'+ input.attr('type') +'"></div>');
            }
            else {
                // ContactForm7 plugin
                var label = input.parents('.wpcf7-list-item, label');
                // wrap the input + label in a span
                input.add(label).wrapAll('<span class="custom-'+ input.attr('type') +'"></span>');

				if($('.wpcf7-form').length){
					label = label.find('.wpcf7-list-item-label');
				}
				else if($('.mc4wp-form').length) {
					label = label.find('span').parent('label');
				}

                jQuery(label).on('click', function() {
                    input.trigger('click');
                    if( input.attr('type') == 'radio' ) {
                        input.parents('.wpcf7-form-control').find('.wpcf7-list-item-label').removeClass('checked checkedHover checkedFocus');
                        input.parents('.custom-radio').siblings('.custom-radio').find('label').removeClass('checked checkedHover checkedFocus');
                    }
                    input.is(':checked') ? label.addClass('checked') : label.removeClass('checked checkedHover checkedFocus');
                });
            }

            // wrap the input + label in a div (was included in if)
            //input.add(label).wrapAll('<div class="custom-'+ input.attr('type') +'"></div>');

			// necessary for browsers that don't support the :hover pseudo class on labels
			label.hover(
				function(){ $(this).addClass('hover');},
				function(){ $(this).removeClass('hover');}
			);

			//bind custom event, trigger it, bind click,focus,blur events					
			input.bind('updateState', function(){
				input.is(':checked') ? label.addClass('checked') : label.removeClass('checked checkedHover checkedFocus');
			})
			.trigger('updateState')
			.click(function(){
				var notInputRadio = ".give-donation-levels-wrap .custom-radio input";
				$('input[name="'+ $(this).attr('name') +'"]:not('+notInputRadio+')').trigger('updateState');

				// Add & remove checked class for custom radio on give plugin for donation level
				if($('.give-donation-levels-wrap').length){
					$(this).parents('.give-donation-levels-wrap').find('.custom-radio label').removeClass('checked');
					$(this).parents('.give-donation-levels-wrap').find($(this)).next('label').addClass('checked');
				}
			})
			.focus(function(){
				label.addClass('focus');
				if(input.is(':checked')){  $(this).addClass('checkedFocus'); }
			})
			.blur(function(){ label.removeClass('focus checkedFocus'); });
		}
	});
};