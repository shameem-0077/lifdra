import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function TermsService() {
    return (
        <Container>
            <Text to="/tos/" className="g-medium" target="_blank">
                Terms of service
            </Text>
        </Container>
    );
}

const Container = styled.div`
    text-align: center;
    border-top: 1px solid #d1dbda;
    padding: 22px 0 55px;
    @media (max-width: 640px) {
        padding: 22px 0;
    }
`;
const Text = styled(Link)`
    font-size: 13px;
`;
