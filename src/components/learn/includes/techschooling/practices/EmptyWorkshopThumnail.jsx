import React from "react";
import styled from "styled-components";

const EmptyWorkshopThumnail = () => {
    return (
        <Container>
            <ImageConatiner>
                <Image src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/workshopEmptypic.svg" />
            </ImageConatiner>
            <Title>Your Pratice is under review</Title>
        </Container>
    );
};

export default EmptyWorkshopThumnail;
const Container = styled.div`
    background-color: #f8f9fd;
    padding: 30px;
`;
const ImageConatiner = styled.div`
    margin-bottom: 20px;
`;
const Image = styled.img`
    width: 100%;
`;
const Title = styled.h3`
    font-size: 16px;
    text-align: center;
    line-height: 20px;
`;
