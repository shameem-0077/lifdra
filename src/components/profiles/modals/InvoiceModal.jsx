import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PaymentHistory from "../../learn/screens/profile/my-profile/PaymentHistory";
import RequestLoader from "../../authentications/components/RequestLoader";

function InvoiceModal({
    isInvoice,
    downloadInvoice,
    containerRef,
    item,
    isButtonloading,
    setButtonloading,
    setDatas,
}) {
    return (
        <>
            <InvoiceContainer className={isInvoice ? "active" : ""}>
                <MainConainer>
                    <PreviewContainer>
                        <PreviewHeading>Invoice Preview</PreviewHeading>
                        <PreviewSubheading>
                            my transaction / Invoices
                        </PreviewSubheading>
                    </PreviewContainer>
                    <DownLoadInvoice
                        onClick={() => {
                            setButtonloading(true);
                            // downloadInvoice();
                            setDatas(item);
                        }}
                    >
                        {isButtonloading ? (
                            <RequestLoader width={21} height={21} />
                        ) : (
                            <DownloadImageContainer>
                                <img
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/16-12-2023/download-1.svg"
                                    alt="DownloadButton"
                                />
                            </DownloadImageContainer>
                        )}
                        <DownloadText>Download Invoice</DownloadText>
                    </DownLoadInvoice>
                </MainConainer>
                <TotalContainer>
                    <InvoiceBottom>
                        <InvoiceSheet>
                            {item?.invoice_type_name === "export" ? (
                                <img
                                    src={require("../../../../../assets/images/profile-screen/Tax-Invoice.jpg")}
                                    alt="Invoice"
                                />
                            ) : (
                                <img
                                    src={require("../../../../../assets/images/profile-screen/B2C.png")}
                                    alt="Invoice B2C"
                                />
                            )}
                            <InvoiceDetails>
                                <InvoiceContent className="first">
                                    {item.invoice_id}
                                </InvoiceContent>
                                <InvoiceContent className="second">
                                    {item.invoice_date}
                                </InvoiceContent>
                                <InvoiceContent className="third">
                                    {item.state_code}
                                </InvoiceContent>
                                <InvoiceContent className="fourth">
                                    {item.currency_type}
                                </InvoiceContent>
                            </InvoiceDetails>
                            <LuntNumber>
                                {item?.invoice_type_name === "export"
                                    ? item.lut_number
                                    : ""}
                            </LuntNumber>
                            {/* <StudentsCover> */}
                            <StudentDetails>
                                <StudentName>{item.recipient_name}</StudentName>
                                <StudentAddress>{item.address}</StudentAddress>
                                <Pincode>{item.pincode}</Pincode>
                                <State>{item.local_body_state}</State>
                                <Country>{item.country}</Country>
                            </StudentDetails>
                            <StudentDetail
                                style={{ width: "44.5%", textAlign: "left" }}
                            >
                                <StudentTransactionMode
                                    style={{
                                        top:
                                            item?.invoice_type_name ===
                                                "export" &&
                                            item.transaction_mode
                                                ? "364px"
                                                : "366px",
                                    }}
                                >
                                    {item.transaction_mode}
                                </StudentTransactionMode>
                                <StudentTransactionId
                                    style={{
                                        top:
                                            item?.invoice_type_name ===
                                                "export" && item.transaction_id
                                                ? "381px"
                                                : "384px",
                                    }}
                                >
                                    {item.transaction_id}
                                </StudentTransactionId>
                            </StudentDetail>
                            {/* </StudentsCover> */}
                            <StudentDatas>
                                <StudentId>{item.user_pk}</StudentId>
                                <Phone>{item.phone}</Phone>
                            </StudentDatas>
                            <SrviceDiv>
                                <SrviceName>{item.service_name}</SrviceName>
                                <HsnCode>{item.sac_code}</HsnCode>
                            </SrviceDiv>
                            <ServiceDatas>
                                {/* <Code >sac_code</Code> */}
                                <Code>{item.unit_price}</Code>
                                <TotalAmount>{item.total_amount}</TotalAmount>
                            </ServiceDatas>
                            <Fee>
                                <TaxValue>{item.taxable_value}</TaxValue>
                                <Igst
                                    style={{
                                        right:
                                            item.invoice_type_name ===
                                                "interstate" &&
                                            item.igst &&
                                            "90px",
                                    }}
                                >
                                    {item.igst}
                                </Igst>
                                <Cgst
                                    style={{
                                        right:
                                            item.invoice_type_name === "export"
                                                ? item.cgst && "103px"
                                                : "92px",
                                    }}
                                >
                                    {item.cgst}
                                </Cgst>
                                <Sgst
                                    style={{
                                        right:
                                            item.invoice_type_name === "export"
                                                ? item.sgst && "103px"
                                                : "92px",
                                    }}
                                >
                                    {item.sgst}
                                </Sgst>
                            </Fee>
                            <WordAmount>{item.total_amount}</WordAmount>
                            <Word>{item.amount_in_words}</Word>
                            <RenderPoster id="render"></RenderPoster>
                        </InvoiceSheet>
                    </InvoiceBottom>
                </TotalContainer>
            </InvoiceContainer>
        </>
    );
}

const InvoiceContainer = styled.div`
    /* transition: 0.3s;
    transform: scale(0);

    &.active {
        transform: scale(1);
    z-index: 9999;

    } */
`;
const MainConainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    flex-wrap: wrap;
    padding: 20px;
`;
const PreviewContainer = styled.div``;
const PreviewHeading = styled.h2`
    font-size: 28px;
    font-family: gordita_medium;
    color: #1e1e1e;
    @media (max-width: 640px) {
        font-size: 21px;
    }
`;
const PreviewSubheading = styled.p`
    font-size: 16px;
    font-family: "gordita_regular";
    color: #747474;
    @media (max-width: 640px) {
        font-size: 14px;
    }
    @media (max-width: 480px) {
        margin-bottom: 10px;
    }
`;
const DownLoadInvoice = styled.div`
    background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
    display: flex;
    align-items: center;
    padding: 8px 20px;
    border-radius: 6px;
    cursor: pointer;
    min-width: 197px;
`;
const DownloadImageContainer = styled.div`
    margin-right: 9px;
    width: 21px;
    img {
        display: block;
        width: 100%;
    }
`;
const DownloadText = styled.a`
    color: #fff;
    font-size: 14px;
    font-family: gordita_medium;
    padding-top: 4px;
`;
const TotalContainer = styled.div``;
const InvoiceBottom = styled.div`
    background: #f9f9fb;
    padding: 60px 0px;
    border-radius: 8px;
    @media (max-width: 768px) {
        padding: 30px 0px;
    }
    @media (max-width: 480px) {
        padding: 21px 0px;
    }
`;
const InvoiceSheet = styled.div`
    width: 561px;
    margin: 0 auto;
    position: relative;
    img {
        width: 100%;
        display: block;
    }
`;
const InvoiceDetails = styled.div`
    text-align: center;
    text-align: left;
`;

const InvoiceContent = styled.p`
    font-size: 7px;
    vertical-align: center;
    color: #0a0a0a;
    text-transform: uppercase;
    font-family: "open_sans_bold";
    &.first {
        position: absolute;
        top: 102px;
        left: 64%;
    }
    &.second {
        position: absolute;
        top: 119px;
        left: 64%;
    }
    &.third {
        position: absolute;
        top: 137px;
        left: 64%;
    }
    &.fourth {
        position: absolute;
        top: 155px;
        left: 64%;
    }
`;
const LuntNumber = styled.p`
    font-family: "open_sans_bold";
    color: #0a0a0a;
    font-size: 7px;
    position: absolute;
    top: 219px;
    right: 23.6%;
`;
const StudentsCover = styled.div`
    /* display: flex !important;
    justify-content: space-between; */
`;
const StudentDetails = styled.div`
    text-transform: capitalize;
`;
const StudentDetail = styled.div``;
const StudentTransactionMode = styled.p`
    font-family: "open_sans_bold";
    color: #0a0a0a;
    font-size: 7px;
    position: absolute;
    /* top: 367px; */
    right: 125px;
`;
const WordAmount = styled.p`
    font-family: "open_sans_bold";
    color: #0a0a0a;
    font-size: 8px;
    position: absolute;
    bottom: 194px;
    right: 93px;
`;
const Word = styled.p`
    font-family: "open_sans_bold";
    color: #0a0a0a;
    font-size: 8px;
    position: absolute;
    bottom: 170px;
    left: 244px;
`;
const StudentName = styled.p`
    font-size: 7px;
    font-family: "open_sans_bold";
    position: absolute;
    top: 243px;
    left: 72px;
    color: #0a0a0a;
`;
const RenderPoster = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
    display: none;
    canvas {
        border: 1px solid #e8e8e8;
    }
`;
const StudentAddress = styled.p`
    color: #0a0a0a;
    font-size: 7px;
    font-family: "open_sans_bold";
    position: absolute;
    top: 261px;
    left: 72px;
`;
const Pincode = styled.p`
    color: #0a0a0a;
    font-size: 7px;
    font-family: "open_sans_bold";
    text-align: start;
    position: absolute;
    top: 314px;
    left: 219px;
`;
const State = styled.p`
    color: #0a0a0a;
    font-size: 7px;
    font-family: "open_sans_bold";
    text-align: start;
    position: absolute;
    top: 296px;
    left: 72px;
`;
const Country = styled.p`
    color: #0a0a0a;
    font-size: 7px;
    font-family: "open_sans_bold";
    text-align: start;
    position: absolute;
    top: 313px;
    left: 71px;
`;
const StudentTransactionId = styled.p`
    color: #0a0a0a;
    font-size: 7px;
    font-family: "open_sans_bold";
    margin-right: 18px;
    position: absolute;
    /* top: 381px; */
    right: 166px;
`;
const StudentDatas = styled.div``;
const StudentId = styled.p`
    color: #0a0a0a;
    font-size: 7px;
    font-family: "open_sans_bold";
    position: absolute;
    top: 365px;
    left: 111px;
`;
const Phone = styled.p`
    color: #0a0a0a;
    font-size: 7px;
    font-family: "open_sans_bold";
    position: absolute;
    top: 382px;
    left: 111px;
`;
const TaxValue = styled.p`
    color: #0a0a0a;
    font-size: 7px;
    font-family: "open_sans_bold";
    position: absolute;
    bottom: 293px;
    right: 84px;
`;
const Igst = styled.p`
    color: #0a0a0a;
    font-size: 7px;
    font-family: "open_sans_bold";
    position: absolute;
    bottom: 269px;
    right: 103px;
`;
const Cgst = styled.p`
    color: #0a0a0a;
    font-size: 7px;
    font-family: "open_sans_bold";
    position: absolute;
    bottom: 244px;
`;
const Sgst = styled.p`
    color: #0a0a0a;
    font-size: 7px;
    font-family: "open_sans_bold";
    position: absolute;
    bottom: 220px;
`;
const FeeRow = styled.p`
    font-family: "open_sans_bold";
    color: #0a0a0a;
    font-size: 11px;
    display: flex;
`;
const ServiceDatas = styled.div`
    display: flex;
`;
const Code = styled.p`
    font-family: "open_sans_bold";
    color: #0a0a0a;
    font-size: 7px;
    position: absolute;
    bottom: 322px;
    right: 250px;
`;
const TotalAmount = styled.p`
    font-family: "open_sans_bold";
    color: #0a0a0a;
    font-size: 7px;
    position: absolute;
    bottom: 322px;
    right: 98px;
`;
const Fee = styled.div``;

const SrviceDiv = styled.div``;
const SrviceName = styled.p`
    font-family: "open_sans_bold";
    color: #0a0a0a;
    font-size: 7px;
    position: absolute;
    bottom: 322px;
    left: 38px;
`;
const HsnCode = styled.p`
    font-family: "open_sans_bold";
    color: #0a0a0a;
    font-size: 7px;
    position: absolute;
    bottom: 322px;
    left: 163px;
`;

export default InvoiceModal;
