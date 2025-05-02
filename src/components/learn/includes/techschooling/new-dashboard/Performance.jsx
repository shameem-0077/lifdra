import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { activityConfig } from "../../../../../axiosConfig";
import { getDateStrWithoutReplace } from "../../../../helpers/functions";
import StudentLearningStatus from "./StudentLearningStatus";

function Performance() {
	const currentMonth = () => {
		let newDate = getDateStrWithoutReplace(new Date());
		let dateArr = newDate.split(" ");
		let date = `${dateArr[1]} ${dateArr[2]}`;

		return date;
	};
	return (
		<Container>
			<TopSection>
				<Title>Performance</Title>
				<Right>
					<Calendar>
						<img
							src={require("../../../../../assets/images/new-dashboard/calendar.svg")}
							alt="Calender icon"
						/>
					</Calendar>
					<DateSection>Last 5 days</DateSection>
				</Right>
			</TopSection>
			<ChartSection>
				{" "}
				<StudentLearningStatus />{" "}
			</ChartSection>
		</Container>
	);
}

export default Performance;
const Container = styled.div`
	margin: 30px 0;
`;

const Label = styled.div``;
const Title = styled.h3`
	font-size: 18px;
	font-family: gordita_medium;
	color: #4d4d4d;
	@media all and (max-width: 360px) {
		font-size: 16px;
	}
`;
const TopSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
`;
const Calendar = styled.span`
	width: 15px;
	display: block;
	img {
		display: block;
		width: 100%;
	}
`;
const Right = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 120px;
	background: #fdfdfb;
	height: 34px;
	border: 1px solid #eaeef1;
	border-radius: 5px;
	&:hover {
		opacity: 0.8;
	}
`;
const DateSection = styled.div`
	font-size: 13px;
	font-family: gordita_medium;
	margin-left: 5px;
	transform: translateY(2px);
`;

const ChartSection = styled.div``;
