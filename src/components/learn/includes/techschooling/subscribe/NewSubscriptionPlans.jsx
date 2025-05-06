import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "react-lottie";
import Features from "./Features";
import { serverConfig } from "../../../../../axiosConfig";
import dataAnimate from "../../../../../assets/lotties/tech-schooling/plans_placeholder.json";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const NewSubscriptionPlans = ({
	is_explore,
	isLogin,
	is_techschooling,
	executeScroll,
	pricingRef,
}) => {
	const query = useQuery();
	const [student, setStudent] = useState("Graduates");
	const user_profile = useSelector((state) => state.user_profile);
	const subscriptionDiscountStatus = useSelector(
		(state) => state.subscriptionDiscountStatus
	);
	const user_data = useSelector((state) => state.user_data);
	const location = useLocation();
	const [error, setError] = useState(false);
	const [subPlans, setSubPlans] = useState([]);
	const [selectedPlan, setSelectedPlan] = useState("");
	const [isLoading, setLoading] = useState(true);
	const [studentType, setStudentType] = useState("School");
	const [userStudentType, setUserStudentType] = useState("School");
	const [isModal, setModal] = useState(false);
	const [dashBoardRegularPlans, setDashBoardRegularPlans] =
		useState([]);
	const [dasBoardStudentPlan, setDashBoardStudentPlans] = useState(
		[]
	);

	const dispatch = useDispatch();
	const handleIdUploadModal = () => {
		dispatch({
			type: "TOGGLE_STUDENT_UPLOAD_MODAL",
		});
	};

	//page refresh functionality
	function refreshPage() {
		window.location.reload(false);
	}

	useEffect(() => {
		if (studentType === "Campus") {
			setStudent("Campus Student");
		} else if (studentType === "School") {
			setStudent("School Student");
		} else {
			setStudent("Graduates");
		}
	}, [studentType]);

	useEffect(() => {
		if (is_techschooling) {
			fetchStudentPlans();
			fetchRegularPlans();
		} else if (
			user_data &&
			user_data.is_verified &&
			user_data.signup_type === "tech_schooling"
		) {
			fetchStudentPlans();
		} else {
			fetchRegularPlans();
		}
	}, [userStudentType]);

	const fetchStudentPlans = () => {
		let { access_token } = user_data;
		if (access_token) {
			serverConfig
				.get("/subscriptions/plans/", {
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				})
				.then((res) => {
					let { status_code, data } = res.data;
					if (status_code === 6000) {
						if (is_techschooling) {
							setDashBoardStudentPlans(data);
							setUserStudentType(data[0].plan_category);
							setStudentType(data[0].plan_category);
							setLoading(false);
							setSelectedPlan(data[0].id);
						} else {
							setLoading(false);
							setSubPlans(data);
							setStudentType(data[0].plan_category);
							setSelectedPlan(data[0].id);
						}
					} else if (status_code === 6001) {
						setError(true);
					}
				})
				.catch((error) => {
					setError(true);
					console.log(error);
				});
		}
	};

	const fetchRegularPlans = () => {
		serverConfig
			.get(`subscriptions/plan-category/`)
			.then((response) => {
				let { status_code, data } = response.data;
				if (status_code === 6000) {
					if (is_techschooling) {
						setDashBoardRegularPlans(
							data.filter(
								(data) =>
									data.name !== userStudentType
							)
						);
						setLoading(false);
					} else {
						setLoading(false);
						setSubPlans(data);
					}
					if (query.get("s") === "pricing") {
						executeScroll();
					}
				} else if (status_code === 6001) {
					setError(true);
				}
			})
			.catch((error) => {
				setError(true);
				console.log(error);
			});
	};

	const dataLoader = {
		loop: true,
		autoplay: true,
		animationData: dataAnimate,
		rendererSettings: {},
	};

	const termsAndConditions = () => {
		return (
			<BackContainer
				style={{ transform: isModal && "scale(1,1)" }}
			>
				<Overlay onClick={() => setModal(false)}></Overlay>
				<ModalContainer>
					<ModalTitle>Terms & Conditions</ModalTitle>
					<TermsModal>
						<Dot>
							<img
								src={
									"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/arrow-with-bg.svg"
								}
								alt=""
							/>
						</Dot>{" "}
						{studentType === "Graduates"
							? "Attach your valid Identity Card (Aadhaar/Voter ID)."
							: "The ID card must be valid for atleast one month from the date of upload."}
					</TermsModal>
					<TermsModal>
						<Dot>
							{" "}
							<img
								src={
									"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/arrow-with-bg.svg"
								}
								alt=""
							/>
						</Dot>

						{studentType === "Graduates"
							? "The Candidate name should be the same as in the ID proof."
							: `The ${studentType} name given in the ID card should not be fake.`}
					</TermsModal>
					<TermsModal>
						<Dot>
							{" "}
							<img
								src={
									"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/arrow-with-bg.svg"
								}
								alt=""
							/>
						</Dot>{" "}
						{studentType === "Graduates"
							? "The Candidate's name and personal details should be legible and clear. "
							: " The ID card credentials and details should be clearly visible."}
					</TermsModal>
					<Close onClick={() => setModal(false)}>
						<CloseIcon
							src={
								"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/close.svg"
							}
							alt=""
						/>
					</Close>
				</ModalContainer>
			</BackContainer>
		);
	};

	const renderDashboardPlan = () => {
		return (
			<>
				{userStudentType === studentType
					? dasBoardStudentPlan.map((data) => (
							<PlanCard
								key={data.id}
								onClick={() =>
									setSelectedPlan(data.id)
								}
								id={data.id}
								selectedPlan={selectedPlan}
							>
								<Left>
									<Select
										id={data.id}
										selectedPlan={selectedPlan}
									>
										{data.id === selectedPlan && (
											<small></small>
										)}
									</Select>
									<Pricing
										status={
											user_profile.campus_verification_status
										}
									>
										&#8377;{" "}
										{data.coins * data.coin_value}
										{user_profile.campus_verification_status ===
										"approved" ? (
											<p>
												&#8377;{" "}
												{data.coins *
													data.coin_value *
													2}
											</p>
										) : null}
									</Pricing>
								</Left>
								{user_profile.campus_verification_status ===
									"approved" &&
								userStudentType === studentType ? (
									<Discount>50% off</Discount>
								) : (
									<Middle
										onClick={() => setModal(true)}
									>
										<GetThis>
											<GetThisText>
												Get this for
											</GetThisText>
											<GetThisNum>
												₹{" "}
												{(data.coins *
													data.coin_value) /
													2}
											</GetThisNum>
										</GetThis>
										<Terms>
											* Terms and conditions
											apply
										</Terms>
									</Middle>
								)}
								<Validity>
									{data.days === 365
										? "1 year"
										: data.days === 180
										? "6 months"
										: data.days === 90
										? "3 months"
										: data.days === 30
										? "1 month"
										: null}
								</Validity>
							</PlanCard>
					  ))
					: dashBoardRegularPlans
							.filter(
								(plans) => plans.name === studentType
							)
							.map((data) =>
								data.plans.map((data) => (
									<PlanCard
										key={data.id}
										onClick={() =>
											setSelectedPlan(data.id)
										}
										id={data.id}
										selectedPlan={selectedPlan}
									>
										<Left>
											<Select
												id={data.id}
												selectedPlan={
													selectedPlan
												}
											>
												{data.id ===
													selectedPlan && (
													<small></small>
												)}
											</Select>
											<Pricing
												status={
													user_profile.x
												}
												studentType={
													studentType
												}
												selected={
													userStudentType
												}
											>
												&#8377;{" "}
												{data.coins *
													data.coin_value}
											</Pricing>
										</Left>
										<Middle
											onClick={() =>
												setModal(true)
											}
										>
											<GetThis>
												<GetThisText>
													Get this for
												</GetThisText>
												<GetThisNum>
													₹{" "}
													{(data.coins *
														data.coin_value) /
														2}
												</GetThisNum>
											</GetThis>
											<Terms>
												* Terms and conditions
												apply
											</Terms>
										</Middle>
										<Validity>
											{data.days === 365
												? "1 year"
												: data.days === 180
												? "6 months"
												: data.days === 90
												? "3 months"
												: data.days === 30
												? "1 month"
												: null}
										</Validity>
									</PlanCard>
								))
							)}
			</>
		);
	};

	return (
		<>
			{termsAndConditions()}
			<Container>
				<LeftContainer>
					{user_profile &&
					user_profile.campus_verification_status ===
						"approved" ? (
						user_profile &&
						user_profile.subscription_data
							.is_paid_subscription ? (
							<BoxTitle>
								<span> Discount applied! </span>You'll
								get a 50% reduction on all your plans
								now on.
							</BoxTitle>
						) : (
							<BoxTitle>
								<span>Discount applied!</span>{" "}
								subscribe or renew to access Tech
								Schooling
							</BoxTitle>
						)
					) : (
						<BoxTitle>
							Upload ID Card and get{" "}
							<span>50% off</span> on your package
						</BoxTitle>
					)}
					<TermsMain onClick={() => setModal(true)}>
						* Terms and conditions apply
					</TermsMain>
					{user_profile &&
					user_profile.campus_verification_status ===
						"approved" ? (
						<UploadButton
							status={
								user_profile.campus_verification_status
							}
						>
							<ButtonText
								status={
									user_profile.campus_verification_status
								}
							>
								ID card verfied
							</ButtonText>
							<ButtonIcon
								status={
									user_profile.campus_verification_status
								}
								src={
									"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/approved.svg"
								}
								alt=""
							/>
						</UploadButton>
					) : user_profile.campus_verification_status ===
							"pending" ||
					  subscriptionDiscountStatus === "pending" ? (
						<Pending>
							<UploadButton
								status={
									user_profile.campus_verification_status
								}
								pending={
									subscriptionDiscountStatus ===
										"pending" && true
								}
							>
								<ButtonText
									status={
										user_profile.campus_verification_status
									}
									pending={
										subscriptionDiscountStatus ===
											"pending" && true
									}
								>
									pending
								</ButtonText>
								<ButtonIcon
									status={
										user_profile.campus_verification_status
									}
									src={
										"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/pending.svg"
									}
									alt=""
								/>
							</UploadButton>
							<Refresh onClick={refreshPage}>
								<RefreshIcon
									status={
										user_profile.campus_verification_status
									}
									pending={
										subscriptionDiscountStatus ===
											"pending" && true
									}
									src={
										"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/solid.svg"
									}
									alt=""
								/>
								Refresh
							</Refresh>
						</Pending>
					) : user_profile.campus_verification_status ===
					  "rejected" ? (
						<UploadButton
							status={
								user_profile.campus_verification_status
							}
							onClick={handleIdUploadModal}
						>
							<ButtonText
								status={
									user_profile.campus_verification_status
								}
							>
								ID Card Rejected Reupload
							</ButtonText>
						</UploadButton>
					) : !isLogin ? (
						<UploadButton
							status={
								user_profile.campus_verification_status
							}
							onClick={handleIdUploadModal}
						>
							<ButtonText
								status={
									user_profile.campus_verification_status
								}
							>
								Upload ID Card
							</ButtonText>
							<ButtonIcon
								status={
									user_profile.campus_verification_status
								}
								src={
									"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/plan-change-upload.svg"
								}
								alt=""
							/>
						</UploadButton>
					) : user_data.signup_type === "other" ? null : (
						<SigninButton
							to={`${location.pathname}?action=login`}
						>
							<ButtonText
								status={
									user_profile.campus_verification_status
								}
							>
								Upload ID card
							</ButtonText>
							<ButtonIcon
								status={
									user_profile.campus_verification_status
								}
								src={
									"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/plan-change-upload.svg"
								}
								alt=""
							/>
						</SigninButton>
					)}
					<ImageCover>
						<img
							src={
								"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/plan-change-plans-image.svg"
							}
							alt=""
						/>
					</ImageCover>
				</LeftContainer>
				<RightContainer ref={pricingRef}>
					{!is_explore || is_techschooling || isLogin ? (
						<LabelCover>
							{" "}
							<StudentTypeCover>
								<StudentLabels
									onClick={() =>
										setStudentType("School")
									}
									type={"School"}
									selected={studentType}
								>
									School Students
								</StudentLabels>
								<StudentLabels
									onClick={() =>
										setStudentType("Campus")
									}
									type={"Campus"}
									selected={studentType}
								>
									Campus Students
								</StudentLabels>
								<StudentLabels
									onClick={() =>
										setStudentType("Graduates")
									}
									type={"Graduates"}
									selected={studentType}
								>
									Graduates
								</StudentLabels>
								<Label type={studentType}></Label>
							</StudentTypeCover>
						</LabelCover>
					) : null}

					<SubcriptionProgramTitle>
						A program specially designed for <br />
						<span>{student}</span>
					</SubcriptionProgramTitle>
					{isLoading ? (
						<Lottie
							options={dataLoader}
							height={250}
							width={"100%"}
						/>
					) : is_techschooling ? (
						renderDashboardPlan()
					) : user_data &&
					  user_data.is_verified &&
					  user_data.signup_type !== "other" ? (
						<SubscriptionProgramPlans>
							{subPlans.map((data) => (
								<PlanCard
									key={data.id}
									onClick={() =>
										setSelectedPlan(data.id)
									}
									id={data.id}
									selectedPlan={selectedPlan}
								>
									<Left>
										<Select
											id={data.id}
											selectedPlan={
												selectedPlan
											}
										>
											{data.id ===
												selectedPlan && (
												<small></small>
											)}
										</Select>
										<Pricing
											status={
												user_profile.campus_verification_status
											}
										>
											&#8377;{" "}
											{data.coins *
												data.coin_value}
											{user_profile.campus_verification_status ===
											"approved" ? (
												<p>
													&#8377;{" "}
													{data.coins *
														data.coin_value *
														2}
												</p>
											) : null}
										</Pricing>
									</Left>
									{user_profile.campus_verification_status ===
									"approved" ? (
										<Discount>50% off</Discount>
									) : (
										<Middle
											onClick={() =>
												setModal(true)
											}
										>
											<GetThis>
												<GetThisText>
													Get this for
												</GetThisText>
												<GetThisNum>
													₹{" "}
													{(data.coins *
														data.coin_value) /
														2}
												</GetThisNum>
											</GetThis>
											<Terms>
												* Terms and conditions
												apply
											</Terms>
										</Middle>
									)}
									<Validity>
										{data.days === 365
											? "1 year"
											: data.days === 180
											? "6 months"
											: data.days === 90
											? "3 months"
											: data.days === 30
											? "1 month"
											: null}
									</Validity>
								</PlanCard>
							))}
						</SubscriptionProgramPlans>
					) : (
						<SubscriptionProgramPlans>
							{subPlans
								.filter(
									(plans) =>
										plans.name === studentType
								)
								.map((data) =>
									data.plans.map((data) => (
										<PlanCard
											key={data.id}
											onClick={() =>
												setSelectedPlan(
													data.id
												)
											}
											id={data.id}
											selectedPlan={
												selectedPlan
											}
										>
											<Left>
												<Select
													id={data.id}
													selectedPlan={
														selectedPlan
													}
												>
													{data.id ===
														selectedPlan && (
														<small></small>
													)}
												</Select>
												<Pricing
													status={
														user_profile.campus_verification_status
													}
												>
													&#8377;{" "}
													{data.coins *
														data.coin_value}
												</Pricing>
												{user_profile.campus_verification_status ===
												"approved" ? (
													<Discount>
														50% off
													</Discount>
												) : null}
											</Left>
											<Middle
												onClick={() =>
													setModal(true)
												}
											>
												<GetThis>
													<GetThisText>
														Get this for
													</GetThisText>
													<GetThisNum>
														₹{" "}
														{(data.coins *
															data.coin_value) /
															2}
													</GetThisNum>
												</GetThis>
												<Terms>
													* Terms and
													conditions apply
												</Terms>
											</Middle>
											<Validity>
												{data.days === 365
													? "1 year"
													: data.days ===
													  180
													? "6 months"
													: data.days === 90
													? "3 months"
													: data.days === 30
													? "1 month"
													: null}
											</Validity>
										</PlanCard>
									))
								)}
						</SubscriptionProgramPlans>
					)}
					{is_techschooling &
					(studentType !== userStudentType) ? (
						<ProceedButton
							className="students"
							label={true}
						>{`For ${
							studentType === "Graduates"
								? "Graduate & Other"
								: `${studentType} students`
						} `}</ProceedButton>
					) : isLogin ? (
						<ProceedButton
							to={
								user_data.signup_type === "other"
									? `${location.pathname}?action=techschooling`
									: `${location.pathname}subscribe/`
							}
						>
							{user_data.signup_type === "other"
								? "Join With Steyp's Tech Schooling"
								: "Proceed to Login"}
						</ProceedButton>
					) : user_profile.campus_verification_status !==
					  "pending" ? (
						selectedPlan ? (
							<ProceedButton
								to={
									user_data &&
									user_data.access_token
										? `${location.pathname}?action=subscribe&status=confirm&plan=${selectedPlan}`
										: `${location.pathname}?action=login`
								}
							>
								Proceed to Pay
							</ProceedButton>
						) : (
							<ProceedButton>Loading...</ProceedButton>
						)
					) : user_profile.campus_verification_status ===
					  "pending" ? (
						<ProceedButton label={true}>
							Verification is pending. Will be completed
							soon.
						</ProceedButton>
					) : null}
				</RightContainer>
			</Container>
			<Features />
		</>
	);
};
export default NewSubscriptionPlans;

const Container = styled.section`
	background: linear-gradient(180deg, #ffffff, #f2fcf6);
	display: grid;
	grid-template-columns: 3fr 4fr;
	padding-bottom: 50px;
	transition: all 0.4s ease;
	@media all and (max-width: 1200px) {
		grid-template-columns: 3fr 5fr;
	}
	@media all and (max-width: 980px) {
		display: block;
	}
	@media all and (max-width: 480px) {
		padding-bottom: 30px;
	}
	@media all and (max-width: 360px) {
		margin: 0 -20px;
		padding: 0 20px 30px;
	}
`;
const LeftContainer = styled.div`
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	@media all and (max-width: 1100px) {
		padding-left: 20px;
	}
	@media all and (max-width: 980px) {
		margin-bottom: 50px;
		padding-left: 0px;
	}
	@media all and (max-width: 480px) {
		margin-bottom: 30px;
	}
	h2 {
		font-family: gordita_medium;
		max-width: 300px;
		margin: 0 auto;
		font-size: 32px;
		text-align: center;
		margin-bottom: -5px;
		line-height: 40px;
		text-transform: capitalize;
		color: #2b3847;
		@media all and (max-width: 980px) {
			max-width: 350px;
			font-size: 28px;
		}
		@media all and (max-width: 480px) {
			font-size: 24px;
		}
	}
`;
const BoxTitle = styled.h1`
	font-family: gordita_medium;
	width: 90%;
	margin: 0 auto;
	font-size: 28px;
	text-align: center;
	margin-bottom: 15px;
	/* line-height: 40px; */
	/* text-transform: capitalize; */
	color: #2b3847;
	span {
		color: #0fa76f;
		margin-right: 5px;
	}
	@media all and (max-width: 980px) {
		width: 80%;
		font-size: 26px;
	}
	@media all and (max-width: 480px) {
		width: 100%;
		font-size: 16px;
		margin-bottom: 5px;
	}
`;
const UploadButton = styled.div`
	display: inline-flex;
	justify-content: center;
	border: 2px dashed
		${(props) =>
			props.pending === true
				? "#f5ad42"
				: props.status === "pending"
				? "#f5ad42"
				: props.status === "approved"
				? "#4168ea"
				: props.status === "rejected"
				? "#ed3833"
				: "#0ea76f"};
	padding: 8px 32px;
	border-radius: 6px;
	cursor: ${(props) =>
		props.status === "not_applied" || props.status === "rejected"
			? "pointer"
			: "default"};
	margin: ${(props) =>
		props.status === "pending" || props.pending === true
			? "0"
			: "0 auto"};
	max-width: 200px;
	@media all and (max-width: 480px) {
		padding: 4px 24px;
	}
`;
const SigninButton = styled(Link)`
	display: inline-flex;
	justify-content: center;
	border: 2px dashed #0ea76f;
	padding: 8px 32px;
	border-radius: 9px;
	cursor: pointer;
	margin: 0 auto;
	margin-top: 30px;
	max-width: 200px;
`;
const ButtonText = styled.span`
	font-size: 12px;
	font-family: gordita_medium;
	color: ${(props) =>
		props.pending === true
			? "#f5ad42"
			: props.status === "pending"
			? "#f5ad42"
			: props.status === "approved"
			? "#4168ea"
			: props.status === "rejected"
			? "#ed3833"
			: "#0ea76f"};
	margin-right: 15px;
`;
const ButtonIcon = styled.img`
	display: block;
	width: 18px;
`;
const ImageCover = styled.div`
	display: block;
	width: 100%;
	max-width: 300px;
	margin: 0 auto;
	margin-top: 30px;
	img {
		display: block;
		width: 100%;
	}
	@media all and (max-width: 480px) {
		display: none;
	}
`;

const RightContainer = styled.div`
	padding: 0 50px;
	@media all and (max-width: 1100px) {
		padding: 0 15px;
	}
	@media all and (max-width: 980px) {
		padding: 0 50px;
	}
	@media all and (max-width: 640px) {
		padding: 0 10px;
	}
	@media all and (max-width: 480px) {
		padding: 0 5px;
	}
	@media all and (max-width: 360px) {
		padding: 0;
	}
`;
const LabelCover = styled.div`
	padding: 5px;
	box-shadow: 0 16px 24px rgb(0 0 0 / 10%);
	border-radius: 35px;
	margin-bottom: 40px;
	@media all and (max-width: 480px) {
		padding: 3px;
		margin-bottom: 30px;
	}
`;
const StudentTypeCover = styled.div`
	position: relative;
	height: 50px;
	border-radius: 35px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	overflow: hidden;
	z-index: 9;
	@media all and (max-width: 1100px) {
		height: 38px;
	}
	@media all and (max-width: 980px) {
		height: 50px;
	}
	@media all and (max-width: 640px) {
		height: 35px;
	}
	@media all and (max-width: 480px) {
		height: 30px;
	}
`;
const StudentLabels = styled.div`
	width: 33.3%;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: gordita_medium;
	font-size: 14px;
	color: ${(props) =>
		props.type === props.selected ? "#fff" : null};
	transition: all 0.4s ease-in-out;
	@media all and (max-width: 1100px) {
		font-size: 12px;
	}
	@media all and (max-width: 980px) {
		font-size: 16px;
	}
	@media all and (max-width: 640px) {
		font-size: 12px;
	}
	@media all and (max-width: 480px) {
		font-size: 10px;
	}
	@media all and (max-width: 360px) {
		font-size: 8px;
	}
`;
const Label = styled.span`
	position: absolute;
	display: inline-block;
	width: 33.3%;
	height: 98%;
	top: 0;
	left: ${(props) =>
		props.type === "School"
			? "0%"
			: props.type === "Campus"
			? "33.3%"
			: props.type === "Graduates"
			? "66.6%"
			: null};
	background-color: #56c082;
	border-radius: 35px;
	z-index: -1;
	transform: translateX();
	transition: all 0.4s ease-in-out;
`;
const SubcriptionProgramTitle = styled.h3`
	color: #646b78;
	font-size: 22px;
	text-align: center;
	font-family: gordita_regular;
	margin-bottom: 40px;
	@media all and (max-width: 640px) {
		font-size: 18px;
	}
	span {
		color: #56c082;
		font-family: gordita_medium;
	}
	@media all and (max-width: 360px) {
		font-size: 14px;
		margin-bottom: 20px;
	}
`;
const SubscriptionProgramPlans = styled.div`
	margin-bottom: 30px;
`;
const PlanCard = styled.div`
	width: 100%;
	cursor: pointer;
	border-radius: 5px;
	background-color: #fff;
	box-shadow: 0 4px 24px rgb(0 0 0 / 16%);
	padding: 10px 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
	transition: all 0.4s ease-in-out;
	position: relative;
	border: ${(props) =>
		props.id === props.selectedPlan
			? "2px solid #56c082 "
			: "2px solid #fff "};
	transition: all 0.3s ease-in-out;
	&:hover {
		border: 2px solid #56c082;
	}
	@media all and (max-width: 640px) {
		hover {
			border: 2px solid #fff;
		}
	}
	@media all and (max-width: 520px) {
		padding: 10px 5px;
	}
`;
const Left = styled.span`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const Validity = styled.span`
	display: block;
	width: 85px;
	text-align: right;
	font-family: gordita_medium;
	color: #646b78;
	font-size: 16px;
	@media all and (max-width: 640px) {
		font-size: 16px;
		width: 80px;
	}
	@media all and (max-width: 480px) {
		font-size: 12px;
		width: 60px;
	}
	@media all and (max-width: 360px) {
		font-size: 12px;
	}
`;
const Select = styled.span`
	width: 18px;
	height: 18px;
	border-radius: 50%;
	border: ${(props) =>
		props.id === props.selectedPlan
			? "1px solid #56c082 "
			: "1px solid #646b78 "};
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 20px;
	small {
		background-color: #56c082;
		width: 12px;
		height: 12px;
		display: block;
		border-radius: 50%;
	}
	@media all and (max-width: 440px) {
		/* display: none; */
	}
	@media all and (max-width: 640px) {
		margin-right: 10px;
	}
`;

const Pricing = styled.h4`
	font-size: 18px;
	font-family: gordita_medium;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: ${(props) =>
		props.status === "approved" &&
		props.selected === props.studentType
			? "160px"
			: "93px"};
	@media all and (max-width: 1100px) {
		font-size: 16px;
		margin-right: 20px;
		width: ${(props) =>
			props.status === "approved" &&
			props.selected === props.studentType
				? "135px"
				: "75px"};
	}
	@media all and (max-width: 980px) {
		font-size: 18px;
		width: ${(props) =>
			props.status === "approved" &&
			props.selected === props.studentType
				? "160px"
				: "90px"};
	}
	@media all and (max-width: 640px) {
		font-size: 16px;
		margin-right: 5px;
		width: ${(props) =>
			props.status === "approved" &&
			props.selected === props.studentType
				? "125px"
				: "75px"};
	}
	@media all and (max-width: 480px) {
		font-size: 13px;
		margin-right: 0;
		width: ${(props) =>
			props.status === "approved" &&
			props.selected === props.studentType
				? "112px"
				: "65px"};
	}
	@media all and (max-width: 370px) {
		font-size: 11px;

		width: ${(props) =>
			props.status === "approved" &&
			props.selected === props.studentType
				? "100px"
				: "55px"};
	}

	p {
		color: #646b78;
		font-size: 12px;
		text-decoration: line-through;
		font-family: gordita_regular;
		margin-left: 10px;
		@media all and (max-width: 1100px) {
			font-size: 12px;
			margin-left: 8px;
		}
		@media all and (max-width: 980px) {
			font-size: 14px;
			margin-left: 10px;
		}
		@media all and (max-width: 1100px) {
			font-size: 12px;
			margin-left: 8px;
		}
	}
`;

const Discount = styled.span`
	display: inline-block;
	padding: 5px 10px;
	background-color: #fff4d7;
	color: #e8983c;
	font-family: gordita_medium;
	border-radius: 3px;
	@media all and (max-width: 640px) {
		font-size: 14px;
	}
	@media all and (max-width: 480px) {
		font-size: 10px;
	}
	@media all and (max-width: 360px) {
		font-size: 8px;
	}
`;
const GetThis = styled.div`
	display: inline-flex;
	left: 0;
	right: 0;
	align-items: center;
	background-color: #ecf7f3;
	padding: 2px 12px;
	border-radius: 6px;
	@media all and (max-width: 440px) {
		padding: 2px 8px;
	}
`;
const GetThisText = styled.span`
	font-size: 12px;
	font-family: gordita_medium;
	color: #0fa76f;
	@media all and (max-width: 440px) {
		font-size: 11px;
	}
	@media all and (max-width: 360px) {
		font-size: 10px;
	}
	@media all and (max-width: 330px) {
		font-size: 8px;
	}
`;
const GetThisNum = styled.span`
	font-size: 17px;
	font-family: gordita_medium;
	color: #0fa76f;
	margin-left: 5px;
	@media all and (max-width: 440px) {
		font-size: 13px;
	}
	@media all and (max-width: 360px) {
		font-size: 11px;
	}
`;
const Middle = styled.div``;
const Terms = styled.p`
	font-size: 11px;
	text-align: center;

	font-family: gordita_regular;
	color: #373e4f;
	margin-top: 3px;
	@media all and (max-width: 400px) {
		font-size: 8px;
	}
	@media all and (max-width: 360px) {
		font-size: 7px;
	}
`;
const TermsMain = styled.p`
	font-size: 12px;
	margin-bottom: 30px;
	text-align: center;
	font-family: gordita_medium;
	color: #373e4f;
	margin-top: 3px;
	cursor: pointer;
	@media all and (max-width: 360px) {
		margin-bottom: 20px;
	}
`;
const ProceedButton = styled(Link)`
	width: 100%;
	height: 50px;
	max-width: ${(data) => (data.label ? "100%" : "300px")};
	margin: 0 auto;
	background-color: ${(data) =>
		data.label ? "#dbf5e6" : "#56c082"};
	display: flex;
	align-items: center;
	text-align: center;
	justify-content: center;
	color: ${(data) => (data.label ? "#56c082" : "#fff")};
	font-family: gordita_medium;
	border-radius: 5px;
	cursor: ${(data) => (data.label ? "default" : "pointer")};
	border: ${(data) => (data.label ? "1px solid #56c082" : null)};
	&.students {
		cursor: default;
	}
	@media all and (max-width: 440px) {
		font-size: ${(data) => (data.label ? "14px" : "16px")};
	}
	@media all and (max-width: 360px) {
		font-size: ${(data) => (data.label ? "12px" : "16px")};
	}
	&:hover {
		opacity: 0.8;
	}
`;
const Overlay = styled.div`
	background-color: rgba(184, 198, 199, 0.5);
	position: fixed;
	left: 0;
	top: 0px;
	width: 100%;
	height: 100vh;
	cursor: pointer;
`;
const BackContainer = styled.div`
	position: fixed;
	transition: 0.3s;
	transform: scale(0, 0);
	width: 100%;
	height: 100vh;
	z-index: 1000;
	left: 0;
	top: 0;
`;
const ModalContainer = styled.div`
	background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/plan-change-background.svg");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 100% 100%;
	background-color: #fcfcfc;
	border-radius: 7px;
	padding: 35px 20px 20px 25px;
	opacity: 1;
	width: 650px;
	max-height: 95vh;
	margin: 0 auto;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	position: absolute;
	transition: 0.5s;
	z-index: 101;
	@media (max-width: 768px) {
		padding: 20px 15px 10px 20px;
		width: 550px;
	}
	@media (max-width: 640px) {
		padding: 10px 15px 5px 15px;
		width: 425px;
	}
	@media (max-width: 480px) {
		width: 320px;
	}
	@media (max-width: 360px) {
		width: 280px;
	}
`;
const ModalTitle = styled.h2`
	font-size: 24px;
	font-family: "gordita_medium";
	margin-bottom: 20px;
`;
const TermsModal = styled.p`
	display: flex;
	/* align-items: center; */
	margin-bottom: 10px;
	color: #000;
	@media all and (max-width: 440px) {
		font-size: 14px;
	}
`;
const Dot = styled.span`
	display: block;
	width: 15px;
	height: 15px;
	min-width: 15px;
	min-height: 15px;
	background-color: #56c082;
	border-radius: 50%;
	margin-right: 10px;
	transform: translate(0px, 4px);
	img {
		display: block;
		width: 100%;
	}
`;
const Close = styled.span`
	position: absolute;
	cursor: pointer;
	top: 0;
	right: -30px;
	display: block;
	width: 20px;
	height: 20px;
	@media all and (max-width: 640px) {
		top: 10px;
		right: 10px;
	}
`;
const CloseIcon = styled.img`
	display: block;
	width: 100%;
`;
const Pending = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Refresh = styled.span`
	display: flex;
	align-items: center;
	color: #3991f7;
	margin-left: 10px;
	cursor: pointer;
	font-family: gordita_regular;
	&:hover {
		opacity: 0.8;
	}
`;
const RefreshIcon = styled.img`
	display: block;
	width: 15px;
	margin-right: 10px;
	transform: translateY(-2px);
`;
