const { connection } = require("../../config/sqlConfig/sqlConfig");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { config } = dotenv;
config()

const adminSignUpController = (req, res) => {
	const { firstName, lastName, email, cnic, phoneNo, password1 } = req.body;

	if (!firstName || !lastName || !email || !cnic || !phoneNo || !password1) {
		return res.status(400).json({ message: "All fields are required." });
	}

	// Check if the `admins` table exists
	const createTableQuery = `
        CREATE TABLE IF NOT EXISTS admins (
            id INT AUTO_INCREMENT PRIMARY KEY,
            firstName VARCHAR(50) NOT NULL,
            lastName VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            cnic VARCHAR(20) NOT NULL,
            phoneNo VARCHAR(20) NOT NULL,
            password VARCHAR(255) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

	connection.query(createTableQuery, (err) => {
		if (err) {
			console.error("Error creating table:", err);
			return res
				.status(500)
				.json({ message: "Error creating admin table." });
		}

		// Check if an admin with the same email exists
		const checkAdminQuery = `SELECT * FROM admins WHERE email = ?`;
		connection.query(checkAdminQuery, [email], (err, results) => {
			if (err) {
				console.error("Error checking for existing admin:", err);
				return res
					.status(500)
					.json({ message: "Error checking admin." });
			}

			if (results.length > 0) {
				return res
					.status(409)
					.json({ message: "Admin with this email already exists." });
			}

            const SALT_ROUNDS = +process.env.SALT_ROUNDS;
            const salt = bcrypt.genSaltSync(SALT_ROUNDS);
			const password = bcrypt.hashSync(password1, salt);

			const insertAdminQuery = `
                INSERT INTO admins (firstName, lastName, email, cnic, phoneNo, password)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
			connection.query(
				insertAdminQuery,
				[firstName, lastName, email, cnic, phoneNo, password],
				(err, result) => {
					if (err) {
						console.error("Error inserting admin:", err);
						return res
							.status(500)
							.json({ message: "Error adding admin." });
					}

					return res
						.status(201)
						.json({
							message: "Admin added successfully.",
							adminId: result.insertId,
						});
				}
			);
		});
	});
};
module.exports = adminSignUpController;
