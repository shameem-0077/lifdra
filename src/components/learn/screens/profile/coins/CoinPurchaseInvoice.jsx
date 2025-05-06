import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import queryString from "query-string";
import TransactionResponse from "../TransactionResponse";
import { connect } from "react-redux";
import { serverConfig } from "../../../../../axiosConfig";
import RouteLoading from "../../../../routing/RouteLoading";
import {
  getUserTimeFromUTC,
  getUserDateFromUTC,
} from "../../../../helpers/functions";
import TalropEdtechHelmet from "../../../../helpers/TalropEdtechHelmet";

function mapStateToProps(state) {
  return {
    user_profile: state.user_profile,
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

function CoinPurchaseInvoice({
  location,
  user_profile,
  user_data,
  updateActiveProfileMenu,
}) {
  const { pk } = useParams();
  const [status, setStatus] = useState({});
  const [purchase, setPurchase] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    updateActiveProfileMenu("Coin Purchases");
    let { search } = location;
    const values = queryString.parse(search);
    const { status } = values;
    setStatus(status);
  }, [location]);

  useEffect(() => {
    fetchCoinPurchase();
  }, [pk]);

  const fetchCoinPurchase = () => {
    let { access_token } = user_data;
    setIsLoading(true);
    serverConfig
      .get(`purchases/coin-purchases/receipt/${pk}/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const { status_code, data } = response.data;
        if (status_code === 6000) {
          setPurchase(data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <TalropEdtechHelmet title="Coin purchase receipt" />
      {isLoading ? (
        <RouteLoading />
      ) : status === "success" ? (
        <TransactionResponse
          transaction_status={status}
          title="Coin purchase successful"
          mobile_message={
            "Your coin purchase is successful. Click the button below to view your coin purchases."
          }
          message={
            "Your coin purchase is successful. Click the button below to view invoice."
          }
          receipt_id={purchase.receipt_id}
          invo_link="/coins/coin-purchases/"
          invoice_link={`/coins/coin-purchases/${pk}/`}
          mobile_btn_text="View your coin purchases"
        />
      ) : status === "failed" ? (
        <TransactionResponse
          transaction_status={status}
          title="Coin purchase failed"
          mobile_message={
            "Your coin purchase has failed. Click the button below to view your coin purchases."
          }
          message={
            "Your coin purchase has failed. Click the button below to view invoice."
          }
          receipt_id={purchase.receipt_id}
          invo_link="/coins/coin-purchases/"
          invoice_link={`/coins/coin-purchases/${pk}/`}
          mobile_btn_text="View your coin purchases"
        />
      ) : (
        <Container>
          <ButtonsContainer>
            <Title>Receipt of coin purchase</Title>
            <Buttons>
              {/* <Button
                        href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf/"
                        target="_blank"
                        download
                    >
                        <i className="las la-save"></i>Save
                    </Button> */}
            </Buttons>
          </ButtonsContainer>
          {/* <Title>Invoice</Title> */}
          <InvoiceCard>
            <div>
              <Head>
                <HeadTop>
                  <Image
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/steyp-logo.svg"
                    alt="logo"
                  />

                  <InvoiceText>Receipt</InvoiceText>
                  {purchase.status === "cancelled" && (
                    <CancelledImage
                      src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/cancelled.svg"
                      alt="Image"
                    />
                  )}
                </HeadTop>

                <InvoiceDetails>
                  <Column>
                    {/* <ItemTitle
                                    style={{
                                        color: "#bbbbbb",
                                        marginBottom: 10,
                                        fontFamily: "unset",
                                    }}
                                >
                                    Billed to:
                                </ItemTitle> */}
                    <ItemTitle>{user_profile.name}</ItemTitle>
                    <Regular>{user_profile.phone}</Regular>
                  </Column>
                  <Column
                    style={{
                      justifyContent: "space-between",
                    }}
                  >
                    <ItemTitle>#{purchase.receipt_id}</ItemTitle>
                    <div>
                      <Regular>
                        {getUserDateFromUTC(purchase.date_added)},{" "}
                        {getUserTimeFromUTC(purchase.date_added)}
                      </Regular>
                    </div>
                  </Column>
                </InvoiceDetails>
              </Head>

              <Description>
                <Thead>
                  <THTitle>Description</THTitle>
                  <THTitle>Rate</THTitle>
                  <THTitle>Qty</THTitle>
                  <THTitle>Subtotal</THTitle>
                </Thead>
                <Tdata>
                  <Wrapper>
                    <Trow>
                      <TItem>Coins</TItem>
                      <TItem>₹ {purchase.coin_amount}</TItem>
                      <TItem>{purchase.coins}</TItem>
                      <TItem>₹ {purchase.amount}</TItem>
                    </Trow>
                  </Wrapper>
                </Tdata>
              </Description>
              <TotalWrapper>
                <TotalDetails>
                  <TotalTop>
                    <First>
                      <THTitle style={{ color: "unset" }}>SubTotal</THTitle>
                      <THTitle style={{ color: "unset" }}>
                        ₹ {purchase.amount}
                      </THTitle>
                    </First>
                    <GstItem
                      style={{
                        width: "max-content",
                        fontSize: 12,
                        textAlign: "left",
                      }}
                    >
                      (All taxes included)
                    </GstItem>
                  </TotalTop>
                  <TotalBottom>
                    <GrandTotalItem
                      style={{
                        color: "#2196f3",
                        width: "max-content",
                      }}
                    >
                      Grand Total
                    </GrandTotalItem>
                    <GrandTotalItem>₹ {purchase.amount}/-</GrandTotalItem>
                  </TotalBottom>
                </TotalDetails>
              </TotalWrapper>
              <Bottom>
                Steyp Private Limited, #208, 2nd Floor, HiLITE Platino, Shankar
                Nagar Road, Maradu, Kakkanad, Kerala - 682304
                <Block>
                  Email:{" "}
                  <a href="mailto:hello@steyp.com" target="_blank">
                    hello@steyp.com
                  </a>{" "}
                  |{" "}
                  <a target="_blank" href="https://steyp.com">
                    www.steyp.com
                  </a>
                </Block>
              </Bottom>
            </div>
          </InvoiceCard>
        </Container>
      )}
    </>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(CoinPurchaseInvoice);

const Container = styled.div`
  /* padding: 36px 23px; */
  width: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 640px) {
    display: none;
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Button = styled(Link)`
  cursor: pointer;
  background: #f3f3f3;
  height: 35px;
  width: 81px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7d7d7d;
  font-size: 15px;
  margin-right: 13px;
  i {
    margin-right: 3px;
  }
`;
const Title = styled.h4`
  font-size: 22px;
  letter-spacing: 0.04rem;
  color: #575757;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  &:last-child {
    align-items: flex-end;
  }
`;
const Details = styled.div`
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
`;
const InvoiceCard = styled.div``;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 19px;
  background: #f6f6f6;
  padding: 40px;
  position: relative;
`;
const HeadTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Image = styled.img`
  display: block;
  width: 100px;
  @media (max-width: 1280px) {
    width: 68px;
  }
`;
const InvoiceText = styled.span`
  display: block;
  letter-spacing: 0.08rem;
  font-size: 29px;
  font-family: "baloo_paaji_2semibold";
  @media (max-width: 1440px) {
    font-size: 24px;
  }
  @media (max-width: 1280px) {
    font-size: 21px;
  }
`;
const ItemTitle = styled.span`
  font-family: "baloo_paaji_2semibold";
  font-size: 16px;
  margin-bottom: 14px;
`;
const Regular = styled.span`
  display: block;
  font-size: 15px;
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
`;
const Description = styled.div`
  padding: 40px 46px 0 46px;
`;
const Thead = styled.div`
  display: grid;
  grid-template-columns: 6fr 1fr 1fr 1fr;
  margin-bottom: 19px;
`;
const THTitle = styled.span`
  font-family: "baloo_paaji_2semibold";
  font-size: 14px;
  text-transform: uppercase;
  color: #2196f3;
  text-align: left;
  &:last-child {
    text-align: right;
  }
`;
const Tdata = styled.div`
  padding: 12px 0 20px;
  min-height: 352px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid;
`;
const Trow = styled.div`
  display: grid;
  grid-template-columns: 6fr 1fr 1fr 1fr;
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
`;
const TItem = styled.span`
  font-size: 15px;
  &:last-child {
    text-align: right;
  }
`;
const Wrapper = styled.div``;
const GrandTotal = styled.span`
  font-size: 14px;
  text-transform: uppercase;
  text-align: right;
  margin-top: 40px;
  font-family: "baloo_paaji_2semibold";
`;
const TotalWrapper = styled.div`
  text-align: right;
  padding: 34px 46px;
  border-bottom: 2px dashed #b1b1b1;
`;
const Amount = styled.span`
  display: block;
  font-family: "baloo_paaji_2semibold";
  font-size: 19px;
`;
const Tax = styled.small`
  display: block;
  font-size: 14px;
  color: #f44336;
  margin: 7px 0 22px;
`;
const Due = styled.span`
  font-family: "baloo_paaji_2semibold";
  display: block;
  font-size: 13px;
`;
const Bottom = styled.div`
  padding-top: 35px;
  text-align: center;
  letter-spacing: 0.05rem;
  font-size: 14px;
  width: 50%;
  margin: 0 auto;
  line-height: 1.6rem;
  @media (max-width: 1440px) {
    width: 64%;
  }
`;

const InvoiceDetails = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`;
const GstItem = styled.span`
  font-size: 15px;
  text-transform: uppercase;
  text-align: left;
  &:last-child {
    text-align: right;
  }
`;
const TotalDetails = styled.div`
  width: 300px;
  margin-left: auto;
`;
const First = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 7px;
`;
const TotalTop = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
`;
const TotalBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const GrandTotalItem = styled.div`
  font-size: 16px;
  text-transform: uppercase;
  font-family: "baloo_paaji_2semibold";
  text-align: left;
  &:last-child {
    text-align: right;
  }
`;
const Block = styled.span`
  display: block;
`;
const CancelledImage = styled.img`
  display: block;
  right: 300px;
  top: 51px;
  position: absolute;
  width: 14%;
`;
