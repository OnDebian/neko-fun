const
	config = require("../config"),
	db = require("knex")(config.database),
	response = require("../controllers/ResponseController"),
	utils = require("./UtilsController"),
	urlc = require("./URLController");

module.exports = {

	shorten: async (req, res) => {

		const
			domain = req.body.domain,
			url = req.body.url,
			time = req.body.time;
		
		if(!domain) return response.error(res, 400, "No domain given");
		if(!config.global.domains.includes(domain)) return response.error(res, 400, "Invalid domain");
		if(!url) return response.error(res, 400, "No url given");
		if(!utils.isUrl(url)) return response.error(res, 400, "Invalid url");
		if(!time) return response.error(res, 400, "No end time given");
		if(!["24", "168", "infini"].includes(time)) return response.error(res, 400, "Invalid delete time");

		const start = Date.now();
		const name = await urlc.uniqURL(domain);
		const end = (time && time !== "infini")
					? utils.addDays(start, time)
					: null;

		db("urls").insert({
			url_uid: name,
			domain: domain,
			redirect: url,
			added_time: start,
			deleted_time: end
		})
			.then(() => {
				return response.success(res, null, {
					uid: name,
					domain: domain,
					redirect: url,
					added_time: start,
					deleted_time: end
				});
			})
			.catch(err => {
				console.error(err);
				return response.error(res, 500, "Unable to save url");
			})
	}

}