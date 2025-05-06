import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { serverConfig } from "../../../axiosConfig";
import $ from "jquery";
import RequestLoader from "../../learn/includes/authentication/general/RequestLoader";

export default function EligibilityConfirmModal({
	isConfirmModal,
	setConfirmModal,
	setFormModal,
	name,
	setName,
	phone,
	setPhone,
	selectedClass,
	setSelectedClass,
	studentType,
	setStudentType,
	otp,
	setOtp,
	selectedCountry,
	setResponseModal,
	isLoading,
	setLoading,
	otpErrorMessage,
	setOtpErrorMessage,
	setSelectedDistrict,
}) {
	const [counter, setCounter] = useState(2);
	const user_data = useSelector((state) => state.user_data);

	const countDown = () => {
		// console.log('Hello, World!', counter)
		// counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
		// if(counter > 0){
		// 	setCounter(0)
		// 	console.log('Hello, World!', counter)
		// }
		// let myVar = setTimeout(countDown, 1000);
		// setTimeout(() => {
		// }, 1000);
	};

	const submitOtp = () => {
		let { access_token } = user_data;
		setLoading(true);
		serverConfig
			.post(
				`web/eligility-enquiry/verify/
				`,
				{
					phone: phone,
					country: selectedCountry.web_code,
					otp: otp,
				},
				{
					headers: {
						Authorization: "Bearer " + access_token,
					},
				}
			)
			.then((response) => {
				const { status_code, data, message } = response.data;
				if (status_code === 6000) {
					setName("");
					// setPhone("");
					setSelectedClass("");
					setStudentType("");
					setOtp("");
					setLoading(false);
					setConfirmModal(false);
					setResponseModal(true);
					setOtpErrorMessage("");
				} else if (status_code === 6001) {
					setOtpErrorMessage(message);
					setLoading(false);
				}
			})
			.catch((error) => {
				setOtpErrorMessage("An error occured");
				console.log(error);
				setLoading(false);
			});
	};

	const resendOtp = () => {
		let { access_token } = user_data;
		setLoading(true);
		serverConfig
			.post(
				`web/eligility-enquiry/resend/otp/
				`,
				{
					phone: phone,
					country: selectedCountry.web_code,
				},
				{
					headers: {
						Authorization: "Bearer " + access_token,
					},
				}
			)
			.then((response) => {
				const { status_code, data } = response.data;
				if (status_code === 6000) {
					setLoading(false);
					setOtpErrorMessage("");
					setResendSuccess(true);
				} else if (status_code === 6001) {
					setOtpErrorMessage(data.message);
					setLoading(false);
					setResendSuccess(false);
				}
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	};

	useEffect(() => {
		if (isConfirmModal) {
			$("html").addClass("modal-enabled");
		} else {
			$("html").removeClass("modal-enabled");
		}
	}, [isConfirmModal]);
	const [isResendLoading, setResendLoading] = useState(false);
	const [isResendSuccess, setResendSuccess] = useState(null);

	const Timer = ({
		resendOtp,
		isLoading,
		isResendSuccess,
		otpErrorMessage,
	}) => {
		const [counter, setCounter] = React.useState(20);

		React.useEffect(() => {
			counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
		}, [counter]);

		return (
			<>
				{counter === 0 ? (
					<TimerContainer onClick={resendOtp}>
						{isResendSuccess ? (
							<SendIcon
								className="las la-check-circle"
								style={{
									color: isResendSuccess
										? "#5cc66a"
										: isResendSuccess === false
										? "#f44336"
										: "#000",
								}}
							></SendIcon>
						) : isResendSuccess === false ? (
							<SendIcon
								style={{ color: "#f44336" }}
								className="las la-exclamation-circle"
							></SendIcon>
						) : (
							<SendIcon
								className={`las la-undo-alt ${
									isLoading && "loader"
								}`}
							></SendIcon>
						)}

						<Resend
							className="b-medium"
							style={{
								color: isResendSuccess
									? "#5cc66a"
									: isResendSuccess === false
									? "#f44336"
									: "#000",
							}}
						>
							{isResendSuccess
								? "OTP Sent!"
								: isResendSuccess === false
								? "Resend OTP failed"
								: "Resend OTP"}
						</Resend>
					</TimerContainer>
				) : (
					<>
						<Resending className="b-medium">
							Resend verification code in <b>{counter}s</b>{" "}
						</Resending>
					</>
				)}
			</>
		);
	};

	return (
		<>
			<Overlay className={isConfirmModal ? "active" : ""}></Overlay>
			<Container className={isConfirmModal ? "active" : ""}>
				<FormContainer>
					<TopHead>
						<H5>Verification code has been sent!</H5>
						<Close
							onClick={() => {
								setConfirmModal(false);
								setName("");
								setPhone("");
								setSelectedClass("");
								setStudentType("");
								setOtp("");
								setSelectedDistrict("");
							}}
						>
							<img
								src={
									"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/close.svg"
								}
								alt="Close"
							/>
						</Close>
					</TopHead>
					<Bottom>
						<BottomHeader>
							<Name></Name>
							<Details>
								<H4>{name}</H4>
								<Mobile>
									{selectedCountry.phone_code} {phone}
								</Mobile>
								<Class>
									{studentType === "school"
										? "School Student"
										: studentType === "college"
										? "College Student"
										: "graduate"}
									{selectedClass === "" ? (
										""
									) : (
										<b>, {selectedClass}th</b>
									)}
								</Class>
							</Details>
							<Edit
								onClick={() => {
									setFormModal(true);
									setConfirmModal(false);
								}}
							>
								Edit Profile
							</Edit>
						</BottomHeader>
						<BottomMiddle>
							<Description>
								Please enter the four-digit number which has
								been sent to the registered mobile number{" "}
								<b>
									{selectedCountry.phone_code} {phone}
								</b>
								.
							</Description>
							<Input
								type="number"
								placeholder="Enter verification code"
								onChange={(e) => setOtp(e.target.value)}
								value={otp}
							/>
							<Error>{otpErrorMessage}</Error>
							{/* <Resend
								onClick={() => {
									resendOtp();
									// countDown()
								}}
							>
								Resend verification code ? <b>{counter} Sec</b>
							</Resend> */}
							<Timer
								resendOtp={resendOtp}
								isResendLoading={isResendLoading}
								isResendSuccess={isResendSuccess}
							/>
						</BottomMiddle>

						<ButtonConatiner>
							{otp !== "" ? (
								<Submit
									onClick={() => {
										submitOtp();
									}}
								>
									{isLoading ? <RequestLoader /> : "Submit"}
								</Submit>
							) : (
								<Submit className="disabled">
									Submit{" "}
									{/* {isLoading ? <RequestLoader /> : "Submit"} */}
								</Submit>
							)}
						</ButtonConatiner>
					</Bottom>
					<LightBanner></LightBanner>
					<DarkBanner></DarkBanner>
				</FormContainer>
			</Container>
		</>
	);
}
// const Resend = styled.span`
// 	font-size: 14px;
// 	margin-left: 5px;
// `;
const TimerContainer = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
`;
const SendIcon = styled.span`
	font-size: 14px;
	-webkit-text-stroke-width: 0.02em;
	&.loader {
		animation: rotate 2s infinite linear reverse;
	}
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@media all and (max-width: 480px) {
		transform: translateY(-1px);
		margin-right: 3px;
	}
`;

const Container = styled.div`
	position: fixed;
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: 1000;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0;
	visibility: hidden;
	/* transform: scale(0); */
	transition: ease-in-out 0.2s;

	&.active {
		/* transform: scale(1); */
		opacity: 1;
		visibility: visible;
	}
`;
const Overlay = styled.div`
	position: fixed;
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: 1000;
	display: none;
	backdrop-filter: blur(5px);
	background: rgba(0, 0, 0, 0.5);
	&.active {
		display: block;
	}
`;
const FormContainer = styled.div`
	position: fixed;
	z-index: 1001;
	transform: scale(0);
	width: 750px;
	background: #fff;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 8px;
	overflow: hidden;
	padding: 50px 55px 55px 50px;

	&.active {
		transform: scale(1);
	}
	@media all and (max-width: 980px) {
		width: 75%;
	}
	@media all and (max-width: 768px) {
		padding: 36px 35px;
	}
	@media all and (max-width: 640px) {
		width: 91%;
		padding: 31px 31px;
	}
	@media all and (max-width: 480px) {
		width: 91%;
		padding: 21px 21px;
	}
`;
const TopHead = styled.div`
	display: flex;
	justify-content: space-between;
	padding-bottom: 20px;
	margin-bottom: 25px;
	border-bottom: 2px solid #dfdfdf;
`;
const H5 = styled.h5`
	font-size: 21px;
	font-family: gordita_medium;
	@media all and (max-width: 480px) {
		font-size: 17px;
	}
`;
const Close = styled.div`
	cursor: pointer;
	width: 25px;
	height: 25px;
	img {
		width: 100%;
		display: block;
	}
	@media all and (max-width: 480px) {
		width: 17px;
		height: 17px;
	}
`;
const Bottom = styled.div``;
const BottomHeader = styled.div`
	display: flex;
	/* justify-content: space-between; */
	margin-bottom: 25px;
	align-items: center;
`;
const Name = styled.div`
	background: #0fb779;
	color: #fff;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	margin-right: 10px;
	display: none;
	@media all and (max-width: 768px) {
		width: 40px;
		height: 40px;
	}
	@media all and (max-width: 480px) {
		width: 30px;
		height: 30px;
	}
`;
const Input = styled.input`
	width: 100%;
	border: 2px solid #0fa679;
	border-radius: 8px;
	font-size: 16px;
	padding: 10px 15px;
	margin-bottom: 5px;
	color: #1c1c1c;
	font-family: gordita_regular;
	background: #fff;
	@media all and (max-width: 480px) {
		font-size: 14px;
		padding: 8px 13px;
	}
`;
const Details = styled.div`
	width: 70%;
	@media all and (max-width: 980px) {
		width: 58%;
	}
	@media all and (max-width: 768px) {
		width: 55%;
	}
	@media all and (max-width: 480px) {
		width: 47%;
	}
`;
const H4 = styled.h4`
	color: #4d4d4d;
	font-size: 18px;
	margin-bottom: 2px;
	font-family: gordita_medium;
	@media all and (max-width: 480px) {
		font-size: 14px;
	}
`;
const Mobile = styled.p`
	color: #4d4d4d;
	font-size: 14px;
	font-family: gordita_regular;
	@media all and (max-width: 480px) {
		font-size: 10px;
	}
`;
const Class = styled.p`
	color: #4d4d4d;
	font-size: 14px;
	font-family: gordita_regular;
	& b {
		color: #4ca473;
	}
	@media all and (max-width: 480px) {
		font-size: 10px;
	}
`;
const Edit = styled.div`
	border: 1px solid #0fa679;
	padding: 10px 15px;
	color: #4ca473;
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: gordita_medium;
	font-size: 16px;
	cursor: pointer;
	margin-left: auto;
	@media all and (max-width: 768px) {
		font-size: 14px;
	}
	@media all and (max-width: 480px) {
		font-size: 12px;
		padding: 8px 13px;
	}
	@media all and (max-width: 360px) {
		font-size: 10px;
	}
`;
const BottomMiddle = styled.div`
	background: #ebf8e8;
	border-radius: 10px;
	padding: 35px;
	margin-bottom: 25px;
	@media all and (max-width: 480px) {
		padding: 17px;
	}
`;
const Description = styled.p`
	color: #6c6c6c;
	font-size: 16px;
	margin-bottom: 15px;
	& b {
		color: #4ca473;
	}
	@media all and (max-width: 480px) {
		font-size: 14px;
	}
`;
const Resend = styled.p`
	font-size: 14px;
	text-align: right;
	cursor: pointer;
	& b {
		color: #4ca473;
	}
	@media all and (max-width: 480px) {
		font-size: 12px;
	}
	@media all and (max-width: 360px) {
		font-size: 10px;
	}
`;
const Resending = styled.p`
	font-size: 14px;
	text-align: right;
	& b {
		color: #4ca473;
	}
	@media all and (max-width: 480px) {
		font-size: 12px;
	}
	@media all and (max-width: 360px) {
		font-size: 10px;
	}
`;
const ButtonConatiner = styled.div`
	display: flex;
	justify-content: flex-end;
`;
const Submit = styled.div`
	min-height: 58px;
	width: 25%;
	padding: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	color: #fff;
	background: transparent linear-gradient(114deg, #0fa76f 0%, #0f9ea7 100%) 0%
		0% no-repeat padding-box;
	border-radius: 8px;
	font-family: gordita_medium;
	@media all and (max-width: 768px) {
		width: 35%;
		max-height: 44px;
		min-height: 44px;
	}
	@media all and (max-width: 480px) {
		width: 40%;
		font-size: 14px;
		max-height: 35px;
		min-height: 35px;
		font-family: "gordita_medium";
	}
	&.disabled {
		filter: contrast(0.5);
		cursor: not-allowed;
	}
`;
const LightBanner = styled.div`
	position: absolute;
	width: 100%;
	height: 7px;
	left: 0;
	bottom: 7px;
	background: #6dce9f;
`;
const DarkBanner = styled.div`
	position: absolute;
	width: 100%;
	height: 7px;
	left: 0;
	bottom: 0;
	background: #529f7b;
`;
const Error = styled.p`
	color: red;
	font-size: 14px;
	text-align: right;
	margin-bottom: 5px;
	@media all and (max-width: 480px) {
		color: red;
		font-size: 12px;
	}
`;
