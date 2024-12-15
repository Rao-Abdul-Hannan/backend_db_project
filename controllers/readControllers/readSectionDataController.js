const { connection } = require("../../config/sqlConfig/sqlConfig");

const readSectionDataController = (req, res) => {
	const query = "SELECT * FROM section";

	connection.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching section data:", err);
			return res.status(500).json({
				success: false,
				message: "Failed to retrieve section data",
				error: err.message,
			});
		}

		return res.json({
			success: true,
			data: results,
		});
	});
};

module.exports = readSectionDataController;
