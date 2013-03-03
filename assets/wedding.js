jQuery(function ($) {
    var states = {
            DEFAULT: null,
            WHEN: 'when',
            WHERE: 'where',
            HOTELS: 'hotels',
            GIFTS: 'gifts',
            PARTY: 'party',
            EVENTS: 'events'
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
            gifts: thirteenTextState,
            party: thirteenTextState,
            events: thirteenTextState
        },
        preloadImageFilenames = [
            'light_13.jpg',
            'date_3.jpg',
            'date_8.jpg',
            'date_13.jpg',
            'city_3.jpg',
            'city_5.jpg',
            'city_8.jpg'
        ],
        clickState = states.DEFAULT,
        $hotelsContainer = $('#hotels_container'),
        $giftsContainer = $('#gifts_container'),
        $partyContainer = $('#party_container'),
        $eventsContainer = $('#events_container'),
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
            conditionalShowSection(state, states.PARTY, shouldShow, $partyContainer);
            conditionalShowSection(state, states.EVENTS, shouldShow, $eventsContainer);
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
        },
        preloadImage = new Image(),
        i = 0;

    $($hotelsContainer)
        .add($giftsContainer)
        .add($partyContainer)
        .add($eventsContainer)
        .offset($('li.thirteen').offset());

    initLink('#when', states.WHEN);
    initLink('#where', states.WHERE);
    initLink('#hotels', states.HOTELS);
    initLink('#party', states.PARTY);
    initLink('#gifts', states.GIFTS);
    initLink('#events', states.EVENTS);

    $('#pictures').click(function () {
        clickState = states.DEFAULT;
        showHide(defaults, true);
    });

    for (i = 0; i < preloadImageFilenames.length; i += 1) {
        preloadImage.src = 'assets/' + preloadImageFilenames[i];
    }

    window.fbAsyncInit = function() {
        // init the FB JS SDK
        FB.init({
            appId      : '485906441452167', // App ID from the App Dashboard
            channelUrl : '//www.haroldplusdaniela.com/channel.html', // Channel File for x-domain communication
            status     : true, // check the login status upon init?
            cookie     : true, // set sessions cookies to allow your server to access the session?
            xfbml      : true  // parse XFBML tags on this page?
        });

        // Additional initialization code such as adding Event Listeners goes here

    };

    // Load the SDK's source Asynchronously
    // Note that the debug version is being actively developed and might 
    // contain some type checks that are overly strict. 
    // Please report such bugs using the bugs tool.
    (function(d, debug){
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
        ref.parentNode.insertBefore(js, ref);
    }(document, /*debug*/ false));
});