import React from "react";
import styled from "styled-components";
import colors from "../../../../../Colors";

const EvaluationCard = () => {
    return (
        <Container>
            <ImageConatiner>
                <Image src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/evaluvation.svg" />
            </ImageConatiner>
            <Title>
                Evalution will be completed soon <br />
                <Bold>Hold tight!!!</Bold>
            </Title>
        </Container>
    );
};

export default EvaluationCard;
const Container = styled.div`
    background-color: #f8f9fd;
    padding: 30px;
`;
const ImageConatiner = styled.div`
    margin-bottom: 20px;
    width: 50%;
    margin: 0 auto;
`;
const Image = styled.img`
    width: 100%;
`;
const Title = styled.h3`
    font-size: 26px;
    text-align: center;
    font-family: baloo_paaji_2medium;
    color: ${colors.amber};
    line-height: 30px;
    margin-top: 20px;
`;
const Bold = styled.span`
    display: inline-block;
    font-family: baloo_paaji_2bold;
`;
