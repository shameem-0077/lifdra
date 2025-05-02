import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SupportEngineerContext } from "../../../contexts/stores/SupportEngineerStore";

const EmptySupportCredit = (props) => {
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
					<Label>You don't have any {props.item} </Label>
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

export default EmptySupportCredit;
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
	}
	@media all and (max-width: 440px) {
		grid-template-columns: 1fr;
	}
`;
const Coins = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
const CoinContainer = styled.div`
	width: 70%;
	display: flex;
	justify-content: center;
	/* @media all and (max-width: 980px) {
    width: 55%;
  } */
	@media all and (max-width: 440px) {
		width: 33%;
		margin: 0 auto;
	}
`;
const CoinImage = styled.img`
	width: 100%;
	display: block;
`;
const Title = styled.h2`
	font-size: 20px;
	font-family: "gordita_medium";
`;
const PurchaseSection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	@media all and (max-width: 980px) {
		align-items: center;
		margin-top: 30px;
	}
	@media all and (max-width: 440px) {
		align-items: center;
		margin-top: 30px;
	}
`;
const Label = styled.p`
	font-size: 14px;
	max-width: 80%;
	color: #37352f;
	margin-top: 10px;
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
	width: 100%;
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
