import React from "react";
import styled from "styled-components";
import { useAuthStore } from "../../store/authStore";
// import errorImage from "../../assets/images/PaymentDashboard";

function MainErrorPage() {
    const { user_data } = useAuthStore();
    const error_message = user_data?.error_message || "Something went wrong. Please try again.";

    return (
        <MainContainer>
            <ErrorContainer>
                {/* <ErrorImage
                    src={errorImage}
                    alt="Error"
                /> */}
                <ErrorTitle>Oops!</ErrorTitle>
                <ErrorText>{error_message}</ErrorText>
            </ErrorContainer>
        </MainContainer>
    );
}

export default MainErrorPage;

const MainContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
`;

const ErrorContainer = styled.div`
    text-align: center;
    padding: 40px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ErrorImage = styled.img`
    width: 200px;
    margin-bottom: 20px;
`;

const ErrorTitle = styled.h1`
    font-size: 32px;
    color: #333;
    margin-bottom: 10px;
    font-family: "baloo_paaji_2semibold";
`;

const ErrorText = styled.p`
    font-size: 16px;
    color: #666;
    font-family: "gordita_regular";
`;
