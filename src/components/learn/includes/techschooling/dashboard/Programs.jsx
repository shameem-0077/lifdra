import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { learnConfig } from "../../../../../axiosConfig";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../general/loaders/Loader";
import TechDegreeForm from "../../../../web/inludes/general/steyp-landing-page/modal/TechDegreeForm";

function Programs() {
	const { programsState, isTechDegreeForm } = useSelector((state) => state);
	const dispatch = useDispatch();
	const handleModal = () => {
		dispatch({
			type: "TOGGLE_TECH_DEGREE_FORM_MODAL",
		});
	};
	return (
		<Contains>
			<TechDegreeForm />
			{programsState.programs.length === 0 && programsState.loading ? (
				<LoaderContainer>
					<Loader />
				</LoaderContainer>
			) : (
				<>
					{programsState.programs.map((data) => (
						<Contain types={data.name} data={data}>
							<BackImage src={data.background_image} />
							<MainContainer>
								<Top>
									<Div className="toppp">
										<Heading status={data.name}>
											{data.name}
										</Heading>
										<Middle types={data.name}>
											{data.description}
										</Middle>
									</Div>
									<ImageContainer>
										<Image
											src={data.icon_image}
											alt="Image"
										/>
									</ImageContainer>
								</Top>
								<Highlight status={data.program_type}>
									{data.program_type}
								</Highlight>

								{data.name === "I'm a Graduate" ? (
									<Button onClick={handleModal}>
										<div>Apply Now</div>
										<span>
											<img
												src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/right-side.svg"
												alt=""
											/>
										</span>
									</Button>
								) : (
									<Button
										types={data.name}
										to={`/feed/${data.slug}/`}
									>
										<div>Join&nbsp;{data.title}</div>
										<span>
											<img
												src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/right-side.svg"
												alt=""
											/>
										</span>
									</Button>
								)}
							</MainContainer>
							<Person types={data.name}>
								<img src={data.student_image} alt="person" />
							</Person>
						</Contain>
					))}
				</>
			)}
		</Contains>
	);
}

export default Programs;
const Contains = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 22px;
	@media all and (max-width: 1200px) {
		grid-gap: 10px;
	}
	@media all and (max-width: 1040px) {
		flex-wrap: wrap;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
`;
const LoaderContainer = styled.div`
	min-height: 500px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;
const Contain = styled.div`
	position: relative;
	width: 32%;
	z-index: 0;
	border-radius: 7px;
	overflow: hidden;
	background-color: ${(props) =>
		props.types === "I'm a School Student"
			? "#F5F2FF"
			: props.types === "I'm a College Student"
			? "#FFF3EC"
			: "#ECFBFF"};
	@media all and (max-width: 1200px) {
		width: 33%;
	}
	@media all and (max-width: 1040px) {
		width: 100%;
	}
	@media all and (max-width: 768px) {
		width: 100%;
	}
`;
const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	display: flex;
	flex-direction: column;

	padding: 30px 30px;
	@media all and (max-width: 1200px) {
		padding: 30px 21px;
	}
	@media all and (max-width: 420px) {
		padding: 23px 15px;
	}
`;
const BackImage = styled.img`
	position: absolute;
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
	z-index: -1;
	opacity: 0.8;
`;

const Top = styled.div`
	display: flex;
	justify-content: space-between;
`;
const Div = styled.div`
	width: 80%;
	margin-right: 10px;
`;
const Heading = styled.h3`
	font-family: "gordita_medium";
	font-size: 23px;
	color: ${(props) =>
		props.status === "I'm a School Student"
			? "#8475d0"
			: props.status === "I'm a College Student"
			? "#F9A825"
			: "#03A9F4"};
	@media all and (max-width: 1300px) {
		font-size: 18px;
	}
	@media all and (max-width: 1040px) {
		font-size: 20px;
	}
	@media all and (max-width: 360px) {
		font-size: 16px;
	}
`;
const ImageContainer = styled.div`
	border-radius: 50%;
	background: #fff;
	padding: 21px;
	width: 75px;
	height: 75px;
	display: flex;
	align-items: center;
	justify-content: center;
	@media all and (max-width: 1300px) {
		padding: 18px;
		width: 65px;
		height: 65px;
	}
	@media all and (max-width: 768px) {
		padding: 18px;
		width: 65px;
		height: 65px;
	}
`;
const Image = styled.img`
	width: 100%;
	display: block;
`;
const Middle = styled.div`
	font-family: "gordita_regular";
	margin-top: 10px;
	color: #000;
	width: ${(props) =>
		props.types === "I'm a School Student"
			? "100%"
			: props.types === "I'm a College Student"
			? "74%"
			: "65%"};
	font-size: 15px;
	@media all and (max-width: 1300px) {
		width: ${(props) =>
			props.types === "I'm a School Student"
				? "100%"
				: props.types === "I'm a College Student"
				? "74%"
				: "100%"};
	}
	@media all and (max-width: 420px) {
		font-size: 14px;
	}
	@media all and (max-width: 360px) {
		font-size: 13px;
	}
`;
const Highlight = styled.div`
	margin-top: 10px;
	font-size: 15px;
	font-family: "gordita_medium";
	color: ${(props) =>
		props.status === "School Students (5th std to 12th std)"
			? "#8475d0"
			: props.status === "College Students"
			? "#F9A825"
			: "#03A9F4"};
	@media all and (max-width: 420px) {
		font-size: 14px;
	}
	@media all and (max-width: 360px) {
		font-size: 13px;
	}
`;
const Button = styled(Link)`
	background-color: #0fa76f;
	font-size: 15px;
	color: #ffffff;
	font-family: gordita_medium;
	padding: 10px 15px;
	width: 190px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	margin-top: 65px;
	transition: all 0.4s ease;
	div {
		// transform: translateY(2px);
		@media all and (max-width: 420px) {
			// transform: translateY(1px);
		}
	}
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
		width: 210px;
		span {
			width: 16px;
			margin-left: 9px;
		}
	}

	@media all and (max-width: 1040px) {
		margin-top: 50px;
	}
	@media all and (max-width: 420px) {
		font-size: 14px;
		padding: 9px 14px;
	}
`;
const Person = styled.div`
	transition: all 0.4s ease;
	position: absolute;
	width: ${(props) =>
		props.types === "I'm a School Student"
			? "36%"
			: props.types === "I'm a College Student"
			? "28%"
			: "30%"};
	bottom: 0;
	right: 0;
	img {
		width: 100%;
		display: block;
		transition: all 0.4s ease;
	}
	@media all and (max-width: 1040px) {
		width: ${(props) =>
			props.types === "I'm a School Student"
				? "15%"
				: props.types === "I'm a College Student"
				? "10%"
				: "10%"};
	}
	@media all and (max-width: 840px) {
		width: ${(props) =>
			props.types === "I'm a School Student"
				? "20%"
				: props.types === "I'm a College Student"
				? "13%"
				: "13%"};
	}
	@media all and (max-width: 768px) {
		width: ${(props) =>
			props.types === "I'm a School Student"
				? "20%"
				: props.types === "I'm a College Student"
				? "13%"
				: "13%"};
	}
	@media all and (max-width: 640px) {
		width: ${(props) =>
			props.types === "I'm a School Student"
				? "23%"
				: props.types === "I'm a College Student"
				? "13%"
				: "13%"};
	}
	@media all and (max-width: 480px) {
		width: ${(props) =>
			props.types === "I'm a School Student"
				? "28%"
				: props.types === "I'm a College Student"
				? "18%"
				: "21%"};
	}
`;
