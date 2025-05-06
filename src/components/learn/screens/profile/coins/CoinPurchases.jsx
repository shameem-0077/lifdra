import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { serverConfig } from "../../../../../axiosConfig";
import {
    getUserDateFromUTC,
    getUserTimeFromUTC,
    numberWithCommas,
} from "../../../../helpers/functions";
import Pagination from "../../../../helpers/Pagination";
import NoTransactions from "../../../includes/profile/NoTransactions";
import RouteLoading from "../../../../routing/RouteLoading.jsx";
import colors from "../../../../../Colors";
import TalropEdtechHelmet from "../../../../helpers/TalropEdtechHelmet";

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

function CoinPurchases({ updateActiveProfileMenu, user_data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);

    const [isLoading, setLoading] = useState(true);
    const [coinPurchases, setCoinPurchases] = useState([]);

    useEffect(() => {
        updateActiveProfileMenu("Coin Purchases");
        fetchCoinPurchases();
    }, []);

    const fetchCoinPurchases = () => {
        let { access_token } = user_data;
        setLoading(true);
        serverConfig
            .get("/purchases/coin-purchases/", {
                headers: { Authorization: `Bearer ${access_token}` },
            })
            .then((response) => {
                const { status_code, data } = response.data;
                if (status_code === 6000) {
                    setCoinPurchases(data);
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
    const currentItems = coinPurchases.slice(indexOfFirstItem, indexOfLastItem);

    // Chnage page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderCard = currentItems.map((item) =>
        item.status === "completed" ? (
            <Card to={`/coins/coin-purchases/${item.id}/`} key={item.id}>
                <First>
                    <Image
                        src={
                            item.status === "cancelled"
                                ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/failed.svg"
                                : item.status === "pending"
                                ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/pending.svg"
                                : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/success.svg"
                        }
                    />
                    <Column>
                        <CardTitle>{`#${item.receipt_id}`}</CardTitle>
                        <Id>{`₹ ${numberWithCommas(item.amount)}`}</Id>
                    </Column>
                </First>
                <Column style={{ alignItems: "flex-end" }}>
                    <Count
                        style={{
                            color:
                                item.status === "completed"
                                    ? "#4CAF50"
                                    : item.status === "pending"
                                    ? colors.amber
                                    : "",
                        }}
                    >
                        {item.coins} {item.coins === 1 ? "Coin" : "Coins"}
                    </Count>
                    <Date>
                        {getUserDateFromUTC(item.date_added)}, {getUserTimeFromUTC(item.date_added)}
                    </Date>
                </Column>
            </Card>
        ) : (
            <InactiveCard key={item.id}>
                <First>
                    <Image
                        src={
                            item.status === "cancelled"
                                ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/failed.svg"
                                : item.status === "pending"
                                ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/pending.svg"
                                : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/success.svg"
                        }
                    />
                    <Column>
                        <CardTitle>{`#${item.receipt_id}`}</CardTitle>
                        <Id>{`₹ ${numberWithCommas(item.amount)}`}</Id>
                    </Column>
                </First>
                <Column style={{ alignItems: "flex-end" }}>
                    <Count
                        style={{
                            color:
                                item.status === "completed"
                                    ? "#4CAF50"
                                    : item.status === "pending"
                                    ? colors.amber
                                    : "",
                        }}
                    >
                        {item.coins} {item.coins === 1 ? "Coin" : "Coins"}
                    </Count>
                    <Date>
                        {getUserDateFromUTC(item.date_added)}, {getUserTimeFromUTC(item.date_added)}
                    </Date>
                </Column>
            </InactiveCard>
        )
    );

    const renderMobileCard = currentItems.map((item) => (
        <MobileCard key={item.id}>
            <First>
                <Image
                    src={
                        item.status === "cancelled"
                            ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/failed.svg"
                            : item.status === "pending"
                            ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/pending.svg"
                            : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/success.svg"
                    }
                />
                <Column>
                    <CardTitle>{`#${item.receipt_id}`}</CardTitle>
                    <Id>{`₹ ${numberWithCommas(item.amount)}`}</Id>
                </Column>
            </First>
            <Column style={{ alignItems: "flex-end" }}>
                <Count
                    style={{
                        color:
                            item.status === "completed"
                                ? "#4CAF50"
                                : item.status === "pending"
                                ? colors.amber
                                : "",
                    }}
                >
                    {item.coins} {item.coins === 1 ? "Coin" : "Coins"}
                </Count>
                <Date>
                    {getUserDateFromUTC(item.date_added)}, {getUserTimeFromUTC(item.date_added)}
                </Date>
            </Column>
        </MobileCard>
    ));

    if (isLoading) {
        return <RouteLoading />;
    } else if (coinPurchases.length > 0) {
        return (
            <>
                <PaddingContainer>
                    <TalropEdtechHelmet title="Coin Purchases" />
                    <Title>Coin purchases</Title>
                    <CardsContainer>{renderCard}</CardsContainer>
                    <MobileCardWrap>{renderMobileCard}</MobileCardWrap>
                    {itemsPerPage > 11 && coinPurchases.length > itemsPerPage && (
                        <Pagination
                            currentPage={currentPage}
                            paginate={paginate}
                            itemsPerPage={itemsPerPage}
                            totalItems={coinPurchases.length}
                        />
                    )}
                </PaddingContainer>
            </>
        );
    } else
        return (
            <>
                <TalropEdtechHelmet title="Coin Purchases" />
                <NoTransactions
                    isButton={true}
                    title="No coin purchases history"
                    description="All of your coin purchase history will be shown here. Currently, you not purchased any coins."
                    button_text="Purchase coins"
                    button_function="/coins/"
                />
            </>
        );
}

export default connect(mapStateToProps, mapDispatchtoProps)(CoinPurchases);

const PaddingContainer = styled.div`
    padding-bottom: 30px !important;

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
    font-family: "gordita_medium";
    font-size: 20px;
    @media (max-width: 980px) {
        font-size: 29px;
    }
    @media (max-width: 480px) {
        font-size: 17px;
    }
`;
const CardsContainer = styled.div`
    margin-top: 20px;
    @media (max-width: 640px) {
        display: none;
    }
    @media (max-width: 480px) {
        margin-top: 16px;
    }
`;
const MobileCardWrap = styled.div`
    margin-top: 20px;
    display: none;
    @media (max-width: 640px) {
        display: block;
    }
    @media (max-width: 480px) {
        margin-top: 16px;
    }
`;
const InactiveCard = styled.div`
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
    @media (max-width: 480px) {
        box-shadow: 0 8px 60px 0 rgba(103, 151, 255, 0.11), 0 12px 90px 0 rgba(103, 151, 255, 0.11);
        padding: 19px 21px;
        border-radius: 9px;
        margin-bottom: 10px;
    }
`;
const Card = styled(Link)`
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
    @media (max-width: 480px) {
        box-shadow: 0 8px 60px 0 rgba(103, 151, 255, 0.11), 0 12px 90px 0 rgba(103, 151, 255, 0.11);
        padding: 19px 21px;
        border-radius: 9px;
        margin-bottom: 10px;
    }
`;
const MobileCard = styled.div`
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
    @media (max-width: 480px) {
        box-shadow: 0 8px 60px 0 rgba(103, 151, 255, 0.11), 0 12px 90px 0 rgba(103, 151, 255, 0.11);
        padding: 19px 21px;
        border-radius: 9px;
        margin-bottom: 10px;
    }
`;
const Image = styled.img`
    display: block;
    width: 57px;
    margin-right: 30px;
    @media (max-width: 480px) {
        width: 49px;
        margin-right: 17px;
    }
`;
const Column = styled.div`
    display: flex;
    flex-direction: column;
`;
const CardTitle = styled.span`
    font-family: "gordita_medium";
    font-size: 16px;
    display: block;
    @media (max-width: 480px) {
        font-size: 14px;
        margin-bottom: 10px;
    }
`;
const Id = styled.span`
    display: block;
    font-family: "gordita_regular";
    font-size: 14px;
    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
const Count = styled.span`
    font-family: "gordita_medium";
    font-size: 15px;
    color: #e91e63;
    display: block;
    @media (max-width: 480px) {
        font-size: 15px;
    }
`;
const Date = styled.small`
    display: block;
    font-family: "gordita_regular";
    font-size: 12px;
    @media (max-width: 480px) {
        font-size: 11px;
    }
`;
