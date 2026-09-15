jQuery( document ).ready( function(){
  let initial_items = 12;
    let next_items = 6;
    jQuery('.cntct-type-tab').first().addClass("active");
    
    jQuery( document ).on( 'click', '#my_profile_page div.oxy-tab', function ( e ) {
        var text = jQuery( this ).text();
        if(text === 'My Contacts') {
            jQuery('.favs-fltr-tabs').find('button[data-name="*"]').trigger("click");
        }
    } );
    /*
    let cntcts_grid = jQuery('#cntcs-container').isotope({
            itemSelector:'.fav-contact',
            masonry: {
                  columnWidth: '.fav-contact'
                }
        });
    jQuery('.favs-fltr-tabs button').on('click', function() {
        let value = jQuery(this).attr('data-name');
        console.log('VALUE: ', value);
        cntcts_grid.isotope({
            filter: value,
        });
        jQuery('.cntct-type-tab').removeClass("active");
        jQuery(this).addClass("active");
    });
    */
    
    
    //CUSTOM TEXTAREA JS
    // Targets all textareas with class "txta"
let textareas = document.querySelectorAll('#contact-notes'),
    hiddenDiv = document.createElement('div'),
    content = null;

// Adds a class to all textareas
for (let j of textareas) {
  j.classList.add('txtstuff');
}

// Build the hidden div's attributes

// The line below is needed if you move the style lines to CSS
// hiddenDiv.classList.add('hiddendiv');

// Add the "txta" styles, which are common to both textarea and hiddendiv
// If you want, you can remove those from CSS and add them via JS
hiddenDiv.classList.add('txta');

// Add the styles for the hidden div
// These can be in the CSS, just remove these three lines and uncomment the CSS
hiddenDiv.style.display = 'none';
hiddenDiv.style.whiteSpace = 'pre-wrap';
hiddenDiv.style.wordWrap = 'break-word';

// Loop through all the textareas and add the event listener
for(let i of textareas) {
  (function(i) {
    // Note: Use 'keyup' instead of 'input'
    // if you want older IE support
    i.addEventListener('input', function() {
      
      // Append hiddendiv to parent of textarea, so the size is correct
      i.parentNode.appendChild(hiddenDiv);
      
      // Remove this if you want the user to be able to resize it in modern browsers
      i.style.resize = 'none';
      
      // This removes scrollbars
      i.style.overflow = 'hidden';

      // Every input/change, grab the content
      content = i.value;

      // Add the same content to the hidden div
      
      // This is for old IE
      content = content.replace(/\n/g, '<br>');
      
      // The <br ..> part is for old IE
      hiddenDiv.innerHTML = content + '<br style="line-height: 3px;">';

      // Briefly make the hidden div block but invisible
      // This is in order to read the height
      hiddenDiv.style.visibility = 'hidden';
      hiddenDiv.style.display = 'block';
      i.style.height = hiddenDiv.offsetHeight + 'px';

      // Make the hidden div display:none again
      hiddenDiv.style.visibility = 'visible';
      hiddenDiv.style.display = 'none';
    });
  })(i);
}    
    //CUSTOM TEXTAREA JS
        let noOfDeletedElements = 0;
        jQuery('.fav-contact .delete_contact').on('click', function(e) {
            e.preventDefault();
            let fav_contact = e.currentTarget;
            let postId = parseInt(jQuery(fav_contact).attr('data-fav-id'));
            deletElement = e.currentTarget;
            Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: 'Deleting Contact...',
                  showConfirmButton: false,
                  allowEscapeKey: false,
                  allowOutsideClick: false,
                  onBeforeOpen: () => {
                      Swal.showLoading()
                  },
              });
                jQuery.ajax( {
                    method: "POST",
                    url: window.origin +'/wp-admin/admin-ajax.php',
                    data: { 'action': 'delete_contact_from_fav', 'del_fav_id': postId},                    
                    success: function ( response ) {
                      Swal.close();
                      let del_cntct_type;
                      //fav_contact.parentElement.parentElement.nextElementSibling.remove();
                      
                      fav_contact.parentElement.parentElement.remove();
                      
                      //cntcts_grid.isotope(isotopeArgs);
                      cntcts_grid.isotope('destroy'); // destroy
                      
                      cntcts_grid.isotope( isotopeArgs ); // re-initialize
                        

                    if(response.success && response.data.del_cntct_type) {
                      del_cntct_type = response.data.term_name;
                      if(del_cntct_type.includes(' ')) {
                        del_cntct_type_arr = del_cntct_type.split(' ');
                        del_cntct_type = del_cntct_type_arr.join('-');
                      }
                      var final_cn = "."+del_cntct_type;
                      jQuery('.favs-fltr-tabs').find('button[data-name="'+final_cn+'"]').remove();
                      jQuery('.favs-fltr-tabs').find('button[data-name="*"]').trigger("click");
                      console.log("before if empty delete");
                      if (jQuery(".fav-contact").children().length == 0) { 
                          console.log("if empty delete");
                        jQuery(".favs-fltr-tabs").remove();
                        jQuery('.csv-contact').hide();
                        jQuery("#shortcode-143-1289").html("<h5>No favourites added :(</h5>");
                        }              
                                    
                        //jQuery(".favs-fltr-tabs").find(`[data-name='.${del_cntct_type}']`).remove();                                          
                    }
                    showMoreContactsLikeBeforeDeletion();
                        //showInitialContactsWhenDeleted();
                        
                        Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: 'Contact has been deleted',
                          showConfirmButton: false,
                          timer: 1500
                        });
                        
                        
                    }
                });
              }
            });
        });
        

        function showMoreContactsLikeBeforeDeletion() {
          let activeContactType = jQuery('.cntct-type-tab.active').data('name');
          let numOfContacts;
          let numbOfHiddenItems;
          let hiddenItems; 
          if(activeContactType !== '*'){
            hiddenItems = jQuery('#cntcs-container '+activeContactType+'.visible_item');
            numbOfHiddenItems = hiddenItems.length;
            numOfContacts = jQuery('#cntcs-container '+activeContactType).length-jQuery('#cntcs-container '+activeContactType+'.visible_item').length;
          } else {
            hiddenItems = jQuery('#cntcs-container .fav-contact.visible_item');
            numbOfHiddenItems = hiddenItems.length;
            numOfContacts = jQuery('#cntcs-container .fav-contact').length-numbOfHiddenItems;
          }
      
      
          jQuery(".cntct-type-tab.active").trigger("click");
            if(numOfContacts>initial_items){                          
              let extraContacts = numOfContacts - initial_items;
              let numOfTimesShowMore = Math.ceil(extraContacts/next_items);
              for(let i=0; i<numOfTimesShowMore; i++){
                jQuery('#showMore').trigger("click");
              }
            }
       }         

function showInitialContactsWhenDeleted() {
  let activeContactType = jQuery('.cntct-type-tab.active').data('name');
  let numOfContacts
  if(activeContactType !== '*'){
    numOfContacts = jQuery('#cntcs-container '+activeContactType).length-jQuery('#cntcs-container '+activeContactType+'.visible_item').length;
  } else {
    numOfContacts = jQuery('#cntcs-container .fav-contact').length-jQuery('#cntcs-container .fav-contact.visible_item').length;
  }
  
  if((numOfContacts < 12) && (jQuery('#showMore').css('display') !== 'none')) {
    if(activeContactType !== '*'){
      next_items = 12 - (jQuery('#cntcs-container '+activeContactType).length-jQuery('#cntcs-container '+activeContactType+'.visible_item').length);  
    } else {
      next_items = 12 - (jQuery('#cntcs-container .fav-contact').length - jQuery('#cntcs-container .fav-contact.visible_item').length);
    }                                                   
    jQuery('#showMore').trigger("click");
    next_items = 6;                          
  }
}
    let contactTypesCount = jQuery('#contact_type').children('option').length;

        
		if(contactTypesCount === 1) {
			jQuery('#contact_type_label').hide();
		}
		jQuery('#contact_type').on('change', function(){
			if(this.value == '') {
				jQuery('.new_contact_type_container').show();
			} else {
				jQuery('.new_contact_type_container').val('');
				jQuery('.new_contact_type_container').hide();
			}
		});
		
		jQuery('#contact_type_form').on('submit', function(e) {
				  e.preventDefault();
          Swal.fire({
            title: 'Saving Contact...',
            showConfirmButton: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            },
        });
          

			let serializedArrdata = jQuery('#contact_type_form').serializeArray();
			let data = {};
			jQuery.each(jQuery(this).serializeArray(), function(_, kv) {
  				data[kv.name] = kv.value;
			});
      
				  //let data = jQuery('#contact_type_form').serializeArray();
          
					jQuery.ajax( {
                        method: "POST",
                        url: window.origin +'/wp-admin/admin-ajax.php',
                        data: { 'action': 'add_fav_contact',data :data  },
                        
                        success: function ( response ) {
                          Swal.close();
                   if(response.success) {
                     console.log('success response');
                      let fav_id = response.data.fav_cntct_id;
                      //starEle.attr('class', 'star_' + auth_id + '_' + term_id);
                      starEle.find('.star-svg').attr('fill', 'var(--primary)');
                      starEle.attr('data-fav-id', `${fav_id}`);
                      let starCont = jQuery(starEle.parent()[0]).parent()[0];
                      let	iconLabelHolder = jQuery(starCont).find('.author_icon_label')
                      jQuery(iconLabelHolder).text('Favorited');
                      jQuery('.contact_type_popup .close_ct_popup').trigger('click');
                      Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Added to your favorite contacts',
                        showConfirmButton: false,
                        timer: 1500
                      });
                   }

                        },
						error: function(XMLHttpRequest, textStatus, errorThrown) {
              Swal.close();
              jQuery('.contact_type_popup .close_ct_popup').trigger('click');
                if(XMLHttpRequest.status===400){
                  jQuery('.contact_type_popup .close_ct_popup').trigger('click');
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: XMLHttpRequest.responseJSON.data.message
                  });
                } else if(XMLHttpRequest.status===401){
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Unauthorized call'
                  });
                }
							 console.log(errorThrown);
						  }
               	} );	
                 
		});

    jQuery('.favorite_cont_icon #star').on('click', function(event) {	
      let curTargId = event.currentTarget.getAttribute('data-fav-id');
      fav_icon_click(curTargId);

  });
  function fav_icon_click(curTargId) {
    if(curTargId !== ''){ 	
        setTimeout(function(){
          jQuery('.contact_type_popup').hide();
          jQuery('.contact_type_popup .close_ct_popup').trigger('click');
          jQuery('.confirm_del_contact_auth').show();
        });
        
      Swal.fire({
      title: 'Are you sure you want to remove this contact from favourites?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleting Contact!',
          showConfirmButton: false,
          allowEscapeKey: false,
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading()
          },
        });  
        jQuery.ajax( {
          method: "POST",
          url: window.origin + '/wp-admin/admin-ajax.php',
          data: { 'action': 'delete_contact_from_fav', 'del_fav_id': curTargId},                    
          success: function ( response ) {
            let del_cntct_type;
            Swal.close();
            if(response.success && response.data.del_cntct_type) {
              del_cntct_type = response.data.term_name;
              if(del_cntct_type !== 'default'){
                jQuery("#contact_type option[value='" + del_cntct_type + "']").remove();	
              }
                            
            }
            starEle.attr('data-fav-id', '');
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Removed From Your Favorites List',
              showConfirmButton: false,
              timer: 1500
              });
              starEle.find('.star-svg').attr('fill', '');
              let starCont = jQuery(starEle.parent()[0]).parent()[0];
              let	iconLabelHolder = jQuery(starCont).find('.author_icon_label')
              jQuery(iconLabelHolder).text('Favorite');
              if(jQuery('#contact_type option').length === 1) {
                jQuery('#contact_type_label').hide();
                jQuery('#new_contact_type').show();
              }
          }
        });
      }
      })				
      } else {
        setTimeout(function(){
          
          jQuery('.contact_type_popup').show();
          
          if(jQuery('#contact_type').val() === '') {
            jQuery('.new_contact_type_container').show();
          } else {
            jQuery('#contact_type').val('');
          }
        });
      }
  }

//add tooltip to contacts
  jQuery('.fav-contact').each(function(){
    //console.log(this)
    var elem = jQuery(this).find('.cntcts_tool_tip_container');
    tippy(this, {
        size: 'large',
        duration: 200,
        animation: 'scale',
        placement: 'top',
        interactive: true,
        theme: 'google',
        allowHTML: true,
        content: jQuery(elem).clone().html()
    });
});
    

    //isotope and show more
     
    var isotopeArgs = {
      itemSelector: '.fav-contact',
      layoutMode: 'masonry',
      stamp: '.fav-contact--static'
  };
    var cntcts_grid = jQuery('#cntcs-container').isotope(isotopeArgs);
  
 /*
 var elem = document.querySelector('#cntcs-container');
 var cntcts_grid = new Isotope( elem, {
  // options
  itemSelector: '.fav-contact',
  layoutMode: 'masonry',
  stamp: '.fav-contact--static'
});
  */
  // bind filter button click
  jQuery('.favs-fltr-tabs').on('click', 'button', function () {
      var filterValue = jQuery(this).attr('data-name');
      // use filterFn if matches value
      cntcts_grid.isotope({filter: filterValue});
      updateFilterCounts();
      jQuery('.cntct-type-tab').removeClass("active");
      jQuery(this).addClass("active");
      //show 12 contacts in each group with showMore btn if there are more
      showInitialContactsWhenDeleted();
  });
    function hideItems(pagination) {
      var itemsMax = jQuery('.fav-contact').length;
      var itemsCount = 0;
      jQuery('.fav-contact').each(function () {
          if (itemsCount >= pagination) {
              jQuery(this).addClass('visible_item');
          }
          itemsCount++;
      });
      if (itemsCount < itemsMax || initial_items >= itemsMax) {
          jQuery('#showMore').hide();
      }
      cntcts_grid.isotope('layout');
  }

  function showNextItems(pagination) {
    var itemsMax = jQuery('.visible_item').length;
    var itemsCount = 0;
    jQuery('.visible_item').each(function () {
      if (itemsCount < pagination) {
            jQuery(this).removeClass('visible_item');
            itemsCount++;
        }
    });
    if(itemsCount >= itemsMax) {
        jQuery('#showMore').hide();
    }
    cntcts_grid.isotope('layout');
  }

  jQuery('#showMore').on('click', function(e) {
      e.preventDefault();
      showNextItems(next_items);
  });
  hideItems(initial_items);
  
  function updateFilterCounts() {
    // get filtered item elements
    var itemElems = cntcts_grid.isotope('getFilteredItemElements');
    var count_items = jQuery(itemElems).length;
   
    if (count_items > initial_items) {
        jQuery('#showMore').show();
    }
    else {
        jQuery('#showMore').hide();
    }
    if (jQuery('.fav-contact').hasClass('visible_item')) {
        jQuery('.fav-contact').removeClass('visible_item');
    }
    var index = 0;

    jQuery(itemElems).each(function () {
        if (index >= initial_items) {
            jQuery(this).addClass('visible_item');
        }
        index++;
    });
    cntcts_grid.isotope('layout');
  }

  let dont_show_me_in_attendees_field = acf.getField('field_61fd44af985a8');
  let dont_add_me_as_favorite_field = acf.getField('field_61fbb23c530d7');
  dont_show_me_in_attendees_field.on('change', function() {    
    if(dont_show_me_in_attendees_field.val() === 1) {
      dont_add_me_as_favorite_field.switchOn();
    } else {
      dont_add_me_as_favorite_field.switchOff();
    }
  });
  dont_add_me_as_favorite_field.on('change', function() {
    if((dont_show_me_in_attendees_field.val() === 1) && (dont_add_me_as_favorite_field.val() === 0)) {
      dont_add_me_as_favorite_field.switchOn();
    } 
  });
  

  //hide "Don't Show Me In Attendees" and "Don't add me as favorite" if the feature disabled
  if(window.location.href === window.origin + '/my-profile/#my_profile'){
    jQuery.ajax( {
      method: 'GET',
      url: window.origin +'/wp-admin/admin-ajax.php',
      data: { 'action': 'fav_contacts_enabled'  },
      
      success: function ( response ) {
        let fav_cntc_enabled = response.data.fav_cntc_enabled;
        if(!fav_cntc_enabled){              
          dont_show_me_in_attendees_field.hide();
          dont_add_me_as_favorite_field.hide();
        }
      }
    });
  }

  jQuery('.csv-contact').on('click', function(e) {
    e.preventDefault();
    jQuery(this).hide();
    jQuery(".email_sent_div").css("display", "none");
    jQuery("#ajax_loader_gif").show();
    jQuery.ajax( {
      method: "POST",
      url: window.origin +'/wp-admin/admin-ajax.php',
      data: { 'action': 'return_contacts_as_csv'},                    
      success: function ( response ) {
        jQuery("#ajax_loader_gif").hide();
        jQuery(".csv-contact").show();
        jQuery(".email_sent_div").css("display", "block");
        var respData = response.data;
        var downloadEnabled = respData['enable_download'];
        var csvData = respData['csv_cntcs_arr'];
        if(downloadEnabled && Array.isArray(csvData)){
          downloadCSVFile(csvData);
        }
                
      }
    });
    
  });

  function downloadCSVFile(dataArr) {
    var csvContent = "data:text/csv;charset=utf-8," 
          + dataArr.map(e => e.join(',')).join("\n");
          var encodedUri = encodeURI(csvContent);
          var link = document.createElement("a");
          link.setAttribute("href", encodedUri);
          link.setAttribute("download", "my_contacts.csv");
          document.body.appendChild(link);
          link.click();
          link.remove();
  }

  //notes js
  let notesContainer;
  let savedContactNotesEle;
  jQuery('body').on('click','#edit-notes', function(e) {
          e.preventDefault();

          let thisClass = jQuery(this).attr('class');
          let thisNotesId = (thisClass.split(' ')[2]).split('-')[1];
          savedContactNotesEle = jQuery(this).parent().siblings('.saved-cntct-notes');
          notesContainer = jQuery(this).parent().parent();
          let editBtn = jQuery(this); 
          jQuery(editBtn).hide();
          jQuery(savedContactNotesEle).hide();					
          jQuery(notesContainer).find('#contact_note_form').show();

          jQuery('body').on('mouseout', '.fav-contact', function() {
            jQuery(editBtn).show();
            jQuery(savedContactNotesEle).show();					
            jQuery(notesContainer).find('#contact_note_form').hide();
          })
        });

        jQuery('body').on('submit', '.notes-container #contact_note_form', function(e) {
            e.preventDefault();
            let serializedArrdata = jQuery(this).serializeArray();
            let data = {};
            jQuery.each(jQuery(this).serializeArray(), function(_, kv) {
              data[kv.name] = kv.value;
            });
            let thisNoteForm = jQuery(this);

            Swal.fire({
              title: 'Saving Notes...',
              showConfirmButton: false,
              allowEscapeKey: false,
              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading()
              },
            });
            jQuery.ajax( {
              method: "POST",
              url: window.origin +'/wp-admin/admin-ajax.php',
              data: { 'action': 'save_contact_notes', data :data  },
              
              success: function ( response ) {
                Swal.close();
                if(response.success) {
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Notes Updated',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  let updatedContent = response.data.contact_notes;
                  jQuery(notesContainer).find('#contact_note_form').hide();
                  jQuery(notesContainer).find('#edit-notes').show();
                  jQuery(savedContactNotesEle).show();
                  jQuery(savedContactNotesEle).html(updatedContent);
                }	
              },
              error: function(XMLHttpRequest, textStatus, errorThrown) {
                  Swal.close();
                  if(XMLHttpRequest.status===400){
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: XMLHttpRequest.responseJSON.data.message
                    });
                  }	
              }
          });
        });

        
});