import React from "react";
import styled from "styled-components";

function DesignationCard({ data }) {
    return (
        <Container>
            <Top>
                <Title>{data.name}</Title>
                {/* <Descrition>{data.description}</Descrition> */}
            </Top>
            <DesignationImage>
                <img src={data.image} alt="" />
            </DesignationImage>
        </Container>
    );
}

export default DesignationCard;

const Container = styled.div`
    padding: 20px 15px;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;
const Top = styled.div`
    margin-bottom: 20px;
`;
const Title = styled.h4`
    font-size: 18px;
    margin-bottom: 10px;
    color: #48445b;
    font-family: gordita_medium;
    @media all and (max-width: 1100px) {
        font-size: 15px;
    }
    @media all and (max-width: 480px) {
        font-size: 15px;
    }
`;
const Descrition = styled.p`
    font-size: 14px;
    color: #5c5c5c;
    /* @media all and (max-width: 1100px) {
        font-size: 13px;
    } */
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
`;

const DesignationImage = styled.div`
    /* @media all and (max-width: 1280px) {
        position: absolute;
        bottom: 10px;
        right: 0;
        width: 100%;
    }*/
    img {
        display: block;
        width: 90%;
        margin: 0 auto;
        max-width: 200px;
    }
    /* @media all and (max-width: 1100px) {
        position: relative;
    } */
    @media all and (max-width: 400px) {
        /* right: 20%; */
    }
`;
