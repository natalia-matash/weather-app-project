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


   function showTemperature(response) {
      document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
      document.querySelector("#description").innerHTML = response.data.weather[0].description;
      document.querySelector("#humidity").innerHTML = response.data.main.humidity;
      document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
      document.querySelector("#city").innerHTML = response.data.name;
      let iconElement = document.querySelector("#icon");
      iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
      iconElement.setAttribute("alt", response.data.weather[0].icon);
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
   function getPos(event) {
      event.preventDefault();
   navigator.geolocation.getCurrentPosition(showPosition);
   }
   
   let buttonC = document.querySelector("#currentB");
   buttonC.addEventListener("click", getPos);
   function showCelcium() {
      let temp = document.querySelector("#temp"); 
      temp.innerHTML = `...`;
   }
   let celcium = document.querySelector("#celcium");
   celcium.addEventListener("click", showCelcium);
   
   
   function showFarengeit() {
      let temper = document.querySelector("#temp"); 
      temper.innerHTML = Math.round(temp.textContent * 9 / 5 + 32);
   }
   let farengeit = document.querySelector("#farengeit");
   farengeit.addEventListener("click", showFarengeit);

   searchCity("Kyiv");