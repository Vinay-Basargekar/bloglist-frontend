// Modal.js
import React from "react";

const Modal = ({ children, onClose }) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="bg-white rounded-lg p-6 w-11/12 max-w-xl">{children}</div>
		</div>
	);
};

export default Modal;
