import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Jdenticon from "react-jdenticon";

function mapStateToProps(state) {
    return {
        user_profile: state.user_profile,
        active_profile_menu: state.active_profile_menu,
    };
}

function HorizontalMenu({ user_profile, active_profile_menu }) {
    const [menu_item_details] = useState([
        {
            id: 1,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/coin.svg",
            title: "Manage Coins",
            details: `${
                user_profile.total_coins ? user_profile.total_coins : "No"
            } coins balance`,
            to: "/coins/manage",
        },
        // {
        //     id: 2,
        //     icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/subscription/payment.svg",
        //     title: "Subscriptions",
        //     details: `${
        //         user_profile.transactions_count
        //             ? user_profile.transactions_count
        //             : "No"
        //     } transactions`,
        //     to: "/coins/subscriptions/",
        // },
        {
            id: 2,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/wallet.svg",
            title: "My Transactions",
            details: `${
                user_profile.transactions_count
                    ? user_profile.transactions_count
                    : "No"
            } transactions`,
            to: "/coins/transactions/",
        },
        {
            id: 3,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/transfer.svg",
            title: "Fund Transfers",
            details: `${
                user_profile.fund_transfers ? user_profile.fund_transfers : "No"
            } fund transfers`,
            to: "/coins/fund-transfers/",
        },
        {
            id: 4,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/add.svg",
            title: "Coin Purchases",
            details: `${
                user_profile.coin_purchases ? user_profile.coin_purchases : "No"
            } coin purchases`,
            to: "/coins/coin-purchases/",
        },
        {
            id: 5,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/details.svg",
            title: "Coin Info",
            details: "How coin works",
            to: "/coins/info/",
        },
    ]);

    const RenderMenuItem = menu_item_details.map((item, index) => (
        <MenuItem activeClassName="active" key={index} to={item.to}>
            <IconWrapper>
                <Icon src={item.icon} />
            </IconWrapper>
            <Middle>
                <ItemText>{item.title}</ItemText>
                {item.details && (
                    <MiddleBottomText>{item.details}</MiddleBottomText>
                )}
            </Middle>
        </MenuItem>
    ));
    return (
        <Container>
            <Top>
                <MenuItems>
                    <MenuItem
                        style={{
                            backgroundColor:
                                active_profile_menu === "Profile" && "#f6f4fe",
                            borderBottomWidth:
                                active_profile_menu === "Profile" && 0,
                        }}
                        exact
                        to="/profile/"
                    >
                        <PromImgWrap>
                            {user_profile.photo ? (
                                <img
                                    src={user_profile.photo}
                                    alt={user_profile.name}
                                />
                            ) : (
                                <Jdenticon
                                    size={46}
                                    value={user_profile.name}
                                />
                            )}
                        </PromImgWrap>
                        <Middle>
                            <ItemText>{user_profile.name}</ItemText>
                            <MiddleBottomText>View profile</MiddleBottomText>
                        </Middle>
                    </MenuItem>
                    {/* <MenuItem
                        style={{
                            backgroundColor:
                                active_profile_menu === "Profile" && "#f6f4fe",
                            borderBottomWidth:
                                active_profile_menu === "Profile" && 0,
                        }}
                        exact
                        to="/profile/refer/all/"
                    >
                        <PromImgWrap>
                            <span>
                                <ReferIcon
                                    // src={require("../../../../../assets/images/profile/loudspeaker.svg")}
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/loudspeaker.svg
                                    "
                                />
                            </span>
                        </PromImgWrap>
                        <Middle>
                            <ItemText>Refer and earn</ItemText>
                            <MiddleBottomText>
                                Refer your friend
                            </MiddleBottomText>
                        </Middle>
                    </MenuItem> */}
                    {RenderMenuItem}
                </MenuItems>
            </Top>
        </Container>
    );
}

export default connect(mapStateToProps)(HorizontalMenu);

const Container = styled.div`
    display: none;
    @media (max-width: 980px) {
        display: block;
    }
`;
const Top = styled.div`
    display: flex;
    @media (max-width: 640px) {
        padding: 20px !important;
    }
    @media (max-width: 480px) {
        padding: 15px 0 !important;
    }
`;
const MenuItems = styled.div`
    display: flex;
    overflow-x: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    margin-bottom: 13px;
    &::-webkit-scrollbar {
        display: none;
    }
    /* @media (max-width: 640px) {
        padding: 13px 21px;
        margin-bottom: 0;
    }
    @media (max-width: 480px) {
        padding: 13px 17px;
    }
    @media (max-width: 360px) {
        padding: 14px 13px;
    } */
`;
const MenuItem = styled(NavLink)`
    padding: 0 21px;
    display: flex;
    align-items: center;
    min-width: 245px;
    height: 77px;
    background: #f3f3f3;
    padding: 18px;
    border-radius: 5px;
    margin-right: 10px;
    &.active {
        background-color: #d4f1ea;
        border-bottom-width: 0;
    }
    &:last-child {
        margin-right: unset;
    }
    @media (max-width: 360px) {
        min-width: 230px;
    }
`;
const IconWrapper = styled.div`
    width: 16%;
    height: inherit;
    display: flex;
    align-items: center;
`;
const Icon = styled.img`
    display: block;
    min-width: 19px;
    max-width: 19px;
`;
const Middle = styled.div``;
const MiddleBottomText = styled.span`
    display: block;
    font-family: "gordita_medium";
    color: #929395;
    font-size: 14px;
    margin-top: 8px;
    @media (max-width: 980px) {
        margin-top: 6px;
    }
`;
const ItemText = styled.span`
    font-family: "gordita_medium";
    font-size: 13px;
    text-transform: capitalize;
`;
const PromImgWrap = styled.div`
    display: flex;
    align-items: flex-start;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
    margin-right: 14px;
    span {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    img {
        display: block;
        width: 100%;
    }
`;
const ReferIcon = styled.img`
    display: block;
    width: 30px !important;
`;
