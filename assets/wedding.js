jQuery(function ($) {
    var states = {
            DEFAULT: null,
            WHEN: 'when',
            WHERE: 'where',
            HOTELS: 'hotels'
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
            hotels: {
                thirteen: 'light_13.jpg'
            }
        },
        clickState = states.DEFAULT,
        $hotelsContainer = $('#hotels_container');
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
            
            // special cases
            if (index == indexes.hotels && shouldShow) {
                $hotelsContainer.show();
            } else {
                $hotelsContainer.hide();
            }
        },
        initLink = function (selector, state) {
            $(selector)
                .click(function (e) {
                    var shouldShow = clickState !== state;
                    e.preventDefault();
                    clickState = shouldShow ? state : states.DEFAULT;
                    if (shouldShow) {
                        showHide(defaults, false);
                    }
                    showHide(indexes[state], shouldShow);
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
    
    $hotelsContainer.offset($('li.thirteen').offset());

    initLink('#when', states.WHEN);
    initLink('#where', states.WHERE);
    initLink('#hotels', states.HOTELS);

    $('#pictures').click(function () {
        clickState = states.DEFAULT;
        showHide(defaults, true);
    });
});