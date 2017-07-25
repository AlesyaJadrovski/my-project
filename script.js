(function($){
    'use strict';
    var fliped = false;
    var a = window.location.search.match(/\?(.+)/)[1].split('&');
    var paramUrl = a[0].replace('name=', '');
    var name = '';

    $(document).ready(function(){
        // Paul Smith popup
        var screenWidth =  $(document).width();
        if (screenWidth < 1300 ){
            is_mobile = true;
            $("head").append($(" <link href=\"assets/mobile.css\" type=\"text/css\" data-template-style=\"true\" rel=\"stylesheet\">"));
        }
        else{
            is_mobile = false;
        }
        $('.ps_popup-close-js').click(function(){
            $('.ps_popup-wrapper').hide();
        });

        setSizes();
        if(is_mobile !== true) {
            $(window).resize(function(){
                setSizes();
                if (typeof window.win_resize_fn != 'undefined')
                    clearTimeout(window.win_resize_fn);
                window.win_resize_fn = setTimeout(function(){
                    setSizes();
                }, 50);
            });
        } else {
            window.addEventListener("orientationchange", function() {
                // Announce the new orientation number
                if (typeof window.win_resize_fn != 'undefined')
                    clearTimeout(window.win_resize_fn);
                window.win_resize_fn = setTimeout(function(){
                    setSizes();
                }, 150);
            }, false);
        }

        if(is_mobile === true) {
            $('.js-hover').click(function(){

                if(fliped === true) {

                } else {
                    console.log(fliped);
                    clearTimeout(window.t1);
                    $('body').attr('class', '');
                    $('body').addClass($(this).data('hover')+'-hover hover-block');
                    $('.js-hover.hover').removeClass('hover');
                    $(this).addClass('hover');
                    fliped = true;
                    initSlider($(this));
                    return false;
                }
            });


            $('.overlay-bg').click(function(){
                fliped = false;
                $('body').attr('class', '');
                window.t1 = setTimeout(function(){
                    $('.brend-block').removeClass('hover');
                }, 300);
                if (typeof window.slider_tm != 'undefined')
                    clearTimeout(window.slider_tm);
                return false;
            });

        } else {
            $('.js-hover').mouseenter(function(){
                var block = $(this);
                clearTimeout(window.t1);
                $('body').attr('class', '');
                $('body').addClass($(this).data('hover')+'-hover hover-block');
                $('.js-hover.hover').removeClass('hover');
                block.addClass('hover');
                fliped = true;
                initSlider(block);
            });
            $('.js-hover').mouseleave(function(){
                var el = $(this);
                window.t1 = setTimeout(function(){
                    $('body').attr('class', '');
                    el.removeClass('hover');
                }, 300);
                fliped = false;
                if (typeof window.slider_tm != 'undefined')
                    clearTimeout(window.slider_tm);
            });
        }

    });

    $(window).load(function(){
        setSizes();
    });

    function setSizes(rec)
    {
        var inner = $('.inner');
        var outer = $('.outer');

        if(is_mobile === true) {
            if(window.orientation !== 0) {
                var minH = Math.round(outer.width() * 0.63);
                inner.css('min-height',minH + 'px');
                outer.css('min-height',minH + 'px');
            } else {
                outer.css('min-height', 'auto');
                inner.css('min-height', 'auto');
            }
        }

        if (!rec)
            inner.width('100%');

        if (inner.height() > outer.height())
        {
            var k = inner.height()/outer.height();
            inner.width(Math.floor(inner.width()/k));
            setSizes(true);
        }
    }

})(jQuery);

function initSlider(block)
{
    if(typeof $.fn.bxSlider == 'undefined')
        return;
    if (typeof window.slider_tm != 'undefined')
        clearTimeout(window.slider_tm);
    var slider = block.find('.js-back-images-list');
    if (typeof slider.data('api') != 'undefined')
    {
        setTimeout(function(){
            slider.data('api').destroySlider();
        }, 550);
    }
    window.slider_tm = setTimeout(function(){
        var api = slider.bxSlider({
            minSlides: 1,
            maxSlides: 1,
            moveSlides: 1,
            responsive: true,
            mode: 'fade',
            controls: false,
            auto: true,
            pager: false,
            speed: 650,
            infiniteLoop: true,
            onSliderLoad: function(){
            }
        });
        slider.data('api', api);
    }, 550);

}
