import React from "react";
import styled from "styled-components";

const MammookkaBanner = () => {
    return (
        <Container>
            <Contains className="wrapper">
                <Title>
                    Our<span>Brand Ambassador</span>
                </Title>
                <Bottom>
                    <span>Megastar</span>Mammootty
                </Bottom>
                <img
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/mammookka.png"
                    alt="Mammookka"
                />
            </Contains>
        </Container>
    );
};

export default MammookkaBanner;
const Contains = styled.div`
    position: relative;
    padding: 130px 0;
    @media all and (max-width: 640px) {
        padding: 58px 0px 105px;
        width: 92% !important;
    }
    @media all and (max-width: 480px) {
        padding: 10% 0 10%;
    }
    @media all and (max-width: 360px) {
        padding: 0% 0 10%;
    }

    img {
        width: 27%;
        display: block;
        position: absolute;
        right: -180px;
        bottom: 0;
        @media all and (max-width: 1200px) {
            right: 0px;
        }
        @media all and (max-width: 1100px) {
            right: 0px;
        }
        @media all and (max-width: 1080px) {
            width: 35%;
        }
        @media all and (max-width: 768px) {
            width: 40%;
            right: -10px;
        }
        @media all and (max-width: 640px) {
            width: 39%;
            right: -1%;
        }
        @media all and (max-width: 480px) {
            width: 40%;
            right: -4%;
        }
        @media all and (max-width: 420px) {
            width: 36%;
        }
        @media all and (max-width: 360px) {
            width: 30%;
        }
    }
`;
const Container = styled.div`
    background-color: #212121;
    margin-top: 4%;
    @media all and (max-width: 640px) {
        padding: 35px 0 0;
    }
    @media all and (max-width: 480px) {
        padding: 35px 0 0;
    }
`;
const Title = styled.h1`
    font-family: gordita_medium;
    font-size: 35px;
    color: #ffffff;
    @media all and (max-width: 640px) {
        text-align: left;
        font-size: 24px;
    }
    @media all and (max-width: 480px) {
        font-size: 20px;
    }
    @media all and (max-width: 420px) {
        font-size: 18px;
    }
    span {
        margin-left: 10px;
        display: inline;
        font-family: gordita_medium;
        font-size: 35px;
        color: #0cbe62;
        @media all and (max-width: 980px) {
            font-size: 32px;
        }
        @media all and (max-width: 768px) {
            font-size: 30px;
        }
        @media all and (max-width: 640px) {
            font-size: 24px;
        }
        @media all and (max-width: 480px) {
            font-size: 20px;
        }
        @media all and (max-width: 420px) {
            font-size: 18px;
        }
    }
    @media all and (max-width: 1100px) {
        font-size: 28px;
    }
    @media all and (max-width: 980px) {
        font-size: 26px;
    }
    @media all and (max-width: 480px) {
        font-size: 18px;
    }
`;
const Bottom = styled.h1`
    font-family: gordita_medium;
    font-size: 51px;
    color: #fff;
    margin-top: -12px;
    position: relative;
    z-index: 1;
    @media all and (max-width: 640px) {
        text-align: left;
    }
    @media all and (max-width: 980px) {
        font-size: 48px;
    }
    @media all and (max-width: 768px) {
        font-size: 40px;
    }
    @media all and (max-width: 640px) {
        font-size: 29px;
    }
    @media all and (max-width: 480px) {
        font-size: 24px;
        margin-top: 1px;
    }
    @media all and (max-width: 420px) {
        font-size: 21px;
    }
    span {
        font-family: gordita_regular;
        font-size: 35px;
        color: #fff;
        margin-right: 9px;
        @media all and (max-width: 980px) {
            font-size: 32px;
        }
        @media all and (max-width: 768px) {
            font-size: 26px;
        }
        @media all and (max-width: 640px) {
            font-size: 24px;
        }
        @media all and (max-width: 480px) {
            font-size: 20px;
        }
        @media all and (max-width: 420px) {
            font-size: 18px;
        }
    }
    &:after {
        content: "";
        position: absolute;
        width: 304px;
        height: 9px;
        bottom: 11px;
        left: 179px;
        z-index: -1;
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/line.svg")
            no-repeat;
        background-size: cover;
        display: block;
        @media all and (max-width: 980px) {
            width: 280px;
            bottom: 5px;
            left: 158px;
        }
        @media all and (max-width: 768px) {
            width: 235px;
            left: 133px;
        }
        @media all and (max-width: 640px) {
            width: 170px;
            left: 125px;
        }
        @media all and (max-width: 480px) {
            width: 156px;
            left: 100px;
            bottom: 0px;
        }
        @media all and (max-width: 420px) {
            width: 133px;
            left: 93px;
            bottom: 0px;
        }
    }
`;
