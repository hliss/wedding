jQuery(function ($) {
    var states = {
            DEFAULT: null,
            WHEN: 'when',
            WHERE: 'where',
            HOTELS: 'hotels',
            GIFTS: 'gifts'
        },
        defaults = {
            two: 'two.jpg',
            three: 'three.jpg',
            five: 'five.jpg',
            eight: 'eight.jpg',
            thirteen: 'thirteen.jpg'
        },
        thirteenTextState = {
            thirteen: 'light_13.jpg'
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
            hotels: thirteenTextState,
            gifts: thirteenTextState
        },
        clickState = states.DEFAULT,
        $hotelsContainer = $('#hotels_container'),
        $giftsContainer = $('#gifts_container'),
        setImageSrc = function (selector, src) {
            $(selector).attr('src', 'assets/' + src);
        },
        conditionalShowSection = function (currentState, targetState, shouldShow, $container) {
            if (currentState == targetState && shouldShow) {
                $container.show();
            } else {
                $container.hide();
            }
        },
        showHide = function (state, index, shouldShow) {
            var library = shouldShow ? index : defaults,
                size;

            for (size in index) {
                if (index.hasOwnProperty(size)) {
                    setImageSrc('li.' + size + ' img', library[size]);
                }
            }

            // special cases
            conditionalShowSection(state, states.HOTELS, shouldShow, $hotelsContainer);
            conditionalShowSection(state, states.GIFTS, shouldShow, $giftsContainer);
            /*
            if (index == indexes.hotels && shouldShow) {
                $hotelsContainer.show();
            } else {
                $hotelsContainer.hide();
            }
            
            if (index == indexes.gifts && shouldShow) {
                $giftsContainer.show();
            } else {
                $giftsContainer.hide();
            }
            */
        },
        initLink = function (selector, state) {
            $(selector)
                .click(function (e) {
                    var shouldShow = clickState !== state;
                    e.preventDefault();
                    clickState = shouldShow ? state : states.DEFAULT;
                    if (shouldShow) {
                        showHide(states.DEFAULT, defaults, false);
                    }
                    showHide(state, indexes[state], shouldShow);
                })
                .hover(function () {
                        if (clickState == states.DEFAULT) {
                            showHide(state, indexes[state], true);
                        }
                    }, function () {
                        if (clickState == states.DEFAULT) {
                            showHide(state, indexes[state], false);
                        }
                });
        };

    $($hotelsContainer).add($giftsContainer).offset($('li.thirteen').offset());

    initLink('#when', states.WHEN);
    initLink('#where', states.WHERE);
    initLink('#hotels', states.HOTELS);
    initLink('#gifts', states.GIFTS);

    $('#pictures').click(function () {
        clickState = states.DEFAULT;
        showHide(defaults, true);
    });
});