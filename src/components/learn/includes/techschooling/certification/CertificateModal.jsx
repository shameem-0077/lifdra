import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import bg from "../../../../../assets/images/certificate/modal-back.svg";
import { useSelector, useDispatch } from "react-redux";

const CertificateModal = (props) => {
	const { isProfessionCompleted, nextDesignationData } =
		useSelector((state) => state);
	const dispatch = useDispatch();

	const handleModal = (bool) => {
		dispatch({
			type: "UPDATE_PROFESSION_STATUS",
			bool: bool,
		});
	};

	return (
		isProfessionCompleted && (
			<MainContainer>
				<Overlay onClick={() => handleModal(false)}></Overlay>

				<ModalContainer className="anim-fade">
					<BgAnimation>
						<PopperImg
							src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/24-07-2021/dots.png"
							alt="Image"
						/>
					</BgAnimation>
					<Left>
						<ImageContainer>
							<Image
								src={require("../../../../../assets/images/certificate/modal.svg")}
								alt="Image"
							/>
						</ImageContainer>
						<Ribbon>
							<Img
								src={require("../../../../../assets/images/certificate/ribbon.svg")}
								alt="Image"
							/>
						</Ribbon>
					</Left>
					<Right>
						<Title>Congratulations!</Title>
						<Para>
							You’ve successfully completed this
							profession.
						</Para>
						<Button
							to={`/tech-schooling/elearning/professions/${nextDesignationData.pk}/`}
						>
							Start {nextDesignationData.name}
						</Button>
						<ViewButton to="/tech-schooling/certification/">
							Get Certificate
						</ViewButton>
					</Right>
				</ModalContainer>
			</MainContainer>
		)
	);
};

export default CertificateModal;

const MainContainer = styled.div`
	position: fixed;
	transition: 0.4s;
	width: 100%;
	height: 100vh;
	z-index: 1000;
	left: 0;
	top: 0;
	display: grid;
	place-items: center;
`;
const BgAnimation = styled.div`
	z-index: 1;
	position: absolute;
	top: -38%;
	left: -15%;
	width: 130%;
	animation: animate 3s;
	animation-fill-mode: forwards;
	@keyframes animate {
		from {
			transform: scale(0);
		}
		to {
			transform: scale(1);
		}
	}
	@media (max-width: 840px) {
		top: -28%;
	}
	@media (max-width: 768px) {
		top: -30%;
	}
`;
const PopperImg = styled.img`
	width: 100%;
	display: block;
`;
const Overlay = styled.div`
	background-color: rgba(0, 0, 0, 0.5);
	width: 100%;
	height: 100vh;
	cursor: pointer;
`;
const ModalContainer = styled.div`
	position: absolute;
	width: 35%;
	height: 380px;
	border-radius: 9px;
	background-image: url(${bg});
	background-color: #fff;
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 35px;
	@media (max-width: 1800px) {
		width: 40%;
	}
	@media (max-width: 1600px) {
		width: 45%;
	}
	@media (max-width: 1440px) {
		width: 50%;
	}
	@media (max-width: 1280px) {
		width: 60%;
	}
	@media (max-width: 1050px) {
		width: 65%;
	}
	@media (max-width: 980px) {
		height: 330px;
		width: 60%;
	}
	@media (max-width: 840px) {
		width: 65%;
		height: auto;
	}
	@media (max-width: 640px) {
		padding: 25px;
	}
	@media (max-width: 480px) {
		width: 80%;
	}
	@media (max-width: 360px) {
		width: 90%;
	}
`;
const Ribbon = styled.div`
	width: 90px;
	position: absolute;
	left: -50px;
	bottom: 128px;
	@media (max-width: 360px) {
		left: -55px;
		bottom: 128px;
	}
	@media (max-width: 768px) {
		display: none;
	}
`;
const Img = styled.img`
	width: 100%;
	display: block;
`;
const Left = styled.div`
	z-index: 10;
`;
const ImageContainer = styled.div`
	width: 420px;
	position: absolute;
	top: 25px;
	left: -22px;
	z-index: 1;
	@media (max-width: 980px) {
		width: 60%;
	}
`;
const Image = styled.img`
	width: 100%;
	display: block;
	@media (max-width: 768px) {
		display: none;
	}
`;
const Right = styled.div`
	width: 45%;
	text-align: center;
	z-index: 10;
	@media (max-width: 980px) {
		width: 50%;
	}
	@media (max-width: 768px) {
		width: 100%;
	}
`;
const Title = styled.h3`
	color: #0fa76f;
	font-size: 26px;
	font-family: "baloo_paaji_2semibold";
	@media (max-width: 1440px) {
		font-size: 25px;
	}
	@media (max-width: 980px) {
		font-size: 23px;
	}
	@media (max-width: 480px) {
		font-size: 20px;
	}
`;
const Para = styled.p`
	color: #18484c;
	margin-bottom: 40px;
	font-size: 21px;
	line-height: 1.3em;
	font-family: "gordita_medium";
	@media (max-width: 1440px) {
		font-size: 20px;
	}
	@media (max-width: 980px) {
		font-size: 18px;
	}
	@media (max-width: 480px) {
		font-size: 16px;
	}
	@media (max-width: 360px) {
		font-size: 16px;
	}
	@media (max-width: 498px) {
		margin: 12px 0 20px;
	}
`;
const Button = styled(Link)`
	width: 100%;
	color: #fff;
	padding: 10px 16px;
	background-color: #0fa76f;
	display: block;
	border-radius: 5px;
	font-size: 15px;
	font-family: "gordita_medium";
	margin-bottom: 15px;
	cursor: pointer;
	opacity: 1;
	&:hover {
		background-color: #1aaa75;
		opacity: 1;
	}
	@media (max-width: 980px) {
		font-size: 15px;
	}
	@media (max-width: 380px) {
		font-size: 14px;
		padding: 8px 10px;
	}
`;
const ViewButton = styled(Link)`
	width: 100%;
	color: #0fa76f;
	background-color: #fff;
	padding: 9px 16px;
	border: 1px solid #0fa76f;
	display: block;
	border-radius: 5px;
	font-size: 15px;
	font-family: "gordita_medium";
	cursor: pointer;
	opacity: 1;
	&:hover {
		background-color: #ffffffe4;
		opacity: 1;
	}
	@media (max-width: 980px) {
		font-size: 15px;
	}
	@media (max-width: 380px) {
		font-size: 14px;
		padding: 8px 10px;
	}
`;
