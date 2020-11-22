

/* ********************** header scroll ******************************** */
 $(function() {
        $(window).on("scroll", function() {
            if($(window).scrollTop() > 90) {
                $(".header").addClass("header_top");
            } else {
                //remove the background property so it comes transparent again (defined in your css)
               $(".header").removeClass("header_top");
            }
        });
    });
/* ********************** header scroll end******************************** */

/* loader */
 $(window).on ('load', function (){
   $('#loader').delay(100).fadeOut('slow');
   $('#loader-wrapper').delay(500).fadeOut('slow');
 });
/* loader */
new WOW().init();

