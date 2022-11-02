$('.navbar .leftmenutrigger').on('click', function(e) {
    $('.side-nav').toggleClass("open");
    $('.navbar .leftmenutrigger .openbt').toggleClass('openbt-close');
    $('.navbar .leftmenutrigger .closebt').toggleClass('closebt-open');
    $('.navbar').find('.collapse').toggleClass('show');
    if (collapse.className('show')) {

        $(".collapse").addClass("show");
    } else {

        $(".collapse").removeClass("show");

    }

    e.preventDefault();
});