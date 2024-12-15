const { connection } = require("../../config/sqlConfig/sqlConfig");

const readPeriodDataController = (req, res) => {
	const query = "SELECT * FROM period";

	connection.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching period:", err);
			return res.status(500).json({
				success: false,
				message: "Failed to retrieve period",
				error: err.message,
			});
		}

		return res.json({
			success: true,
			data: results,
		});
	});
};

module.exports = readPeriodDataController;
