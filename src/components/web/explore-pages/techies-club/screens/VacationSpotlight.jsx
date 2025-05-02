import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import auth from "../../../../routing/auth";
import VacationPlanModal from "../includes/VacationPlanModal";
import queryString from "query-string";

function VacationSpotlight() {
    const location = useLocation();
    const [action, setAction] = useState("");
    const history = useHistory();
    const [isLoader, setLoader] = useState(true);

    const closeModal = () => {
        setAction(action);
        history.push({
            pathname: location.pathname,
            search: "",
        });
    };
    useEffect(() => {
        let { search } = location;
        const values = queryString.parse(search);
        const action = values.action;
        setAction(action);
    }, [location.search]);

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);

    return (
        <MainContainer isLoader={isLoader}>
            <VacationPlanModal
                location={location}
                action={action}
                closeModal={closeModal}
            />
            <Container className="wrapper">
                <LeftSection>
                    <TextContainer>
                        <img
                            src={
                                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-03-22/text.svg"
                            }
                            alt="Image"
                        />
                    </TextContainer>
                    <Title>
                        ഈ അവധികാലത്ത്
                        <br />{" "}
                        <span>
                            <small>₹</small>10 രൂപ {""}
                        </span>
                        ദിവസവും മുടക്കി
                        <br />
                        <span>കോഡിംഗ് പഠിച്ചാലോ?</span>
                    </Title>
                    <RespTitle>
                        ഈ അവധികാലത്ത് <br />{" "}
                        <span>
                            <small>₹</small>10 രൂപ {""}
                        </span>
                        ദിവസവും മുടക്കി
                        <br />
                        <span>കോഡിംഗ് പഠിച്ചാലോ?</span>
                    </RespTitle>
                    <Content>
                        <p>60 ദിവസം </p>
                        {""} കൊണ്ട് സ്വന്തമായി ഒരു {""}
                        <span>Website</span>
                        <br />
                        ഉണ്ടാക്കാം! കരിയറിനു തുടക്കം കുറിക്കാം!
                    </Content>
                    <RespContent>
                        <p>60 ദിവസം </p>
                        {""} കൊണ്ട് സ്വന്തമായി ഒരു {""}
                        <span>Website{""}</span>
                        ഉണ്ടാക്കാം! കരിയറിനു തുടക്കം കുറിക്കാം!
                    </RespContent>
                    <ButtonSection>
                        <Button
                            onClick={() => {
                                if (auth.isAuthenticated()) {
                                    history.push({
                                        pathname: location.pathname,
                                        search: "?action=vacation-plans",
                                    });
                                } else {
                                    history.push({
                                        pathname: location.pathname,
                                        search: `?action=login&next=/mlp/vacation-program/?action=vacation-plans`,
                                    });
                                }
                            }}
                        >
                            Join Now
                        </Button>
                        <EnquiryButton href="tel:+91 858 999 8874" type="phone">
                            <small>For Enquiry</small>
                            <p>+91 858 999 8874</p>
                        </EnquiryButton>
                        <ArrowContainer>
                            <img
                                src={
                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/18-03-2022/arrow.svg"
                                }
                                alt="Image"
                            />
                        </ArrowContainer>
                        <SideImage>
                            <img
                                src={
                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/18-03-2022/spotlight.png"
                                }
                                alt="Image"
                            />
                        </SideImage>
                    </ButtonSection>
                    <Shapes>
                        <img
                            src={
                                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/18-03-2022/shapes.svg"
                            }
                            alt=""
                        />
                    </Shapes>
                </LeftSection>
                <RightSection>
                    <SpotlightImage>
                        <img
                            src={
                                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/18-03-2022/spotlight.png"
                            }
                            alt="Image"
                        />
                    </SpotlightImage>
                    <ColorShades>
                        <img
                            src={
                                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/18-03-2022/squares.svg"
                            }
                            alt=""
                        />
                    </ColorShades>
                </RightSection>
            </Container>
        </MainContainer>
    );
}

export default VacationSpotlight;

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media all and (max-width: 560px) {
        grid-template-columns: 1fr;
    }
`;
const MainContainer = styled.div`
    overflow: hidden;
    max-width: 1500px;
    margin: 0 auto;
    background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/18-03-2022/colors.png");
    background-color: ${(props) =>
        props.isLoader === true ? "#2334a7;" : "transparent"};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: right -120px;
    padding: 50px 40px;
    margin-top: 100px !important;
    padding-bottom: 240px;
    position: relative;
    animation: fade 800ms ease-in-out 0ms;

    @keyframes fade {
        0% {
            opacity: 0;
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    @media all and (max-width: 1350px) {
        background-position: left -54px;
    }
    @media all and (max-width: 1200px) {
        background-position: left -35px;
    }

    @media all and (max-width: 1150px) {
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/18-03-2022/spot.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: left -75px;
    }

    @media all and (max-width: 980px) {
        padding: 50px 25px 180px;
    }
    @media all and (max-width: 768px) {
        padding: 50px 20px 180px;
    }
    @media all and (max-width: 640px) {
        grid-template-columns: 1fr;
        margin-top: 70px !important;
    }
    @media all and (max-width: 480px) {
        /* padding: 30px 20px;
        grid-gap: 30px; */
        padding: 50px 20px 245px;
    }
`;
const TextContainer = styled.div`
    width: 200px;
    margin-bottom: 10px;
    img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 480px) {
        width: 170px;
    }
    @media all and (max-width: 380px) {
        width: 150px;
    }
`;
const LeftSection = styled.div`
    /* position: relative; */
    padding-right: 40px;
    @media all and (max-width: 1280px) {
        padding-right: 20px;
    }
    @media all and (max-width: 1150px) {
        padding-right: 0px;
    }
`;
const Shapes = styled.span`
    display: block;
    width: 300px;
    position: absolute;
    left: -90px;
    bottom: 2px;
    z-index: -1;

    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 1450px) {
        width: 250px;
        left: -30px;
        bottom: 7%;
    }
    @media all and (max-width: 1300px) {
        bottom: 10%;
    }
    @media all and (max-width: 1150px) {
        bottom: 25px;
    }

    @media all and (max-width: 980px) {
        bottom: 40px;
        width: 200px;
    }
    @media all and (max-width: 640px) {
        bottom: 10%;
        width: 170px;
    }
    @media all and (max-width: 768px) {
        /* display: none !important; */
    }
`;
const RightSection = styled.div`
    position: relative;
`;
const ColorShades = styled.div`
    position: absolute;
    bottom: -135px;
    left: -30px;
    z-index: -1;
    width: 150px;

    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 1350px) {
        left: 5px;
        width: 120px;
    }
    @media all and (max-width: 1290px) {
        left: -30px;
    }
    @media all and (max-width: 1220px) {
        left: -30px;
        bottom: -90px;
    }
    @media all and (max-width: 1150px) {
        left: -20px;
    }
    @media all and (max-width: 1100px) {
        left: 15px;
    }
    @media all and (max-width: 1050px) {
        left: 55px;
    }
    @media all and (max-width: 980px) {
        display: none;
    }
`;
const Title = styled.h1`
    font-family: "EGGIndulekhaUni";
    font-size: 54px !important;
    color: #fff;
    margin-bottom: 25px;
    span {
        color: #f8c333;
    }
    small {
        color: #f8c333;
        font-size: 38px !important;
        @media all and (max-width: 480px) {
            font-size: 36px !important;
        }
    }
    @media all and (max-width: 1400px) {
        font-size: 50px;
    }
    @media all and (max-width: 1280px) {
        margin-bottom: 20px;
        max-width: 460px;
    }

    @media all and (max-width: 980px) {
        font-size: 50px;
        width: 600px;
        line-height: 1;
    }
    @media all and (max-width: 768px) {
        font-size: 46px;
    }
    @media all and (max-width: 640px) {
        font-size: 38px;
        margin-bottom: 15px;
    }
    @media all and (max-width: 560px) {
        width: 100% !important;
    }
    @media all and (max-width: 540px) {
        display: none;
    }
    /* @media all and (max-width: 480px) {
        font-size: 42px !important;
        margin-bottom: 15px;
        width: 100% !important;
    }
    @media all and (max-width: 360px) {
        font-size: 32px;
        margin-bottom: 15px;
    } */
`;
const RespTitle = styled.h1`
    display: none;
    @media all and (max-width: 540px) {
        display: block;
        font-size: 42px !important;
        margin-bottom: 15px;
        width: 100% !important;
        font-family: "EGGIndulekhaUni";
        color: #fff;
        span {
            color: #f8c333;
        }
        small {
            color: #f8c333;
            @media all and (max-width: 480px) {
                font-size: 28px !important;
            }
        }
    }
    @media all and (max-width: 440px) {
        display: block;
        font-size: 38px !important;
        margin-bottom: 15px;
        width: 100% !important;
        font-family: "EGGIndulekhaUni";
        color: #fff;
        span {
            color: #f8c333;
        }
        small {
            color: #f8c333;
            @media all and (max-width: 480px) {
                font-size: 28px !important;
            }
            @media all and (max-width: 380px) {
                font-size: 24px !important;
            }
        }
    }
    @media all and (max-width: 395px) {
        font-size: 36px !important;
        margin-bottom: 15px;
    }
    @media all and (max-width: 380px) {
        font-size: 32px !important;
        margin-bottom: 15px;
    }
`;

const Content = styled.p`
    font-family: "Indulekha_regular" !important;
    font-size: 22px !important;
    color: #fff;
    line-height: 1.2em !important;
    width: 100% !important;
    span {
        font-family: gordita_medium;
        font-size: 22px !important;
        color: #f8c333;
        @media all and (max-width: 480px) {
            font-size: 18px !important;
        }
    }
    p {
        font-family: "EGGIndulekhaUni" !important;
        /* font-family: "Indulekha_regular" !important; */
        font-size: 22px !important;
        background-color: #ffff;
        padding: 4px 10px;
        transform: skew(0deg, -2deg);
        display: inline-block;
        color: #2334a7;
        border-radius: 5px;

        @media all and (max-width: 980px) {
            padding: 2px 10px;
        }
        @media all and (max-width: 480px) {
            font-size: 18px !important;
        }
    }
    @media all and (max-width: 480px) {
        display: none;
    }
`;
const RespContent = styled.p`
    display: none;
    @media all and (max-width: 480px) {
        display: block;
        font-size: 18px !important;
        margin-bottom: 20px;
        line-height: 1.6em !important;
        width: 100% !important;
        font-family: "Indulekha_regular" !important;
        color: #fff;
        span {
            font-family: gordita_medium;
            font-size: 22px !important;
            color: #f8c333;
            @media all and (max-width: 480px) {
                font-size: 18px !important;
                margin-right: 5px;
            }
            @media all and (max-width: 360px) {
                font-size: 16px !important;
                margin-right: 3px;
            }
        }
        p {
            font-family: "EGGIndulekhaUni" !important;
            /* font-family: "Indulekha_regular" !important; */
            font-size: 22px !important;
            background-color: #ffff;
            padding: 4px 10px;
            transform: skew(0deg, -2deg);
            display: inline-block;
            color: #2334a7;
            border-radius: 5px;

            @media all and (max-width: 480px) {
                font-size: 18px !important;
                padding: 0px 10px;
            }
            @media all and (max-width: 360px) {
                font-size: 16px !important;
                margin-right: 5px;
            }
        }
    }
    @media all and (max-width: 360px) {
        font-size: 16px !important;

        span {
            font-size: 14px;
        }
    }
`;

const ButtonSection = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 50px;
    position: relative;
    @media all and (max-width: 980px) {
        margin-top: 45px;
    }
    @media all and (max-width: 480px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;
const ArrowContainer = styled.div`
    position: absolute;
    left: 26%;
    top: 40px;
    width: 130px;
    img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 980px) {
        left: 34%;
    }
    @media all and (max-width: 480px) {
        left: 10%;
        top: 110px;
    }
`;
const SideImage = styled.div`
    display: none;
    img {
        width: 100%;
        display: block;
    }
    /* 
    @media all and (max-width: 480px) {
        width: 100px;
        display: block;
        position: absolute;
        left: 10%;
        top: 110px;
    } */
`;
const Button = styled.div`
    width: 180px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: #ffff;
    color: #2334a7;
    font-family: gordita_medium;
    margin-right: 20px;
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
    @media all and (max-width: 980px) {
        margin-right: 16px;
    }

    @media all and (max-width: 480px) {
        width: 250px;
        height: 50px;
        /* font-size: 14px; */
        margin-bottom: 15px;
        border-radius: 6px;
    }
    @media all and (max-width: 380px) {
        font-size: 16px;
    }
`;
const EnquiryButton = styled.a`
    width: 180px;
    height: 50px;
    border-radius: 8px;
    background-color: #2334a7;
    border: 2px solid #eb9e4b;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0 20px;

    small {
        color: #ffffff;
        font-size: 12px !important;
        padding-top: 4px;
    }
    p {
        color: #ffffff;
        font-size: 14px !important;
        font-family: "gordita_medium" !important;
        margin-top: -1px;
    }
    @media all and (max-width: 480px) {
        width: 250px;
        height: 50px;
        font-size: 14px;
        border-radius: 6px;
    }
    /* @media all and (max-width: 380px) {
        font-size: 16px;
    } */
`;

const SpotlightImage = styled.div`
    position: absolute;
    right: -110px;
    bottom: -190px;
    width: 95%;

    img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 1280px) {
        bottom: -150px;
    }
    @media all and (max-width: 1080px) {
        bottom: -200px;
    }
    @media all and (max-width: 980px) {
        bottom: -130px;
        width: 400px;
    }

    @media all and (max-width: 760px) {
        width: 300px;
    }
    @media all and (max-width: 640px) {
        width: 250px;
        bottom: -160px;
    }
    @media all and (max-width: 540px) {
        width: 250px;
        right: -80px;
    }
    @media all and (max-width: 500px) {
        width: 250px;
        right: -60px;
    }
    @media all and (max-width: 480px) {
        /* width: 250px;
        right: -10px; */
        display: none;
    }
`;
