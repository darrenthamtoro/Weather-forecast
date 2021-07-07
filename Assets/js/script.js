var apiKeyID = "1a96dfc909266b721d6e8280c53afc23";


//VARIBLES 

var searchBtn = document.getElementById('btn-search');
var cityName = document.getElementById('search-text');

function getWeather(lat, lon) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&appid=' + apiKeyID + '&units=imperial';
    console.log(requestUrl);
    fetch(requestUrl)
        .then(function (response) {
            // console.log("Api response", response);
            return response.json();
        }).then(function (apiData) {
            // Make sure to look at the response in the console and read how 404 response is structured.
            console.log("weather API", apiData);
            //set vakues in the HTML PAGE 
            document.getElementById("city-name").textContent = cityName.value.trim(); 
            document.getElementById("temperature").textContent = apiData.current.temp;
            document.getElementById("wind").textContent = apiData.current.wind_speed;
            document.getElementById("humidity").textContent = apiData.current.humidity;
            document.getElementById("uv-index").textContent = apiData.current.uvi;
            document.getElementById("card1-temp").textContent = apiData.daily[0].temp.day;
            document.getElementById("card2-temp").textContent = apiData.daily[1].temp.day;
            document.getElementById("card3-temp").textContent = apiData.daily[2].temp.day;
            document.getElementById("card4-temp").textContent = apiData.daily[3].temp.day;
            document.getElementById("card5-temp").textContent = apiData.daily[4].temp.day;
            document.getElementById("card1-wind").textContent = apiData.daily[0].wind_speed;
            document.getElementById("card2-wind").textContent = apiData.daily[1].wind_speed;
            document.getElementById("card3-wind").textContent = apiData.daily[2].wind_speed;
            document.getElementById("card4-wind").textContent = apiData.daily[3].wind_speed;
            document.getElementById("card5-wind").textContent = apiData.daily[4].wind_speed;
            document.getElementById("card1-humidity").textContent = apiData.daily[0].humidity;
            document.getElementById("card2-humidity").textContent = apiData.daily[1].humidity;
            document.getElementById("card3-humidity").textContent = apiData.daily[2].humidity;
            document.getElementById("card4-humidity").textContent = apiData.daily[3].humidity;
            document.getElementById("card5-humidity").textContent = apiData.daily[4].humidity;
        });
}

// getApi(requestUrl);
function getLatandLon() {
    console.log(cityName.value.trim());
    //replacing any black space with a + sign 
    var replaced = cityName.value.split(' ').join('+');

    var apiURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + replaced + '&limit=1&appid=' + apiKeyID;
    console.log(apiURL);

    fetch(apiURL)
        .then(function (response) {
            // console.log(response.status);
            return response.json();
        })
        .then(function (data) {
            // Make sure to look at the response in the console and read how 404 response is structured.
            // console.log(data);
            getWeather(data[0].lat, data[0].lon);
            //savibg it to lOcal Storage 
            localStorage.setItem("cityList", JSON.stringify(cityName.value.trim()))
        });

}
//EVENT LISTENER
searchBtn.addEventListener("click", getLatandLon);

//when the user types the city name in the search bar,
//the city info will show up in the right side of the page,
//the name of the city will show up in the left side and when the user presses it,
//the same info will show up in the right.
//the right top of the page is the current day info,
//bottom right is info for the next 5 days of the page