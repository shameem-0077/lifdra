import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function ColorLogo() {
    return (
        <Container>
            <Click to="/">
                <Image src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp/favicon.png" alt="Logo" />
            </Click>
        </Container>
    );
}

const Container = styled.h1`
    display: none;
    @media (max-width: 640px) {
        display: block;
        width: 61px;
    }
    @media (max-width: 480px) {
        display: block;
        width: 55px;
    }
`;
const Click = styled(Link)`
    display: block;
`;
const Image = styled.img`
    display: block;
    width: 100%;
`;
