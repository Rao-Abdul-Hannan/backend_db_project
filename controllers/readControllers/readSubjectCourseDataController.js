
const { connection } = require("../../config/sqlConfig/sqlConfig");

const readSubjectCourseDataController = (req, res) => {
	const query = "SELECT * FROM subject_course";

	connection.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching subject course data:", err);
			return res.status(500).json({
				success: false,
				message: "Failed to retrieve subject course data",
				error: err.message,
			});
		}

		return res.json({
			success: true,
			data: results,
		});
	});
};

module.exports = readSubjectCourseDataController;
