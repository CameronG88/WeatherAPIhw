// click event for search and display
var cities = [];
start();
$(".btn").on("click", function (event) {
    event.preventDefault();
    // variables for search api stuff and date display
    var city = $("#searchInput").val();



    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ca038625d5f7b3e933a9e341521a44d3";

    var today = new Date();



    var date = (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();
    // get it
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
// store it
            cities.push(response.name);
            localStorage.setItem("cities", JSON.stringify(cities));
            console.log(cities);

            console.log(response);

// create it
            var newLi = $("<li>");

            newLi.text(response.name);
            newLi.addClass("list-group-item searchItem text-center");
            $("#searchHistory").prepend(newLi);

            $("#cityView").text(response.name);
            $("#dateView").text(date);

            $("#temp").text("Temperature(F): " + Math.ceil(((response.main.temp * 9) / 5 - 459.67)));
            $("#humid").text("Humidity: " + response.main.humidity + "%");
            $("#windSpeed").text("Wind Speed: " + response.wind.speed + "mph");
            var lon = response.coord['lon'];
            var lat = response.coord['lat'];
// run the rest of the functions using the search input and event listener
            getUV(lat, lon)
            getForecast(city);
        });


// function to get UV index information from the UV API endpoint
});
function getUV(lat, lon) {
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=ca038625d5f7b3e933a9e341521a44d3&lat=" + lat + "&lon=" + lon;
    $.ajax({
        url: uvURL,
        method: "Get"
    })
        .then(function (response) {



            $("#uvIndex").text("Uv Index: " + response.value);
        })
}
// function to get 5 day forecast then loop through the API response to fill forecast columns
function getForecast(city) {
    $("#forecastDiv").empty();
    var foreURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=ca038625d5f7b3e933a9e341521a44d3";
    $.ajax({
        url: foreURL,
        method: "Get"
    })

        .then(function (response) {
            console.log(response);
            for (let index = 3; index < response.list.length; index += 8) {

                var newCol = $("<div>");
                var newHead = $("<h3>")
                var newTemp = $("<p>")
                var NewHumid = $("<p>")
                newCol.addClass("col forecast-col m-2");
                newHead.text(response.list[index].dt_txt);
                newTemp.text("Temp(F) " + response.list[index].main.temp);
                NewHumid.text("Humidity: " + response.list[index].main.humidity);

                $("#forecastDiv").append(newCol);
                newCol.prepend(newHead, newTemp, NewHumid);

            }
            console.log(response);
        })
}
// function to pull past searched cities and append them to search history div
function start() {
var storedCities = (JSON.parse(localStorage.getItem("cities")));
for (let index = 0; index < storedCities.length; index++) {
    var newLi = $("<li>");

            newLi.text(storedCities[index]);
            newLi.addClass("list-group-item searchItem text-center");
            $("#searchHistory").append(newLi);
    
}

    console.log(storedCities);
}
