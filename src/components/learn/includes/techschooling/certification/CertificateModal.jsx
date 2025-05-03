import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import bg from "../../../../../assets/images/certificate/modal-back.svg";
import { useAuthStore } from "../../../../../store/authStore";

const CertificateModal = (props) => {
	const { user_data, updateUserData } = useAuthStore();
	const isProfessionCompleted = user_data?.is_profession_completed;
	const nextDesignationData = user_data?.next_designation_data;

	const handleModal = (bool) => {
		updateUserData({ is_profession_completed: bool });
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
							You've successfully completed this
							profession.
						</Para>
						<Button
							to={`/tech-schooling/elearning/professions/${nextDesignationData?.pk}/`}
						>
							Start {nextDesignationData?.name}
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

const Overlay = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(2px);
`;

const ModalContainer = styled.div`
	width: 650px;
	max-height: 127vh;
	margin: 0 auto;
	background: #fff;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	position: absolute;
	padding: 40px 40px;
	border-radius: 10px;
	transition: 0.5s;
	z-index: 101;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 30px;

	@media all and (max-width: 980px) {
		padding: 30px 40px;
		width: 650px;
	}
	@media all and (max-width: 768px) {
		padding: 30px 40px;
		width: 550px;
	}
	@media all and (max-width: 640px) {
		width: 400px;
		padding: 20px 30px;
		grid-template-columns: 1fr;
	}
	@media all and (max-width: 480px) {
		width: 330px;
		padding: 20px 20px;
	}
	@media all and (max-width: 360px) {
		width: 300px;
	}
`;

const BgAnimation = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
`;

const PopperImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const Left = styled.div`
	position: relative;
`;

const ImageContainer = styled.div`
	width: 100%;
	margin-top: 20px;
`;

const Image = styled.img`
	width: 100%;
`;

const Ribbon = styled.div`
	position: absolute;
	top: -20px;
	right: -20px;
	width: 80px;
`;

const Img = styled.img`
	width: 100%;
`;

const Right = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Title = styled.h2`
	font-size: 32px;
	font-family: "baloo_paaji_2semibold";
	color: #333;
	margin-bottom: 20px;

	@media all and (max-width: 640px) {
		font-size: 28px;
	}
`;

const Para = styled.p`
	font-size: 16px;
	font-family: "gordita_medium";
	color: #666;
	margin-bottom: 30px;
`;

const Button = styled(Link)`
	width: 100%;
	height: 45px;
	background-color: #4ba870;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: "baloo_paaji_2semibold";
	border-radius: 5px;
	font-size: 16px;
	margin-bottom: 15px;
	text-decoration: none;

	&:hover {
		background-color: #3d8c5c;
	}
`;

const ViewButton = styled(Link)`
	width: 100%;
	height: 45px;
	background-color: #fff;
	color: #4ba870;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: "baloo_paaji_2semibold";
	border: 2px solid #4ba870;
	border-radius: 5px;
	font-size: 16px;
	text-decoration: none;

	&:hover {
		background-color: #f5f5f5;
	}
`;
