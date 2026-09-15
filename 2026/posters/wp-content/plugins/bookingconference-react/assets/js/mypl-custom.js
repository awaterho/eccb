var sections = {
  schedule: "section-31-449",
  speakers: "section-25-73",
  sponsors: "partners-section",
  author: "Featured-attendees",
  "my-profile": "pmmp",
  posters: "poster_presenters_section",
};

var activate_menu_link = function () {
  var url = window.location.href;
  let substr;

  if (!jQuery("body.home").length) {
    jQuery.each(sections, function (i, v) {
      console.log(`${i} - ${v}`);
      substr = url.indexOf(`/${i}/`);
      if (substr >= 0) {
        jQuery(`.menu-item a[href="/#${v}"]`).addClass("active");
        jQuery(`.menu-item a[href="/#${v}"]`).parent().addClass("active");

        jQuery(`.menu-item a[href="#${v}"]`).parent().addClass("active");
        jQuery(`.menu-item a[href="#${v}"]`).parent().addClass("active");
      }
    });
  }
};

jQuery(window).on("load", function () {
  jQuery(".loader_img").hide();
  jQuery(".wpdiscuz-date-sort-desc").trigger("click");
});

jQuery(document).ready(function ($) {
  jQuery(".meeting_message_ongoing").hide();
  jQuery(".meeting_message_next").hide();
  jQuery(".meeting_message_finished").hide();
  jQuery(".loader_img").hide();
  /*jQuery('#menu-header-watch-now').hide();
    jQuery('#menu-header-watch-now-2').hide();*/

  jQuery(".profile-points-type-name").html(book_custom.rewards_point_label);
  var label_balance = jQuery(".form-table label").text();

  jQuery(".section_my_profile .form-table label").each(function () {
    if (jQuery(this).text() == "Your Balances") {
      jQuery(this).text("Points Awarded");
    }
  });

  if (jQuery('[data-object="gamipress_user_earnings"]').length) {
    jQuery('[data-object="gamipress_user_earnings"]').hide();
  }

  /*if ( jQuery('[type="date"]').prop('type') != 'date' ) {*/
  if (jQuery("#sa_st_date").length) {
    jQuery("#sa_st_date").datepicker({
      dateFormat: "yy-mm-dd",
    });
  }
  if (jQuery("#sa_end_date").length) {
    jQuery("#sa_end_date").datepicker({
      dateFormat: "yy-mm-dd",
    });
  }
  /*}*/

  jQuery(document).on("click", ".oct-week", function () {
    jQuery(".time-slot-ul").removeClass("ul-open-mobile");
    jQuery(".time-slot-ul .slots-back").remove();
    if (jQuery(window).width() < 980) {
      jQuery(".time-slot-ul").addClass("ul-open-mobile");
      setTimeout(function () {
        jQuery(".time-slot-ul").append(
          '<span class="slots-back"><i class="fa fa-chevron-left"></i></span>'
        );
      }, 5000);
    }
  });

  jQuery(document).on("click", ".slots-back", function () {
    jQuery(".time-slot-ul").removeClass("ul-open-mobile");
  });

  jQuery(document).on("click", ".slots-close", function () {
    jQuery(".time-slot-ul").removeClass("ul-open-mobile");
  });

  if (jQuery(window).width() < 980) {
    jQuery(".sponser_dash_calender .profile-date-block").addClass(
      "ul-open-mobile"
    );
    setTimeout(function () {
      jQuery(".sponser_dash_calender .profile-date-main-block").append(
        '<span class="slots-close"><i class="fa fa-close"></i></span>'
      );
    }, 5000);
  } else {
    jQuery(".sponser_dash_calender .profile-date-block").removeClass(
      "ul-open-mobile"
    );
  }

  var adjust_all = function () {
    jQuery(".main-sponsor-content").height(
      jQuery(".ct-new-columns.col_calendar").height() + 150
    );
  };

  jQuery(document).on(
    "click",
    ".main-sponsor-content .bookingapptmodal",
    function () {
      setTimeout(function () {
        adjust_all();
      }, 500);
    }
  );

  jQuery(".channel-page .tab-item > a").on("click", function () {
    setTimeout(function () {
      customscroll();
      adjust_all();
    }, 1600);
  });

  /* jQuery("#update_sponser_schedule").validate({
        
         rules: {
                 sa_st_date : "required",
                 sa_end_date : "required",
                 duration : "required",
                 interval : "required",
                 start_time : "required",
                 end_time : "required"
             },
             messages: {
 
                 sa_st_date : "Please add start date",
                 sa_end_date : "Please add end date",
                 duration : "Please add meeting length",
                 interval : "Please add time beetween metting",
                 start_time : "Please add start time",
                 end_time : "Please add end time"
     
             },
 
             submitHandler: function(form) {
                form.submit();
             }
           
     });*/

  /* Update Staff Availability Schedule*/
  jQuery(document).on("click", "#update_sponser_schedule", function (e) {
    console.log("click in");
    e.preventDefault();

    var ajax_url = mypl_custom.ajax_url;
    var sponser_id = jQuery(this).data("sponser_id");

    jQuery(".error").html("");

    if (jQuery("#sa_st_date").datepicker("getDate") === null) {
      jQuery(".error-sdate").text("Please add start date");
      return false;
    } else if (jQuery("#sa_end_date").datepicker("getDate") === null) {
      jQuery(".error-edate").text("Please add end date");
      return false;
    } else if (jQuery("#duration").val() == "0") {
      console.log(jQuery("#duration").val());
      jQuery(".error-duration").text("Please add meeting length");
      return false;
    } else if (jQuery("#interval").val() == "0") {
      console.log(jQuery("#interval").val());
      jQuery(".error-interval").text("Please add time beetween metting");
      return false;
    } else if (jQuery("#start_time").val() == "0") {
      jQuery(".error-stime").text("Please add start time");
      return false;
    } else if (jQuery("#end_time").val() == "0") {
      jQuery(".error-etime").text("Please add end time");
      return false;
    } else {
      jQuery(this).attr("disabled", "disabled");
    }

    var sa_st_date = jQuery("#sa_st_date")
      .datepicker({ dateFormat: "yy-mm-dd" })
      .val();
    var sa_end_date = jQuery("#sa_end_date")
      .datepicker({ dateFormat: "yy-mm-dd" })
      .val();
    var interval = jQuery("#interval").val();
    var duration = jQuery("#duration").val();
    var day_starttime = jQuery("#start_time").val();
    var day_endtime = jQuery("#end_time").val();

    var postdata = {
      sponser_id: sponser_id,

      sa_st_date: sa_st_date,
      sa_end_date: sa_end_date,
      interval: interval,
      duration: duration,
      day_starttime: day_starttime,
      day_endtime: day_endtime,
      action: "update_sponser_schedule",
    };

    console.log(postdata);

    jQuery.ajax({
      url: ajax_url,
      type: "POST",
      data: postdata,
      dataType: "html",
      success: function (response) {
        console.log(response);
        location.reload();
      },
      error: function (xhr, ajaxOptions, thrownError) {},
    });
  });

  jQuery(document).on("click", "#save_check_rep", function () {
    var ajax_url = mypl_custom.ajax_url;
    var user_email = jQuery("#search_user_rep").val();

    var postdata = {
      user_email: user_email,
      action: "check_and_save_rep",
    };
    jQuery.ajax({
      url: ajax_url,
      type: "POST",
      data: postdata,
      success: function (response) {
        var res = JSON.parse(response);

        jQuery(".error_ress").html("");
        jQuery(".success_ress").html("");

        jQuery(".rep_user_tr").append(res.html);
        jQuery(".error_ress").append(res.error);
        jQuery(".success_ress").append(res.success);

        setTimeout(function () {
          jQuery(".error_ress").html("");
          jQuery(".success_ress").html("");
        }, 10000);
        jQuery("#search_user_rep").val("");
        //  location.reload();
      },
      error: function (xhr, ajaxOptions, thrownError) {},
    });
  });

  jQuery(document).on("click", ".remove_rep_user", function () {
    var $this = jQuery(this);
    jQuery(this).text("Please Wait...");
    var ajax_url = mypl_custom.ajax_url;
    var user_id = jQuery(this).data("id");
    var sp_user_id = jQuery(this).data("sp_id");

    var postdata = {
      user_id: user_id,
      sp_user_id: sp_user_id,
      action: "remmove_rep_user",
    };
    jQuery.ajax({
      url: ajax_url,
      type: "POST",
      data: postdata,
      success: function (response) {
        var res = JSON.parse(response);
        jQuery(".success_ress").append(res.success);
        $this.text("Redirecting...");

        setTimeout(function () {
          location.reload();
        }, 5000);
      },
      error: function (xhr, ajaxOptions, thrownError) {},
    });
  });

  jQuery(document).on("change", "#sa_st_date", function () {
    var ajax_url = mypl_custom.ajax_url;
    var date = jQuery(this).val();
    var sponsor_id = jQuery(this).data("sponsor_id");
    console.log(date);
    console.log(sponsor_id);

    var postdata = {
      date: date,
      sponsor_id: sponsor_id,
      action: "get_sponsor_remaining_slots",
    };
    jQuery.ajax({
      url: ajax_url,
      type: "POST",
      data: postdata,
      dataType: "html",
      success: function (response) {
        jQuery(".start_end_time").html(response);
        //location.reload();
      },
      error: function (xhr, ajaxOptions, thrownError) {},
    });
  });

  /* Get Calender Next Previous Month */
  jQuery(document).on("click", ".oct_month_change", function () {
    var ajax_url = mypl_custom.ajax_url;
    var calmonth = jQuery(this).data("calmonth");
    var calyear = jQuery(this).data("calyear");
    var calenderdata = {
      calmonth: calmonth,
      calyear: calyear,
      action: "oct_cal_next_prev",
    };

    jQuery.ajax({
      type: "POST",
      url: ajax_url,
      dataType: "html",
      data: calenderdata,
      success: function (response) {
        jQuery(".calendar-wrapper").html(response);
      },
    });
  });

  /* Get Calender Next Previous Month */
  jQuery(document).on(
    "click",
    ".sponser_dash_calender .remove_slot",
    function () {
      var ajax_url = mypl_custom.ajax_url;
      var current_date = jQuery(this).data("current_date");
      var schedule_id = jQuery(this).data("schedule_id");
      var sp_id = jQuery(this).data("sp_id");
      var calenderdata = {
        current_date: current_date,
        schedule_id: schedule_id,
        sp_id: sp_id,
        action: "remove_schedule",
      };

      jQuery.ajax({
        type: "POST",
        url: ajax_url,
        data: calenderdata,
        success: function (response) {
          if (response == "1") {
            location.reload();
          } else {
            alert("Sorry! Slots are already booked!");
          }
        },
      });
    }
  );

  /* Show Provider Time Slot*/
  jQuery(document).on("click", ".appointment-slots .oct-week", function () {
    if (jQuery(this).hasClass("inactive")) {
      return false;
    }
    //jQuery('.loader_img').css("display", "show");
    var ajax_url = mypl_custom.ajax_url;

    var attendee_slot = jQuery("#att_book_sche").val();
    var authorId = jQuery("#author_id").val();

    var selsponserid = jQuery("#sponser_id").val();
    if (selsponserid == 0) {
      // console.log( "CPC - 2.1" );
      alert("Ops! something wrong. Sponser not found");
      return false;
    } else {
      //console.log( "CPC - 2.2" );
      jQuery("#oct .loader").show();
      var calrowid = jQuery(this).data("calrowid");
      var seldate = jQuery(this).data("seldate");
      var service_id = jQuery(".selected_services").data("sid");

      var calenderdata = {
        selsponserid: selsponserid,
        attendee_slot: attendee_slot,
        authorId: authorId,
        seldate: seldate,
        action: "oct_get_provider_slots",
      };

      jQuery(".oct-week").each(function () {
        jQuery(this).removeClass("active");
      });

      jQuery(".oct-show-time").each(function () {
        jQuery(this).removeClass("shown");
        jQuery(this).removeAttr("style");
      });
      jQuery(this).addClass("active");

      // console.log( "CP - 3" );

      jQuery.ajax({
        type: "POST",
        url: ajax_url,
        dataType: "html",
        data: calenderdata,
        success: function (response) {
          //jQuery('.loader_img').css("display", "none");
          jQuery("#oct .loader").hide();
          jQuery(".curr_selected_row" + calrowid).addClass("shown");
          jQuery(".curr_selected_row" + calrowid).css("display", "block");
          jQuery(".oct_day_slots").html(response);
        },
      });
    }
  });

  /* Create New Appointment */
  jQuery(document).on("click", ".new-appt-conference", function () {
    var $this = jQuery(this);
    var ajax_url = mypl_custom.ajax_url;
    var start_time = jQuery(this).data("start_time");
    var end_time = jQuery(this).data("end_time");
    var date = jQuery(this).data("date");
    var customformtime = jQuery(this).data("customformtime");
    var sponser_id = jQuery(this).data("sponser_id");
    var img_loader = jQuery(this).find(".loader_img");

    var page_role = jQuery("#page_role").val();
    //var sponsor_role = jQuery( '#sponsor_role' ).val();
    // console.log(page_role);

    var calenderdata = {
      start_time: start_time,
      end_time: end_time,
      sponser_id: sponser_id,
      date: date,
      page_role: page_role,
      //sponsor_role : sponsor_role,
      action: "new_appt_conference",
    };

    jQuery("._2IrBWuPQTq")
      .children(".conference_text_class")
      .text("New Appointment");
    jQuery("._2IrBWuPQTq").removeClass("_1byk5uh6y7");
    jQuery("._2OQqVeh6S4").removeClass("_1Es3W-g9AL");
    jQuery(this).children(".conference_text_class").text(customformtime);
    jQuery(this).addClass("_1byk5uh6y7");
    jQuery(this).parent().find("button").addClass("_1Es3W-g9AL");
    jQuery(this)
      .parent()
      .find("button")
      .click(function () {
        img_loader.css("display", "block");
        jQuery(".new-appt-conference").prop("disabled",true);
        jQuery(this).attr("disabled", "true");
        jQuery.ajax({
          type: "POST",
          url: ajax_url,
          data: calenderdata,
          success: function (response) {
            if (response !== "") {
              var $del_button =
                "<a href='javascript:void(0);' class='btn btn-primary delete_appt front_del' data-customformtime='" +
                customformtime +
                "' data-date='" +
                date +
                "' data-start_time='" +
                start_time +
                "' data-end_time='" +
                end_time +
                "' data-sponser_id='" +
                sponser_id +
                "' data-id='" +
                response +
                "' style='margin: 5px;'>Delete</a>";
              jQuery("._1Es3W-g9AL").css("display", "none");
            }
            jQuery(".new-appt-conference").prop("disabled",false);
            img_loader.css("display", "block");

            $this.removeClass("new-appt-conference");
            $this.removeClass("btn-primary");
            $this.addClass("btn-default");

            img_loader.css("display", "none");
            $this.text("Booked");

            $this.closest(".timeslot-people").append($del_button);

            setTimeout(function () {}, 1000);
            jQuery(".main_slot_sucess").fadeIn("fast", function () {
              jQuery(".main_slot_sucess").fadeOut(5000);
            });
          },
        });
      });
  });

  jQuery(document).on("click", ".delete_appt", function () {
    var $this = jQuery(this);
    var id = jQuery(this).data("id");
    var ajax_url = mypl_custom.ajax_url;
    var $this = jQuery(this);
    var start_time = jQuery(this).data("start_time");
    var end_time = jQuery(this).data("end_time");
    var sponser_id = jQuery(this).data("sponser_id");
    var date = jQuery(this).data("date");
    var customformtime = jQuery(this).data("customformtime");

    var dataString = { id: id, action: "remove_appt" };

    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to Delete Schedule Appointment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        jQuery(this).attr("disabled", "true");
        jQuery.ajax({
          type: "POST",
          url: ajax_url,
          data: dataString,
          success: function (response) {
            if (!$this.hasClass("front_del")) {
              $this.closest("td").remove();
            } else {
              var $html =
                '<a href="javascript:void(0);" data-start_time="' +
                start_time +
                '" data-customformtime="' +
                customformtime +
                '" data-end_time="' +
                end_time +
                '" data-title="" data-date="' +
                date +
                '" data-sponser_id="' +
                sponser_id +
                '" data-toggle="confirmation" class="new-appt-conference _2IrBWuPQTq _4rcXoQPLhG _1Qg-rkOB2V _2zIir_wMTE btn btn-primary "><img src="" style="width: 26px; display:none;" class="loader_img" data-loading_time=""><span class="loader_img" style="width: 26px; display:none;"><i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i></span><span class="conference_text_class">New Appointment</span></a><button tabindex="-1" data-container="confirm-button" class="_2OQqVeh6S4 _4rcXoQPLhG _1Qg-rkOB2V _2zIir_wMTE confirm-button-exit-done" type="button">Confirm</button>';
              $this.closest(".timeslot-people").html($html);
            }
          },
        });
      }
    });
  });

  jQuery(document).on("click", ".attendee_schedule", function () {
    jQuery("html, body").animate(
      { scrollTop: jQuery(".attendee_section").offset().top },
      500
    );
    jQuery(".col_calendar").toggleClass("active");
    return false;
  });

  jQuery(document).on("click", ".bookingapptmodal", function () {
    jQuery("html, body").animate(
      {
        scrollTop: jQuery("#my_profile_page").offset().top,
      },
      500
    );

    jQuery(".col_calendar").toggleClass("active");
    return false;
  });

  jQuery(document).on("click", ".appointment-slots .close-button", function () {
    jQuery(".col_calendar").removeClass("active");
    jQuery(".main-sponsor-content").css("height", "auto");
  });

  jQuery(document).on("click", ".oxy-tab", function () {
    var elm = jQuery(this).find(".ct-link");
    if (elm.length) {
      link_url = elm.attr("href");
      window.location.href = link_url;
    }
  });

  jQuery(window).on("resize", function (e) {
    checkScreenSize();
  });

  checkScreenSize();

  function checkScreenSize() {
    var newWindowWidth = jQuery(window).width();
    if (newWindowWidth <= 768) {
      jQuery(".menu-item-has-children").addClass("mycn-sub-menu");
      jQuery(".menu-item-has-children").append(
        '<span class="plus-icon"></span>'
      );
      jQuery(document).on("click", ".oct-week", function () {
        jQuery("body").toggleClass("active-calendar");
        return false;
      });
    } else {
      jQuery(".menu-item-has-children").removeClass("mycn-sub-menu");
      jQuery(".plus-icon").remove();
    }
  }

  jQuery(document).on("click", ".plus-icon", function () {
    jQuery(this).parent("li").toggleClass("active");
    return false;
  });

  /*jQuery(document).on('click','#menu-main-menu .menu-item a',function(){
        var section_id = jQuery(this).attr('href').replace('/','');
        
        section_id = section_id .replace('#','');
        jQuery([document.documentElement, document.body]).animate({
            scrollTop: jQuery("#"+section_id).offset().top - 150
        }, 1000);
    
    });*/

  // jQuery(document).ready(function () {
  //   jQuery("#menu-main-menu .menu-item a").bind("click", function (e) {
  //     // prevent hard jump, the default behavior

  //     debugger;
  //     var target = jQuery(this).attr("href"); // Set the target as variable
  //     var target = target.replace("/", "");

  //     // perform animated scrolling by getting top-position of target-element and set it as scroll target
  //     if (target !== undefined && typeof jQuery(target).offset().top !== "undefined") {
  //       e.preventDefault();
  //       jQuery("html, body")
  //         .stop()
  //         .animate(
  //           {
  //             scrollTop: jQuery(target).offset().top - 150,
  //           },
  //           600,
  //           function () {
  //             //location.hash = target; //attach the hash (#jumptarget) to the pageurl
  //           }
  //         );

  //       return false;
  //     }
  //   });
  // });

  jQuery(window)
    .scroll(function () {
      var scrollDistance = jQuery(window).scrollTop();
      let activated = 0;

      jQuery(".home .ct-section").each(function (i) {
        var $section_position = jQuery(this).position().top - 200;
        // console.log( `scrollDistance: ${scrollDistance} - $section_position: ${$section_position}` );
        if ($section_position <= scrollDistance) {
          //   if( activated == 0 ){

          let this_id = jQuery(this).attr("id");

          if (
            jQuery(`.menu-item a[href="/#${this_id}"]`).length ||
            jQuery(`.menu-item a[href="#${this_id}"]`)
          ) {
            if (jQuery(`.menu-item a[href="/#${this_id}"]`).is(":visible")) {
              jQuery(".menu-main-menu-container li.active").removeClass(
                "active"
              );
              jQuery(".menu-item a.active").removeClass("active");

              // console.log( `Section: ${this_id} - Visible: ${jQuery( `.menu-item a[href="/#${this_id}"]` ).is(":visible")} - scrollDistance: ${scrollDistance} - $section_position: ${$section_position}` );

              jQuery(`.menu-item a[href="/#${this_id}"]`).addClass("active");
              jQuery(`.menu-item a[href="/#${this_id}"]`)
                .parent()
                .addClass("active");
              activated = 1;
            }

            if (jQuery(`.menu-item a[href="#${this_id}"]`).is(":visible")) {
              jQuery(".menu-main-menu-container li.active").removeClass(
                "active"
              );
              jQuery(".menu-item a.active").removeClass("active");

              jQuery(`.menu-item a[href="#${this_id}"]`)
                .parent()
                .addClass("active");
              jQuery(`.menu-item a[href="#${this_id}"]`)
                .parent()
                .addClass("active");
              activated = 1;
            }
            // }
          }
        }
      });
      if (jQuery("body").hasClass("home")) {
        if (
          !jQuery(".menu-main-menu-container li.active").length ||
          activated == 0
        ) {
          jQuery(".menu-main-menu-container li.active").removeClass("active");
          jQuery(".menu-item a.active").removeClass("active");

          jQuery(`.menu-item a`).first().addClass("active");
          jQuery(`.menu-item a`).first().parent().addClass("active");
        }
      }
    })
    .scroll();

  jQuery(document).on("click", "#my_profile_page .oxy-tab", function () {
    jQuery([document.documentElement, document.body]).animate(
      {
        scrollTop: jQuery("body").offset().top + 280,
      },
      1000
    );
  });

  /** Check URL Have Hash Value **/
  // var hash = window.location.hash;
  // if (hash.length) {
  //   jQuery([document.documentElement, document.body]).animate(
  //     {
  //       scrollTop: jQuery(hash).offset().top - 170,
  //     },
  //     1000
  //   );
  // }

  activate_menu_link();
});

jQuery(document).on("click", ".attendee_app_slot .oct-week", function () {
  // if (jQuery(this).hasClass('inactive')) {
  //     return false;
  // }
  // var ajax_url = mypl_custom.ajax_url;
});

/**
 * Start - Sugeestion modal
 **/

jQuery(document).on("click", ".suggest-meeting", function () {
  var booking_id = jQuery(this).data("id");
  var modal_class = "meeting_status_" + booking_id;
  jQuery("." + modal_class).toggle();
});

// modal close event
jQuery(document).on("click", ".close-suggest-meeting-popup", function () {
  jQuery(".modal-wrapper").hide();
});

jQuery(document).mouseup(function (e) {
  var container = jQuery(".modal-wrapper");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    container.hide();
  }
});

function save_status_desc_event(postdata) {
  var ajax_url = mypl_custom.ajax_url;
  jQuery.ajax({
    url: ajax_url,
    type: "POST",
    data: postdata,
    success: function (response) {
      if (response == "1a") {
        swal("Meeting has been Approved.");
        location.reload();
      }
      if (response == "1d") {
        swal("Meeting has been declined.");
        location.reload();
      }
      if (response == "1s") {
        location.reload();
      }
    },
  });
}

jQuery(document).on("click", ".meeting_status", function () {
  var book_id = jQuery(this).data("id");
  var status = jQuery(this).data("name");

  var postdata = {
    book_id: book_id,
    status: status,
    action: "save_meeting_status_value",
  };
  save_status_desc_event(postdata);
});

jQuery(document).on("click", ".status_desc_submit", function () {
  var book_id = jQuery(this).data("id");
  var status = jQuery(".suggest-meeting").data("name");
  var text_value = "suggest_text_" + book_id;
  var suggest_textarea = jQuery("." + text_value).val();

  var postdata = {
    book_id: book_id,
    status: status,
    suggest_textarea: suggest_textarea,
    action: "save_meeting_status_value",
  };
  save_status_desc_event(postdata);
});

/**
 * End - Sugeestion modal
 **/
