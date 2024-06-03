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
    $.post({
        url: 'http://localhost:5001/api/v1/places_search',
        data: JSON.stringify({}),
        contentType: 'application/json',
    })
    .done(function(data) {
        data.forEach(place => {
            $(".places").append(`
                <article>
                <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                    <div class="max_guest">${place.max_guest} Guest${place.max_guest > 1 ? "s": ""}</div>
                    <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms > 1 ? "s": ""}</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms > 1 ? "s": ""}</div>
                </div>
                <div class="user">
                </div>
                <div class="description">
                    ${place.description}
                </div>
                </article>
            `);
        })
    })
    .fail(function(xhr, status, error) {
        $(".places").text("found error :" + error);
    });

    $(".filters button").click(function() {
        $(".places article").remove();
        let ids = Object.keys(amenities);
        $.post({
          url: 'http://localhost:5001/api/v1/places_search',
          data: JSON.stringify({'amenities': ids}),
          contentType: 'application/json',
        })
        .done(function(data) {
          data.forEach(place => {
            $(".places").append(`
            <article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${place.max_guest > 1 ? "s": ""}</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms > 1 ? "s": ""}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms > 1 ? "s": ""}</div>
              </div>
              <div class="user">
              </div>
              <div class="description">
                ${place.description}
              </div>
            </article>
          `);
        })})
        .fail(function(xhr, status, error) {
          $(".places").text("found error :" + error);
        });
    });
});
