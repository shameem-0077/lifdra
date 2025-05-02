import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { coinsConfig, accountsConfig } from "../../../../../axiosConfig";
import TalropEdtechHelmet from "../../../../helpers/TalropEdtechHelmet";
import TokenCard from "../../../includes/profile/coins/TokenCard";
import AddCoinCard from "../../../includes/profile/coins/AddCoinCard";
import CoinsDetails from "../../../includes/profile/coins/CoinsDetails";
import ModalLoader from "../../../includes/profile/ModalLoader";
import ModalScreen from "../../../includes/general/ModalScreen";
import ReferCard from "../ReferCard";

function mapStateToProps(state) {
  return {
    divMainClass: state.divMainClass,
    user_data: state.user_data,
    user_profile: state.user_profile,
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    updateUserProfile: (user_profile) =>
      dispatch({
        type: "UPDATE_USER_PROFILE",
        user_profile: user_profile,
      }),
    updateUserData: (user_data) =>
      dispatch({
        type: "UPDATE_USER_DATA",
        user_data: user_data,
      }),
    updateActiveProfileMenu: (active_profile_menu) =>
      dispatch({
        type: "ACTIVE_PROFILE_MENU",
        active_profile_menu: active_profile_menu,
      }),
  };
}

function ManageCoins(props) {
  const [amount, setAmount] = useState(0);
  const [isTransferLoading, setTransferLoading] = useState(false);
  const [isTransferError, setTransferError] = useState(false);
  const [transferErrorMessage, setTransferErrorMessage] = useState("");

  const [coins, setCoins] = useState(0);
  const [isPurchaseLoading, setPurchaseLoading] = useState(false);
  const [isPurchaseError, setPurchaseError] = useState(false);
  const [purchaseErrorMessage, setPurchaseErrorMessage] = useState("");

  const [token, setToken] = useState("");
  const [isTokenLoading, setTokenLoading] = useState(false);
  const [isTokenError, setTokenError] = useState(false);
  const [tokenErrorMessage, setTokenErrorMessage] = useState("");
  const [show_token_modal, setTokenModal] = useState(false);

  const [userReferrals, setUserReferrals] = useState({});

  useEffect(() => {
    props.updateActiveProfileMenu("Manage Coins");
    fetchUserReferrals();
  }, []);

  const fetchUserReferrals = () => {
    let { user_data } = props;
    let { access_token } = user_data;
    coinsConfig
      .get("/referrals/user-referrals/", {
        params: {
          response_type: "minimal",
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const { StatusCode, data } = response.data;
        if (StatusCode === 6000) {
          setUserReferrals(data);
        } else {
        }
      })
      .catch((error) => {});
  };

  const fetchProfile = () => {
    let { user_data } = props;
    let { access_token } = user_data;
    accountsConfig
      .get("/api/v1/users/profile/", {
        params: {
          response_type: "minimal",
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const { StatusCode, data } = response.data;
        if (StatusCode === 6000) {
          props.updateUserProfile(data);
        } else {
        }
      })
      .catch((error) => {});
  };

  const transferAmount = () => {
    let { user_data } = props;
    let { access_token } = user_data;

    if (amount) {
      if (amount <= 200000) {
        setTransferLoading(true);
        coinsConfig
          .post(
            `/purchases/create-fund-transfer-order/`,
            {
              amount: amount,
            },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          )
          .then((response) => {
            const { StatusCode, data, message } = response.data;
            if (StatusCode === 6000) {
              window.location.href = data.paymentLink;
              setTransferLoading(false);
            } else {
              setTransferError(true);
              setTransferLoading(false);
              setTransferErrorMessage(message);
            }
          })
          .catch((error) => {
            setTransferError(true);
            setTransferLoading(false);
            setTransferErrorMessage(
              "An error occurred, please try again later"
            );
          });
      } else {
        setTransferError(true);
        setTransferErrorMessage("Fund transfer above 2 Lakhs is restricted");
      }
    } else {
      setTransferError(true);
      setTransferErrorMessage("This field should not be empty");
    }
  };

  const purchaseCoin = () => {
    let { user_data } = props;
    let { access_token } = user_data;
    if (coins) {
      if (coins <= 4000) {
        setPurchaseLoading(true);
        coinsConfig
          .post(
            `/purchases/create-order/`,
            {
              coins: coins,
            },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          )
          .then((response) => {
            const { StatusCode, data, message } = response.data;
            if (StatusCode === 6000) {
              window.location.href = data.paymentLink;
              setPurchaseLoading(false);
            } else {
              setPurchaseLoading(false);
              setPurchaseError(true);
              setPurchaseErrorMessage(message);
            }
          })
          .catch((error) => {
            console.log(error);
            setPurchaseLoading(false);
            setPurchaseError(true);
            setPurchaseErrorMessage(
              "An error occurred, please try again later"
            );
          });
      } else {
        setPurchaseError(true);
        setPurchaseErrorMessage("Coin purchase above 4000 is restricted");
      }
    } else {
      setPurchaseError(true);
      setPurchaseErrorMessage("This field should not be empty");
    }
  };

  const applyToken = () => {
    let { user_data } = props;
    let { access_token } = user_data;

    if (token) {
      setTokenLoading(true);
      coinsConfig
        .post(
          "/tokens/apply-token/",
          {
            referral_code: token.trim(),
            service: "learn",
          },
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        )
        .then((response) => {
          const { StatusCode, data } = response.data;
          if (StatusCode === 6000) {
            setTokenLoading(false);
            setTokenError(false);
            setTokenErrorMessage("");
            setToken("");
            data.has_active_subscription &&
              props.updateUserData({
                ...user_data,
                has_active_subscription: data.has_active_subscription,
              });
            fetchProfile();
            toggleTokenSuccessModal();
          } else if (StatusCode === 6001) {
            setTokenLoading(false);
            setTokenError(true);
            setTokenErrorMessage(data.message);
          }
        })
        .catch((error) => {
          setTokenLoading(false);
          setTokenError(true);
          setTokenErrorMessage("An error occurred, please try later");
        });
    } else {
      setTokenError(true);
      setTokenErrorMessage("This field should not be empty");
    }
  };

  const transferKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      transferAmount();
    }
  };

  const purchaseKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      purchaseCoin();
    }
  };

  const toggleTokenSuccessModal = () => {
    setTokenModal((prevVal) => !prevVal);
  };

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  return (
    <>
      <TalropEdtechHelmet title="My Coins" />
      <ModalScreen
        show_modal={show_token_modal}
        title="Congratulations!"
        message={"Referral code applied successfully"}
        redirect={false}
        successButtonText={"Done"}
        onModalClose={toggleTokenSuccessModal}
        image={
          "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/top-banner.png"
        }
      />
      <PaddingContainer>
        {/* <PromotionBanner /> */}
        {/* <MobileAddCoin>
                    <BottomRight>
                        <AddCoinCard
                            total_coins={props.user_profile.total_coins}
                            is_coins_page={true}
                        />
                        <CoinsDetails
                            total_earned_coins={
                                props.user_profile.total_earned_coins
                            }
                            total_gifted_coins={
                                props.user_profile.total_gifted_coins
                            }
                            total_purchased_coins={
                                props.user_profile.total_purchased_coins
                            }
                        />
                    </BottomRight>
                </MobileAddCoin> */}
        <TopCards>
          {/* <TopCard>
                        <CardTop>
                            <CardTitle>Transfer fund</CardTitle>
                            <CardDescription>
                                Transfer fund informed by Steyp Representative
                            </CardDescription>
                            <InputContainer>
                                ₹
                                <InputText
                                    type="number"
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Enter amount"
                                    maxLength="6"
                                    onInput={maxLengthCheck}
                                    onKeyDown={transferKeyDown}
                                />
                                {isTransferError && (
                                    <Error>{transferErrorMessage}</Error>
                                )}
                            </InputContainer>
                        </CardTop>
                        <CardBottom>
                            <TotalRow>
                                <RegularText>Grand total</RegularText>
                                <Right>
                                    <TotAmount>
                                        {amount ? `₹ ${amount}` : "-"}
                                    </TotAmount>
                                </Right>
                            </TotalRow>
                            <PayButton onClick={transferAmount}>
                                {isTransferLoading ? (
                                    <ModalLoader />
                                ) : (
                                    <>
                                        Transfer
                                        <Arrow
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/right-arrow.svg"
                                            alt=""
                                        />
                                    </>
                                )}
                            </PayButton>
                        </CardBottom>
                    </TopCard> */}
          <TopCard>
            <CardTop>
              <CardTitle>Purchase coins</CardTitle>
              <CardDescription>Price per coin - ₹ 50.00</CardDescription>
              <InputContainer>
                <InputIcon
                  src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/coin.svg"
                  alt=""
                />

                <InputText
                  type="number"
                  onChange={(e) => {
                    setCoins(e.target.value);
                    setPurchaseError(false);
                  }}
                  placeholder="Enter coin"
                  maxLength="6"
                  onInput={maxLengthCheck}
                  onKeyDown={purchaseKeyDown}
                />
                {isPurchaseError && <Error>{purchaseErrorMessage}</Error>}
              </InputContainer>
            </CardTop>
            <CardBottom>
              <TotalRow>
                <RegularText>Grand total</RegularText>
                <Right>
                  <TotAmount>{coins ? `₹ ${coins * 50}` : "-"}</TotAmount>
                </Right>
              </TotalRow>
              <PayButton onClick={purchaseCoin}>
                {isPurchaseLoading ? (
                  <ModalLoader />
                ) : (
                  <>
                    Purchase
                    <Arrow
                      src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/right-arrow.svg"
                      alt=""
                    />
                  </>
                )}
              </PayButton>
            </CardBottom>
          </TopCard>
          <BottomRight>
            <AddCoinCard
              total_coins={props.user_profile.total_coins}
              is_coins_page={true}
            />
            <CoinsDetails
              total_earned_coins={props.user_profile.total_earned_coins}
              total_gifted_coins={props.user_profile.total_gifted_coins}
              total_purchased_coins={props.user_profile.total_purchased_coins}
            />
          </BottomRight>
        </TopCards>
        {/* <TokenCard
                    setTokenErrorMessage={setTokenErrorMessage}
                    setTokenError={setTokenError}
                    applyToken={applyToken}
                    setToken={setToken}
                    token={token}
                    isTokenLoading={isTokenLoading}
                    isTokenError={isTokenError}
                    tokenErrorMessage={tokenErrorMessage}
                /> */}

        {/* <BottomContainer>
                    <ReferCard user_profile={props.user_profile} />
                    <DesktopAddCoin>
                        <BottomRight>
                            <AddCoinCard
                                total_coins={props.user_profile.total_coins}
                                is_coins_page={true}
                            />
                            <CoinsDetails
                                total_earned_coins={
                                    props.user_profile.total_earned_coins
                                }
                                total_gifted_coins={
                                    props.user_profile.total_gifted_coins
                                }
                                total_purchased_coins={
                                    props.user_profile.total_purchased_coins
                                }
                            />
                        </BottomRight>
                    </DesktopAddCoin>
                </BottomContainer> */}
      </PaddingContainer>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchtoProps)(ManageCoins);

const Container = styled.div`
  padding: 41px 23px;
  background: #f8f9fd;
  width: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  @media (max-width: 640px) {
    padding: 0;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
const TopCards = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 640px) {
    flex-wrap: wrap;
  }
`;
const TopCard = styled.div`
  width: 49%;
  background-color: #f7fcff;
  padding: 32px 30px;
  border-radius: 10px;
  height: 370px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/wave-1.svg");
  background-repeat: no-repeat;
  background-size: cover;
  &:last-child {
    background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/wave-2.svg");
    background-position-y: 43%;
    background-size: cover;
    background-repeat: no-repeat;
  }
  background-position-y: 42%;
  @media (max-width: 1100px) {
    padding: 30px 27px;
    height: 388px;
  }
  @media (max-width: 640px) {
    width: 100%;
    height: unset;
    margin-bottom: 12px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
const CardTop = styled.div``;
const CardTitle = styled.span`
  font-family: gordita_medium;
  font-size: 20px;
  @media (max-width: 1100px) {
    font-size: 17px;
  }
`;
const CardDescription = styled.p`
  font-family: gordita_regular;
  font-size: 14px;
  color: #565656;
`;
const InputContainer = styled.div`
  margin-top: 25px;
  border: 1px solid #5aa48b;
  width: 100%;
  height: 56px;
  padding: 0 20px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  font-family: gordita_medium;
  font-size: 22px;
  position: relative;
  @media (max-width: 1100px) {
    font-size: 19px;
    height: 44px;
  }
`;
const TopBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  &:last-child {
    margin-top: 14px;
  }
`;
const Amount = styled.div`
  font-family: gordita_medium;
  font-size: 17px;
  display: block;
  @media (max-width: 1100px) {
    font-size: 16px;
  }
`;
const InputText = styled.input`
  font-family: gordita_medium;
  font-size: 18px;
  margin-left: 15px;
  @media (max-width: 1100px) {
    font-size: 15px;
  }
`;
const InputIcon = styled.img`
  display: block;
  width: 25px;
`;
const CardBottom = styled.div`
  border-top: 2px solid;
  padding-top: 18px;
  @media (max-width: 1100px) {
    border-top-width: 1px;
  }
  @media (max-width: 640px) {
    border-top: unset;
  }
`;
const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RegularText = styled.span`
  font-family: gordita_regular;
  display: block;
  font-size: 13px;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const TotAmount = styled.span`
  font-family: gordita_medium;
  font-size: 17px;
  display: block;
  @media (max-width: 1100px) {
    font-size: 17px;
  }
`;
const Tax = styled.span`
  display: block;
  font-size: 14px;
  margin-top: 7px;
`;
const PayButton = styled.div`
  cursor: pointer;
  width: fit-content;
  background: #5dd3a7;
  padding: 0 34px;
  height: 36px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  font-family: gordita_medium;
  font-size: 15px;
  margin-left: auto;
  margin-top: 18px;
  color: #fff;
  @media (max-width: 1100px) {
    width: 100%;
    justify-content: center;
  }
`;
const Arrow = styled.img`
  display: block;
  width: 14px;
  margin-left: 16px;
  @media (max-width: 1100px) {
    margin-left: 20px;
  }
`;
const BottomContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr;
  grid-gap: 1.1em;
  margin-top: 24px;
  @media (max-width: 1440px) {
    grid-template-columns: 3fr 2fr;
  }
  @media all and (max-width: 1110px) {
    display: block;
  }
  @media all and (max-width: 980px) {
    display: grid;
  }

  @media (max-width: 640px) {
    display: block;
  }
`;
const BottomRight = styled.div`
  width: 49%;

  display: grid;
  grid-template-columns: 1.4fr 2fr;
  grid-gap: 0.7em;
  @media (max-width: 1440px) {
    grid-template-columns: 1.9fr 2fr;
  }
  @media all and (max-width: 640px) {
    width: 100%;
  }
`;
const PaddingContainer = styled.div`
  @media (max-width: 640px) {
    padding: 0 21px 13px;
  }
  @media (max-width: 480px) {
    padding: 0 17px 13px;
  }
  @media (max-width: 360px) {
    padding: 0 14px 13px;
  }
`;
const Error = styled.p`
  color: red;
  bottom: -25px;
  font-size: 14px;
  position: absolute;
  left: 0;
`;
const MobileAddCoin = styled.div`
  display: none;
  margin-bottom: 22px;
  @media (max-width: 640px) {
    display: block;
  }
`;
const DesktopAddCoin = styled.div`
  @media (max-width: 640px) {
    display: none;
  }
`;
