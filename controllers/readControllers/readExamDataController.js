const { connection } = require("../../config/sqlConfig/sqlConfig");

const readExamDataController = (req, res) => {
	const query = "SELECT * FROM exam";

	connection.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching exam data:", err);
			return res.status(500).json({
				success: false,
				message: "Failed to retrieve exam data",
				error: err.message,
			});
		}

		return res.json({
			success: true,
			data: results,
		});
	});
};

module.exports = readExamDataController;
