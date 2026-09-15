/*
 * Archive shim for the static eccb2026.org capture. Two jobs:
 *
 * 1. Forms. The ones that remain (contact, sign in, sign up, and the poster and
 *    registration forms inside the ISCB embeds) posted to October CMS or Joomla
 *    backends that this archive does not have. They are neutralised and
 *    labelled, rather than left to silently reload the page on submit. The
 *    footer newsletter signup is not handled here; it was removed outright.
 *
 * 2. Iframe height. Each embed measures itself and postMessages its height to
 *    the page, which is how the live site sized these iframes. That still
 *    works, but it is the embed's script talking to the page's script, and if
 *    either end misses a beat the iframe sits at the browser default of 150px.
 *    Since the embeds are now same origin, the height can simply be measured
 *    directly. That runs here as a safety net alongside the original path.
 */
(function () {
  "use strict";

  /* -------------------------------------------------------------------- */
  /* Forms                                                                  */
  /* -------------------------------------------------------------------- */

  var NOTICE =
    "This form is part of a static archive. It is not connected to a server and cannot be submitted.";

  function neutralise(form) {
    if (form.dataset.archiveHandled) {
      return;
    }
    form.dataset.archiveHandled = "1";

    form.removeAttribute("action");
    form.removeAttribute("data-request");
    form.removeAttribute("data-request-success");
    form.removeAttribute("data-request-error");
    form.removeAttribute("data-request-validate");
    form.setAttribute("aria-disabled", "true");

    form.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
      },
      true,
    );

    form
      .querySelectorAll("input, select, textarea, button")
      .forEach(function (field) {
        if (field.type !== "hidden") {
          field.disabled = true;
        }
      });

    var notice = document.createElement("div");
    notice.className = "archive-notice";
    notice.setAttribute("role", "note");
    notice.innerHTML =
      '<strong class="archive-notice__title">Archived page</strong>' +
      '<span class="archive-notice__body">' +
      NOTICE +
      "</span>";
    form.insertAdjacentElement("beforebegin", notice);
  }

  /* -------------------------------------------------------------------- */
  /* Iframe height                                                          */
  /* -------------------------------------------------------------------- */

  var MIN_HEIGHT = 400;

  function contentHeight(frame) {
    var doc = frame.contentDocument;
    if (!doc || !doc.documentElement) {
      return 0;
    }
    var el = doc.documentElement;
    var body = doc.body;
    return Math.max(
      el.scrollHeight,
      el.offsetHeight,
      body ? body.scrollHeight : 0,
      body ? body.offsetHeight : 0,
    );
  }

  function fit(frame) {
    var measured = contentHeight(frame);
    if (!measured) {
      return;
    }
    var target = Math.max(measured, MIN_HEIGHT);
    // Only write on a real change. Setting the height reflows the embed, which
    // would otherwise bounce between two values forever.
    if (Math.abs(parseInt(frame.style.height, 10) - target) > 2) {
      frame.style.height = target + "px";
    }
  }

  function watch(frame) {
    if (frame.dataset.archiveSized) {
      return;
    }
    frame.dataset.archiveSized = "1";
    frame.style.minHeight = MIN_HEIGHT + "px";

    var pending = null;
    function schedule() {
      clearTimeout(pending);
      pending = setTimeout(function () {
        fit(frame);
      }, 100);
    }

    function attach() {
      var doc = frame.contentDocument;
      if (!doc || !doc.body) {
        return;
      }
      fit(frame);
      // The embeds render tables and toggle abstract panels after load.
      new MutationObserver(schedule).observe(doc.body, {
        childList: true,
        subtree: true,
        attributes: true,
      });
      if (typeof ResizeObserver === "function") {
        new ResizeObserver(schedule).observe(doc.documentElement);
      }
      doc.addEventListener("click", schedule, true);
    }

    // Fires on first paint and again after every in-iframe navigation.
    frame.addEventListener("load", function () {
      attach();
      setTimeout(schedule, 300);
    });
    attach();
    window.addEventListener("resize", schedule);
  }

  function run() {
    document.querySelectorAll("form").forEach(neutralise);
    document.querySelectorAll("iframe").forEach(function (frame) {
      try {
        watch(frame);
      } catch (e) {
        /* cross origin iframe: leave it to the postMessage path */
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
