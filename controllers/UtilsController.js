module.exports = {

	randomstr: (length) => {
		return new Promise((resolve) => {
			let chars = "azertyuiopqsdfghjklmwxcvbn0123456789";
			let str = "";
			for (let i = 0; i < length; i++) {
				str += chars.charAt(Math.floor(Math.random() * chars.length));
			}
			resolve(str);
		});
	},

	isUrl: (url) => {
		return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(url);
	},

	addDays: (date, days) => {
		let result = new Date(date);
		return result.setDate(result.getDate() + days);
	}

}