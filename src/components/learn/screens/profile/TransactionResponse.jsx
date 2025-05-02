import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function TransactionResponse({
    transaction_status,
    invoice_link,
    mobile_btn_text,
    invo_link,
    message,
    receipt_id,
    mobile_message,
    title,
}) {
    return (
        <Container>
            {transaction_status === "success" ? (
                <Image
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/successful.svg"
                    alt="image"
                />
            ) : (
                <Image
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/failure.svg"
                    alt="image"
                />
            )}

            <Title>{title}</Title>
            <InvoiceId>Receipt ID : #{receipt_id}</InvoiceId>
            <MobileDescription>{mobile_message}</MobileDescription>
            <Description>{message}</Description>
            <MobileButton
                to={invo_link}
                style={{
                    background: transaction_status === "success" && "#57c082",
                }}
            >
                {mobile_btn_text}
            </MobileButton>
            <Button
                to={invoice_link}
                style={{
                    background: transaction_status === "success" && "#57c082",
                }}
            >
                View invoice
            </Button>
        </Container>
    );
}
const Container = styled.div`
    text-align: center;
    padding: 36px 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #f8f9fd;
    width: 100%;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    height: 100%;
    &::-webkit-scrollbar {
        display: none;
    }
    @media (max-width: 480px) {
        box-shadow: 0 8px 60px 0 rgba(103, 151, 255, 0.11),
            0 12px 90px 0 rgba(103, 151, 255, 0.11);
        background: unset;
    }
`;
const Image = styled.img`
    display: block;
    width: 27%;
`;
const Title = styled.h4`
    font-size: 24px;
    display: block;
    letter-spacing: 0.03rem;
    margin: 20px 0;
    @media (max-width: 480px) {
        font-size: 21px;
    }
`;
const InvoiceId = styled.span`
    display: block;
    letter-spacing: 0.03rem;
    color: #868686;
`;
const Description = styled.p`
    width: 33%;
    letter-spacing: 0.03rem;
    margin-top: 14px;
    @media (max-width: 1440px) {
        width: 46%;
    }
    @media (max-width: 1280px) {
        width: 56%;
    }
    @media (max-width: 640px) {
        display: none;
    }
`;
const MobileDescription = styled.p`
    display: none;
    width: 33%;
    letter-spacing: 0.03rem;
    margin-top: 14px;
    @media (max-width: 1440px) {
        width: 46%;
    }
    @media (max-width: 1280px) {
        width: 56%;
    }
    @media (max-width: 640px) {
        display: block;
    }
`;
const Button = styled(Link)`
    cursor: pointer;
    display: block;
    background: #fd5447;
    color: #fff;
    padding: 13px 33px;
    font-size: 16px;
    border-radius: 4px;
    letter-spacing: 0.03rem;
    margin-top: 34px;
    @media (max-width: 640px) {
        display: none;
    }
`;
const MobileButton = styled(Link)`
    cursor: pointer;
    display: none;
    background: #fd5447;
    color: #fff;
    padding: 13px 33px;
    font-size: 16px;
    border-radius: 4px;
    letter-spacing: 0.03rem;
    margin-top: 34px;
    @media (max-width: 640px) {
        display: block;
    }
`;
