"use strict";
const mongoose = require("mongoose");
const os = require("os");
const process = require("process");

const _SECONDS = 5000;
// check connections
const countConnect = () => {
  const numConnections = mongoose.connections.length;
  console.log(`Connections: ${numConnections}`);
};

//check overloading
const checkOverload = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    const maxConnections = numCores * 5; // asume 5 connections per core
    console.log("Active connections:", numConnections);
    console.log(`Memory usage: ${memoryUsage /1024/ 1024} MB`);
    if (numConnections > maxConnections) {
      console.log(`Connection overload detected`);
      //send.notify(...);
    }
  }, _SECONDS);
};

module.exports = {
  countConnect,
  checkOverload
};
