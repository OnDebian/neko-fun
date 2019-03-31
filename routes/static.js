const
	config = require("../config"),
	router = require("express").Router();

router.get("/", (req, res) => res.render("home", 
	{ page: "Home", domains: config.global.domains }
));

router.get("/faq", (req, res) => res.render("faq", 
	{ page: "FAQ", domains: config.global.domains, urllength: config.global.uidlength }
));

router.get("/tools", (req, res) => res.render("tools", 
	{ page: "Tools", domains: config.global.domains }
));

module.exports = router;