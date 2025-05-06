import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Jdenticon from "react-jdenticon";
import { serverConfig } from "../../../../axiosConfig";
import { useSelector } from "react-redux";
import { getDateStr } from "../../../helpers/functions";
import ReferLoader from "../../../merchandise/includes/loaders/ReferLoader";
import ListLoader from "../../../merchandise/includes/loaders/ListLoader";
import { Link } from "react-router-dom";

export default function AllReferals() {
	const { user_data } = useSelector((state) => state);
	const [totalReferal, setTotalReferal] = useState([]);
	const [successReferal, setSuccessReferal] = useState([]);
	const [pendingReferal, setPendingReferal] = useState([]);
	const [isLoading, setLoading] = useState(true);

	const [referrals, setReferrals] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [referralsLoading, setReferralsLoading] = useState(false);
	const [itemsCount] = useState(8);
	const [buttonType, setButtonType] = useState("all");
	const [tempButton, setTempButton] = useState("");

	useEffect(() => {
		//responsive scroll function

		let comp = document.getElementById("main");
		const responsiveScroll = () => {
			if (window.innerWidth < 768) {
				if (
					window.innerHeight +
						document.documentElement.scrollTop +
						1 >=
					document.documentElement.offsetHeight
				) {
					if (currentPage < totalPages) {
						setCurrentPage((current) => current + 1);
					}
				}
			}
		};

		comp.addEventListener("scroll", responsiveScroll);
		return () => {
			comp.removeEventListener("scroll", responsiveScroll);
		};
	}, [totalPages, currentPage]);

	useEffect(() => {
		// Scroll watching function
		let elem = document.getElementById("referral");

		const infiniteScroll = () => {
			if (
				elem.scrollTop ===
				elem.scrollHeight - elem.offsetHeight
			) {
				if (currentPage < totalPages) {
					setCurrentPage((current) => current + 1);
				}
			}
		};

		elem.addEventListener("scroll", infiniteScroll);
		return () => {
			elem.removeEventListener("scroll", infiniteScroll);
		};
	}, [totalPages, currentPage]);

	useEffect(() => {
		setLoading(true);
	}, [buttonType]);

	useEffect(() => {
		setReferralsLoading(true);
		const fetchDatas = () => {
			const url =
				buttonType === "pending"
					? "referrals/student-referrals-pending/"
					: buttonType === "subscribed"
					? "referrals/student-referrals-completed/"
					: "referrals/student-referrals-all/";

			const access_token = user_data.access_token;

			serverConfig
				.get(url, {
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
					params: {
						page: currentPage,
						items_count: itemsCount,
					},
				})
				.then((response) => {
					const {
						status_code,
						data,
						pagination_data,
						referral_count,
						pending_referrals_count,
						completed_referrals_count,
					} = response.data;
					if (status_code === 6000) {
						setReferrals((current) =>
							current.concat(data)
						);

						setLoading(false);
						setReferralsLoading(false);

						setTotalPages(pagination_data.total_pages);

						setTotalReferal(referral_count);
						setSuccessReferal(completed_referrals_count);
						setPendingReferal(pending_referrals_count);
					} else {
						setLoading(false);
						setReferralsLoading(false);
					}
				})
				.catch((error) => {
					setReferralsLoading(false);
					setLoading(false);
					console.log(error);
				});
		};

		fetchDatas();
	}, [user_data, buttonType, currentPage]);

	return (
		<Referals>
			<Topsection>
				<Counts
					className="first"
					onClick={() => {
						setButtonType("all");
						setReferrals([]);
						setCurrentPage(1);
					}}
				>
					<CountSpan>{totalReferal}</CountSpan>
					<Status>Total</Status>
				</Counts>
				<Counts
					className="second"
					onClick={() => {
						setButtonType("subscribed");
						setReferrals([]);
						setCurrentPage(1);
					}}
				>
					<CountSpan className="successful">
						{successReferal}
					</CountSpan>
					<Status className="successful">Successful</Status>
				</Counts>
				<Counts
					className="last"
					onClick={() => {
						setButtonType("pending");
						setReferrals([]);
						setCurrentPage(1);
					}}
				>
					<CountSpan className="pending">
						{pendingReferal}
					</CountSpan>
					<Status className="pending">Pending</Status>
				</Counts>
			</Topsection>
			<BottomSection id="referral">
				{!isLoading ? (
					referrals.length > 0 ? (
						<>
							{referrals.map((data) => (
								<PersonContainer
									status={
										data.is_guided
											? "subscribed"
											: "pending"
									}
								>
									<IconContains>
										<Jdenticon
											size="46"
											value={
												data.profile_details
													.name
											}
										/>
									</IconContains>
									<DetailsContains>
										<ContactDetails>
											<ReferedName>
												{
													data
														.profile_details
														.name
												}
											</ReferedName>
											<ReferedNumber>
												{
													data
														.profile_details
														.phone
												}
											</ReferedNumber>
										</ContactDetails>
										{data.is_guided ? (
											<ReferedDate>
												{getDateStr(
													data.date_updated
												)}
											</ReferedDate>
										) : (
											<ShareContainer>
												<Icons>
													<a
														href={`tel:${data.profile_details.phone}`}
													>
														<Icon
															src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/orangecall.svg
                                                            "
															alt="call"
														/>
													</a>
												</Icons>
												<Icons>
													<a
														href={`https://wa.me/${data.profile_details.phone}`}
													>
														<Icon
															src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/orangewatsapp.svg
                                                            "
															alt="watsapp"
														/>
													</a>
												</Icons>
											</ShareContainer>
										)}
									</DetailsContains>
								</PersonContainer>
							))}
							{referralsLoading ? (
								<InsideLoaderContainer>
									<ListLoader />
								</InsideLoaderContainer>
							) : null}
						</>
					) : (
						// <Empty>You have no referrals</Empty>
						<EmptyBox>
							<EmptyImageContainer>
								<Images
									src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/merchandise/empty-icon.png"
									alt="Empty"
								/>
							</EmptyImageContainer>
							<EmptyTitle>
								{" "}
								{buttonType === "pending"
									? "No pending referrals"
									: buttonType === "subscribed"
									? "No subscribed referrals"
									: "No referrals"}
							</EmptyTitle>
							<EmptyContent>
								{buttonType === "pending"
									? "There are no pending referrals. Refer your friends and earn more coins!"
									: buttonType === "subscribed"
									? "There are no subscribed referrals. Refer your friends and earn more coins!"
									: "There are no referrals. Refer your friends and earn more coins!"}
							</EmptyContent>
						</EmptyBox>
					)
				) : (
					<LoaderContainer>
						<ReferLoader />
					</LoaderContainer>
				)}
			</BottomSection>
		</Referals>
	);
}

const EmptyBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const EmptyImageContainer = styled.div`
	width: 40%;
	margin: 0 auto;
`;
const Images = styled.img`
	width: 100%;
	display: block;
`;
const EmptyContent = styled.p`
	text-align: center;
	margin-top: 7px;
	font-size: 13px;
	margin-bottom: 20px;
	font-family: "gordita_regular";
`;
const EmptyTitle = styled.h2`
	text-align: center;
	margin-top: 15px;
	font-size: 19px;
	font-family: "gordita_medium";
`;

const LoaderContainer = styled.div`
	min-height: 330px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const InsideLoaderContainer = styled.div``;

const Empty = styled.div`
	font-family: "gordita_medium";
	color: green;
	min-height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
`;
const Referals = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const Topsection = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;
const Counts = styled.div`
	width: 32%;
	text-align: center;
	display: flex;
	align-items: center;
	flex-direction: column;
	cursor: pointer;
	padding: 9px;
	font-size: 13px;
	border-radius: 8px;
	background-color: #e7e8fd;
	color: #fff;
	font-family: "gordita_medium";
	&.second {
		background-color: #d8f7eb;
	}
	&.last {
		background-color: #fff7eb;
	}
`;
const CountSpan = styled.div`
	color: #fff;
	background-color: #3152b5;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 37px;
	height: 37px;
	&.successful {
		background-color: #15bf81;
	}
	&.pending {
		background-color: #f7a943;
	}
`;
const Status = styled.div`
	color: #3152b5;
	font-family: "gordita_medium";
	font-size: 16px;
	&.successful {
		color: #15bf81;
	}
	&.pending {
		color: #f7a943;
	}
`;
const BottomSection = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 10px;
	width: 100%;
	// max-height: 330px;
	height: 630px;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: block;
		width: 5px;
		margin-right: 5px;
	}

	&::-webkit-scrollbar-track {
		display: none;
	}
	@media all and (max-width: 1313px) {
		height: 365px;
	}
	@media all and (max-width: 768px) {
		height: auto;
		overflow: hidden;
	}
`;
const PersonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	background: ${(props) =>
		props.status === "pending" ? "#fff7eb" : "#d8f7eb"};

	padding: 5px 10px;
	border-radius: 8px;
	margin-bottom: 10px;
`;
const IconContains = styled.div`
	width: 46px;
	height: 46px;
	padding-top: 7px;
	display: flex;
	align-items: center;
	margin-right: 6px;
	background-color: #fff;
	border-radius: 50%;
	justify-content: center;
`;
const DetailsContains = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 85%;
`;
const ContactDetails = styled.div``;
const ReferedName = styled.div`
	font-family: "gordita_medium";
	line-height: 1;
	font-size: 14px;
	color: #333333;
	@media all and (max-width: 400px) {
		font-size: 13px;
	}
`;
const ReferedNumber = styled.div`
	font-family: "gordita_medium";
	font-size: 12px;
	color: #333333;
	@media all and (max-width: 400px) {
		font-size: 10px;
	}
`;
const ReferedDate = styled.div`
	font-family: "gordita_medium";
	font-size: 14px;
	color: #15bf81;
`;
const ShareContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Icons = styled.div`
	cursor: pointer;
	width: 25px;
	height: 25px;
	margin-right: 5px;
	border-radius: 50%;
	background-color: orange;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 6px;
	&:last-child {
		margin-right: 0px;
	}
`;
const Icon = styled.img`
	width: 100%;
	display: block;
`;
