const { connection } = require("../../config/sqlConfig/sqlConfig");

const deleteTeacherController = (req, res) => {
	const { t_id } = req.params;

	if (!t_id) {
		return res.status(400).json({
			success: false,
			message: "Teacher ID is required",
		});
	}

	const query = "DELETE FROM teacher WHERE t_id = ?";

	connection.query(query, [t_id], (err, result) => {
		if (err) {
			console.error("Error deleting teacher:", err);
			return res.status(500).json({
				success: false,
				message: "An error occurred while deleting the teacher",
			});
		}

		if (result.affectedRows === 0) {
			return res.status(404).json({
				success: false,
				message: "Teacher not found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Teacher deleted successfully",
		});
	});
};

module.exports = deleteTeacherController;
