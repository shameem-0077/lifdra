import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TalropEdtechHelmet from "../../helpers/TalropEdtechHelmet";

function CertificateError() {
    return (
        <>
            <TalropEdtechHelmet title="Invalid certificate ID " />
            <Container>
                <InnerContainer>
                    <ImageContainer>
                        <Image
                            alt="certificate"
                            src={require("../../assets/images/certificate-error.svg")}
                        />
                    </ImageContainer>
                    <Title>Invalid Certificate ID</Title>
                    <Text>The certificate ID is invalid</Text>
                    <Button to="/tech-schooling/">Go to Dashboard</Button>
                </InnerContainer>
            </Container>
        </>
    );
}
export default CertificateError;

const Container = styled.div`
    margin: -25px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 140px) !important;
    padding-right: unset !important;
    padding-bottom: unset !important;
    @media (min-width: 768px) {
        /* padding-left: 63px; */
    }
`;
const InnerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 170px 0;
`;
const ImageContainer = styled.div`
    width: 400px;
    @media only screen and (max-width: 640px) {
        width: 300px;
    }
`;
const Image = styled.img`
    display: block;
    width: 100%;
    @media (max-width: 1100px) {
        width: 55%;
        margin: 0 auto;
    }
`;
const Title = styled.h3`
    font-size: 26px;
    color: #363636;
    font-family: "baloo_paaji_2semibold";
    margin: 30px 0 20px;
    @media (max-width: 1100px) {
        margin: 20px 0px 3px;
    }
    @media only screen and (max-width: 640px) {
        font-size: 24px;
    }
    @media only screen and (max-width: 480px) {
        font-size: 20px;
    }
`;
const Text = styled.p`
    font-size: 18px;
    color: #6ca1ad;
    width: 68%;
    text-align: center;
    margin-bottom: 16px;
    @media only screen and (max-width: 1280px) {
        width: 71%;
        font-size: 18px;
    }
    @media only screen and (max-width: 480px) {
        font-size: 16px;
        width: 94%;
    }
`;
const Button = styled(Link)`
    display: flex;
    font-size: 18px;
    background-color: #5cca73;
    color: #fff;
    border-radius: 24px;
    padding: 10px 25px;
    @media only screen and (max-width: 480px) {
        font-size: 16px;
        padding: 7px 20px;
    }
`;
