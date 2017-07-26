$('.flip').mouseenter(function(){
    var block = $(this);
    $('.flip.hover').removeClass('hover');
    block.addClass('hover');
});

$('.flip').mouseleave(function(){
    $(this).removeClass('hover');
});