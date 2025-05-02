import React from "react";

import styled from "styled-components";
import underline from "../../../assets/images/survey-form/Frame 3465564.png";

function SurveyFormSpotlight() {
    return (
        <>
            <MainContainer>
                <WrapperContainer>
                    <TopConatiner>
                        <HeaderLeft>
                            <B>Survey Form</B>
                            <Title>
                                <span>ഒരു മികച്ച</span>
                                <b> കരിയറിലേക്കുള്ള </b>പാത
                            </Title>
                            <p>
                                വിജയകരമായ ഒരു കരിയർ കണ്ടെത്താൻ ശ്രമിക്കുന്നവരാണോ
                                നിങ്ങൾ? <br />ഈ പാതയിൽ നിങ്ങൾ അനുഭവിക്കുന്ന
                                പ്രയാസങ്ങൾ മനസ്സിലാക്കാൻ ഞങ്ങൾ ആഗ്രഹിക്കുന്നു.
                            </p>
                            <p>
                                നിങ്ങളൊരു സ്കൂൾ വിദ്യാർത്ഥിയോ, കോളേജ്
                                വിദ്യാർത്ഥിയോ,
                            </p>
                            <p>വിദ്യാർത്ഥികളുടെ രക്ഷിതാവോ അല്ലെങ്കിൽ,</p>
                            <p>
                                നിങ്ങളുടെ കരിയറിൽ ഒരു മാറ്റം കൊണ്ടുവരാൻ
                                ശ്രമിക്കുന്ന വ്യക്തിയോ ആണെങ്കിൽ...
                            </p>
                            <p>
                                ഈ സർവ്വേയിൽ പങ്കെടുക്കണമെന്ന് അഭ്യർത്ഥിക്കുന്നു.
                            </p>
                        </HeaderLeft>
                        <HeaderRight>
                            <img
                                img
                                src={require("../../../assets/images/survey-form/survey form spotlight-img.png")}
                                alt="Spotlight Img"
                            />
                        </HeaderRight>
                    </TopConatiner>
                </WrapperContainer>
            </MainContainer>
        </>
    );
}

export default SurveyFormSpotlight;

const MainContainer = styled.div`
    position: relative;
    background: #f0f8ee;
    padding: 75px 0;
    @media all and (max-width: 480px) {
        padding: 75px 0 30px 0;
    }
`;
const WrapperContainer = styled.div`
    width: 85%;
    margin: 0 auto;
`;
const TopConatiner = styled.div`
    display: flex;
    align-items: center;
`;
const HeaderLeft = styled.div`
    padding-top: 50px;
    width: 60%;
    font-family: gordita_regular;
    font-size: 34px;
    p {
        font-size: 18px;
        margin-bottom: 25px;
        color: #383838;
        width: 90%;

        @media all and (max-width: 980px) {
            width: 100%;
        }
        @media all and (max-width: 768px) {
            font-size: 14px;
        }
        @media all and (max-width: 640px) {
            margin-bottom: 20px;
        }
        @media all and (max-width: 480px) {
            margin-bottom: 15px;
        }
        @media all and (max-width: 360px) {
            margin-bottom: 10px;
        }
        &:last-child {
            margin-bottom: 0;
        }
    }
    @media all and (max-width: 1440px) {
        width: 70%;
        padding-top: 20px;
        font-size: 30px;
    }
    @media all and (max-width: 980px) {
        width: 75%;
    }
    @media all and (max-width: 768px) {
        width: 100%;
    }
`;
const B = styled.span`
    color: #009262;
    font-family: gordita_medium !important;
    font-size: 20px;
    margin-bottom: 10px;
    @media all and (max-width: 980px) {
        font-size: 14px;
    }
`;
const Title = styled.h1`
    font-size: 40px;
    margin-bottom: 40px;
    @media all and (max-width: 980px) {
        font-size: 22px;
    }
    @media all and (max-width: 768px) {
        width: 80%;
        line-height: 2;
        margin-bottom: 20px;
    }
    @media all and (max-width: 480px) {
        width: 100%;
    }
    & span {
        font-size: 40px;
        position: relative;
        /* @media all and (max-width: 1440px) {
            font-size: 30px;
        } */
        @media all and (max-width: 980px) {
            font-size: 22px;
        }
        @media all and (max-width: 480px) {
            font-size: 20px;
        }
    }

    & span::before {
        content: "";
        background: url(${underline});
        background-repeat: no-repeat;
        position: absolute;
        background-size: 100%;
        width: 82%;
        left: 3px;
        height: 16px;
        bottom: -19px;
        @media all and (max-width: 1280px) {
            bottom: -16px;
        }
    }

    b {
        color: #009262;
        font-size: 40px;
        /* @media all and (max-width: 1440px) {
            font-size: 30px;
        } */
        @media all and (max-width: 980px) {
            font-size: 22px;
        }
        @media all and (max-width: 480px) {
            font-size: 20px;
        }
    }
`;
const HeaderRight = styled.div`
    width: 33%;
    position: absolute;
    right: 0;
    top: 0;

    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 980px) {
        width: 34%;
    }
    @media all and (max-width: 750px) {
        width: 31%;
    }
    @media all and (max-width: 360px) {
        width: 45%;
    }
`;
