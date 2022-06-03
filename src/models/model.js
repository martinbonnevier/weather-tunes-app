import mongoose from "mongoose";

const SenseHatSchema = new mongoose.Schema({
  time: {
    type: Date,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  pressure: {
    type: Number,
    required: true,
  }

});
const senseHatModel = mongoose.model("python", SenseHatSchema);
export default senseHatModel;
// const bearModel = mongoose.model("bears", bearSchema);
// export default bearModel;
// module.exports = SenseHatReading;