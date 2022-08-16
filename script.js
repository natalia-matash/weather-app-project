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