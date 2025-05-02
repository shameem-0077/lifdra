import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function PracticeActivity({ data, subject_slug }) {
	const userSubscriptionType = useSelector(
		(state) => state.userSubscriptionType
	);

	return userSubscriptionType === "trial_end" ||
		userSubscriptionType === "expired_subscription" ? (
		<LockedCardContainer className="anim-fade">
			<VideoWrapper>
				<VideoImage src={data.image} alt="" />
				<Lock>
					<LockIcon src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/padlock.svg" />
				</Lock>
			</VideoWrapper>
			<PracticeCardContent>
				<Title>Current Activity - Practice</Title>
				<Description>
					<Number>#{data.order_id}</Number> | {data.title}
				</Description>
				<Designation>
					<Span>
						<i class="las la-layer-group"></i>
					</Span>
					<Name>{data.designation}</Name>
				</Designation>
			</PracticeCardContent>
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
		</LockedCardContainer>
	) : (
		<PracticeCardContainer
			className="anim-fade"
			to={`/nanodegree/${subject_slug}/practices/view/${data.id}`}
		>
			<VideoWrapper>
				<VideoImage src={data.image} alt="" />
			</VideoWrapper>
			<PracticeCardContent>
				<Title>Current Activity - Practice</Title>
				<Description>
					<Number>#{data.order_id}</Number> | {data.title}
				</Description>
				<Designation>
					<Span>
						<i class="las la-layer-group"></i>
					</Span>
					<Name>{data.designation}</Name>
				</Designation>
			</PracticeCardContent>
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
		</PracticeCardContainer>
	);
}

const PracticeCardContainer = styled(Link)`
	display: flex;
	align-items: center;
	padding: 30px;
	background-color: #e8fbf3;
	border-radius: 10px;
	position: relative;
	margin-bottom: 30px;
	@media all and (max-width: 980px) {
		flex-direction: column;
	}
	@media all and (max-width: 640px) {
		padding: 20px;
	}
	@media all and (max-width: 480px) {
		padding: 15px;
	}
`;
const NextActivityBackgroundImage1 = styled.img`
	position: absolute;
	z-index: 0;
	width: 153px;
	height: 128px;
	top: 0;
	left: 0;
`;
const NextActivityBackgroundImage2 = styled.img`
	position: absolute;
	z-index: 0;
	width: 292px;
	height: 233px;
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
	bottom: 0;
	z-index: 0;
	right: 0;
`;
const LockedCardContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 30px;
	background-color: #e8fbf3;
	border-radius: 10px;
	position: relative;
	margin-bottom: 30px;
	@media all and (max-width: 980px) {
		flex-direction: column;
	}
	@media all and (max-width: 640px) {
		padding: 20px;
	}
	@media all and (max-width: 480px) {
		padding: 15px;
	}
`;
const VideoWrapper = styled.div`
	overflow: hidden;
	width: 47%;
	background-color: #163c53;
	border-radius: 5px;
	z-index: 1;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	/* &::after {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
    } */
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
	@media all and (max-width: 1420px) {
		width: 420px;
	}
	@media all and (max-width: 1280px) {
		width: 500px;
	}
	@media all and (max-width: 980px) {
		width: 100%;
		margin-bottom: 20px;
	}
`;
const VideoImage = styled.img`
	display: block;
	width: 100%;
`;
const PracticeCardContent = styled.div`
	overflow: hidden;
	width: 47%;
	margin-left: 35px;
	@media all and (max-width: 980px) {
		margin-top: 17px;
		margin-left: 0px;
		width: 100%;
	}
`;
const Title = styled.span`
	display: block;
	font-size: 16px;
	font-family: "gordita_medium";
	line-height: 1.3em;
	color: #5aaa8d;
	margin-bottom: 12px;
	@media all and (max-width: 480px) {
		font-size: 14px;
	}
`;
const Description = styled.p`
	font-family: "baloo_paaji_2semibold";
	font-size: 20px;
	color: #000;
`;
const Number = styled.p`
	color: green;
	display: inline;
	font-family: "baloo_paaji_2semibold";
	font-size: 20px;
`;
const Designation = styled.div`
	display: flex;
	align-items: center;
	margin-top: 8px;
	@media all and (max-width: 1400px) {
		margin-top: 5px;
	}
`;
const Span = styled.span`
	width: 14px;
	height: 23px;
	display: block;
`;
const Name = styled.p`
	font-size: 19px;
	margin-left: 10px;
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
