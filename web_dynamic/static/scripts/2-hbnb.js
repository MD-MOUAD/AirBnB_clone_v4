$('document').ready(function () {
    let amenities = {};
    $('INPUT[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            amenities[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete amenities[$(this).attr('data-id')];
        };
        let values = Object.values(amenities);
        if (values.length > 0) {
            if (values.length > 3) {
                $(".amenities h4").text(values[0] + ", " + values[1] +
                ", " + values[2] + " ...");
            } else {
                $(".amenities h4").text(values.join(", "));
            };
        } else {
            $(".amenities h4").html('&nbsp;');
        };
    });
    $.get('http://localhost:5001/api/v1/status/', (data, status) => {
        if (status === "success") {
            if (data.status === 'OK'){
                $("DIV#api_status").addClass('available');
            } else {
                $("DIV#api_status").removeClass('available');
            };
        };
    });
});
