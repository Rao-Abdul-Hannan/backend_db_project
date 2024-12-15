const { connection } = require("../../config/sqlConfig/sqlConfig");

const readParentDataController = (req, res) => {
	const query = "SELECT * FROM parent";

	connection.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching parent:", err);
			return res.status(500).json({
				success: false,
				message: "Failed to retrieve parent",
				error: err.message,
			});
		}

		return res.json({
			success: true,
			data: results,
		});
	});
};

module.exports = readParentDataController;
