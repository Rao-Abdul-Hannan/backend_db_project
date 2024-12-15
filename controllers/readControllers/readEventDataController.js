const { connection } = require("../../config/sqlConfig/sqlConfig");

const readEventDataController = (req, res) => {
	const query = "SELECT * FROM events";

	connection.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching classroom data:", err);
			return res.status(500).json({
				success: false,
				message: "Failed to retrieve classroom data",
				error: err.message,
			});
		}

		return res.json({
			success: true,
			data: results,
		});
	});
};

module.exports = readEventDataController;
