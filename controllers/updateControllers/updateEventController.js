const { connection } = require("../../config/sqlConfig/sqlConfig");

const updateEventController = (req, res) => {
	const { event_id, event_name, starting_date, ending_date, location } =
		req.body;

	if (
		!event_id ||
		!event_name ||
		!starting_date ||
		!ending_date ||
		!location
	) {
		return res.status(400).json({
			success: false,
			message: "Missing required fields",
		});
	}

	if (new Date(starting_date) > new Date(ending_date)) {
		return res.status(400).json({
			success: false,
			message: "Starting date must be less than or equal to ending date",
		});
	}

	const query = `
    UPDATE events 
    SET 
        event_name = ?, 
        starting_date = ?, 
        ending_date = ?, 
        location = ?
    WHERE 
        event_id = ?
`;

	const values = [event_id, event_name, starting_date, ending_date, location];

	connection.query(query, values, (err, result) => {
		if (err) {
			console.error("Error updating event:", err);
			return res.json({
				success: false,
				message: "Failed to update event",
				error: err.message,
			});
		}

		return res.json({
			success: true,
			message: "Event updated successfully",
			data: { event_id },
		});
	});
};
module.exports = updateEventController;
