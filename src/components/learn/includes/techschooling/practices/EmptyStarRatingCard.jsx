import React from "react";
import styled from "styled-components";

const EmptyStarRatingCard = () => {
    return (
        <Container>
            <ImageConatiner>
                <Image src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/action-card.png" />
            </ImageConatiner>
            <Title>Please complete & upload your practice</Title>
        </Container>
    );
};

export default EmptyStarRatingCard;
const Container = styled.div`
    background-color: #f8f9fd;
    padding: 30px;
`;
const ImageConatiner = styled.div`
    width: 20%;
    margin: 30px auto;
`;
const Image = styled.img`
    width: 100%;
    display: block;
`;
const Title = styled.h3`
    font-size: 16px;
    text-align: center;
    font-family: gordita_regular;
`;
