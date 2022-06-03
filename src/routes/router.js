import express from "express";
import * as renderController from "../controllers/render-controller.js";
import * as musicController from "../controllers/music-controller.js";
import * as readingsController from "../controllers/readings-controller.js";
import * as apiController from "../controllers/api-controller.js";

export const router = express.Router();
router.get("/", (req, res) => {
  renderController.renderIndex(req, res);
});

router.get("/temperature", (req, res) => {
  renderController.renderTemperature(req, res);
});

router.get("/humidity", (req, res) => {
  renderController.renderHumidity(req, res);
});

router.get("/pressure", (req, res) => {
  renderController.renderPressure(req, res);
});

router.get("/update", (req, res) => {
  renderController.renderReadings(req, res);
});

router.get("/fullday:id", (req, res) => {
  try {
    renderController.renderFullDay(req, res);
  } catch (error) {
    res.render("pages/error", { error: error });
  }
});

router.get("/music", async (req, res) => {
  try {
    let musicUrls = await readingsController.getUrlReadings()
    console.log(musicUrls);
    res.render("pages/music", { musicUrls: musicUrls });
  } catch (error) {
    res.render("pages/error", { error: error });
  }
});

router.get("/api/allReadings", async (req, res) => {
  try {
    let readings = await readingsController.getReadings();
    res.status(200).json(readings);
  } catch (error) {
    res.status(401).json({ error: error });
  }
});

router.post("/api/fullDay:id", async (req, res) => {
  try {
    let readings = await apiController.getReadingsByDateAndType(req);
    res.status(200).json(readings);
  } catch (error) {
    res.status(401).json({ error: error });
  }
});

router.use("*", (req, res, next) => {
  const error = new Error("Not found.");
  error.status = 404;
  //  next(error)
  res.render("pages/error", { error: "404" });
});
