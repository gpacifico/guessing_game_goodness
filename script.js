//THE MAP SHOWING THE RESTAURANTS AROUND THE GHOSTBUSTERS FIREHOUSE
function Ghostbusters_Map() {
    this.map = null;
    this.infowindow = null;
    this.number_of_restaurants = null;
    this.initMap = function () {
        var firestation = {lat: 40.719560, lng: -74.006626};
        map = new google.maps.Map(document.getElementById('map'), {
            center: firestation,
            zoom: 17
        });
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var ghost = new google.maps.Marker({
            position: firestation,
            map: map,
            icon: iconBase + 'campfire.png'
        });
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: firestation,
            radius: 161,
            type: ['restaurant']
        }, callback);
    };
    this.callback = function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            number_of_restaurants = results.length;
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    };
    this.createMarker = function(place) {
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
}

//PLAYING THE GAME
Ghostbusters_Map();

function Guess_Ghosts () {
    this.the_number = null;
    this.pick_number = function() {
        var random_number = Math.floor((Math.random() * number_of_restaurants) + 1);
        return random_number;
    }
    this.reset_input_field = function() {
        $("#guess_input").val('');
    }
    this.make_guess = function() {
        var the_guess = $("#guess_input").val();
        if (the_guess > the_number) {
            $("#response_div").text("Too High!").css({"color": "#d61148"});
            this.reset_input_field();
        }
        else if (!the_guess) {
            $("#response_div").text("You need to guess a number!").css({"color": "#f29304"});
            this.reset_input_field();
        }
        else if (the_guess < 0) {
            $("#response_div").text("Ghosts can't haunt negative restaurants!").css({"color": "#6a0bef"});
            this.reset_input_field();
        }
        else if (the_guess < the_number) {
            $("#response_div").text("Too Low!").css({"color": "#0437e0"});
            this.reset_input_field();
        }
        else if (the_guess == the_number) {
            $("#response_div").text("Right!").css({"color": "#0a7722"}).prepend('<img src = "images/ghostbusters_logo_8.png">');
        }
        else {
            $("#response_div").text("Dude, you need to type a number!").css({"color": "#8f2add"});
            this.reset_input_field();
        }
    }
}

$(document).ready(function () {
    Guess_Ghosts();
    $(".submit_button").click(function () {
        make_guess();
    });
    $("#guess_input").keypress(function(event) {
        if (event.keyCode == 13) {
            make_guess();
        }
    });
});