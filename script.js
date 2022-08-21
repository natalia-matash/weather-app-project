function showDate(date) {
   let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
   let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
   let day = days[date.getDay()];
   let datte = date.getDate();
   if(datte < 10) {
      datte = `0${datte}`;
   }
   let month = months[date.getMonth()];
   let hours = date.getHours();
   if(hours < 10) {
      hours = `0${hours}`;
   }
   let minute = date.getMinutes();
   if(minute < 10) {
      minute = `0${minute}`;
   }
   return `${day}  ${datte}/${month}  ${hours}:${minute}`;
   }
   let dateElement = document.querySelector("#day");
   let currentTime = new Date();
   dateElement.innerHTML = showDate(currentTime);

   function formatDay(timestamp) {
   let date = new Date(timestamp * 1000);
   let days = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat",];
   let day = date.getDay();
   return days[day];
   }


   function displayForecast(response) {
      
      let forecast = response.data.daily.splice(1, 6);
      let forecastElement = document.querySelector("#section");
      let forecastHTML = `<div class="row justify-content-between">`;

      forecast.forEach(function(forecastDay,index) {
         if(index < 5) {
            forecastHTML = forecastHTML + 
            `<div class="col-2">
            <div class="col-item">
              <div class="smile">
              <img class="icons" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt=""></div>
              <div class="section-temperature" id="section-temperature">${Math.round(forecastDay.temp.day)}º</div>
              <div class="section-day">${formatDay(forecastDay.dt)}</div>
            </div>
          </div>`;
         }
      })
      forecastHTML = forecastHTML + `</div>`;
      forecastElement.innerHTML = forecastHTML;
      forecastTemp = forecast;
   }

   function getForecast(coordinates) {
   let apiKey = "0511a6e92a8692a228d7c70698a18f5d";
   let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(displayForecast);
   }

   function showTemperature(response) {
      let temperatureElement = document.querySelector("#temp");
      celsiusTemperature = response.data.main.temp;
      temperatureElement.innerHTML = Math.round(celsiusTemperature);
      document.querySelector("#description").innerHTML = response.data.weather[0].description;
      document.querySelector("#humidity").innerHTML = response.data.main.humidity;
      document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
      document.querySelector("#city").innerHTML = response.data.name;
      let iconElement = document.querySelector("#icon");
      iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
      iconElement.setAttribute("alt", response.data.weather[0].icon);

      getForecast(response.data.coord);
   }
   
    function searchCity(city) {
   let apiKey = `0511a6e92a8692a228d7c70698a18f5d`;
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(showTemperature);
   }

   function handleSubmit(event) {
      event.preventDefault();
      let inputElement = document.querySelector("#input");
      searchCity(inputElement.value);
   }
   
   let button = document.querySelector("#button");
   button.addEventListener("click", handleSubmit);

   function showPosition(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let apiKey = "0511a6e92a8692a228d7c70698a18f5d";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;  
      axios.get(apiUrl).then(showTemperature);   
   }
   function getPosition(event) {
      event.preventDefault();
   navigator.geolocation.getCurrentPosition(showPosition);
   }
   
   let buttonC = document.querySelector("#currentB");
   buttonC.addEventListener("click", getPosition);

   function showFahrenheitTemperature(event) {
      event.preventDefault();
      let temperatureElement = document.querySelector("#temp"); 
      celciusLink.classList.remove("active");
      fahrenheitLink.classList.add("active");
      celciusLink.classList.add("no-active");
      fahrenheitLink.classList.remove("no-active");
      let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
      temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
      let divTemp = document.getElementsByClassName("section-temperature");
      for (i = 0; i < 5; i++) {
         divTemp[i].innerHTML = `${Math.round(
           (forecastTemp[i].temp.day * 9) / 5 + 32
         )}º`;
       }
      }
      
   function showCelciusTemperature(event) {
      event.preventDefault();
      let temperatureElement = document.querySelector("#temp"); 
      celciusLink.classList.add("active");
      fahrenheitLink.classList.remove("active");
      celciusLink.classList.remove("no-active");
      fahrenheitLink.classList.add("no-active");
      temperatureElement.innerHTML = Math.round(celsiusTemperature); 
      let divTemp = document.getElementsByClassName("section-temperature");
      
      for (i = 0; i < 5; i++) {
         divTemp[i].innerHTML = `${Math.round(forecastTemp[i].temp.day)}º`;
       }
      }

   let celsiusTemperature = null;
   let forecastTemp = [];

   let fahrenheitLink = document.querySelector("#fahrenheit-link");
   fahrenheitLink.addEventListener("click",
   showFahrenheitTemperature);

   let celciusLink = document.querySelector("#celsius-link");
   celciusLink.addEventListener("click", showCelciusTemperature);

   searchCity("Kyiv");

 