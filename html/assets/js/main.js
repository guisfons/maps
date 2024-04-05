$( document ).ready(function () {
    if($('.loader').length) {
        $('.loader').addClass('loader--hide')
        setTimeout(function() {
            $('.loader').remove()
        }, 3999)
    }

    $('img').each(function() {
        $(this).attr('draggable', false)
    })

    map()
})

function map () {
    mapCount()
    mapNavigation()
}

function mapCount () {
    const maps = $('.maps__item')
}

function mapNavigation () {
    $(document).on('click', '.maps__item:not(.maps__item--active), .maps__nav-next, .maps__nav-prev', function() {
        let selectedEl = $(this)
        let activeMap, selectedMap
        if(selectedEl.hasClass('maps__nav-next')) {
            selectedMap = selectedEl.closest('.maps').find('.maps__selection .maps__item--active').next()
            activeMap = selectedEl.closest('.maps').find('.maps__selection .maps__item--active')
        } else if (selectedEl.hasClass('maps__item')){
            selectedMap = selectedEl
            activeMap = selectedMap.prev('.maps__item--active')
        } else if (selectedEl.hasClass('maps__nav-prev')) {
            selectedMap = selectedEl.closest('.maps').find('.maps__selection .maps__item').last()
            activeMap = selectedMap.parent().find('.maps__item--active')
        }

        if(selectedMap.prev().hasClass('maps__item--active')) {
            $('.maps__selection').find('.maps__item--swap-reverse').removeClass('maps__item--swap-reverse')
            selectedMap.addClass('maps__item--active')
            activeMap.addClass('maps__item--swap')
            $('.maps__item--swap').fadeOut('fast', function() {
                activeMap.removeClass('maps__item--active').removeClass('maps__item--swap').remove()
                $('.maps__selection').append(activeMap.removeClass('maps__item--active'))
                $(this).css('display', '')
            })
        } else {
            $('.maps__selection').find('.maps__item--swap-reverse').removeClass('maps__item--swap-reverse')
            selectedMap.remove()
            selectedMap.fadeIn('fast', function() {
                activeMap.removeClass('maps__item--active')
                selectedMap.addClass('maps__item--swap-reverse')
                $('.maps__selection').prepend(selectedMap.addClass('maps__item--active'))
            })
        }
    })
}