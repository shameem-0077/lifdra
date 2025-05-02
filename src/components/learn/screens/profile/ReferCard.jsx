import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import Referback from "../../../../assets/images/cardbacks.svg";
import { WhatsappShareButton } from "react-share";
import { useDispatch, useSelector } from "react-redux";
import {
	ToastsContainer,
	ToastsStore,
	ToastsContainerPosition,
} from "react-toasts";

function ReferCard({
	is_profile,
	is_dashboard,
	is_subscribe,
	is_margin,
	is_techschooling,
	description,
}) {
	const [copySuccess, setCopySuccess] = useState(null);
	const [isHover, setHover] = useState(false);
	const user_profile = useSelector((state) => state.user_profile);

	const dispatch = useDispatch();
	const [inviteLink, setInviteLink] = useState(
		"https://invite.steyp.com/?r="
	);

	useEffect(() => {
		setInviteLink(
			`https://invite.steyp.com/?r=${
				user_profile.subscription_data
					? user_profile.subscription_data.referral_code
					: ""
			}`
		);
	}, [user_profile]);

	const handleInvitationModal = () => {
		dispatch({
			type: "TOGGLE_INVITATION_MODAL",
		});
	};

	const userSubscriptionType = useSelector(
		(state) => state.userSubscriptionType
	);

	return (
		<BlueCardContainer
			is_profile={is_profile}
			is_dashboard={is_dashboard}
			is_subscribe={is_subscribe}
		>
			<BlueCard>
				<TopSet is_subscribe={is_subscribe}>
					<CardHeader is_profile={is_profile}>
						Refer and Earn Coins
					</CardHeader>
					{/* <ExploreButton>Explore</ExploreButton> */}
				</TopSet>
				<BottomSet is_profile={is_profile}>
					<BottomLeft>
						<TokenHead>
							{description
								? description
								: "your referral Code"}
						</TokenHead>
						{userSubscriptionType ===
							"paid_subscription" && user_profile.id ? (
							<BottomDeck>
								<CodeDiv>
									{user_profile.subscription_data &&
										user_profile.subscription_data
											.referral_code}
								</CodeDiv>

								<CopyCard
									onClick={() => {
										navigator.clipboard.writeText(
											inviteLink
										);
										setCopySuccess(!copySuccess);
										ToastsStore.success(
											"Copied!"
										);
										setTimeout(() => {
											setCopySuccess(false);
										}, 1000);
									}}
								>
									<ToastsContainer
										store={ToastsStore}
										position={
											ToastsContainerPosition.TOP_CENTER
										}
										lightBackground
									/>

									<CopyImg
										src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp-images/copy-color.svg"
										alt=""
									/>
								</CopyCard>

								<WAButton
									url={inviteLink}
									className="social-button"
								>
									<ShareImg
										src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp-images/whatsapp-color.svg"
										alt=""
									/>
								</WAButton>
							</BottomDeck>
						) : (
							<LockedDeck
								onMouseEnter={() => setHover(true)}
								onMouseLeave={() => setHover(false)}
							>
								{isHover ? (
									<HoverContain>
										<Triangle></Triangle>
										{userSubscriptionType ===
										"expired_subscription" ? (
											<HoverDetail>
												To view your referral
												code you need to renew
												your subscription
											</HoverDetail>
										) : userSubscriptionType ===
												"trial_end" ||
										  userSubscriptionType ===
												"trial_active" ? (
											<HoverDetail>
												To unlock referral
												code you need
												subscribe to Steyp
											</HoverDetail>
										) : null}
									</HoverContain>
								) : null}

								<CodeDiv>
									<LockCode>*****</LockCode>
								</CodeDiv>

								<CopyCard>
									<CopyImg
										src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp-images/grey-copy.png"
										alt=""
									/>
								</CopyCard>
								<ShareCard>
									<ShareImg
										src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp-images/grey-share.png"
										alt=""
									/>
								</ShareCard>
							</LockedDeck>
						)}
					</BottomLeft>
				</BottomSet>
				{userSubscriptionType === "paid_subscription" && (
					<InviteButton
						onClick={handleInvitationModal}
						is_dashboard={is_dashboard}
						is_margin={is_margin}
						is_techschooling-={is_techschooling}
					>
						Send an Invitation Link
					</InviteButton>
				)}
			</BlueCard>
			<PeopleImage>
				<People
					// src={require("../../../../assets/images/people.svg")}
					src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/people.svg
                "
					alt="people"
				/>
			</PeopleImage>
		</BlueCardContainer>
	);
}
export default ReferCard;

const PeopleImage = styled.div`
	position: absolute;
	right: 0;
	bottom: 0;
	width: 270px;
	@media all and (max-width: 1200px) {
		width: 210px;
	}
	@media all and (max-width: 880px) {
		width: 170px;
	}
	@media all and (max-width: 735px) {
		width: 150px;
	}
	@media all and (max-width: 690px) {
		width: 120px;
	}
	@media all and (max-width: 640px) {
		width: 150px;
	}
	@media all and (max-width: 510px) {
		display: none;
	}
`;
const People = styled.img`
	width: 100%;
	display: block;
`;
const InviteButton = styled.span`
	padding: 10px 15px;
	background-color: #355b9b;
	cursor: pointer;
	/* padding: ${(props) =>
		props.is_profile ? "5px 10px" : "2px 8px"}; */
	border-radius: 6px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 225px;
	color: #fff;
	font-size: 14px;
	font-family: gordita_medium;
	@media all and (max-width: 1260px) {
		width: 190px;
	}
	@media all and (max-width: 1200px) {
		/* font-size: ${(props) =>
			props.is_profile ? "" : "18px"}; */
		font-size: ${(props) => (props.is_margin ? "18px" : "")};
	}

	@media (max-width: 685px) {
		width: 215px;
	}
	@media (max-width: 640px) {
		width: 225px;
	}
	@media all and (max-width: 510px) {
		width: 100%;
	}
	@media (max-width: 480px) {
		height: 36px;
		font-size: ${(props) => (props.is_profile ? "" : "15px")};
	}
`;
const BlueCardContainer = styled.div`
	position: relative;
	// background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp-images/people-back.png");
	// background-image: url();
	background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/cardbacks.svg");
	background-color: #d2e4fc;
	border-radius: 7px;
	padding: 30px;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 100% 100%;
	margin-bottom: ${(props) => (props.is_subscribe ? "" : "20px")};
	margin-top: ${(props) => (props.is_margin ? "20px" : "")};

	/* margin-top: ${(props) =>
		props.is_dashboard ? "unset" : "15px"}; */

	@media all and (max-width: 1280px) {
		padding: ${(props) => (props.is_subscribe ? "20px" : "")};
		margin-bottom: 0;
	}
	@media all and (max-width: 1110px) {
		margin-bottom: 20px;
	}

	@media all and (max-width: 768px) {
		padding: ${(props) => (props.is_subscribe ? "30px" : "")};
	}

	@media all and (max-width: 480px) {
		padding: ${(props) => (props.is_subscribe ? "20px" : "")};
	}
	@media all and (max-width: 500px) {
		padding: 22px 19px;
	}
`;
const TopSet = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	@media all and (max-width: 768px) {
		padding-bottom: ${(props) => (props.is_subscribe ? "0" : "")};
	}
	@media (max-width: 420px) {
		display: block;
	}
`;
const ExploreButton = styled.span`
	padding: 2px 15px;
	background-color: #365b9b;
	cursor: pointer;
	color: #fff;
	border-radius: 3px;
	font-family: "baloo_paaji_2semibold";
	font-size: 15px;
`;
const BlueCard = styled.div`
	@media (max-width: 420px) {
		padding-bottom: 15px;
	}
`;
const CardHeader = styled.h2`
	font-size: 22px;
	max-width: 300px;
	font-family: "gordita_medium";
	color: #343535;
	/* @media all and (max-width: 1200px) {
        margin-bottom: ${(props) =>
		props.is_techschooling ? "15px" : ""};
    } */
	@media (max-width: 480px) {
		// margin-bottom: 9px;
		max-width: 240px;
		font-size: ${(props) => (props.is_profile ? "22px" : "22px")};
	}
`;
const BottomSet = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: ${(props) => (props.is_profile ? "" : "20px")};
	@media all and (max-width: 1550px) {
		margin-bottom: ${(props) => (props.is_profile ? "" : "30px")};
	}
	@media all and (max-width: 1200px) {
		margin-bottom: ${(props) => (props.is_profile ? "" : "25px")};
	}
	@media all and (max-width: 640px) {
		margin-bottom: ${(props) => (props.is_profile ? "" : "10px")};
	}
`;
const TokenHead = styled.h3`
	font-size: 14px;
	text-transform: capitalize;
	font-family: gordita_medium;
	margin-bottom: 10px;
	@media all and (max-width: 768px) {
		font-size: ${(props) => (props.is_profile ? "" : "17px")};
	}
`;
const BottomLeft = styled.div``;
const LockedDeck = styled.div`
	display: flex;
	align-items: center;
	position: relative;

	@media (max-width: 865px) {
		margin-bottom: ${(props) =>
			props.is_profile ? "10px" : "10px"};
	}
`;
const ShareCard = styled.div``;
const HoverContain = styled.div`
	position: absolute;
	box-shadow: 0 16px 24px rgb(0 0 0 / 7%);
	padding: 6px;
	background-color: #fff;
	border-radius: 5px;
	top: 33px;
	left: 1px;
	z-index: 1;
	min-width: 182px;
`;
const HoverDetail = styled.p`
	font-family: gordita_regular;
	font-size: 11px;
	color: #000;
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
const CodeDiv = styled.div`
	border: 2px dashed #3b5999;
	border-radius: 8px;
	margin-right: 19px;
	width: 70px;
	height: 30px;
	font-size: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: gordita_medium;
	/* padding: ${(props) =>
		props.is_profile || props.is_dashboard
			? "3px 12px"
			: "5px 20px"}; */
`;
const BottomDeck = styled.div`
	display: flex;
	align-items: center;
	padding-bottom: 15px;
`;
const ReferCode = styled.h2`
	letter-spacing: 3px;
	font-size: 14px;
	/* font-size: ${(props) =>
		props.is_profile || props.is_dashboard ? "15px" : "17px"}; */
	font-family: "gordita_medium";
`;
const LockCode = styled.span`
	letter-spacing: 0.1rem;
	font-size: 16px;
	font-family: gordita_medium;
	transform: translateY(5px);
`;
const CopyCard = styled.span`
	cursor: pointer;
	margin-right: 8px;
	width: 24px; ;
`;
const WAButton = styled(WhatsappShareButton)`
	cursor: pointer;
	width: 25px;
`;
// const AllButton = styled(All)`
//     cursor: pointer;
//     width: 25px;
// `;
const CopyImg = styled.img`
	display: block;
	width: 100%;
`;
const ShareImg = styled.img`
	display: block;
	width: 100%;
`;
const BottomRight = styled.div`
	width: 40%;
	@media (max-width: 900px) {
		display: none;
	}
	@media (max-width: 500px) {
		width: ${(props) => (props.is_profile ? "" : "50%")};
	}
	@media (max-width: 420px) {
		display: none;
	}
`;
const PeopleImg = styled.img`
	display: block;
	width: 100%;
`;
