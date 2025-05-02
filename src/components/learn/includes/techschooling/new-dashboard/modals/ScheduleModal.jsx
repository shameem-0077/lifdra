import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import closeIcon from "../../../../../../assets/images/close_button.svg";
import line from "../../../../../../assets/images/bottom_line.svg";
import { useSelector } from "react-redux";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { TimePicker } from "@mui/lab";
// import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import TextField from "@mui/material/TextField";
import { learnConfig } from "../../../../../../axiosConfig";
import animationData from "../../../../../../assets/lotties/modal/successtick.json";
import { getUserTimeFromUTC } from "../../../../../helpers/functions";
import Lottie from "react-lottie";
import RequestLoader from "../../../authentication/general/RequestLoader";
function ScheduleModal({
	setModal,
	isModal,
	selectedId,
	setSelectedId,
	setModalclosed,
	setSelectedDay,
	selectedDay,
	days,
	sheduledEndTime,
	sheduledFromTime,
}) {
	const user_data = useSelector((state) => state.user_data);
	const access_token = user_data.access_token;
	const [isStartTime, setStartTime] = useState(false);
	const [isEndTime, setEndTime] = useState(false);
	const [startValue, setStartValue] = useState(new Date());
	const [value, setValue] = useState(new Date());

	let twentyMinutesLater = new Date();

	const [endValue, setEndValue] = useState(new Date());

	const [localStartTime, setLocalStartTime] = useState(new Date());
	const [localEndTime, setLocalEndTime] = useState(new Date());

	const [isLoading, setLoading] = useState(false);
	const [activeDay, setActiveDay] = useState(false);
	const [isError, setError] = useState(false);
	const [modalType, setModalType] = useState("");
	const daySelection = (item) => {
		setSelectedDay(item.day);
		!selectedId.includes(item.id)
			? setSelectedId([...selectedId, item.id])
			: setSelectedId(selectedId.filter((i) => i !== item.id));
	};
	useEffect(() => {
		setStartValue(
			selectedDay.from_time ? selectedDay.from_time : new Date()
		);
		setEndValue(
			selectedDay.to_time
				? selectedDay.to_time
				: new Date(
						twentyMinutesLater.setMinutes(
							twentyMinutesLater.getMinutes() + 30
						)
				  )
		);
	}, [selectedDay]);
	useEffect(() => {
		if (endValue || startValue) {
			if (startValue) {
				var start_ist = getUserTimeFromUTC(startValue);
				setLocalStartTime(start_ist);
			}
			if (endValue) {
				var end_ist = getUserTimeFromUTC(endValue);
				setLocalEndTime(end_ist);
			}
		}
	}, [startValue, endValue]);

	useEffect(() => {
		setError(false);
	}, [startValue, endValue]);
	const setSchedule = () => {
		setLoading(true);
		if (
			localStartTime != localEndTime &&
			localStartTime < localEndTime
		) {
			learnConfig
				.post(
					`/schedules/set-schedule/`,
					{
						day: selectedDay.day,
						from_time: startValue,
						to_time: endValue,
					},
					{
						headers: {
							Authorization: `Bearer ${access_token}`,
						},
					}
				)
				.then((response) => {
					const { StatusCode, data } = response.data;

					if (StatusCode === 6000) {
						setLoading(false);
						setModalType("success");
						// setSuccess(true);
					} else if (StatusCode === 6001) {
						setLoading(false);
						setError(true);
					}
				})
				.catch((error) => {
					console.log(error);
					setLoading(false);
				});
		} else {
			setError(true);
			setLoading(true);
		}
	};
	function useOutsideAlerter(ref) {
		useEffect(() => {
			function handleClickOutside(event) {
				if (
					ref.current &&
					!ref.current.contains(event.target)
				) {
					setModal(false);
				}
			}
			document.addEventListener(
				"mousedown",
				handleClickOutside
			);
			return () => {
				document.removeEventListener(
					"mousedown",
					handleClickOutside
				);
			};
		}, [ref]);
	}

	const sheduleRef = useRef(null);
	useOutsideAlerter(sheduleRef);

	const clearTempSelection = (type, value) => {
		if (type === "isModal") {
			days = days.filter((day) => day !== value);
			days.forEach((day) => (day.is_scheduled_temp = false));
		} else {
			days.forEach((day) => (day.is_scheduled_temp = false));
		}
	};
	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {},
	};

	return (
		<BackContainer isModal={isModal}>
			{modalType === "success" ? (
				<SucessModal>
					<SuccesCard>
						<SuccessIcon>
							<Lottie
								options={defaultOptions}
								height={"100%"}
								width={"100%"}
							/>
						</SuccessIcon>
						<SuccessTitle>Success</SuccessTitle>
						<SuccessLabel>
							Successfully created
						</SuccessLabel>
						<ContinueButton
							onClick={() => {
								setModal(false);
								setModalclosed(true);
								setModalType("");
								setStartValue(new Date());
								setEndValue(new Date());
							}}
						>
							Continue
						</ContinueButton>
					</SuccesCard>
				</SucessModal>
			) : (
				<Modal isModal={isModal}>
					<Container>
						<Title>Set your schedule</Title>
						<CloseIconContainer
							onClick={() => {
								setModal((prev) => !prev);
								clearTempSelection();
							}}
						>
							<CloseIcon
								src={closeIcon}
								alt="close icon"
							/>
						</CloseIconContainer>
						<Description>
							You're more likely to reach your goal if
							you dedicate some time in your schedule
							for learnig. Choose the day that works for
							you.
						</Description>
						<DaysList>
							{days.map((data, i) => (
								<Day
									key={i}
									onClick={() => {
										daySelection(data);
										setSelectedDay(data);
										data.is_scheduled_temp = true;
										clearTempSelection(
											"isModal",
											data
										);
									}}
									className={
										data.is_scheduled ||
										data.is_scheduled_temp ||
										selectedDay.day === data.day
											? "active"
											: ""
									}
								>
									{data.day.substring(0, 2)}
								</Day>
							))}
						</DaysList>
						<TimeTable>
							<TimeContainer>
								<LocalizationProvider
									dateAdapter={AdapterDateFns}
								>
									<TimePicker
										label="Start Time"
										value={startValue}
										onChange={(newValue) => {
											setStartValue(
												newValue.toISOString()
											);
											setStartTime(true);
										}}
										renderInput={(params) => (
											<TextField {...params} />
										)}
									/>
								</LocalizationProvider>
							</TimeContainer>
							<Span>to</Span>
							<TimeContainer>
								<LocalizationProvider
									dateAdapter={AdapterDateFns}
								>
									<TimePicker
										label="End Time"
										value={endValue}
										onChange={(newValue) => {
											setEndValue(
												newValue.toISOString()
											);
											setEndTime(true);
										}}
										renderInput={(params) => (
											<TextField {...params} />
										)}
									/>
								</LocalizationProvider>
							</TimeContainer>
							{isError && (
								<ErrorMsg>
									{localStartTime ===
										localEndTime ||
									localStartTime > localEndTime
										? "End time should be higher than start time"
										: "Something went wrong"}
								</ErrorMsg>
							)}
						</TimeTable>
						<ButtonsContainer>
							<Button
								onClick={() => {
									setModal((prev) => !prev);
									setSelectedId([]);
								}}
							>
								Cancel
							</Button>
							<Button
								className="submit"
								onClick={() =>
									!isLoading && setSchedule()
								}
							>
								{isLoading ? (
									<RequestLoader />
								) : (
									"Submit"
								)}
							</Button>
						</ButtonsContainer>
						<LineContainer>
							<BottomLine
								src={line}
								alt="bottom line"
							/>
						</LineContainer>
					</Container>{" "}
				</Modal>
			)}
		</BackContainer>
	);
}

export default ScheduleModal;

const BackContainer = styled.div`
	position: fixed;
	transition: 0.3s;
	/* transform: scale(0, 0); */
	width: 100%;
	height: 100%;
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
	left: 0;
	top: 0px;
	display: ${({ isModal }) => (isModal ? "flex" : "none")};
	background: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(4px);
`;
const Overlay = styled.div`
	position: fixed;
	left: 0;
	top: 0px;
	width: 100%;
	height: 100%;
`;
const Modal = styled.div`
	width: 550px;
	max-height: 90vh;
	overflow: hidden;
	background: #fff;
	background-position: center;
	transform: ${({ isModal }) =>
		isModal ? "scale(1,1)" : "scale(0,0)"};
	transition-delay: 0.8s;
	transition: all 0.4s ease;
	/* left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute; */

	padding: 30px;
	border-radius: 5px;
	transition: 0.5s;
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	@media all and (max-width: 980px) {
		width: 500px;
	}
	@media all and (max-width: 768px) {
		width: 450px;
	}
	@media all and (max-width: 640px) {
		width: 400px;
	}
	@media all and (max-width: 480px) {
		width: 355px;
		padding: 30px 15px;
	}
	@media all and (max-width: 360px) {
		width: 300px;
	}
	position: relative;
`;
const Container = styled.div``;
const ErrorMsg = styled.h5`
	color: red;
	position: absolute;
	bottom: -20px;
	font-family: gordita_regular;
	font-size: 13px;
	left: 0;
`;
const Title = styled.h4`
	font-family: "gordita_medium";
	color: #484848;
	font-size: 20px;
	padding-bottom: 20px;
	border-bottom: 1px solid #70707040;
`;
const CloseIconContainer = styled.span`
	display: block;
	width: 16px;
	position: absolute;
	cursor: pointer;
	top: 40px;
	right: 40px;
	@media all and (max-width: 480px) {
		top: 25px;
		right: 25px;
	}
`;
const CloseIcon = styled.img`
	width: 100%;
	display: block;
`;
const Description = styled.p`
	font-family: "gordita_regular";
	max-width: 90%;
	margin-top: 20px;
	color: #57656b;
	font-size: 14px;
	@media all and (max-width: 480px) {
		font-size: 12px;
	}
`;
const DaysList = styled.ul`
	margin-top: 15px;
	display: flex;
	align-items: center;
`;
const Day = styled.li`
	width: 40px;
	height: 40px;
	min-width: 40px;
	min-height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	border: 1px solid #dddddd;
	font-family: "gordita_medium";
	font-size: 14px;
	color: #515b63;
	margin-right: 8px;
	cursor: pointer;
	text-transform: capitalize;
	&:last-child {
		margin-right: 0px;
	}
	/* &.selected {
		border: 1px solid #08bd80;
		background: #08bd80;
		color: #fff;
	} */
	&.active {
		border: 1px solid #3fbd7f;
		background-color: #3fbd7f;
		color: #fff;
	}
	@media all and (max-width: 480px) {
		font-size: 12px;
		margin-right: 5px;
		width: 35px;
		height: 35px;
		min-width: 35px;
		min-height: 35px;
	}
	@media all and (max-width: 360px) {
		margin-right: 3px;
		width: 32px;
		height: 32px;
		min-width: 32px;
		min-height: 32px;
	}
`;
const TimeTable = styled.div`
	margin-top: 23px;
	display: flex;
	align-items: center;
	position: relative;
`;
const TimeContainer = styled.div`
	width: 140px;
	color: #57656b;
	height: 40px;
	border-radius: 4px;
	font-family: "gordita_medium";
	font-size: 14px;
	display: flex;
	justify-content: center;
	align-items: center;
	.MuiInputBase-input {
		opacity: 1 !important;
		padding: 0 10px;
	}
	.css-92nr1f-MuiButtonBase-root-MuiIconButton-root {
		background-color: #3fbd7f !important;
	}
	.css-1s220mh-MuiButtonBase-root-MuiIconButton-root {
		background-color: #3fbd7f !important;
	}
	.css-1jm66jt-MuiClockPicker-root.css-118whkv {
		border: 16px solid #3fbd7f !important;
	}
`;
const Span = styled.span`
	margin: 0 10px;
	font-family: "gordita_medium";
	font-size: 14px;
`;
const ButtonsContainer = styled.div`
	margin: 40px 0 20px;
	display: flex;
	justify-content: end;
`;
const Button = styled.span`
	display: inline-block;
	width: 130px;
	height: 40px;
	color: #57656b;
	height: 40px;
	border: 1px solid #57656b;
	border-radius: 4px;
	font-family: "gordita_medium";
	font-size: 14px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 20px;
	cursor: pointer;
	&.submit {
		margin-right: 0px;
		color: #fff;
		border: 1px solid #08bd80;
		background: #08bd80;
	}
`;
const LineContainer = styled.span`
	display: block;
	position: absolute;
	bottom: 0;
	left: 0;
`;
const BottomLine = styled.img`
	display: block;
	width: 100%;
`;
const SucessModal = styled.div`
	width: 450px;
	max-height: 80vh;
	min-height: 300px;
	margin: 0 auto;
	background: #fff;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	position: absolute;
	border-radius: 10px;
	transition: 0.5s;
	z-index: 1003;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	@media all and (max-width: 480px) {
		width: 330px;
		min-height: 300px;
	}
	@media all and (max-width: 360px) {
		width: 300px;
	}
`;

const SuccesCard = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	padding: 20px;
`;
const SuccessIcon = styled.div`
	width: 150px;
	height: 150px;
	border-radius: 50%;
	box-shadow: 0 16px 24px rgb(0 0 0 / 10%);
	margin: 0 auto;
	background-color: #fff;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	top: -80px;
	margin: 0 auto;
	@media all and (max-width: 480px) {
		width: 100px;
		height: 100px;
		top: -65px;
	}
`;
const SuccessTitle = styled.h3`
	text-align: center;
	font-size: 34px;
	/* font-family: "baloo_paaji_2semibold"; */
	font-family: gordita_medium;
	margin-top: 60px;
	width: 100%;
	@media all and (max-width: 480px) {
		font-size: 26px;
		margin-top: 30px;
	}
`;
const SuccessLabel = styled.p`
	font-size: 18px;
	text-align: center;
	/* font-family: "gordita_medium"; */
	font-family: gordita_medium;
	color: #3c4852;
	max-width: 350px;
	max-width: 420px;
	@media all and (max-width: 480px) {
		font-size: 16px;
	}
`;
const ContinueButton = styled.span`
	width: 100%;
	height: 50px;
	background-color: #4ba870;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	/* font-family: "baloo_paaji_2semibold"; */
	font-family: gordita_medium;
	margin-top: 30px;
	border-radius: 5px;
	font-size: 20px;
	cursor: pointer;
`;
