import React from "react";
import styled from "styled-components";
import {
	getDateStrWithoutReplace,
	getUserTimeFromUTC,
	truncateString,
} from "../../../../helpers/functions";
import card from "../../../../../../src/assets/images/new_card.jpeg";
import html2canvas from "html2canvas";
import star_full from "../../../../../../src/assets/images/Star-full.svg";
import star_half from "../../../../../../src/assets/images/Star-half.svg";
import line from "../../../../../../src/assets/images/line.svg";

const download = function () {
	html2canvas(document.getElementById(`poster-${card}`), {
		scale: 8,
		useCORS: true, //By passing this option in function Cross origin images will be rendered properly in the downloaded version of the PDF
		ignoreElements: (element) => {
			if (element.tagName === "jpeg") {
				return true;
			}
			if (
				element.tagName === "jpeg" &&
				!element.className.includes(`poster-download-##`)
			) {
				return true;
			} else {
				return false;
			}
		},
	})
		.then((canvas) => {
			let link = document.createElement("a");
			link.download = `poster-${card}.jpeg`;
			link.href = canvas.toDataURL();
			link.click();
		})
		.catch((error) => {
			console.log(error, "err");
		});
};

const ActivityCard = ({ data }) => {
	const renderDownload = () => {
		let {
			is_need_uploading_file,
			activity_type,
			practice_file,
			practice_improvement_file,
		} = data;
		if (is_need_uploading_file === true) {
			return (
				<a
					href={
						activity_type === "practice_uploaded"
							? practice_file.practice_file
							: practice_improvement_file.improvement_file
					}
					download
					target="_blank"
					rel="noopener noreferrer"
				>
					<DownloadCard>
						{activity_type === "practice_uploaded"
							? truncateString("Download Practice", 20)
							: truncateString("Download File", 20)}
					</DownloadCard>
				</a>
			);
		} else {
			return null;
		}
	};
	return (
		<>
			<Container>
				<BottomCard>
					<Title
						style={{ color: data.color }}
						className={`${data.status}`}
					>
						{data.title}
					</Title>

					<Label>
						<Date>{getDateStrWithoutReplace(data.date_added)}</Date>
						<Time>{getUserTimeFromUTC(data.date_added)}</Time>
					</Label>
					{data.is_star_needed && (
						<ScoreContainer>
							<Score>
								<Stars>
									<Marks>{data.practice_score}</Marks>
									{data.practice_score ? (
										<>
											{[...Array(1)].map((i) => {
												return (
													<Star
														key={i}
														src={star_full}
														alt="Image"
													/>
												);
											})}
										</>
									) : (
										<>
											{/* <Marks>0</Marks> */}
											{/* <Star src={star_half} alt="Image" /> */}
										</>
									)}
								</Stars>
							</Score>
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
					{renderDownload()}
				</BottomCard>
			</Container>
		</>
	);
};

export default ActivityCard;
const Container = styled.div`
	padding-left: 30px;
	margin-left: 20px;
	padding-bottom: 15px;
	position: relative;
	border-left: 1px solid #e3e3e3;
	width: 100%;
	&:last-child {
		border-left: unset;
		border: none;
		::after {
			content: "";
			border-bottom: none;
		}
	}
	::after {
		content: "";
		border-bottom: 1px solid #e8e8e8;
		width: 80%;
		height: 5px;
		position: absolute;
	}
	@media all and (max-width: 1200px) {
		padding-left: 20px;
		margin-left: 15px;
	}
	@media all and (max-width: 980px) {
	}
`;

const Title = styled.h3`
	font-size: 14px;
	font-family: gordita_medium;
	@media all and (max-width: 980px) {
		font-size: 12px;
	}
`;
const DownloadCard = styled.span`
	font-size: 12px;
	font-weight: 600;
	text-decoration: underline;
	color: #0fa76f;
	display: inline-block;
	font-family: gordita_regular;
	letter-spacing: 1px;
	margin-top: 10px;
`;
const Label = styled.div`
	display: flex;
	align-items: center;
`;
const Date = styled.span`
	display: inline-block;
	font-family: gordita_regular;
	color: #707070;
	font-size: 14px;
	margin-right: 10px;
	@media all and (max-width: 980px) {
		font-size: 12px;
	}
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
	color: #707070;
	font-size: 14px;
	@media all and (max-width: 980px) {
		font-size: 12px;
	}
`;
const ScoreContainer = styled.div`
	/* border-bottom: 1px solid #e8e8e8; */
	/* padding-bottom: 20px; */
	width: 80%;
`;
const ScoreLabel = styled.span`
	display: inline-block;
	margin-right: 10px;
	font-size: 14px;
	color: #707070;
	@media all and (max-width: 980px) {
		font-size: 12px;
	}
`;
const StarRating = styled.span`
	text-align: center;
	display: inline-block;
	width: 80px;
	margin: 0 auto;
	padding: 4px 0 3px;
	background-color: #f7e735;
	color: #fff;
	font-size: 10px;
	border-radius: 30px;
	font-family: gordita_medium;
`;
const StarIcon = styled.i`
	display: inline-block;
	margin-right: 2px;
	font-size: 14px;
`;
const Stars = styled.div`
	display: flex;
	width: 16px;
	margin-left: 3px;
	align-items: center;
	justify-content: center;
	position: relative;

	@media all and (max-width: 980px) {
		width: 18px;
	}
`;
const Star = styled.img`
	width: 100%;
	display: block;
	margin-right: 5px;
	&:last-child {
		margin-right: 0;
	}
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
	top: -6px;
	left: -15px;
`;
const Icon = styled.i`
	font-size: 20px;
	margin: 0 auto;
`;
const TopCard = styled.div`
	padding: 12px;
	background: #e6f5f9;
	border-radius: 5px;
	margin-bottom: 30px;
`;
const H1 = styled.h1`
	font-size: 18px;
	margin-bottom: 5px;
`;
const DownloadButton = styled.button`
	margin: 0 auto;
	display: flex;
	font-size: 16px;
	align-items: center;
	background: #0fa76f;
	color: #fff;
	width: 100%;
	border-radius: 7px;
	padding: 10px 12px;
	justify-content: space-between;
	margin-bottom: 20px;
	@media all and (max-width: 1200px) {
		font-size: 14px;
		padding: 8px 20px;
		margin-bottom: 5px;
	}
	@media all and (max-width: 980px) {
		font-size: 10px;
		padding: 8px 11px;
		margin-bottom: 5px;
	}
`;
const ImgContainer = styled.div`
	background: #fff;
	padding: 3px 3px;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	@media all and (max-width: 1200px) {
		padding: 4px 0px;
	}
`;
const ArrowImg = styled.img`
	width: 100%;
	display: block;
	@media all and (max-width: 1200px) {
		width: 50%;
	}
`;
const Image = styled.img`
	width: 100%;
	display: block;
`;
const AssessmentCard = styled.div`
	width: 100%;
	margin-bottom: 30px;
`;
const BottomCard = styled.div``;
const Score = styled.div`
	margin-top: 10px;
`;
const Marks = styled.span`
	color: #dba665;
	font-size: 16px;
	padding-top: 7px;
	font-family: "gordita_medium";
	@media all and (max-width: 980px) {
		font-size: 16px;
	}
`;
