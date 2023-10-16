"use strict";

var response = require("./res"), ok = require("./ok");
var connection = require("./koneksi");

exports.index = function (req, res) {
  ok.ok("Aplikasi REST API ku berjalan !");
};
