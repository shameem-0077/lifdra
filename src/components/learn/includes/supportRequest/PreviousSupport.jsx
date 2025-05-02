import React, { useEffect, useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import Jdenticon from "react-jdenticon";
import ReactPlaceholder from "react-placeholder";
import { Link } from "react-router-dom";
import { SupportEngineerContext } from "../../../contexts/stores/SupportEngineerStore";
import { getTimeFromDate, zeroPad } from "../../../helpers/functions";
import Loader from "../techschooling/general/loaders/Loader";

const PreviousSupport = () => {
	const [isLoading, setLoading] = useState(true);
	const [is_mouseHover, setMouseHover] = useState(false);
	const { supportEngineerState } = useContext(
		SupportEngineerContext
	);

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		let results =
			supportEngineerState.previous_premium_assists.filter(
				(item) => {
					return (
						// item.auto_id.toString().includes(searchTerm) ||
						// item.auto_id.toString().toLowerCase().includes(searchTerm) ||
						// item.auto_id.toString().toUpperCase().includes(searchTerm) ||
						// item.last_message_data.message.includes(searchTerm) ||
						// item.last_message_data.message.toLowerCase().includes(searchTerm) ||
						// item.last_message_data.message.toUpperCase().includes(searchTerm)
						item.auto_id
							.toString()
							.includes(searchTerm) ||
						item.last_message_data.message?.includes(
							searchTerm
						) ||
						item.last_message_data.message
							?.toLowerCase()
							.includes(searchTerm) ||
						item.last_message_data.message
							?.toUpperCase()
							.includes(searchTerm)
					);
				}
			);
		setSearchResults(results);
	}, [
		searchTerm,
		supportEngineerState.previous_premium_assists.length,
	]);

	const truncate = (str) => {
		if (str) {
			return str.length > 20
				? str.substring(20, 0) + "..."
				: str;
		}
	};

	return (
		<Container>
			{!supportEngineerState.is_previous_assists_loading ? (
				supportEngineerState.previous_premium_assists.length >
				0 ? (
					<>
						<TopSection>
							<TitleSection
								is_mouseHover={is_mouseHover}
							>
								<Title>
									Previous Support Requests
								</Title>
								<Search
									onClick={() =>
										setMouseHover(true)
									}
								>
									<SeacrchIcon
										src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/search.svg"
										alt="Search icon"
									/>
								</Search>
							</TitleSection>
							<SearchSection
								is_mouseHover={is_mouseHover}
								onMouseLeave={() =>
									setMouseHover(false)
								}
							>
								<SearchInput
									placeholder="Search here..."
									type="text"
									onClick={() =>
										setMouseHover(true)
									}
									onChange={(e) =>
										setSearchTerm(e.target.value)
									}
								/>
								<Search>
									<SeacrchIcon
										src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/search.svg"
										alt="Search icon"
									/>
								</Search>
							</SearchSection>
						</TopSection>
						{searchResults.length > 0 ? (
							<ChatContainer>
								{searchResults.map((data) => (
									<ChatCard
										key={data.id}
										to={`/premium-assist/view/${data.id}/`}
									>
										<ReactPlaceholder
											type="text"
											rows={2}
											showLoadingAnimation={
												true
											}
											ready={
												isLoading &&
												data.auto_id
													? true
													: false
											}
											color="#E0E0E0"
										>
											<JdenticonBox>
												<Jdenticon
													size="42"
													value={
														data.auto_id
													}
												/>
											</JdenticonBox>
											<ChatContent>
												<LabelContainer>
													<ChatId>
														#PA
														{zeroPad(
															data.auto_id,
															5
														)}
													</ChatId>
													<Time>
														{data
															.last_message_data
															.timestamp &&
															getTimeFromDate(
																data
																	.last_message_data
																	.timestamp
															)}
													</Time>
												</LabelContainer>
												<Message>
													{data
														.last_message_data
														.message &&
														truncate(
															data
																.last_message_data
																.message
														)}
												</Message>
											</ChatContent>
										</ReactPlaceholder>
									</ChatCard>
								))}
							</ChatContainer>
						) : (
							<NoSearchFound>
								<NoSearchText>
									No search found
								</NoSearchText>
							</NoSearchFound>
						)}
					</>
				) : (
					<EmptyChat>
						<EmptyText>
							You don't have any previous support
							requests
						</EmptyText>
					</EmptyChat>
				)
			) : (
				<LoaderContainer>
					<Loader />
				</LoaderContainer>
			)}
		</Container>
	);
};

export default PreviousSupport;
const LoaderContainer = styled.div`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const NoSearchFound = styled.div`
	height: calc(100vh - 217px);
	display: flex;
	justify-content: center;
	align-items: center;
`;
const NoSearchText = styled.div`
	font-size: 16px;
`;
const TopSection = styled.div`
	position: relative;
	min-height: 70px;
	/* @media all and (max-width: 480px) {
    min-height: 50px;
  } */
`;
const TitleSection = styled.div`
	position: absolute;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 70px;
	top: 0;
	width: 100%;
	right: ${(props) =>
		props.is_mouseHover == false ? 0 : "-500px"};
	transition: all 0.5s ease;
	@media all and (max-width: 1440px) {
		right: ${(props) =>
			props.is_mouseHover == false ? 0 : "-1500px"};
	}
`;
const Title = styled.h3`
	font-size: 22px;
	font-family: "baloo_paaji_2semibold";
	@media all and (max-width: 1440px) {
		font-size: 21px;
	}
	@media all and (max-width: 768px) {
		font-size: 20px;
	}
	@media all and (max-width: 640px) {
		font-size: 19px;
	}
	@media all and (max-width: 480px) {
		font-size: 18px;
	}
`;
const Search = styled.div`
	display: block;
	width: 20px;
	height: 20px;
`;
const SeacrchIcon = styled.img`
	vertical-align: center;
	width: 100%;
`;

const SearchSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 50px;
	width: 100%;
	background-color: #fff;
	margin-bottom: 10px;
	margin: 10px 0;
	padding: 0 10px;
	position: absolute;
	top: 0;
	transition: all 0.5s ease;
	right: ${(props) => (props.is_mouseHover == true ? 0 : "-500px")};
	@media all and (max-width: 1440px) {
		right: ${(props) =>
			props.is_mouseHover == true ? 0 : "-1500px"};
	}
`;
const SearchInput = styled.input`
	flex: 1;
`;
//search section is in the above
const Container = styled.div`
	background-color: #f9f9fb;
	padding: 20px;
	min-width: 380px;

	max-height: calc(100vh - 110px);
	overflow: hidden;

	@media all and (max-width: 1440px) {
		max-height: calc(100vh - 110px);

		min-width: unset;
	}

	@media all and (max-width: 480px) {
		padding: 20px;
		margin-bottom: 20px;
	}
	@media all and (max-width: 400px) {
		margin-top: 20px;
	}
	@media all and (max-width: 380px) {
		padding: 15px;
	}
`;

const ChatContainer = styled.div`
	overflow-y: scroll;
	height: calc(100vh - 217px);
	padding-bottom: 30px;
	display: flex;
	flex-direction: column;
	&::-webkit-scrollbar {
		display: none;
	}
	@media all and (max-width: 1300px) {
		overflow-y: scroll;
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-content: start;
		grid-gap: 15px;
		margin-bottom: 0px;
	}
	@media all and (max-width: 640px) {
		grid-template-columns: 1fr;
		overflow-y: scroll;
	}
`;
const ChatCard = styled(Link)`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 15px;
	background-color: #fff;
	padding: 15px;
	border-radius: 3px;
	height: 70px;
	@media all and (max-width: 1300px) {
		margin-bottom: unset;
	}
	@media all and (max-width: 360px) {
		padding: 10px;
	}
`;
const JdenticonBox = styled.div`
	width: 45px;
	height: 45px;
	border-radius: 50%;
	overflow: hidden;
	border: 0.5px solid #d6d6d6;
	margin-right: 15px;
	overflow: hidden;
	box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.1);
`;
const ChatContent = styled.div`
	flex: 1;
`;
const LabelContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const ChatId = styled.h3`
	font-size: 18px;
	font-family: "baloo_paaji_2semibold";
	@media all and (max-width: 360px) {
		font-size: 16px;
	}
`;
const Time = styled.p`
	font-family: "gordita_medium";
	font-size: 14px;
	@media all and (max-width: 360px) {
		font-size: 12px;
	}
`;
const Message = styled.p`
	font-family: "gordita_medium";
	font-size: 16px;
	@media all and (max-width: 360px) {
		font-size: 14px;
	}
`;
const EmptyChat = styled.div`
	height: calc(100vh - 140px);
	padding: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const EmptyImage = styled.img`
	width: 80%;
	max-width: 400px;
`;
const EmptyText = styled.div`
	font-family: "gordita_medium";
	text-align: center;
	font-size: 16px;
	width: 90%;
	@media all and (max-width: 1300px) {
		font-size: 18px;
	}
	@media all and (max-width: 980px) {
		font-size: 16px;
	}
`;
const hello = styled.div``;
