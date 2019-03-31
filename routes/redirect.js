const
	config = require("../config"),
	redirect = require("../controllers/RedirectController"),
	router = require("express").Router();

router.get(`/:uid([0-9a-z]{${config.global.uidlength}})`, (req, res, next) => redirect.send(req, res, next));

module.exports = router;