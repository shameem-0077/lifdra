import React from "react";
import styled from "styled-components";

function AssessmentStatus({ assessment }) {
	return (
		<StatusContainer>
			<ItemCard>
				<ObjectiveCountContainer>
					<ObjectiveCount>
						{assessment.objectives_count}
					</ObjectiveCount>
				</ObjectiveCountContainer>
				<ObjectiveText>Objective Questions</ObjectiveText>
			</ItemCard>
			<ItemCard>
				<DescriptiveCountContainer>
					<DescriptiveCount>
						{assessment.descriptives_count}
					</DescriptiveCount>
				</DescriptiveCountContainer>
				<DescriptiveText>Descriptive Questions</DescriptiveText>
			</ItemCard>
			<ItemCard>
				<ChallengeCountContainer>
					<ChallengeCount>
						{assessment.challenges_count}
					</ChallengeCount>
				</ChallengeCountContainer>
				<ChallengeText>Challenge</ChallengeText>
			</ItemCard>
		</StatusContainer>
	);
}

const StatusContainer = styled.div`
	width: 40%;
	@media (max-width: 980px) {
		width: 46%;
	}
	@media (max-width: 640px) {
		width: 100%;
	}
`;
const ItemCard = styled.div`
	display: flex;
	align-items: center;
	border: 1px solid rgb(223, 223, 223);
	padding-left: 38px;
	border-radius: 19px;
	margin-bottom: 15px;
	@media (max-width: 768px) {
		padding-left: 10px;
	}
	@media (max-width: 640px) {
		margin-bottom: 22px;
	}
`;
const ObjectiveCountContainer = styled.div`
	margin: 13px 0px;
	border: 1px solid #059ef7;
	border-radius: 50%;
	padding: 7px;
`;
const ObjectiveCount = styled.span`
	background-color: #059ef7;
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	color: #ffff;
	@media (max-width: 768px) {
		width: 30px;
		height: 30px;
	}
`;
const ObjectiveText = styled.h3`
	font-size: 18px;
	font-family: gordita_medium;
	margin-left: 20px;
	color: #059ef7;
	@media (max-width: 768px) {
		font-size: 16px;
		margin-left: 10px;
	}
`;
const Descriptive = styled.div`
	display: flex;
	align-items: center;
	border: 1px solid rgb(223, 223, 223);
	padding-left: 38px;
	border-radius: 19px;
	margin-bottom: 42px;
	@media (max-width: 768px) {
		padding-left: 10px;
	}
	@media (max-width: 640px) {
		margin-bottom: 22px;
	}
`;
const DescriptiveCountContainer = styled.div`
	margin: 13px 0px;
	border: 1px solid #fec34a;
	border-radius: 50%;
	padding: 7px;
`;
const DescriptiveCount = styled.span`
	background-color: #fec34a;
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	color: #ffff;
	@media (max-width: 768px) {
		width: 30px;
		height: 30px;
	}
`;
const DescriptiveText = styled.h3`
	font-size: 18px;
	font-family: gordita_medium;
	margin-left: 20px;
	color: #fec34a;
	@media (max-width: 768px) {
		font-size: 16px;
		margin-left: 10px;
	}
`;
const Challenge = styled.div`
	display: flex;
	align-items: center;
	border: 1px solid rgb(223, 223, 223);
	padding-left: 38px;
	border-radius: 19px;
	margin-bottom: 42px;
	@media (max-width: 768px) {
		padding-left: 10px;
	}
	@media (max-width: 640px) {
		margin-bottom: 22px;
	}
`;
const ChallengeCountContainer = styled.div`
	margin: 13px 0px;
	border: 1px solid #47c082;
	border-radius: 50%;
	padding: 7px;
`;
const ChallengeCount = styled.span`
	background-color: #47c082;
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	color: #ffff;
	@media (max-width: 768px) {
		width: 30px;
		height: 30px;
	}
`;
const ChallengeText = styled.h3`
	font-size: 20px;
	font-family: gordita_medium;
	margin-left: 18px;
	color: #47c082;
	@media (max-width: 768px) {
		font-size: 16px;
		margin-left: 10px;
	}
`;

export default AssessmentStatus;
