import * as readingsController from "./readings-controller.js";
import * as extractDataController from "./extractData-controller.js";


const hourLabels = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
const minuteLabels = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];

export function renderIndex(req, res) {
  res.render("pages/index", {});
}

export async function renderTemperature(req, res) {

  try {
    let readings = await readingsController.getReadings(Date.now() - 86400000, Date.now());
    let allData = await readingsController.getReadings(0, Date.now());

    let data = extractDataController.extractData(readings);
    let calendarDates = extractDataController.createCalendarDays(allData);
    console.log(calendarDates);
    res.render("pages/readings", {
      data: data.temperature,
      time: data.time,
      count: allData.length,
      type: "Temperature",
      uptime: extractDataController.convertMinutesToTime(allData.length),
      calendarDates: calendarDates,
      timeSpan: "Last hour",
      date: "",
      labels: minuteLabels,
    });
  } catch (err) {
    res.render("pages/error", { error: err });
  }
}

export async function renderHumidity(req, res) {
  try {
    let readings = await readingsController.getReadings(Date.now() - 86400000, Date.now());
    let allData = await readingsController.getReadings(0, Date.now());

    let data = extractDataController.extractData(readings);

    // console.log(allData);
    let calendarDates = extractDataController.createCalendarDays(allData);
    res.render("pages/readings", {
      data: data.humidity,
      time: data.time,
      count: allData.length,
      type: "Humidity",
      uptime: extractDataController.convertMinutesToTime(allData.length),
      calendarDates: calendarDates,
      timeSpan: "Last hour",
      date: "",
      labels: minuteLabels,
    });
  } catch (err) {
    res.render("pages/error", { error: err });
  }
}

export async function renderPressure(req, res) {
  try {
    let readings = await readingsController.getReadings(Date.now() - 86400000, Date.now());
    let allData = await readingsController.getReadings(0, Date.now());

    let data = extractDataController.extractData(readings);

    // console.log(allData);
    let calendarDates = extractDataController.createCalendarDays(allData);
    res.render("pages/readings", {
      data: data.pressure,
      time: data.time,
      count: allData.length,
      type: "Pressure",
      uptime: extractDataController.convertMinutesToTime(allData.length),
      calendarDates: calendarDates,
      timeSpan: "Last hour",
      date: "",
      labels: minuteLabels,
    });
  } catch (err) {
    res.render("pages/error", { error: err });
  }
}


export async function renderFullDay(req, res) {
  let allData = await readingsController.getReadings(0, Date.now());
  let params = (req.params.id.split(','));
  let date = params[0];
  let type = params[1];
  let year = params[2];
  let month = params[3];
  let day = params[4];
  try {
    month = month.replace("\"", "");
    month = month.replace("\"", "");
    month = month.replace(" ", "");
    day = day.replace(")", "");
    day = day.replace(" ", "");
    year = year.replace(" ", "");
    type = type.replace(" ", "");

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
    let dateStringStartTime = `${month} ${day}, ${year} 00:00:00`;
    let dateStringEndTime = `${month} ${Number(day) + 1}, ${year} 00:00:00`;
    let dateStart = new Date(
      dateStringStartTime
    );
    let dateEnd = new Date(
      dateStringEndTime
    );
    let startTime = dateStart.getTime() / 1000;
    let endTime = dateEnd.getTime() / 1000;
    // get all readings between start and end time
    let readings = await readingsController.getReadings(startTime * 1000, endTime * 1000);
    let data = []
    let calenderDays = extractDataController.createCalendarDays(await readingsController.getReadings(0, Date.now()));
    for (let i = 0; i < readings.length; i++) {
      if (readings[i].time >= startTime && readings[i].time <= endTime) {
        data.push(readings[i]);
      }
    }

    if (type === "Temperature") {
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].temperature.toFixed(2);
      }
      res.render("pages/readings", {
        data: data,
        type: type,
        count: allData.length,
        uptime: extractDataController.convertMinutesToTime(allData.length),
        calendarDates: calenderDays,
        timeSpan: "Full day: ",
        date: `${month} ${day}, ${year}`,
        labels: hourLabels,

      });
    }
    if (type === "Humidity") {

      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].humidity.toFixed(2);
      }


      res.render("pages/readings", {
        data: data,
        type: type,
        count: allData.length,
        uptime: extractDataController.convertMinutesToTime(allData.length),
        calendarDates: calenderDays,
        timeSpan: "Full day: ",
        date: `${month} ${day}, ${year}`,
        labels: hourLabels,
      });
    }
    if (type === "Pressure") {
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].pressure.toFixed(2);
      }

      res.render("pages/readings", {
        data: data,
        type: type,
        count: allData.length,
        uptime: extractDataController.convertMinutesToTime(allData.length),
        calendarDates: calenderDays,
        timeSpan: "Full day: ",
        date: `${month} ${day}, ${year}`,
        labels: hourLabels,
      });
    }
  } catch (err) {
    res.render("pages/error", { error: err });
  }
}

