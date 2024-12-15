const { connection } = require("../../config/sqlConfig/sqlConfig");

const readAllTeachersController = (req, res) => {
	const query = "SELECT * FROM teacher";

	connection.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching teachers:", err);
			return res.status(500).json({
				success: false,
				message: "Failed to retrieve teachers",
				error: err.message,
			});
		}

		return res.json({
			success: true,
			data: results,
		});
	});
};

module.exports = readAllTeachersController;
