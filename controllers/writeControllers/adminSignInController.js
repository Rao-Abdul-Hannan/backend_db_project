const { connection } = require("../../config/sqlConfig/sqlConfig");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { config } = dotenv;
config();

const adminSignInController = async (req, res) => {
	const { email, password1 } = req.body;

	if (!email || !password1) {
		return res.status(400).json({
			success: false,
			message: "Email and password are required.",
		});
	}

	const findAdminQuery = "SELECT * FROM admins WHERE email = ?";

	connection.query(findAdminQuery, [email], (err, results) => {
		if (err) {
			console.error("Error fetching admin:", err);
			return res.status(500).json({
				success: false,
				message: "An error occurred while checking admin credentials.",
			});
		}

		if (results.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Admin not found.",
			});
		}

		const existingAdmin = results[0];
		const hashedPassword = existingAdmin.password;

		const isPasswordMatched = bcrypt.compareSync(password1, hashedPassword);

		if (!isPasswordMatched) {
			return res.status(401).json({
				success: false,
				message: "Incorrect email or password.",
			});
		}

		const authToken = jwt.sign(
			{ email: existingAdmin.email, id: existingAdmin.id },
			process.env.JWT_SECRET
		);

		// Respond with success, auth token, and admin details
		return res.status(200).json({
			success: true,
			message: "Admin logged in successfully.",
			authToken,
			admin: {
				firstName: existingAdmin.firstName,
				lastName: existingAdmin.lastName,
				email: existingAdmin.email,
				phoneNo: existingAdmin.phoneNo,
				cnic: existingAdmin.cnic
			},
		});
	});
};
module.exports = adminSignInController;
