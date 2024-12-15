const { connection } = require("../../config/sqlConfig/sqlConfig");

const readStudentMarksController = (req, res) => {
	const { marks, student_id } = req.params;

	// Validate required parameters
	if (!marks || isNaN(marks) || !student_id || isNaN(student_id)) {
		return res.status(400).json({
			success: false,
			message:
				'Invalid or missing parameters. Ensure "marks" and "student_id" are numeric.',
		});
	}

	const query = `
        SELECT DISTINCT 
            CONCAT(s.s_first_name, ' ', s.s_last_name) AS student_name,
            er.marks_obtained,
            sc.course_name AS subject_name
        FROM 
            exam_result er
        JOIN 
            Student s ON er.student_id = s.student_id
        JOIN 
            Exam e ON er.exam_id = e.exam_id
        JOIN 
            Subject_course sc ON e.subject_id = sc.course_id
        WHERE 
            er.marks_obtained > ? AND s.student_id = ?;
    `;

	const values = [marks, student_id];

	connection.query(query, values, (err, results) => {
		if (err) {
			console.error("Error fetching student marks:", err);
			return res.status(500).json({
				success: false,
				message: "Failed to fetch student marks",
				error: err.message,
			});
		}

		if (results.length === 0) {
			return res.status(404).json({
				success: false,
				message: "No data found for the given parameters",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Student marks fetched successfully",
			data: results,
		});
	});
};

module.exports = readStudentMarksController;
