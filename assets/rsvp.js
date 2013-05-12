jQuery(function ($) {

    var numGuests = 1;

    $('#add-another>a').click(function (e) {
        e.preventDefault();
        ++numGuests;

        $('.guest-meal-' + numGuests + ', .guest-name-' + numGuests).show();

        if (numGuests === 4) {
            $('#add-another').hide();
        }

    });
});