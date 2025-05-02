import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Typed from "typed.js";

const Introduction = ({ introducingRef }) => {
	// Create reference to store the DOM element containing the animation
	const el = useRef(null);
	// Create reference to store the Typed instance itself
	const typed = useRef(null);

	useEffect(() => {
		const options = {
			strings: ["Computer Engineer", "Tech Scientist"],
			typeSpeed: 100,
			backSpeed: 100,
			loop: true,
		};

		// elRef refers to the <span> rendered below
		typed.current = new Typed(el.current, options);

		return () => {
			// Make sure to destroy Typed instance during cleanup
			// to prevent memory leaks
			typed.current.destroy();
		};
	}, []);

	return (
		<Container
			ref={introducingRef}
			className="wrapper"
			data-aos="fade-up"
			data-aos-once="true"
		>
			<Title>
				<span>Steyp</span> is Introducing a{" "}
				<div className="learn">learning system</div> to create{" "}
				<br className="break" />
				<div className="type-wrap">
					<span style={{ whiteSpace: "pre" }} ref={el} />
				</div>
			</Title>
			<ImageContainer>
				<img
					src={
						"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/introduction-logo.png"
					}
					alt="Logo"
				/>
			</ImageContainer>
		</Container>
	);
};

export default Introduction;

const ImageContainer = styled.div`
	width: 45%;
	z-index: -1;
	img {
		width: 100%;
		display: block;
	}
	@media all and (max-width: 1280px) {
		width: 35%;
	}
	@media all and (max-width: 980px) {
		width: 32%;
	}
	@media all and (max-width: 768px) {
		width: 75%;
		margin: 0 auto;
	}
	@media all and (max-width: 640px) {
		width: 26%;
		margin: unset;
	}
	@media all and (max-width: 480px) {
	}

	@media all and (max-width: 360px) {
	}
`;

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	position: relative;
	padding: 105px 0 105px !important;
	@media all and (max-width: 980px) {
		padding: 70px 0 70px !important;
	}
	@media all and (max-width: 768px) {
		padding: 50px 0 50px !important;
	}
	@media all and (max-width: 480px) {
		width: 92% !important;
	}
`;
const Title = styled.h2`
	text-align: left;
	width: 46%;
	font-family: gordita_medium;
	position: relative;
	font-size: 40px;
	color: #2d2d2d;
	br {
		@media all and (max-width: 768px) {
			display: none;
		}
		@media all and (max-width: 640px) {
			display: block;
		}
	}
	& .type-wrap {
		@media all and (max-width: 768px) {
			font-size: 30px;
			display: inline;
		}
	}

	& .typed-cursor {
		opacity: 1;
		animation: typedjsBlink 0.7s infinite;
		-webkit-animation: typedjsBlink 0.7s infinite;
		animation: typedjsBlink 0.7s infinite;
	}
	@keyframes typedjsBlink {
		50% {
			opacity: 0;
		}
	}
	@-webkit-keyframes typedjsBlink {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	& .typed-fade-out {
		opacity: 0;
		transition: opacity 0.25s;
		-webkit-animation: 0;
		animation: 0;
	}

	h2 {
		font-size: 46px;
		color: #57c289;
	}
	& .type::after {
		content: "|";
		animation: cursor 1.1s infinite step-start;
	}
	@keyframes cursor {
		50% {
			opacity: 1;
		}
	}
	div & .learn {
		display: inline;
		position: relative;
		font-family: gordita_medium;
		&::before {
			content: "";
			border-radius: 6px;
			position: absolute;
			top: 50px;
			right: 117px;
			width: 328px;
			height: 50px;
			background: #4aedc2;
			display: block;
			z-index: -1;
			@media all and (max-width: 1280px) {
				top: 41px;
				right: 113px;
				width: 263px;
				height: 37px;
				display: none;
			}
			@media all and (max-width: 980px) {
				top: 41px;
				right: 106px;
				width: 241px;
				height: 32px;
				display: none;
			}
			@media all and (max-width: 768px) {
				top: 35px;
				right: 99px;
				width: 226px;
				height: 32px;
				display: none;
			}
			@media all and (max-width: 640px) {
				top: 28px;
				right: 74px;
				width: 163px;
				height: 27px;
				display: none;
			}
			@media all and (max-width: 420px) {
				top: 24px;
				right: 66px;
				width: 166px;
				height: 24px;
			}
			@media all and (max-width: 360px) {
				top: 20px;
				right: 54px;
				width: 150px;
			}
		}
	}
	span {
		color: #57c289;
		font-size: 40px;
		position: relative;
		font-family: gordita_medium;
	}
	small {
		font-size: 46px;
		color: #57c289;
	}
	@media all and (max-width: 1280px) {
		font-size: 32px;
		width: 55%;
		span {
			color: #57c289;
			font-size: 38px;
		}
		small {
			font-size: 38px;
		}
	}
	@media all and (max-width: 980px) {
		font-size: 30px;
		width: 65%;
		span {
			font-size: 35px;
		}
		small {
			font-size: 35px;
		}
	}
	@media all and (max-width: 768px) {
		width: 100%;
		font-size: 28px;
		margin-bottom: 30px;
		span {
			font-size: 30px;
		}
		small {
			font-size: 30px;
		}
	}
	@media all and (max-width: 640px) {
		width: 73%;
		font-size: 21px;
		span {
			font-size: 27px;
		}
		small {
			font-size: 25px;
		}
	}
	@media all and (max-width: 480px) {
		max-width: 83%;
		font-size: 20px;
		margin-bottom: 0px;
		span {
			font-size: 25px;
		}
		small {
			font-size: 23px;
		}
	}
	@media all and (max-width: 420px) {
		max-width: 77%;
		font-size: 18px;
		span {
			font-size: 23px;
		}
		small {
			font-size: 22px;
		}
	}
	@media all and (max-width: 360px) {
		max-width: 88%;
		font-size: 16px;
		span {
			font-size: 19px;
		}
		small {
			font-size: 19px;
		}
	}
`;
