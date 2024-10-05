const Notification = ({ message, type }) => {
	if (message === null) {
		return null;
	}

	return (
		<div
			className={`p-4 mb-4 text-sm text-white rounded border ${
				type === "success"
					? "bg-green-500 border-green-600"
					: "bg-red-500 border-red-600"
			}`}
		>
			{message}
		</div>
	);
};

export default Notification;
