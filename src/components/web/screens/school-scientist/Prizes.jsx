import React from "react";
import styled from "styled-components";
import PriceBg from "../../../../assets/images/school-scientist/price-bg.png";
import Cloud from "../../../../assets/images/school-scientist/cloud.png";

function Prizes() {
    return (
        <Cover>
            <WrapperContainer className="wrapper">
                <SubContainer>
                    <Left>
                        <ImgContainer>
                            <img
                                src={require("../../../../assets/images/school-scientist/prize.png")}
                                alt="Image"
                            />
                        </ImgContainer>
                        <Para>
                            Winners will be awarded with{" "}
                            <Span>Certificates</Span>
                        </Para>
                    </Left>
                    <Right>
                        <PrizeContainer>
                            <img
                                src={require("../../../../assets/images/school-scientist/trophy-popper.png")}
                                alt="Image"
                            />
                        </PrizeContainer>
                    </Right>
                </SubContainer>
            </WrapperContainer>
        </Cover>
    );
}
export default Prizes;
const Cover = styled.div`
    padding: 90px 0px;
    background: url(${PriceBg});
    position: relative;
    @media all and (max-width: 980px) {
        padding: 60px 0px;
    }
    @media all and (max-width: 480px) {
        padding: 40px 0px;
    }
    ::after {
        content: "";
        display: inline-block;
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/cloud-image.svg");
        width: 220px;
        height: 122px;
        position: absolute;
        background-size: 80%;
        bottom: -15%;
        left: 7%;
        background-repeat: no-repeat;
        @media all and (max-width: 1380px) {
            background-size: 80%;
            bottom: -16%;
        }
        @media all and (max-width: 980px) {
            background-size: 80%;

            bottom: -21%;
        }
        @media all and (max-width: 768px) {
            background: none;
        }
        @media all and (max-width: 640px) {
            background-size: 48%;
            display: none;
        }
    }
`;
const WrapperContainer = styled.div``;
const SubContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    @media all and (max-width: 768px) {
        display: block;
    }
`;
const Left = styled.div`
    width: 55%;
    @media all and (max-width: 980px) {
        width: 50%;
    }
    @media all and (max-width: 768px) {
        width: 100%;
    }
`;
const ImgContainer = styled.div`
    width: 33%;
    @media all and (max-width: 1080px) {
        width: 40%;
    }
    @media all and (max-width: 1980px) {
        width: 45%;
    }
    @media all and (max-width: 480px) {
        width: 55%;
    }
    img {
        width: 100%;
        display: block;
    }
`;
const Para = styled.p`
    margin-top: 30px;
    color: #ffff;
    font-size: 22px;
    width: 65%;
    font-family: "gordita_medium" !important;
    @media all and (max-width: 1080px) {
        width: 90%;
    }
    @media all and (max-width: 1080px) {
        width: 100%;
        font-size: 20px;
    }
    @media all and (max-width: 768px) {
        width: 80%;
    }
    @media all and (max-width: 640px) {
        width: 100%;
    }
    @media all and (max-width: 480px) {
        margin-top: 40px;
    }
    @media all and (max-width: 360px) {
        font-size: 18px;
        margin-top: 25px;
    }
`;
const Span = styled.span`
    color: #EEC749;
    font-size: 22px;
    font-family: "gordita_medium" !important;
`;
const Right = styled.div`
    width: 45%;
    display: flex;
    position: relative;
    @media all and (max-width: 980px) {
        width: 50%;
    }
    @media all and (max-width: 768px) {
        width: 100%;
    }
    @media all and (max-width: 640px) {
        position: unset;
    }
`;
const PrizeContainer = styled.div`
    position: absolute;
    top: -12%;
    width: 63%;
    left: 45%;
    @media all and (max-width: 768px) {
        position: unset;
    }
    @media all and (max-width: 360px) {
    }

    img {
        width: 100%;
        display: block;
    }
`;
