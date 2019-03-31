module.exports = {

	success: (res, message=null, data={}) => {
		res.status(200).json({
			success: true,
			message: message,
			data: data
		});
	},

	error: (res, code, message) => {
		res.status(code).json({
			success: false,
			code: code,
			message: message
		})
	}

}