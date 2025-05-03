import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import auth from "../../../../routing/auth";

function PrimeSpotlight() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user_profile = useSelector((state) => state.user_profile);

    return (
        <Cover>
            <Container className="wrapper">
                <Title>
                    Explore the wide range <br className="mob" />
                    of courses on
                    <br className="web" />
                    <span>Technology!</span>
                </Title>
                <Description>
                    Dive Deeper into the broader range of Technology,
                    Entrepreneurship and Creative programs. Get Upskilled and
                    become job-ready.
                </Description>
                <ButtonContainer>
                    {user_profile.length > 0 ? (
                        user_profile.prime_program_subscription
                            .is_subscription &&
                        !user_profile.prime_program_subscription.is_expired ? (
                            <SubscribeButton
                                onClick={(e) => {
                                    navigate(`/prime-programs/courses/`);
                                }}
                            >
                                Continue
                            </SubscribeButton>
                        ) : (
                            <SubscribeButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (auth.isAuthenticated()) {
                                        navigate(`/prime-programs/courses/?action=subscribe-prime-programs`);
                                    } else {
                                        navigate(`${location.pathname}?action=login&next=/prime-programs/courses?action=subscribe-prime-programs`);
                                    }
                                }}
                            >
                                Subscribe Now
                            </SubscribeButton>
                        )
                    ) : (
                        <SubscribeButton
                            onClick={(e) => {
                                e.preventDefault();
                                if (auth.isAuthenticated()) {
                                    navigate(`/prime-programs/courses/?action=subscribe-prime-programs`);
                                } else {
                                    navigate(`${location.pathname}?action=login&next=/prime-programs/courses?action=subscribe-prime-programs`);
                                }
                            }}
                        >
                            Subscribe Now
                        </SubscribeButton>
                    )}
                    <ViewCourse
                        onClick={(e) => {
                            navigate(`/prime-programs/courses/`);
                        }}
                    >
                        View Courses
                    </ViewCourse>
                </ButtonContainer>
                <ImageCover>
                    <ImageSection>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/spotlight-image.png"
                            alt="Spotlight image"
                        />
                    </ImageSection>
                    <Hexogon>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/hexogon.svg"
                            alt="Hexogon"
                        />
                    </Hexogon>
                    <Vector>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/spot-vector.png"
                            alt="Vector"
                        />
                    </Vector>
                </ImageCover>
            </Container>
        </Cover>
    );
}

export default PrimeSpotlight;

const Cover = styled.div`
    background-color: #d3ebce59;
`;

const Container = styled.div`
    margin-top: 80px !important;
    padding: 80px 3% 0px;
    /* background-color: #f0f8ee; */
    @media all and (max-width: 640px) {
        padding: 60px 3% 0;
    }
    @media all and (max-width: 480px) {
        padding: 50px 3% 0;
    }
`;

const ImageCover = styled.div`
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
`;

const ImageSection = styled.div`
    position: relative;
    z-index: 99;
    img {
        display: block;
        width: 100%;
    }
`;
const Title = styled.h1`
    font-family: gordita_medium;
    font-size: 46px;
    margin-bottom: 10px;
    text-align: center;
    .mob {
        display: none;
    }
    span {
        color: #4ca473;
    }
    img {
        width: 60px;
        margin-left: 10px;
    }
    @media all and (max-width: 1180px) {
        font-size: 44px;
    }
    @media all and (max-width: 980px) {
        font-size: 40px;
    }
    @media all and (max-width: 768px) {
        font-size: 40px;
        .mob {
            display: block;
        }
    }
    @media all and (max-width: 640px) {
        font-size: 34px;
    }
    @media all and (max-width: 480px) {
        font-size: 28px;
    }
    @media all and (max-width: 360px) {
        font-size: 23px;
    }
`;

const Description = styled.p`
    font-size: 18px;
    max-width: 700px;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 20px;
    text-align: center;
    @media all and (max-width: 1280px) {
        font-size: 16px;
    }
    @media all and (max-width: 980px) {
        max-width: 550px;
    }
    @media all and (max-width: 480px) {
        width: 95%;
        font-size: 15px;
    }
`;

const KnowMore = styled.span`
    display: block;
    width: 200px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4ca473;
    color: #fff;
    font-family: gordita_medium;
    border-radius: 5px;
    position: relative;
    border: 2px solid transparent;
    z-index: 1;
    transition: all 0.3s ease-in-out;
    margin: 0 auto;
    cursor: pointer;
    &:hover {
        color: #4ca473;
        background-color: #fff;
        border: 2px solid #4ca473;
    }
`;

const Hexogon = styled.span`
    display: block;
    position: absolute;
    width: 70px;
    left: 35px;
    top: 60px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 1280px) {
        left: 20px;
        top: 35px;
    }
    @media all and (max-width: 980px) {
        left: 00px;
        top: 35px;
    }
    @media all and (max-width: 640px) {
        width: 50px;
        left: -10px;
        top: 20px;
    }
`;

const Vector = styled.span`
    display: block;
    position: absolute;
    width: 130px;
    right: -10px;
    top: 10px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 1280px) {
        width: 120px;
        right: -24px;
        top: -4px;
    }
    @media all and (max-width: 768px) {
        width: 80px;
        right: -24px;
        top: -4px;
    }
`;

const BottomCircle = styled.span`
    display: block;
    position: absolute;
    width: 160px;
    height: 160px;
    border: 40px solid #fff;
    background-color: #f8c145;
    left: -40px;
    bottom: -40px;

    border-radius: 50%;
    @media all and (max-width: 980px) {
        width: 120px;
        height: 120px;
        border: 30px solid #fff;
        left: -30px;
        bottom: -30px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 30px;
    @media all and (max-width: 480px) {
        display: grid;
        grid-template-columns: 1fr;
    }
`;
const SubscribeButton = styled.span`
    display: block;
    width: 200px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4ca473;
    border: 2px solid #4ca473;
    color: #fff;
    font-family: gordita_medium;
    border-radius: 8px;
    cursor: pointer;

    transition: all 0.3s ease-in-out;
    &:hover {
        opacity: 0.7;
    }
    @media all and (max-width: 980px) {
        /* margin-top: 20px; */
        font-size: 16px;
    }
    @media all and (max-width: 480px) {
        width: 200px;
        height: 50px;
        margin: 0 auto;
    }
`;

const ViewCourse = styled.span`
    display: block;
    margin-left: 20px;
    width: 200px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4ca473;
    background-color: #fff;
    border: 2px solid #4ca473;
    font-family: gordita_medium;
    border-radius: 8px;
    cursor: pointer;

    transition: all 0.3s ease-in-out;
    &:hover {
        opacity: 0.7;
    }
    @media all and (max-width: 480px) {
        margin-left: 0;
        margin: 0 auto;
        margin-top: 10px;
    }
`;
