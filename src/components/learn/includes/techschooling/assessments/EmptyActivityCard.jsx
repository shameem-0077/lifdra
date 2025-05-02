import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

function EmptyActivityCard() {
    const user_data = useSelector((state) => state.user_data);
    return (
        <Container>
            <ImageConatiner>
                <Image
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/undraw_goal.png"
                    alt=""
                />
            </ImageConatiner>
            <Title>Hey {user_data.name}!</Title>
            <Description>
                As you upload your practice, all the activities against it will
                appear here.{" "}
            </Description>
        </Container>
    );
}

export default EmptyActivityCard;
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
    font-size: 26px;
    text-align: center;
    line-height: 32px;
    margin-bottom: 6px;
`;
const Description = styled.p`
    font-size: 16px !important;
    text-align: center;
`;
