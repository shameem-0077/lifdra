import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import colors from "../../../../../../Colors";
import { serverConfig } from "../../../../../../axiosConfig";
import { AssessmentContext } from "../../../../../contexts/stores/AssessmentStore";
import RequestLoader from "../../../authentication/general/RequestLoader";

function mapStateToProps(state) {
	return {
		user_data: state.user_data,
	};
}
const styles = {
	modalContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		width: "100%",
		height: "100%",
		background: "rgba(90, 125, 119, 0.8)",
		zIndex: 200,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	top: {},
	image: {
		display: "block",
		width: "100%",
	},
	contentBox: {
		margin: "20px 0",
	},
	message: {
		width: "50%",
		margin: "0 auto",
		color: "#999",
		fontSize: "18px",
	},
	submitBox: {
		marginTop: "20px",
	},
	cancelButtonText: {
		display: "inline-block",
		padding: "10px 50px",
		background: "#fff",
		color: colors.blueGrey700,
		borderRadius: "40px",
		border: "1px solid",
		borderColor: colors.blueGrey700,
		cursor: "pointer",
	},
	successButtonText: {
		display: "inline-block",
		padding: "10px 50px",
		background: colors.green,
		color: "#fff",
		borderRadius: "40px",
		marginRight: "20px",
		cursor: "pointer",
	},
	idSpan: {
		color: "#0F9D58",
		fontFamily: "product_sansbold",
	},
	right: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
	},
	left: {
		textAlign: "left",
	},
	icon: {
		fontSize: "30px",
		marginLeft: "5px",
	},
};

const AssessmentPopup = ({
	show_modal,
	handle_modal,
	isImprovementTest,
	user_data,
}) => {
	const [question, setQuestion] = useState({});
	const { assessmentState, assessmentDispatch } =
		useContext(AssessmentContext);

	const sendFirstQuestion = (e) => {
		let { access_token } = user_data;
		if (isImprovementTest) {
			serverConfig
				.post(
					`assessments/send-first-improvement-question/${assessmentState.assessment.id}/`,
					{},
					{
						headers: {
							Authorization: `Bearer ${access_token}`,
						},
					}
				)
				.then((response) => {
					const { status_code, data } = response.data;
					if (status_code === 6000) {
						assessmentDispatch({
							type: "UPDATE_CURRENT_QUESTION",
							current_question: data,
						});
					}
				})
				.catch((error) => {});
		} else {
			serverConfig
				.post(
					`assessments/send-first-question/${assessmentState.assessment.id}/`,
					{},
					{
						headers: {
							Authorization: `Bearer ${access_token}`,
						},
					}
				)
				.then((response) => {
					const { status_code, data } = response.data;
					if (status_code === 6000) {
						assessmentDispatch({
							type: "UPDATE_CURRENT_QUESTION",
							current_question: data,
						});
					}
				})
				.catch((error) => {});
		}
	};

	const [start_loading, setStartLoading] = useState(false);
	const startAssessment = (e) => {
		setStartLoading(true);
		let { access_token } = user_data;
		if (isImprovementTest) {
			serverConfig
				.post(
					`/assessments/start-improvement/${assessmentState.assessment.id}/`,
					{},
					{
						headers: {
							Authorization: `Bearer ${access_token}`,
						},
					}
				)
				.then((response) => {
					const { status_code } = response.data;
					if (status_code === 6000) {
						sendFirstQuestion(e);
						setStartLoading(false);
					}
				})
				.catch((error) => {
					setStartLoading(false);
				});
		} else {
			serverConfig
				.post(
					`/assessments/start-assessment/${assessmentState.assessment.id}/`,
					{},
					{
						headers: {
							Authorization: `Bearer ${access_token}`,
						},
					}
				)
				.then((response) => {
					const { status_code } = response.data;
					if (status_code === 6000) {
						sendFirstQuestion(e);
						setStartLoading(false);
					}
				})
				.catch((error) => {
					setStartLoading(false);
				});
		}
	};

	useEffect(() => {
		let question = assessmentState.assessment;
		setQuestion(question);
	}, [assessmentState.assessment]);

	return !show_modal ? null : (
		<div className="modalContainer" style={styles.modalContainer}>
			<ModalContentContainer className="modalContentContainer">
				<Close onClick={handle_modal}>Close</Close>
				<ContentContainer>
					<div className="grid-one " style={styles.top}>
						<div className="left" style={styles.left}>
							<Title>
								<span style={styles.idSpan}>
									#{question.auto_id}
								</span>{" "}
								| {question.title}
							</Title>
						</div>
					</div>
					<ContentBox>
						<Name className="name">
							Hey {user_data.name} !
						</Name>
						<Desc>
							The total duration of this assessment is{" "}
							{question.time_allotted === 1
								? `${question.time_allotted} Hr`
								: `${question.time_allotted} Hrs`}{" "}
							, start your assessment when you are
							ready.
						</Desc>
						{start_loading ? (
							<Button>
								<RequestLoader />
							</Button>
						) : (
							<Button
								onClick={(e) => {
									startAssessment(e);
								}}
							>
								Start
								<i
									className="las la-long-arrow-alt-right"
									style={styles.icon}
								></i>
							</Button>
						)}
					</ContentBox>
				</ContentContainer>
			</ModalContentContainer>
		</div>
	);
};

const Close = styled.span`
	position: absolute;
	top: -24px;
	right: 0px;
	color: #fff;
	cursor: pointer;
`;
const Title = styled.h3`
	font-family: "gordita_medium";
	font-size: 25px;
	margin-bottom: 20px;
	line-height: 40px;
	@media only screen and (max-width: 1500px) {
		font-size: 23px;
	}
	@media only screen and (max-width: 1450px) {
		font-size: 21px;
	}
	@media only screen and (max-width: 480px) {
		margin: 0;
	}
`;
// const Time = styled.span`
//     font-size: 22px;
//     font-family: product_sansbold;
//     color: #008000;
//     @media only screen and (max-width: 1500px) {
//         font-size: 20px;
//     }
//     @media only screen and (max-width: 1450px) {
//         font-size: 18px;
//     }
// `;
const Name = styled.h2`
	font-size: 32px;
	font-family: gordita_regular;
	@media only screen and (max-width: 1500px) {
		font-size: 30px;
	}
	@media only screen and (max-width: 1450px) {
		font-size: 28px;
	}
	@media only screen and (max-width: 768px) {
		font-size: 26px;
	}
`;
const Desc = styled.p`
	font-size: 22px;
	font-family: gordita_regular;
	color: rgb(109, 109, 109);
	margin: 20px 0px;
	@media only screen and (max-width: 1500px) {
		font-size: 20px;
	}
	@media only screen and (max-width: 1450px) {
		font-size: 18px;
	}
	@media only screen and (max-width: 640px) {
		font-size: 16px;
	}
	@media only screen and (max-width: 360px) {
		font-size: 14px;
		margin: 10px 0px;
	}
`;
const Button = styled.small`
	cursor: pointer;
	background-color: rgb(72, 158, 88);
	color: rgb(255, 255, 255);
	font-family: "gordita_medium";
	padding: 0 38px;
	width: 150px;
	height: 48px;
	border-radius: 34px;
	font-size: 22px;
	display: flex;
	align-items: center;
	@media only screen and (max-width: 1500px) {
		font-size: 20px;
	}
	@media only screen and (max-width: 1450px) {
		font-size: 18px;
	}
	@media only screen and (max-width: 360px) {
		padding: 5px 20px;
		width: 114px;
	}
`;
const ModalContentContainer = styled.div`
	background: #fff;
	width: 75%;
	text-align: center;
	padding: 75px 50px;
	border-radius: 5px;
	border: 1px solid;
	border-color: #fff;
	display: flex;
	justify-content: center;
	position: relative;

	@media only screen and (max-width: 1280px) {
		width: 80%;
		text-align: center;
		padding: 50px;
	}
	@media only screen and (max-width: 980px) {
		width: 90%;
		padding: 30px;
	}
	@media only screen and (max-width: 480px) {
		padding: 15px;
	}
`;
const ContentContainer = styled.div`
	width: 70%;
	@media only screen and (max-width: 980px) {
		width: 80%;
	}
	@media only screen and (max-width: 640px) {
		width: 100%;
	}
`;
const ContentBox = styled.div`
	border: 1px solid #d3d3d3;
	border-radius: 10px;
	padding: 65px;
	display: flex;
	flex-direction: column;
	align-items: center;
	@media only screen and (max-width: 640px) {
		padding: 25px;
	}
	@media only screen and (max-width: 480px) {
		margin-top: 10px;
	}
	@media only screen and (max-width: 360px) {
		padding: 10px 5px;
	}
`;

export default connect(mapStateToProps)(AssessmentPopup);
