// controllers/createStudentController.js
const { connection } = require('../../config/sqlConfig/sqlConfig');

const createStudentController = (req, res) => {
    const {
        student_id, // Accept `student_id` from the user
        s_first_name,
        s_middle_name,
        s_last_name,
        s_address,
        section_id,
        date_of_birth,
        gender,
        status
    } = req.body;

    // Validate required fields
    if (!student_id || !s_first_name || !s_last_name || !s_address || !section_id || !date_of_birth || !gender || !status) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields",
        });
    }

    // Ensure `student_id` is a valid integer
    if (!Number.isInteger(student_id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid student_id. It must be an integer.",
        });
    }

    // SQL query to insert a new student
    const query = `
        INSERT INTO student (
            student_id, s_first_name, s_middle_name, s_last_name,
            s_address, section_id, date_of_birth, gender, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        student_id, s_first_name, s_middle_name, s_last_name,
        s_address, section_id, date_of_birth, gender, status
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
