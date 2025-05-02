import React from "react";
import styled from "styled-components";

function Commitee() {
    return (
        <Cover>
            <Container className="wrapper">
                <Heading>The Organizing Commitee</Heading>
                <Bottom>
                    <Ul>
                        <Li>
                            <UserImage>
                                <img
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/05-01-2023/men.png"
                                    alt="Image"
                                />
                            </UserImage>
                            <Span>Binny Sahithy</Span>
                            <Small>District Co-ordinator NGC</Small>
                        </Li>
                        <Li>
                            <UserImage>
                                <img
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/05-01-2023/anas.png"
                                    alt="Image"
                                />
                            </UserImage>
                            <Span>Anas Abdul Gafoor</Span>
                            <Small>Co-founder & CFO of Talrop</Small>
                        </Li>
                        <Li>
                            <UserImage>
                                <img
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/05-01-2023/sobir.png"
                                    alt="Image"
                                />
                            </UserImage>
                            <Span>Sobir Najumudeen</Span>
                            <Small>Founder & CEO of Steyp</Small>
                        </Li>
                    </Ul>
                </Bottom>
            </Container>
        </Cover>
    );
}

export default Commitee;
const Cover = styled.div`
    background-color: #fae5cf;
    padding: 90px 0px;
    background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-01-2023/The-organizing-commitee.svg");
    background-size: 100%;
    position: relative;
    @media all and (max-width: 980px) {
        padding: 60px 0px;
    }
    @media all and (max-width: 480px) {
        padding: 40px 0px;
    }
    ::after {
        content: "";
        display: inline-block;
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/cloud-image.svg");
        width: 220px;
        height: 122px;
        position: absolute;
        background-size: 80%;
        bottom: -12%;
        left: 9%;
        background-repeat: no-repeat;
        @media all and (max-width: 1080px) {
            bottom: -10%;
        }
        @media all and (max-width: 980px) {
            background-size: 70%;
        }
        @media all and (max-width: 640px) {
            display: none;
        }
    }
`;
const Container = styled.div``;
const Heading = styled.h2`
    text-align: center;
    font-family: "gordita_medium";
    font-size: 34px;
    color: #409274;
    margin-bottom: 50px;
    @media all and (max-width: 768px) {
        margin-bottom: 40px;
    }
    @media all and (max-width: 640px) {
        font-size: 30px;
    }
    @media all and (max-width: 480px) {
        font-size: 24px;
        margin-bottom: 25px;
    }
`;
const Bottom = styled.div``;
const Ul = styled.ul`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;
const Li = styled.li`
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
    @media all and (max-width: 1080px) {
        width: 34%;
        margin-bottom: 40px;
        :last-child {
            margin-bottom: 0;
        }
    }
    @media all and (max-width: 768px) {
        width: 44%;
    }
    @media all and (max-width: 640px) {
        width: 70%;
    }
    @media all and (max-width: 480px) {
        width: 100%;
        margin-bottom: 25px;
    }
`;
const UserImage = styled.div`
    width: 50%;
    margin-bottom: 20px;

    img {
        width: 100%;
        display: block;
        border-radius: 50%;
    }
    @media all and (max-width: 1080px) {
        width: 65%;
        margin-bottom: 10px;
    }
`;
const Span = styled.h4`
    font-size: 20px;
    color: #034286;
    font-family: "gordita_medium";
    margin-top: 15x;
`;
const Small = styled.h6`
    color: #676767;
    font-size: 16px;
    margin-top: 5px;
    @media all and (max-width: 1280px) {
        font-size: 15px;
    }
`;
