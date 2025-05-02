import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import arrow from "../../../../../assets/images/steyp-landing/right-arrow.svg";
import clr from "../../../../../assets/images/bck.svg";
import { useDispatch } from "react-redux";

function JobDesk() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleRoute = () => {
		dispatch({
			type: "UPDATE_STUDENT_TYPE",
			student_type: "College Students",
		});
		localStorage.setItem("student", JSON.stringify("College Students"));

		navigate("?action=phone");
	};
	return (
		<Cover id="jobdesk">
			<Container className="wrapper">
				<LeftSection>
					<CardsCover>
						<InterviewCard className="offset-one">
							<Icon>
								<img
									src={
										"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/interview.svg"
									}
									alt="image"
								/>
							</Icon>
							<ContentContainer>
								<Title>One-year online internship</Title>
								<Description>
									Industrial engineering experience while
									pursing academics.
								</Description>
							</ContentContainer>
						</InterviewCard>
						<TrainingCard>
							<Icon>
								<img
									src={
										"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/training.svg"
									}
									alt="image"
								/>
							</Icon>
							<ContentContainer>
								<Title>Full Stack Development</Title>
								<Description>
									Learning website development, web
									application development and mobile
									application development.
								</Description>
							</ContentContainer>
						</TrainingCard>
						<JobCard className="offset-two">
							<Icon>
								<img
									src={
										"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/job.svg"
									}
									alt="image"
								/>
							</Icon>
							<ContentContainer>
								<Title>
									Spend 1 hr daily and be an engineer
								</Title>
								<Description>
									Syllabus arranged one hour each for 365
									Days.
								</Description>
							</ContentContainer>
						</JobCard>
					</CardsCover>
				</LeftSection>
				<RightSection>
					{/* <Top> */}
					<SectionTitle>
						An Engineering Program <span>for College Students</span>
					</SectionTitle>
					{/* <p>(For College Students / Graduates)</p> */}
					{/* </Top> */}
					<SectionDescription>
						Steyp's engineering programme for college students aims
						to prepare them to become industry-ready computer
						engineers with excellent technical skills.
						<br /> <br />
						This programme allows students to gain industry
						experience while pursuing their degree.
					</SectionDescription>{" "}
					<ApplyButton
						// to="/job-desk/college/apply/"
						onClick={() => handleRoute()}
					>
						Start free trial!
					</ApplyButton>
				</RightSection>
			</Container>
			{/* <ApplyButton className="responsive" to="/job-desk/college/apply/">
                Apply Now
            </ApplyButton> */}
			<ApplyButton
				className="responsive"
				// to="/job-desk/college/apply/"
				onClick={() => handleRoute()}
			>
				Start free trial!
			</ApplyButton>
		</Cover>
	);
}

export default JobDesk;
const Cover = styled.div`
	background-color: #edf9fe;
	padding: 120px 0;
	@media all and (max-width: 1280px) {
		padding: 120px 0;
	}
	@media all and (max-width: 1100px) {
		grid-gap: 50px;
		padding: 100px 0;
	}
	@media all and (max-width: 980px) {
		grid-template-columns: 1fr;
		padding: 90px 0;
	}
	@media all and (max-width: 768px) {
		/* padding-top: 100px; */
	}
	@media all and (max-width: 640px) {
		padding: 60px 0;
		grid-gap: 20px;
	}
	@media all and (max-width: 480px) {
		padding: 60px 0;
		grid-gap: 20px;
	}
`;
const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 70px;
	/* padding: 165px 0; */

	@media all and (max-width: 1280px) {
		/* padding: 120px 0; */
	}
	@media all and (max-width: 1100px) {
		grid-gap: 50px;
		/* padding: 100px 0; */
	}
	@media all and (max-width: 980px) {
		grid-template-columns: 1fr;
		/* padding: 90px 0; */
	}
	@media all and (max-width: 768px) {
		/* padding-top: 100px; */
		grid-gap: 20px;
	}
	@media all and (max-width: 640px) {
		/* padding: 60px 0; */
		grid-gap: 0px;
	}
`;
const LeftSection = styled.div`
	@media all and (max-width: 980px) {
		max-width: 500px;
		margin: 0 auto;
		order: 2;
	}
	@media all and (max-width: 640px) {
		transform: translate(0px, 35px);
	}
`;
const RightSection = styled.div`
	/* margin-left: 50px; */
	@media all and (max-width: 640px) {
		margin-top: 75px;
		text-align: center;
	}
	@media all and (max-width: 480px) {
		margin-top: 0px;
	}
`;
// const Top = styled.div`
//     display: flex;
//     align-items: center;
//     margin-bottom: 30px;
//     p {
//         font-size: 20px;
//         margin-left: 25px;
//         color: #000;
//     }
// `;
const CardsCover = styled.div`
	background-color: #84b988;
	padding: 30px 30px 0 30px;
	margin-right: 30%;
	border-radius: 10px;
	.offset-one {
		transform: translateX(15%);
		margin-bottom: 20px;
		@media all and (max-width: 480px) {
			transform: translateX(0);
		}
	}
	.offset-two {
		transform: translate(30%, 20px);
		@media all and (max-width: 1280px) {
			transform: translate(15%, 20px);
		}
		@media all and (max-width: 480px) {
			transform: translate(0, 20px);
		}
	}
	@media all and (max-width: 1400px) {
		margin-right: 23%;
	}
	@media all and (max-width: 1280px) {
		margin-right: 10%;
	}
	@media all and (max-width: 480px) {
		margin-right: 0%;
		padding: 20px 20px 36px 20px;
	}
`;
const InterviewCard = styled.div`
	background-color: #fff;
	padding: 15px;
	border-radius: 10px;
	display: flex;
	justify-content: space-between;
	box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
	@media all and (max-width: 480px) {
		display: block;
	}
`;
const TrainingCard = styled.div`
	background-color: #fff;
	padding: 15px;
	border-radius: 10px;
	display: flex;
	justify-content: space-between;
	box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
	@media all and (max-width: 480px) {
		display: block;
	}
`;
const JobCard = styled.div`
	background-color: #fff;
	padding: 15px;
	border-radius: 10px;
	display: flex;
	justify-content: space-between;
	box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
	position: relative;
	@media all and (max-width: 480px) {
		display: block;
	}
	&:after {
		content: "";
		position: absolute;
		display: block;
		width: 100px;
		height: 50px;
		background: url(${arrow}) no-repeat;
		right: -80px;
		bottom: -40px;
		background-size: contain;
		@media all and (max-width: 980px) {
			display: none;
		}
	}
`;
const Icon = styled.div`
	margin-right: 20px;
	width: 50px;

	img {
		display: block;
		width: 100%;
	}
	@media all and (max-width: 480px) {
		width: 40px;
		margin-bottom: 10px;
	}
`;
const ContentContainer = styled.div`
	flex: 1;
`;
const Title = styled.h3`
	font-size: 16px;
	font-family: gordita_medium;
	margin-bottom: 5px;
`;
const Description = styled.p`
	font-size: 13px;
`;
const SectionTitle = styled.h2`
	background-image: url(${clr});
	font-size: 34px;
	margin-bottom: 30px;
	font-family: gordita_medium;
	color: #000;
	span {
		font-size: inherit;
		color: #0fa56e;
		font-family: inherit;
	}

	@media all and (max-width: 1280px) {
		font-size: 30px;
	}
	@media all and (max-width: 980px) {
		font-size: 34px;
		margin-bottom: 20px;
	}
	@media all and (max-width: 768px) {
		font-size: 32px;
		margin-bottom: 20px;
	}
	@media all and (max-width: 480px) {
		font-size: 26px;
	}
	@media all and (max-width: 360px) {
		text-align: center;
	}
	@media all and (max-width: 320px) {
	}
`;
const SectionDescription = styled.p`
	max-width: 550px;
	margin-bottom: 30px;
	@media all and (max-width: 980px) {
		max-width: 90%;
	}
	@media all and (max-width: 640px) {
		font-size: 15px;
		max-width: 100%;
	}
	@media all and (max-width: 480px) {
		max-width: 100%;
		margin-bottom: 0px;
	}
`;
const ApplyButton = styled.div`
	width: 180px;
	height: 50px;
	color: #fff;
	display: flex;
	font-family: gordita_medium;
	font-size: 16px;
	justify-content: center;
	align-items: center;
	background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
	border-radius: 6px;
	transition: all 0.4s ease;
	position: relative;
	cursor: pointer;

	&:hover {
		opacity: 0.8;
	}
	&.responsive {
		display: none;
		margin: 90px auto 0;
	}
	@media all and (max-width: 980px) {
		display: none;
		&.responsive {
			display: flex;
		}
	}

	@media all and (max-width: 640px) {
		&.responsive {
			margin-top: 70px;
		}
	}
`;
