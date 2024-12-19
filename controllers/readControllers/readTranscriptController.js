const { connection } = require("../../config/sqlConfig/sqlConfig");

const readTranscriptController = (req, res) => {
	const { student_id } = req.params; 

	if (!student_id) {
		return res.status(400).json({
			success: false,
			message: "Student ID is required",
		});
	}

	const query = `
        SELECT 
            s.student_id,
            CONCAT(s.s_first_name, ' ', IFNULL(s.s_middle_name, ''), ' ', s.s_last_name) AS student_name,
    sc.course_name AS subject_name,
            sc.course_name AS subject_name,
            er.marks_obtained,
            sr.Grade,
            e.date AS exam_date
        FROM 
            Student s
        JOIN 
            exam_result er ON s.student_id = er.student_id
        JOIN 
            Exam e ON er.exam_id = e.exam_id
        JOIN 
            Subject_course sc ON e.subject_id = sc.course_id
        JOIN 
            score_range sr ON er.marks_obtained BETWEEN sr.min AND sr.max
        WHERE 
            s.student_id = ?;
    `;

	connection.query(query, [student_id], (err, results) => {
		if (err) {
			console.error("Error fetching transcript:", err);
			return res.status(500).json({
				success: false,
				message: "Failed to fetch transcript",
				error: err.message,
			});
		}

		if (results.length === 0) {
			return res.status(404).json({
				success: false,
				message: `No transcript found for student_id ${student_id}`,
			});
		}

		return res.status(200).json({
			success: true,
			message: "Transcript fetched successfully",
			data: results,
		});
	});
};

module.exports = readTranscriptController;
