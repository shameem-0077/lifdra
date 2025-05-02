import React, { useState } from "react";
import styled from "styled-components";
import VideoModal from "../../general/VideoModal";

function WatchStoriesStudentsCard({ data, setVideoData, setModal }) {
    return (
        <Container>
            <ImageContainer className="image">
                <img src={data.photo} alt="" />
            </ImageContainer>
            <Overlay className="overlay"></Overlay>
            <ContentContainer>
                <Name>
                    <img src={data.student_image_name} alt="" />
                </Name>
                <Class>
                    {data.course}
                    <sup>th,</sup> {data.campus}
                </Class>
                <Button
                    className="hover-button"
                    onClick={() => {
                        setModal(true);
                        setVideoData(data);
                    }}
                >
                    <Play>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/play-black.svg"
                            alt=""
                        />
                    </Play>
                    Watch Story
                </Button>
            </ContentContainer>
        </Container>
    );
}

export default WatchStoriesStudentsCard;

const Container = styled.div`
    position: relative;

    &:hover {
        .image {
            transform: scale(1.1);
        }
        .overlay {
            transition: ease-in 0.4s;
            opacity: 0.6;
        }
    }
`;
const ImageContainer = styled.div`
    transition: ease-in 0.4s;
    img {
        display: block;
        width: 100%;
    }
`;

const ContentContainer = styled.div`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;
    &:hover {
        .hover-button {
            height: 40px;
            opacity: 1;
            @media all and (max-width: 480px) {
                height: 35px;
            }
        }
    }
    @media all and (max-width: 400px) {
        padding: 15px 10px;
    }
`;

const Name = styled.span`
    display: block;
    img {
        display: block;
        width: 100%;
    }
    /* color: #fff;
    font-size: 18px;
    font-family: gordita_medium;
    text-align: center;
    text-transform: capitalize; */
    /* @media all and (max-width: 1280px) {
        font-size: 20px;
    }
    
    @media all and (max-width: 768px) {
        font-size: 20px;
    }
    @media all and (max-width: 640px) {
        font-size: 18px;
    } */
    @media all and (max-width: 980px) {
        font-size: 16px;
    }
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
    @media all and (max-width: 360px) {
        font-size: 13px;
    }
`;

const Overlay = styled.div`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 1;
    background: linear-gradient(180deg, rgba(248, 248, 248, 0) 0%, rgba(0, 0, 0, 1) 100%);
    opacity: 0.4;
`;

const Class = styled.p`
    font-size: 14px;
    color: #fff;
    text-align: center;
    margin-bottom: 10px;
    sup {
        font-size: 12px;
        margin-right: 2px;
    }
    @media all and (max-width: 768px) {
        font-size: 14px;
    }
    @media all and (max-width: 480px) {
        font-size: 13px;
    }
    @media all and (max-width: 480px) {
        font-size: 12px;
    }
`;

const Button = styled.span`
    display: block;
    width: 100%;
    height: 0px;
    opacity: 0;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    text-transform: uppercase;
    font-family: gordita_medium;
    padding-top: 4px;
    border-radius: 6px;
    transition: all 0.4s;
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
    @media all and (max-width: 768px) {
        height: 40px;
        opacity: 1;
    }
    @media all and (max-width: 480px) {
        font-size: 10px;
        height: 35px;
        padding-top: 2px;
    }
`;

const Play = styled.span`
    display: block;
    width: 10px;
    transform: translateY(-3px);
    margin-right: 4px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 480px) {
        display: none;
    }
`;
