// controllers/readAllStudentsController.js
const { connection } = require('../../config/sqlConfig/sqlConfig');

const readAllStudentsController = (req, res) => {
    const query = 'SELECT * FROM student';

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve students",
                error: err.message,
            });
        }

        return res.json({
            success: true,
            data: results,
        });
    });
};

module.exports = readAllStudentsController;
