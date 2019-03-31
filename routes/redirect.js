const
	config = require("../config"),
	redirect = require("../controllers/RedirectController"),
	router = require("express").Router();

router.get("/", (req, res, next) => redirect.send(req, res, next));

module.exports = router;