import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { serverConfig } from "../../../../../axiosConfig";
import SignupLoader from "../general/loaders/SignupLoader";

export default function SubscriptionDiscountStatus({
	is_dashboard,
	is_subscribe,
	is_Res,
}) {
	const [isLoading, setLoading] = useState(true);
	const user_data = useSelector((state) => state.user_data);
	// const status = useSelector((state) => state.subscriptionDiscountStatus);
	const status = "";
	const [reject_reason, setRejectReason] = useState(
		"The uploaded ID card is not valid. Kindly re-upload your ID card"
	);

	const dispatch = useDispatch();
	const handleIdUploadModal = () => {
		dispatch({
			type: "TOGGLE_STUDENT_UPLOAD_MODAL",
		});
	};

	useEffect(() => {
		fetchStudentPlans();
	}, []);

	const fetchStudentPlans = () => {
		let { access_token } = user_data;

		serverConfig
			.get("api/v1/users/student/campus-verification-status/", {
				headers: { Authorization: `Bearer ${access_token}` },
			})
			.then((response) => {
				setLoading(false);
				const { status_code, data } = response.data;
				if (status_code === 6000) {
					dispatch({
						type: "UPDATE_SUBSCRIPTION_DISCOUNT_STATUS",
						subscriptionDiscountStatus: data.status,
					});
					setRejectReason(data.reject_reason);
				} else if (status_code === 6001) {
				}
			})
			.catch((error) => {});
	};

	if (isLoading) {
		return (
			<LoaderContainer>
				<SignupLoader />
			</LoaderContainer>
		);
	} else {
		return (
			<Container
				className="anim-fade"
				is_Res={is_Res}
				is_dashboard={is_dashboard}
				status={status}
				is_subscribe={is_subscribe}
				background={
					status === "approved"
						? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/subscription/subscriptionStatusBg.svg"
						: status === "rejected"
						? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/subscription/redBg.svg"
						: status === "pending"
						? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/subscription/orangeBg.svg"
						: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/subscription/blueBg.svg"
				}
			>
				{status === "approved" ? (
					<>
						<Title
							status={status}
							is_dashboard={is_dashboard}
						>
							Hurray !!!
						</Title>
						<Description
							status={status}
							is_dashboard={is_dashboard}
						>
							You are eligible for the student plan
						</Description>
						<LabelButton
							is_dashboard={is_dashboard}
							status={status}
						>
							Student plan activated
						</LabelButton>
						<BackgroundImage
							is_dashboard={is_dashboard}
							is_subscribe={is_subscribe}
							status={status}
							src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/subscription/eligible.svg"
						/>
					</>
				) : status === "rejected" ? (
					<>
						<TitleContent
							status={status}
							is_dashboard={is_dashboard}
						>
							Your request for student plan has been
							rejected
						</TitleContent>
						<Description
							is_dashboard={is_dashboard}
							status={status}
							is_Res={is_Res}
							is_sub_res
						>
							{reject_reason}
						</Description>
						<Button
							status={status}
							is_dashboard={is_dashboard}
							is_subscribe={is_subscribe}
							onClick={handleIdUploadModal}
						>
							Update
						</Button>
						<BackgroundImage
							is_dashboard={is_dashboard}
							status={status}
							src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/subscription/rejected-vector.svg"
						/>
					</>
				) : status === "pending" ? (
					<>
						<TitleContent
							is_dashboard={is_dashboard}
							is_Res={is_Res}
							status={status}
							is_Res={true}
						>
							You have applied for student plan
						</TitleContent>

						<Description
							is_dashboard={is_dashboard}
							status={status}
							is_Res={is_Res}
							is_sub_res
						>
							Your application for the student plan is
							being processed
						</Description>
						<BackgroundImage
							is_dashboard={is_dashboard}
							status={status}
							is_sub_res
							is_Res={is_Res}
							src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/subscription/loading.svg"
						/>
					</>
				) : (
					<>
						<TitleContent is_dashboard={is_dashboard}>
							Upload your Student ID Card and get extra
							<TitleSpan is_dashboard={is_dashboard}>
								{" "}
								50%&#160;off
							</TitleSpan>
						</TitleContent>
						<Button
							onClick={handleIdUploadModal}
							status={status}
							is_dashboard={is_dashboard}
						>
							Upload Now
						</Button>
						<BackgroundImage
							is_dashboard={is_dashboard}
							status={status}
							src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/subscription/mica.svg"
						/>
					</>
				)}
			</Container>
		);
	}
}

const LoaderContainer = styled.div`
	min-height: 192px;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Container = styled.div`
	background-image: url(${(props) => props.background});
	background-repeat: no-repeat;
	background-size: cover;
	/* margin-top: ${(props) =>
		props.is_dashboard ? "20px" : "15px"}; */
	background-position: 100% 100%;
	padding: ${(props) =>
		props.is_dashboard && props.is_Res
			? "20px 30px"
			: props.is_dashboard
			? "20px"
			: "30px"};
	min-height: ${(props) => (props.is_dashboard ? "200px" : null)};
	border-radius: 10px;
	position: relative;
	background-color: ${(props) =>
		props.status === "pending"
			? "#fce8ce"
			: props.status === "rejected"
			? "#F6CCCC"
			: props.status === "approved"
			? null
			: "#D2E4FC"};
	/* display: flex;
    flex-direction: column;
    justify-content: space-around; */
	@media all and (max-width: 1280px) {
		padding: ${(props) => (props.is_subscribe ? "20px" : "")};
	}
	@media all and (max-width: 768px) {
		padding: ${(props) => (props.is_subscribe ? "30px" : "")};
	}
	@media all and (max-width: 480px) {
		padding: ${(props) => (props.is_subscribe ? "20px" : "")};
	}
	// @media all and (max-width: 500px) {
	//     padding: 29px 31px;
	// }
	@media all and (max-width: 440px) {
	}
	@media all and (max-width: 360px) {
	}
`;
const TitleContent = styled.h2`
	/* font-family: "baloo_paaji_2semibold"; */

	font-family: gordita_medium;
	font-size: ${(props) =>
		props.is_dashboard && props.status === "rejected"
			? "20px"
			: props.is_dashboard && props.status === "pending"
			? "20px"
			: props.is_dashboard
			? "20px"
			: "20px"};

	line-height: ${(props) => (props.is_dashboard ? "1.6em" : null)};
	color: #343535;
	margin-bottom: 16px;

	@media (max-width: 768px) {
		font-size: 18px;
	}
	@media (max-width: 480px) {
		font-size: 16px;
		margin-bottom: 15px;
	}
`;
const Button = styled.span`
	width: ${(props) =>
		props.is_dashboard && props.status === "rejected"
			? "140px"
			: props.is_dashboard
			? "140px"
			: "140px"};

	padding: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${(props) =>
		props.status === "rejected" ? "#ff0000" : "#365b9b"};
	border-radius: 6px;
	color: #fff;
	/* font-family: "gordita_medium"; */
	font-family: gordita_medium;
	font-size: ${(props) => (props.is_dashboard ? "16px" : "16px")};
	margin-top: 25px;
	cursor: pointer;
	@media all and (max-width: 1280px) {
		margin-top: ${(props) =>
			props.is_subscribe ? "50px" : "50px"};
	}
	@media all and (max-width: 1200px) {
		margin-top: ${(props) =>
			props.is_subscribe ? "23px;" : "23px;"};
	}

	@media all and (max-width: 910px) {
		margin-top: ${(props) =>
			props.is_subscribe ? "40px" : "50px"};
	}
	@media all and (max-width: 480px) {
		margin-top: 26px;
		padding: 4px;
	}
`;
const BackgroundImage = styled.img`
	position: absolute;
	bottom: ${(props) =>
		props.is_dashboard
			? "10px"
			: props.is_dashboard && props.status === "approved"
			? "10px"
			: props.is_dashboard && props.status === "pending"
			? "10px"
			: props.is_dashboard && props.status === "rejected"
			? "unset"
			: "10px"};
	right: ${(props) => (props.is_dashboard ? "10px" : "30px")};
	width: ${(props) =>
		props.is_dashboard
			? "120px"
			: props.is_dashboard && props.status === "approved"
			? "110px"
			: props.is_dashboard && props.status === "pending"
			? "120px"
			: props.is_dashboard && props.status === "rejected"
			? "110px"
			: "120px"};
	z-index: 0;
	@media all and (max-width: 1550px) {
		width: ${(props) =>
			props.is_sub_res
				? "124px"
				: (props.is_subscribe && props.status) === "pending"
				? "124px"
				: props.is_dashboard && props.status === "pending"
				? "124px"
				: "124px"};
		right: ${(props) => (props.is_sub_res ? "0px" : "0px")};
		bottom: -2px;
	}
	@media all and (max-width: 1280px) {
		width: ${(props) =>
			props.is_sub_res
				? "100px"
				: props.is_subscribe
				? "110px"
				: "139px"};
		right: ${(props) => (props.is_sub_res ? "0px" : "0px")};
		bottom: -12px;
	}

	@media all and (max-width: 1130px) {
		width: ${(props) => (props.is_subscribe ? "105px" : "120px")};
		// display: none;
	}
	@media all and (max-width: 900px) {
		width: ${(props) => (props.is_subscribe ? "100px" : "120px")};
	}
	@media all and (max-width: 815px) {
		width: ${(props) => (props.is_subscribe ? "85px" : "95px")};
	}
	@media all and (max-width: 768px) {
		width: ${(props) => (props.is_subscribe ? "140px" : "110px")};
	}
	@media all and (max-width: 690px) {
		width: ${(props) => (props.is_subscribe ? "130px" : "66px")};
	}
	@media all and (max-width: 640px) {
		width: ${(props) => (props.is_subscribe ? "100px" : "120px")};
	}

	@media all and (max-width: 440px) {
		display: none;
	}
`;
const Title = styled.h3`
	font-size: 30px;
	/* font-family: "baloo_paaji_2semibold"; */

	font-family: gordita_medium;
	margin-bottom: 10px;
	@media all and (max-width: 1280px) {
		font-size: 28px;
	}
	@media all and (max-width: 980px) {
		font-size: ${(props) =>
			props.is_dashboard && props.status === "approved"
				? "28px"
				: "36px"};
	}
	@media all and (max-width: 480px) {
	}
`;
const TitleSpan = styled.span`
	color: #365b9b;
	font-size: ${(props) => (props.is_dashboard ? "24px" : "28px")};
	/* font-family: "baloo_paaji_2semibold"; */
	font-family: gordita_bold;
	margin-left: 8px;
	@media all and (max-width: 1280px) {
		font-size: 24px;
	}
	@media all and (max-width: 400px) {
		font-size: 20px;
	}
`;
const Description = styled.p`
	font-size: ${(props) =>
		props.is_dashboard && props.status === "approved"
			? "16px"
			: props.is_Res && props.status === "pending"
			? "16px"
			: props.is_dashboard && props.status === "pending"
			? "14px"
			: "16px"};
	color: #343535;
	/* font-family: "gordita_medium"; */
	font-family: gordita_medium;
	font-size: 16px;
	max-width: ${(props) =>
		props.is_sub_res && props.status === "pending"
			? "210px"
			: props.is_dashboard && props.status === "pending"
			? "210px"
			: "300px"};
	@media all and (max-width: 920px) {
		max-width: ${(props) =>
			props.is_sub_res && props.status === "pending"
				? "210px"
				: props.is_dashboard && props.status === "pending"
				? "210px"
				: "250px"};
	}
	@media all and (max-width: 550px) {
		max-width: 90%;
	}
	@media all and (max-width: 440px) {
		max-width: unset;
	}
	@media all and (max-width: 440px) {
		font-size: 16px;
	}
	@media all and (max-width: 360px) {
		font-size: 15px;
		margin-top: 10px;
	}
`;
const LabelButton = styled.p`
	padding: ${(props) =>
		props.is_dashboard && props.status === "approved"
			? "8px 12px"
			: "10px 15px"};
	width: 200px;
	background-color: #c2ecdc;
	text-align: center;
	font-size: ${(props) =>
		props.is_dashboard && props.status === "approved"
			? "14px"
			: "13px"};
	margin-top: 30px;
	/* font-family: "gordita_medium"; */
	font-family: gordita_medium;
	color: #4caa71;
	border-radius: 5px;
	@media all and (max-width: 1240px) {
		/* font-size: ${(props) =>
			props.is_dashboard && props.status === "approved"
				? "18px"
				: "16px"};
    } */
		font-size: 14px;
	}
	@media all and (max-width: 768px) {
		/* font-size: ${(props) =>
			props.is_dashboard && props.status === "approved"
				? "15px"
				: "16px"}; */
	}
`;
