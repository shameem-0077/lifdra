import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Countdown from "react-countdown";
import { useDispatch, useSelector } from "react-redux";
import { getDateStr } from "../../../helpers/functions";
import auth from "../../../routing/auth";

export default function TrialGiftModal() {
	const [countdown, setCountdown] = useState(false);
	const { user_data, user_profile, isSignupUser } = useSelector(
		(state) => state
	);

	const dispatch = useDispatch();

	const renderer = ({ days, hours, minutes, seconds }) => {
		// Render a countdown
		return (
			<span
				style={{
					fontFamily: "baloo_paaji_2semiBold",
				}}
			>
				{days}
				&nbsp; &nbsp; : &nbsp; &nbsp;
				{hours}
				&nbsp; &nbsp; : &nbsp; &nbsp;
				{minutes}
				&nbsp; &nbsp; : &nbsp; &nbsp;
				{seconds}
			</span>
		);
	};

	const getTimeFromDate = (value) => {
		let date = new Date(value);
		return date.toLocaleTimeString();
	};

	const date_str = `${
		user_profile &&
		user_profile.subscription_data &&
		getDateStr(user_profile.subscription_data.end_timestamp)
	} ${getTimeFromDate(
		user_profile &&
			user_profile.subscription_data &&
			user_profile.subscription_data.end_timestamp
	)} GMT+5:30`;

	const dates = new Date(date_str);

	const handleisSignup = (bool) => {
		dispatch({
			type: "TOGGLE_SIGNUP_USER",
			bool: bool,
		});
	};

	useEffect(() => {
		auth.isAuthenticated() &&
			setTimeout(() => {
				setCountdown(true);
			}, 500);
	}, [countdown, auth.isAuthenticated()]);

	return auth.isAuthenticated() &&
		isSignupUser &&
		countdown &&
		user_profile &&
		user_profile.subscription_data &&
		user_profile.subscription_data.end_timestamp &&
		user_data.signup_type === "tech_schooling" ? (
		<Container>
			<Modal>
				<Left>
					<GiftImage
						src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/welcomepopuptimer/gift_box.svg"
						alt="Image"
					/>
				</Left>
				<Right>
					<Top>
						<CardHead>
							Welcome to <br /> Steyp's Tech Schooling
						</CardHead>
						<Content>
							<ContentDescription>
								You got a free trial for
							</ContentDescription>
						</Content>
						<TimerTop>
							<Countdown
								date={dates}
								renderer={renderer}
							/>
						</TimerTop>
						<TimerBottom>
							<Day>Days</Day>
							<Day style={{ paddingLeft: "10px" }}>
								Hour
							</Day>
							<Day style={{ paddingLeft: "10px" }}>
								Minutes
							</Day>
							<Day>Seconds</Day>
						</TimerBottom>
					</Top>
					<Bottom>
						<Button onClick={() => handleisSignup(false)}>
							Start Learning
						</Button>
					</Bottom>
				</Right>
			</Modal>
		</Container>
	) : null;
}

// return  (
// <Container>
//     <Modal>
//         <Left>
//             <GiftImage
//                 src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/welcomepopuptimer/gift_box.svg"
//                 alt="Image"
//             />
//         </Left>
//         <Right>
//             <Top>
//                 <CardHead>
//                     Welcome to <br /> Talrop's Tech Schooling
//                 </CardHead>
//                 <Content>
//                     <ContentDescription>
//                         You got a free trial for
//                     </ContentDescription>
//                 </Content>
//                 <TimerTop>
//                     <Countdown date={dates} renderer={renderer} />
//                 </TimerTop>
//                 <TimerBottom>
//                     <Day>Days</Day>
//                     <Day style={{ paddingLeft: "10px" }}>Hour</Day>
//                     <Day style={{ paddingLeft: "10px" }}>Minutes</Day>
//                     <Day>Seconds</Day>
//                 </TimerBottom>
//             </Top>
//             <Bottom>
//                 <Button onClick={() => handleisSignup(false)}>
//                     Start Learning
//                 </Button>
//             </Bottom>
//         </Right>
//     </Modal>
// </Container>

// )
// }
const Container = styled.div`
	z-index: 400;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	backdrop-filter: blur(2px);
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Modal = styled.div`
	display: flex;
	align-items: center;
	height: 525px;
	width: 900px;
	background-color: #ffffff;
	border-radius: 10px;
	background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/welcomepopuptimer/bg_1.svg");
	background-size: 100%;
	background-repeat: no-repeat;
	animation: zoom 0.2s ease;
	transform: scale(1);
	box-shadow: 0 8px 60px 0 rgba(83, 83, 83, 0.11),
		0 12px 90px 0 rgba(83, 83, 83, 0.11);
	position: relative;
	@media all and (max-width: 1200px) {
		height: 480px;
		width: 830px;
	}
	@media all and (max-width: 1080px) {
		height: 450px;
		width: 750px;
	}
	@media all and (max-width: 980px) {
		height: 370px;
		width: 620px;
	}
	@media all and (max-width: 840px) {
		height: 320px;
		width: 500px;
	}
	@media all and (max-width: 640px) {
		height: 340px;
		width: 500px;
	}
	@media all and (max-width: 480px) {
		height: 340px;
		width: 100%;
	}
	@media all and (max-width: 360px) {
		height: 360px;
	}
	@keyframes zoom {
		0% {
			transform: scale(0.5);
		}
		100% {
			transform: scale(1);
		}
	}
`;
const Left = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40%;
	height: 100%;
	position: relative;
	@media all and (max-width: 980px) {
		display: none;
	}
`;
const GiftImage = styled.img`
	width: 450px;
	position: absolute;
	bottom: 6px;
	left: -50px;
	@media all and (max-width: 1200px) {
		width: 480px;
	}
	@media all and (max-width: 1080px) {
		width: 420px;
	}
	@media all and (max-width: 980px) {
		display: none;
	}
	@media all and (max-width: 840px) {
		width: 270px;
		left: -30px;
	}
`;
const Right = styled.div`
	width: 65%;
	text-align: center;
	@media all and (max-width: 980px) {
		width: 100%;
	}
`;
const Top = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
`;
const CardHead = styled.h2`
	color: #36a76f;
	font-size: 32px;
	font-family: "baloo_paaji_2semiBold";
	line-height: 1.3em;
	margin-bottom: 30px;
	@media all and (max-width: 1200px) {
		font-size: 30px;
	}
	@media all and (max-width: 1080px) {
		font-size: 28px;
	}
	@media all and (max-width: 980px) {
		font-size: 25px;
		margin-bottom: 15px;
	}
	@media all and (max-width: 840px) {
		font-size: 23px;
		margin-bottom: 13px;
	}
	@media all and (max-width: 640px) {
		font-size: 21px;
		margin-top: 20px;
	}
	@media all and (max-width: 480px) {
		font-size: 26px;
		margin-top: 15px;
	}
`;
const TimerTop = styled.div`
	margin-bottom: 30px;
	width: 70%;
	font-size: 35px;
	font-family: "gordita_medium";
	color: #18484c;
	margin: 0 auto;
	@media all and (max-width: 480px) {
		width: 90%;
	}
	@media all and (max-width: 360px) {
		font-size: 28px;
	}
`;
const TimerBottom = styled.div`
	margin-bottom: 30px;
	display: flex;
	width: 70%;
	justify-content: space-between;
	margin: 0 auto;
	padding-left: 30px;
	padding-right: 20px;
	@media all and (max-width: 980px) {
		width: 60%;
	}
	@media all and (max-width: 840px) {
		width: 70%;
	}
	@media all and (max-width: 480px) {
		width: 80%;
	}
`;
const Day = styled.div`
	font-size: 16px;
	font-family: "gordita_medium";
	@media all and (max-width: 480px) {
		font-size: 14px;
	}
`;
const Bottom = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 50px;
	@media all and (max-width: 980px) {
		margin-top: 40px;
	}
	@media all and (max-width: 480px) {
		margin-top: 30px;
	}
`;
const Content = styled.div`
	display: flex;
	flex-direction: column;
	text-align: center;
`;
const ContentDescription = styled.span`
	font-size: 21px;
	font-family: "gordita_medium";
	color: #18484c;
	line-height: 1.3em;
	margin-bottom: 15px;
	@media all and (max-width: 1080px) {
		font-size: 20px;
	}
	@media all and (max-width: 980px) {
		font-size: 18px;
	}
	@media all and (max-width: 840px) {
		font-size: 17px;
	}
	@media all and (max-width: 480px) {
		font-size: 15px;
	}
`;
const Button = styled.span`
	cursor: pointer;
	width: 200px;
	margin: 0 auto;
	padding: 10px 0;
	background-color: #36a76f;
	border-radius: 5px;
	line-height: 1.3em;
	font-size: 14px;
	font-family: "baloo_paaji_2semiBold";
	color: #fff;
	@media all and (max-width: 640px) {
		margin-bottom: 20px;
	}
	@media all and (max-width: 480px) {
		width: 170px;
		padding: 8px 0;
		margin-bottom: 15px;
	}
	@media all and (max-width: 360px) {
		width: 150px;
		padding: 5px 0;
		margin-bottom: 15px;
	}
`;
