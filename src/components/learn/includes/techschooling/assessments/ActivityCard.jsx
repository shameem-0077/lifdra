import React from "react";
import styled from "styled-components";
import {
	getUserDateFromUTC,
	getUserTimeFromUTC,
	truncateString,
} from "../../../../helpers/functions";

const ActivityCard = ({ data }) => {
	return (
		<Container>
			<Title
				style={{ color: data.color }}
				className={`${data.status}`}
			>
				{data.description}
			</Title>
			<Label>
				<Date>{getUserDateFromUTC(data.date_added)}</Date>{" "}
				<Dot></Dot>
				<Time>{getUserTimeFromUTC(data.date_added)}</Time>
			</Label>
			{data.is_star_needed && (
				<ScoreContainer>
					<ScoreLabel>Obtained score</ScoreLabel>
					<StarRating>
						<StarIcon className="sc-fHxwqH jeMXkI las la-star" />
						{data.activity_type ===
						"assessment_improvement_valuated"
							? Math.round(
									(data.improvement_score /
										data.maximum_score) *
										10
							  )
							: Math.round(
									(data.assessment_score /
										data.maximum_score) *
										10
							  )}
						/10
					</StarRating>
				</ScoreContainer>
			)}
			<ActivityIcon
				style={{ backgroundColor: data.background_color }}
				className={`bg-${data.status}`}
			>
				<Icon
					style={{ color: data.color }}
					className={`las la-${data.icon_name}`}
				></Icon>
			</ActivityIcon>
			{/* {renderDownload()} */}
		</Container>
	);
};

export default ActivityCard;
const Container = styled.div`
	padding-left: 30px;
	margin-left: 20px;
	padding-bottom: 15px;
	position: relative;
	border-left: 1px solid #e3e3e3;
	&:last-child {
		border-left: unset;
	}
`;

const Title = styled.h3`
	font-size: 16px;
	font-family: gordita_medium;
	color: #44c081;
`;
const DownloadCard = styled.span`
	border: 0.03125rem solid #ccc;
	border-radius: 1.25rem;
	font-size: 15px;
	margin-top: 15px;
	font-weight: 600;
	display: inline-block;
	padding: 2% 14%;
	letter-spacing: 1px;
`;
const Label = styled.div`
	display: flex;
	align-items: center;
`;
const Date = styled.span`
	display: inline-block;
	font-family: gordita_regular;
	color: #b4b4b6;
	font-size: 12px;
`;
const Dot = styled.small`
	display: inline-block;
	width: 5px;
	height: 5px;
	border-radius: 50%;
	background-color: #6d6d6d;
	margin: 0 7px;
`;
const Time = styled.span`
	display: inline-block;
	font-family: gordita_regular;
	color: #b4b4b6;
	font-size: 12px;
`;
const ScoreContainer = styled.div``;
const ScoreLabel = styled.span`
	display: inline-block;
	margin-right: 10px;
	font-size: 12px;
	color: #9d9d9d;
	font-family: gordita_regular;
`;
const StarRating = styled.span`
	text-align: center;
	display: inline-block;
	width: 80px;
	margin: 0 auto;
	padding: 3px 0;
	background-color: #f7e735;
	color: #fff;
	font-size: 14px;
	border-radius: 30px;
	font-family: "gordita_medium";
`;
const StarIcon = styled.i`
	display: inline-block;
	margin-right: 2px;
	font-size: 14px;
	color: #dba665;
`;
const ActivityIcon = styled.span`
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	border-radius: 50%;
	overflow: hidden;
	background-color: ${(props) => props.bg};
	position: absolute;
	top: 0px;
	left: -15px;
`;
const Icon = styled.i`
	font-size: 25px;
	margin: 0 auto;
`;
