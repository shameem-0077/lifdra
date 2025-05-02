import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import auth from "../../../../routing/auth";
import VideoModal from "../../general/VideoModal";

const Spotlight = () => {
    const [isModal, setModal] = useState(false);
    return (
        <Container className="wrapper">
            <VideoModal
                isModal={isModal}
                setModal={setModal}
                videoUrl={
                    "https://player.vimeo.com/external/672655362.m3u8?s=cd39539bf4a86e6b49d3bc590f6c530c321c100b"
                }
                videoThumnail={""}
            />
            <LeftSection>
                <Title>
                    സ്കൂളിൽ പഠിക്കുമ്പോൾ തന്നെ നിങ്ങൾക്ക് ഒരു{" "}
                    <span>സോഫ്റ്റ്‌വെയർ എഞ്ചിനീയർ</span> ആകാം
                </Title>
                <Content>
                    അക്കാദമിക് പഠനത്തോടൊപ്പം സ്കൂൾ വിദ്യാർത്ഥികളുടെ
                    ടെക്ക്നോളജിയിലെ നൂതന ചിന്തകൾക്ക് വളർച്ചയേകാൻ,{" "}
                    <span>Edtech</span> സംരംഭമായ <span> Steyp </span>
                    അവതരിപ്പിക്കുന്ന പ്രീമിയം വിർച്വൽ ടെക്ക്നോളജി പ്രോഗ്രാമാണ്
                    <span> Tech Schooling. </span>
                </Content>
                <ButtonSection>
                    <Button
                        to={
                            auth.isAuthenticated()
                                ? "/feed/techies-club/"
                                : "?action=login&next=/feed/techies-club/"
                        }
                    >
                        Subscribe now
                    </Button>
                    <Price>
                        &#8377; 500/<small>Month</small>
                    </Price>
                </ButtonSection>
            </LeftSection>
            <RightSection>
                <SpotlightImage>
                    <Arrow>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/arrow.svg"
                            alt="Image"
                        />
                    </Arrow>
                    <TriColor>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/background-image.svg"
                            alt="Image"
                        />
                    </TriColor>
                    <Sphere>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/purple-circle.svg"
                            alt="Image"
                        />
                    </Sphere>
                    {/* <PlayButton onClick={() => setModal(true)}>
                        <img src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/play.svg" alt="Image" />
                    </PlayButton> */}
                    <Image
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/taid/03-02-2022/images/spot-min.jpeg"
                        alt="Image"
                    />
                </SpotlightImage>
            </RightSection>
        </Container>
    );
};

export default Spotlight;

const Container = styled.div`
    background-color: #fff;
    background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/spotlightBg.svg")
        no-repeat;
    background-size: cover;
    /* background-position: 0 0; */
    padding: 80px;
    margin-top: 120px !important;
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-radius: 30px;
    padding-bottom: 170px;

    @media all and (max-width: 1280px) {
        padding: 50px;
        background-position: left bottom;
        padding-bottom: 130px;
        margin-top: 110px !important;
    }
    @media all and (max-width: 980px) {
        grid-template-columns: 1fr;
        grid-gap: 50px;
        background-image: none;
        padding-bottom: 80px;
        background: rgb(251, 251, 251);
        background: linear-gradient(
            0deg,
            rgba(251, 251, 251, 1) 0%,
            rgba(251, 245, 242, 1) 100%
        );
    }
    @media all and (max-width: 768px) {
        margin-top: 90px !important;
        padding-bottom: 60px;
    }
    @media all and (max-width: 640px) {
        margin-top: 80px !important;
        padding: 30px;
    }
    @media all and (max-width: 480px) {
        padding: 30px 20px;
        grid-gap: 30px;
    }
`;

const LeftSection = styled.div`
    padding-right: 40px;
    @media all and (max-width: 1280px) {
        padding-right: 20px;
    }
    @media all and (max-width: 640px) {
        padding-right: 0px;
    }
`;
const RightSection = styled.div``;

const Title = styled.h1`
    font-family: "EGGIndulekhaUni";
    font-size: 50px;
    color: #000000;
    margin-bottom: 30px;
    span {
        color: #0fa76f;
    }
    @media all and (max-width: 1400px) {
        font-size: 46px;
    }
    @media all and (max-width: 1280px) {
        font-size: 42px;
        margin-bottom: 20px;
        max-width: 440px;
    }
    @media all and (max-width: 1100px) {
        font-size: 37px;
        margin-bottom: 20px;
        /* max-width: 440px; */
    }
    @media all and (max-width: 980px) {
        font-size: 50px;
        max-width: 520px;
    }
    @media all and (max-width: 768px) {
        font-size: 46px;
    }
    @media all and (max-width: 640px) {
        font-size: 38px;
        margin-bottom: 15px;
        max-width: 420px;
    }
    @media all and (max-width: 480px) {
        font-size: 34px;
        margin-bottom: 15px;
        max-width: 420px;
    }
    @media all and (max-width: 360px) {
        font-size: 32px;
        margin-bottom: 15px;
    }
`;

const Content = styled.p`
    font-family: "Indulekha_regular";
    margin-bottom: 30px;
    font-size: 18px;
    span {
        font-family: gordita_medium;
        font-size: 16px;
    }
    @media all and (max-width: 1100px) {
        font-size: 16px;
        span {
            font-size: 15px;
        }
    }
    @media all and (max-width: 480px) {
        font-size: 15px;
        margin-bottom: 20px;
        span {
            font-size: 14px;
        }
    }
    @media all and (max-width: 360px) {
        font-size: 13px;
        span {
            font-size: 14px;
        }
    }
`;

const ButtonSection = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: -80px;
`;
const Button = styled(Link)`
    width: 180px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: #0fa76f;
    color: #ffffff;
    font-family: gordita_medium;
    margin-right: 20px;
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
    @media all and (max-width: 480px) {
        width: 150px;
        height: 40px;
        font-size: 14px;
        margin-right: 10px;
        border-radius: 6px;
    }
    /* @media all and (max-width: 480px) {
        width: 130px;
        height: 40px;
        font-size: 13px;
        margin-right: 10px;
        border-radius: 6px;
    } */
`;
const Price = styled.p`
    color: #fa6448;
    font-family: gordita_bold;
    font-size: 30px;
    transform: translateY(8px);
    @media all and (max-width: 640px) {
        font-size: 26px;
    }

    small {
        font-size: 20px;
        font-family: gordita_medium;
    }
    @media all and (max-width: 480px) {
        font-size: 18px;
        small {
            font-size: 14px;
            font-family: gordita_medium;
        }
    }
    @media all and (max-width: 360px) {
        font-size: 16px;
        small {
            font-size: 13px;
            font-family: gordita_medium;
        }
    }
`;

const SpotlightImage = styled.div`
    transform: rotate(2deg);
    position: relative;
    img {
        width: 100%;
        display: block;
    }
`;

const Image = styled.img`
    width: 100%;
    display: block;
    border-radius: 30px;
    @media all and (max-width: 480px) {
        border-radius: 20px;
    }
`;
const Arrow = styled.span`
    display: block;
    width: 165px;
    position: absolute;
    left: -120px;
    bottom: -42px;
    @media all and (max-width: 1280px) {
        width: 100px;
        left: -58px;
        bottom: -18px;
    }
    @media all and (max-width: 980px) {
        width: 100px;
        left: 0px;
        bottom: -30px;
    }
`;

const TriColor = styled.span`
    display: block;
    width: 230px;
    position: absolute;
    right: -65px;
    top: -72px;
    z-index: -1;
    @media all and (max-width: 1280px) {
        width: 180px;
        position: absolute;
        right: -30px;
        top: -42px;
    }
    @media all and (max-width: 980px) {
        display: none;
    }
`;
const Sphere = styled.span`
    display: block;
    width: 150px;
    position: absolute;
    right: -65px;
    bottom: -72px;
    z-index: -1;
    @media all and (max-width: 1280px) {
        width: 130px;
        right: -42px;
        bottom: -50px;
    }
    @media all and (max-width: 980px) {
        display: none;
    }
`;

const PlayButton = styled.span`
    display: block;
    width: 80px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
    @media all and (max-width: 480px) {
        width: 60px;
    }
`;
