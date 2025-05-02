import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { secondsTohm } from "../../../../../../helpers/functions";
import RoundGraph from "../../../../general/RoundGraph";
//  import RoundGraph from "../../general/RoundGraph";

export default function AssessmentActivity({ data, subject_slug }) {
	const userSubscriptionType = useSelector(
		(state) => state.userSubscriptionType
	);

	return userSubscriptionType === "trial_end" ||
		userSubscriptionType === "expired_subscription" ? (
		<LockedAssessCardContainer className="anim-fade">
			<VideoWrapper>
				<VideoImage src={data.image} alt="" />
				<Lock>
					<LockIcon src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/padlock.svg" />
				</Lock>
			</VideoWrapper>
			<AssessCardContent>
				<Title>Current Activity - Assessment</Title>
				<Description>
					<Number>
						#{data.auto_id}
						&nbsp;
					</Number>
					<span>| {data.title}</span>
				</Description>
				<Icons>
					<Designation>
						<Span>
							<i class="lar la-play-circle"></i>
						</Span>
						<Name>{data.designation}</Name>
					</Designation>
					<Duration>
						<Span>
							<i class="las la-clock"></i>
						</Span>
						<Name>{`${data.time_allotted} ${
							data.time_allotted === 1 ? "Hr" : "Hrs"
						}`}</Name>
					</Duration>
				</Icons>
				<QuestionType>
					<Descriptive>
						<RoundGraph
							is_background={true}
							count={data.objectives_count}
							content={data.objectives_count}
							total={
								data.objectives_count +
								data.challenges_count +
								data.descriptives_count
							}
							contentColor={"#fff"}
							color={"rgb(102,187,106)"}
							colorLight={"rgba(102,187,106,0.7)"}
							dimension={60}
							strokewidthPercent={90}
						/>
						<Para>Objectives</Para>
					</Descriptive>
					<Objective>
						<RoundGraph
							is_background={true}
							count={data.descriptives_count}
							content={data.descriptives_count}
							total={
								data.objectives_count +
								data.challenges_count +
								data.descriptives_count
							}
							contentColor={"#fff"}
							color={"rgb(5,158,247)"}
							colorLight={"rgba(5,158,247,0.7)"}
							dimension={60}
							strokewidthPercent={90}
						/>
						<Para>Descriptive</Para>
					</Objective>
					<Challenge>
						<RoundGraph
							is_background={true}
							count={data.challenges_count}
							content={data.challenges_count}
							total={
								data.objectives_count +
								data.challenges_count +
								data.descriptives_count
							}
							contentColor={"#fff"}
							color={"rgb(248,236,82)"}
							colorLight={"rgba(248,236,82,0.7)"}
							dimension={60}
							strokewidthPercent={85}
						/>
						<Para>Challenges</Para>
					</Challenge>
				</QuestionType>
				<Start>
					{data.status === "attending"
						? "Ongoing"
						: "Start Now"}
				</Start>
			</AssessCardContent>
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
		</LockedAssessCardContainer>
	) : (
		<AssessCardContainer
			className="anim-fade"
			to={`/${subject_slug}/assessments/view/${data.id}/`}
		>
			<VideoWrapper>
				<VideoImage src={data.image} alt="" />
			</VideoWrapper>
			<AssessCardContent>
				<Title>Current Activity - Assessment</Title>
				<Description>
					<Number>
						#{data.auto_id}
						&nbsp;
					</Number>
					<span>| {data.title}</span>
				</Description>
				<Icons>
					<Designation>
						<Span>
							<i class="lar la-play-circle"></i>
						</Span>
						<Name>{data.designation}</Name>
					</Designation>
					<Duration>
						<Span>
							<i class="las la-clock"></i>
						</Span>
						<Name>{`${data.time_allotted} ${
							data.time_allotted === 1 ? "Hr" : "Hrs"
						}`}</Name>
					</Duration>
				</Icons>
				<QuestionType>
					<Descriptive>
						<RoundGraph
							is_background={true}
							count={data.objectives_count}
							content={data.objectives_count}
							total={
								data.objectives_count +
								data.challenges_count +
								data.descriptives_count
							}
							contentColor={"#fff"}
							color={"rgb(102,187,106)"}
							colorLight={"rgba(102,187,106,0.7)"}
							dimension={46}
							strokewidthPercent={90}
						/>
						<Para>Objectives</Para>
					</Descriptive>
					<Objective>
						<RoundGraph
							is_background={true}
							count={data.descriptives_count}
							content={data.descriptives_count}
							total={
								data.objectives_count +
								data.challenges_count +
								data.descriptives_count
							}
							contentColor={"#fff"}
							color={"rgb(5,158,247)"}
							colorLight={"rgba(5,158,247,0.7)"}
							dimension={46}
							strokewidthPercent={90}
						/>
						<Para>Descriptive</Para>
					</Objective>
					<Challenge>
						<RoundGraph
							is_background={true}
							count={data.challenges_count}
							content={data.challenges_count}
							total={
								data.objectives_count +
								data.challenges_count +
								data.descriptives_count
							}
							contentColor={"#fff"}
							color={"rgb(248,236,82)"}
							colorLight={"rgba(248,236,82,0.7)"}
							dimension={46}
							strokewidthPercent={85}
						/>
						<Para>Challenges</Para>
					</Challenge>
				</QuestionType>
				<Start>
					{data.status === "attending"
						? "Ongoing"
						: "Start Now"}
				</Start>
			</AssessCardContent>
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
		</AssessCardContainer>
	);
}

const LockedAssessCardContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: left;
	padding: 30px;
	background-color: #e8fbf3;
	border-radius: 10px;
	position: relative;
	margin-bottom: 30px;
	@media all and (max-width: 1440px) {
		width: 100%;
	}
	@media all and (max-width: 768px) {
		flex-wrap: wrap;
		width: 100%;
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
const AssessCardContainer = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: left;
	padding: 30px;
	background-color: #e8fbf3;
	border-radius: 10px;
	position: relative;
	margin-bottom: 30px;
	@media all and (max-width: 1440px) {
		width: 100%;
	}
	@media all and (max-width: 768px) {
		flex-wrap: wrap;
		width: 100%;
	}
`;
const VideoWrapper = styled.div`
	width: 43%;
	overflow: hidden;
	background-color: #163c53;
	border-radius: 5px;
	z-index: 1;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;

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
	@media all and (max-width: 768px) {
		width: 100%;
		margin-bottom: 20px;
	}

	// display: block;
	// border-radius: 18px;
	// overflow: hidden;
	// @media all and (max-width: 1280px) {
	//     width: 50%;
	// }
	// @media (max-width: 9800px) {
	//     width: 100%;
	//     margin-bottom: 25px;
	// }
`;
const VideoImage = styled.img`
	display: block;
	width: 100%;
`;
const AssessCardContent = styled.div`
	width: 53%;
	padding-left: 30px;
	z-index: 1;
	@media all and (max-width: 768px) {
		width: 100%;
		padding-left: unset;
	}
`;
const Title = styled.span`
	font-family: "gordita_medium";
	display: block;
	line-height: 2.2rem;
	font-size: 18px;
	color: #cc15aa;
	@media all and (max-width: 1100px) {
		margin-bottom: 4px;
	}
`;
const Description = styled.span`
	font-family: "baloo_paaji_2semibold";
	font-size: 20px;
	display: flex;
	align-items: flex-start;
	color: #000;
`;
const Number = styled.p`
	color: green;
	display: inline;
	font-family: "baloo_paaji_2semibold";
	font-size: 20px;
`;
const Icons = styled.div`
	display: flex;
	align-items: center;
	justify-content: left;
	font-size: 17px;
	@media all and (max-width: 1400px) {
		flex-wrap: wrap;
		margin-top: 5px;
	}
`;
const Designation = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 12px;
`;
const Span = styled.span`
	width: 14px;
	height: 23px;
	display: block;
	border-radius: 50%;
`;
const Name = styled.p`
	font-size: 18px;
	margin-left: 10px;
`;
const Duration = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
const QuestionType = styled.div`
	display: flex;
	align-items: center;
	justify-content: left;
	margin-bottom: 20px;
	@media all and (max-width: 370px) {
		flex-wrap: wrap;
	}
`;
const Descriptive = styled.div`
	text-align: center;
	margin-right: 15px;
	@media all and (max-width: 370px) {
		width: 100%;
		margin-right: 0px;
	}
`;
const GraphSpan = styled.span`
	border-radius: 50%;
	background-color: #5fce5f;
	display: block;
	width: 57px;
	height: 57px;
	margin: 0 auto;
	margin-bottom: 10px;
`;
const Objective = styled.div`
	text-align: center;
	margin-right: 15px;
	@media all and (max-width: 370px) {
		width: 100%;
		margin-right: 0px;
	}
`;
const Challenge = styled.div`
	text-align: center;
	margin-right: 15px;
	@media all and (max-width: 370px) {
		width: 100%;
		margin-right: 0px;
	}
`;
const Start = styled.span`
	border-radius: 8px;
	background-color: #0ba59d;
	color: #fff;
	padding: 5px 30px;
	text-align: center;
	font-size: 16px;
	display: inline-block;
	@media all and (max-width: 370px) {
		margin-left: 69px;
	}
`;
const Para = styled.p`
	font-size: 16px;
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
