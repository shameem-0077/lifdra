import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { serverConfig } from "../../../../../axiosConfig";
import PaymentStatusModal from "../../../../learn/screens/prime-programs/PaymentStatusModal";
import $ from "jquery";
import { PrimeProgramContext } from "../../../../contexts/stores/PrimeProgramStore";
import Loader from "../../../../../assets/lotties/prime-progrmmes/voucherLoader.json";
import Lottie from "react-lottie";
import tickIcon from "../../../../../assets/images/prime-explore/tick.svg";
import closeIcon from "../../../../../assets/images/prime-explore/close.svg";
import { useAuthStore } from "../../../../../store/authStore";

function PrimeSubcribeModal(props) {
	const { primeProgramState, primeProgramDispatch } =
		useContext(PrimeProgramContext);

	const { user_data } = useAuthStore();

	// #states
	const [show, setShow] = useState(false);
	const [modalType, setModalType] = useState("");
	const [isLoading, setLoading] = useState(true);
	const [isPaymentLoading, setPaymentLoading] = useState(false);
	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
	});
	useEffect(() => {
		if (props.action === "subscribe-prime-programs") {
			$("html").addClass("modal-enabled");
		} else {
			$("html").removeClass("modal-enabled");
		}
	}, [props.action]);
	const [selectedPlan, setSeletedPlan] = useState(
		props.days === "30"
			? "monthy"
			: props.days === "365"
			? "yearly"
			: "yearly"
	);
	const [monthypoints, setpoints] = useState([
		// { id: 1, point: "Rs 15/day" },
		{ id: 2, point: "Access to the entire course library" },
		{ id: 3, point: "Learn in Malayalam" },
		{ id: 4, point: "Unlimited learning" },
	]);
	const [Yearlypoints, setYearlypoints] = useState([
		// { id: 1, point: "Rs 10/day" },
		{ id: 2, point: "Access to the entire course library" },
		{ id: 3, point: "Learn in Malayalam" },
		{ id: 4, point: "Unlimited learning" },
		{ id: 5, point: "Access to future courses" },
	]);

	const [plan, setPlan] = useState([]);

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: Loader,
		rendererSettings: {},
	};

	// useEffect(() => {
	//     setSeletedPlan(
	//
	//     );
	// }, [props.days]);

	// #functions

	//fuction for toogle button
	function handleClick() {
		setSeletedPlan((prev) => (prev === "monthy" ? "yearly" : "monthy"));
	}
	const handlePayment = (e) => {
		e.preventDefault();
		setPaymentLoading(true);
		const { access_token } = user_data;

		primeprogramsConfig
			.post(
				`purchases/course-purchase/${plan.id}/`,
				{
					purchase_type: "subscription",
					is_use_purchased_coins: false,
					coupon_code: "",
				},
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				}
			)
			.then((response) => {
				const { StatusCode, data } = response.data;
				if (StatusCode === 6000) {
					setPaymentLoading(false);
				} else {
					if (data.payment_link) {
						window.location.href = data.payment_link;
					} else {
						setPaymentLoading(false);
						setShow(true);
						setModalType("failed");
					}
				}
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
			});
	};

	//fetch subscription plan
	// function fetchPlan() {
	//     setLoading(true);
	//     primeprogramsConfig
	//         .get("purchases/subscription-plans/")
	//         .then((res) => {
	//             const { data, StatusCode } = res.data;
	//             if (StatusCode === 6000) {
	//                 setPlan(
	//                     selectedPlan === "monthy"
	//                         ? data.filter((item) => item.days === 30)[0]
	//                         : selectedPlan === "yearly"
	//                         ? data.filter((item) => item.days === 365)[0]
	//                         : null
	//                 );
	//                 setLoading(false);
	//             }
	//         })
	//         .catch((err) => {
	//             console.log(err);
	//         });
	// }
	// useEffect(() => {
	//     fetchPlan();
	// }, [selectedPlan]);

	//fetch height of the screen
	useEffect(() => {
		function handleResize() {
			setDimensions({
				height: window.innerHeight,
				width: window.innerWidth,
			});
		}

		window.addEventListener("resize", handleResize);
	});
	return (
		<Container>
			<PaymentStatusModal
				course_id={plan?.id}
				show={show}
				setShow={setShow}
				setModalType={setModalType}
				modalType={modalType}
				purchase_type="subscription"
			/>{" "}
			<Overlay action={props.action} onClick={props.closeModal} />
			<ModalContainer
				style={{ height: dimensions }}
				action={props.action}
			>
				<Cover>
					<TopSection>
						<Title>Our Pricing</Title>
						<Selection>
							<span
								selectedPlan={selectedPlan}
								className={
									selectedPlan === "monthy" && "active"
								}
							>
								Month
							</span>
							<SelectionButton
								selectedPlan={selectedPlan}
								onClick={handleClick}
							>
								<span></span>
							</SelectionButton>
							<span
								selectedPlan={selectedPlan}
								className={
									selectedPlan === "yearly" && "active"
								}
							>
								Yearly
							</span>
						</Selection>
						<SubscribeSection>
							<PriceSection>
								{isLoading ? (
									<Lottie
										options={defaultOptions}
										height={54}
									/>
								) : (
									<>
										{plan.days === 30 ? (
											<Price>
												<span>
													&#x20b9;{" "}
													{(
														plan.coins * 50
													).toLocaleString()}
												</span>{" "}
												/ Month
											</Price>
										) : (
											<Price>
												<span>
													&#x20b9;{" "}
													{(
														plan.coins * 50
													).toLocaleString()}
												</span>{" "}
												Yearly
											</Price>
										)}
										<Off>
											{plan.days === 365
												? "Rs 10/day"
												: ""}
										</Off>
									</>
								)}
							</PriceSection>
							<PointsSection>
								{selectedPlan === "yearly"
									? Yearlypoints.map((data) => (
											<DetailPoints key={data.id}>
												<Tick>
													<img
														src={tickIcon}
														alt=""
													/>
												</Tick>
												<span>{data.point}</span>
											</DetailPoints>
									  ))
									: selectedPlan === "monthy"
									? monthypoints.map((data) => (
											<DetailPoints key={data.id}>
												<Tick>
													<img
														src={tickIcon}
														alt=""
													/>
												</Tick>
												<span>{data.point}</span>
											</DetailPoints>
									  ))
									: null}
							</PointsSection>
						</SubscribeSection>
					</TopSection>
					{isLoading ? (
						<Button>
							<Lottie
								options={defaultOptions}
								height={35}
								width={35}
							/>
						</Button>
					) : isPaymentLoading ? (
						<Button>
							<Lottie
								options={defaultOptions}
								height={35}
								width={35}
							/>
						</Button>
					) : plan.days === 30 ? (
						<Button onClick={handlePayment}>
							Proceed (₹{(plan.coins * 50).toLocaleString()})
						</Button>
					) : (
						<Button onClick={handlePayment}>
							Proceed (₹{(plan.coins * 50).toLocaleString()})
						</Button>
					)}
				</Cover>
				<CloseButton onClick={props.closeModal}>
					<img
						src={closeIcon}
						alt=""
					/>
				</CloseButton>
			</ModalContainer>
		</Container>
	);
}

export default PrimeSubcribeModal;

const Container = styled.div``;

const Overlay = styled.div`
	display: ${(props) =>
		props.action === "subscribe-prime-programs" ? "block" : "none"};
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.2);
	z-index: 1000;
	filter: blur(0.1);
`;
const ModalContainer = styled.div`
	overflow: hidden;
	position: relative;
	z-index: 1001;
	background: #fff;
	width: 30%;
	position: fixed;
	top: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 500px;
	/* justify-content: center; */
	border-radius: 5px;
	right: ${(props) =>
		props.action === "subscribe-prime-programs" ? "0" : "-100%"};
	transition: all 0.2s ease;
	@media (max-width: 1440px) {
		width: 35%;
		right: ${(props) =>
			props.action === "subscribe-prime-programs" ? "0" : "-100%"};
	}
	@media (max-width: 1080px) {
		width: 42%;
		right: ${(props) =>
			props.action === "subscribe-prime-programs" ? "0" : "-100%"};
	}
	@media (max-width: 1024px) {
		width: 47%;
		right: ${(props) =>
			props.action === "subscribe-prime-programs" ? "0" : "-100%"};
	}
	@media (max-width: 780px) {
		width: 51%;
		right: ${(props) =>
			props.action === "subscribe-prime-programs" ? "0" : "-100%"};
	}
	@media (max-width: 740px) {
		width: 55%;
		right: ${(props) =>
			props.action === "subscribe-prime-programs" ? "0" : "-100%"};
	}
	@media (max-width: 640px) {
		/* padding-bottom: 50px; */
		width: 63%;
		min-width: 400px;
		right: ${(props) =>
			props.action === "subscribe-prime-programs" ? "0" : "-100%"};
	}
	@media (max-width: 550px) {
		width: 70%;
		right: ${(props) =>
			props.action === "subscribe-prime-programs" ? "0" : "-100%"};
	}
	@media (max-width: 480px) {
		min-width: 300px;
		width: 94%;
		right: ${(props) =>
			props.action === "subscribe-prime-programs" ? "0" : "-100%"};
	}
	@media (max-width: 360px) {
		width: 95%;
		right: ${(props) =>
			props.action === "subscribe-prime-programs" ? "0" : "-100%"};
	}
	@media (max-width: 325px) {
		right: ${(props) =>
			props.action === "subscribe-prime-programs" ? "0" : "-100%"};
	}
`;

const Cover = styled.div`
	padding: 40px;
	width: 100%;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: space-between;
	@media all and (max-width: 640px) {
		padding: 25px;
	}
`;

const TopSection = styled.div``;
const Title = styled.h2`
	text-align: center;
	font-family: gordita_medium;
	padding-bottom: 20px;
	border-bottom: 1px solid #0000000d;
	color: #4b4c4a;
	@media all and (max-width: 640px) {
		font-size: 24px;
		padding-bottom: 15px;
	}
`;
const SelectionButton = styled.span`
	width: 60px;
	height: 30px;
	display: flex;
	align-items: center;
	padding: 2px;
	margin: 0 20px;
	background-color: #fff;
	border: 1px solid #4ca473;
	border-radius: 17px;
	position: relative;
	transition: all 0.3s ease-in-out;
	cursor: pointer;
	span {
		transition: all 0.3s ease-in-out;
		display: block;
		height: 24px;
		width: 24px;
		background-color: #4ca473;

		border-radius: 50%;
		position: absolute;
		top: 2px;
		left: ${(props) => (props.selectedPlan === "yearly" ? "31px" : "3px")};
	}
	@media all and (max-width: 480px) {
		width: 50px;
		height: 24px;
		span {
			height: 18px;
			width: 18px;
			left: ${(props) =>
				props.selectedPlan === "yearly" ? "29px" : "3px"};
		}
	}
`;

const Selection = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 30px;
	span {
		font-family: gordita_medium;
		color: #4b4c4a;
		font-size: 18px;
		transition: all 0.3s ease-in-out;
		&.active {
			color: #4ca473 !important;
		}
	}
	&.active {
		color: "#4CA473";
	}
	@media all and (max-width: 480px) {
		margin-top: 20px;
		span {
			font-size: 16px;
		}
	}
`;

const SubscribeSection = styled.div`
	background-color: #f4f9ecb8;
	border-radius: 10px;
	padding: 20px;
	margin-top: 30px;
	@media all and (max-width: 480px) {
		margin-top: 20px;
	}
	@media all and (max-width: 360px) {
		padding: 20px 15px;
	}
`;
const PriceSection = styled.div`
	background-color: #d3ebce;
	padding: 50px;
	border-radius: 10px;
	@media all and (max-width: 640px) {
		padding: 40px 25px;
	}
	@media all and (max-width: 360px) {
		padding: 20px 18px;
	}
`;
const Price = styled.h3`
	font-size: 20px;
	font-family: gordita_medium;

	span {
		font-size: 38px;
	}
	@media all and (max-width: 640px) {
		font-size: 18px;
		span {
			font-size: 32px;
		}
	}
	@media all and (max-width: 480px) {
		font-size: 16px;
		span {
			font-size: 30px;
		}
	}
	@media all and (max-width: 360px) {
		font-size: 14px;
		span {
			font-size: 26px;
		}
	}
`;
const Off = styled.p`
	font-size: 20px;
	color: #333;
	font-family: gordita_medium;
	@media all and (max-width: 680px) {
		font-size: 18px;
	}
	@media all and (max-width: 480px) {
		font-size: 16px;
	}
	@media all and (max-width: 360px) {
		font-size: 14px;
	}
`;
const DetailPoints = styled.span`
	display: flex;
	margin-bottom: 15px;
	color: #212121;
	&:last-child {
		margin-bottom: 0;
	}
	span {
		font-size: 15px;
		font-family: gordita_medium;
	}
	@media all and (max-width: 980px) {
		font-size: 15px;
	}
	@media all and (max-width: 640px) {
		span {
			font-size: 14px;
			font-family: gordita_medium;
		}
	}
`;
const Tick = styled.span`
	display: block;
	width: 16px;
	margin-right: 15px;
	min-width: 16px;
	img {
		display: block;
		width: 100%;
	}
	@media all and (max-width: 980px) {
		margin-right: 10px;
	}
`;
const PointsSection = styled.div`
	margin-top: 30px;
	transition: all 0.3s;
`;

// .
// .
// .
// .

const Button = styled.span`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 55px;
	min-height: 55px;
	background-color: #4ca473;
	color: #ffffff;
	font-family: gordita_medium;
	font-size: 16px;
	border-radius: 6px;
	cursor: pointer;
	&:hover {
		opacity: 0.9;
	}
	@media all and (max-width: 360px) {
		height: 45px;
		min-height: 45px;
		font-size: 15px;
	}
`;
const CloseButton = styled.span`
	width: 20px;
	position: absolute;
	cursor: pointer;
	display: block;
	top: 40px;
	left: 30px;
	img {
		width: 100%;
		display: block;
	}
	@media all and (max-width: 640px) {
		width: 18px;
		top: 25px;
		left: 25px;
	}
`;
