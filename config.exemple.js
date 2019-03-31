module.exports = {

	global: {
		// port of web
		port: 2500,
		// domains who users can use
		domains: [],
		// blacklist of user ip
		blockedUsers: [],
		// length of url uid
		uidlength: 6,
		// numbers of retry for generate uid
		retries: 15
	},

	database: {
		client: "mysql",
		connection: {
			host: "127.0.0.1",
			port: 3306,
			user: "",
			password: "",
			database: ""
		}
	}

}