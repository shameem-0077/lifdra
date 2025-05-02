import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { getDateStr } from "../../../helpers/functions";
import auth from "../../../routing/auth";
import Countdown, { zeroPad } from "react-countdown";

export default function HeaderTimer() {
	const [countdown] = useState(true);
	const [end_date, setEndDate] = useState("");
	const {
		isSignupUser,
		userSubscriptionType,
		user_data,
		user_profile,
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const location = useLocation();

	//Nenewal banner states
	const [routeName, setRouteName] = useState("");

	useEffect(() => {
		if (user_data.program.name === "Techies Club") {
			setRouteName("techies-club");
		} else if (user_data.program.name === "Techies Hub") {
			setRouteName("techies-hub");
		}
	}, [user_data]);

	const renderer = ({ days, hours, minutes, seconds }) => {
		// Render a countdown
		return (
			<TimeContainer>
				<TimeDiv>
					<TimeLeft>
						{zeroPad(days)}
						<small>:</small>
					</TimeLeft>
					<span>Days</span>
				</TimeDiv>
				<TimeDiv>
					<TimeLeft>
						{zeroPad(hours)}
						<small>:</small>
					</TimeLeft>
					<span>Hrs</span>
				</TimeDiv>
				<TimeDiv>
					<TimeLeft>
						{zeroPad(minutes)}
						<small>:</small>
					</TimeLeft>
					<span>Mins</span>
				</TimeDiv>
				<TimeDiv>
					<TimeLeft>{zeroPad(seconds)}</TimeLeft>
					<span>Secs</span>
				</TimeDiv>
			</TimeContainer>
		);
	};

	useEffect(() => {
		if (
			user_profile.subscription_data &&
			user_profile.subscription_data.has_active_subscription
		) {
			setEndDate(user_profile.subscription_data.end_timestamp);
		}
	}, [user_profile.subscription_data.end_timestamp]);

	const getTimeFromDate = (value) => {
		let date = new Date(value);
		return date.toLocaleTimeString();
	};

	const date_str = `${
		user_profile.subscription_data ? getDateStr(end_date) : null
	} ${getTimeFromDate(
		user_profile.subscription_data
			? user_profile.subscription_data.end_timestamp
			: null
	)} GMT+5:30`;

	const msDiff =
		new Date(getDateStr(end_date)).getTime() -
		new Date().getTime();
	const date_difference = Math.floor(
		msDiff / (1000 * 60 * 60 * 24)
	);
	const date_time = new Date(date_str);

	const renderTimer = () => {
		if (userSubscriptionType === "expired_subscription") {
			return (
				<Container type={userSubscriptionType}>
					<CardCover>
						<Title>Your subscription has ended </Title>
						<Button
							to={`/feed/${routeName}/`}
							type={userSubscriptionType}
						>
							Renew
						</Button>
					</CardCover>
				</Container>
			);
		} else if (userSubscriptionType === "trial_end") {
			return (
				<Container type={userSubscriptionType}>
					<CardCover>
						<Title>Your trial has ended </Title>
						<Button
							to={`/feed/${routeName}/`}
							userSubscriptionType={
								userSubscriptionType
							}
						>
							Subscribe
						</Button>
					</CardCover>
				</Container>
			);
		} else if (userSubscriptionType === "paid_subscription") {
			return (
				<Container type={userSubscriptionType}>
					<CardCover>
						<Title>Your subscription will end in </Title>
						<Counter type={userSubscriptionType}>
							{/* <DateCountdown
                                dateTo={date_time}
                                callback={() => setCountdown(false)}
                                mostSignificantFigure="day"
                            /> */}
							<Countdown
								date={date_time}
								renderer={renderer}
								onComplete={() =>
									dispatch({
										type: "UPDATE_SUBSCRIPTION_TYPE",
										userSubscriptionType:
											"expired_subscription",
									})
								}
							/>
						</Counter>
						<Button
							to={`/feed/${routeName}/`}
							type={userSubscriptionType}
						>
							Extend
						</Button>
					</CardCover>
				</Container>
			);
		} else if (userSubscriptionType === "trial_active") {
			return (
				<Container type={userSubscriptionType}>
					<CardCover>
						<Title>Your trial will end in </Title>
						<Counter type={userSubscriptionType}>
							<Countdown
								date={date_time}
								renderer={renderer}
								onComplete={() =>
									dispatch({
										type: "UPDATE_SUBSCRIPTION_TYPE",
										userSubscriptionType:
											"trial_end",
									})
								}
							/>
						</Counter>
						<Button
							to={`/feed/${routeName}/`}
							type={userSubscriptionType}
						>
							Subscribe
						</Button>
					</CardCover>
				</Container>
			);
		} else {
			return null;
		}
	};

	return location.pathname !== "/feed/" &&
		user_profile.subscription_data
		? auth.isAuthenticated() &&
		  countdown &&
		  !isSignupUser &&
		  (date_difference <= 3 || isNaN(date_difference))
			? renderTimer()
			: null
		: null;
}

const TimeContainer = styled.div`
	display: flex;
	align-items: center;
`;
const TimeDiv = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 0 12px;
	font-family: "baloo_paaji_2semiBold";
	& span {
		font-size: 12px;
		font-family: "gordita_medium";
		margin-top: -5px;
	}
`;
const TimeLeft = styled.div`
	font-family: "baloo_paaji_2semiBold";
	align-items: center;
	justify-content: center;
	& small {
		position: absolute;
		right: 0;
		top: 2px;
	}
`;
const Container = styled.div`
	background-color: ${(props) =>
		props.type === "trial_active"
			? "#fff4d7"
			: props.type === "paid_subscription"
			? "#e3ebf7"
			: props.type === "trial_end" || "expired_subscription"
			? "#f2bcbc"
			: null};
	height: 50px;
	margin-right: 15px;
	display: flex;
	align-items: center;
	padding: 0 15px;
	/* min-width: 200px; */
	flex: 1;
	border-radius: 5px;
	@media all and (max-width: 740px) {
		margin-right: 10px;
	}
	@media all and (max-width: 830px) {
		display: none;
	}
	// @media all and (max-width: 675px) {
	//     padding: 0 10px;
	//     display: none;
	// }
`;
const CardCover = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	@media all and (max-width: 710px) {
		width: 355px;
	}
	@media all and (max-width: 660px) {
		width: 340px;
	}
	@media all and (max-width: 650px) {
		width: 330px;
	}
`;
const Title = styled.h3`
	font-family: "gordita_medium";
	margin-right: 10px;
	font-size: 15px;
	@media all and (max-width: 675px) {
		margin-right: 5px;
	}
	@media all and (max-width: 1440px) {
		font-size: 13px;
	}
`;
const Counter = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 170px;
	@media all and (max-width: 640px) {
		margin-right: 15px;
	}
`;

const Button = styled(Link)`
	margin-left: 10px;
	background: ${(props) =>
		props.type === "trial_active"
			? "#e8983c !important"
			: props.type === "paid_subscription"
			? "#0664f6 !important"
			: props.type === "trial_end" || "expired_subscription"
			? "#e94151 !important"
			: null};
	color: #fff;
	font-family: "gordita_regular";
	height: 35px;
	height: 31px;
	font-size: 12px;
	padding: 0 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
	@media all and (max-width: 675px) {
		margin-left: 5px;
		padding: 0 8px;
	}
	@media all and (max-width: 660px) {
		font-size: 12px;
	}
	@media all and (max-width: 520px) {
		margin-left: -10px;
	}
`;
