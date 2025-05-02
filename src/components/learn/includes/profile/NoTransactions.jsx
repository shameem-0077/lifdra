import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function NoTransactions({
    title,
    description,
    button_text,
    button_function,
    isButton,
}) {
    return (
        <Container>
            <Image
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/my-coins/empty.svg"
                alt="image"
            />
            <Title>{title}</Title>
            <Description>{description}</Description>
            {isButton && <Button to={button_function}>{button_text}</Button>}
        </Container>
    );
}
const Container = styled.div`
    height: calc(100vh - 152.19px);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #f8f9fd;
    width: -webkit-fill-available;
`;
const Image = styled.img`
    display: block;
    width: 23%;
`;
const Title = styled.h4`
    font-size: 22px;
    font-family: "gordita_medium";
    display: block;
    letter-spacing: 0.03rem;
    margin: 20px 0;
    @media (max-width: 480px) {
        font-size: 21px;
    }
`;
const Description = styled.p`
    width: 45%;
    font-family: "gordita_regular";
    font-size:13px;
    letter-spacing: 0.03rem;
    @media (max-width: 980px) {
        width: 90%;
    }
`;
const Button = styled(Link)`
    cursor: pointer;
    display: block;
    font-family: "gordita_medium";
    background: #75a3f4;
    color: #fff;
    padding: 13px 33px;
    font-size: 16px;
    border-radius: 4px;
    letter-spacing: 0.03rem;
    margin-top: 34px;
`;
