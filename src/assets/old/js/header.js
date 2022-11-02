$(document).ready(function() {

    $(window).scroll(function() {
        if ($(this).scrollTop() > 0) {
            $('header').addClass('header2');
            $('.logoo').css('display', 'block');
            $('.menn').css('color', '#72c0ff');

        } else {
            $('header').removeClass('header2');
            $('.logoo').css('display', 'none');
            $('.menn').css('color', '#72c0ff');
        }
    });

    $(window).scroll(function() {
        if ($(this).width() < 600) {
            $('header').removeClass('header2');

            $('.menn').css('color', '#72c0ff');
        } else {
            $('.menn').css('color', '#72c0ff');

        }
    });




});

$(document).ready(function() {
    var is_mobile = true;

    if ($('#some-element').css('display') == 'none') {
        is_mobile == false;
        $(window).scroll(function() {
            if ($(this).scrollTop() > 0) {
                $('header').addClass('header2');

            } else {
                $('header').removeClass('header2');
            }
        });
    }
    if (is_mobile == true) {
        $(window).scroll(function() {
            if ($(this).width() < 600)
                if ($(this).scrollTop() > 0) {
                    $('header').addClass('header4');
                } else {
                    $('header').removeClass('header4');

                }
        });


    }



});