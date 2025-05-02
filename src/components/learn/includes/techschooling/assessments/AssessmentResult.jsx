import React, { useContext } from "react";
import styled from "styled-components";
import { AssessmentContext } from "../../../../contexts/stores/AssessmentStore";

function AssessmentResult() {
	const { assessmentState, assessmentDispatch } =
		useContext(AssessmentContext);

	const { obtained_score_data, total_score_data } =
		assessmentState.assessment_score;

	return obtained_score_data && total_score_data ? (
		<Container>
			<ItemCard>
				<ObjectiveTop>
					<ObjectiveText>Objectives</ObjectiveText>
					<ObjectiveCount>
						{obtained_score_data.objective}/
						{total_score_data.objective}
					</ObjectiveCount>
				</ObjectiveTop>
				<ObjectiveBottom>
					<ObjectiveBarContainer>
						<ObjectiveBar
							score={`${Math.round(
								(obtained_score_data.objective /
									total_score_data.objective) *
									100
							)}%`}
						></ObjectiveBar>
					</ObjectiveBarContainer>
				</ObjectiveBottom>
			</ItemCard>
			<ItemCard>
				<DescriptiveTop>
					<DescriptiveText>Descriptive</DescriptiveText>
					<DescriptiveCount>
						{obtained_score_data.descriptive}/
						{total_score_data.descriptive}
					</DescriptiveCount>
				</DescriptiveTop>
				<DescriptiveBottom>
					<DescriptiveBarContainer>
						<DescriptiveBar
							score={`${Math.round(
								(obtained_score_data.descriptive /
									total_score_data.descriptive) *
									100
							)}%`}
						></DescriptiveBar>
					</DescriptiveBarContainer>
				</DescriptiveBottom>
			</ItemCard>
			<ItemCard>
				<ChallengeTop>
					<ChallengeText>Challenge</ChallengeText>
					<ChallengeCount>
						{obtained_score_data.challenge}/
						{total_score_data.challenge}
					</ChallengeCount>
				</ChallengeTop>
				<ChallengeBottom>
					<ChallengeBarContainer>
						<ChallengeBar
							score={`${Math.round(
								(obtained_score_data.challenge /
									total_score_data.challenge) *
									100
							)}%`}
						></ChallengeBar>
					</ChallengeBarContainer>
				</ChallengeBottom>
			</ItemCard>
		</Container>
	) : null;
}
const Container = styled.div`
	width: 57%;
	@media (max-width: 980px) {
		width: 51%;
	}
	@media (max-width: 640px) {
		width: 100%;
		margin-bottom: 35px;
	}
`;

const ItemCard = styled.div`
	background-color: #f9f9f9;
	padding: 22px 20px;
	border-radius: 5px;
	margin-bottom: 15px;
	@media (max-width: 768px) {
		padding: 19px 20px;
	}
	@media (max-width: 640px) {
		margin-bottom: 22px;
	}
`;
const ObjectiveTop = styled.div`
	display: flex;
	justify-content: space-between;
`;
const ObjectiveText = styled.h3`
	font-size: 18px;
	font-family: gordita_medium;
	color: #059ef7;
	@media (max-width: 768px) {
		font-size: 16px;
	}
`;
const ObjectiveCount = styled.span``;
const ObjectiveBottom = styled.div``;
const ObjectiveBarContainer = styled.div`
	height: 10px;
	width: 100%;
	border-radius: 20px;
	background-color: #d9d9d9;
`;
const ObjectiveBar = styled.span`
	height: 10px;
	width: ${({ score }) => score};
	background-color: #059ef7;
	display: block;
	border-radius: 20px;
`;
const Descriptive = styled.div`
	background-color: #f9f9f9;
	padding: 22px 20px;
	border-radius: 5px;
	margin-bottom: 38px;
	@media (max-width: 768px) {
		padding: 19px 20px;
	}
	@media (max-width: 640px) {
		margin-bottom: 22px;
	}
`;
const DescriptiveTop = styled.div`
	display: flex;
	justify-content: space-between;
`;
const DescriptiveText = styled.h3`
	font-size: 18px;
	font-family: gordita_medium;
	color: #fec34a;
	@media (max-width: 768px) {
		font-size: 16px;
	}
`;
const DescriptiveCount = styled.span``;
const DescriptiveBottom = styled.div``;
const DescriptiveBarContainer = styled.div`
	height: 10px;
	width: 100%;
	border-radius: 20px;
	background-color: #d9d9d9;
`;
const DescriptiveBar = styled.span`
	height: 10px;
	width: ${({ score }) => score};
	background-color: #fec34a;
	display: block;
	border-radius: 20px;
`;
const Challenge = styled.div`
	background-color: #f9f9f9;
	padding: 22px 20px;
	border-radius: 5px;
	@media (max-width: 768px) {
		padding: 19px 20px;
	}
	@media (max-width: 640px) {
		margin-bottom: 22px;
	}
`;
const ChallengeTop = styled.div`
	display: flex;
	justify-content: space-between;
`;
const ChallengeText = styled.h3`
	font-size: 18px;
	font-family: gordita_medium;
	color: #47c082;
	@media (max-width: 768px) {
		font-size: 16px;
	}
`;
const ChallengeCount = styled.span``;
const ChallengeBottom = styled.div``;
const ChallengeBarContainer = styled.div`
	height: 10px;
	width: 100%;
	border-radius: 20px;
	background-color: #d9d9d9;
`;
const ChallengeBar = styled.span`
	height: 10px;
	width: ${({ score }) => score};
	background-color: #47c082;
	display: block;
	border-radius: 20px;
`;

export default AssessmentResult;
