$('.select').on('click',function () {
    if ($(this).hasClass('open')) {
        $(this).removeClass('open');
    } else {
      $(this).addClass('open');
    }
});

$('.select').on('click', '.select__item', function (e) {
    e.stopPropagation();
    $(this).parent().prev().text($(this).text());
    $(this).parent().prev().prev().val($(this).text());
    $('.select').removeClass('open');
});

$('.jsBurger').on('click', function() {
    $(this).toggleClass('active');
    $('.jsNav').toggleClass('active');
    $('.jsHeaderMenu').toggleClass('active');
})

$('.jsImprovement').on('click', function() {
    $(this).toggleClass('active');
    $('.jsComfortableBlock').toggleClass('hide');
})

$('.jsReplenishment').on('click', function() {
    $(this).toggleClass('active');
    $('.jsReplenishmentPointsBlock').toggleClass('hide');
})

$('.jsTab').on('click', function() {
    if (!$(this).hasClass('active')) {
        $('.jsTab').removeClass('active');
        $(this).addClass('active');

        $('.jsTabBlock').addClass('hide');
        $(`.${$(this).data('tab')}`).removeClass('hide')
    }
})