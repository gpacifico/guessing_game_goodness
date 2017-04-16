//THE MAP

var map;
var infowindow;

function initMap() {
    // var pyrmont = {lat: -33.867, lng: 151.195};
    var firestation = {lat: 40.719560, lng: -74.006626};


    map = new google.maps.Map(document.getElementById('map'), {
        // center: pyrmont,
        center: firestation,
        zoom: 14
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        // location: pyrmont,
        location: firestation,
        radius: 1609,
        type: ['restaurant']
    }, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

//PLAYING THE GAME

var the_number = null;
function pick_number() {
    var random_number = Math.floor((Math.random() * 20) + 1);
    return random_number;
}
function make_guess () {
    var the_guess = $("#guess_input").val();
    if (the_guess > the_number) {
        $("#response_div").text("Too High!").css({"background-color": "red", "color": "white"});
    }
    else if (the_guess < the_number) {
        $("#response_div").text("Too Low!").css({"background-color": "blue", "color": "white"});
    }
    else if (the_guess === the_number) {
        $("#response_div").text("You guessed it!").css({"background-color": "green", "color": "white"});
    }
    else {
        $("#response_div").text("Dude, you need to guess a number!").css({"background-color": "purple", "color": "white"});
    }
}
$(document).ready(function () {
    $(".submit_button").click(function () {
        make_guess();
    });
});