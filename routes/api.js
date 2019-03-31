const
	config = require("../config"),
	stats = require("../controllers/StatsController"),
	shortener = require("../controllers/ShortenerController"),
	response = require("../controllers/ResponseController"),
	router = require("express").Router();

router.post("/shorten", (req, res) => shortener.shorten(req, res));

router.get("/stats", (req, res) => stats.global(res));

router.get(`/stats/:uid([0-9a-z]{${config.global.uidlength}})`, (req, res) => stats.byUID(req, res));

router.get("/test", (req, res) => shortener.test());

router.all("*", (req, res) => {
	response.error(res, 404, "Not Found");
});

module.exports = router;