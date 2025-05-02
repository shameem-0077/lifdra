import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { secondsTohm } from "../../../../helpers/functions";

const SkillCard = ({ data, background, subject_slug }) => {
	
	return (
		<>
			<CardContainer
				to={`/nanodegree/${subject_slug}/new-content/skills/${data.id}/lessons/`}
				background={background}
			>
				<ImageBox>
					<Image src={data.image} />
				</ImageBox>
				<ContentBox>
					<TopContent>
						<Skill>Skill {data.order_id}</Skill>
						<LabelContainer>
							<Label></Label>
							<LabelIcon className="las la-check-circle"></LabelIcon>
						</LabelContainer>
					</TopContent>
					<MiddleContent>
						<SkillName>{data.name}</SkillName>
					</MiddleContent>
					<BottomContent>
						<LeftContent>
							<Icon className="las la-layer-group"></Icon>
							<LessonCount>{data.lessons} Lesson</LessonCount>
						</LeftContent>
						<RightContent>
							<Icon className="las la-clock"></Icon>
							<TimeCount>{secondsTohm(data.duration)}</TimeCount>
						</RightContent>
					</BottomContent>
				</ContentBox>
				<StatusIcon></StatusIcon>
			</CardContainer>
		</>
	);
};

export default SkillCard;

const CardContainer = styled(Link)`
	display: flex;
	align-items: center;
	padding: 19px;
	border-radius: 7px;
	background: #f9f9f9;
	position: relative;
	min-height: 150px;
	@media all and (max-width: 480px) {
		min-width: 280px;
		background: ${(data) => data.background};
		border-radius: 10px;
		padding: 15px;
		margin-right: 15px;
	}
`;
const StatusIcon = styled.i`
	position: absolute;
	top: 17px;
	font-size: 21px;
	right: 17px;
	color: ${(props) =>
		props.status === "completed"
			? "#1ed290"
			: props.status === "pending"
			? "#f5ad42"
			: "#b7b7b7"};
`;
const ImageBox = styled.div`
	max-width: 160px;
	overflow: hidden;
	border-radius: 6px;
	margin-right: 14px;
	/* @media (max-width: 1024px) {
        max-width: 100%;
        margin-right: 0;
        margin-bottom: 14px;
    } */
	@media (max-width: 480px) {
		display: none;
	}
	@media (max-width: 640px) {
		max-width: 143px;
		margin-right: 11px;
		margin-bottom: 0;
	}
	@media (max-width: 480px) {
		max-width: 100%;
		margin-bottom: 11px;
		margin-right: 0;
	}
`;
const Image = styled.img`
	width: 100%;
	display: block;
	@media all and (max-width: 480px) {
		display: none;
	}
`;
const ContentBox = styled.div`
	@media all and (max-width: 480px) {
		color: #fff;
		width: 100%;
	}
`;
const TopContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const Skill = styled.p`
	font-size: 13px;
	font-family: gordita_regular;
	color: rgb(158, 158, 158);
	@media all and (max-width: 480px) {
		font-size: 13px;
		color: #fff;
	}
`;
const LabelContainer = styled.span`
	display: none;
	background: rgb(76, 175, 80);
	padding: 5px 15px;
	border-radius: 5px;
	margin-left: 10px;
	font-family: baloo_paaji_2semibold;
	@media all and (max-width: 480px) {
		background: none;
		padding: 0;
		border-radius: none;
		margin-left: 10px;
		font-family: baloo_paaji_2semibold;
	}
`;
const Label = styled.small`
	color: #fff;
	font-size: 16px;
	@media all and (max-width: 480px) {
		display: none;
	}
`;
const LabelIcon = styled.small`
	display: none;
	@media all and (max-width: 480px) {
		display: block;
		font-size: 24px;
	}
`;
const MiddleContent = styled.div`
	margin: 5px 0;
	@media all and (max-width: 480px) {
		margin: 5px 0px 10px;
	}
`;
const SkillName = styled.span`
	font-family: gordita_medium;
	font-size: 16px;
	@media all and (max-width: 480px) {
		font-size: 18px;
	}
`;
const BottomContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	@media (max-width: 980px) {
		flex-direction: column;
		align-items: flex-start;
	}
	@media (max-width: 768px) {
		flex-direction: row;
		align-items: center;
	}
`;
const LeftContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 9px;
`;
const Icon = styled.small`
	color: rgb(76, 175, 80);
	font-size: 18px;
	margin-right: 4px;
	margin-bottom: 4px;
	@media all and (max-width: 480px) {
		font-size: 24px;
		color: #fff;
	}
`;
const LessonCount = styled.p`
	color: rgb(153, 153, 153);
	font-size: 13px;
	font-family: gordita_regular;
	@media all and (max-width: 480px) {
		font-size: 14px;
		color: #fff;
	}
`;
const TimeCount = styled.p`
	color: rgb(153, 153, 153);
	font-size: 13px;
	font-family: gordita_regular;
	@media all and (max-width: 480px) {
		font-size: 14px;
		color: #fff;
	}
`;
const RightContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
