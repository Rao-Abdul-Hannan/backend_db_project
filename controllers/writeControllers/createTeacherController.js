const { connection } = require("../../config/sqlConfig/sqlConfig");

const createTeacherController = (req, res) => {
	const {
		t_id,
		FirstName,
		LastName,
		DateOfBirth,
		Gender,
		Email,
		PhoneNumber,
		Address,
        Salary,
        Status,
        DateOfJoining
	} = req.body;

	// if (
	// 	!t_id ||
	// 	!FirstName ||
	// 	!LastName ||
	// 	!DateOfBirth ||
	// 	!Gender ||
	// 	!Email ||
	// 	!PhoneNumber ||
	// 	!Address ||
	// 	!Salary ||
	// 	!Status ||
	// 	!DateOfJoining
	// ) {
	// 	return res.status(400).json({
	// 		success: false,
	// 		message: "Missing required fields",
	// 	});
	// }

	// if (!Number.isInteger(t_id)) {
	// 	return res.status(400).json({
	// 		success: false,
	// 		message: "Invalid teacher_id. It must be an integer.",
	// 	});
	// }
	
	const query = `
        INSERT INTO teacher (
        t_id,
		FirstName,
		LastName,
		DateOfBirth,
		Gender,
		Email,
		PhoneNumber,
		Address,
        Salary,
        Status,
        DateOfJoining
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

	const values = [
		t_id,
		FirstName,
		LastName,
		DateOfBirth,
		Gender,
		Email,
		PhoneNumber,
		Address,
		Salary,
		Status,
		DateOfJoining,
	];

	connection.query(query, values, (err, result) => {
		if (err) {
			console.error("Error adding teacher:", err);
			return res.status(500).json({
				success: false,
				message: "Failed to add teacher",
				error: err.message,
			});
		}

		return res.status(201).json({
			success: true,
			message: "Teacher added successfully",
			data: { t_id },
		});
	});
};

module.exports = createTeacherController;
