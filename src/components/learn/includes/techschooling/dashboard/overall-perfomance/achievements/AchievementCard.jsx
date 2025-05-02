import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getDateStr } from "../../../../../../helpers/functions";

export default function AchievementCard({ achievement }) {
    const [filledStar, setFilledStar] = useState(0);
    useEffect(() => {
        let count = achievement.is_completed ? "6" : "0";
        setFilledStar(count);
    }, [achievement]);

    return (
        <Container
            status={
                achievement.is_completed
                    ? "completed"
                    : achievement.is_enrolled
                    ? "enrolled"
                    : ""
            }
        >
            <ImageWrapper>
                <Image src={achievement.image} alt="Image" />
            </ImageWrapper>
            <Right>
                <Title>{achievement.name}</Title>
                <Status>
                    {achievement.is_completed
                        ? `Completed on ${getDateStr(achievement.date_updated)}`
                        : achievement.is_enrolled
                        ? "Enrolling now"
                        : "Not enrolled yet"}
                </Status>
                <Stars>
                    {achievement.is_completed ? (
                        <>
                            {[...Array(6)].map((i) => {
                                return (
                                    <Star
                                        key={i}
                                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/star.svg"
                                        alt="Image"
                                    />
                                );
                            })}
                            {[...Array(4)].map((i) => (
                                <Star
                                    key={i}
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/unfilled-star.svg"
                                    alt="Image"
                                />
                            ))}
                        </>
                    ) : (
                        [...Array(10)].map((i) => (
                            <Star
                                key={i}
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/unfilled-star.svg"
                                alt="Image"
                            />
                        ))
                    )}
                </Stars>
            </Right>
            <SteypLogo
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp/steyp-log.png"
                alt="Image"
            />
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    width: 100%;
    background: #e8f3fd;
    padding: 16px 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    margin-bottom: 14px;
    filter: ${(props) =>
        props.status === "completed"
            ? "normal"
            : props.status === "enrolled"
            ? "opacity(0.5)"
            : "grayscale(1)"};
`;
const ImageWrapper = styled.div`
    margin-right: 21px;
    width: 24%;

    @media all and (max-width: 360px) {
        margin-right: 10px;
    }
`;
const Image = styled.img`
    display: block;
    width: 100%;
    @media all and (max-width: 360px) {
        // width: 70%;
    }
`;
const Right = styled.div``;
const Title = styled.span`
    font-family: gordita_medium;
    display: block;
    font-size: 15px;
`;
const Status = styled.span`
    display: block;
    color: #7f7f7f;
    font-size: 13px;
    font-family: gordita_regular;
`;
const Stars = styled.div`
    margin-top: 7px;
    display: flex;
`;
const Star = styled.img`
    display: block;
    width: 12px;
    margin-right: 5px;
    &:last-child {
        margin-right: 0;
    }
`;
const SteypLogo = styled.img`
    display: block;
    width: 35px;
    position: absolute;
    bottom: 15px;
    right: 15px;
    @media all and (max-width: 400px) {
        // display: none;
    }
`;
