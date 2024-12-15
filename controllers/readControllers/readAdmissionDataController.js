// controllers/readAllStudentsController.js
const { connection } = require("../../config/sqlConfig/sqlConfig");

const readAdmissionDataController = (req, res) => {
	const query = "SELECT * FROM admission";

	connection.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching admission:", err);
			return res.status(500).json({
				success: false,
				message: "Failed to retrieve admission data",
				error: err.message,
			});
		}

		return res.json({
			success: true,
			data: results,
		});
	});
};

module.exports = readAdmissionDataController;
