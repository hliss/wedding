(function ($) {
    var states = {
            DEFAULT: null,
            WHEN: 'WHEN'
        },
        defaults = {
            two: 'two.jpg',
            three: 'three.jpg',
            five: 'five.jpg',
            eight: 'eight.jpg',
            thirteen: 'thirteen.jpg'
        },
        when = {
            three: 'date_3.jpg',
            eight: 'date_8.jpg',
            thirteen: 'date_13.jpg'
        },
        clickState = states.DEFAULT,
        setImageSrc = function (selector, src) {
            $(selector).attr('src', 'assets/' + src);
        },
        showHideWhen = function (shouldShow) {
            var library = shouldShow ? when : defaults;
            setImageSrc('li.three img', library.three);
            setImageSrc('li.eight img', library.eight);
            setImageSrc('li.thirteen img', library.thirteen);
        };
        
    $('#when')
        .click(function (e) {
            e.preventDefault();
            clickState = clickState !== states.WHEN ? states.WHEN : states.DEFAULT;
            showHideWhen(clickState === states.WHEN);
        })
        .hover(function () {
                if (clickState == states.DEFAULT) {
                    showHideWhen(true);                    
                }
            }, function () {
                if (clickState == states.DEFAULT) {
                    showHideWhen(false);                    
                }
        });
})(jQuery);