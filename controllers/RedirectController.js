const
	urlc = require("./URLController");

module.exports = {

	send: async (req, res, next) => {
		try {
			let uidInfos = await urlc.getUID(req.params.uid);
			if(!uidInfos) return next();
			//if(req.hostname !== uidInfos.domain) return next();
			await urlc.update(req.params.uid, uidInfos.used);
			res.redirect(uidInfos.redirect);
		} catch (err) {
			console.error(err);
			return res.status(500).render("500", {page:"500"});
		}
	}

}