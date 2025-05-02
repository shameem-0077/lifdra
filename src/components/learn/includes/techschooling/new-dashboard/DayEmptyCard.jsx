import React from "react";
import styled from "styled-components";

function DayEmptyCard() {
    return (
        <Container>
            <VectorImage>
                <img
                    src={require("../../../../../assets/images/day-by-day/empty-image.svg")}
                    alt=""
                />
            </VectorImage>
            <Title>Currently not available</Title>
        </Container>
    );
}

export default DayEmptyCard;

const Container = styled.div`
    padding-top: 50px;
`;
const VectorImage = styled.div`
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    img {
        display: block;
        width: 100%;
    }
`;
const Title = styled.h2`
    font-size: 24px;
    font-family: gordita_medium !important;
    text-align: center;
    transform: translateY(-40px);
    color: #4d4d4d;
`;
