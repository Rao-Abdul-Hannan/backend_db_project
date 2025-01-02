const { connection } = require("../../config/sqlConfig/sqlConfig");

const updateTeacherController = (req, res) => {
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
		DateOfJoining,
	} = req.body;

	if (
		!t_id ||
		!FirstName ||
		!LastName ||
		!DateOfBirth ||
		!Gender ||
		!Email ||
		!PhoneNumber ||
		!Address ||
		!Salary ||
		!Status ||
		!DateOfJoining
	) {
		return res.status(400).json({
			success: false,
			message: "Missing required fields",
		});
	}

	const currentDate = new Date();
	const dob = new Date(DateOfBirth);
	const doj = new Date(DateOfJoining);

	const age = currentDate.getFullYear() - dob.getFullYear();
	if (age < 20) {
		return res.status(400).json({
			success: false,
			message: "Teacher's age must be greater than 20 years",
		});
	}

	if (dob >= doj) {
		return res.status(400).json({
			success: false,
			message: "Date of Birth must be earlier than Date of Joining",
		});
	}

	if (Salary < 0) {
		return res.status(400).json({
			success: false,
			message: "Salary cannot be negative",
		});
	}

	const query = `
    UPDATE teacher 
    SET 
        FirstName = ?, 
        LastName = ?, 
        DateOfBirth = ?, 
        Gender = ?, 
        Email = ?, 
        PhoneNumber = ?, 
        Address = ?, 
        Salary = ?, 
        Status = ?, 
        DateOfJoining = ?
    WHERE 
        t_id = ?
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
				message: "Failed to update teacher",
				error: err.message,
			});
		}

		return res.status(201).json({
			success: true,
			message: "Teacher updated successfully",
			data: { t_id },
		});
	});
};

module.exports = updateTeacherController;
