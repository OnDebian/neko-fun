const
	config = require("./config"),
	express = require("express"),
	nunjucks = require("nunjucks"),
	bodyParser = require("body-parser"),
	path = require("path");

const
	app = express(),
	env = nunjucks.configure("views");

const
	routes = {
		api: require("./routes/api"),
		static: require("./routes/static"),
		redirect: require("./routes/redirect")
	};

env.express(app);
app.set("trust proxy");
app.disable("x-powered-by");
app.set("view engine", "njk");
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/assets", express.static(path.resolve(__dirname, "public")));

app.all("*", (req, res, next) => {
	(config.global.blockedUsers.includes(req.ip))
		? res.render("blacklist", { page: "Blacklist" })
		: next();
});

app.use("/api", routes.api);
app.use("/", routes.redirect);
app.use("/", routes.static);

app.all("*", (req, res) => res.status(404).render("404", { page: "404" }));

app.listen(config.global.port, () => {
	console.log(`App listen on port ${config.global.port}`);
});