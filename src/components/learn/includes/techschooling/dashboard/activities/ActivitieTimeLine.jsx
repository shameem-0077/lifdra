import React from "react";
import styled from "styled-components";
import icon from "../../../../../../assets/images/notfound.png";
import Loader from "../../general/loaders/Loader";

function ActivitieTimeLine({
	date,
	activities,
	clickedDate,
	currentDate,
	currentMonth,
	clickedMonth,
	isLoading,
}) {
	// Time Convertion
	const DisplayCurrentTime = (data) => {
		let date = new window.Date(data);
		let hours =
			date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
		let am_pm = date.getHours() >= 12 ? "pm" : "am";
		hours = hours < 10 ? "0" + hours : hours;
		const minutes =
			date.getMinutes() < 10
				? "0" + date.getMinutes()
				: date.getMinutes();

		const time = hours + ":" + minutes + " " + am_pm;
		return time;
	};
	const renderMappedData = (data) => {
		return (
			<>
				{isLoading ? (
					<LoaderContainer>
						<Loader />
					</LoaderContainer>
				) : (
					<ActivitiesCard key={data.id}>
						<LeftSection>
							<ActivityTitle>
								{data.reference_item_name}
							</ActivityTitle>

							<Course>{data.subject_name}</Course>
							<BottomSection>
								<Status status={data.activity_title}>
									<Icon>
										{data?.activity_title ===
											"Topic mark as complete" ||
										"Assessment regular complete" ||
										"Practice regular complete" ? (
											<img
												src={require("../../../../../../assets/images/calender/completed.svg")}
												alt="Icon"
											/>
										) : null}
									</Icon>
									<Text status={data.status}>
										{data.activity_title ===
											"Topic mark as complete" ||
										"Assessment regular complete" ||
										"Practice regular complete"
											? "Completed"
											: null}
									</Text>
								</Status>
								{/* <Link >
				  <img
					src={require("../../../../../../assets/images/calender/forward.svg")}
					alt="icon"
				  />
				</Link> */}
							</BottomSection>
						</LeftSection>
						<Time>{DisplayCurrentTime(data.activity_time)}</Time>
						<Ellipse></Ellipse>
					</ActivitiesCard>
				)}
			</>
		);
	};

	const renderDate = (date) => {
		if (clickedMonth > currentMonth) {
			return null;
		} else if (clickedMonth === currentMonth) {
			if (clickedDate <= currentDate) return <Date>{date}</Date>;
		} else {
			return <Date>{date}</Date>;
		}
	};

	return (
		<Container>
			<TopSection>
				<Title>Timeline</Title>

				{renderDate(date)}
			</TopSection>
			{clickedDate === undefined &&
			clickedMonth === undefined &&
			activities.length > 0 ? (
				<ActivitySection>
					{activities?.map((data) => renderMappedData(data))}
				</ActivitySection>
			) : currentDate >= clickedDate &&
			  currentMonth >= clickedMonth &&
			  activities.length > 0 ? (
				<ActivitySection>
					{activities?.map((data) => renderMappedData(data))}
				</ActivitySection>
			) : isLoading ? (
				<LoaderContainer>
					<Loader />
				</LoaderContainer>
			) : (
				<Error>
					<Img src={icon} alt="image" />
					No Activities Found
					<Para>You have no activities </Para>
				</Error>
			)}
		</Container>
	);
}

export default ActivitieTimeLine;
const LoaderContainer = styled.div`
	margin: 0 auto;
	width: 70px !important;
	height: 67vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Container = styled.div`
	overflow-y: hidden;
	padding: 45px 20px 33px;
	background: #f9f9fb;
	height: 92vh;
	animation: fade 300ms ease-in-out 0ms;
`;
const TopSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 15px;
	border-bottom: 1px solid #ddd;
`;
const Title = styled.h3`
	font-family: "gordita_medium";
	font-size: 18px;
	@media all and (max-width: 480px) {
		font-size: 16px;
	}
`;
const Date = styled.p`
	color: #0fa76f;
	font-family: "gordita_medium";
	font-size: 14px;
	@media all and (max-width: 480px) {
		font-size: 13px;
	}
`;
const ActivitySection = styled.div`
	padding: 20px 0px 20px 10px;
	max-height: calc(100vh - 180px);
	overflow-y: scroll;
	overflow-x: visible;
	position: relative;
	animation: fade 300ms ease-in-out 0ms;
	@media all and (max-width: 480px) {
		padding: 20px 0px 20px 12px;
	}
	&::-webkit-scrollbar {
		width: 5px;
		margin-left: 10px;
		border: none;
	}
	&::-webkit-scrollbar-track {
		background: transparent;
	}
	&::-webkit-scrollbar-thumb {
		background: #4ba870;
		border-radius: 3px;
	}
`;
const ActivitiesCard = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding-left: 12px;
	position: relative;
	padding-bottom: 30px;
	&:last-child {
		border-left: none;
		&::before {
			border-left: none;
		}
	}
	&::before {
		content: "";
		border-left: 2px dashed #b6ccfa;
		position: absolute;
		top: 1px;
		left: -2px;
		height: 116px;
		@media all and (max-width: 768px) {
			top: 6px;
			left: -3px;
			height: 107px;
		}
	}
`;
const Error = styled.div`
	/* margin-bottom: 11px; */
	text-align: center;
	font-size: 17px;
	font-family: "gordita_medium";
	animation: fade 300ms ease-in-out 0ms;
`;
const Para = styled.p`
	text-align: center;
	font-size: 14px;
	margin-top: 10px;
	display: block;
`;
const Img = styled.img`
	display: block;
	width: 100%;
	margin-top: 100px;
`;
const LeftSection = styled.div`
	width: 72%;

	/* margin-right: 20px; */
	/* @media all and (max-width: 320px) {
		margin-right: 15px;
	} */
`;
const ActivityTitle = styled.h3`
	font-size: 15px;
	font-family: "gordita_medium";
	color: #4b535c;
	word-break: break-word;
	@media all and (max-width: 480px) {
		font-size: 14px;
	}
`;
const Course = styled.p`
	font-size: 13px;
	font-family: "gordita_regular";
	color: #4b535c;
	@media all and (max-width: 480px) {
		font-size: 12px;
	}
`;
const Status = styled.span`
	background-color: ${(props) =>
		props.status === "Topic mark as complete"
			? "#b6ccfa"
			: props.status === "Practice regular complete"
			? "#b1f6cb"
			: props.status === "Workshop mark as complete"
			? "#f7eabd"
			: props.status === "Assessment regular complete"
			? "#afe3de"
			: props.status === "null"
			? "#b6ccfa"
			: null};
	display: block;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
	padding: 6px 10px;
`;
const Icon = styled.span`
	width: 15px;
	height: 15px;
	display: block;
	img {
		width: 100%;
		display: block;
	}
`;
const Time = styled.span`
	font-size: 13px;
	font-family: "gordita_regular";
	@media all and (max-width: 480px) {
		font-size: 12px;
	}
`;
const Ellipse = styled.span`
	display: block;
	width: 15px;
	height: 15px;
	background-color: #0fa76f;
	border-radius: 50%;
	position: absolute;
	top: 1px;
	left: -8px;
	@media all and (max-width: 480px) {
		width: 13px;
		height: 13px;
		top: 1px;
		left: -8px;
	}
`;
const Text = styled.span`
	font-size: 13px;
	font-family: gordita_medium;
	color: ${(props) =>
		props.status === "completed"
			? "#4aa776;"
			: props.status === "No data"
			? "#4c86f7"
			: null};
	padding-top: 2px;
	margin-left: 5px;
	text-transform: capitalize;
`;
const BottomSection = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;
const Link = styled.span`
	width: 30px;
	height: 30px;
	border: 2px solid #b7e0d3;
	border-radius: 5px;
	margin-left: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	img {
		width: 12px;
		display: block;
	}
`;
