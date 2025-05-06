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

function FundTransferInvoice({
  location,
  user_profile,
  user_data,
  updateActiveProfileMenu,
}) {
  const { pk } = useParams();
  const [status, setStatus] = useState({});
  const [transfer, setTransfer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    updateActiveProfileMenu("Fund Transfers");
    let { search } = location;
    const values = queryString.parse(search);
    const { status } = values;
    setStatus(status);
  }, [location]);

  useEffect(() => {
    fetchFundTransfer();
  }, [pk]);

  const fetchFundTransfer = () => {
    let { access_token } = user_data;
    setIsLoading(true);
    serverConfig
      .get(`purchases/fund-transfers/receipt/${pk}/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const { status_code, data } = response.data;
        if (status_code === 6000) {
          setTransfer(data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <TalropEdtechHelmet title="Fund transfer receipt" />
      {isLoading ? (
        <RouteLoading />
      ) : status === "success" ? (
        <TransactionResponse
          transaction_status={status}
          title="Fund transfer successful"
          invo_link="/coins/fund-transfers/"
          mobile_btn_text="View your fund transfers"
          mobile_message={
            "Your fund transfer is successful. Click the button below to view your fund transfers."
          }
          message={
            "Your fund transfer is successful. Click the button below to view invoice."
          }
          receipt_id={transfer.receipt_id}
          invoice_link={`/coins/fund-transfers/${pk}/`}
        />
      ) : status === "failed" ? (
        <TransactionResponse
          invo_link="/coins/fund-transfers/"
          title="Fund transfer failed"
          mobile_btn_text="View your fund transfers"
          mobile_message={
            "Your fund transfer has failed. Click the button below to view your fund transfers."
          }
          transaction_status={status}
          message={
            "Your fund transfer has failed. Click the button below to view invoice."
          }
          receipt_id={transfer.receipt_id}
          invoice_link={`/coins/fund-transfers/${pk}/`}
        />
      ) : (
        <>
          <Container>
            <ButtonsContainer>
              <Title>Receipt of fund transfer</Title>
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
              <Head>
                <HeadTop>
                  <Image
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/steyp-logo.svg"
                    alt="logo"
                  />

                  <InvoiceText>Receipt</InvoiceText>
                  {transfer.status === "cancelled" && (
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
                    <ItemTitle>#{transfer.receipt_id}</ItemTitle>
                    <div>
                      <Regular>
                        {getUserDateFromUTC(transfer.date_added)},{" "}
                        {getUserTimeFromUTC(transfer.date_added)}
                      </Regular>
                    </div>
                  </Column>
                </InvoiceDetails>
              </Head>

              <Description>
                <TopThead>
                  <THTitle>Description</THTitle>
                  <THTitle>Rate</THTitle>
                  <THTitle>Subtotal</THTitle>
                </TopThead>
                <Tdata>
                  <Wrapper>
                    <Trow>
                      <TItem>Amount</TItem>
                      <TItem>₹ {transfer.amount}</TItem>
                      <TItem>₹ {transfer.amount}</TItem>
                    </Trow>
                  </Wrapper>
                </Tdata>
              </Description>
              <TotalWrapper>
                <Thead style={{ marginBottom: 7 }}>
                  <THTitle></THTitle>
                  <THTitle style={{ color: "unset" }}>SubTotal</THTitle>
                  <THTitle style={{ color: "unset" }}>
                    ₹ {transfer.amount}
                  </THTitle>
                </Thead>
                <Thead>
                  <GstItem></GstItem>
                  <GstItem
                    style={{
                      width: "max-content",
                      fontSize: 12,
                      textAlign: "left",
                    }}
                  >
                    (All taxes included)
                  </GstItem>
                  <GstItem></GstItem>
                </Thead>
                <Thead style={{ marginBottom: 0 }}>
                  <GrandTotalItem></GrandTotalItem>
                  <GrandTotalItem
                    style={{
                      color: "#2196f3",
                      width: "max-content",
                    }}
                  >
                    Grand Total
                  </GrandTotalItem>
                  <GrandTotalItem>₹ {transfer.amount}/-</GrandTotalItem>
                </Thead>
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
            </InvoiceCard>
          </Container>
          {/* <MobileInvoiceContainer>
                <MobileInvoice>
                    <MobileInvoiceSide>
                        <ItemTitle>#{transfer.receipt_id}</ItemTitle>
                        <div>
                            <Regular>
                                {getUserDateFromUTC(transfer.date_added)},{" "}
                                {getUserTimeFromUTC(transfer.date_added)}
                            </Regular>
                        </div>
                    </MobileInvoiceSide>
                    <MobileInvoiceSide>
                        <THTitle>Subtotal</THTitle>
                        <GrandTotalItem>₹ {transfer.amount}/-</GrandTotalItem>
                    </MobileInvoiceSide>
                </MobileInvoice>
                <InvoiceStatus>Successful</InvoiceStatus>
            </MobileInvoiceContainer> */}
        </>
      )}
    </>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(FundTransferInvoice);

const Container = styled.div`
  /* padding: 36px 23px; */
  width: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 980px) {
    padding-top: 17px;
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
  @media (max-width: 1100px) {
    margin-bottom: 20px;
  }
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
  @media (max-width: 1100px) {
    font-size: 20px;
  }
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
  @media (max-width: 1100px) {
    width: 57px;
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
  @media (max-width: 1100px) {
    font-size: 18px;
  }
`;
const ItemTitle = styled.span`
  font-family: "baloo_paaji_2semibold";
  font-size: 16px;
  margin-bottom: 14px;
  @media (max-width: 1100px) {
    font-size: 14px;
  }
`;
const Regular = styled.span`
  display: block;
  font-size: 15px;
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
  @media (max-width: 1100px) {
    font-size: 13px;
  }
`;
const Description = styled.div`
  padding: 40px 46px 0 46px;
  @media (max-width: 1100px) {
    padding: 29px 25px 0 25px;
  }
`;
const Thead = styled.div`
  display: grid;
  grid-template-columns: 6fr 2fr 2fr;
  margin-bottom: 19px;
`;
const TopThead = styled.div`
  display: grid;
  grid-template-columns: 6fr 2fr 2fr;
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
  @media (max-width: 1100px) {
    font-size: 13px;
  }
`;
const Tdata = styled.div`
  padding: 12px 0 20px;
  min-height: 352px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid;
  @media (max-width: 1100px) {
    min-height: 304px;
  }
`;
const Trow = styled.div`
  display: grid;
  grid-template-columns: 6fr 2fr 2fr;
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
  @media (max-width: 1100px) {
    font-size: 14px;
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
  @media (max-width: 1100px) {
    padding: 27px 25px;
    border-bottom-width: 1px;
  }
`;
const Amount = styled.span`
  display: block;
  font-family: "baloo_paaji_2semibold";
  font-size: 19px;
  @media (max-width: 1100px) {
    font-size: 18px;
  }
`;
const Tax = styled.small`
  display: block;
  font-size: 14px;
  color: #f44336;
  margin: 7px 0 22px;
  @media (max-width: 1100px) {
    font-size: 13px;
  }
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
  @media (max-width: 1280px) {
    width: 86%;
  }
  @media (max-width: 1100px) {
    font-size: 11px;
    padding-top: 25px;
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
const TotalTop = styled.div``;
const TotalBottom = styled.div``;
const GrandTotalItem = styled.div`
  font-size: 16px;
  text-transform: uppercase;
  font-family: "baloo_paaji_2semibold";
  text-align: left;
  &:last-child {
    text-align: right;
  }
  @media (max-width: 1100px) {
    font-size: 14px;
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
const MobileInvoiceContainer = styled.div`
  padding: 0 20px;
`;
const MobileInvoice = styled.div`
  display: none;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
  padding: 13px 21px;
  @media (max-width: 640px) {
    display: flex;
  }
`;
const InvoiceStatus = styled.div``;
const MobileInvoiceSide = styled.div`
  display: flex;
  flex-direction: column;
`;
