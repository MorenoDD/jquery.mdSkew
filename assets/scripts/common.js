(function($) {

    var $mddShare = $('#mdd-share'),
        $mddShareOpen = $('#mdd-share--open'),
        $mddShareClose = $('#mdd-share--close'),
        $mddShareLayer = $('#mdd-share--layer');

    $mddShareOpen.on('click', function() {
        $mddShare.addClass('in');
        return false;
    });

    $mddShareClose.on('click', function() {
        $mddShare.removeClass('in');
        return false;
    });

    $mddShareLayer.find('.md-share').on('click', function() {
        window.open(jQuery(this).attr('href'), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        return false;
    });
})(jQuery);