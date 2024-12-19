const { connection } = require("../../config/sqlConfig/sqlConfig");

const readSpecificTeacherController = (req, res) => {
	const { teacher_id } = req.params; 

	if (!teacher_id || isNaN(teacher_id)) {
		return res.status(400).json({
			success: false,
			message: "Invalid or missing teacher_id",
		});
	}

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
			data: results[0], 
		});
	});
};

module.exports = readSpecificTeacherController;
