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

	if (
		!student_id ||
		!s_first_name ||
		!s_last_name ||
		!s_address ||
		!section_id ||
		!date_of_birth ||
		!Gender ||
		!Status
	) {
		return res.status(400).json({
			success: false,
			message: "Missing required fields",
		});
	}

	if (section_id < 1 || section_id > 11) {
		return res.status(400).json({
			success: false,
			message: "Section ID must be between 1 and 11",
		});
	}

	const today = new Date();
	const birthDate = new Date(date_of_birth);
	const age = today.getFullYear() - birthDate.getFullYear();
	const isValidAge =
		today.setFullYear(today.getFullYear()) >=
		birthDate.setFullYear(birthDate.getFullYear());

	if (age < 4 || (age === 4 && !isValidAge)) {
		return res.status(400).json({
			success: false,
			message: "Student must be at least 4 years old",
		});
	}

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
