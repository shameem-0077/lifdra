import React, { Suspense, lazy } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { coinsConfig } from "../../../../axiosConfig";
import Loader from "../techschooling/general/loaders/Loader";
const EmptySupportCredit = lazy(() => import("./EmptySupportCredit"));
const SupportCredit = lazy(() => import("./SupportCredit"));
const SupportTopBanner = lazy(() => import("./SupportTopBanner"));

const SupportContent = () => {
	const user_data = useSelector((state) => state.user_data);

	const [isLoading, setLoading] = useState(true);
	const [supportCredits, setSupportCredits] = useState(0);
	const [premiumCoins, setPremiumCoins] = useState(0);

	useEffect(() => {
		const fetchCoins = () => {
			const { access_token } = user_data;
			coinsConfig
				.get("/premium-assist-credits/premium-assist-credits/", {
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				})
				.then((response) => {
					const { StatusCode, data } = response.data;
					if (StatusCode === 6000) {
						setLoading(false);
						setSupportCredits(data.credits_balance);
						setPremiumCoins(data.premium_coins_balance);
					} else {
					}
				})
				.catch((error) => {
					setLoading(false);
				});
		};
		fetchCoins();
	}, []);

	return (
		<Suspense>
			{isLoading ? (
				<LoaderCover>
					<Loader />
				</LoaderCover>
			) : (
				<Container>
					<SupportTopBanner
						coin={supportCredits}
						background={"#dcf6ec"}
						type="support"
						color={"#fff;"}
						item={"Support Credits"}
						image={
							"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/explore-white-arrow.svg"
						}
					/>
					{supportCredits > 0 ? (
						<SupportTopBanner
							coin={supportCredits}
							background={"#dcf6ec"}
							type="support"
							color={"#fff;"}
							item={"Support Credits"}
							image={
								"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/explore-white-arrow.svg"
							}
						/>
					) : premiumCoins > 0 ? (
						<SupportTopBanner
							coin={premiumCoins}
							background={"#fef9dd"}
							type="premium"
							item={"Premium Coins"}
							color={"#746219;"}
							image="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp-images/premium-arrow.svg"
						/>
					) : (
						<SupportTopBanner
							coin={premiumCoins}
							background={"#F9F9FB "}
						/>
					)}
					<Credits>
						{supportCredits > 0 ? (
							<SupportCredit
								image="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp-images/super_coin.svg"
								background={"#dcf6ec"}
								bgImage="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp-images/green_background.svg"
								type="token"
								coinCount={supportCredits}
								color={"#fff"}
								item={"Support Credits"}
								link={"packages/"}
							/>
						) : (
							<EmptySupportCredit
								image="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp-images/support.svg"
								background={"#dcf6ec"}
								bgImage="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp-images/green_background.svg"
								type="token"
								coinCount={supportCredits}
								color={"#fff"}
								item={"Support Credits"}
								link={"packages/"}
							/>
						)}
						{premiumCoins > 0 ? (
							<SupportCredit
								image={
									"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/coin.svg"
								}
								background={"#fef9dd"}
								bgImage="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp-images/yellow_background.svg"
								type="coin"
								coinCount={premiumCoins}
								color={"#746219;"}
								item={"Premium Coins"}
								link={"manage-coins/"}
							/>
						) : (
							<EmptySupportCredit
								image="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp-images/premium.svg"
								background={"#fef9dd"}
								bgImage="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp-images/yellow_background.svg"
								type="coin"
								coinCount={5434}
								color={"#746219;"}
								item={"Premium Coins"}
								link={"manage-coins/"}
							/>
						)}
					</Credits>
				</Container>
			)}
		</Suspense>
	);
};

export default SupportContent;

const Container = styled.div``;
const Credits = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 15px;
	/* margin-top: 20px; */
	@media all and (max-width: 580px) {
		grid-template-columns: 1fr;
	}
`;
const LoaderCover = styled.div`
	width: 100%;
	height: calc(100vh - 100px);
	display: flex;
	justify-content: center;
	align-items: center;
`;
