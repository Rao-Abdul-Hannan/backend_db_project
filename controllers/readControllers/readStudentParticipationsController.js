const { connection } = require("../../config/sqlConfig/sqlConfig");

const readStudentParticipationsController = (req, res) => {
	// SQL query to fetch distinct student names who participated in events
	const query = `
        SELECT DISTINCT 
            CONCAT(s.s_first_name, ' ', s.s_last_name) AS student_name,
            s.s_address as address,
            s.section_id as section,
            s.gender as gender
        FROM 
            Student s
        JOIN 
            Student_Event se ON s.student_id = se.student_id;
    `;

	// Execute the query
	connection.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching student participations:", err);
			return res.status(500).json({
				success: false,
				message: "Failed to fetch student participations",
				error: err.message,
			});
		}

		// Check if any data was returned
		if (results.length === 0) {
			return res.status(404).json({
				success: false,
				message: "No student participations found",
			});
		}

		// Send back the results
		return res.status(200).json({
			success: true,
			data: results,
		});
	});
};

module.exports = readStudentParticipationsController;
