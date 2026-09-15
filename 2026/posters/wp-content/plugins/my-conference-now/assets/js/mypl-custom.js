var my_sessions = [];

//make today's tablink active on load
jQuery(document).ready(function () {
  //my profile accessibility points
  // Function to add aria-labels to .mce-ico elements
  function addAriaLabels() {
    jQuery('.mce-ico').each(function () {
      const parentButton = jQuery(this).closest('button');
      if (parentButton.length && !parentButton.attr('aria-label')) {
        let label = '';

        if (jQuery(this).hasClass('mce-i-bold')) {
          label = 'Bold text';
        } else if (jQuery(this).hasClass('mce-i-italic')) {
          label = 'Italic text';
        } // Add more cases for other icons if necessary

        if (label) {
          parentButton.attr('aria-label', label);
        } else {
          parentButton.attr('title', 'Editor control');
        }

        // Ensure the role attribute is appropriate
        if (parentButton.attr('role') === 'presentation') {
          parentButton.removeAttr('role');
        }
      }
    });

    jQuery('.mce-txt').each(function () {
      const parentButton = jQuery(this).closest('button');
      if (parentButton.attr('role') === 'presentation') {
        parentButton.removeAttr('role');
      }
    });
  }

  // Run the function initially
  addAriaLabels();

  // Create a MutationObserver to watch for changes in the DOM
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes.length) {
        addAriaLabels();
      }
    });
  });

  // Start observing the document body for added nodes
  observer.observe(document.body, { childList: true, subtree: true });

  if (
    window.location.search.includes('?ac_bundle') &&
    window.location.href.includes('/registration')
  ) {
    jQuery('#choice_3_59_1, #choice_3_59_2, #choice_3_59_3').attr(
      'disabled',
      'disabled'
    );
  }
  // gform
  jQuery(document).on(
    'gform_post_render',
    function (event, form_id, current_page) {
      if (form_id === 3) {
        if (jQuery('#gform_3_validation_container').length > 0) {
          jQuery('#gform_3_validation_container').focus();
          console.log('Focus set');
        }
        if (window.stock_quantity >= 46) {
          jQuery('#choice_3_20_1').attr('disabled', 'disabled');
        }
      }
    }
  );

  var todayDate = moment().format('YYYY_MM_DD');
  jQuery('button.tablinks').each(function () {
    if (jQuery(this).data('tab-href') == todayDate) {
      jQuery('button.tablinks').removeClass('active');
      jQuery(this).addClass('active');
      jQuery(this).removeAttr('tabindex');
    }
  });

  jQuery('#updateuser').on('click', function (e) {
    var selectedOption = jQuery('#acf-field_615f24b34dbe7')
      .find(':selected')
      .val();
    if (selectedOption) {
      jQuery.ajax({
        url: mypl_custom.ajax_url,
        type: 'POST',
        data: {
          action: 'acf_onlineonsite_save_field',
          value: selectedOption,
        },
        success: function (response) {
          console.log(response);
        },
      });
    }
  });

  jQuery(document).ready(function () {
    if (
      !jQuery('.wpua-edit-container') ||
      !jQuery('.mp_grp_personal-details.mp_grp')
    ) {
      return false;
    }
    jQuery('.wpua-edit-container').insertBefore(
      '.mp_grp_personal-details.mp_grp'
    );
  });
});

jQuery(document).ready(function () {
  var querystring = 'pmPreviewMode=1';
  jQuery('a').on('click', function () {
    jQuery(this).each(function () {
      var href = jQuery(this).attr('href');
      if (window.location.href.includes(querystring)) {
        href += (href.match(/\?/) ? '&' : '?') + querystring;
        jQuery(this).attr('href', href);
      }
    });
  });

  document.addEventListener('click', function (event) {
    const clickedElement = event.target;
    if (!clickedElement || clickedElement.tagName.toLowerCase() !== 'a') return;
    const href = clickedElement.getAttribute('href');
    if (href && (href.startsWith('#') || href.startsWith('/#'))) {
      const targetElementId = href.startsWith('/#')
        ? href.slice(2)
        : href.slice(1);
      const targetElement = document.getElementById(targetElementId);
      if (targetElement) {
        window.location.hash = `#${targetElementId}`;
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  var form = document.getElementById('resource_form');
  let export_type = 'csv';

  if (form) {
    form.addEventListener(
      'change',
      function (e) {
        if (e.target !== e.currentTarget) {
          var btn = document.querySelector('.pm_download_all_resources');
          btn.disabled = false;
          resourceTypes(e.target.value);
        }
      },
      false
    );
  }

  function resourceTypes(type) {
    switch (type) {
      case 'csv':
        export_type = 'csv';
        break;

      case 'pdf':
        export_type = 'pdf';
        break;
    }
  }

  jQuery('#resource_form').on('submit', function (e) {
    e.preventDefault();
    let inputBtn = jQuery('.pm_download_all_resources');
    jQuery('.pm_download_all_resources').replaceWith(
      "<img id='ajax_loader_gif' src='/wp-content/uploads/2022/11/spinnergif.gif' width=60 height=60 />"
    );
    jQuery('#ajax_loader_gif').show();
    jQuery.ajax({
      url: mypl_custom.ajax_url,
      type: 'POST',
      data: {
        export_type: export_type,
        action: 'create_resource_download_link',
      },
      success: function (response) {
        if (response) {
          jQuery('#ajax_loader_gif').replaceWith(inputBtn);
          jQuery('#email_sent').css('display', 'block');
        }
      },
    });
  });

  jQuery('#user_sel_timezone').selectize({
    sortField: 'text',
    closeAfterSelect: true,
  });

  // jQuery('#update_timezone').on('submit', function(e) {
  //     e.preventDefault();
  //     var serializedArrdata = jQuery(this).serializeArray();
  //     var data = {};
  //     jQuery.each(serializedArrdata, function(_, kv) {
  //           data[kv.name] = kv.value;
  //     });

  //     let user_sel_timezone = data['user_sel_timezone'];
  //     if(user_sel_timezone != ''){
  //         jQuery.ajax({
  //             url: mypl_custom.ajax_url,
  //             type: 'POST',
  //             data: {
  //                 action: 'update_users_schedule_tz_field',
  //                 timezone: user_sel_timezone
  //             },
  //             beforeSend: function()
  //             {
  //                jQuery('.tz-frm-message').html("please wait<span class='tz_loader__dot'>.</span><span class='tz_loader__dot'>.</span><span class='tz_loader_dot'>.</span>");
  //             },
  //             success: function(data) {
  //                 location.reload();
  //             }
  //         });
  //     }
  // });

  jQuery('body').on('click', '.scavanger', function () {
    //alert('Click event triggered');
    var self = jQuery(this);
    var post_id = jQuery(this).data('post');
    var user_id = jQuery(this).data('user');
    var index = jQuery(this).data('index');
    var event_name = jQuery(this).data('gamify-event');
    jQuery.ajax({
      method: 'POST',
      url: mypl_custom.ajax_url,
      data: {
        action: 'HandleScavangerClick',
        post_id: post_id,
        user_id: user_id,
        index_id: index,
        event_name: event_name,
      },
      success: function (resp) {
        if (resp.success) {
          jQuery(self).hide().remove();
          startConfetti();

          setTimeout(function () {
            stopConfetti();
          }, 2000);
        }
      },
    });
  });

  jQuery('.embed-video-popup').children('iframe').attr('id', 'playerid');

  jQuery('.sponsor_contact_us_btn').click(function () {
    let post_id = gamipress_events.post_id;
    jQuery.ajax({
      method: 'POST',
      url: mypl_custom.ajax_url,
      dataType: 'json',
      data: { action: 'contact_me_form', exibit_id: post_id },

      success: function (response) {
        console.log('Sponsor Contact Us Form Gamipress');
      },
    });
  });

  jQuery('button.frm_button_submit.frm_final_submit').click(function () {
    let sub = jQuery('input#field_e6lis6').val();
    let msg = jQuery('textarea#field_9jv0r1').val();
    if (sub !== '' || msg !== '') {
      let post_id = gamipress_events.post_id;
      jQuery.ajax({
        method: 'POST',
        url: mypl_custom.ajax_url,
        dataType: 'json',
        data: { action: 'contact_me_form', exibit_id: post_id },

        success: function (response) {
          console.log('Contact Me Form Gamipress');
        },
      });
    }
  });

  jQuery('.ask_a_question_session_custom').click(function () {
    let sub = jQuery('input#field_gy1d0').val();
    let msg = jQuery('textarea#field_k0a4a').val();
    if (sub !== '' || msg !== '') {
      jQuery.ajax({
        method: 'POST',
        url: mypl_custom.ajax_url,
        dataType: 'json',
        data: { action: 'ask_a_question_custom' },

        success: function (response) {
          console.log('ASK A QUESTION SESSION FORM TRIGGER');
        },
      });
    }
  });

  jQuery('.floatingButton').on('click', function (e) {
    jQuery(this).toggleClass('open');
    // toggle aria-expanded attribute
    jQuery(this).attr('aria-expanded', jQuery(this).hasClass('open'));
    if (jQuery(this).children('.fa').hasClass('fa-plus')) {
      jQuery(this).children('.fa').removeClass('fa-plus');
      jQuery(this).children('.fa').addClass('fa-close');
    } else if (jQuery(this).children('.fa').hasClass('fa-close')) {
      jQuery(this).children('.fa').removeClass('fa-close');
      jQuery(this).children('.fa').addClass('fa-plus');
    }
    jQuery('.floatingMenu').stop().slideToggle();
  });

  jQuery(this).on('click', function (e) {
    var container = jQuery('.floatingButton');
    // if the target of the click isn't the container nor a descendant of the container
    if (
      !container.is(e.target) &&
      jQuery('.floatingButtonWrap').has(e.target).length === 0
    ) {
      if (container.hasClass('open')) {
        container.removeClass('open');
        container.attr('aria-expanded', 'false');
      }
      if (container.children('.fa').hasClass('fa-close')) {
        container.children('.fa').removeClass('fa-close');
        container.children('.fa').addClass('fa-plus');
      }
      jQuery('.floatingMenu').hide();
    }

    // if the target of the click isn't the container and a descendant of the menu
    if (
      !container.is(e.target) &&
      jQuery('.floatingMenu').has(e.target).length > 0
    ) {
      jQuery('.floatingButton').removeClass('open');
      jQuery('.floatingButton').attr('aria-expanded', 'false');
      jQuery('.floatingMenu').stop().slideToggle();
    }
  });

  var confetti = {
    maxCount: 150, //set max confetti count
    speed: 2, //set the particle animation speed
    frameInterval: 15, //the confetti animation frame interval in milliseconds
    alpha: 1.0, //the alpha opacity of the confetti (between 0 and 1, where 1 is opaque and 0 is invisible)
    gradient: false, //whether to use gradients for the confetti particles
    start: null, //call to start confetti animation (with optional timeout in milliseconds, and optional min and max random confetti count)
    stop: null, //call to stop adding confetti
    toggle: null, //call to start or stop the confetti animation depending on whether it's already running
    pause: null, //call to freeze confetti animation
    resume: null, //call to unfreeze confetti animation
    togglePause: null, //call to toggle whether the confetti animation is paused
    remove: null, //call to stop the confetti animation and remove all confetti immediately
    isPaused: null, //call and returns true or false depending on whether the confetti animation is paused
    isRunning: null, //call and returns true or false depending on whether the animation is running
  };

  confetti.start = startConfetti;
  confetti.stop = stopConfetti;
  confetti.toggle = toggleConfetti;
  confetti.pause = pauseConfetti;
  confetti.resume = resumeConfetti;
  confetti.togglePause = toggleConfettiPause;
  confetti.isPaused = isConfettiPaused;
  confetti.remove = removeConfetti;
  confetti.isRunning = isConfettiRunning;
  var supportsAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame;
  var colors = [
    'rgba(30,144,255,',
    'rgba(107,142,35,',
    'rgba(255,215,0,',
    'rgba(255,192,203,',
    'rgba(106,90,205,',
    'rgba(173,216,230,',
    'rgba(238,130,238,',
    'rgba(152,251,152,',
    'rgba(70,130,180,',
    'rgba(244,164,96,',
    'rgba(210,105,30,',
    'rgba(220,20,60,',
  ];
  var streamingConfetti = false;
  var animationTimer = null;
  var pause = false;
  var lastFrameTime = Date.now();
  var particles = [];
  var waveAngle = 0;
  var context = null;

  function resetParticle(particle, width, height) {
    particle.color =
      colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ')');
    particle.color2 =
      colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ')');
    particle.x = Math.random() * width;
    particle.y = Math.random() * height - height;
    particle.diameter = Math.random() * 10 + 5;
    particle.tilt = Math.random() * 10 - 10;
    particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
    particle.tiltAngle = Math.random() * Math.PI;
    return particle;
  }

  function toggleConfettiPause() {
    if (pause) resumeConfetti();
    else pauseConfetti();
  }

  function isConfettiPaused() {
    return pause;
  }

  function pauseConfetti() {
    pause = true;
  }

  function resumeConfetti() {
    pause = false;
    runAnimation();
  }

  function runAnimation() {
    if (pause) return;
    else if (particles.length === 0) {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      animationTimer = null;
    } else {
      var now = Date.now();
      var delta = now - lastFrameTime;
      if (!supportsAnimationFrame || delta > confetti.frameInterval) {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        updateParticles();
        drawParticles(context);
        lastFrameTime = now - (delta % confetti.frameInterval);
      }
      animationTimer = requestAnimationFrame(runAnimation);
    }
  }

  function startConfetti(timeout, min, max) {
    var width = window.innerWidth;
    var height = window.innerHeight;
    window.requestAnimationFrame = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          return window.setTimeout(callback, confetti.frameInterval);
        }
      );
    })();
    var canvas = document.getElementById('confetti-canvas');
    if (canvas === null) {
      canvas = document.createElement('canvas');
      canvas.setAttribute('id', 'confetti-canvas');
      canvas.setAttribute(
        'style',
        'display:block;z-index:999999;pointer-events:none;position:fixed;top:0'
      );
      document.body.prepend(canvas);
      canvas.width = width;
      canvas.height = height;
      window.addEventListener(
        'resize',
        function () {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        },
        true
      );
      context = canvas.getContext('2d');
    } else if (context === null) context = canvas.getContext('2d');
    var count = confetti.maxCount;
    if (min) {
      if (max) {
        if (min == max) count = particles.length + max;
        else {
          if (min > max) {
            var temp = min;
            min = max;
            max = temp;
          }
          count = particles.length + ((Math.random() * (max - min) + min) | 0);
        }
      } else count = particles.length + min;
    } else if (max) count = particles.length + max;
    while (particles.length < count)
      particles.push(resetParticle({}, width, height));
    streamingConfetti = true;
    pause = false;
    runAnimation();
    if (timeout) {
      window.setTimeout(stopConfetti, timeout);
    }
  }

  function stopConfetti() {
    streamingConfetti = false;
  }

  function removeConfetti() {
    stop();
    pause = false;
    particles = [];
  }

  function toggleConfetti() {
    if (streamingConfetti) stopConfetti();
    else startConfetti();
  }

  function isConfettiRunning() {
    return streamingConfetti;
  }

  function drawParticles(context) {
    var particle;
    var x, y, x2, y2;
    for (var i = 0; i < particles.length; i++) {
      particle = particles[i];
      context.beginPath();
      context.lineWidth = particle.diameter;
      x2 = particle.x + particle.tilt;
      x = x2 + particle.diameter / 2;
      y2 = particle.y + particle.tilt + particle.diameter / 2;
      if (confetti.gradient) {
        var gradient = context.createLinearGradient(x, particle.y, x2, y2);
        gradient.addColorStop('0', particle.color);
        gradient.addColorStop('1.0', particle.color2);
        context.strokeStyle = gradient;
      } else context.strokeStyle = particle.color;
      context.moveTo(x, particle.y);
      context.lineTo(x2, y2);
      context.stroke();
    }
  }

  function updateParticles() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var particle;
    waveAngle += 0.01;
    for (var i = 0; i < particles.length; i++) {
      particle = particles[i];
      if (!streamingConfetti && particle.y < -15) particle.y = height + 100;
      else {
        particle.tiltAngle += particle.tiltAngleIncrement;
        particle.x += Math.sin(waveAngle) - 0.5;
        particle.y +=
          (Math.cos(waveAngle) + particle.diameter + confetti.speed) * 0.5;
        particle.tilt = Math.sin(particle.tiltAngle) * 15;
      }
      if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
        if (streamingConfetti && particles.length <= confetti.maxCount)
          resetParticle(particle, width, height);
        else {
          particles.splice(i, 1);
          i--;
        }
      }
    }
  }

  jQuery(document).ready(function () {
    jQuery('.confetti_image').on('click', function () {
      jQuery('.confetti_image').hide();
      jQuery('.winner_image').show();
      startConfetti();
      setTimeout(function () {
        stopConfetti();
      }, 2000);
    });
  });

  jQuery(document).on('click', '.cartoon_profile_page', function () {
    var slug_value = jQuery(this).data('section');
    var post_id = jQuery(this).data('post_id');

    jQuery.ajax({
      method: 'POST',
      url: mypl_custom.ajax_url,
      data: {
        post_id: post_id,
        action: 'confetti_image_function',
      },
      success: function (output) {
        jQuery('.cartoon_profile_page').hide();
        startConfetti();

        setTimeout(function () {
          stopConfetti();
        }, 5000);
        location.reload();
      },
    });
  });

  var group_my_profile = {
    'personal-details': [
      {
        label: 'Personal Details',
        data: ['first-name', 'last-name', 'email', 'description', 'Website'],
      },
    ],

    organization: [
      {
        label: 'Organization',
        data: ['organization', 'job_title'],
      },
    ],
    'Address-details': [
      {
        label: 'Address Details',
        data: [
          'zone_selected',
          'address_line_1',
          'address_line_2',
          'city',
          'stateprovince',
          'zip_code_edx',
          'photo_release',
        ],
      },
    ],
    'other-details': [
      {
        label: 'Other Details',
        data: [
          'country',
          'show_contact_us_button',
          'use_meeting_scheduler',
          'caption_services',
        ],
      },
    ],
    'matchmaking-categories': [
      {
        label: 'Matchmaking Categories',
        data: [
          'user_interest',
          'user_geographical_location',
          'mm_i_am_a___',
          'mm_i_am_looking_for___',
        ],
      },
    ],
  };

  var group_sponsor_fields = {
    'common-details': [
      {
        label: '',
        data: ['_post_title', '_post_content'],
      },
    ],
    'company-profile': [
      {
        label: 'Company Profile',
        data: [
          'sponsor_logo',
          'sponsor_url',
          'banner',
          'banner_link',
          'choose_sponsor_page_banner_image_location',
          'sp_contact_me_url',
          'sponsor_show_contact_us_button',
        ],
      },
    ],
    'company-details': [
      {
        label: 'Company Details',
        data: [
          'do_you_want_to_collateral_materials',
          'resources_button_name',
          'collateral_materials_options',
          'select_iframe_url',
          'iframe_url',
          'embed_url_youtube_vimeo_etc',
          'sponser_keywords',
        ],
      },
    ],
    'meeting-scheduler': [
      {
        label: 'Meeting Scheduler',
        data: [
          'use_meeting_scheduler',
          'add_representatives',
          'custom_schedule_meeting_link',
        ],
      },
    ],
    'social-accounts': [
      {
        label: 'Social Accounts',
        data: ['facebook', 'twitter', 'linkedin', 'instagram'],
      },
    ],
    'chat-room': [
      {
        label: 'Booth Chat Table',
        data: [
          'table_top_link',
          'meet_now_table',
          'chat_table_message',
          'sponsor_meet_now_group_name',
        ],
      },
    ],
    'attend-our-session': [
      {
        label: 'Attend our Session',
        data: ['attend_our_session'],
      },
    ],
  };
  var group_poster_fields = {
    'common-details': [
      {
        label: '',
        data: ['_post_title', '_post_content'],
      },
    ],
    'poster-details': [
      {
        label: 'Poster Details',
        data: [
          'poster_video_link',
          'poster_pdf',
          'choose_presenters_page_banner_image_location',
          'your_email_address',
        ],
      },
    ],
    'social-accounts': [
      {
        label: 'Social Accounts',
        data: ['poster_facebook', 'poster_twitter', 'poster_linkedin'],
      },
    ],
    other: [
      {
        label: 'Other',
        data: ['meet_now_table', 'poster_keywords'],
      },
    ],
  };

  function render_profile_fields(main_data, parent_el = '') {
    jQuery.each(main_data, function (idx, grp) {
      if (grp.length && grp[0].data.length) {
        let first_element = grp[0].data[0];

        if (jQuery(`${parent_el} [data-name="${first_element}"]`).length) {
          jQuery(`<div class="mp_grp_${idx} mp_grp"></div>`).insertBefore(
            `${parent_el} [data-name="${first_element}"]`
          );
          let label = grp[0].label;

          if (label.length) {
            jQuery(`<h3 class="group_heading">${label}</h3>`).appendTo(
              `${parent_el} .mp_grp_${idx}`
            );
          }

          jQuery.each(grp[0].data, function (grp_idx, grp_key) {
            if (jQuery(`${parent_el} [data-name="${grp_key}"]`).length) {
              jQuery(`${parent_el} [data-name="${grp_key}"]`).appendTo(
                `${parent_el} .mp_grp_${idx}`
              );
            }
          });
        }
      }
    });
  }

  function do_group_on_my_profile_page(main_data, parent_el = '') {
    if (jQuery(parent_el).length > 1) {
      jQuery(parent_el).each(function (idx, el) {
        render_profile_fields(main_data, `#${jQuery(el).attr('id')}`);
      });
    } else {
      render_profile_fields(main_data, parent_el);
    }
  }

  function do_group_on_my_profile() {
    do_group_on_my_profile_page(group_my_profile, '.tab_my_profile');
    do_group_on_my_profile_page(
      group_sponsor_fields,
      '.tab_sponsor_page .container-tab'
    );
    do_group_on_my_profile_page(
      group_poster_fields,
      '.tab_poster_tab .container-tab'
    );
  }

  do_group_on_my_profile();
});

(function ($) {
  document.onreadystatechange = function () {
    if (
      document.readyState === 'interactive' &&
      jQuery('.attendee_app_slot.appointment-slots') &&
      jQuery('.appointment-slots') &&
      !navigator.onLine
    ) {
      jQuery('.attendee_app_slot.appointment-slots').css('display', 'none');
      jQuery('.appointment-slots').css('display', 'none');
    }

    if ((document.readyState = 'interactive' && !navigator.onLine)) {
      jQuery('#offline-btn').addClass('hide-offline-btn');
    }
  };

  function resources_video_fancybox() {
    jQuery(document)
      .find('.resources_video_popup')
      .fancybox({
        smallBtn: true,
        iframe: {
          css: {
            width: '800px',
            height: '450px',
          },
        },
      });

    if (jQuery(document).find('.resources_video_popup')) {
      jQuery(document)
        .find('.resources_video_popup')
        .attr('data-myvideoresources', 'resources_video_attr');
    }
  }

  var filterred = false;
  var location = window.location.hash;

  var sort_by_datetime = function (div_id) {
    var $wrapper = jQuery('.ms_tabcontent').find(div_id);

    $wrapper
      .find('.da_schedule_single')
      .sort(function (a, b) {
        return +a.dataset.datetime - +b.dataset.datetime;
      })
      .appendTo($wrapper);
  };

  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined
          ? true
          : decodeURIComponent(sParameterName[1]);
      }
    }
  };

  jQuery(document).on('click', '#menu-item-20780 > a:first-child', function () {
    jQuery('.popup_text_watch_now').html(
      '<div class="watch-now-butto  n-popup-message"><b>Please select one of the tracks</b></div>'
    );
  });

  jQuery(document).on(
    'click',
    '#menu-header-watch-now-1 > li > a:first-child',
    function () {
      jQuery('.popup_text_watch_now').html(
        '<div class="watch-now-butto  n-popup-message"><b>Please select one of the tracks</b></div>'
      );
    }
  );

  jQuery(document).ready(function () {
    jQuery(document).on(
      'click',
      '#pipe-upload-form-pipe_record_new_video',
      function (e) {
        if (
          jQuery(e.target).attr('id') !=
            'pipe-upload-wrap-pipe_record_new_video' &&
          !jQuery(e.target).parents('#pipe-upload-wrap-pipe_record_new_video')
            .length
        ) {
          jQuery(document)
            .find('#pipeStartUploading-pipe_record_new_video')
            .trigger('click');
        }
      }
    );

    if (jQuery('body').hasClass('author') == true) {
      let searchParamss = new URLSearchParams(window.location.search);

      var ag = searchParamss.has('agenda');
      if (ag == true) {
        jQuery('a#link_text-38-305').removeAttr('href');
        jQuery('a#link_text-38-305').attr(
          'href',
          window.location.origin + '/agenda'
        );
      }
    }
    jQuery(document).on('contextmenu', '.watch-now-live-open', function () {
      return false;
    });

    jQuery(document).on(
      'contextmenu',
      '.mycn-popup-watch-now-btn',
      function () {
        return false;
      }
    );
  });

  jQuery('#tabs li a').trigger('click');
  jQuery(document).on('click', '#tabs li a', function (event) {
    event.preventDefault();
    var t = jQuery(this).attr('id');
    jQuery('.tabination').removeClass('tab-active');
    jQuery(this).addClass('tab-active');

    if (!jQuery(this).hasClass('inactive')) {
      //this is the start of our condition
      jQuery(this).addClass('inactive');
      jQuery(this).removeClass('inactive');

      jQuery('.container-tab').hide();
      jQuery('#' + t + 'C').show();
      //jQuery('#'+ t + 'C').fadeIn('slow');
    }
  });

  /** Watch now button Show/Hide **/

  jQuery('.da_sub_schedule_single').each(function (index) {
    var time = new Date();
    var timezone = jQuery(this).data('timezone');

    var Time = new Date().toLocaleString('en-US', { timeZone: timezone });
    var ctime = new Date(Time).getTime();

    var sbuffer_time = jQuery(this).data('buffer_show_button');
    var starttime = jQuery(this).data('session_start');
    sbuffer_time = new Date(sbuffer_time).getTime();

    var ebuffer_time = jQuery(this).data('endtime');
    ebuffer_time = new Date(ebuffer_time).getTime();

    var currentdate = jQuery(this).data('currentdate');
    currentdate = new Date(currentdate).getTime();

    var eventdate = jQuery(this).data('eventdate');
    eventdate = new Date(eventdate).getTime();

    if (ctime >= sbuffer_time && ctime <= ebuffer_time) {
      jQuery(this).addClass('show_watch_live_btn');
      jQuery(this)
        .find('.watch_now_btn_show')
        .removeClass('mycn-popup-watch-now-btn');
      jQuery(this)
        .find('.watch_now_btn_show')
        .addClass('mycn-popup-watch-now-btn');
      jQuery(this).find('.watch_now_btn_ondemand').hide();
    } else if (eventdate == currentdate) {
      jQuery(this).addClass('show_watch_live_btn');
      //jQuery(this).find('.watch_now_btn_show').removeClass('mycn-popup-watch-now-btn');
      jQuery(this)
        .find('.watch_now_btn_show')
        .addClass('mycn-popup-watch-now-btn');
      jQuery(this).find('.mycn-popup-watch-now-btn').show();
      jQuery(this).find('.watch_now_btn_ondemand').hide();
      return false;
    } else {
      jQuery(this).removeClass('show_watch_live_btn');
      jQuery(this).addClass('hidden_watch_live_btn');
      jQuery(this)
        .find('.watch_now_btn_show')
        .addClass('mycn-popup-watch-now-btn');
      jQuery(this).find('.watch_now_btn_show').attr('data-time', starttime);
    }
  });

  jQuery('.da_schedule_single').each(function (index) {
    var time = new Date();
    var timezone = jQuery(this).data('timezone');

    var Time = new Date().toLocaleString('en-US', { timeZone: timezone });
    var ctime = new Date(Time).getTime();

    var sbuffer_time = jQuery(this).data('buffer_show_button');
    var starttime = jQuery(this).data('session_start');
    sbuffer_time = new Date(sbuffer_time).getTime();

    var ebuffer_time = jQuery(this).data('endtime');
    ebuffer_time = new Date(ebuffer_time).getTime();

    var currentdate = jQuery(this).data('currentdate');
    currentdate = new Date(currentdate).getTime();

    var eventdate = jQuery(this).data('eventdate');
    eventdate = new Date(eventdate).getTime();

    if (ctime >= sbuffer_time && ctime <= ebuffer_time) {
      jQuery(this).addClass('show_watch_live_btn');
      jQuery(this)
        .find('.watch_now_btn_show')
        .removeClass('mycn-popup-watch-now-btn');
      jQuery(this)
        .find('.watch_now_btn_show')
        .addClass('mycn-popup-watch-now-btn');
      jQuery(this).find('.watch_now_btn_ondemand').hide();
    } else if (eventdate == currentdate) {
      jQuery(this).addClass('show_watch_live_btn');
      //jQuery(this).find('.watch_now_btn_show').removeClass('mycn-popup-watch-now-btn');
      jQuery(this)
        .find('.watch_now_btn_show')
        .addClass('mycn-popup-watch-now-btn');
      jQuery(this).find('.mycn-popup-watch-now-btn').show();
      jQuery(this).find('.watch_now_btn_ondemand').hide();
      return false;
    } else {
      jQuery(this).removeClass('show_watch_live_btn');
      jQuery(this).addClass('hidden_watch_live_btn');
      jQuery(this)
        .find('.watch_now_btn_show')
        .addClass('mycn-popup-watch-now-btn');
      jQuery(this).find('.watch_now_btn_show').attr('data-time', starttime);
    }
  });

  jQuery(document).on('click', '.watch_now_btn_show a', function (e) {
    e.preventDefault();
    var starttime = '';
    var time = new Date();
    var timezone = jQuery(this).data('timezone');

    var Time = new Date().toLocaleString('en-US', { timeZone: timezone });
    var ctime = new Date(Time).getTime();

    var sbuffer_time = jQuery(this).data('buffer_show_button');
    sbuffer_time = new Date(sbuffer_time).getTime();

    var e_time = jQuery(this).data('endtime');
    var ebuffer_time = jQuery(this).data('endtime');

    ebuffer_time = new Date(ebuffer_time).getTime();
    var fedt = jQuery(this).data('session_end');

    var starttime = jQuery(this).data('session_start');

    if (ctime >= sbuffer_time && ctime <= ebuffer_time) {
      var url = jQuery(this).data('href');
      window.open(url, '_blank');
      jQuery('.oxy-close-modal').trigger('click');
      return false;
    } else if (ctime > ebuffer_time) {
      jQuery('.sessions_text_popup').addClass('mycn-popup-watch-now-btn');
      jQuery('.popup_text_watch_now').html(
        '<div class="watch-now-button-popup-message"><b>' +
          mypl_custom.watch_live_end_time_tool_tip +
          ' ' +
          fedt +
          ' ' +
          mypl_custom.event_time_zone +
          '</b></div>'
      );

      return false;
    } else if (ctime < sbuffer_time) {
      jQuery('.sessions_text_popup').addClass('mycn-popup-watch-now-btn');
      jQuery('.popup_text_watch_now').html(
        '<div class="watch-now-button-popup-message"><b>' +
          mypl_custom.watch_live_start_time_tool_tip +
          ' ' +
          starttime +
          ' ' +
          mypl_custom.event_time_zone +
          '</b></div>'
      );

      return false;
    } else {
      jQuery(this).removeClass('show_watch_live_btn');
      jQuery(this)
        .find('.watch_now_btn_show')
        .addClass('mycn-popup-watch-now-btn');
      jQuery(this).find('.watch_now_btn_show').attr('data-time', starttime);

      return false;
    }
  });

  /** New Header Watch Now Button **/
  jQuery(document).ready(function () {
    if (jQuery('.startmsg').length) {
      var startlabel_time = jQuery('.startmsg').html();
      jQuery('.today-session-stime').html(startlabel_time);
    }

    if (jQuery('.endmsg').length && jQuery('.startmsg').length <= 0) {
      var startlabel_time = jQuery('.endmsg').html();
      jQuery('.today-session-stime').html(startlabel_time);
    }

    if (jQuery('.sub-track').length) {
      var isLive = 0;
      jQuery('.sub-track').each(function (index, obj) {
        var timezone = jQuery(obj).data('timezone');
        var Time = new Date().toLocaleString('en-US', { timeZone: timezone });
        var ctime = new Date(Time).getTime();
        var diff = jQuery('.watch-live-buffer-time').val();
        var sbuffer_time = jQuery(obj).data('startdate');
        sbuffer_time = new Date(sbuffer_time).getTime() - diff * 60000;
        var ebuffer_time = jQuery(obj).data('enddate');
        ebuffer_time = new Date(ebuffer_time).getTime() + diff * 60000;

        if (ctime >= sbuffer_time && ctime <= ebuffer_time) {
          isLive = 1;
          return false;
        }
      });

      var startlabel_time = isLive
        ? 'Please select one of the tracks'
        : jQuery('.sub-track').data('session_begin_label');
      jQuery('.today-session-multi-times').html(startlabel_time);
    }
  });

  jQuery(document).on('click', '.header-watch-now-button_one', function (e) {
    e.preventDefault();
    var starttime = '';
    var time = new Date();
    var timezone = jQuery(this).data('timezone');

    var Time = new Date().toLocaleString('en-US', { timeZone: timezone });
    var ctime = new Date(Time).getTime();

    var diff = jQuery('.watch-live-buffer-time').val();

    var slabel = jQuery(this).data('slabel');
    var sbuffer_time = jQuery(this).data('startdate');
    sbuffer_time = new Date(sbuffer_time).getTime() - diff * 60000;

    var elabel = jQuery(this).data('elabel');
    var ebuffer_time = jQuery(this).data('enddate');
    ebuffer_time = new Date(ebuffer_time).getTime() + diff * 60000;

    var fedt = jQuery(this).data('session_end');

    var starttime = jQuery(this).data('session_start');

    var before_message = jQuery(this).data('session_begin_label');

    if (jQuery(this).hasClass('select_track')) {
      jQuery('.header-watch-now-text').html(
        '<div class="watch-now-button-popup-message"><b>Please select one of the tracks</b></div>'
      );

      return false;
    }

    if (ctime >= sbuffer_time && ctime <= ebuffer_time) {
      var url = jQuery(this).data('href');

      window.open(url, '_blank');
      jQuery('.oxy-close-modal').trigger('click');
      return false;
    } else if (ctime > ebuffer_time) {
      // //var before_message = jQuery('.endmsg').data('before_msg');
      // jQuery('.sessions_text_popup').addClass('mycn-popup-watch-now-btn');
      // //jQuery( '.header-watch-now-text' ).html( '<div class="watch-now-button-popup-message"><b>' + before_message.replace('{{time}}', elabel) + '</b></div>' );
      // jQuery('.header-watch-now-text').html(
      //   '<div class="watch-now-button-popup-message"><b>' +
      //     before_message +
      //     '</b></div>'
      // );

      // return false;

      var url = jQuery(this).data('href');

      window.open(url, '_blank');
      jQuery('.oxy-close-modal').trigger('click');
      return false;
    } else if (ctime < sbuffer_time) {
      jQuery('.sessions_text_popup').addClass('mycn-popup-watch-now-btn');
      jQuery('.header-watch-now-text').html(
        '<div class="watch-now-butto  n-popup-message"><b> ' +
          before_message +
          ' </b></div>'
      );

      return false;
    } else {
      jQuery(this).removeClass('show_watch_live_btn');
      jQuery(this)
        .find('.watch_now_btn_show')
        .addClass('mycn-popup-watch-now-btn');
      jQuery(this).find('.watch_now_btn_show').attr('data-time', starttime);

      return false;
    }
  });

  function showAlert({
    title = '',
    message,
    icon = 'info',
    confirmButtonText = 'OK',
    onConfirm = null,
  }) {
    Swal.fire({
      title: title || undefined, // If title is empty, omit it
      html: message,
      icon: icon,
      showCloseButton: true,
      focusConfirm: true,
      confirmButtonText: confirmButtonText,
      customClass: {
        popup: 'swal2-accessible-popup',
      },
      didOpen: () => {
        const popup = document.querySelector('.swal2-popup');
        if (popup) {
          popup.setAttribute('role', 'alertdialog');
          popup.setAttribute('aria-live', 'assertive');
          popup.setAttribute('aria-describedby', 'swal2-html-container');
        }
      },
    }).then((result) => {
      if (result.isConfirmed && typeof onConfirm === 'function') {
        onConfirm();
      }
    });
  }

  jQuery(document).on('click', '.header-watch-now-button', function (e) {
    e.preventDefault();

    if (jQuery(this).hasClass('select_track')) {
      // jQuery( '.header-watch-now-text' ).html( '<div class="watch-now-button-popup-message"><b>Please select one of the tracks</b></div>' );
      jQuery('.sub-menu').toggleClass('hide');
      // toggle aria-expanded
      if (jQuery(this).attr('aria-expanded') == 'true') {
        jQuery(this).attr('aria-expanded', false);
      } else {
        jQuery(this).attr('aria-expanded', true);
      }
      return false;
    }

    var starttime = '';
    var time = new Date();
    var timezone = jQuery(this).data('timezone');

    // var Time = new Date().toLocaleString( "en-US", { timeZone: timezone } );
    // console.log("Time");
    // console.log(Time);
    // var ctime = new Date( Time ).getTime();
    var ctime = moment().tz(timezone).valueOf();

    var diff = jQuery('.watch-live-buffer-time').val();

    var slabel = jQuery(this).data('slabel');
    var sbuffer_time = jQuery(this).data('startdate');

    sbuffer_time =
      moment.tz(sbuffer_time, 'MMM DD, YYYY HH:mm:ss', timezone).valueOf() -
      diff * 60000;

    var elabel = jQuery(this).data('elabel');
    var ebuffer_time = jQuery(this).data('enddate');

    ebuffer_time =
      moment.tz(ebuffer_time, 'MMM DD, YYYY HH:mm:ss', timezone).valueOf() +
      diff * 60000;

    var fedt = jQuery(this).data('session_end');

    var starttime = jQuery(this).data('session_start');

    var before_message = jQuery(this).data('session_begin_label');

    if (ctime >= sbuffer_time && ctime <= ebuffer_time) {
      var url = jQuery(this).data('href');

      window.open(url, '_blank');
      jQuery('.oxy-close-modal').trigger('click');
      return false;
    } else if (ctime > ebuffer_time) {
      //var before_message = jQuery('.endmsg').data('before_msg');
      //jQuery('.sessions_text_popup').addClass('mycn-popup-watch-now-btn');
      //jQuery( '.header-watch-now-text' ).html( '<div class="watch-now-button-popup-message"><b>' + before_message.replace('{{time}}', elabel) + '</b></div>' );
      // jQuery('.header-watch-now-text').html(
      //   '<div class="watch-now-button-popup-message"><b>' +
      //     before_message +
      //     '</b></div>'
      // );
      showAlert({ message: before_message });
      return false;
    } else if (ctime < sbuffer_time) {
      //var before_message = jQuery('.startmsg').data('before_msg');
      //jQuery('.sessions_text_popup').addClass('mycn-popup-watch-now-btn');
      //jQuery( '.header-watch-now-text' ).html( '<div class="watch-now-butto  n-popup-message"><b> ' + before_message.replace('{{time}}', slabel) + ' </b></div>' );
      // jQuery('.header-watch-now-text').html(
      //   '<div class="watch-now-butto  n-popup-message"><b> ' +
      //     before_message +
      //     ' </b></div>'
      // );
      showAlert({
        message: before_message,
      });
      return false;
    } else {
      jQuery(this).removeClass('show_watch_live_btn');
      jQuery(this)
        .find('.watch_now_btn_show')
        .addClass('mycn-popup-watch-now-btn');
      jQuery(this).find('.watch_now_btn_show').attr('data-time', starttime);

      return false;
    }
  });

  /** watch now keyboard navigation  starts **/

  function focusElement(selector) {
    const element = jQuery(selector);
    if (element.length) {
      element.focus();
    }
  }

  function toggleSubMenu() {
    const subMenu = jQuery('.sub-menu');
    subMenu.toggleClass('hide');
  }

  function hideSubmenu() {
    const watchNowBtn = jQuery('.select_track.header-watch-now-button');
    watchNowBtn.trigger('click');
  }

  jQuery('#mycn-header-watch-now>.select_track.header-watch-now-button').on(
    'keydown',
    function (e) {
      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          jQuery(this).trigger('click');
          setTimeout(function () {
            if (!jQuery('.sub-menu').hasClass('hide')) {
              focusElement('.sub-menu li:first-child a');
            }
          }, 0);
          break;

        case 'ArrowDown':
          e.preventDefault();
          focusElement('.sub-menu li:first-child a');

          break;

        case 'ArrowUp':
          e.preventDefault();
          focusElement('.sub-menu li:last-child a');
          break;

        case 'Escape':
          if (!jQuery('.sub-menu').hasClass('hide')) {
            e.preventDefault();
            jQuery(this).trigger('click');
          }
          break;

        case 'Tab':
          if (!jQuery('.sub-menu').hasClass('hide')) {
            //e.preventDefault();
            jQuery(this).trigger('click');
            return;
          }
          break;
      }
    }
  );

  // Keydown event handler for sub-menu items
  jQuery('.sub-track.header-watch-now-button').on('keydown', function (e) {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        jQuery(this).trigger('click');
        break;

      case 'ArrowDown': {
        e.preventDefault();
        const nextTrack = jQuery(this).parent().next().find('a');
        if (nextTrack.length) {
          nextTrack.focus();
        } else {
          focusElement('.sub-menu li:first-child a');
        }
        break;
      }

      case 'ArrowUp': {
        e.preventDefault();
        const prevTrack = jQuery(this).parent().prev().find('a');
        if (prevTrack.length) {
          prevTrack.focus();
        } else {
          focusElement('.sub-menu li:last-child a');
        }
        break;
      }

      case 'Escape':
        if (!jQuery('.sub-menu').hasClass('hide')) {
          e.preventDefault();
          hideSubmenu();
          focusElement('.select_track.header-watch-now-button');
        }
        break;

      case 'Tab':
        if (!jQuery('.sub-menu').hasClass('hide')) {
          //e.preventDefault();
          hideSubmenu();
          return;
        }
        break;
    }
  });

  /** watch now keyboard navigation  ends */

  /**
   * Custom tabs to interact with custom functionalities
   */
  jQuery(document).on('click', '.tablinks', function (e) {
    var href = jQuery(this).data('tab-href');
    jQuery(this)
      .parents('.tab')
      .siblings('.tabcontent')
      .find('.da_schedule_wrapper')
      .removeClass('active');
    jQuery(this).parents('.tab').find('.tablinks').removeClass('active');
    jQuery(this)
      .parents('.tab')
      .find('.tablinks')
      .attr('aria-selected', false)
      .attr('tabindex', -1);
    jQuery(`#${href}`).addClass('active');

    jQuery(this).addClass('active');
    jQuery(this).attr('aria-selected', true);
    jQuery(this).removeAttr('tabindex');
  });

  /**
   * Add a Session to My Schedule
   */
  jQuery(document).on('click', '.add_my_schedule', function () {
    var session_id = jQuery(this).data('session-id');

    $this = jQuery(this);
    $this_session = jQuery(this).parents('.da_schedule_single');
    jQuery(`.da_session_${session_id}`)
      .find('.session-add-btn .add_my_schedule')
      .text('Adding...');
    jQuery(`.da_session_${session_id}`)
      .find('.session-add-btn .add_my_schedule')
      .prop('disabled', true);
    // Show loader container
    jQuery.ajax({
      method: 'POST',
      url: mypl_custom.ajax_url,
      dataType: 'json',
      data: { action: 'ismb_add_to_my_schedule', session_id: session_id },

      success: function (response) {
        if (response != null && response.success_flag == 1) {
          var $cloned = $this_session.clone();
          jQuery('.ms_tabcontent')
            .find(`#ms_${response.data.date}`)
            .append($cloned);
          jQuery(`.da_session_${session_id}`)
            .find('.session-add-btn')
            .html(response.data.btn_html);
          sort_by_datetime(`#ms_${response.data.date}`);
          setMySessions();
        } else {
          jQuery(`.da_session_${session_id}`)
            .find('.session-add-btn')
            .html(response.data.btn_html);
        }
        var show_message = hide_show_schedule_mesage();
      },
    });
  });

  /**
   * Removea Session from My Schedule
   */
  jQuery(document).on('click', '.remove_my_schedule', function () {
    var session_id = jQuery(this).data('session-id');
    jQuery(`.da_session_${session_id}`)
      .find('.session-add-btn .remove_my_schedule')
      .text('Removing...');
    jQuery(`.da_session_${session_id}`)
      .find('.session-add-btn .remove_my_schedule')
      .prop('disabled', true);
    $this = jQuery(this);
    jQuery.ajax({
      method: 'POST',
      url: mypl_custom.ajax_url,
      dataType: 'json',
      data: { action: 'ismb_remove_from_my_schedule', session_id: session_id },
      success: function (response) {
        if (response.success_flag == 1) {
          jQuery(`.da_session_${session_id}`)
            .find('.session-add-btn')
            .html(response.data.btn_html);
          jQuery('.ms_tabcontent').find(`.da_session_${session_id}`).remove();
          my_sessions = my_sessions.filter(function (obj) {
            return obj.ID !== session_id;
          });
        }
        var show_message = hide_show_schedule_mesage();
      },
    });
  });

  function hide_show_schedule_mesage() {
    jQuery('.ms_tabcontent .da_schedule_wrapper').each(function (i, el) {
      if (jQuery(el).find('.da_schedule_single').length) {
        jQuery(el).find('.schedule_message').hide();
      } else {
        jQuery(el).find('.schedule_message').show();
      }
    });
  }

  /**
   * Open a popup by clicking on the Awardee
   */
  jQuery(document).on('click', '.awardee_popup', function (e) {
    var href = jQuery(this).data('videourl');
    jQuery('.Award_modal_section').empty();
    jQuery('.Award_modal_section').append(
      '<iframe src=' + href + ' frameborder="0" allowfullscreen=""></iframe>'
    );
  });

  /**
   * Infinit load on scroll for fasetwp
   */

  function jqueryToggleAriaAttr(thisInstance, attr) {
    var temp = jQuery(thisInstance).attr(attr) == 'true' ? true : false;
    jQuery(thisInstance).attr(attr, !temp);
    if (attr == 'aria-hidden' && !temp) {
      jQuery(thisInstance).attr('inert', '');
    } else {
      jQuery(thisInstance).removeAttr('inert');
    }
  }

  function toggleSvgIcon(thisInstance) {
    jQuery('.accordian_icon')
      .find('.fa-caret-up')
      .removeClass('fa-caret-up')
      .addClass('fa-caret-down');
    if (jQuery(thisInstance).hasClass('accordion_active_icon')) {
      jQuery(thisInstance)
        .find('.fa-caret-down')
        .removeClass('fa-caret-down')
        .addClass('fa-caret-up');
    } else {
      jQuery(thisInstance)
        .find('.fa-caret-up')
        .removeClass('fa-caret-up')
        .addClass('fa-caret-down');
    }
  }

  function scheduleClickHandler(thisInstance) {
    let all_accordion_headers = jQuery(thisInstance)
      .parents('.da_schedule_single')
      .siblings()
      .find('.da_Schedule_header');
    all_accordion_headers.removeClass('accordion_active_icon');
    all_accordion_headers.attr('aria-expanded', false);

    let all_accordion_body = jQuery(thisInstance)
      .parents('.da_schedule_single')
      .siblings()
      .find('.accordion-body');
    all_accordion_body.removeClass('accordion_active');
    all_accordion_body.attr('aria-hidden', true);
    all_accordion_body.attr('inert', '');

    jQuery(thisInstance)
      .siblings('.accordion-body')
      .toggleClass('accordion_active');
    jQuery(thisInstance).siblings('.accordion-body').removeAttr('inert');
    jqueryToggleAriaAttr(
      jQuery(thisInstance).siblings('.accordion-body'),
      'aria-hidden'
    );

    jQuery(thisInstance).toggleClass('accordion_active_icon');
    jqueryToggleAriaAttr(thisInstance, 'aria-expanded');
    toggleSvgIcon(thisInstance);

    var session_attr_id = jQuery('.da_schedule_wrapper.active').attr('id');
    var $get_session_index = jQuery('#' + session_attr_id).find(
      '.da_Schedule_header'
    ).length;

    let $prt = jQuery(thisInstance).parents('.da_schedule_single');
    let prt_idx = $prt.index() + 1;

    if ($get_session_index == prt_idx) {
      jQuery('#' + session_attr_id).animate(
        { scrollTop: jQuery('#' + session_attr_id).prop('scrollHeight') },
        500
      );
    }
  }

  jQuery(document).on('click', '.da_Schedule_header', function (e) {
    scheduleClickHandler(this);
  });

  //   if focus is on da_schedule_single and user presses either enter or spacebar, open the accordion
  jQuery(document).on('keydown', '.da_Schedule_header', function (e) {
    if (e.keyCode == 13 || e.keyCode == 32) {
      e.preventDefault();
      //scheduleClickHandler(jQuery(this).find('.da_Schedule_header'));
      scheduleClickHandler(this);
    }
  });

  // if focus is on any of the tablinks using the arrow keys, remove the tabindex -1 and move the focus to the next or previous tablink
  jQuery(document).on('keydown', '.tablinks', function (e) {
    if (e.keyCode == 37 || e.keyCode == 38) {
      e.preventDefault();
      jQuery('.tablinks').attr('tabindex', -1);
      jQuery(this).prev().removeAttr('tabindex');
      jQuery(this).prev().focus();
    } else if (e.keyCode == 39 || e.keyCode == 40) {
      e.preventDefault();
      jQuery('.tablinks').attr('tabindex', -1);
      jQuery(this).next().removeAttr('tabindex');
      jQuery(this).next().focus();
    }
  });

  /* Start - My-Profile Browser Back Functionality */

  jQuery(document).on(
    'click',
    '.show_manage_profile_tab .oxy-tab',
    function (e) {
      e.preventDefault();
      var id = jQuery(this).attr('id');
      var loc = window.location.href;
      if (id != 'view_profile_page' && id != 'tab_view_my_page') {
        window.location.hash = id;
      }
    }
  );

  /* End - My-Profile Browser Back Functionality */

  function animatecontent(ele, modifier) {
    var sl = ele.scrollLeft();
    ele.animate(
      { scrollLeft: sl + modifier * 120 },
      500,
      'linear',
      function () {
        if (hover) {
          animatecontent(ele, modifier);
        }
      }
    );
  }

  var hover = false;
  jQuery('.scroll-arrow').each(function () {
    var modifier = jQuery(this).hasClass('right') ? 1 : -1;
    var sib = '.shelf-slide';
    jQuery(this).hover(
      function () {
        hover = true;
        jQuery(this).siblings(sib).stop();
        animatecontent(jQuery(this).siblings(sib), modifier);
      },
      function () {
        hover = false;
        jQuery(this).siblings(sib).stop();
      }
    );
  });

  function setMySessions() {
    jQuery.ajax({
      method: 'POST',
      url: mypl_custom.ajax_url,
      dataType: 'json',
      cache: false,
      data: { action: 'ismb_my_schedule_session', token: Date.now() },

      success: function (response) {
        var result = response.schedule_session;
        var session_data = response.schedule_session_data;
        let my_schedule_ids = [];
        jQuery.each(session_data, function (asidx, schedules) {
          jQuery.each(schedules, function (sidx, schedule) {
            let $el_schedule = jQuery(`.da_session_${schedule.ID}`);
            if ($el_schedule.length) {
              $el_schedule
                .find('.session-add-btn button')
                .replaceWith(
                  `<button type="button" data-session-id="${schedule.ID}" class="remove_my_schedule btn_my_schedule"><i class="fa fa-minus"></i> Remove from My Schedule</button>`
                );
            }
            // if session is not present in my_schedule_ids array then push it
            if (my_schedule_ids.indexOf(schedule.ID) == -1) {
              my_schedule_ids.push(schedule.ID);
              my_sessions[sidx] = {
                ID: schedule.ID,
                post_title: schedule.post_title,
                event_date: schedule.event_date.replace(/\//g, '_'),
                event_date_custom: schedule.event_date_custom,
              };
            }
            console.log(my_schedule_ids);
            console.log(my_sessions);
          });
        });
        if (response.success_flag == 1) {
          jQuery(document).find('.ajax_fill_schedules').replaceWith(result);
          var show_message = hide_show_schedule_mesage();
        }
      },
    });
  }

  jQuery(window).on('load', function () {
    //ABOUT US SECTION VIDEO
    jQuery(document)
      .find('.about-img-block')
      .fancybox({
        smallBtn: true,
        iframe: {
          css: {
            width: 640,
            height: 360,
          },
        },
      });

    let hybrid_eventjs = jQuery('#onsite_online_handler').val();
    if (hybrid_eventjs == '1') {
    } else {
      jQuery('[data-name="onsite_or_offsite"]').hide();
    }

    if (window.location.href.indexOf('sponsor') > -1) {
      var sp_contact_us_urls = jQuery('.sp_contact_us_urls').val();
      if (sp_contact_us_urls !== '') {
        jQuery('#field_email_hidden').val(sp_contact_us_urls);
        // jQuery("input[name='item_meta[11]']").val("");
      }
    }

    jQuery('.mp_grp_other').insertAfter('.mp_grp_Address-details');

    setTimeout(function () {
      jQuery('.loading_text').hide();
    }, 1500);

    $('.custom-popup-close').on('click', function () {
      var video = $('#playerid').attr('src');
      $('#playerid').attr('src', '');
      $('#playerid').attr('src', video);
    });

    jQuery(location).trigger('click');
    var show_message = hide_show_schedule_mesage();

    var video_neworking_link = jQuery(document)
      .find('.home_Network_quick_video_pop_up')
      .attr('href');

    jQuery(document)
      .find('.home_Network_quick_video_pop_up')
      .attr('data-src', video_neworking_link);
    jQuery(document)
      .find('.home_Network_quick_video_pop_up')
      .attr('data-type', 'iframe');
    jQuery(document)
      .find('.home_Network_quick_video_pop_up')
      .fancybox({
        smallBtn: true,
        iframe: {
          css: {
            width: '800px',
            height: '450px',
          },
        },
      });

    var video_attendee_link = jQuery(document)
      .find('.attendee_start_video_pop_up')
      .attr('href');

    jQuery(document)
      .find('.attendee_start_video_pop_up')
      .attr('data-src', video_attendee_link);
    jQuery(document)
      .find('.attendee_start_video_pop_up')
      .attr('data-type', 'iframe');
    jQuery(document)
      .find('.attendee_start_video_pop_up')
      .fancybox({
        smallBtn: true,
        iframe: {
          css: {
            width: '800px',
            height: '450px',
          },
        },
      });

    var header_promo_video_btn = jQuery(document)
      .find('.header_promo_video_btn')
      .attr('href');

    jQuery(document)
      .find('.header_promo_video_btn')
      .attr('data-src', header_promo_video_btn);
    jQuery(document)
      .find('.header_promo_video_btn')
      .attr('data-type', 'iframe');
    jQuery(document)
      .find('.header_promo_video_btn')
      .fancybox({
        smallBtn: true,
        iframe: {
          css: {
            width: '800px',
            height: '450px',
          },
        },
      });

    if (jQuery('#my_profile_page #message').length == 1) {
      jQuery('.show_poster_success_messge').append(
        '<p class="cp_success_messgae">Your Page has been updated..<p>'
      );
    }

    var n = Date.now();
    jQuery.ajax({
      method: 'POST',
      url: mypl_custom.ajax_url,
      dataType: 'json',
      cache: false,
      data: { action: 'ismb_my_schedule_session', token: Date.now() },

      success: function (response) {
        var result = response.schedule_session;
        var sys_enable_notification = response.sys_enable_notification;
        var sys_enable_session_email = response.sys_enable_session_email;

        if (acf) {
          acf.set('sys_enable_notification', sys_enable_notification);
          acf.set('sys_enable_session_email', sys_enable_session_email);
        } else {
          localStorage.setItem(
            'sys_enable_notification',
            sys_enable_notification
          );
          localStorage.setItem(
            'sys_enable_session_email',
            sys_enable_session_email
          );
        }
        var session_data = response.schedule_session_data;
        jQuery.each(session_data, function (asidx, schedules) {
          jQuery.each(schedules, function (sidx, schedule) {
            let $el_schedule = jQuery(`.da_session_${schedule.ID}`);
            if ($el_schedule.length) {
              $el_schedule
                .find('.session-add-btn button')
                .replaceWith(
                  `<button type="button" data-session-id="${schedule.ID}" class="remove_my_schedule btn_my_schedule"><i class="fa fa-minus"></i> Remove from My Schedule</button>`
                );
            }

            my_sessions[sidx] = {
              ID: schedule.ID,
              post_title: schedule.post_title,
              event_date: schedule.event_date.replace(/\//g, '_'),
              event_date_custom: schedule.event_date_custom,
            };
          });
        });
        if (response.success_flag == 1) {
          jQuery(document).find('.ajax_fill_schedules').replaceWith(result);
          var show_message = hide_show_schedule_mesage();
        }
      },
    });

    // Associated session

    jQuery(document).find('.tablinks.active').trigger('click');

    var associated_session_id = getUrlParameter('session_id');
    var associated_session_date = getUrlParameter('session_date');
    var associated_parent_session_id = getUrlParameter('parent_session_id');
    let $scroll_div;

    if (associated_session_date && associated_session_id) {
      jQuery(document)
        .find('.tablinks[data-tab-href="' + associated_session_date + '"]')
        .trigger('click');
      if (associated_parent_session_id != '0') {
        jQuery(document)
          .find(
            '.da_schedule_single[data-session-id="' +
              associated_parent_session_id +
              '"] > .da_Schedule_header'
          )
          .trigger('click');
        jQuery(document)
          .find(
            '.da_sub_schedule_single[data-session-id="' +
              associated_session_id +
              '"]'
          )
          .find('.da_Schedule_header')
          .trigger('click');
        $scroll_div = jQuery(document).find(
          '.da_sub_schedule_single[data-session-id="' +
            associated_session_id +
            '"]'
        );

        let p_top = jQuery(document)
          .find('.da_schedule_wrapper.active')
          .offset().top;
        let c_top = jQuery(document)
          .find(
            '.da_sub_schedule_single[data-session-id="' +
              associated_session_id +
              '"]'
          )
          .offset().top;
        let scroll_height = c_top - p_top;

        jQuery(document)
          .find('.da_schedule_wrapper.active')
          .animate({ scrollTop: scroll_height }, 500);
      } else {
        var elem = jQuery(document).find(
          '.da_schedule_single[data-session-id="' +
            associated_session_id +
            '"] > .da_Schedule_header'
        );

        jQuery(document)
          .find(
            '.da_schedule_single[data-session-id="' +
              associated_session_id +
              '"] > .da_Schedule_header'
          )
          .trigger('click');
        $scroll_div = jQuery(document).find(
          '.da_schedule_single[data-session-id="' + associated_session_id + '"]'
        );
        let p_top = jQuery(document)
          .find('.da_schedule_wrapper.active')
          .offset().top;
        let c_top = jQuery(document)
          .find(
            '.da_schedule_single[data-session-id="' +
              associated_session_id +
              '"]'
          )
          .offset().top;
        let scroll_height = c_top - p_top;
        jQuery(document)
          .find('.da_schedule_wrapper.active')
          .animate({ scrollTop: scroll_height }, 500);
        var elem_active = elem
          .parents()
          .closest('.da_schedule_wrapper')
          .attr('id');

        jQuery(document)
          .find('.tablinks[data-tab-href="' + elem_active + '"]')
          .trigger('click');
      }

      jQuery([document.documentElement, document.body]).animate(
        {
          scrollTop: jQuery('#div_block-30-449').offset().top + 150,
        },
        1000
      );
    }

    function zoom_user() {
      jQuery.ajax({
        method: 'POST',
        url: mypl_custom.ajax_url,
        dataType: 'json',
        cache: false,
        data: { action: 'get_zoom_user' },

        success: function (response) {
          jQuery('.set_zoom_user_list').html(response);
        },
      });
    }

    if (jQuery('.page-id-37967').length) {
      zoom_user();
    }

    var get_zoom_user_time_feild = mypl_custom.zoom_user_time;
    var main_get_zoom_user_time_feild = get_zoom_user_time_feild * 1000;

    jQuery(document).on('click', '.zoom_user_btn', function (e) {
      zoom_user();
    });

    if (jQuery('.page-id-37967').length) {
      if (get_zoom_user_time_feild != '') {
        window.setInterval(zoom_user, main_get_zoom_user_time_feild);
      }
    }

    var set_resource_video = resources_video_fancybox();
  });

  jQuery(window).on('hashchange', function (e) {
    var hashlocation = window.location.hash;
    if (jQuery(hashlocation).length) {
      jQuery(hashlocation).trigger('click');
    }
  });

  jQuery(document).on('click', '.resources_video_popup', function (e) {
    if (!jQuery(this).data('myvideoresources')) {
      resources_video_fancybox();
      jQuery(this).trigger('click');
    }
  });

  jQuery(document).on('click', '#my_profile_page div.oxy-tab', function (e) {
    var text = jQuery(this).text();
    jQuery('#headline-10-389 .ct-span').text(text);
  });

  jQuery(document).on('click', '.app_scroler a', function (event) {
    jQuery('#my_profile').trigger('click');
    //var pos = $('html, body').animate({scrollTop: $('#my_profile_page').offset().top -40 }, 'fast');
  });

  jQuery(document).on('click', '.my_dashboard_menu a', function (event) {
    jQuery('#edit_my_profile').trigger('click');
    //var pos = $('html, body').animate({scrollTop: $('#my_profile_page').offset().top -40 }, 'fast');
  });

  jQuery(document).on('click', 'body #wpd-bubble-wrapper', function (event) {
    event.preventDefault();
    jQuery('#custom-chat-box').toggleClass('chatbox-show');
  });

  jQuery(document).on('click', 'body .set_chat_close_btn', function () {
    jQuery('#custom-chat-box').toggleClass('chatbox-show');
  });

  jQuery.expr[':'].icontains = function (a, i, m) {
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
  };

  jQuery(document).on('click', '.custom_session_search_btn', function () {
    var search_val = jQuery('.search_sessions').val();

    var add_class = 'show-filterred-session';

    if (!filterred) {
      add_class += ' show-session';
    }

    jQuery('.da_schedule_single')
      .removeClass('show-filterred-session')
      .addClass('hide-session');
    jQuery('.da_schedule_single:icontains("' + search_val + '")').removeClass(
      'hide-session'
    );
    jQuery('.da_schedule_single:icontains("' + search_val + '")').addClass(
      add_class
    );
  });

  jQuery(document).on('keyup', '.search_sessions', function (e) {
    var search_val = jQuery('.search_sessions').val();
    var add_class = 'show-filterred-session';

    if (!filterred) {
      add_class += ' show-session';
    }

    jQuery('.da_schedule_single')
      .removeClass('show-filterred-session')
      .addClass('hide-session');
    jQuery('.da_schedule_single:icontains("' + search_val + '")').removeClass(
      'hide-session'
    );
    jQuery('.da_schedule_single:icontains("' + search_val + '")').addClass(
      add_class
    );
  });

  jQuery(document).on('keyup', '.search_networking_attendees', function (e) {
    var search_val = jQuery('.search_networking_attendees').val();
    var add_class = 'show-filterred-session';

    if (!filterred) {
      add_class += ' show-session';
    }

    jQuery('.chatroom_networking_attendees_list')
      .removeClass('show-filterred-session')
      .addClass('hide-session');
    jQuery(
      '.chatroom_networking_attendees_list:icontains("' + search_val + '")'
    ).removeClass('hide-session');
    jQuery(
      '.chatroom_networking_attendees_list:icontains("' + search_val + '")'
    ).addClass(add_class);
  });

  jQuery(document).on(
    'click',
    '.custom_networking_attendees_btn',
    function (e) {
      var search_val = jQuery('.search_networking_attendees').val();
      var add_class = 'show-filterred-session';

      if (!filterred) {
        add_class += ' show-session';
      }

      jQuery('.chatroom_networking_attendees_list')
        .removeClass('show-filterred-session')
        .addClass('hide-session');
      jQuery(
        '.chatroom_networking_attendees_list:icontains("' + search_val + '")'
      ).removeClass('hide-session');
      jQuery(
        '.chatroom_networking_attendees_list:icontains("' + search_val + '")'
      ).addClass(add_class);
    }
  );

  jQuery(document).on('click', '.print_schedule_wrap', function (e) {
    e.preventDefault();
    var session_href = jQuery(this).attr('href');
    jQuery.ajax({
      method: 'POST',
      url: mypl_custom.ajax_url,
      data: { action: 'mypl_all_session_list', all_session_link: session_href },
      success: function (response) {
        window.open(response);
      },
    });
  });

  jQuery(document).on('click', '.get_view_my_profile_link', function (e) {
    var view_profile_page_href = jQuery('.get_view_my_profile_link a').attr(
      'href'
    );
    window.location.href = view_profile_page_href;
    //window.open(view_profile_page_href);
  });

  jQuery('#menu-main-menu .menu-item a').click(function () {
    jQuery('.oxy-nav-menu').removeClass('oxy-nav-menu-open');
  });

  jQuery(document).on('click', '.help-contact-us-btn', function (e) {
    e.preventDefault();

    jQuery('.help_tawk_section').addClass('show_tawk_pop_up');
  });

  jQuery(document).on('click', '.show_tawk_close_btn', function (e) {
    e.preventDefault();
    jQuery('.help_tawk_section').removeClass('show_tawk_pop_up');
  });

  jQuery('.help_tawk_section').click(function () {
    jQuery('.help_tawk_section').removeClass('show_tawk_pop_up');
  });

  jQuery(document).on('keyup', function (event) {
    if (event.key == 'Escape') {
      jQuery('.help_tawk_section').removeClass('show_tawk_pop_up');
    }
  });

  jQuery(document).on('click', '.talk_to_new_window', function (e) {
    window.open(
      jQuery(this).attr('href'),
      'newwindow',
      'width=375, height=538'
    );
    return false;
  });

  jQuery(document).on('click', '.session_delete', function () {
    var session_id = jQuery(this).data('id');
    swal(
      {
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      },
      function (isConfirm) {
        if (isConfirm) {
          jQuery.ajax({
            method: 'POST',
            url: mypl_custom.ajax_url,
            //dataType: "json",
            data: { action: 'mypl_delete_session', session_id: session_id },
            success: function (response) {
              if (response == 'success') {
                jQuery(`.da_session_${session_id}`).remove();
              }
            },
          });
        }
      }
    );
  });

  jQuery('.owl-carousel').owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    autoplay: true,
    items: 1,
  });
})(jQuery);

jQuery('.embed-vedio-resource').on('click', function (e) {
  e.preventDefault();
  jQuery('.custom-popup-section').removeClass('active-popup');
  jQuery('body').addClass('show-embed-video-popup');
  var imgId = jQuery(this).attr('data-id');
  jQuery('.thumbnai_popup_' + imgId).addClass('active-popup');
});

jQuery('.embed-video-icon').on('click', function (e) {
  e.preventDefault();
  jQuery('.custom-popup-section').removeClass('active-popup');
  jQuery('body').addClass('show-embed-video-popup');
  var imgId = jQuery(this).attr('data-id');
  jQuery('.thumbnai_popup_' + imgId).addClass('active-popup');
});

jQuery('.custom-popup-close').on('click', function (e) {
  e.preventDefault();
  jQuery('.custom-popup-section').removeClass('active-popup');
  jQuery('body').removeClass('show-embed-video-popup');
  var imgId = jQuery('.embed-vedio-resource').attr('data-id');
  jQuery('.thumbnai_popup_' + imgId).removeClass('active-popup');
});

jQuery('.sponsor_content').find('a').attr('target', '_blank');

/* Biographic info functionality */
jQuery(document).on(
  'change',
  ".acf-field[data-name='description'] textarea",
  function () {
    let txt_val = jQuery(this).val();
    jQuery(document).find('#bio_textarea').val(txt_val);
  }
);

jQuery(document).on('ajaxComplete', function (event, xhr, settings) {
  let curUrl = window.location.href;
  if (
    curUrl.includes('reset-password-2') &&
    curUrl.includes('&login') &&
    'responseJSON' in xhr &&
    xhr.responseJSON.status === true
  ) {
    let loginId = curUrl.slice(curUrl.indexOf('login=') + 6);
    jQuery.ajax({
      method: 'POST',
      url: mypl_custom.ajax_url,
      data: { action: 'add_password_reset_log', loginId: loginId },
      success: function (response) {
        console.log('SUCCESS');
      },
    });
  }
});

//Speaker Handouts Code
jQuery(
  '.acf-input-wrap #acf-field_61c61a9d0b29c, .acf-input #acf-field_61c61ab80b29d'
).on('change', function (e) {
  jQuery('.acf-input-wrap #acf-field_61c61b7b0b2a1').val('yes');
});

/* user's current location for sessiosn timzeon */
jQuery.get('https://ipapi.co/json', function (data, status) {
  var tz;
  if (status === 'success') {
    tz = data['timezone'];
    timez = tz;
    if (timez !== jQuery('#show-local-tz').data('tz')) {
      jQuery.ajax({
        url: mypl_custom.ajax_url,
        type: 'POST',
        data: {
          cur_tz: timez,
          action: 'update_cur_tz_val',
        },
        success: function (response) {
          if (response) {
            jQuery('#_tab_content-10-449').load(
              location.href + ' #_tab_content-10-449>*',
              ''
            );
          }
        },
      });
    }
  }
});

jQuery('input[name=show-tz]').on('change', function () {
  if (jQuery(this).val() === 'local') {
    jQuery('.custom-tz-wrapper').addClass('hide');
    jQuery('#show-custom-tz').parent().removeClass('checked');
    jQuery('#show-local-tz').parent().addClass('checked');
  } else {
    jQuery('.custom-tz-wrapper').removeClass('hide');
    jQuery('#show-custom-tz').parent().addClass('checked');
    jQuery('#show-local-tz').parent().removeClass('checked');
  }
});

if (jQuery('#show-custom-tz').is(':checked')) {
  jQuery('.custom-tz-wrapper').removeClass('hide');
} else {
  jQuery('.custom-tz-wrapper').addClass('hide');
}

jQuery('body').on(
  'click',
  '.timezone_popup>div.ct-div-block>.ct-text-block',
  function (e) {
    if (jQuery('#show-custom-tz').is(':checked')) {
      jQuery('.custom-tz-wrapper').removeClass('hide');
      jQuery('#show-custom-tz').parent().addClass('checked');
      jQuery('#show-local-tz').parent().removeClass('checked');
    } else {
      jQuery('.custom-tz-wrapper').addClass('hide');
      jQuery('#show-custom-tz').parent().removeClass('checked');
      jQuery('#show-local-tz').parent().addClass('checked');
    }
  }
);

jQuery('body').on('submit', '#update_timezone', function (e) {
  e.preventDefault();
  var serializedArrdata = jQuery(this).serializeArray();
  var data = {};
  jQuery.each(serializedArrdata, function (_, kv) {
    data[kv.name] = kv.value;
  });

  let user_sel_timezone = data['user_sel_timezone'];
  let showtz = data['show-tz'];
  if (user_sel_timezone != '') {
    jQuery.ajax({
      url: mypl_custom.ajax_url,
      type: 'POST',
      data: {
        action: 'update_users_schedule_tz_field',
        timezone: user_sel_timezone,
        'show-tz': showtz,
      },
      beforeSend: function () {
        jQuery('.tz-frm-message').html(
          "please wait<span class='tz_loader__dot'>.</span><span class='tz_loader__dot'>.</span><span class='tz_loader_dot'>.</span>"
        );
      },
      success: function (data) {
        location.reload();
      },
    });
  }
});
