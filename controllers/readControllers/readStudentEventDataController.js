const { connection } = require("../../config/sqlConfig/sqlConfig");

const readStudentEventDataController = (req, res) => {
	const query = "SELECT * FROM student_event";

	connection.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching student events data:", err);
			return res.status(500).json({
				success: false,
				message: "Failed to retrieve student events data",
				error: err.message,
			});
		}

		return res.json({
			success: true,
			data: results,
		});
	});
};

module.exports = readStudentEventDataController;
