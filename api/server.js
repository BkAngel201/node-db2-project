const express = require("express");

const carDealerRouter = require("./routers/carDealerRouter");

const server = express();

server.use(express.json());
server.use("/api/carDealer/", carDealerRouter);

module.exports = server;
