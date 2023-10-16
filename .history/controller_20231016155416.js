"use strict";

var response = require("./res");
var connection = require("./koneksi");

export function index (req, res) {
  response.ok("Aplikasi REST API ku berjalan !");
};
