import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import loader from "../../../assets/lotties/modal/buttonloader.json";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import $ from "jquery";

function ResponseModal({
	isResponseModal,
	successTitle,
	errorTitle,
	setResponseModal,
	type,
	responseType,
	selectedPlan,
}) {
	const [isButtonLoading, setButtonLoading] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();
	const loaderdefaultOptions = {
		loop: true,
		autoplay: true,
		animationData: loader,
		rendererSettings: {},
	};
	useEffect(() => {
		window.addEventListener("popstate", handleBack);
		return () => {
			window.removeEventListener("popstate", handleBack);
		};
	}, []);

	const handleBack = () => {
		setResponseModal(false);
		navigate("/", { replace: true });
	};

	useEffect(() => {
		if (responseType === "success") {
			setTimeout(() => {
				setResponseModal(false);
				if (isResponseModal) {
					return type === "payment"
						? navigate("/feed/")
						: navigate("/feed/");
				}
			}, [5000]);
		}
	}, [isResponseModal, responseType]);

	return (
		<BackContainer
			className="success-modal"
			style={{ transform: isResponseModal && "scale(1,1)" }}
		>
			<Overlay>
				<Modal status={responseType}>
					<TitleSection>
						<ImageContainer status={responseType}>
							<img src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/error.svg" />
						</ImageContainer>
						<Title status={responseType}>
							{" "}
							{responseType === "success"
								? "Congratulations!"
								: "Failed!"}
						</Title>
					</TitleSection>
					<Container>
						<ModalDescription>
							{responseType === "success"
								? successTitle
								: errorTitle}
						</ModalDescription>
						{responseType === "success" ? (
							<Button
								onClick={handleBack}
								to={
									type === "payment"
										? "/feed/"
										: "/feed/"
								}
							>
								{!isButtonLoading ? (
									type === "payment" ? (
										"Go to Dashboard"
									) : (
										"Go to Dashboard"
									)
								) : (
									<Lottie
										options={loaderdefaultOptions}
										height={45}
										width={45}
									/>
								)}
							</Button>
						) : (
							<>
								<BackButton
									onClick={(e) => {
										navigate(location.pathname, { replace: true });
										setResponseModal(false);
									}}
								>
									Retry
								</BackButton>
							</>
						)}
					</Container>
					<BottomLine></BottomLine>
				</Modal>
			</Overlay>
		</BackContainer>
	);
}

export default ResponseModal;
const BackContainer = styled.div`
	position: fixed;
	transition: 0.3s;
	transform: scale(0, 0);
	width: 100%;
	height: 100vh;
	z-index: 10000;
	left: 0;
	top: 0px;
	/* background: rgba(0, 0, 0, 0.2); */
	backdrop-filter: blur(4px);
`;
const Overlay = styled.div`
	position: fixed;
	left: 0;
	top: 0px;
	width: 100%;
	height: 100vh;
`;
const Modal = styled.div`
	width: 700px;
	max-height: 90vh;
	overflow: hidden;
	margin: 0 auto;
	background-color: #fff;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	position: absolute;
	padding: 50px;
	border-radius: 10px;
	transition: 0.5s;
	z-index: 101;
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	background-image: ${props => props.status === "success" ? "url('https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/congratulations.svg')" : "none"};
	background-size: contain;
	background-repeat: no-repeat;
	max-width: 450px;

	@media (max-width: 560px) {
		max-width: 400px;
	}
	@media (max-width: 450px) {
		max-width: 350px;
		padding: 35px;
	}
	@media (max-width: 390px) {
		max-width: 300px;
	}
`;

const ModalDescription = styled.p`
	font-size: 16px;
	color: #333333;
	margin-bottom: 20px;

	width: 100%;
	display: flex;
	align-self: baseline;
	@media (max-width: 560px) {
		width: 100%;
	}
`;
const Close = styled.span`
	display: block;
	width: 15px;
	cursor: pointer;
	img {
		display: block;
		width: 100%;
	}
	@media all and (max-width: 640px) {
		top: 30px;
		right: 30px;
	}
`;
const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	padding-top: 25px;
`;
const Button = styled(Link)`
	font-size: 16px;
	background-color: #15bf81;
	padding: 5px 15px;
	border-radius: 5px;
	cursor: pointer;
	font-family: "gordita_medium";
	border: 1px solid#15bf81;
	color: #fff;

	@media (max-width: 340px) {
		font-size: 14px;
	}
`;
const BackButton = styled.span`
	font-size: 16px;
	background-color: #15bf81;
	padding: 5px 15px;
	border-radius: 5px;
	cursor: pointer;
	font-family: "gordita_medium";
	border: 1px solid#15bf81;
	color: #fff;

	@media (max-width: 340px) {
		font-size: 14px;
	}
`;
const BottomLine = styled.span`
	display: block;
	width: 100%;
	border-top: 7px solid #5ac78b;
	border-bottom: 7px solid #459e7b;
	position: absolute;
	bottom: 0;
	left: 0;
`;

const TitleSection = styled.div`
	padding-bottom: 25px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	justify-content: flex-start;
	border-bottom: 1px solid#e7e6e6;
`;
const ImageContainer = styled.div`
	display: ${(props) => (props.status === "success" ? "none" : "block")};
	margin-right: 12px;
	@media all and (max-width: 480px) {
		width: 40px;
	}
	transform: translateY(-3px);
	img {
		width: 100%;
		display: block;
	}
`;

const Title = styled.h2`
	font-family: "gordita_medium";
	font-size: 20px;
	color: ${(props) => (props.status === "success" ? "#5ac78b" : "red")};
`;
