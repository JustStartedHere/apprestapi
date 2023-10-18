const express = require("express");
const auth = require("./auth");
var router = express.Router();

router.post('/api/v1/register', auth.registrasi);

module.exports = router;
