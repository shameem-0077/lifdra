import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SupportEngineerContext } from "../../../contexts/stores/SupportEngineerStore";

const SupportTopBanner = (props) => {
	const { supportEngineerDispatch } = useContext(
		SupportEngineerContext
	);
	return (
		<Container background={props.background} type={props.type}>
			<ContentSection>
				<Title>Have a doubt?</Title>
				<Description>
					A Support Engineer will be available for you to
					clear your queries
				</Description>
				{props.type ? (
					<ProceedButtom
						to="#"
						type={props.type}
						onClick={() =>
							supportEngineerDispatch({
								type: "UPDATE_MODAL",
								modal_type: "start_chat",
								is_modal: true,
							})
						}
					>
						<Left>
							<ButtonTitle color={props.color}>
								Proceed with {props.item}
							</ButtonTitle>
							<CoinsCount color={props.color}>
								You have {props.coin} {props.item}
							</CoinsCount>
						</Left>
						<Right>
							<Arrow
								src={props.image}
								alt="Arrow icon"
							/>
						</Right>
					</ProceedButtom>
				) : (
					<PurchaseCoinSection>
						<Warning>
							<Icon className="las la-exclamation-circle"></Icon>
							<WarningDescription>
								You don't have any support credits or
								premium coins left in your account{" "}
							</WarningDescription>
						</Warning>
						<Credits>
							<SupportCredit to="packages/">
								<SupportButtonTitle>
									Purchase Support Credits
								</SupportButtonTitle>
								<ArrowContainer>
									<Arrow
										src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/explore-white-arrow.svg"
										alt="Arrow icon"
									/>
								</ArrowContainer>
							</SupportCredit>
							<Space> Or </Space>
							<PremiumCoins
								onClick={() =>
									supportEngineerDispatch({
										type: "UPDATE_MODAL",
										modal_type: "coin",
										is_modal: true,
									})
								}
							>
								<PremiumButtomTitle>
									Purchase Premium Coins
								</PremiumButtomTitle>
								<ArrowContainer>
									<Arrow
										src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp-images/premium-arrow.svg"
										alt="Arrow icon"
									/>
								</ArrowContainer>
							</PremiumCoins>
						</Credits>
					</PurchaseCoinSection>
				)}
			</ContentSection>
			<ImageSection type={props.type}>
				<SupportImage
					src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp-images/background_image.svg"
					alt="Section image"
				/>
			</ImageSection>
		</Container>
	);
};

export default SupportTopBanner;

const Container = styled.div`
	padding: 50px 30px;
	display: grid;
	grid-template-columns: ${(props) =>
		props.type ? "5fr 4fr" : "5fr 3fr"};
	background-color: ${(props) => props.background};
	align-items: center;
	@media all and (max-width: 1120px) {
		grid-template-columns: ${(props) =>
			props.type ? " 5fr 4fr " : "1fr"};
	}
	@media all and (max-width: 768px) {
		grid-template-columns: 1fr;
	}
	@media all and (max-width: 440px) {
		grid-template-columns: 1fr;
		box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
		padding: 30px 15px;
	}
	@media all and (max-width: 360px) {
	}
`;
const ContentSection = styled.div``;
const Title = styled.h2`
	font-family: "gordita_medium";
	margin-bottom: 10px;
	font-size: 30px;
	color: #333333;
	@media all and (max-width: 440px) {
		font-size: 26px;
		margin-bottom: 0px;
	}
`;
const Description = styled.p`
	max-width: 80%;
	font-size: 20px;
	font-family: "gordita_medium";
	line-height: 29px;
	margin-bottom: 20px;
	@media all and (max-width: 768px) {
		margin-bottom: 15px;
		max-width: 100%;
	}
	@media all and (max-width: 440px) {
		font-size: 16px;
		margin-bottom: 10px;
		line-height: unset;
	}
	@media all and (max-width: 360px) {
		font-size: 15px;
		margin-bottom: 10px;
		line-height: unset;
	}
`;
const ProceedButtom = styled(Link)`
	width: 290px;
	height: 65px;
	padding: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: ${(props) =>
			props.type === "support"
				? "transparent linear-gradient(90deg, #15BF81 0%, #10FCA6 100%) 0% 0% no-repeat padding-box;"
				: props.type === "premium"
				? "transparent linear-gradient(90deg, #F3E030 0%, #F6F0BA 100%) 0% 0% no-repeat padding-box;"
				: "none "}
		transparent linear-gradient(90deg, #15bf81 0%, #10fca6 100%)
		0% 0% no-repeat padding-box;
	border-radius: 4px;
	@media all and (max-width: 440px) {
		width: 100%;
	}
`;
const Left = styled.div``;
const ButtonTitle = styled.h3`
	font-size: 16px;
	color: ${(props) => props.color};
	font-family: "baloo_paaji_2semibold";
	@media all and (max-width: 360px) {
		font-size: 14px;
	}
`;
const CoinsCount = styled.p`
	font-size: 13px;
	color: ${(props) => props.color};
	line-height: 10px;
	@media all and (max-width: 360px) {
		font-size: 12px;
	}
`;
const Right = styled.div``;
const Arrow = styled.img``;
const ImageSection = styled.div`
	padding-right: 70px;
	@media all and (max-width: 1120px) {
		display: ${(props) => (props.type ? "inline-block" : "none")};
	}
	@media all and (max-width: 768px) {
		display: none;
	}
`;
const SupportImage = styled.img`
	display: block;
	width: 100%;
`;

const PurchaseCoinSection = styled.div`
	margin-right: 30px;
	@media all and (max-width: 768px) {
		margin-right: 0px;
	}
`;
const Credits = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	@media all and (max-width: 1200px) {
		justify-content: flex-start;
	}
	@media all and (max-width: 768px) {
		flex-wrap: wrap;
		justify-content: center;
	}
`;
const SupportCredit = styled(Link)`
	background: transparent
		linear-gradient(90deg, #15bf81 0%, #10fca6 100%) 0% 0%
		no-repeat padding-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 45%;
	height: 60px;
	padding: 0 20px;
	@media all and (max-width: 768px) {
		width: 100%;
		/* max-width: 300px; */
		margin-bottom: 10px;
	}
	@media all and (max-width: 360px) {
		height: 50px;
	}
`;
const PremiumCoins = styled.span`
	background: transparent
		linear-gradient(90deg, #f3e030 0%, #f6f0ba 100%) 0% 0%
		no-repeat padding-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 45%;
	height: 60px;
	cursor: pointer;
	padding: 0 20px;
	@media all and (max-width: 768px) {
		width: 100%;
		/* max-width: 300px; */
		margin-top: 10px;
	}
	@media all and (max-width: 360px) {
		height: 50px;
	}
`;
const SupportButtonTitle = styled.h3`
	color: #fff;
	font-size: 16px;
	font-family: "baloo_paaji_2semibold";
`;
const PremiumButtomTitle = styled.h3`
	color: #746219;
	font-size: 16px;
	font-family: "baloo_paaji_2semibold";
`;

const ArrowContainer = styled.div``;
const Space = styled.h3`
	font-size: 16px;
	font-family: "baloo_paaji_2semibold";
	color: #433e2c;
	padding: 0 15px;
	@media all and (max-width: 768px) {
		width: 100%;
		/* max-width: 300px; */
		text-align: center;
	}
`;
const Warning = styled.div`
	display: flex;
	align-content: center;
	justify-content: flex-start;
	margin-bottom: 10px;
`;
const Icon = styled.span`
	margin-right: 7px;
	color: #f93226db;
	font-size: 22px;
`;
const WarningDescription = styled.p`
	color: #f93226db;
	font-size: 14px;
	margin-top: 2px;
	font-family: "gordita_medium";
	@media all and (max-width: 360px) {
		font-size: 12px;
	}
`;
