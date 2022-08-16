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

   function showTemp(response) {
      document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
      document.querySelector("#description").innerHTML = response.data.weather[0].description;
      document.querySelector("#humidity").innerHTML = response.data.main.humidity;
      document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
      document.querySelector("#city").innerHTML = response.data.name;
   }
   
    function searchCity(event) {
      event.preventDefault();
   let apiKey = `0511a6e92a8692a228d7c70698a18f5d`;
   let apiCity = document.querySelector("#input").value;
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${apiCity}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(showTemp);
   }
   
   let button = document.querySelector("#button");
   button.addEventListener("click", searchCity);

   function showPosition(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let apiKey = "0511a6e92a8692a228d7c70698a18f5d";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;  
      axios.get(apiUrl).then(showTemp);   
   }
   function getPos(event) {
      event.preventDefault();
   navigator.geolocation.getCurrentPosition(showPosition);
   }
   
   
   let buttonC = document.querySelector("#currentB");
   buttonC.addEventListener("click", getPos);