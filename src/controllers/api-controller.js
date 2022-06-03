import { getReadings } from "../controllers/readings-controller.js";

export async function getReadingsByDateAndType(req) {
  let params = (req.params.id.split(','));
  let type = params[0];
  type = type.replace(":id=", "");
  let year = params[1];
  let month = params[2];
  let day = params[3];
  let date = new Date(year, month, day);
  let timestampStart = date.getTime();
  timestampStart = timestampStart / 1000;
  let timestampEnd = date.getTime() + 86400000;
  timestampEnd = timestampEnd / 1000;

  try {
    let readings = await getReadings(timestampStart, timestampEnd);
    let data = [];
    for(let i = 0; i < readings.length; i++) {
      let time = readings[i].time;
      if(Number(time) >= Number(timestampStart) && Number(time) <= Number(timestampEnd)) {
        type = type.toLowerCase(); 
        data.push(readings[i][type]);
      }
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}