import React from "react";

interface ModalProps {
	children: React.ReactNode;
	onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
	const handleClose = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className='fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50'
			onClick={handleClose}
		>
			<div className='bg-white p-4 rounded shadow-lg relative text-black'>
				<button
					onClick={onClose}
					className='absolute top-2 right-2 text-gray-600 hover:text-black'
				>
					×
				</button>
				{children}
			</div>
		</div>
	);
};

export default Modal;
