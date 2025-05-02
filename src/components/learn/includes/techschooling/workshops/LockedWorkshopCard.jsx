import React from "react";
import styled from "styled-components";
import { secondsTohm } from "../../../../helpers/functions";
// import Lock from "../../../../../assets/images/Lock.svg";

const LockedWorkShopCard = ({ data }) => {
	return (
		<LockedWorkShopCardContent className="anim-fade">
			<LockedCardImgContainer>
				<LockedCardImg src={data.image} alt="Image" />
				{/* <Lock_img src={Lock} alt="Lock" /> */}
			</LockedCardImgContainer>
			<LockedCardContent>
				{/* <LockImgConSpan className="las la-lock"></LockImgConSpan> */}
				<LockedContentSide>
					<LockedContentSpan>
						#{data.auto_id}
					</LockedContentSpan>
					<MidSpan>|</MidSpan>
					{data.title}
				</LockedContentSide>
				<LockedCardContentAssets>
					<LockedCardContentAsset>
						<Icon className="las la-layer-group"></Icon>
						<IconContent>{data.designation}</IconContent>
					</LockedCardContentAsset>
					<LockedCardContentAsset>
						<Icon className="las la-play-circle"></Icon>
						<IconContent>
							{data.topics === 1
								? "1 Topic"
								: `${data.topics} Topics`}
						</IconContent>
					</LockedCardContentAsset>
					<LockedCardContentAsset>
						{/* <Icon className="las la-play-circle"></Icon>
                        <IconContent>{secondsTohm(data.duration)}</IconContent> */}
					</LockedCardContentAsset>
				</LockedCardContentAssets>
			</LockedCardContent>
		</LockedWorkShopCardContent>
	);
};
const LockedWorkShopCardContent = styled.div`
	opacity: 0.8;
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
	cursor: not-allowed;
	&:first-child {
		margin-top: 0;
	}
	&:last-child {
		margin-right: 0;
	}
	@media all and (max-width: 1280px) {
		width: 48%;
		margin: 0px;
	}
	@media all and (max-width: 980px) {
		width: 31%;
	}
	@media all and (max-width: 640px) {
		flex-wrap: wrap;
		width: 48%;
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 30px;
		}
	}
	@media all and (max-width: 480px) {
		width: 100%;
	}
	@media all and (max-width: 361px) {
		padding: 12px;
	}
`;
const LockedCardImgContainer = styled.div`
	width: 100%;
	/* min-width: 200px; */
	border-radius: 5px;
	overflow: hidden;
	/* margin-bottom: 10px; */
	position: relative;
	@media all and (max-width: 640px) {
		width: 100%;
	}
`;
const LockedCardImg = styled.img`
	width: 100%;
	display: block;
`;
const LockImgConSpan = styled.i`
	position: absolute;
	font-size: 23px;
	right: 30px;
	top: 20px;
	@media all and (max-width: 1550px) {
		top: unset;
		bottom: 30px;
	}
	@media all and (max-width: 1280px) {
		bottom: 20px;
	}
`;
const LockedCardContent = styled.div`
	margin-top: 12px;
	width: 100%;
`;
const LockedContentSide = styled.h3`
	color: #1e4e52;
	font-size: 14px;
	width: 100%;
	font-family: gordita_medium;
	@media all and (max-width: 640px) {
		line-height: 1.5rem;
	}
`;
const LockedContentSpan = styled.span`
	color: #49b27c;
	font-family: gordita_medium;
	font-size: 14px;
`;
const MidSpan = styled.span`
	color: #333333;
	font-family: "gordita_medium";
	font-size: 18px;
	margin: 0 5px;
`;
const LockedCardContentAssets = styled.ul`
	display: flex;
	align-items: center;
	margin-top: 20px;
	@media all and (max-width: 1550px) {
		flex-direction: column;
		align-items: flex-start;
		margin-top: 8px;
	}
	@media all and (max-width: 1280px) {
		display: flex;
		flex-direction: column;
	}
`;
const LockedCardContentAsset = styled.li`
	color: #9b9b9b;
	margin-right: 20px;
	display: flex;
	align-items: center;
	@media all and (max-width: 1280px) {
		margin-right: 8px;
	}
`;
const Icon = styled.i`
	color: #9b9b9b;
	font-size: 18px;
	margin-right: 5px;
	display: flex;
	align-items: center;
`;
const IconContent = styled.span`
	font-size: 13px;
	font-family: gordita_regular;
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
export default LockedWorkShopCard;
