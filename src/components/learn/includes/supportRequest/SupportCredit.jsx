import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SupportEngineerContext } from "../../../contexts/stores/SupportEngineerStore";

const SupportCredit = (props) => {
	const { supportEngineerDispatch } = useContext(
		SupportEngineerContext
	);

	return (
		<Container background={props.background} type={props.type}>
			<SupportToken>
				<Coins>
					<CoinContainer>
						<CoinImage src={props.image} alt="Coin" />
					</CoinContainer>
				</Coins>

				<PurchaseSection>
					<Title>{props.item}</Title>
					<Count>
						{props.coinCount > 0 ? props.coinCount : 0}
					</Count>
					{props.type === "token" ? (
						<Label>
							Specially used for support requests
						</Label>
					) : (
						<Label>
							Coins for initializing support requests
						</Label>
					)}
					{props.type === "token" ? (
						<Button
							to={props.link}
							type={props.type}
							color={props.color}
						>
							Purchase Now
						</Button>
					) : (
						<Button
							type={props.type}
							color={props.color}
							onClick={() =>
								supportEngineerDispatch({
									type: "UPDATE_MODAL",
									is_modal: true,
									modal_type: "coin",
								})
							}
						>
							Purchase Now
						</Button>
					)}
				</PurchaseSection>
			</SupportToken>
			<Background src={props.bgImage} />
			<BackgroundTwo src={props.bgImage} />
		</Container>
	);
};

export default SupportCredit;
const Container = styled.div`
	position: relative;

	margin-top: 20px;
	background-color: ${(props) => props.background};
	padding: 30px;
	border: 1px solid
		${(props) =>
			props.type === "token" ? "#68d6ae " : "#efd358"};
	border-radius: 5px;
	overflow: hidden;
	@media all and (max-width: 980px) {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	@media all and (max-width: 480px) {
		padding: 20px;
	}
`;
const SupportToken = styled.div`
	height: 100%;
	display: grid;

	grid-template-columns: 4fr 5fr;
	@media all and (max-width: 980px) {
		grid-template-columns: 1fr;
	}
	@media all and (max-width: 580px) {
		grid-template-columns: 1fr 1fr;
		grid-gap: 5px;
	}
	@media all and (max-width: 440px) {
		grid-template-columns: 1fr;
	}
`;
const Coins = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	@media all and (max-width: 980px) {
		display: block;
		margin-bottom: 15px;
	}
	@media all and (max-width: 580px) {
		display: flex;
		margin-bottom: 0px;
	}
	@media all and (max-width: 440px) {
		display: block;
		margin-bottom: 15px;
	}
`;
const CoinContainer = styled.div`
	width: 60%;
	display: flex;
	justify-content: center;
	@media all and (max-width: 980px) {
		width: 41%;
		margin: 0 auto;
	}
	@media all and (max-width: 580px) {
		width: 63%;
		margin: unset;
		margin-right: 10px;
	}
	@media all and (max-width: 440px) {
		width: 30%;
		margin: 0 auto;
	}
`;
const CoinImage = styled.img`
	width: 100%;
	display: block;
`;
const Count = styled.h3`
	font-size: 46px;
	font-family: "gordita_medium";
	line-height: 35px;
	margin: 10px 0;
	@media all and (max-width: 980px) {
		text-align: center;
		margin: 10px 0px;
	}
	@media all and (max-width: 480px) {
		font-size: 42px;
	}
`;
const Title = styled.h2`
	font-size: 20px;

	font-family: "gordita_medium";
	@media all and (max-width: 980px) {
		text-align: center;
	}
`;
const PurchaseSection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
`;
const Label = styled.p`
	font-size: 14px;
	color: #37352f;
	max-width: 80%;

	@media all and (max-width: 980px) {
		max-width: 100%;
		text-align: center;
	}
	@media all and (max-width: 620px) {
		font-size: 12px;
	}
	@media all and (max-width: 580px) {
		font-size: 14px;
	}
`;
const Button = styled(Link)`
	background: ${(props) =>
		props.type === "token"
			? "transparent linear-gradient(90deg, #15BF81 0%, #10FCA6 100%) 0% 0% no-repeat padding-box;"
			: "transparent linear-gradient(90deg, #F3E030 0%, #F6F0BA 100%) 0% 0% no-repeat padding-box;"};
	height: 50px;
	color: ${(props) => props.color};
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: "baloo_paaji_2semibold";
	border-radius: 3px;
	margin-top: 20px;
`;
const Background = styled.img`
	position: absolute;
	top: 10px;
	right: 10px;
`;
const BackgroundTwo = styled.img`
	position: absolute;
	width: 202px;
	bottom: -104px;
	left: -92px;
`;
