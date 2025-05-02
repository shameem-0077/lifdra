import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Jdenticon from "react-jdenticon";
import { accountsConfig } from "../../../../../axiosConfig";

function mapStateToProps(state) {
    return {
        user_profile: state.user_profile,
        active_profile_menu: state.active_profile_menu,
        user_data: state.user_data,
    };
}

function Menu({ user_profile, active_profile_menu, user_data }) {
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
        {
            id: 3,
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
            id: 4,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/transfer.svg",
            title: "Fund Transfers",
            details: `${
                user_profile.fund_transfers ? user_profile.fund_transfers : "No"
            } fund transfers`,
            to: "/coins/fund-transfers/",
        },
        {
            id: 5,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/add.svg",
            title: "Coin Purchases",
            details: `${
                user_profile.coin_purchases ? user_profile.coin_purchases : "No"
            } coin purchases`,
            to: "/coins/coin-purchases/",
        },
        {
            id: 6,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/details.svg",
            title: "",
            info: "",
            details: "How coin works",
            to: "/coins/info/",
        },
    ]);

    const onLogout = () => {
        accountsConfig
            .post(
                "/authentication/logout/",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${user_data?.access_token}`,
                    },
                }
            )
            .then((response) => {
                const { StatusCode, data } = response.data;

                if (StatusCode === 6000) {
                    localStorage.clear();
                    window.location = "/";
                } else {
                    // Handle error during logout
                }
            })
            .catch((error) => {
                // Handle network error or other exceptions
            });
    };

    const RenderMenuItem = menu_item_details.map((item, index) => (
        <MenuItem activeClassName="active" key={index} to={item.to}>
            <Left>
                <IconWrapper>
                    <Icon src={item.icon} />
                </IconWrapper>
                <Middle>
                    <ItemText>{item.title}</ItemText>
                    {item.details && (
                        <MiddleBottomText>{item.details}</MiddleBottomText>
                    )}
                </Middle>
            </Left>
            <Arrow src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/menu-arrow.svg" />
        </MenuItem>
    ));
    return (
        <Container>
            <Top>
                <Title>Coins</Title>
                <MenuItems>{RenderMenuItem}</MenuItems>
                <ProfileMenu>
                    <ProfileTitle>Profile</ProfileTitle>
                    <MenuItem
                        exact
                        to="/profile/"
                        style={{
                            backgroundColor:
                                active_profile_menu === "Profile" && "#eae8f1",
                            borderBottomWidth:
                                active_profile_menu === "Profile" && 0,
                        }}
                    >
                        <Left>
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
                                <MiddleBottomText>
                                    View profile
                                </MiddleBottomText>
                            </Middle>
                        </Left>
                        <Arrow src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/menu-arrow.svg" />
                    </MenuItem>

                    {/* Refer and earn menu section */}
                    {/* <MenuItem
                        exact
                        to="/profile/refer/all/"
                        style={{
                            backgroundColor:
                                active_profile_menu === "Profile" && "#f6f4fe",
                            borderBottomWidth:
                                active_profile_menu === "Profile" && 0,
                        }}
                    >
                        <Left>
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
                                    Refer you friends
                                </MiddleBottomText>
                            </Middle>
                        </Left>
                        <Arrow src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/menu-arrow.svg" />
                    </MenuItem> */}
                </ProfileMenu>
            </Top>
            <Bottom>
                <BottomItem to="/tos/" target="_blank">
                    <BottomIcon src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/lock.svg" />
                    <BottomText>Privacy Policy</BottomText>
                </BottomItem>
                <BottomItem
                    to="/auth/logout/"
                    onClick={(e) => {
                        e.preventDefault();
                        onLogout();
                    }}
                >
                    <BottomIcon src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/logout.svg" />
                    <BottomText>Logout</BottomText>
                </BottomItem>
            </Bottom>
        </Container>
    );
}

export default connect(mapStateToProps)(Menu);

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // min-width: 305px;
    // min-width: 285px;
    width: 280px;
    padding: 20px 0;
    background: #f8f9fd;
    margin-right: 8px;
    height: calc(100vh - 87px);
    overflow-y: scroll;
    position: fixed;
    @media (max-width: 1100px) {
        min-width: 278px;
    }
    @media (max-width: 980px) {
        display: none;
    }
`;
const Top = styled.div``;
const Title = styled.span`
    font-family: "gordita_medium";
    font-size: 18px;
    display: block;
    padding-left: 21px;
`;
const MenuItems = styled.div``;
const MenuItem = styled(NavLink)`
    padding: 0 21px;
    display: flex;
    align-items: center;
    height: 68px;
    width: 100%;
    border-bottom: 1px solid #e1e2e6;
    &.active {
        background-color: #f6f4fe;
        border-bottom-width: 0;
    }
`;
const Left = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: inherit;
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
const Middle = styled.div`
    width: 70%;
`;
const MiddleBottomText = styled.span`
    display: block;
    font-family: "gordita_regular";
    color: #929395;
    font-size: 13px;
`;
const ItemText = styled.span`
    font-family: "gordita_medium";
    font-size: 15px;
`;
const Arrow = styled.img`
    width: 7px;
    display: block;
`;
const Bottom = styled.div`
    padding: 0 21px;
    min-height: 100px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    flex-direction: column;
`;
const BottomItem = styled(Link)`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 18px;
    &:last-child {
        margin-bottom: 0;
    }
`;
const BottomIcon = styled.img`
    display: block;
    margin-right: 24px;
`;
const BottomText = styled.span`
    font-family: "gordita_medium";
    font-size: 15px;
    letter-spacing: 0.01rem;
`;
const ProfileMenu = styled.div`
    margin-top: 20px;
`;
const ProfileTitle = styled.span`
    font-family: "gordita_medium";
    font-size: 18px;
    margin-bottom: 7px;
    display: block;
    padding: 0px 21px;
`;
const PromImgWrap = styled.div`
    display: flex;
    align-items: flex-start;
    /* justify-content: center; */
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
