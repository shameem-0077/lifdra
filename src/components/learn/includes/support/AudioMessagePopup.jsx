import React, { useEffect } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";

export const AudioMessagePopup = (props) => {
    useEffect(() => {
        AOS.init();
    }, []);

    return props.show_modal ? (
        <Container>
            <Popup data-aos="fade-up">
                <ContentBox>
                    <Title>Allow microphone</Title>
                    <Description>
                        To record Voice Messages, Steyp needs access to your microphone. Click in
                        the URL bar <i className="las la-lock"></i> and choose “Always allow
                        steyp.com to access your microphone.”
                    </Description>
                </ContentBox>
                <ButtonBox>
                    <Button
                        onClick={() => {
                            props.showModal && props.showModal();
                        }}
                    >
                        <ButtonImg
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/rating/thumb.svg"
                            alt=""
                        />
                        <ButtonText>Okay</ButtonText>
                    </Button>
                </ButtonBox>
            </Popup>
        </Container>
    ) : null;
};

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(177, 177, 177, 0.8);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Popup = styled.div`
    width: 40%;
    padding: 40px 30px;
    background-color: #fff;
    border-radius: 5px;
    @media only screen and (max-width: 1440px) {
        width: 50%;
    }
    @media only screen and (max-width: 768px) {
        width: 70%;
    }
    @media only screen and (max-width: 480px) {
        padding: 35px 20px;
        width: 100%;
        position: absolute;
        bottom: 0;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
    }
`;
const ContentBox = styled.div`
    margin-bottom: 25px;
    @media only screen and (max-width: 360px) {
        margin-bottom: 15px;
    }
`;
const Title = styled.h4`
    font-size: 22px;
    margin-bottom: 15px;
    font-family: product_sansbold;
`;
const Description = styled.p``;
const ButtonBox = styled.div`
    display: flex;
    justify-content: flex-end;
`;
const Button = styled.div`
    cursor: pointer;
    padding: 12px 25px;
    background-color: #5ac66a;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 2px;
`;
const ButtonImg = styled.img`
    display: block;
    margin-right: 8px;
`;
const ButtonText = styled.span`
    font-size: 14px;
`;
