import React from "react";
import styled from "styled-components";

const SatSpotlight = ({ executeScroll }) => {
    return (
        <Contains>
            {/* <EligibilityFormModal
				isFormModal={isFormModal}
				setFormModal={setFormModal}
			/> */}
            <Container className="wrapper">
                {/* <div> */}
                <ContentSection>
                    <ContentTop>
                        <Title>
                            Creating
                            <br /> Computer <span>Engineers</span> & Tech{" "}
                            <span>Scientists</span>
                        </Title>
                        <Description>
                            Steyp is introducing a digital space for students to
                            learn and become the future Engineers and
                            Scientists. Steyp is looking for capable students
                            who stands out, thinks differently, and keeps a
                            spark to shine!
                        </Description>
                        {/* <JoinNow>Do you qualify?</JoinNow> */}
                        <Button onClick={executeScroll}>
                            Explore
                            <span>
                                <img
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/right-side.svg"
                                    alt=""
                                />
                            </span>
                        </Button>
                    </ContentTop>
                </ContentSection>
                <ImageSection className="imageSection">
                    <Mammookka>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/spotlight-mammookka.png"
                            alt="image"
                        />
                    </Mammookka>
                    <PrimaryImage>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/spotlight-background.png"
                            alt="image"
                        />
                    </PrimaryImage>
                    <SecondaryImage>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/dashboard-image.png"
                            alt=""
                        />
                    </SecondaryImage>
                </ImageSection>
                {/* </div> */}
            </Container>
        </Contains>
    );
};

export default SatSpotlight;
const Contains = styled.div`
    position: relative;
    z-index: 2;
    background-color: #f8f8f8;
`;
const Container = styled.div`
    padding-top: 100px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media all and (max-width: 980px) {
        display: flex;
        flex-wrap: wrap-reverse;
    }
    @media all and (max-width: 768px) {
        padding-top: 80px;
    }
    @media all and (max-width: 640px) {
        padding-top: 60px;
    }
    @media all and (max-width: 480px) {
        padding-bottom: 2%;
        padding-top: 45px;
        width: 92% !important;
    }
`;
const ContentSection = styled.div`
    max-width: 550px;
    padding-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    grid-gap: 60px;
    @media all and (max-width: 980px) {
        margin-top: 0px;
        order: 2;
    }
    @media all and (max-width: 640px) {
        grid-gap: 76px;
    }
    @media all and (max-width: 480px) {
        grid-gap: 63px;
        padding-bottom: 61px;
    }
    @media all and (max-width: 420px) {
        grid-gap: 59px;
        padding-bottom: 9px;
    }
    @media all and (max-width: 400px) {
        grid-gap: 18px;
    }
`;
const ContentTop = styled.div``;
const Title = styled.h1`
    width: 90%;
    font-size: 44px;
    font-family: gordita_medium;
    color: #212121;
    position: relative;
    span {
        color: #0fa76f;
        font-family: gordita_bold;
    }
    @media all and (max-width: 1280px) {
        font-size: 40px;
        max-width: 100%;
        min-width: 100%;
    }
    @media all and (max-width: 1280px) {
        font-size: 36px;
    }
    @media all and (max-width: 1080px) {
    }
    @media all and (max-width: 980px) {
        font-size: 38px;
        max-width: 424px;
        min-width: 424px;
    }
    @media all and (max-width: 768px) {
        font-size: 34px;
    }
    @media all and (max-width: 640px) {
        font-size: 30px;
        margin-top: 0px;
    }
    @media all and (max-width: 480px) {
        font-size: 24px;
        max-width: 275px;
        min-width: 271px;
    }
    @media all and(max-width:420px) {
        font-size: 24px;
        max-width: 245px;
        min-width: 245px;
    }
`;
const Description = styled.p`
    margin: 30px 0;
    position: relative;
    @media all and (max-width: 980px) {
        font-size: 18px;
    }
    @media all and (max-width: 768px) {
        font-size: 16px;
        margin: 20px 0 30px;
        max-width: 80%;
    }
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
        margin: 15px 0;
        max-width: 90%;
    }
    @media all and (max-width: 360px) {
        font-size: 13px;
    }
`;
const Button = styled.div`
    cursor: pointer;
    width: 170px;
    padding: 12px 14px;
    background: transparent linear-gradient(100deg, #0fa76f 0%, #0f9ea7 100%) 0%
        0% no-repeat padding-box;
    font-size: 16px;
    color: #ffffff;
    font-family: gordita_medium;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    transition: all 0.4s ease;
    position: relative;
    z-index: 3;
    span {
        width: 0;
        display: block;
        transition: all 0.4s ease;
        img {
            display: block;
            width: 100%;
            transition: all 0.4s ease;
        }
    }
    &:hover {
        width: 220px;
        span {
            width: 18px;
            margin-left: 10px;
        }
    }

    @media all and (max-width: 980px) {
        height: 50px;
        width: 250px;
        position: relative;
        z-index: 5;
    }
    @media all and (max-width: 768px) {
    }
    @media all and (max-width: 640px) {
        height: 40px;
        width: 150px;
    }
    @media all and (max-width: 480px) {
        font-size: 16px;
        position: relative;
        z-index: 5;
    }
`;
const JoinNow = styled.p`
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 30px;
    margin-bottom: 6px;

    @media all and (max-width: 640px) {
        font-size: 14px;
    }
    @media all and (max-width: 480px) {
        display: block;
        margin-top: 0px;
    }
    @media all and (max-width: 360px) {
        font-size: 12px;
    }
`;

const ImageSection = styled.div`
    position: relative;

    @media all and (max-width: 980px) {
        order: 1;
        margin-top: -80px;
        div {
            margin: 0;
        }
        img {
            width: 100%;
            margin-left: 0;
        }
    }
    @media all and (max-width: 980px) {
        margin-top: -231px;
    }
    @media all and (max-width: 768px) {
        margin-top: -242px;
    }

    @media all and (max-width: 480px) {
        margin-top: -317px;
        margin-left: 20%;
    }
    @media all and (max-width: 420px) {
        margin-top: -62%;
    }
    @media all and (max-width: 400px) {
        margin-top: -25%;
    }
`;
const Mammookka = styled.div`
    position: absolute;
    margin-right: 0%;
    right: -54px;
    width: 665px;
    bottom: -17%;
    z-index: 2;

    img {
        width: 100%;
        display: block;
        margin-left: 0%;
        @media all and (max-width: 480px) {
            margin-left: unset;
        }
    }
    @media all and (max-width: 1280px) {
        width: 550px;
        bottom: -15%;
    }
    @media all and (max-width: 1080px) {
        width: 525px;
        bottom: -13%;
    }

    @media all and (max-width: 980px) {
        width: 610px;
        right: -120px;
        bottom: -96px;
    }
    @media all and (max-width: 768px) {
        right: -105px;
        width: 350px;
        bottom: -53px;
    }
    @media all and (max-width: 640px) {
        right: -75px;
    }
    @media all and (max-width: 540px) {
        width: 239px;
        bottom: -15%;
        right: -40px;
    }
    @media all and (max-width: 480px) {
        width: 209px;
        bottom: -13%;
        right: -40px;
    }
    @media all and (max-width: 420px) {
        /* width: 262px; */
        bottom: -15%;
    }
    @media all and (max-width: 400px) {
        width: 243px;
    }
`;

const PrimaryImage = styled.div`
    img {
        display: block;

        width: 137%;
        margin-left: -12%;
    }
    @media all and (max-width: 1550px) {
        margin-right: -18.5%;
        margin-top: -13%;
    }
    @media all and (max-width: 980px) {
        display: none;
    }
`;
const SecondaryImage = styled.div`
    display: none;
    z-index: 1;
    opacity: 0.2;
    img {
        @media all and (max-width: 768px) {
            margin-left: 118px !important;
        }
    }

    @media all and (max-width: 980px) {
        display: block;
    }

    @media all and (max-width: 480px) {
        margin-left: -4%;
        width: 130%;
    }
`;
