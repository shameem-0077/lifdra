import React from "react";
import styled from "styled-components";

const EmptyCard = ({ text }) => {
    return (
        <CardContanier className="anim-fade">
            <ImageContainer>
                <Image src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/practices/assets/Emptypractices.svg" />
            </ImageContainer>
            <ContentContainer>
                <ContentTitle>Empty!</ContentTitle>
                <Description>{text}</Description>
            </ContentContainer>
        </CardContanier>
    );
};

export default EmptyCard;

const CardContanier = styled.div`
    text-align: center;
    background-color: #f5fbff;
    padding: 30px 20px;
    border-radius: 20px;
    width: 100%;
    margin-top: 20px;
`;
const ImageContainer = styled.div``;
const Image = styled.img`
    width: 100%;
    max-width: 300px;
`;
const ContentContainer = styled.div``;
const ContentTitle = styled.h3`
    font-size: 20px;
    font-family: gordita_medium;
    margin-bottom: 10px;
`;
const Description = styled.p`
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 15px;
    color: #747474;
    font-family: gordita_regular;
`;
