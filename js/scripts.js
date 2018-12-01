$(document).ready(function () {
    var dt = new Date()
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    $('#day').html(days[dt.getDay()]);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    $('#date').html(months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear());
    $('#time').html((dt.getHours() > 12 ? (dt.getHours() - 12) : dt.getHours()).toString() + ":" + ((dt.getMinutes() < 10 ? '0' : '').toString() + dt.getMinutes().toString()) + (dt.getHours() < 12 ? ' AM' : ' PM').toString());
    /*Get Date and Time */


    var long;
    var lat;
    var celciusTemp;
    var farTemp;
    var weatherDescrip;
    var windSpeed;
    var city;

    /* Get location*/
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);

    } else $("#weather").html("Geolocation is not supported by this browser.");

    function success(position) {

        long = (position.coords.longitude).toFixed(2);
        lat = (position.coords.latitude).toFixed(2);

        /* Api Data */
        var api = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long;

        $("#weather").html("Latitude: " + lat +
            "<br>Longitude: " + long);
        console.log(position);

        $.getJSON(api, function (data) {
            //Getting data from API     
            var tempSwap = true;
            celciusTemp = data.main.temp;
            farTemp = (celciusTemp * 1.8 + 32).toFixed(2);
            weatherDescrip = data.weather[0].description;
            windSpeed = data.wind.speed;
            city = data.sys.country + ", " + data.name;

            $("#city").html(city);
            $("#weatherDescrip").html(weatherDescrip);
            $("#windSpeed").html(windSpeed + "<b> M/S</b>");
            $("#temprature").html("<h2>" + celciusTemp + ' &#8451 <h2>');
            $("#temprature").click(function () {

                if (tempSwap === false) {
                    $('#temprature').html("<h2>" + celciusTemp + ' &#8451 </h2>');
                    tempSwap = true;
                } else {
                    $('#temprature').html("<h2>" + farTemp + ' &#8457; </h2>');
                    tempSwap = false;
                }

            });
            if (celciusTemp > 30) {
                $('body').css('background-image', 'url(img/hotWeather.jpg)');
                $('#comment').html('It is going to be hot and sweaty today!');

            } else if (celciusTemp < 30 && celciusTemp > 24) {
                $('body').css('background-image', 'url(img/tshirtAndShorts.jpg)');
                $('#comment').html('It is safe to wear your t-shirts and shorts today.');

            } else if (celciusTemp < 24 && celciusTemp > 20) {
                $('body').css('background-image', 'url(img/cool.jpg)');
                $('#comment').html('It is ging to be cool today.');

            } else if (celciusTemp < 20 && celciusTemp > 15) {
                $('body').css('background-image', 'url(img/long-sleeveShirtPantsWeather.jpg)');
                $('#comment').html('Today is a Long-sleeve shirt & pants weather.');

            } else if (celciusTemp < 15 && celciusTemp > 10) {
                $('body').css('background-image', 'url(img/fleecejacketWeather.jpg)');
                $('#comment').html('You might want to get your Fleece jacket for this weather.');

            } else if (celciusTemp < 10 && celciusTemp > 0) {
                $('body').css('background-image', 'url(img/coldWeather.jpg)');
                $('#comment').html('It is Freezing!');

            } else if (celciusTemp < 0) {
                $('body').css('background-image', 'url(img/stayIndoorsCold.jpg)');
                $('#comment').html('It is so cold you may want to reconsider going outside, especially with children');
            }

            console.log(city);
            console.log(api);
        });
    }

});