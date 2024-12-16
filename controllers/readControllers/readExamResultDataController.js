const { connection } = require("../../config/sqlConfig/sqlConfig");

const readExamResultDataController = (req, res) => {
	const query = "SELECT * FROM exam_result";

	connection.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching exam result:", err);
			return res.status(500).json({
				success: false,
				message: "Failed to retrieve exam result",
				error: err.message,
			});
		}

		return res.json({
			success: true,
			data: results,
		});
	});
};

module.exports = readExamResultDataController;
