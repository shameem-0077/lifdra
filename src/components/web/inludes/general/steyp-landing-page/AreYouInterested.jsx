import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AreYouInterested = ({ setFormModal }) => {
	return (
		<Contains>
			<Title>Apply for SAT</Title>
			<Description>
				Join with us and build your career in the technology field.
			</Description>
			<Button onClick={() => setFormModal(true)}>
				Apply for SAT{" "}
				<span>
					<img
						src={require("../../../../../assets/images/web/right-side.svg")}
						alt=""
					/>
				</span>
			</Button>
		</Contains>
	);
};

export default AreYouInterested;
const Contains = styled.div`
	padding: 100px 0;
	text-align: center;
	@media all and (max-width: 1100px) {
		padding: 80px 0;
	}
	@media all and (max-width: 768px) {
		padding: 60px 0;
	}
	@media all and (max-width: 480px) {
		padding: 50px 0;
	}
	background-color: #212121;
`;
const Title = styled.h3`
	font-family: gordita_medium;
	font-size: 30px;
	color: #ffffff;
	margin-bottom: 20px;
	@media all and (max-width: 1100px) {
		font-size: 28px;
	}
	@media all and (max-width: 768px) {
		font-size: 26px;
	}
	@media all and (max-width: 640px) {
		font-size: 20px;
	}
	@media all and (max-width: 480px) {
		font-size: 24px;
		margin-bottom: 15px;
	}
`;
const Description = styled.p`
	max-width: 500px;
	margin: 0 auto;
	color: #ffffff;
	@media all and (max-width: 1100px) {
		font-size: 15px;
	}
	@media all and (max-width: 640px) {
		font-size: 14px;
		max-width: 90%;
	}
	@media all and (max-width: 480px) {
		font-size: 13px;
	}
`;

const Button = styled.div`
	cursor: pointer;
	width: 150px;
	background-color: #0fa76f;
	font-size: 16px;
	color: #ffffff;
	font-family: gordita_medium;
	height: 50px;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	margin-top: 30px;
	transition: all 0.4s ease;
	span {
		width: 0;
		display: block;
		transition: all 0.4s ease;
		img {
			display: block;
			width: 100%;
			transition: all 0.4s ease;
		}
	}
	&:hover {
		width: 180px;
		span {
			width: 20px;
			margin-left: 10px;
		}
	}
	@media all and (max-width: 480px) {
		height: 40px;
		font-size: 15px;
	}
`;
