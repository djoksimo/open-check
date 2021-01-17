require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");

const { userRoutes } = require("./userRoutes");
const { apiRoutes } = require("./apiRoutes");
const { adminRoutes } = require("./adminRoutes");

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
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

  app.get("/", (_req, res) => {
    res.send("<h1>Hello World!</h1>");
  });

  app.use("/api", apiRoutes); // developers adding to their app
  app.use("/user", userRoutes); // for the actual
  app.use("/admin", adminRoutes); // admin for the developer to see and manage their users

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
