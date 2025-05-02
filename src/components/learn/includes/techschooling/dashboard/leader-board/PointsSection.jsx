import React from "react";
import styled from "styled-components";
import Topics from "../../../../../../assets/images/leader-board/Topics.svg";
import Practices from "../../../../../../assets/images/leader-board/Practices.svg";
import Workshop from "../../../../../../assets/images/leader-board/Workshop.svg";
import Assessment from "../../../../../../assets/images/leader-board/Assessment.svg";
import Learning from "../../../../../../assets/images/leader-board/Learning.svg";
import Profession from "../../../../../../assets/images/leader-board/profession.svg";
import Attendence from "../../../../../../assets/images/leader-board/attendence.svg";
import Steak from "../../../../../../assets/images/leader-board/absence.svg";
import Absence from "../../../../../../assets/images/leader-board/steak.svg";

function PointsSection({ data }) {
	return (
		<>
			<MainContainer>
				<TopicContainer>
					<TopicsSection>
						<Left>
							<ImageContainer className="first">
								<img src={Topics} alt="Topics" />
							</ImageContainer>
							<h4>Topics</h4>
						</Left>
						<Right>
							<h3>{data.topic ? data.topic : "0"}</h3>
							<p>Points</p>
						</Right>
					</TopicsSection>
				</TopicContainer>
				<TopicContainer>
					<TopicsSection>
						<Left>
							<ImageContainer>
								<img src={Practices} alt="Practices" />
							</ImageContainer>
							<h4>Practices</h4>
						</Left>
						<Right>
							<h3>{data.practice ? data.practice : "0"}</h3>
							<p>Points</p>
						</Right>
					</TopicsSection>
				</TopicContainer>
				<TopicContainer>
					<TopicsSection>
						<Left>
							<ImageContainer>
								<img src={Workshop} alt="Workshop" />
							</ImageContainer>
							<h4>Workshops</h4>
						</Left>
						<Right>
							<h3>{data.workshops ? data.workshops : "0"}</h3>
							<p>Points</p>
						</Right>
					</TopicsSection>
				</TopicContainer>
				<TopicContainer>
					<TopicsSection>
						<Left>
							<ImageContainer>
								<img src={Assessment} alt="Assessment" />
							</ImageContainer>
							<h4>Assessments</h4>
						</Left>
						<Right>
							<h3>{data.assessments ? data.assessments : "0"}</h3>
							<p>Points</p>
						</Right>
					</TopicsSection>
				</TopicContainer>
				<TopicContainer>
					<TopicsSection>
						<Left>
							<ImageContainer>
								<img src={Learning} alt="Assessment" />
							</ImageContainer>
							<h4>Skill Completion</h4>
						</Left>
						<Right>
							<h3>{data.skill ? data.skill : "0"}</h3>
							<p>Points</p>
						</Right>
					</TopicsSection>
				</TopicContainer>
				<TopicContainer>
					<TopicsSection>
						<Left>
							<ImageContainer>
								<img src={Profession} alt="Assessment" />
							</ImageContainer>
							<h4>Profession Completion</h4>
						</Left>
						<Right>
							<h3>{data.profession ? data.profession : "0"}</h3>
							<p>Points</p>
						</Right>
					</TopicsSection>
				</TopicContainer>
				<TopicContainer>
					<TopicsSection>
						<Left>
							<ImageContainer>
								<img src={Attendence} alt="Assessment" />
							</ImageContainer>
							<h4>Attendance</h4>
						</Left>
						<Right>
							<h3>
								{data.daily_attendance
									? data.daily_attendance
									: "0"}
							</h3>
							<p>Points</p>
						</Right>
					</TopicsSection>
				</TopicContainer>
				{data.streak_data?.map((item) =>
					item.streak_point ? (
						<TopicContainer>
							<TopicsSection>
								<Left className="last">
									<ImageContainer className="last">
										<img src={Steak} alt="Learning" />
									</ImageContainer>
									<h4>
										{item.days ? item.days : ""} Days
										Continuous Learning
									</h4>
								</Left>
								<Right>
									<h3>
										{item.streak_point
											? item.streak_point
											: "0"}
									</h3>
									<p>Points</p>
								</Right>
							</TopicsSection>
						</TopicContainer>
					) : null
				)}
				<TopicContainer>
					<TopicsSection>
						<Left>
							<ImageContainer>
								<img src={Absence} alt="Assessment" />
							</ImageContainer>
							<h4>Absence</h4>
						</Left>
						<Right>
							<h3>
								{data.absence_points
									? `-${data.absence_points}`
									: "0"}
							</h3>
							<p>Points</p>
						</Right>
					</TopicsSection>
				</TopicContainer>
			</MainContainer>
		</>
	);
}

export default PointsSection;

const MainContainer = styled.ul`
	@media all and (max-width: 1280px) {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: space-between;
		/* padding: 20px 0px; */
	}
	@media all and (max-width: 1050px) {
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 32px;
	}
	@media all and (max-width: 980px) {
		/* flex-direction: row;
        flex-wrap: wrap; */
		/* margin-top: 0px; */
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 30px;
	}
	@media all and (max-width: 680px) {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	@media all and (max-width: 360px) {
		margin-top: 0;
	}
`;
const TopicContainer = styled.li`
	border-bottom: 2px solid #f5f5f5;
	padding: 15px 0px;
	@media all and (max-width: 1280px) {
		flex-direction: row;
		border-bottom: 2px solid #f5f5f5;
		width: 100%;
	}

	@media all and (max-width: 1050px) {
		flex-direction: row;
		padding: 10px 0px;
		border-bottom: 2px solid #f5f5f5;
		width: 47%;
		width: 100%;
	}

	@media all and (max-width: 980px) {
		border-bottom: 2px solid #f5f5f5;
		width: 100%;
		:nth-last-child(-n + 2) {
			border-bottom: none;
		}
	}
	@media all and (max-width: 680px) {
		border-bottom: 2px solid #f5f5f5;
		:nth-last-child(-n + 2) {
			border-bottom: 2px solid #f5f5f5;
		}
		:last-child {
			border-bottom: 0;
		}
	}
	@media all and (max-width: 360px) {
		&:first-child {
			padding-top: 0;
		}
	}
	&:last-child {
		border-bottom: none;
	}
`;
const TopicsSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`;
const Left = styled.div`
	display: flex;
	align-items: center;
	h4 {
		font-size: 14px;
		font-family: "gordita_Regular";
		color: #737782;
	}
	@media all and (max-width: 980px) {
		width: 90%;
	}

	&.last {
		width: 70%;
		@media all and (max-width: 1440px) {
			width: 85%;
		}
		@media all and (max-width: 1280px) {
			width: 85%;
		}
	}
	&.first {
		@media all and (max-width: 480px) {
			width: 30%;
		}
		@media all and (max-width: 1050px) {
			flex-direction: row;
		}
		@media all and (max-width: 1280px) {
			flex-direction: row;
		}
		@media all and (max-width: 480px) {
			width: 30%;
		}
	}
`;
const ImageContainer = styled.div`
	/* width: 45%; */
	margin-right: 10px;
	min-width: 30px;
	max-width: 40px;
	@media all and (max-width: 1280px) {
		width: 50%;
	}

	@media all and (max-width: 480px) {
		width: 25%;
	}
	@media all and (max-width: 980px) {
		width: 50px;
	}
	@media all and (max-width: 480px) {
		width: 45px;
	}
	@media all and (max-width: 360px) {
		width: 36px;
	}

	&.last {
		width: 19%;
		@media all and (max-width: 1440px) {
			width: 19px;
		}

		@media all and (max-width: 980px) {
			width: 50px;
		}
		@media all and (max-width: 480px) {
			width: 45px;
		}
		@media all and (max-width: 360px) {
			width: 32px;
		}
	}

	img {
		display: block;
		width: 100%;
	}
`;
const Right = styled.div`
	margin-left: 30px;
	h3 {
		font-size: 18px;
		font-family: "gordita_medium";
		color: #0fa76f;
		text-align: right;
		@media all and (max-width: 1440px) {
			font-size: 18px;
		}
		@media all and (max-width: 1280px) {
			font-size: 14px;
		}
	}
	p {
		color: #98a4b4;
		font-size: 14px;
		font-family: "gordita_Regular";
		@media all and (max-width: 1440px) {
			font-size: 13px;
		}
		@media all and (max-width: 360px) {
			font-size: 12px;
		}
	}
`;
