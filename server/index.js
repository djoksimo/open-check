require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");

const { userRoutes } = require("./userRoutes");
const { StoreUtils } = require("./StoreUtils");
const app = express();

const port = process.env.PORT || 5000;

StoreUtils.client.on("error", function (error) {
  console.error("REDIS ERROR: ", error);
});

console.log("connecting to redis....");

StoreUtils.client.on("connect", () => {
  console.log("Connected to redis");
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get("/", (_req, res) => {
    res.send("<h1>Hello World!</h1>");
  });

  app.use("/user", userRoutes);

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
