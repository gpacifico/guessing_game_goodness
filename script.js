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
    this.attempts = 0;
    this.pick_number = function() {
        var random_number = Math.floor((Math.random() * number_of_restaurants) + 1);
        return random_number;
    };
    this.reset_input_field = function() {
        $("#guess_input").val('');
    };
    this.make_guess = function() {
        var the_guess = $("#guess_input").val();
        if (the_guess > the_number) {
            $("#response_div").text("Sorry. Too High! Try again.").css({"color": "#d61148"});
            this.attempts ++;
            this.punishement();
            this.reset_input_field();
        }
        else if (!the_guess) {
            $("#response_div").text("You need to guess a number!").css({"color": "#f29304"});
            this.reset_input_field();
        }
        else if (the_guess < 0) {
            $("#response_div").text("Ghosts can't haunt negative restaurants!").css({"color": "#6a0bef"});
            this.attempts ++;
            this.punishement();
            this.reset_input_field();
        }
        else if (the_guess < the_number) {
            $("#response_div").text("Sorry. Too Low! Try again.").css({"color": "#2570fc"});
            this.attempts ++;
            this.punishement();
            this.reset_input_field();
        }
        else if (the_guess == the_number) {
            $("#response_div").text("GHOSTS BUSTED!").css({"color": "#0a7722"}).append('<br><img src = "images/ghostbusters_logo_8.png">');
            $("body").css({"opacity": 1});
        }
        else {
            $("#response_div").text("Dude, you need to type a number!").css({"color": "#8f2add"});
            this.reset_input_field();
        }
    };
    this.punishement = function () {
        if (attempts === 1) {
            $("body").css({"opacity": 0.8});
        }
        if (attempts === 2) {
            $("body").css({"opacity": 0.6});
        }
        if (attempts === 3) {
            $("body").css({"opacity": 0.4});
        }
        if (attempts === 4) {
            $("body").css({"opacity": 0.2});
        }
        if (attempts === 5) {
            $("body").css({"opacity": 0});
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