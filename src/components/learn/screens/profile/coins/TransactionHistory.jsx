import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { serverConfig } from "../../../../../axiosConfig";
import {
	getUserDateFromUTC,
	getUserTimeFromUTC,
} from "../../../../helpers/functions";
import Pagination from "../../../../helpers/Pagination";
import colors from "../../../../../Colors";
import RouteLoading from "../../../../routing/RouteLoading.jsx";
import TalropEdtechHelmet from "../../../../helpers/TalropEdtechHelmet";
import { truncateString } from "../../../../helpers/functions";
import NoTransactions from "../../../includes/profile/NoTransactions";
import Loader from "../../../includes/techschooling/general/loaders/Loader.jsx";

function mapStateToProps(state) {
	return {
		user_data: state.user_data,
	};
}

function mapDispatchtoProps(dispatch) {
	return {
		updateActiveProfileMenu: (active_profile_menu) =>
			dispatch({
				type: "ACTIVE_PROFILE_MENU",
				active_profile_menu: active_profile_menu,
			}),
	};
}

function TransactionHistory({ user_data, updateActiveProfileMenu }) {
	const [transactions, setTransactions] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(12);

	useEffect(() => {
		updateActiveProfileMenu("My Transactions");
		fetchTransactionHistory();
	}, []);

	const fetchTransactionHistory = () => {
		let { access_token } = user_data;
		setLoading(true);
		serverConfig
			.get("/transactions/", {
				headers: { Authorization: `Bearer ${access_token}` },
			})
			.then((response) => {
				const { status_code, data } = response.data;
				if (status_code === 6000) {
					setTransactions(data);
					setLoading(false);
				} else if (status_code === 6001) {
					setLoading(false);
				}
			})
			.catch((error) => {
				setLoading(false);
			});
	};

	// Get current transactions
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = transactions.slice(
		indexOfFirstItem,
		indexOfLastItem
	);

	// Chnage page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const renderCard = currentItems.map((item) => (
		<Card key={item.transaction_id}>
			<First>
				<Image
					src={
						item.transaction_category === "deduction"
							? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/deduction-icon.svg"
							: item.status === "pending"
							? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/pending.svg"
							: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/addition-icon.svg"
					}
				/>
				<Column>
					<CardTitle>{item.title}</CardTitle>
					<ResCardTitle>
						{truncateString(item.title, 25)}
					</ResCardTitle>
					<Id>{`#${item.transaction_id}`}</Id>
				</Column>
			</First>
			<Column style={{ alignItems: "flex-end" }}>
				<Count
					style={{
						color:
							item.transaction_category ===
								"addition" &&
							item.status === "completed"
								? "#4CAF50"
								: item.transaction_category ===
								  "deduction"
								? "#e91e63"
								: colors.amber,
					}}
				>{`${
					item.transaction_category === "deduction"
						? "-"
						: "+"
				} ${item.coins} Coins`}</Count>
				<Date>
					{/* {getUserDateFromUTC(item.date)},{" "}
                    {getUserTimeFromUTC(item.date)} */}
					<DateData>
						{getUserDateFromUTC(item.date)},
					</DateData>
					<TimeData>
						{getUserTimeFromUTC(item.date)}
					</TimeData>
				</Date>
			</Column>
		</Card>
	));

	return isLoading? (
		<Loader />
		) : (
		<>
			<TalropEdtechHelmet title="My Transactions" />
			<PaddingContainer>
				<Title>My Transactions</Title>
				<CardsContainer>
					{transactions.length > 0 ? (
						renderCard
					) : (
						<NoTransactions
							title="No transactions found"
							description="All of your transactions will be shown here. Currently, you have no transactions."
							button_text=""
							button_function=""
							isButton={false}
						/>
					)}
				</CardsContainer>
				{itemsPerPage > 11 &&
					transactions.length > itemsPerPage && (
						<Pagination
							currentPage={currentPage}
							paginate={paginate}
							itemsPerPage={itemsPerPage}
							totalItems={transactions.length}
						/>
					)}
			</PaddingContainer>
		</>
	);
}

export default connect(
	mapStateToProps,
	mapDispatchtoProps
)(TransactionHistory);

const PaddingContainer = styled.div`
	padding-bottom: 30px;
	@media (max-width: 980px) {
		padding-top: 15px;
	}
	@media (max-width: 640px) {
		padding: 15px 21px 13px;
	}
	@media (max-width: 480px) {
		padding: 15px 17px 13px;
	}
	@media (max-width: 360px) {
		padding: 15px 14px 13px;
	}
`;
const First = styled.div`
	display: flex;
	align-items: center;
`;
const Title = styled.h4`
	font-size: 20px;
	font-family: gordita_medium;
	@media (max-width: 980px) {
		font-size: 20px;
	}
	@media (max-width: 480px) {
		font-size: 18px;
	}
`;
const CardsContainer = styled.div`
	margin-top: 20px;
	@media (max-width: 480px) {
		margin-top: 16px;
	}
`;
const Card = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #fff;
	padding: 25px 35px;
	border-radius: 18px;
	margin-bottom: 11px;
	&:last-child {
		margin-bottom: 0;
	}
	@media (max-width: 695px) {
		margin-bottom: 0;
	}
	@media (max-width: 640px) {
		padding: 20px 30px;
	}
	@media (max-width: 550px) {
		padding: 20px;
	}
	@media (max-width: 480px) {
		box-shadow: 0 8px 60px 0 rgba(103, 151, 255, 0.11),
			0 12px 90px 0 rgba(103, 151, 255, 0.11);
		padding: 15px 18px;
		border-radius: 9px;
		margin-bottom: 10px;
	}
	@media (max-width: 400px) {
		padding: 10px 15px;
	}
	@media (max-width: 350px) {
		padding: 8px 12px;
	}
`;
const Image = styled.img`
	display: block;
	width: 57px;
	margin-right: 30px;
	@media (max-width: 640px) {
		width: 50px;
		margin-right: 24px;
	}
	@media (max-width: 480px) {
		width: 41px;
		margin-right: 12px;
	}
	@media (max-width: 400px) {
		width: 38px;
		margin-right: 10px;
	}
`;
const Column = styled.div`
	display: flex;
	flex-direction: column;
	width: 700px;
	@media (max-width: 1355px) {
		width: 500px;
	}
	@media (max-width: 1155px) {
		width: 450px;
	}
	@media (max-width: 1105px) {
		width: 400px;
	}
	@media (max-width: 1070px) {
		width: 350px;
	}
	@media (max-width: 1020px) {
		width: 300px;
	}
	@media (max-width: 980px) {
		width: 500px;
	}
	@media (max-width: 890px) {
		width: 400px;
	}
	@media (max-width: 750px) {
		width: 350px;
	}
	@media (max-width: 695px) {
		width: 300px;
	}
	@media (max-width: 650px) {
		width: 250px;
	}
	@media (max-width: 605px) {
		width: 200px;
	}
	@media (max-width: 500px) {
		width: 180px;
	}
	@media (max-width: 480px) {
		width: 200px;
	}
	@media (max-width: 430px) {
		width: 170px;
	}
	@media (max-width: 430px) {
		width: 170px;
	}
	@media (max-width: 400px) {
		width: 150px;
	}
	@media (max-width: 365px) {
		width: 130px;
	}
	@media (max-width: 340px) {
		width: 100px;
	}
`;
const CardTitle = styled.span`
	font-family: gordita_medium;
	font-size: 16px;
	display: block;
	@media (max-width: 980px) {
		font-size: 15px;
	}
	@media (max-width: 480px) {
		font-size: 14px;
		line-height: 1.4rem;
		display: none;
	}
	@media (max-width: 400px) {
		font-size: 13px;
	}
	@media (max-width: 350px) {
		font-size: 12px;
	}
`;
const ResCardTitle = styled.span`
	font-family: "gordita_medium";
	font-size: 18px;
	display: none;

	@media (max-width: 980px) {
		font-size: 17px;
	}
	@media (max-width: 480px) {
		font-size: 15px;
		line-height: 1.4rem;
		display: block;
	}

	@media (max-width: 400px) {
		font-size: 14px;
	}
	@media (max-width: 350px) {
		font-size: 13px;
	}
`;
const Id = styled.span`
	display: block;
	font-family: gordita_regular;
	font-size: 14px;
	@media (max-width: 480px) {
		font-size: 13px;
	}
`;
const Count = styled.span`
	font-family: gordita_medium;
	font-size: 15px;
	display: block;
	width: max-content;
	@media (max-width: 480px) {
		font-size: 13px;
	}
	@media (max-width: 400px) {
		font-size: 12px;
	}
`;
const Date = styled.small`
	display: flex;
	font-size: 14px;
	text-align: right;
	@media (max-width: 600px) {
		flex-direction: column;
	}
	@media (max-width: 480px) {
		font-size: 13px;
		width: max-content;
	}
`;
const DateData = styled.small`
	font-family: gordita_regular;
	font-size: 10px;
`;
const TimeData = styled.small`
	margin-left: 5px;
	font-family: gordita_regular;
	font-size: 10px;
`;
