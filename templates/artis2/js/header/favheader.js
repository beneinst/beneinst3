// Header effect on scoll
jQuery(window).scroll(function() {
  if (jQuery(this).scrollTop() > 1) {
    jQuery('.fav-fixed').addClass("favheader");
  } else {
    jQuery('.fav-fixed').removeClass("favheader");
  }
});



