const { connection } = require("../../config/sqlConfig/sqlConfig");

const deleteStudentController = (req, res) => {
	const { student_id } = req.params;

	if (!student_id) {
		return res.status(400).json({
			success: false,
			message: "Student ID is required",
		});
	}

	const query = "DELETE FROM student WHERE student_id = ?";

	connection.query(query, [student_id], (err, result) => {
		if (err) {
			console.error("Error deleting student:", err);
			return res.status(500).json({
				success: false,
				message: "An error occurred while deleting the student",
			});
		}

		if (result.affectedRows === 0) {
			return res.status(404).json({
				success: false,
				message: "Student not found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Student deleted successfully",
		});
	});
};

module.exports = deleteStudentController;
