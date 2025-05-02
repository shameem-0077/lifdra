import React from "react";
import NavBar from "./NavBar";
import styled from "styled-components";

export function Header() {
    return (
        <Container>
            <Heading>Tech Schooling</Heading>
            <NavBar />
        </Container>
    );
}

const Container = styled.div``;
const Heading = styled.h3`
    font-family: "gordita_medium";
    font-size: 24px;
    margin-bottom: 19px;
    @media (max-width: 768px) {
        font-size: 22px;
        margin-bottom: 6px;
    }
`;
