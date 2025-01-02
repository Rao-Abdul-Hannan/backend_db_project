const { connection } = require("../../config/sqlConfig/sqlConfig");

const deleteEventController = (req, res) => {
	const { event_id } = req.params;

	if (!event_id) {
		return res.status(400).json({
			success: false,
			message: "Event ID is required",
		});
	}

	const query = "DELETE FROM events WHERE event_id = ?";

	connection.query(query, [event_id], (err, result) => {
		if (err) {
			console.error("Error deleting event:", err);
			return res.status(500).json({
				success: false,
				message: "An error occurred while deleting the event",
			});
		}

		if (result.affectedRows === 0) {
			return res.status(404).json({
				success: false,
				message: "Event not found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Event deleted successfully",
		});
	});
};

module.exports = deleteEventController;
