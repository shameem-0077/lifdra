import React from "react";
import styled from "styled-components";
// import Lock from "../../../../../assets/images/Lock.svg";

const UpcomingCard = ({ data, card_type }) => {
	return (
		<UpcomingThumnailContainer className="anim-fade">
			<ImageContainer>
				<Image src={data.image} />
				{/* <Lock className="sc-fjmCvl fWfgbU las la-lock"></Lock> */}
				{/* <Lock_img src={Lock} alt="Lock" /> */}
				<HighLight>
					#
					{card_type === "assessment" &&
					data.auto_id < 10 ? (
						<>0{data.auto_id}</>
					) : card_type === "assessment" &&
					  data.auto_id > 10 ? (
						<>{data.auto_id}</>
					) : card_type !== "assessment" &&
					  data.order_id < 10 ? (
						<>0{data.order_id}</>
					) : (
						<>{data.order_id}</>
					)}
				</HighLight>{" "}
			</ImageContainer>
			<ContentArea>
				<ContentTitle>{data.title}</ContentTitle>
				<PraticeLabel>
					{/* <Icon>
						<Layer className="las la-layer-group"></Layer>
					</Icon> */}
					<Label>{data.designation}</Label>
				</PraticeLabel>
				{/* <Duration>
                    <ClockIcon>
                        <Clock className="las la-clock"></Clock>
                    </ClockIcon>
                    <ClockLabel>3 min 30 sec</ClockLabel>
                </Duration> */}
			</ContentArea>
			{/* <Lock className="sc-fjmCvl fWfgbU las la-lock"></Lock> */}
		</UpcomingThumnailContainer>
	);
};

export default UpcomingCard;
const UpcomingThumnailContainer = styled.div`
	position: relative;
	background-color: #f9f9fb;
	margin-right: 10px;
	padding: 15px;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-items: center;
	width: 31%;
	margin-right: 15px;
	cursor: not-allowed;
	&:last-child {
		margin-bottom: none;
		margin-right: 0;
	}
	@media all and (max-width: 1280px) {
		width: 47%;
	}
	@media all and (max-width: 1020px) {
		width: 31%;
	}
	@media all and (max-width: 640px) {
		width: 48%;
		margin-bottom: 20px;
	}
	@media all and (max-width: 480px) {
		width: 100%;
	}
`;
const ImageContainer = styled.div`
	width: 100%;
	/* min-width: 200px; */
	border-radius: 5px;
	overflow: hidden;
	margin-bottom: 10px;
	position: relative;
	@media all and (max-width: 1280px) {
		width: 100%;
		min-width: 0;
	}
	@media all and (max-width: 640px) {
		width: 100%;
		margin-right: 0;
		margin-bottom: 20px;
	}
`;
const Image = styled.img`
	display: block;
	width: 100%;
`;
const ContentArea = styled.div`
	width: 100%;
	@media all and (max-width: 640px) {
		width: 100%;
	}
`;
const ContentTitle = styled.h3`
	font-family: gordita_medium;
	font-size: 14px;
	max-width: 100%;
`;
const HighLight = styled.span`
	display: flex;
	color: #41ae76;
	font-family: gordita_medium;
	/* margin-bottom: 5px; */
	text-align: left;
	margin-top: 10px;
`;
const PraticeLabel = styled.div`
	display: flex;
	align-items: center;
	margin-top: 5px;
	@media all and (max-width: 640px) {
		margin-top: 10px;
	}
`;
const Label = styled.span`
	display: block;
	color: #a8a8a8;
	font-family: gordita_regular;
	font-size: 13px;
`;
const Icon = styled.small`
	display: inline-block;
	color: #a8a8a8;
	margin-right: 5px;
`;
const Layer = styled.i`
	font-size: 20px;
	display: inline-block;
`;
const Lock_img = styled.img`
	position: absolute;
	left: 50%;
	transform: translate(-50%, -50%);
	top: 50%;
	background: #fff;
	border-radius: 50%;
	padding: 10px;
	color: #5fd18a;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;
// const Lock = styled.i`
// 	position: absolute;
// 	left: 50%;
// 	transform: translate(-50%, -50%);
// 	top: 50%;
// 	background: #fff;
// 	border-radius: 50%;
// 	padding: 10px;
// 	color: #5fd18a;
// 	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
// `;
