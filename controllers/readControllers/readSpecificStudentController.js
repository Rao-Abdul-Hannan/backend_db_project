const { connection } = require("../../config/sqlConfig/sqlConfig");

const readSpecificStudentController = (req, res) => {
	const { student_id } = req.params; // Get `student_id` from the URL parameters

	// Validate `student_id`
	if (!student_id || isNaN(student_id)) {
		return res.status(400).json({
			success: false,
			message: "Invalid or missing student_id",
		});
	}

	// SQL query to fetch the student data by `student_id`
	const query = `SELECT * FROM student WHERE student_id = ?`;

	connection.query(query, [student_id], (err, results) => {
		if (err) {
			console.error("Error fetching student data:", err);
			return res.status(500).json({
				success: false,
				message: "Failed to fetch student data",
				error: err.message,
			});
		}

		if (results.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Student not found",
			});
		}

		return res.status(200).json({
			success: true,
			data: results[0], // Return the specific student's data
		});
	});
};

module.exports = readSpecificStudentController;
