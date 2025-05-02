import React from "react";
import styled from "styled-components";
import { numberWithCommas } from "../../../../helpers/functions";

export default function AddCoinCard({ is_coins_page, total_coins }) {
    return (
        <Container>
            <Wrapper>
                <Image src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/coin.svg" />
                <Middle>
                    <Title>{numberWithCommas(total_coins)}</Title>
                    <Description>Total Coins</Description>
                </Middle>
                {!is_coins_page && <Button>Add coins</Button>}
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
    background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/add-coin-bg.svg");
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: #f7fcff;
    border-radius: 10px;
    background-position: right top;
`;
const Wrapper = styled.div`
    padding: 24px 28px;
    background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/asset.svg");
    background-repeat: no-repeat;
    background-position: 16px 168px;
    @media (max-width: 1110px) {
        text-align: center;
    }
`;
const Image = styled.img`
    display: block;
    width: 58px;
    margin-bottom: 30px;
    @media (max-width: 1110px) {
        margin: 0 auto;
        margin-bottom: 30px;
    }
`;
const Middle = styled.div``;
const Title = styled.span`
    font-family: gordita_medium;
    font-size: 34px;
    @media (max-width: 1440px) {
        font-size: 29px;
    }
`;
const Description = styled.p`
    color: #565656;
    font-family: gordita_medium;
    margin-top: 11px;
    font-size: 14px;
    width: 94%;
`;
const Button = styled.div`
    width: fit-content;
    background: #5dd3a7;
    padding: 0 34px;
    margin-top: 25px;
    height: 36px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    font-family: "baloo_paaji_2semibold";
    font-size: 15px;
    color: #fff;
    cursor: pointer;
`;
const Arrow = styled.img`
    display: block;
    width: 14px;
    margin-left: 16px;
`;
