import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AssessmentExam = ({ toggleShowModal, assessment }) => {
	return (
		<Container>
			<TopSection>
				<Title>Assessment Exam</Title>
				<Description>
					You can now evaluate and know where you stand,
					with timely assessments
				</Description>
				<Button onClick={toggleShowModal}>Start Exam</Button>
				<TimeAllot>
					<Label>Time allotted</Label>
					<Hour>
						<Icon className="las la-stopwatch" />
						<Time> {assessment.time_allotted} Hours</Time>
					</Hour>
				</TimeAllot>
			</TopSection>
			<BottomSection>
				<CardContainer>
					<Card>
						<GraphSection>
							<Graph>
								{assessment.objectives_count}
							</Graph>
						</GraphSection>
						<ContentSection>
							<GraphTitle>
								Objective Questions
							</GraphTitle>
							{/* <GraphDescription>
                                Lorem ipsum dolor sit
                            </GraphDescription> */}
						</ContentSection>
					</Card>
					<Card>
						<GraphSection>
							<Graph>
								{assessment.descriptives_count}
							</Graph>
						</GraphSection>
						<ContentSection>
							<GraphTitle>
								Descriptive Questions
							</GraphTitle>
							{/* <GraphDescription>
                                Lorem ipsum dolor sit
                            </GraphDescription> */}
						</ContentSection>
					</Card>
					<Card>
						<GraphSection>
							<Graph>
								{assessment.challenges_count}
							</Graph>
						</GraphSection>
						<ContentSection>
							<GraphTitle>Challenge</GraphTitle>
							{/* <GraphDescription>
                                Lorem ipsum dolor sit
                            </GraphDescription> */}
						</ContentSection>
					</Card>
				</CardContainer>
			</BottomSection>
		</Container>
	);
};

export default AssessmentExam;

const Container = styled.div`
	position: relative;
	padding-bottom: 50px;
`;
const TopSection = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	margin-top: 20px;
	text-align: center;
	padding-top: 150px;
	background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/assessments/assesmentexambg.svg");
	background-repeat: no-repeat;
	background-position: center;
	background-size: 80%;
	padding-bottom: 90px;
	@media all and (max-width: 980px) {
		padding-top: 75px;
		padding-bottom: 50px;
		margin-top: 0px;
	}
	@media all and (max-width: 640px) {
		background: none;
		padding-top: 60px;
	}
	@media all and (max-width: 640px) {
		padding-top: 30px;
	}
`;
const Title = styled.h2`
	font-size: 26px;
	font-family: "gordita_medium";
	margin-bottom: 4px;
	@media all and (max-width: 980px) {
		margin-bottom: 0px;
	}
	@media all and (max-width: 768px) {
		font-size: 20px;
		margin-bottom: 10px;
	}
	@media all and (max-width: 360px) {
		font-size: 16px;
	}
`;
const Description = styled.p`
	font-size: 16px;
	max-width: 500px;
	margin: 0 auto;
	margin-bottom: 25px;
	font-family: gordita_regular;
	@media all and (max-width: 980px) {
		font-size: 15px;
		max-width: 400px;
	}
	@media all and (max-width: 768px) {
		font-size: 14px;
		max-width: 320px;
		margin-bottom: 16px;
	}
	@media all and (max-width: 640px) {
		max-width: 500px;
	}
	@media all and (max-width: 360px) {
		font-size: 13px;
	}
`;
const Button = styled.span`
	cursor: pointer;
	display: inline-block;
	padding: 11px 45px;
	background-color: #3383ff;
	color: #ffffff;
	font-family: "gordita_medium";
	font-size: 17px;
	border-radius: 10px;
	box-shadow: 0 0px 9px rgb(33 150 243 / 53%);
	@media (max-width: 980px) {
		padding: 8px 40px;
		border-radius: 7px;
	}
	@media (max-width: 768px) {
		padding: 5px 25px;
		border-radius: 5px;
	}
	@media all and (max-width: 768px) {
		font-size: 18px;
	}
`;

const TimeAllot = styled.div`
	width: 300px;
	position: absolute;
	top: 10px;
	right: 0px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	@media all and (max-width: 1440px) {
		top: -62px;
		left: 0px;
	}
	@media all and (max-width: 980px) {
		width: 205px;
		top: -45px;
	}
	@media all and (max-width: 480px) {
		width: 115px;
	}
`;
const Label = styled.p`
	font-size: 20px;
	font-family: "gordita_medium";
	color: #000;
	@media all and (max-width: 980px) {
		font-size: 16px;
	}
	@media all and (max-width: 480px) {
		display: none;
	}
`;
const Hour = styled.div`
	margin-left: 20px;
	background-color: #3383ff;
	color: #fff;
	font-family: "baloo_paaji_2semibold";
	font-size: 18px;
	padding: 3px 20px;
	border-radius: 5px;
	box-shadow: 0 0px 10px 0 rgb(103 151 255 / 74%),
		0 12px 90px 0 rgba(103, 151, 255, 0.11);
	@media all and (max-width: 980px) {
		padding: 3px 8px;
		font-size: 16px;
	}
	@media all and (max-width: 480px) {
		margin: 0;
	}
`;
const Icon = styled.i``;
const Time = styled.span``;
const BottomSection = styled.div`
	max-width: 1200px;
	margin: 0 auto;
`;
const CardContainer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;
const GraphSection = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	border: 3px solid #3383ff;

	margin-right: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Graph = styled.p`
	font-size: 22px;
	font-family: "gordita_medium";
	color: #3383ff;
`;
const ContentSection = styled.div``;
const GraphTitle = styled.h3`
	font-family: "baloo_paaji_2semibold";
	@media all and (max-width: 980px) {
		font-size: 18px;
	}
	@media all and (max-width: 360px) {
		font-size: 16px;
	}
`;
const GraphDescription = styled.p`
	font-family: "gordita_medium";
	@media all and (max-width: 360px) {
		font-size: 14px;
	}
`;
const Card = styled.div`
	width: 32%;
	display: flex;
	align-items: center;
	background-color: #fff;
	box-shadow: 0 8px 60px 0 rgba(103, 151, 255, 0.11),
		0 12px 90px 0 rgba(103, 151, 255, 0.11);
	padding: 20px;
	border-radius: 10px;
	transition: all 0.4s ease;

	&:hover {
		background-color: #3383ff;
		color: #fff;
	}
	&:hover ${GraphSection} {
		border-color: #fff;
	}
	&:hover ${Graph} {
		color: #fff;
	}
	&:hover ${GraphDescription} {
		color: #fff;
	}
	@media all and (max-width: 1200px) {
		width: 47%;
		margin: 0 auto;
		margin-bottom: 30px;
	}
	@media all and (max-width: 980px) {
		padding: 15px;
	}
	@media all and (max-width: 768px) {
		width: 100%;
		margin-bottom: 20px;
		justify-content: center;
	}
`;
