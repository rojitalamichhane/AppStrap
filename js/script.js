$(window).on("load", function() {
  $(".loader")
    .delay(1000)
    .fadeOut("slow");
});
$(window).on("load", function() {
  // Trigger animation
  // Initialize Wow Animation library
  wow = new WOW({
    boxClass: "wow", // default
    animateClass: "animated", // default
    offset: 250, // default value is 0
    mobile: true, // default
    live: true // default
  });
  wow.init();
});
$(document).ready(function() {
  $("#currentYear").text(new Date().getFullYear());
  $("#sticky-navigation").on("show.bs.collapse", function() {
    $("#nav-icon")
      .removeClass("fa-bars")
      .addClass("fa-times");
    $("#sticky-navigation").css("background", "#222");
  });
  $("#sticky-navigation").on("hide.bs.collapse", function() {
    $("#nav-icon")
      .removeClass("fa-times")
      .addClass("fa-bars");
    $("#sticky-navigation").css("background", "transparent");
  });

  //  Make Banner hight equal to the height off the viewport.
  var windowHeight = $(window).innerHeight();
  var viewportWidth = $(window).innerWidth();
  if (viewportWidth >= 768) {
    $("#introBanner").css("height", windowHeight);
  }

  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      // this refers to window
      $("#sticky-navigation").addClass("scrolled");
      $(".scrollUp").fadeIn();
    } else {
      $("#sticky-navigation").removeClass("scrolled");
      $(".scrollUp").fadeOut();
    }
  });
  // Scroll To Top Animation
  $(".scrollUp").click(function() {
    $("html, body").animate(
      {
        scrollTop: 0
      },
      1000
    );
    return false;
  });

  if ($("#featuresInfo").length > 0) {
    var oTop = $("#featuresInfo").offset().top - window.innerHeight;
    var executed = false;

    $(window).scroll(function() {
      var pTop = $(this).scrollTop();
      if (pTop > oTop - 30 && !executed) {
        start_count();
        executed = true;
      }
    });
  }

  /* smooth scrolling sections */
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html,body").animate(
          {
            scrollTop: target.offset().top - 50
          },
          1000
        );
        return false;
      }
    }
  });
});

function start_count() {
  // Counter Animation Starts Here
  (function($) {
    $.fn.countTo = function(options) {
      options = options || {};

      return $(this).each(function() {
        // set options for current element
        var settings = $.extend(
          {},
          $.fn.countTo.defaults,
          {
            from: $(this).data("from"),
            to: $(this).data("to"),
            speed: $(this).data("speed"),
            refreshInterval: $(this).data("refresh-interval"),
            decimals: $(this).data("decimals")
          },
          options
        );

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(settings.speed / settings.refreshInterval),
          increment = (settings.to - settings.from) / loops;

        // references & variables that will change with each update
        var self = this,
          $self = $(this),
          loopCount = 0,
          value = settings.from,
          data = $self.data("countTo") || {};

        $self.data("countTo", data);

        // if an existing interval can be found, clear it first
        if (data.interval) {
          clearInterval(data.interval);
        }
        data.interval = setInterval(updateTimer, settings.refreshInterval);

        // initialize the element with the starting value
        render(value);

        function updateTimer() {
          value += increment;
          loopCount++;

          render(value);

          if (typeof settings.onUpdate == "function") {
            settings.onUpdate.call(self, value);
          }

          if (loopCount >= loops) {
            // remove the interval
            $self.removeData("countTo");
            clearInterval(data.interval);
            value = settings.to;

            if (typeof settings.onComplete == "function") {
              settings.onComplete.call(self, value);
            }
          }
        }

        function render(value) {
          var formattedValue = settings.formatter.call(self, value, settings);
          $self.html(formattedValue);
        }
      });
    };

    $.fn.countTo.defaults = {
      from: 0, // the number the element should start at
      to: 0, // the number the element should end at
      speed: 7000, // how long it should take to count between the target numbers
      refreshInterval: 100, // how often the element should be updated
      decimals: 0, // the number of decimal places to show
      formatter: formatter, // handler for formatting the value before rendering
      onUpdate: null, // callback method for every time the element is updated
      onComplete: null // callback method for when the element finishes updating
    };

    function formatter(value, settings) {
      return value.toFixed(settings.decimals);
    }
  })(jQuery);

  jQuery(function($) {
    // custom formatting example
    $(".statisticsResult.counter").data("countToOptions", {
      formatter: function(value, options) {
        return value
          .toFixed(options.decimals)
          .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
      }
    });

    // start all the timers
    $(".counter").each(count);

    function count(options) {
      var $this = $(this);
      options = $.extend({}, options || {}, $this.data("countToOptions") || {});
      $this.countTo(options);
    }
  });
}

function runVideoAnimation() {
  var vid = document.getElementById("bgvid");
  var pauseButton = document.querySelector("#polina button");

  function vidFade() {
    vid.classList.add("stopfade");
  }

  if (vid) {
    addEventListener("ended", function(e) {
      // only functional if "loop" is removed
      vid.pause();
      // to capture IE10
      vidFade();
    });
  }
  if (pauseButton) {
    addEventListener("click", function(e) {
      vid.classList.toggle("stopfade");
      if (vid.paused) {
        vid.play();
        pauseButton.innerHTML = "Pause";
      } else {
        vid.pause();
        pauseButton.innerHTML = "Paused";
      }
    });
  }
}
