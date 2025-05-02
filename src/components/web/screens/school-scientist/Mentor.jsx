import React from "react";
import styled from "styled-components";

function Mentor() {
    return (
        <Cover>
            <WrapperContainer className="wrapper">
                <SubContainer>
                    <Left>
                        <ImgContainer>
                            <img
                                src={require("../../../../assets/images/school-scientist/mentor.png")}
                                alt="Mentor"
                            />
                        </ImgContainer>
                    </Left>
                    <Right>
                        <Heading>Chief Patron and Mentor</Heading>
                        <SubHeading>
                            Meet India’s Moon Mission Pioneer!
                        </SubHeading>
                        <Para>
                            Former ISRO Chairman and Indian Space Scientist,{" "}
                            <span>Dr. G. Madhavan Nair</span>, will join us on
                            this quest to discover Trivandrum's brightest minds.
                            He led the Moon Mission in India, which was a
                            significant milestone for India's space program.
                            Moreover, he is the recipient of India's
                            second-highest civilian honor, the Padma Vibhushan.
                        </Para>
                    </Right>
                </SubContainer>
            </WrapperContainer>
        </Cover>
    );
}

export default Mentor;

const Cover = styled.div`
    padding: 90px 0px;
    display: flex;
    justify-content: space-between;
    background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/mentor-bg.png");
    position: relative;
    background-position-x: -13px;
    background-size: 94%;
    background-position-y: -46px;
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
        background-repeat: no-repeat;
        width: 220px;
        height: 122px;
        position: absolute;
        bottom: -10%;
        left: 14%;
        background-size: 100%;

        @media all and (max-width: 1380px) {
            background-size: 80%;
            left: 1%;
        }
        @media all and (max-width: 1280px) {
            bottom: -13%;
        }
        @media all and (max-width: 980px) {
            bottom: -7%;
        }
        @media all and (max-width: 768px) {
            background-size: 70%;
            bottom: -9%;
        }
        @media all and (max-width: 640px) {
            display: none;
        }
    }
`;
const WrapperContainer = styled.div``;
const SubContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media all and (max-width: 980px) {
        display: block;
    }
`;
const Left = styled.div`
    width: 45%;
    @media all and (max-width: 980px) {
        width: 100%;
        margin-bottom: 30px;
    }
`;
const ImgContainer = styled.div`
    width: 100%;
    img {
        width: 100%;
        display: block;
    }
`;
// const ContentBox = styled.div``;
// const Span = styled.span``;
// const H3 = styled.h3``;
// const SubPara = styled.p``;
const Right = styled.div`
    width: 50%;
    @media all and (max-width: 980px) {
        width: 100%;
    }
`;
const Heading = styled.h2`
    font-size: 32px;
    margin-bottom: 15px;
    font-family: "gordita_medium";
    color: #409274;
    @media all and (max-width: 1080px) {
        font-size: 30px;
        margin-bottom: 10px;
    }
    @media all and (max-width: 480px) {
        font-size: 24px;
    }
`;
const SubHeading = styled.h4`
    color: #f0b509;
    font-size: 20px;
    margin-bottom: 10px;
    font-family: "gordita_medium";
    @media all and (max-width: 1080px) {
        font-size: 18px;
        margin-bottom: 5px;
    }
    @media all and (max-width: 480px) {
        font-size: 17px;
    }
`;
const Para = styled.p`
    width: 90%;
    @media all and (max-width: 1280px) {
        font-size: 15px;
    }
    @media all and (max-width: 480px) {
        width: 100%;
    }
    span {
        font-family: "gordita_medium" !important;
        display: inline-block;
    }
`;
