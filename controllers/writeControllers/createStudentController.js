const { connection } = require("../../config/sqlConfig/sqlConfig");

const createStudentController = (req, res) => {
	const {
		student_id,
		s_first_name,
		s_middle_name,
		s_last_name,
		s_address,
		section_id,
		date_of_birth,
		Gender,
		Status
	} = req.body;

	// if (
	// 	!student_id ||
	// 	!s_first_name ||
	// 	!s_last_name ||
	// 	!s_address ||
	// 	!section_id ||
	// 	!date_of_birth ||
	// 	!Gender ||
	// 	!Status
	// ) {
	// 	return res.status(400).json({
	// 		success: false,
	// 		message: "Missing required fields",
	// 	});
	// }

	if (section_id < 1 || section_id > 11) {
		return res.status(400).json({
			success: false,
			message: "Section ID must be between 1 and 11",
		});
	}

	// if (!Number.isInteger(student_id)) {
	// 	return res.status(400).json({
	// 		success: false,
	// 		message: "Invalid student_id. It must be an integer.",
	// 	});
	// }

	const query = `
        INSERT INTO student (
            student_id, s_first_name, s_middle_name, s_last_name,
            s_address, section_id, date_of_birth, Gender, Status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

	const values = [
		student_id,
		s_first_name,
		s_middle_name,
		s_last_name,
		s_address,
		section_id,
		date_of_birth,
		Gender,
		Status
	];

	connection.query(query, values, (err, result) => {
		if (err) {
			console.error("Error adding student:", err);
			x;
			return res.status(500).json({
				success: false,
				message: "Failed to add student",
				error: err.message,
			});
		}

		return res.status(201).json({
			success: true,
			message: "Student added successfully",
			data: { student_id },
		});
	});
};

module.exports = createStudentController;
