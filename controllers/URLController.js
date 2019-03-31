const
	utils = require("./UtilsController"),
	config = require("../config"),
	db = require("knex")(config.database);

module.exports = {

	getUID: (uid) => {
		return new Promise(async (resolve, reject) => {
			db("urls").where({
				url_uid: uid
			})
				.then(res => {
					if (res[0]) return resolve(res[0]);
					return resolve(false);
				})
				.catch(err => reject(err));
		});
	},

	update: (uid, used) => {
		return new Promise(async (resolve, reject) => {
			db("urls").where({
				url_uid: uid
			})
				.update({ used: used + 1 })
				.then(res => {
					resolve();
				})
				.catch(err => reject(err));
		});
	},

	uniqURL: async (domain) => {
		return new Promise(async (resolve, reject) => {
			let retries = config.global.retries;
			do {
				if (retries-- == 0) return resolve(false);
				var uid = await utils.randomstr(config.global.uidlength);
				var count = await db("urls").where({ url_uid: uid, domain: domain }).count({ all: "*" });
			} while (count[0].all !== 0);
			return resolve(uid);
		})
	},

	delete: () => {
		return new Promise(async (resolve, reject) => {
			let time = Date.now();
			try {
				let deleted = await db("urls").where("deleted_time", "<", time).del();
				resolve(deleted);
			} catch (err) {
				reject(err);
			}
		});
	}
}