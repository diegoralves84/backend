const express = require('express');
const auth = require("../middlewares/auth");
const router = express.Router();


router.get("/", auth.verificarToken, function(req, res, next) {
  res.json("API ESTA ON");
});

module.exports = router;
