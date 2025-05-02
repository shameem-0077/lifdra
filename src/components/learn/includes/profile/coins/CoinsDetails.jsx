import React from "react";
import styled from "styled-components";
import { numberWithCommas } from "../../../../helpers/functions";

export default function CoinsDetails({
    total_earned_coins,
    total_gifted_coins,
    total_purchased_coins,
}) {
    return (
        <Container>
            <Card>
                <Wrap>
                    <Title>{numberWithCommas(total_gifted_coins)}</Title>
                    <Description>Gifted</Description>
                </Wrap>
            </Card>
            <Card>
                <Wrap>
                    <Title>{numberWithCommas(total_purchased_coins)}</Title>
                    <Description>Purchased</Description>
                </Wrap>
            </Card>
            <Card>
                <Wrap>
                    <Title>{numberWithCommas(total_earned_coins)}</Title>
                    <Description>Earned</Description>
                </Wrap>
            </Card>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const Card = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background: #ddf1fc;
    justify-content: center;
    height: 94px;
    border-radius: 15px;
    margin-bottom: 10px;
    &:nth-child(2) {
        background-color: #fef9d4;
        background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/card2-bg1.svg");
        background-position: left bottom;
        background-repeat: no-repeat;
    }
    &:last-child {
        background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/card1-bg2.svg"),
            url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/asset.svg");
        background-position: right bottom, left top;
        background-repeat: no-repeat, no-repeat;
        margin-bottom: 0;
    }
    background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/card1-bg1.svg"),
        url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/card1-bg2.svg");
    background-position: right bottom, left top;
    background-repeat: no-repeat, no-repeat;
`;
const Wrap = styled.div`
    text-align: center;
    width: 65px;
`;
const Title = styled.span`
    display: block;
    font-family: gordita_medium;
    font-size: 27px;
    @media (max-width: 1440px) {
        font-size: 24px;
    }
`;
const Description = styled.small`
    font-family: gordita_medium;
    display: block;
    font-size: 14px;
    margin-top: 7px;
    color: #7d7c7c;
`;
