//THE OOP VERSION

//THE MAP

function Ghostbusters_Map() {
    this.map = null;
    this.infowindow = null;
    this.number_of_restaurants = null;
    this.initMap = function () {
        var firestation = {lat: 40.719560, lng: -74.006626};
        map = new google.maps.Map(document.getElementById('map'), {
            center: firestation,
            zoom: 14
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
            radius: 1609,
            type: ['restaurant']
        }, callback);
    };
    this.callback = function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            number_of_restaurants = results.length;
            console.log(number_of_restaurants);
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
            $("#response_div").text("Too High!").css({"background-color": "red", "color": "white"});
            this.reset_input_field();
        }
        else if (!the_guess) {
            $("#response_div").text("You need to guess a number").css({"background-color": "green", "color": "white"});
            this.reset_input_field();
        }
        else if (the_guess < 0) {
            $("#response_div").text("Ghosts can't haunt negative restaurants!").css({"background-color": "blue", "color": "white"});
            this.reset_input_field();
        }
        else if (the_guess < the_number) {
            $("#response_div").text("Too Low!").css({"background-color": "blue", "color": "white"});
            this.reset_input_field();
        }
        else if (the_guess == the_number) {
            $("#response_div").text("You guessed it!").css({"background-color": "green", "color": "white"});
        }
        else {
            $("#response_div").text("Dude, you need to guess a number!").css({"background-color": "purple", "color": "white"});
            this.reset_input_field();
        }
    }
}

Guess_Ghosts();

$(document).ready(function () {
    $(".submit_button").click(function () {
        make_guess();
    });
});







/*
 var map;
 var infowindow;
 var number_of_restaurants = null;

 function initMap() {
 var firestation = {lat: 40.719560, lng: -74.006626};

 map = new google.maps.Map(document.getElementById('map'), {
 center: firestation,
 zoom: 14
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
 radius: 1609,
 type: ['restaurant']
 }, callback);
 }

 function callback(results, status) {
 if (status === google.maps.places.PlacesServiceStatus.OK) {
 number_of_restaurants = results.length;
 console.log(number_of_restaurants);
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
 var random_number = Math.floor((Math.random() * number_of_restaurants) + 1);
 return random_number;
 }
 function make_guess () {
 var the_guess = $("#guess_input").val();
 if (the_guess == the_number) {
 $("#response_div").text("You guessed it!").css({"background-color": "green", "color": "white"});
 }
 else if (the_guess > the_number) {
 $("#response_div").text("Too High!").css({"background-color": "red", "color": "white"});
 }
 else if (!the_guess) {
 $("#response_div").text("You need to guess a number").css({"background-color": "green", "color": "white"});
 }
 else if (the_guess < 0) {
 $("#response_div").text("Ghosts can't haunt negative restaurants!").css({"background-color": "blue", "color": "white"});
 }
 else if (the_guess < the_number) {
 $("#response_div").text("Too Low!").css({"background-color": "blue", "color": "white"});
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

*/

/*

//THE MAP

var map;
var infowindow;
var number_of_restaurants = null;

function initMap() {
    // var pyrmont = {lat: -33.867, lng: 151.195};
    var firestation = {lat: 40.719560, lng: -74.006626};


    map = new google.maps.Map(document.getElementById('map'), {
        // center: pyrmont,
        center: firestation,
        zoom: 14
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
        // location: pyrmont,
        location: firestation,
        radius: 1609,
        type: ['restaurant']
    }, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        number_of_restaurants = results.length;
        console.log(number_of_restaurants);
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
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
    var random_number = Math.floor((Math.random() * number_of_restaurants) + 1);
    return random_number;
}
function make_guess () {
    var the_guess = $("#guess_input").val();
    if (the_guess > the_number) {
        $("#response_div").text("Too High!").css({"background-color": "red", "color": "white"});
    }
    else if (!the_guess) {
        $("#response_div").text("You need to guess a number").css({"background-color": "green", "color": "white"});
    }
    else if (the_guess < 0) {
        $("#response_div").text("Ghosts can't haunt negative restaurants!").css({"background-color": "blue", "color": "white"});
    }
    else if (the_guess < the_number) {
        $("#response_div").text("Too Low!").css({"background-color": "blue", "color": "white"});
    }
    else if (the_guess == the_number) {
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

*/