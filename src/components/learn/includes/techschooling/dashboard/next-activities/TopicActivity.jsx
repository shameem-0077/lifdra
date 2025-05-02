import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function TopicActivity({ data, subject_slug }) {
	const userSubscriptionType = useSelector(
		(state) => state.userSubscriptionType
	);

	return userSubscriptionType === "trial_end" ||
		userSubscriptionType === "expired_subscription" ? (
		<LockedNextActivity className="anim-fade">
			<ActiveVideo>
				<img src={data.image} alt="" />
				<Lock>
					<LockIcon src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/padlock.svg" />
				</Lock>
			</ActiveVideo>
			<ActiveContent>
				<ActiveContentLabel>Current Activity</ActiveContentLabel>
				<ActiveContentHead>{data.name}</ActiveContentHead>
				<ActiveContentdescription>
					{data.designation_name} / {data.skill_name}
				</ActiveContentdescription>
				<ActivityButton>
					<img
						src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/dashboard/arrow-right.svg"
						alt=""
					/>
				</ActivityButton>
			</ActiveContent>
			<NextActivityBackgroundImage1
				src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/dashboard/top-left-oval.svg"
				alt=""
			/>
			<NextActivityBackgroundImage2
				src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/dashboard/ring.svg"
				alt=""
			/>
			<NextActivityBackgroundImage3
				src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/dashboard/bottom-right-oval.svg"
				alt=""
			/>
		</LockedNextActivity>
	) : (
		<NextActivity
			className="anim-fade"
			to={`/${subject_slug}/topics/view/${data.id}`}
		>
			<ActiveVideo>
				<img src={data.image} alt="" />
				<img
					src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/dashboard/play.svg"
					alt=""
					className="playButton"
				/>
			</ActiveVideo>
			<ActiveContent>
				<ActiveContentLabel>Current Activity</ActiveContentLabel>
				<ActiveContentHead>{data.name}</ActiveContentHead>
				<ActiveContentdescription>
					{data.designation_name} / {data.skill_name}
				</ActiveContentdescription>
				<ActivityButton>
					<img
						src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/dashboard/arrow-right.svg"
						alt=""
					/>
				</ActivityButton>
			</ActiveContent>
			<NextActivityBackgroundImage1
				src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/dashboard/top-left-oval.svg"
				alt=""
			/>
			<NextActivityBackgroundImage2
				src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/dashboard/ring.svg"
				alt=""
			/>
			<NextActivityBackgroundImage3
				src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/dashboard/bottom-right-oval.svg"
				alt=""
			/>
		</NextActivity>
	);
}

const LockedNextActivity = styled.div`
	display: flex;
	align-items: center;
	padding: 30px;
	background-color: #e8fbf3;
	border-radius: 10px;
	position: relative;
	margin-bottom: 30px;
	@media all and (max-width: 640px) {
		padding: 20px;
		flex-direction: column;
	}
	@media all and (max-width: 480px) {
		padding: 15px;
	}
`;
const NextActivity = styled(Link)`
	display: flex;
	align-items: center;
	padding: 30px;
	background-color: #e8fbf3;
	border-radius: 10px;
	position: relative;
	margin-bottom: 30px;
	position: relative;
	@media all and (max-width: 640px) {
		padding: 20px;
		flex-direction: column;
	}
	@media all and (max-width: 480px) {
		padding: 15px;
	}
`;
const NextActivityBackgroundImage1 = styled.img`
	position: absolute;
	width: 153px;
	height: 128px;
	z-index: 0;
	top: 0;
	left: 0;
`;
const NextActivityBackgroundImage2 = styled.img`
	position: absolute;
	width: 292px;
	height: 233px;
	z-index: 0;
	top: 0;
	right: 0;
	@media all and (max-width: 480px) {
		display: none;
	}
`;
const NextActivityBackgroundImage3 = styled.img`
	position: absolute;
	width: 165px;
	height: 130px;
	z-index: 0;
	bottom: 0;
	right: 0;
`;
const ActiveVideo = styled.div`
	width: 47%;
	overflow: hidden;
	background-color: #163c53;
	border-radius: 5px;
	z-index: 1;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	&::after {
		position: absolute;
		content: "";
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
	}
	img {
		display: block;
		width: 100%;
		border-radius: 7px;
	}
	img.playButton {
		display: block;
		width: 50px;
		position: absolute;
		border-radius: 0px;
		z-index: 1;
	}
	@media all and (max-width: 640px) {
		width: 100%;
		margin-bottom: 20px;
	}
`;
const ActiveContent = styled.div`
	width: 35%;
	padding-left: 30px;
	z-index: 1;
	@media all and (max-width: 640px) {
		width: 100%;
		padding-left: unset;
	}
`;
const ActiveContentLabel = styled.h4`
	font-size: 14px;
	font-family: gordita_medium;
	line-height: 1.3em;
	color: #5aaa8d;
	margin-bottom: 12px;
	@media all and (max-width: 480px) {
		font-size: 14px;
	}
`;
const ActiveContentHead = styled.h3`
	font-size: 24px;
	font-family: gordita_medium;
	line-height: 1.3em;
	margin-bottom: 12px;
	@media all and (max-width: 1280px) {
		font-size: 22px;
	}
	@media all and (max-width: 640px) {
		font-size: 20px;
	}
`;
const ActiveContentdescription = styled.p`
	font-size: 15px;
	font-family: gordita_medium;
	line-height: 1.3em;
	margin-bottom: 13px;
	@media all and (max-width: 480px) {
		font-size: 14px;
	}
`;
const ActivityButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50px;
	height: 40px;
	background-color: #36a66f;
	border-radius: 20px;
	@media all and (max-width: 480px) {
		width: 42px;
		height: 32px;
		img {
			width: 17px;
		}
	}
`;
const Lock = styled.div`
	position: absolute;
	right: 0;
	bottom: 0;
	width: 75px;
	height: 75px;
	border-radius: 50%;
	box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 50%;
	transform: translate(-50%, -50%);
	left: 50%;
	z-index: 1;
`;
const LockIcon = styled.img`
	display: block;
	width: 21px !important;
`;
