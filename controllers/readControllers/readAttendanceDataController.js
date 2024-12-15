const { connection } = require("../../config/sqlConfig/sqlConfig");

const readAttendanceDataController = (req, res) => {
	const query = "SELECT * FROM attendance";

	connection.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching attendance:", err);
			return res.status(500).json({
				success: false,
				message: "Failed to retrieve attendance data",
				error: err.message,
			});
		}

		return res.json({
			success: true,
			data: results,
		});
	});
};

module.exports = readAttendanceDataController;
