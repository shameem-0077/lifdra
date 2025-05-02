import { Link } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import { ToastsStore } from "react-toasts";

function Certificate() {
	const truncate = (str) => {
		if (window.innerWidth < 480) {
			if (str) {
				return str.length > 20
					? str.substring(20, 0) + "..."
					: str;
			}
			return " - ";
		}
		if (str) {
			return str.length > 30
				? str.substring(30, 0) + "..."
				: str;
		}
		return " - ";
	};

	const [inviteLink, setInviteLink] = useState("#214586-324852");
	const [copySuccess, setCopySuccess] = useState(null);

	return (
		<MainContainer>
			<CertificateContainer>
				<CertificateDetails>
					<Header>
						<HeadTitle>Course Certificate</HeadTitle>
						<IssueDate>
							<DateText>Issued</DateText>
							<DateNum>20 Aug 2021</DateNum>
						</IssueDate>
					</Header>
					<Description>
						You’ve completed the profession ‘UI
						Engineering’ and have been verified by the
						Steyp authorities.
					</Description>
					<ProfessionCourse>
						<ProBox>
							<ProCourseText>Profession</ProCourseText>
							<ProCourse>UI Engineer</ProCourse>
						</ProBox>
						<CourseBox>
							<ProCourseText>
								Course Completed
							</ProCourseText>
							<ProCourse>18 Aug 2022</ProCourse>
						</CourseBox>
					</ProfessionCourse>
					<IdUrlSection>
						<Title>Certificate ID</Title>
						<Section>
							<Box>
								<IdUrl># 214 589 632 485 214</IdUrl>
							</Box>
							<Button
								onClick={() => {
									navigator.clipboard.writeText(
										inviteLink
									);
									setCopySuccess(!copySuccess);
									ToastsStore.success("Copied!");
									setTimeout(() => {
										setCopySuccess(false);
									}, 2000);
								}}
							>
								Copy ID
							</Button>
						</Section>

						<Title>Certificate URL</Title>
						<Section>
							<Box>
								<IdUrl>
									{truncate(
										"htps://xda.adob.com/view/#214589632485214/"
									)}
								</IdUrl>
							</Box>
							<Button
								onClick={() => {
									navigator.clipboard.writeText(
										inviteLink
									);
									setCopySuccess(!copySuccess);
									ToastsStore.success("Copied!");
									setTimeout(() => {
										setCopySuccess(false);
									}, 2000);
								}}
							>
								Copy Link
							</Button>
						</Section>
					</IdUrlSection>
				</CertificateDetails>
				<CertificateImage>
					<CertificateImg
						src={require("../../../../../assets/images/certificate/certificate.png")}
						alt="Certificate"
					/>
				</CertificateImage>
			</CertificateContainer>
			<BottomContainer>
				<EmptyContainer></EmptyContainer>

				<DownloadButton
					href={
						"../../../../../assets/images/certificate/download.svg"
					}
					download
				>
					<DownloadText>Download Certificate</DownloadText>
					<DownloadIcon
						src={require("../../../../../assets/images/certificate/download.svg")}
						alt="Download"
					/>
				</DownloadButton>
			</BottomContainer>
		</MainContainer>
	);
}
export default Certificate;

const MainContainer = styled.div`
	border: 1px solid #e0e0e0;
	border-radius: 6px;
	padding: 30px 30px 40px;
	@media (max-width: 1440px) {
		padding: 30px;
	}
	@media (max-width: 1280px) {
		padding: 20px;
	}
`;
const CertificateContainer = styled.div`
	display: flex;
	justify-content: space-between;
	@media (max-width: 1280px) {
		align-items: center;
	}
	@media (max-width: 1080px) {
		align-items: flex-end;
	}
	@media (max-width: 980px) {
		flex-direction: column;
		align-items: center;
	}
`;
const CertificateDetails = styled.div`
	width: 57%;
	margin-right: 40px;
	@media (max-width: 1280px) {
		margin-right: 20px;
		width: 62%;
	}
	@media (max-width: 980px) {
		margin-right: 0;
		width: 90%;
		margin-bottom: 30px;
	}
	@media (max-width: 640px) {
		width: 95%;
	}
	@media (max-width: 420px) {
		width: 100%;
	}
`;
const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	@media (max-width: 480px) {
		display: block;
		margin-bottom: 15px;
	}
`;
const HeadTitle = styled.h2`
	font-size: 26px;
	color: #292929;
	font-family: "baloo_paaji_2semibold";
	@media (max-width: 480px) {
		font-size: 23px;
	}
`;
const IssueDate = styled.div`
	display: flex;
	align-items: center;
	@media (max-width: 480px) {
	}
`;
const DateText = styled.p`
	font-size: 17px;
	color: #6a6a6a;
	font-family: "gordita_medium";
	margin-right: 5px;
	@media (max-width: 640px) {
		font-size: 15px;
	}
`;
const DateNum = styled.p`
	font-size: 13px;
	color: #6a6a6a;
	font-style: italic;
`;
const Description = styled.p`
	color: #090909;
	font-size: 16px;
	font-family: "gordita_medium";
	margin: 5px 0 20px;
	max-width: 500px;
	@media (max-width: 480px) {
		font-size: 14px;
		margin: 5px 0 15px;
	}
`;
const ProfessionCourse = styled.div`
	border-bottom: 1px solid #e0e0e0;
	padding-bottom: 10px;
	margin-bottom: 25px;
	display: flex;
	@media (max-width: 1280px) {
		display: block;
	}
	@media (max-width: 980px) {
		display: flex;
	}
	@media (max-width: 640px) {
		display: block;
	}
`;
const ProBox = styled.div`
	margin-right: 30px;
	@media (max-width: 640px) {
		margin-bottom: 5px;
	}
`;
const CourseBox = styled.div``;
const ProCourseText = styled.span`
	font-size: 16px;
	color: #3f3f3f;
	margin-right: 7px;
	font-family: "gordita_medium";
	@media (max-width: 480px) {
		font-size: 15px;
	}
`;
const ProCourse = styled.span`
	color: #0fa76f;
	font-size: 16px;
	font-family: "baloo_paaji_2semibold";
	font-style: italic;
	@media (max-width: 480px) {
		font-size: 15px;
	}
`;
const IdUrlSection = styled.div``;
const Title = styled.h3`
	font-size: 18px;
	font-family: "gordita_medium";
	color: #3e3e3e;
	margin-bottom: 10px;
`;
const Section = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 25px;
	&:last-child {
		margin-bottom: 0;
	}
	@media (max-width: 360px) {
		flex-direction: column;
	}
`;
const Box = styled.div`
	background-color: #f9f9fb;
	padding: 10px 20px;
	border: 1px solid #e0e0e0;
	border-radius: 6px;
	width: 72%;
	@media (max-width: 480px) {
		padding: 7px 14px;
		width: 65%;
	}
	@media (max-width: 360px) {
		width: 100%;
	}
`;
const IdUrl = styled.span`
	font-size: 16px;
	font-family: "gordita_medium";
	@media (max-width: 480px) {
		font-size: 13px;
	}
`;
const Button = styled(Link)`
	background-color: #0fa76f;
	padding: 10px 0;
	width: 25%;
	text-align: center;
	border-radius: 6px;
	font-size: 15px;
	font-family: "gordita_medium";
	color: #fff;
	@media (max-width: 480px) {
		font-size: 13px;
		padding: 7px 0;
		width: 30%;
	}
	@media (max-width: 360px) {
		width: 100%;
		margin-top: 15px;
	}
`;
const CertificateImage = styled.div`
	width: 600px;
	margin-bottom: 35px;
	@media (max-width: 1280px) {
		margin-bottom: 90px;
		width: 500px;
	}
	@media (max-width: 1080px) {
		margin-bottom: 70px;
	}
	@media (max-width: 980px) {
		margin-bottom: 35px;
		width: 90%;
	}
	@media (max-width: 640px) {
		width: 95%;
	}
	@media (max-width: 420px) {
		width: 100%;
	}
`;
const CertificateImg = styled.img`
	display: block;
	width: 100%;
`;
const DownloadButton = styled(Link)`
	background-color: #0fa76f;
	padding: 12px 24px;
	display: inline-block;
	border-radius: 6px;
	@media (max-width: 980px) {
		margin-right: 40px;
	}
	@media (max-width: 640px) {
		margin-right: 10px;
	}
	@media (max-width: 480px) {
		font-size: 13px;
		padding: 7px 14px;
	}
	@media (max-width: 360px) {
		padding: 9px 0;
		width: 100%;
		text-align: center;
	}
`;
const DownloadText = styled.span`
	font-size: 16px;
	font-family: "gordita_medium";
	margin-right: 10px;
	color: #fff;
	@media (max-width: 480px) {
		font-size: 13px;
	}
`;
const DownloadIcon = styled.img`
	width: 15px;
	transform: translate(4px, 4px);
	@media (max-width: 480px) {
		width: 12px;
		transform: translate(0px, 2px);
	}
`;
const EmptyContainer = styled.div``;
const BottomContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	@media (max-width: 360px) {
		display: block;
	}
`;
