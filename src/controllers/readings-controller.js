import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import senseHatModel from '../models/model.js';
dotenv.config();

// Connect to mongodb atlas

export async function connectDB() {
  const mongoString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@iotcluster.pfotz.mongodb.net/UserData?retryWrites=true&w=majority`;
  try {
    const client = await MongoClient.connect(mongoString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const db = client.db('UserData');
    console.log("Connected successfully to server");
    return db;
  } catch (error) {
    console.log(error);
  }
}
//get all readings from db audio
export async function getUrlReadings() {
  const db = await connectDB();
  const readings = await db.collection('audio').find({}).toArray();
  console.log(readings);
  return readings;
}

// Search for all readings

export async function getReadings(timestampStart, timestampEnd) {
  try {
    const db = await connectDB();
    // get all readings between timestampStart and timestampEnd
    const readings = await db.collection('python').find({
      time: {
        $gte: timestampStart / 1000,
        $lte: timestampEnd / 1000
      }
    }).toArray();
    closeConnection();
    return readings;
  } catch (error) {
    console.log(error.message);
  }
}
export async function getFirstReading() {
  try {
    const db = await connectDB();

    const readings = await db.collection('python').find({}).limit(1).toArray();
    closeConnection();
    return readings;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getLastReading() {
  try {
    const db = await connectDB();

    const readings = await db.collection('python').find({}).limit(1).sort({ time: -1 }).toArray();
    closeConnection();
    return readings;
  } catch (error) {
    console.log(error.message);
  }
}

function closeConnection() {
  console.log("close connection to db");
  mongoose.connection.close();
}


