'use strict';
$(document).ready(function() {
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1000,
        outDuration: 800,
        linkElement: 'a:not([target="_blank"]):not([href^="#"]),  .animsition-link',
        loading: true,
        loadingParentElement: 'body',
        loadingClass: 'animsition-loading',
        loadingInner: '<img src="./assets/images/icons/spin.svg" />',
        timeout: false,
        timeoutCountdown: 500,
        onLoadEvent: true,
        browser: ['animation-duration', '-webkit-animation-duration'],
        overlay: false,
        overlayClass: 'animsition-overlay-slide',
        overlayParentElement: 'body',
        transition: function(url) { window.location.href = url; }
    });
});