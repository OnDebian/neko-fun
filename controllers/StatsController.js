const
	config = require("../config"),
	db = require("knex")(config.database),
	response = require("../controllers/ResponseController"),
	urlc = require("./URLController");

module.exports = {

	global: async (res) => {
		try {
			let urls = await db("urls").count({all: "*"});
			response.success(res, null, {
				urls: urls
			});
		} catch (error) {
			response.error(res, 500, "Unable to get stats");
		}
	},

	byUID: async (req, res) => {
		try {
			let uidInfos = await urlc.getUID(req.params.uid);
			if(!uidInfos) return response.error(res, 400, "Invalid url uid");
			return response.success(res, null, {
				uid: uidInfos["url_uid"],
				domain: uidInfos["domain"],
				url: `//${uidInfos["domain"]}/${uidInfos["url_uid"]}`,
				used: uidInfos["used"],
				delete_timestamp: uidInfos["deleted_time"]
			});
		} catch (error) {
			response.error(res, 500, "Unable to get stats");
		}
	}

}