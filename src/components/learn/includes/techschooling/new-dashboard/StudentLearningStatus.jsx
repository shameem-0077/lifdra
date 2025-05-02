import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getShortMonthName } from "../../../../helpers/functions";
import {
	learnConfig,
	studentActivitiesConfig,
} from "../../../../../axiosConfig";
import "chart.js/auto";
import { Bar, Chart } from "react-chartjs-2";

function StudentLearningStatus() {
	const [dataArray, setDataArray] = useState([]);
	const [dateArray, setDateArray] = useState([]);

	const [allData, setAllData] = useState([]);
	const [assessmentData, setAssessmentData] = useState([]);
	const [practicieData, setPracticieData] = useState([]);
	const [workshopData, setWorkshopData] = useState([]);

	useEffect(() => {
		studentActivitiesConfig
			.get("followups/student-activity-day-chart/", {
				headers: {
					authorization: `Bearer ${access_token}`,
				},
			})
			.then(function (response) {
				setDataArray(response.data.data.user_data);
			});
	}, []);

	useEffect(() => {
		let AllData = dataArray.reduce(
			(prev, next) => prev.concat(next.topic_data),
			[]
		);

		let AssessmentData = dataArray.reduce(
			(prev, next) => prev.concat(next.assessment_data),
			[]
		);
		setAssessmentData(AssessmentData);

		let PracticeData = dataArray.reduce(
			(prev, next) => prev.concat(next.practicie_data),
			[]
		);
		setPracticieData(PracticeData);

		let WorkshopData = dataArray.reduce(
			(prev, next) => prev.concat(next.workshop_data),
			[]
		);
		setWorkshopData(WorkshopData);
		setAllData(AllData);

		let newArr = dataArray.reduce(
			(prev, next) => prev.concat(next.date),
			[]
		);

		newArr = newArr.map((item, index) => {
			const month = getShortMonthName(new Date(item));
			const day = item.slice(item.length - 2);
			return `${day} ${month} `;
		});
		setDateArray(newArr);
	}, [dataArray]);
	const StudentStatuslabel = useState([
		{ id: 1, name: "Topics", color: "#8BC38F" },
		{ id: 2, name: "Practices", color: "#D2814B" },
		{ id: 3, name: "Workshops", color: "#77C1D8" },
		{ id: 4, name: "Assessments", color: "#F7D8EB" },
	]);
	const user_data = useSelector((state) => state.user_data);
	const access_token = user_data.access_token;
	const [width, setWidth] = useState(0);
	const [isResponsive, setResponsive] = useState(true);
	const [isLoading, setLoading] = useState(false);
	const [scheduleData, setScheduleData] = useState({});
	const handleResize = () => {
		setWidth(window.innerWidth);
	};
	window.addEventListener("resize", handleResize);
	const handleResponsive = () => {
		if (width < 980) {
			setResponsive(false);
		} else {
			setResponsive(true);
		}
	};
	useEffect(() => {
		handleResponsive();
	}, [width]);

	// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

	// ChartJS.defaults.global.elements.line.tension = 10;
	const labels = dateArray;

	const options = {
		maintainAspectRatio: false,

		plugins: {
			legend: {
				display: false,
			},
			drawBorder: false,
			title: {
				display: true,
				text: "",
			},
		},

		layout: {
			padding: 10,
		},
		responsive: true,
		scales: {
			x: {
				stacked: true,
				grid: {
					display: false,
				},
			},
			y: {
				stacked: true,
				grid: {
					display: false,
				},
			},
		},
	};

	const data = {
		labels,
		datasets: [
			{
				label: "Topics",
				data: allData,
				backgroundColor: "#8BC38F",
				borderRadius: 10,
				barThickness: 10,
			},
			{
				label: "Practices",
				data: practicieData,
				backgroundColor: "#D2814B",
				borderRadius: 10,
				barThickness: 10,
			},
			{
				label: "Workshops",
				data: workshopData,
				backgroundColor: "#77C1D8",
				borderRadius: 10,
				barThickness: 10,
			},
			{
				label: "Assessments",
				data: assessmentData,
				backgroundColor: "#F7D8EB",
				borderRadius: 10,
				barThickness: 10,
			},
		],
	};

	// useEffect(() => {
	//     const viewSchedule = () => {
	//         learnConfig
	//             .get(`/schedules/view-schedule/`, {
	//                 headers: {
	//                     Authorization: `Bearer ${access_token}`,
	//                 },
	//             })
	//             .then((response) => {
	//                 const { StatusCode, data } = response.data;
	//                 if (StatusCode === 6000) {
	//                     setScheduleData(data);
	//                     setLoading(false);
	//                 } else {
	//                     setLoading(false);
	//                     setScheduleData(data);
	//                 }
	//             })
	//             .catch((error) => {
	//                 console.log(error);
	//                 setLoading(false);
	//             });
	//     };

	//     viewSchedule();
	// }, []);

	return (
		<Container>
			<TopSection>
				<GrafhContainer>
					<LabelSection>
						<Label color={"#8BC38F"}>
							<span></span>
							Topics
						</Label>
						<Label color={"#D2814B"}>
							<span></span>
							Practices
						</Label>{" "}
						<Label color={"#77C1D8"}>
							<span></span>
							Workshops
						</Label>{" "}
						<Label color={"#F7D8EB"}>
							<span></span>
							Assessments
						</Label>
					</LabelSection>
					<Bar data={data} options={options} id="canvas" />
					{/* <Chart type="bar" data={data} options={options} /> */}
				</GrafhContainer>
			</TopSection>
			{/* {render()} */}
		</Container>
	);
}

export default StudentLearningStatus;
const Container = styled.div``;
const TopSection = styled.div`
	width: 100%;
	justify-content: space-between;
	align-items: center;
`;
const LabelSection = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 20px;
	padding-bottom: 0;
	// flex-wrap: wrap;
	@media (max-width: 1080px) {
		flex-wrap: wrap;
	}
`;
const Label = styled.div`
	margin-left: 15px;
	display: flex;
	align-items: center;
	font-size: 13px;
	span {
		display: block;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: ${(props) => props.color};
		margin-right: 5px;
	}
`;

const GrafhContainer = styled.div`
	border: 1px solid #e4e4e4;
	border-radius: 5px;
	/* min-height: 250px; */
	@media all and (max-width: 980px) {
		/* min-height: 400px; */
	}

	@media all and (max-width: 480px) {
		/* min-height: 300px; */
	}
	& #canvas {
		height: 234px !important;
	}
`;
const Filter = styled.div`
	display: flex;
	justify-content: flex-end;
`;
const Year = styled.p``;
