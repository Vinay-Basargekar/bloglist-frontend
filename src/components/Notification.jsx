import React from "react";

const Notification = ({ message, type = "info" }) => {
	if (!message) return null;

	const notificationStyles = {
		success: "bg-green-100 text-green-700 border-green-500",
		error: "bg-red-100 text-red-700 border-red-500",
		warning: "bg-yellow-100 text-yellow-700 border-yellow-500",
		info: "bg-blue-100 text-blue-700 border-blue-500",
	};

	return (
		<div
			className={`fixed z-10 bottom-4 right-4 max-w-sm w-full p-4 mb-4 rounded border-l-4 shadow-md ${notificationStyles[type]} transition-all duration-200 ease-in-out`}
		>
			<span className="font-semibold capitalize">{type}:</span> {message}
		</div>
	);
};

export default Notification;
