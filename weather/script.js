let weather = {
    apikey: "6a378a898fd922a01a94e77df09131bf",
    lat: "",
    lon: "",

    latlon: function (city) {
        fetch(
            "http://api.openweathermap.org/geo/1.0/direct?q="
            + city
            + "&limit=5&appid="
            + this.apikey
        )
            .then((response) => response.json())
            .then((data) => {
                this.lat = data[0].lat;
                this.lon = data[0].lon;
                console.log(this.lat, this.lon);
            })
    },

    fetchWeather: function (city) {
        this.latlon(city);

        setTimeout(() => {
            fetch(
                "https://api.openweathermap.org/data/2.5/weather?lat="
                + this.lat + "&lon=" + this.lon
                + "&appid="
                + this.apikey
            )
                .then((response) => response.json())
                .then((data) => this.displayWeather(data));
        }, 500)

    },

    displayWeather: function (data) {

        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },

    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
})

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
})

weather.fetchWeather("Denver");