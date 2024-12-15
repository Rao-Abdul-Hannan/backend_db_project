const { connection } = require("../../config/sqlConfig/sqlConfig");

const readTeacherTeachingSectionsController = (req, res) => {
	// Capture the teacher_id from the URL parameters
	const teacher_id = req.params.t_id;

	// Validate teacher_id
	if (!teacher_id) {
		return res.status(400).json({
			success: false,
			message: "Teacher ID is required",
		});
	}

	// SQL query to fetch teaching sections for a specific teacher
	const query = `
        SELECT 
            t.firstname AS teacher_first_name,
            t.lastname AS teacher_last_name,
            sc.course_name AS course_name,
            sec.section_name AS section_name,
            c.class_name AS class_name
        FROM 
            Teacher t
        JOIN 
            Course_teacher ct ON t.t_id = ct.teacher_id
        JOIN 
            Subject_course sc ON ct.subject_id = sc.course_id
        JOIN 
            Section sec ON ct.section_id = sec.section_id
        JOIN 
            Classroom c ON sec.class_id = c.classroom_id
        WHERE 
            t.t_id = ?;
    `;

	// Run the query with the teacher_id as a parameter
	connection.query(query, [teacher_id], (err, result) => {
		if (err) {
			console.error("Error fetching teacher's teaching sections:", err);
			return res.status(500).json({
				success: false,
				message: "Failed to fetch teacher's teaching sections",
				error: err.message,
			});
		}

		// Check if any data was returned
		if (result.length === 0) {
			return res.status(404).json({
				success: false,
				message: `No teaching sections found for teacher with ID ${teacher_id}`,
			});
		}

		// Send back the results
		return res.status(200).json({
			success: true,
			data: result,
		});
	});
};

module.exports = readTeacherTeachingSectionsController;