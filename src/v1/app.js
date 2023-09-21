const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const createError = require("http-errors");
const eventLogs = require("./utils/eventLog");
const compression = require("compression");
// const { checkOverload } = require('./helper/check.connect');

const app = express();
// init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("common"));
app.use(compression());

// init routes
app.use(require("./routes/index.router"));

// init db
require("./databases/init.mongodb");
// checkOverload();

// handling error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  eventLogs(`${req.method}---- ${req.url}---${error.message}`);
  const statusCode = error.status || 500;
  res.status(statusCode).json({
    status: "Error",
    code: statusCode,
    message: error.message || "Internal server error",
  });
});

module.exports = app;
