import React from "react";
import styled from "styled-components";

export default function GuidanceVideoCard({
    data,
    handleToggleModal,
    setPlayUrl,
    setTitle,
}) {
    return (
        <Container>
            <TitleContainer>
                <Title>{data.title}</Title>
                <Description>{data.description}</Description>
            </TitleContainer>
            <CardsContainer className="lessons-slider">
                {data.guidances &&
                    data.guidances.map((item, index) => (
                        <VideoCard
                            onClick={() => {
                                setPlayUrl(item.playlist);
                                setTitle(item.title);
                                handleToggleModal();
                            }}
                        >
                            <TopContainer>
                                <Image src={item.image}></Image>
                                <PlayIcon className="las la-play"></PlayIcon>
                            </TopContainer>

                            <ItemText>{item.title}</ItemText>
                        </VideoCard>
                    ))}
            </CardsContainer>
        </Container>
    );
}

const Container = styled.div`
    margin-bottom: 30px;
    &:last-child {
        margin-bottom: 0;
    }
    @media (max-width: 768px) {
        margin-bottom: 28px;
    }
`;
const TitleContainer = styled.div`
    margin-bottom: 12px;
    padding: 0 22px;
    @media (max-width: 640px) {
        margin-bottom: 14px;
    }
`;
const Title = styled.h4`
    font-size: 20px;
    font-family: "product_sansbold";
    @media (max-width: 980px) {
        font-size: 18px;
    }
    @media (max-width: 768px) {
        font-size: 20px;
    }
    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
const Description = styled.span`
    color: #909090;
    color: #5a5a5a;
    font-size: 16px;
    margin: 10px 0 8px;
    display: block;
    @media (max-width: 980px) {
        font-size: 14px;
    }
    @media (max-width: 768px) {
        font-size: 15px;
    }
    @media (max-width: 480px) {
        font-size: 14px;
        margin: 8px 0 6px;
    }
`;
const CardsContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    gap: unset;
    padding: 0 18px;
    &::-webkit-scrollbar {
        display: none;
    }
`;
const SlideWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 24px;
    @media (max-width: 980px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 640px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        grid-row-gap: 11px;
    }
`;
const VideoCard = styled.div`
    display: block;
    @media (max-width: 1100px) {
        min-width: 300px;
        max-width: 300px;
        margin-right: 18px;
    }
    @media (max-width: 640px) {
        margin-right: 14px;
    }
    @media (max-width: 480px) {
        min-width: 250px;
        max-width: 250px;
    }
`;
const TopContainer = styled.div`
    position: relative;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
    }
`;
const Image = styled.img`
    display: block;
    width: 100%;
    border-radius: 10px;
`;
const PlayIcon = styled.span`
    position: absolute;
    color: #fff;
    font-size: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const ItemText = styled.span`
    font-family: "product_sansbold";
    display: block;
    margin-top: 8px;
    font-size: 16px;
    line-height: 1.2rem;
    @media (max-width: 980px) {
        font-size: 14px;
    }
    @media (max-width: 768px) {
        font-size: 16px;
    }
    @media (max-width: 480px) {
        font-size: 15px;
        margin-top: 10px;
    }
`;
