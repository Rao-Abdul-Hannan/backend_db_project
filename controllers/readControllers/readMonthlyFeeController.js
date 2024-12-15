const { connection } = require("../../config/sqlConfig/sqlConfig");

const readMonthlyFeeController = (req, res) => {
	const query = "SELECT * FROM monthly_fee";

	connection.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching monthly fee:", err);
			return res.status(500).json({
				success: false,
				message: "Failed to retrieve monthly fee",
				error: err.message,
			});
		}

		return res.json({
			success: true,
			data: results,
		});
	});
};

module.exports = readMonthlyFeeController;
