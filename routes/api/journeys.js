const express = require("express");
const router = express.Router();
const Journey = require('../../models/Journey');

router.get("/test", (req, res) => res.json({ msg: "This is the journeys route" }));

module.exports = router;