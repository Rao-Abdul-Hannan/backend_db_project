const { connection } = require("../../config/sqlConfig/sqlConfig");

const readSpecificTeacherController = (req, res) => {
	const { teacher_id } = req.params; // Get `teacher_id` from the URL parameters

	// Validate `teacher_id`
	if (!teacher_id || isNaN(teacher_id)) {
		return res.status(400).json({
			success: false,
			message: "Invalid or missing teacher_id",
		});
	}

	// SQL query to fetch the teacher data by `teacher_id`
	const query = `SELECT * FROM teacher WHERE t_id = ?`;

	connection.query(query, [teacher_id], (err, results) => {
		if (err) {
			console.error("Error fetching teacher data:", err);
			return res.status(500).json({
				success: false,
				message: "Failed to fetch teacher data",
				error: err.message,
			});
		}

		if (results.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Teacher not found",
			});
		}

		return res.status(200).json({
			success: true,
			data: results[0], // Return the specific teacher's data
		});
	});
};

module.exports = readSpecificTeacherController;
