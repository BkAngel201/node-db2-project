const express = require("express");

const router = express.Router();

const db = require("../../data/data-config");

router.get("/", async (req, res) => {
  try {
    const cars = await db("car-info");
    res.status(200).json(cars);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ errorMessage: "Problem at retrieving info from DB", error: err });
  }
});

router.get("/:id", validateCarID, async (req, res) => {
  res.status(200).json(req.carInfo);
});

router.post("/", validateBody, async (req, res) => {
  const body = req.body;

  try {
    const car = await db("car-info").insert(body);
    res.status(201).json(car);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ errorMessage: "Problem at retrieving info from DB", error: err });
  }
});

router.put("/:id", validateCarID, validateBody, async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const car = await db("car-info").where({ carID: id }).update(body);
    res.status(200).json(car);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ errorMessage: "Problem at retrieving info from DB", error: err });
  }
});

router.delete("/:id", validateCarID, async (req, res) => {
  const { id } = req.params;

  try {
    const car = await db("car-info").where({ carID: id }).del();
    res.status(200).json(car);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ errorMessage: "Problem at retrieving info from DB", error: err });
  }
});

// Middleware Functions

function validateBody(req, res, next) {
  const body = req.body;

  if (!body || body === {}) {
    res.status(400).json({ message: "Missing Car Info data" });
  } else {
    if (
      body.carMake &&
      body.carModel &&
      body.carMileage &&
      body.carTransmission &&
      body.carTitleStatus
    ) {
      next();
    } else {
      res.status(400).json({ message: "Missing required fields" });
    }
  }
}

async function validateCarID(req, res, next) {
  const { id } = req.params;

  try {
    const car = await db("car-info").where({ carID: id });
    if (car.length === 0) {
      res.status(400).json({ errorMessage: "That car ID is not in the DB" });
    } else {
      req.carInfo = car;
      next();
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ errorMessage: "Problem at retrieving info from DB", error: err });
  }
}

module.exports = router;
