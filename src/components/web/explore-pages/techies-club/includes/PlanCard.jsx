import React from "react";
import styled from "styled-components";

function PlanCard({ data }) {
    return (
        <Container>
            <Duration style={{ "text-align": data.discount && "start" }}>1 Month</Duration>
            <OfferLabel>Offer Price</OfferLabel>
            <DiscountPrice>&#8377;1,300</DiscountPrice>
            {data.discount && <ActualPrice>&#8377;2,600</ActualPrice>}
        </Container>
    );
}

export default PlanCard;

const Container = styled.div`
    background-color: #fff;
    padding: 30px;
    overflow: hidden;
    border-radius: 20px;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`;

const Duration = styled.p`
    text-align: center;
    font-size: 24px;
    color: #383f50d9;
    font-family: gordita_medium;
    padding-bottom: 30px;
    border-bottom: 1px dashed #eeeeee;
    margin-bottom: 30px;
`;

const OfferLabel = styled.p`
    font-size: 16px;
    text-align: center;
    color: #0fa76f;
    font-family: gordita_medium;
`;
const DiscountPrice = styled.h3`
    font-size: 38px;
    text-align: center;
    color: #0fa76f;
    font-family: gordita_bold;
`;

const ActualPrice = styled.p`
    text-align: center;
    font-size: 24px;
    color: #383f50;
    font-family: gordita_medium;
`;
