$(document).ready(function () {
    $('.navicon').click(function () {
        $('.nav').slideToggle();
    });
    $(window).bind('resize', function () {
        if ($('.navicon').css('display') == "none") {
            $('.nav').show();
        } else {
            $('.nav').hide();
        }
    })
    $('.smooth').click(function (event) {
        event.preventDefault();
        var sectionId = $(this).attr('href');
        var fromTop = $(sectionId).offset().top - 80;
        $('html, body').animate({
            scrollTop: fromTop
        }, 800);
        if ($('.navicon').css('display') == 'block') {
            $('.nav').slideUp();
        }

    });

    $(window).scroll(function () {
        $('.section').each(function () {
            var fromTop = $(this).offset().top - 80;
            if (window.scrollY >= (fromTop + 60)) {
                $(this).addClass('fixPoint');
            } else {
                $(this).removeClass('fixPoint');
            }
        })
    })
})

$(function () {
    var mobileScreenTreshold = 1024;
    $(".hvrbox").click(function (e) {
        if ($(window).width() <= mobileScreenTreshold) {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
            } else {
                e.preventDefault();
                $(this).addClass("active");
            }
        } else {
            $(this).removeClass("active");
        }
    });
});

var string = " May I introduce myself?"
var array = string.split("");
var i = 0;

Next = function () {
    i++;
    if (i > (array.length - 1)) {
        return
    }
    setTimeout(Slide, 50);
}

var x = document.getElementById('welcome');

function Slide() {
    var sp = document.createElement('span');
    sp.setAttribute('class', 'fadein');
    sp.appendChild(document.createTextNode(array[i]));
    x.appendChild(sp);
    setTimeout('Next()', 50);
}
Next();
