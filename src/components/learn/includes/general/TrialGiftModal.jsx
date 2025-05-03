import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuthStore } from "../../../../store/authStore";

const TrialGiftModal = () => {
	const { user_data, updateUserData } = useAuthStore();
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (user_data?.show_trial_gift_modal) {
			setShowModal(true);
		}
	}, [user_data?.show_trial_gift_modal]);

	const handleClose = () => {
		setShowModal(false);
		updateUserData({ show_trial_gift_modal: false });
	};

	if (!showModal) return null;

	return (
		<ModalOverlay>
			<ModalContent>
				<CloseButton onClick={handleClose}>×</CloseButton>
				<ModalTitle>Trial Gift</ModalTitle>
				<ModalBody>
					<p>You have received a trial gift!</p>
					<p>Enjoy your free trial period.</p>
				</ModalBody>
				<ModalFooter>
					<Button onClick={handleClose}>Close</Button>
				</ModalFooter>
			</ModalContent>
		</ModalOverlay>
	);
};

export default TrialGiftModal;

const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

const ModalContent = styled.div`
	background: white;
	padding: 20px;
	border-radius: 8px;
	position: relative;
	width: 90%;
	max-width: 500px;
`;

const CloseButton = styled.button`
	position: absolute;
	top: 10px;
	right: 10px;
	border: none;
	background: none;
	font-size: 24px;
	cursor: pointer;
	color: #666;
	
	&:hover {
		color: #333;
	}
`;

const ModalTitle = styled.h2`
	margin: 0 0 20px 0;
	color: #333;
	font-size: 24px;
`;

const ModalBody = styled.div`
	margin-bottom: 20px;
	
	p {
		margin: 10px 0;
		color: #666;
	}
`;

const ModalFooter = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const Button = styled.button`
	padding: 8px 16px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	
	&:hover {
		background-color: #0056b3;
	}
`;
