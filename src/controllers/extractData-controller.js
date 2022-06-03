export function extractData(readings) {
  let temperature = [];
  let humidity = [];
  let pressure = [];
  let time = [];
  let count = [];
  for (let i = 0; i < readings.length; i++) {
    temperature.push(readings[i].temperature);
    humidity.push(readings[i].humidity);
    pressure.push(readings[i].pressure);
    time.push(timestampToDate(readings[i].time));
    count.push(i);
  }
  let lastHour = getLastHour(readings);
  return {
    temperature: lastHour.lastHourTemperature,
    humidity: lastHour.lastHourHumidity,
    pressure: lastHour.lastHourPressure,
    time: lastHour.lastHourTime,
    count: temperature.length,

  };
}

function timestampToDate(timestamp) {
  let date = new Date(timestamp * 1000);
  // console.log("date: ", date, "timestamp: ", timestamp);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  return date;
}

function getLastHour(readings) {
  let lastHour = [];
  let lastHourTime = [];
  let lastHourCount = [];
  let lastHourTemperature = [];
  let lastHourHumidity = [];
  let lastHourPressure = [];
  for (let i = 0; i < readings.length; i++) {

    if (readings[i].time * 1000 > (Date.now() - 3600000)) {
      lastHour.push(readings[i]);
      lastHourTime.push(timestampToDate(readings[i].time));
      lastHourCount.push(i);
      lastHourTemperature.push(readings[i].temperature);
      lastHourHumidity.push(readings[i].humidity);
      lastHourPressure.push(readings[i].pressure);
    }
  }
  return {
    lastHour: lastHour,
    lastHourTime: lastHourTime,
    lastHourCount: lastHourCount,
    lastHourTemperature: lastHourTemperature,
    lastHourHumidity: lastHourHumidity,
    lastHourPressure: lastHourPressure,
  }
}

export function convertMinutesToTime(minutesFromStart) {
  // Convert minutes to days, hours, minutes, seconds
  let days = Math.floor(minutesFromStart / 1440);
  let hours = Math.floor((minutesFromStart - (days * 1440)) / 60);
  let minutes = minutesFromStart - (days * 1440) - (hours * 60);
  let seconds = Math.floor((minutesFromStart - (days * 1440) - (hours * 60) - minutes) * 60);
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  }
}

export function createCalendarDays(data) {
  // console.log("hatt", data);
  let monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let first = new Date(data[0].time * 1000).getDate();
  let last = new Date(data[data.length - 1].time * 1000).getDate();
  //calculate number of days between first and last date. Take into account leap years and month.



  let firstTime = new Date(data[0].time * 1000);
  let lastTime = new Date(data[data.length - 1].time * 1000);
  console.log("firstTime: ", firstTime, "lastTime: ", lastTime);
  //calculate the number of days between the firstTime and lastTime
  let days = Math.floor((lastTime - firstTime) / (1000 * 60 * 60 * 24));
  let year = new Date(data[0].time * 1000).getFullYear();
  let dates = [];
  console.log("first: ", first, "last: ", last, "days: ", days);
  // for (let i = first; i <= last; i++) {
  //   console.log("i: ", i);
  //   dates.push(i);
  // }
  for (let i = 0; i <= days; i++) {
    let date = new Date(firstTime.getTime() + (i * 24 * 60 * 60 * 1000));
    let day = date.getDate();
    let month = monthArray[date.getMonth()];
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let dateString = day + " " + month + " " + year + " " + hours + ":" + minutes + ":" + seconds;
    dates.push(date);
  }
  let calendarDays = [];

  for (let i = 0; i < dates.length; i++) {
    let day = dates[i].getDate();
    let month = monthArray[dates[i].getMonth()];
    let year = dates[i].getFullYear();
    let hours = dates[i].getHours();
    let minutes = dates[i].getMinutes();
    let seconds = dates[i].getSeconds();
    let dateString = day + " " + month + " " + year + " " + hours + ":" + minutes + ":" + seconds;
    calendarDays.push(
      {
        year: year,
        month: month,
        day: day,
      });
  }

for (let i = 0; i < calendarDays.length; i++) {
  let date = new Date(
    calendarDays[i].year,
    monthArray.indexOf(calendarDays[i].month),
    calendarDays[i].day
  );
  let day = date.getDay();
  let dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dayOfWeek = dayName[day];
  let month = monthArray[date.getMonth()];
  let dayOfMonth = date.getDate();
  let year = date.getFullYear();
  let dateString = `${dayOfWeek} ${month} ${dayOfMonth} ${year}`;
  console.log(dateString);
  calendarDays[i].dateString = dateString;
  // console.log(i)
  console.log(calendarDays);
}

//return only the last 14 days if there are more than 14 days. Not counting cuurent day.
if (calendarDays.length >= 15) {

  // get the last 14 days (last day is yeasterday)

  let last14Days = calendarDays.slice(calendarDays.length - 15, calendarDays.length - 1);
  console.log(last14Days);
  return last14Days;

} else {
  return calendarDays;
}
    


  
}