import React, { useEffect, useRef, useState } from "react";
import download from "../../../../../assets/images/profile-screen/arrow-down.svg";
import styled from "styled-components";
import DropDownModal from "./Modals/DropDownModal";
import { serverConfig } from "../../../../../axiosConfig";
import { useSelector } from "react-redux";
import Moment from "moment";
import { parseISO, format } from "date-fns";
import RouteLoading from "../../../../routing/RouteLoading";
import { Link } from "@material-ui/core";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import InvoiceModal from "../../../includes/profile/modals/InvoiceModal";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Loader from "../../../includes/techschooling/general/loaders/Loader";
import RequestLoader from "../../../includes/authentication/general/RequestLoader";
import NoData from "../../../includes/general/NoData";

function PaymentHistory({ userProfileDetails }) {
    const [isModal, setModal] = useState(false);
    const [selectedid, setSelectedId] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [isButtonloading, setButtonloading] = useState(false);
    const [isInvoice, setInvoice] = useState(false);
    const [posterGenerated, setPosterGenerated] = useState(false);
    const [previd, setPrevId] = useState("");
    const [transaction, setTransaction] = useState("");
    const [isDownload, setDownload] = useState(false);

    const {
        user_data: { access_token },
    } = useSelector((state) => state);

    const [invoiceList, setInvoiceList] = useState([]);
    const [invoiceType, setInvoiceType] = useState("");

    function formatDate(date) {
        if (!date) return "---";

        const parsedDate = parseISO(date);
        const formattedDate = format(parsedDate, "dd-MM-yyyy");

        return formattedDate;
    }

    useEffect(() => {
        setLoading(true);
        serverConfig
            .get(
                `/transactions/aep/payment_invoice/${userProfileDetails.user}/`,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            )
            .then((response) => {
                const { status_code, data } = response.data;
                if (status_code === 6000) {
                    setInvoiceList(data);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            })
            .catch((error) => {
                setLoading(false);
            });
    }, []);
    console.log(userProfileDetails, "userProfileDetailsuserProfileDetails");

    const containerRef = useRef(null);
    const [datas, setDatas] = useState("");

    useEffect(() => {
        if (datas) {
            console.log("downloadInvoice", datas);
            downloadInvoice();
        }
    }, [datas]);

    const downloadInvoice = () => {
        try {
            const container = containerRef.current;
            html2canvas(container, { scale: 4 }).then((canvas) => {
                const imgData = canvas.toDataURL("image/png", 1.0);
                const pdf = new jsPDF("p", "mm", "a4", true);
                pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
                pdf.save("invoice.pdf");
                setDownload(true);

                setTimeout(() => {
                    setDownload(false);
                    setButtonloading(false);
                }, 1000);
            });
        } catch (error) {}
    };

    const [array, setArray] = useState([]);

    const getTransaction = (list) => {
        let data = list.find((item) => item.invoice_type_name === transaction);
        setArray(data);
    };

    useEffect(() => {
        if (invoiceList && transaction) {
            getTransaction(invoiceList);
        }
    }, [invoiceList, transaction]);

    return (
        <>
            {isLoading ? (
                <RouteLoading />
            ) : (
                <>
                    <PaymentContainer>
                        {isInvoice ? (
                            ""
                        ) : (
                            <>
                                <Heading>Invoices</Heading>
                                <SmallHeading>
                                    my transaction / Invoices
                                </SmallHeading>
                            </>
                        )}
                        <BottomContainer>
                            {isInvoice ? (
                                ""
                            ) : (
                                <Items>
                                    <ItemsList type="name">
                                        <span>Invoice</span>
                                        <DownloadContainer>
                                            <Download
                                                src={download}
                                                alt="DownloadIMage"
                                            />
                                        </DownloadContainer>
                                    </ItemsList>
                                    <ItemsList type="plan" className="none">
                                        Plans
                                    </ItemsList>
                                    <ItemsList type="amount" className="hide">
                                        Amount
                                    </ItemsList>
                                    <ItemsList type="date">Date</ItemsList>
                                    <ItemsList type="text"></ItemsList>
                                </Items>
                            )}
                            {invoiceList && transaction ? (
                                <>
                                    {array ? (
                                        <InvoiceModal
                                            key={array.id} // Make sure to provide datas unique key if 'item' has an 'id'
                                            // isInvoice={isInvoice}
                                            // setInvoice={setInvoice}
                                            downloadInvoice={downloadInvoice}
                                            containerRef={containerRef}
                                            invoiceList={invoiceList}
                                            item={array}
                                            transaction={transaction}
                                            isButtonloading={isButtonloading}
                                            setButtonloading={setButtonloading}
                                            setDatas={setDatas}
                                        />
                                    ) : null}
                                </>
                            ) : (
                                ""
                            )}
                            {invoiceList.length > 0 ? (
                                <>
                                    {invoiceList &&
                                        // transaction === "" &&
                                        invoiceList.map((item) => (
                                            <>
                                                <FlexContainer
                                                    transaction={transaction}
                                                >
                                                    {/* {isModal &&
                                                  selectedid === item.id && (
                                                      <ModalContienr>
                                                          <DropDownModal
                                                              isModal={isModal}
                                                              downloadInvoice={
                                                                  downloadInvoice
                                                              }
                                                          />
                                                      </ModalContienr>
                                                  )} */}
                                                    <Content
                                                        key={item.id}
                                                        type="name"
                                                    >
                                                        {item.invoice_id}
                                                    </Content>
                                                    <Content
                                                        type="plan"
                                                        className="hide"
                                                    >
                                                        {item.plan
                                                            ? item.plan
                                                            : "--"}
                                                    </Content>
                                                    <Content
                                                        type="amount"
                                                        className="none"
                                                    >
                                                        {item.total_amount}
                                                    </Content>
                                                    <Content type="date">
                                                        {item.invoice_date &&
                                                            formatDate(
                                                                Moment(
                                                                    item?.invoice_date
                                                                )?.format(
                                                                    "YYYY-MM-DD"
                                                                )
                                                            )}
                                                    </Content>
                                                    <Content type="text">
                                                        <div
                                                            onClick={() => {
                                                                setDatas(item);
                                                            }}
                                                        >
                                                            {isDownload &&
                                                            datas.invoice_id ===
                                                                item.invoice_id ? (
                                                                <img
                                                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/05-12-2023/check.svg"
                                                                    alt="copyImage"
                                                                    className="size"
                                                                />
                                                            ) : (
                                                                <img
                                                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/16-12-2023/download.svg"
                                                                    alt="downloadButton"
                                                                />
                                                            )}
                                                        </div>

                                                        <PrevButton
                                                            onClick={() => {
                                                                setInvoice(
                                                                    true
                                                                );
                                                                setPrevId(
                                                                    item?.user_pk
                                                                );
                                                                setTransaction(
                                                                    item?.invoice_type_name
                                                                        ? item?.invoice_type_name
                                                                        : ""
                                                                );
                                                            }}
                                                        >
                                                            {/* {posterGenerated
                                                          ? "Genarate"
                                                          : "Preview"} */}
                                                            Preview
                                                        </PrevButton>
                                                        <DownloadButton
                                                            onClick={() => {
                                                                //   downloadInvoice(item);
                                                                setDatas(item);
                                                                setButtonloading(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            {isButtonloading &&
                                                            datas.invoice_id ===
                                                                item.invoice_id ? (
                                                                <RequestLoader
                                                                    width={20}
                                                                    height={20}
                                                                />
                                                            ) : (
                                                                "Download"
                                                            )}
                                                        </DownloadButton>
                                                    </Content>
                                                </FlexContainer>
                                                <InvoiceBottom>
                                                    <InvoiceSheet
                                                        ref={containerRef}
                                                    >
                                                        {datas?.invoice_type_name ===
                                                        "export" ? (
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
                                                                {
                                                                    datas.invoice_id
                                                                }
                                                            </InvoiceContent>
                                                            <InvoiceContent className="second">
                                                                {
                                                                    datas.invoice_date
                                                                }
                                                            </InvoiceContent>
                                                            <InvoiceContent className="third">
                                                                {
                                                                    datas.state_code
                                                                }
                                                            </InvoiceContent>
                                                            <InvoiceContent className="fourth">
                                                                {
                                                                    datas.currency_type
                                                                }
                                                            </InvoiceContent>
                                                        </InvoiceDetails>
                                                        <LuntNumber>
                                                            {datas.lut_number}
                                                        </LuntNumber>
                                                        {/* <StudentsCover> */}
                                                        <StudentDetails>
                                                            <StudentName>
                                                                {
                                                                    datas.recipient_name
                                                                }
                                                            </StudentName>
                                                            <StudentAddress>
                                                                {datas.address}
                                                            </StudentAddress>
                                                            <Pincode>
                                                                {datas.pincode}
                                                            </Pincode>
                                                            <State>
                                                                {
                                                                    datas.local_body_state
                                                                }
                                                            </State>
                                                            <Country>
                                                                {datas.country}
                                                            </Country>
                                                        </StudentDetails>
                                                        <StudentDetail
                                                            style={{
                                                                width: "44.5%",
                                                                textAlign:
                                                                    "left",
                                                            }}
                                                        >
                                                            <StudentTransactionMode
                                                                style={{
                                                                    top:
                                                                        datas?.invoice_type_name ===
                                                                            "export" &&
                                                                        datas.transaction_mode
                                                                            ? "362px"
                                                                            : "364px",
                                                                }}
                                                            >
                                                                {
                                                                    datas.transaction_mode
                                                                }
                                                            </StudentTransactionMode>
                                                            <StudentTransactionId
                                                                style={{
                                                                    top:
                                                                        datas?.invoice_type_name ===
                                                                            "export" &&
                                                                        datas.transaction_id
                                                                            ? "380px"
                                                                            : "383px",
                                                                }}
                                                            >
                                                                {
                                                                    datas.transaction_id
                                                                }
                                                            </StudentTransactionId>
                                                        </StudentDetail>
                                                        <StudentDatas>
                                                            <StudentId>
                                                                {datas.user_pk}
                                                            </StudentId>
                                                            <Phone>
                                                                {datas.phone}
                                                            </Phone>
                                                        </StudentDatas>
                                                        <SrviceDiv>
                                                            <SrviceName>
                                                                {
                                                                    datas.service_name
                                                                }
                                                            </SrviceName>
                                                            <HsnCode>
                                                                {datas.sac_code}
                                                            </HsnCode>
                                                        </SrviceDiv>
                                                        <ServiceDatas>
                                                            {/* <Code >sac_code</Code> */}
                                                            <Code>
                                                                {
                                                                    datas.unit_price
                                                                }
                                                            </Code>
                                                            <TotalAmount>
                                                                {
                                                                    datas.total_amount
                                                                }
                                                            </TotalAmount>
                                                        </ServiceDatas>
                                                        <Fee>
                                                            {/* <TaxValue>
                                                                {
                                                                    datas.taxable_value
                                                                }
                                                            </TaxValue> */}
                                                            <Igst
                                                                style={{
                                                                    right:
                                                                        datas.invoice_type_name ===
                                                                            "interstate" &&
                                                                        datas.igst &&
                                                                        "90px",
                                                                }}
                                                            >
                                                                {datas.igst}
                                                            </Igst>
                                                            <Cgst
                                                                style={{
                                                                    right:
                                                                        datas.invoice_type_name ===
                                                                        "export"
                                                                            ? datas.cgst &&
                                                                              "103px"
                                                                            : "92px",
                                                                }}
                                                            >
                                                                {datas.cgst}
                                                            </Cgst>
                                                            <Sgst
                                                                style={{
                                                                    right:
                                                                        datas.invoice_type_name ===
                                                                        "export"
                                                                            ? datas.sgst &&
                                                                              "103px"
                                                                            : "92px",
                                                                }}
                                                            >
                                                                {datas.sgst}
                                                            </Sgst>
                                                        </Fee>
                                                        <WordAmount>
                                                            {datas.total_amount}
                                                        </WordAmount>
                                                        <Word>
                                                            {
                                                                datas.amount_in_words
                                                            }
                                                        </Word>
                                                        <RenderPoster id="render"></RenderPoster>
                                                    </InvoiceSheet>
                                                </InvoiceBottom>
                                            </>
                                        ))}
                                </>
                            ) : (
                                <NoData />
                            )}
                        </BottomContainer>
                    </PaymentContainer>
                </>
            )}
        </>
    );
}
const PaymentContainer = styled.div`
    padding: 0px 0px 30px 0px;
`;
const Heading = styled.h3`
    color: #1e1e1e;
    font-size: 28px;
    font-family: "gordita_medium";
    margin-bottom: 2px;
    @media (max-width: 640px) {
        font-size: 21px;
    }
`;
const SmallHeading = styled.p`
    display: block;
    font-size: 16px;
    font-family: "gordita_regular";
    color: #747474;
    margin-bottom: 16px;
    @media (max-width: 640px) {
        font-size: 14px;
    }
`;
const BottomContainer = styled.div`
    border: 1px solid #d0d5dd;
    border-radius: 10px;
`;
const Items = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    background: #f4f4ff;
    padding: 10px 12px;
    border-radius: 10px 10px 0px 0px;
    border-bottom: 1px solid #d0d5dd;
`;
const ItemsList = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: "gordita_medium";
    color: #475467;
    width: ${({ type }) =>
        type === "name"
            ? "25%"
            : type === "plan"
            ? "12%"
            : type === "amount"
            ? "12%"
            : type === "date"
            ? "20%"
            : type === "text"
            ? "30%"
            : "50%"};

    span {
        margin-right: 5px;
        font-size: 14px;
        font-family: "gordita_medium";
        color: #475467;
        @media (max-width: 480px) {
            font-size: 12px;
            margin-bottom: 0;
        }
    }
    @media all and (max-width: 980px) {
        &.none {
            display: none;
        }
    }

    @media (max-width: 640px) {
        width: ${({ type }) =>
            type === "name"
                ? "33%"
                : type === "plan"
                ? "29%"
                : type === "amount"
                ? "18%"
                : type === "date"
                ? "28%"
                : type === "text"
                ? "9%"
                : "50%"};
    }
    @media (max-width: 480px) {
        &.hide {
            display: none;
        }
        width: ${({ type }) =>
            type === "name"
                ? "41%"
                : type === "plan"
                ? "29%"
                : type === "amount"
                ? "18%"
                : type === "date"
                ? "28%"
                : type === "text"
                ? "9%"
                : "50%"};
        font-size: 12px;
    }
    @media all and (max-width: 360px) {
        width: ${({ type }) =>
            type === "name"
                ? "47%"
                : type === "plan"
                ? "29%"
                : type === "amount"
                ? "18%"
                : type === "date"
                ? "28%"
                : type === "text"
                ? "9%"
                : "50%"};
    }
`;
const DownloadContainer = styled.div`
    width: 16px;
`;
const Download = styled.img`
    width: 100%;
    display: block;
`;
const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border-bottom: 1px solid #d0d5dd;
    position: relative;

    height: ${({ transaction }) => transaction !== "" && "0"};
    opacity: ${({ transaction }) => transaction !== "" && "0"};
    padding: ${({ transaction }) => transaction !== "" && "0"};

    &:last-child {
        border-bottom: none;
    }
`;
const Content = styled.div`
    width: ${({ type }) =>
        type === "name"
            ? "25%"
            : type === "plan"
            ? "12%"
            : type === "amount"
            ? "12%"
            : type === "date"
            ? "20%"
            : type === "text"
            ? "30%"
            : "50%"};
    color: ${({ type }) =>
        type === "name"
            ? "#191919"
            : type === "plan"
            ? "#747474"
            : type === "amount"
            ? "#475467"
            : type === "date"
            ? "#747474"
            : "#0000"};
    font-size: 14px;
    font-family: ${({ type }) =>
        type === "name" ? "gordita_medium" : "gordita_regular"};
    &:last-child {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        /* @media (max-width: 360px) {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        } */
    }
    img {
        display: none;
        @media (max-width: 640px) {
            display: block;
            width: 20px;
        }
        &.size {
            width: 20px;
        }
    }

    @media all and (max-width: 980px) {
        &.hide {
            display: none;
        }
    }

    @media (max-width: 640px) {
        width: ${({ type }) =>
            type === "name"
                ? "33%"
                : type === "plan"
                ? "29%"
                : type === "amount"
                ? "18%"
                : type === "date"
                ? "28%"
                : type === "text"
                ? "9%"
                : "50%"};
        font-size: 13px;
    }
    @media (max-width: 480px) {
        &.none {
            display: none;
        }
        width: ${({ type }) =>
            type === "name"
                ? "41%"
                : type === "plan"
                ? "29%"
                : type === "amount"
                ? "18%"
                : type === "date"
                ? "28%"
                : type === "text"
                ? "9%"
                : "50%"};
    }

    @media all and (max-width: 360px) {
        width: ${({ type }) =>
            type === "name"
                ? "47%"
                : type === "plan"
                ? "29%"
                : type === "amount"
                ? "18%"
                : type === "date"
                ? "30%"
                : type === "text"
                ? "9%"
                : "50%"};
    }
`;
const PrevButton = styled.div`
    margin-right: 10px;
    border: 1px solid #d0d5dd;
    padding: 12px 20px;
    font-size: 14px;
    font-family: "gordita_medium";
    border-radius: 8px;
    color: black;
    display: block;
    cursor: pointer;
    @media (max-width: 768px) {
        padding: 8px 12px;
    }

    img {
        display: none;
        @media (max-width: 640px) {
            display: block;
            margin-right: 20px;
        }
    }
    @media (max-width: 640px) {
        display: none;
    }
`;
const DownloadButton = styled.a`
    background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
    color: #fff;
    padding: 12px 20px;
    font-size: 14px;
    font-family: "gordita_medium";
    border-radius: 8px;
    cursor: pointer;
    display: block;
    min-width: 112px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
        padding: 8px 12px;
    }
    /* @media (max-width: 480px) {
        display: none;
    } */
    img {
        display: none;
        @media (max-width: 640px) {
            display: block;
        }
    }
    @media (max-width: 640px) {
        display: none;
    }
`;
const InvoiceBottom = styled.div`
    background: #f9f9fb;
    border-radius: 8px;
    height: 0;
    overflow: hidden;
`;
const InvoiceSheet = styled.div`
    width: 561px;
    margin: 0 auto;
    position: relative;
    img {
        width: 100%;
        display: block;
    }
    /* @media (max-width: 640px) {
        width: 400px;
    }
    @media (max-width: 480px) {
        width: 300px;
    }
    @media (max-width: 360px) {
        width: 260px;
    } */
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
        top: 100px;
        left: 64%;
    }
    &.second {
        position: absolute;
        top: 118px;
        left: 64%;
    }
    &.third {
        position: absolute;
        top: 136px;
        left: 64%;
    }
    &.fourth {
        position: absolute;
        top: 153px;
        left: 64%;
    }
`;
const LuntNumber = styled.p`
    font-family: "open_sans_bold";
    color: #0a0a0a;
    font-size: 7px;
    position: absolute;
    top: 218px;
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
    top: 242px;
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
    top: 260px;
    left: 72px;
`;
const Pincode = styled.p`
    color: #0a0a0a;
    font-size: 7px;
    font-family: "open_sans_bold";
    text-align: start;
    position: absolute;
    top: 312px;
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
    top: 312px;
    left: 71px;
`;
const StudentTransactionId = styled.p`
    color: #0a0a0a;
    font-size: 7px;
    font-family: "open_sans_bold";
    margin-right: 18px;
    position: absolute;
    top: 383px;
    right: 166px;
`;
const StudentDatas = styled.div``;
const StudentId = styled.p`
    color: #0a0a0a;
    font-size: 7px;
    font-family: "open_sans_bold";
    position: absolute;
    top: 364px;
    left: 111px;
`;
const Phone = styled.p`
    color: #0a0a0a;
    font-size: 7px;
    font-family: "open_sans_bold";
    position: absolute;
    top: 381px;
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

export default PaymentHistory;
