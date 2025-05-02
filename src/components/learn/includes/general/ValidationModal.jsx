import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "react-lottie";
import animationData from "../../../../assets/lotties/modal/tick.json";
import error from "../../../../assets/lotties/voucher-section/verfication-failed.json";
import failed from "../../../../assets/lotties/voucher-section/failed.json";

function ValidationModal() {
	// const [isModal, setModal] = useState(true);
	// const [validation_modal_type, setvalidation_modal_type] = useState("not_activated");
	const is_validationModal = useSelector(
		(state) => state.is_validationModal
	);
	const validation_modal_type = useSelector(
		(state) => state.validation_modal_type
	);
	const validation_modal_title = useSelector(
		(state) => state.validation_modal_title
	);
	const validation_modal_description = useSelector(
		(state) => state.validation_modal_description
	);

	const dispatch = useDispatch();
	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData:
			validation_modal_type === "success"
				? animationData
				: validation_modal_type === "not_activated"
				? failed
				: validation_modal_type === "error"
				? error
				: null,
		rendererSettings: {},
	};

	return (
		<BackContainer
			style={{ transform: is_validationModal && "scale(1,1)" }}
		>
			<Overlay
				onClick={() =>
					dispatch({
						type: "TOGGLE_VALIDATION_MODAL",
					})
				}
			></Overlay>

			<Modal validation_modal_type={validation_modal_type}>
				{validation_modal_type === "success" ? (
					<ModalContent
						validation_modal_type={validation_modal_type}
					>
						<SuccesCard>
							<SuccessIcon>
								<Lottie
									options={defaultOptions}
									height={"100%"}
									width={"100%"}
								/>
							</SuccessIcon>
							<SuccessTitle>
								{validation_modal_title
									? validation_modal_title
									: "Success"}
							</SuccessTitle>
							<SuccessLabel>
								{validation_modal_description
									? validation_modal_description
									: "Your subscription has activated successfully"}
							</SuccessLabel>
							<ContinueButton
								onClick={() =>
									dispatch({
										type: "TOGGLE_VALIDATION_MODAL",
										is_validationModal: false,
									})
								}
								validation_modal_type={
									validation_modal_type
								}
							>
								Continue
							</ContinueButton>
						</SuccesCard>
					</ModalContent>
				) : validation_modal_type === "not_activated" ? (
					<ModalContent
						validation_modal_type={validation_modal_type}
					>
						<SuccesCard>
							<SuccessIcon>
								<Lottie
									options={defaultOptions}
									height={"100%"}
									width={"100%"}
								/>
							</SuccessIcon>
							<SuccessTitle>Not activated</SuccessTitle>
							<SuccessLabel>
								Enable your student plan to active
								this voucher code
							</SuccessLabel>
							<ContinueButton
								onClick={() =>
									dispatch({
										type: "TOGGLE_VALIDATION_MODAL",
										is_validationModal: false,
									})
								}
								validation_modal_type={
									validation_modal_type
								}
							>
								Continue
							</ContinueButton>
						</SuccesCard>
					</ModalContent>
				) : validation_modal_type === "error" ? (
					<ModalContent
						validation_modal_type={validation_modal_type}
					>
						<SuccesCard>
							<SuccessIcon>
								<Lottie
									options={defaultOptions}
									height={"100%"}
									width={"100%"}
								/>
							</SuccessIcon>
							<SuccessTitle>Error</SuccessTitle>
							<SuccessLabel>
								{validation_modal_description
									? validation_modal_description
									: "An error occurred"}
							</SuccessLabel>
							<ContinueButton
								onClick={() =>
									dispatch({
										type: "TOGGLE_VALIDATION_MODAL",
										is_validationModal: false,
									})
								}
								validation_modal_type={
									validation_modal_type
								}
							>
								{validation_modal_title
									? "Close"
									: " Continue"}
							</ContinueButton>
						</SuccesCard>
					</ModalContent>
				) : null}
			</Modal>
		</BackContainer>
	);
}

export default ValidationModal;

const BackContainer = styled.div`
	position: fixed;
	transition: 0.3s;
	transform: scale(0, 0);
	width: 100%;
	height: 100vh;
	z-index: 1000;
	left: 0;
	top: 0px;
	background: rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(2px);
`;
const Overlay = styled.div`
	position: fixed;
	left: 0;
	top: 0px;
	width: 100%;
	height: 100vh;
`;
const Modal = styled.div`
	width: 550px;
	max-height: 127vh;
	margin: 0 auto;
	background: #fff;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	position: absolute;
	padding: 40px 40px;
	border-radius: 10px;
	transition: 0.5s;
	z-index: 101;

	@media all and (max-width: 980px) {
		padding: 30px 40px;
		width: 650px;
	}
	@media all and (max-width: 768px) {
		padding: 30px 40px;
		width: 550px;
	}
	@media all and (max-width: 640px) {
		width: 400px;
		padding: 20px 30px;
	}
	@media all and (max-width: 480px) {
		width: 330px;
		padding: 20px 20px;
	}
	@media all and (max-width: 360px) {
		width: 300px;
	}
`;
const ModalContent = styled.div``;
const SuccesCard = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;
const SuccessIcon = styled.div`
	width: 120px;
	height: 120px;
	border-radius: 50%;
	box-shadow: 0 16px 24px rgb(0 0 0 / 10%);
	margin: 0 auto;
	background-color: #fff;
	position: absolute;
	display: flex;
	padding: 10px;
	justify-content: center;
	align-items: center;
	top: -100px;
	margin: 0 auto;
	@media all and (max-width: 480px) {
		width: 100px;
		height: 100px;
		top: -75px;
	}
`;
const SuccessTitle = styled.h3`
	text-align: center;
	font-size: 30px;
	font-family: "baloo_paaji_2semibold";
	margin-top: 30px;
	@media all and (max-width: 480px) {
		font-size: 26px;
	}
`;
const SuccessLabel = styled.p`
	font-size: 22px;
	text-align: center;
	font-family: "gordita_medium";
	color: #3c4852;
	width: 100%;
	@media all and (max-width: 480px) {
		font-size: 16px;
	}
`;
const ContinueButton = styled.span`
	width: 100%;
	height: 50px;
	background-color: ${(props) =>
		props.validation_modal_type === "success"
			? "#4ba870"
			: "red"};
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: "baloo_paaji_2semibold";
	margin-top: 30px;
	border-radius: 5px;
	font-size: 20px;
	cursor: pointer;
`;

const Error = styled.p`
	color: red;
	font-size: 12px;
`;
