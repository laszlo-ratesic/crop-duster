$(window).on('load', function () {
  $(window)
    .scroll(function () {
      var windowBottom = $(this).scrollTop() + $(this).innerHeight();
      $('.scroll-reveal').each(function () {
        /* Check the location of each desired element */
        var objectBottom = $(this).offset().top + $(this).outerHeight();

        /* If the element is completely within bounds of the window, fade it in */
        if ((objectBottom * .75) < windowBottom) {
          //object comes into view (scrolling down)
          if ($(this).css('opacity') == 0) {
            $(this).fadeTo(350, 1);
          }
        } else {
          //object goes out of view (scrolling up)
          if ($(this).css('opacity') == 1) {
            $(this).fadeTo(350, 0);
          }
        }
      });
    })
    .scroll(); //invoke scroll-handler on page-load
});
