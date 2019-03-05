// fade in page
// window.onload = function(){
//     $('#content').fadeIn(1500);
// };

// navbar shadow effect
$(function(){
    $(document).scroll(function(){
        var $nav = $("#mainNavBar");
        var $icons = $("#mainNavBar i");
        var $links = $("#mainNavBar a");
        var $header = $("#header");
        var $toggler = $("#mainNavBar .navbar-toggler-icon");
        
        $nav.toggleClass("scrolled-nav", $(this).scrollTop() > 0);
        $icons.toggleClass("scrolled-nav-icon", $(this).scrollTop() > ($header.height() - $nav.height()*1.3));
        $links.toggleClass("scrolled-nav-link", $(this).scrollTop() > ($header.height() - $nav.height()*1.3));
        $toggler.toggleClass("scrolled-toggler", $(this).scrollTop() > ($header.height() - $nav.height()*1.3));
    });
});

