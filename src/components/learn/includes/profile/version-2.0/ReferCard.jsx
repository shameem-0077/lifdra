import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	ToastsContainer,
	ToastsStore,
	ToastsContainerPosition,
} from "react-toasts";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { WhatsappShareButton } from "react-share";
// import Background from "../../../../../assets/images/referback.png";

function ReferCard({
	is_coins,
	is_dashboard,
	is_profile,
	is_explore,
}) {
	const { user_profile, userSubscriptionType } = useSelector(
		(state) => state
	);
	const [isHover, setHover] = useState(false);
	const [copySuccess, setCopySuccess] = useState(false);
	const [referralCode, setRefferalCode] = useState();

	const [inviteLink] = useState(
		`Hello!\n\nI'm ${
			user_profile.name
		}, Tech Schooling made coding a lot more easier for me. Start your coding classes by clicking on the link below. \n\nhttps://invite.steyp.com/?r=${
			user_profile.subscription_data
				? user_profile.subscription_data.referral_code
				: ""
		} \n\nHappy coding!`
	);

	// const shareCode = () => {
	//     if (navigator.share) {
	//         navigator
	//             .share({
	//                 title: "Join Steyp Tech Schooling",
	//                 text: `Hello!\n\nI'm ${
	//                     user_profile.name
	//                 }, Tech Schooling made coding a lot more easier for me. Start your coding classes by clicking on the link below. \n\nhttps://invite.steyp.com/?r=${
	//                     user_profile.subscription_data
	//                         ? user_profile.subscription_data.referral_code
	//                         : ""
	//                 } \n\nHappy coding!`,
	//             })
	//             .then(() => console.log("Successful share"))
	//             .catch((error) => console.log("Error sharing", error));
	//     }
	// };

	return (
		<Container
			className="fade-anim"
			is_dashboard={is_dashboard}
			is_coins={is_coins}
			is_profile={is_profile}
			is_explore={is_explore}
		>
			<TopSection is_coins={is_coins} is_profile={is_profile}>
				<Title
					is_dashboard={is_dashboard}
					is_coins={is_coins}
					is_profile={is_profile}
				>
					You can buy product from merchandise with the
					coins you earned on a <NumberTop>10% </NumberTop>
					commission based on the package chosen by your
					referal person
				</Title>
				{/* <Button is_coins={is_coins} is_profile={is_profile}>
                    Explore
                </Button> */}
			</TopSection>

			{userSubscriptionType === "paid_subscription" &&
			user_profile.id ? (
				<>
					<SharingSection>
						<ReferCode>
							<Code>
								{user_profile.subscription_data
									? user_profile.subscription_data
											.referral_code
									: ""}
							</Code>
						</ReferCode>
						<CodeShare>
							<Icons>
								<CopyToClipboard
									text={referralCode}
									onCopy={() => {
										navigator.clipboard.writeText(
											inviteLink
										);
										if (!copySuccess) {
											setCopySuccess(true);
											ToastsStore.success(
												"Copied!"
											);
											setTimeout(() => {
												setCopySuccess(false);
											}, 200);
										}
									}}
								>
									<IconImage
										src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/version-2.0/copy-color.svg"
										alt=""
									/>
								</CopyToClipboard>
								<ToastsContainer
									store={ToastsStore}
									position={
										ToastsContainerPosition.TOP_CENTER
									}
									lightBackground
								/>
							</Icons>
							<Icons>
								<WhatsappShareButton
									url={inviteLink}
									className="social-button"
								>
									<IconImage
										src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/version-2.0/whatsapp-color.svg"
										alt=""
									/>
								</WhatsappShareButton>
							</Icons>
							{/* <Icons onClick={shareCode}>
                                <IconImage
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/version-2.0/share-copy.svg"
                                    alt=""
                                />
                            </Icons> */}
						</CodeShare>
					</SharingSection>
				</>
			) : (
				<SharingSection
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
				>
					<ReferCode>
						<LockCode>XXXXX</LockCode>
						{isHover && (
							<HoverSection>
								<Triangle></Triangle>
								<HoverText>
									To unlock referral token you need
									to subscribe to Steyp
								</HoverText>
							</HoverSection>
						)}
					</ReferCode>
					<CodeShare>
						<Icons>
							<IconImage
								src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/version-2.0/copy.svg"
								alt=""
							/>
						</Icons>
						<Icons>
							<IconImage
								src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/version-2.0/whatsapp.svg"
								alt=""
							/>
						</Icons>
						{/* <Icons>
                            <IconImage
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/version-2.0/share.svg"
                                alt=""
                            />
                        </Icons> */}
					</CodeShare>
				</SharingSection>
			)}
			<Button
				is_coins={is_coins}
				is_profile={is_profile}
				to="/merchandise/"
			>
				Explore
			</Button>
			<ReferImage>
				<Referee
					// src={require("../../../../../assets/images/ReferImage.png")}
					src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/ReferImage.png
                    "
				/>
			</ReferImage>
		</Container>
	);
}

export default ReferCard;
const ReferImage = styled.div`
	// position: absolute;
	position: absolute;
	right: 0;
	bottom: -9px;
	width: 92px;
`;
const Referee = styled.img`
	width: 100%;
	display: block;
`;
const Container = styled.div`
	position: relative;
	padding: 30px;
	// background-image: url();
	background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/referback.png
");
	background-size: 100% 100%;
	background-repeat: no-repeat;
	border-radius: 10px;
	display: flex;
	// align-items: center;
	flex-direction: column;
	flex-wrap: wrap;
	margin-bottom: ${(props) => (props.is_dashboard ? "20px" : null)};
	@media all and (max-width: 1280px) {
		margin-bottom: ${(props) => (props.is_coins ? "30px" : null)};
	}
	@media all and (max-width: 400px) {
		padding: 20px;
	}
`;
const TopSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
	width: 100%;
	@media all and (max-width: 1280px) {
		flex-wrap: ${(props) => (props.is_coins ? "wrap" : "")};
	}
	@media all and (max-width: 400px) {
		flex-wrap: wrap;
	}
`;
const Title = styled.h3`
	// max-width: 230px;
	font-size: 16px;
	font-family: "gordita_medium";
	@media all and (max-width: 1280px) {
		font-size: ${(props) =>
			props.is_dashboard ? "22px" : "18px"};
		// max-width: ${(props) =>
			props.is_dashboard ? "260px" : "230px"};
	}
	@media all and (max-width: 460px) {
		font-size: 18px;
	}
	@media all and (max-width: 400px) {
		font-size: 16px;
	}
`;
const NumberTop = styled.div`
	display: inline-block;
	font-size: 18px;
	margin-left: 3px;
	margin-right: 3px;
	color: green;
	font-family: "gordita_medium";
	@media all and (max-width: 840px) {
		font-size: 17px;
	}
	@media all and (max-width: 768px) {
		font-size: 17px;
		margin-right: 4px;
	}
	@media all and (max-width: 640px) {
		font-size: 17px;
	}
	@media all and (max-width: 360px) {
		margin-left: 0px;
	}
`;
const Button = styled(Link)`
	// width: 130px;
	width: 40%;
	padding: 4px;
	font-size: 16px;
	margin-top: 15px;
	// height: 40px;
	cursor: pointer;
	color: #ffffff;
	background-color: #15bf81;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 8px;
	font-family: "gordita_medium";
	@media all and (max-width: 1280px) {
		margin: ${(props) => (props.is_coins ? "10px 0 " : "")};
	}
	@media all and (max-width: 400px) {
		margin: 10px 0;
	}
	@media all and (max-width: 380px) {
		font-size: 14px;
		width: 110px;
		height: 35px;
	}
`;
const CoinEarn = styled.div`
	background-color: #dce6fc;
	width: 120%;
	padding: 10px 10px 10px 30px;
	margin-left: -30px;
	border-radius: 0 20px 20px 0;
	margin-bottom: 20px;
	@media all and (max-width: 400px) {
		margin-left: -20px;
		padding: 15px 15px 15px 20px;
	}
`;
const EarnTitle = styled.h3`
	font-size: 13px;
	margin-bottom: 10px;
	font-family: "gordita_medium";
`;
const ReferalPackages = styled.div`
	display: grid;
	/* justify-content: space-between;
    align-items: center; */
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 5px;
	@media all and (max-width: 1360px) {
		grid-template-columns: ${(props) =>
			props.is_explore ? "1fr" : "1fr 1fr 1fr"};
	}
	@media all and (max-width: 1280px) {
		grid-template-columns: ${(props) =>
			props.is_coins || props.is_profile
				? "1fr"
				: "1fr 1fr 1fr"};
	}
	@media all and (max-width: 400px) {
		grid-template-columns: 1fr;
		grid-gap: 8px;
	}
`;
const Packages = styled.span`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	padding: 5px 0px;
	border-radius: 8px;
	font-size: 14px;
	background-color: #fff;

	font-family: "gordita_medium";
	@media all and (max-width: 1360px) {
		justify-content: ${(props) =>
			props.is_explore ? "space-between" : "center"};
		flex-wrap: ${(props) =>
			props.is_explore ? "unset" : "wrap"};
		padding: ${(props) => (props.is_explore ? " 5px 10px" : " ")};
	}
	@media all and (max-width: 1280px) {
		justify-content: ${(props) =>
			props.is_coins || props.is_profile
				? "space-between"
				: "center"};
		flex-wrap: ${(props) =>
			props.is_coins || props.is_profile ? "unset" : "wrap"};
		padding: ${(props) =>
			props.is_coins || props.is_profile ? " 5px 10px" : " "};
	}
	@media all and (max-width: 400px) {
		justify-content: space-between;
		flex-wrap: unset;
		padding: ${(props) =>
			props.is_coins || props.is_profile
				? " 5px 10px"
				: " 5px 20px"};
	}
`;
const Coins = styled.img`
	padding: 0 5px;
	transform: translateY(-2px);
	width: 25px;
`;
const TopCoin = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	@media all and (max-width: 1360px) {
		order: ${(props) => (props.is_explore ? "2" : "")};
		justify-content: ${(props) =>
			props.is_explore ? "flex-end" : "center"};
	}
	@media all and (max-width: 1280px) {
		order: ${(props) =>
			props.is_coins || props.is_profile ? "2" : ""};
		justify-content: ${(props) =>
			props.is_coins || props.is_profile
				? "flex-end"
				: "center"};
	}
	@media all and (max-width: 400px) {
		order: 2;
		justify-content: flex-end;
	}
`;
const Label = styled.p`
	font-size: 13px;
	text-align: center;
	width: 100%;
	@media all and (max-width: 1360px) {
		order: ${(props) => (props.is_explore ? "1" : "")};
		text-align: ${(props) =>
			props.is_explore ? "left" : "center"};
	}
	@media all and (max-width: 1280px) {
		order: ${(props) =>
			props.is_coins || props.is_profile ? "1" : ""};
		text-align: ${(props) =>
			props.is_coins || props.is_profile ? "left" : "center"};
	}
	@media all and (max-width: 400px) {
		order: 1;
		text-align: left;
	}
`;
const SharingSection = styled.div`
	display: flex;
	align-items: center;
	// justify-content: center;
`;
const ReferCode = styled.div`
	// width: 30%;
	// height: 35px;
	border: 2px dashed #365b9b;
	border-radius: 6px;
	margin-right: 8px;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5px;
`;
const Code = styled.h3`
	color: #365b9b;
	font-size: 16px;
	height: 16px;
	transform: translateY(
		${(props) => (props.align ? "5px" : "-3px")}
	);
`;
const LockCode = styled.h3`
	color: #365b9b;
	font-size: 16px;
	height: 16px;
	transform: translateY(
		${(props) => (props.align ? "5px" : "-3px")}
	);
`;
const CodeShare = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Icons = styled.span`
	width: 30px;
	margin-right: 8px;
	cursor: pointer;
	display: flex;
	&:last-child {
		margin-right: 0;
		// margin-left: 8px;
	}
`;
const IconImage = styled.img`
	width: 100%;
	display: block;
`;
const HoverSection = styled.div`
	width: 200px;
	height: 50px;
	background-color: #fff;
	padding: 5px;
	position: absolute;
	border-radius: 5px;
	box-shadow: 0 16px 24px rgb(0 0 0 / 7%);
	top: 40px;
	left: -10px;
	z-index: 2;
`;
const HoverText = styled.p`
	font-size: 14px;
	text-align: center;
`;
const Triangle = styled.span`
	width: 0;
	height: 0;
	border-left: 7px solid transparent;
	border-right: 7px solid transparent;
	border-bottom: 9px solid #fff;
	position: absolute;
	top: -7px;
	left: 3px;
`;

const BackImage = styled.img``;
