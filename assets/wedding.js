(function ($) {
    var states = {
            DEFAULT: null,
            WHEN: 'when',
            WHERE: 'where'
        },
        defaults = {
            two: 'two.jpg',
            three: 'three.jpg',
            five: 'five.jpg',
            eight: 'eight.jpg',
            thirteen: 'thirteen.jpg'
        },
        indexes = {
            when: {
                three: 'date_3.jpg',
                eight: 'date_8.jpg',
                thirteen: 'date_13.jpg'
            },
            where: {
                three: 'city_3.jpg',
                five: 'city_5.jpg',
                eight: 'city_8.jpg'
            },
        },

        clickState = states.DEFAULT,
        setImageSrc = function (selector, src) {
            $(selector).attr('src', 'assets/' + src);
        },
        showHide = function (index, shouldShow) {
            var library = shouldShow ? index : defaults,
                size;
            for (size in index) {
                if (index.hasOwnProperty(size)) {
                    setImageSrc('li.' + size + ' img', library[size]);
                }
            }
        },
        initLink = function (selector, state) {
            $(selector)
                .click(function (e) {
                    e.preventDefault();
                    clickState = clickState !== state ? state : states.DEFAULT;
                    showHide(indexes[state], clickState === state);
                })
                .hover(function () {
                        if (clickState == states.DEFAULT) {
                            showHide(indexes[state], true);                    
                        }
                    }, function () {
                        if (clickState == states.DEFAULT) {
                            showHide(indexes[state], false);                    
                        }
                });            
        };
    
    initLink('#when', states.WHEN);
    initLink('#where', states.WHERE);

})(jQuery);