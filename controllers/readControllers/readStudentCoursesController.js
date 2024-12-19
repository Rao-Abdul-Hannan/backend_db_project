const { connection } = require("../../config/sqlConfig/sqlConfig");

const readStudentCoursesController = (req, res) => {
	const { student_id } = req.params;

	if (!student_id || isNaN(student_id)) {
		return res.status(400).json({
			success: false,
			message:
				"Invalid or missing student_id. Please provide a valid numeric student_id.",
		});
	}

	const query = `
        SELECT 
            CONCAT(s.s_first_name, ' ', s.s_last_name) AS student_name,
            sc.course_name AS subject_name
        FROM 
            Student s
        JOIN 
            Section sec ON s.student_id = sec.section_id
        JOIN 
            Course_teacher ct ON sec.section_id = ct.section_id
        JOIN 
            Subject_course sc ON ct.subject_id = sc.course_id
        WHERE 
            s.student_id = ?;
    `;

	const values = [student_id];

	connection.query(query, values, (err, results) => {
		if (err) {
			console.error("Error fetching student courses:", err);
			return res.status(500).json({
				success: false,
				message: "Failed to fetch student courses",
				error: err.message,
			});
		}

		if (results.length === 0) {
			return res.status(404).json({
				success: false,
				message: "No courses found for the given student_id",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Student courses fetched successfully",
			data: results,
		});
	});
};

module.exports = readStudentCoursesController;
