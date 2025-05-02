import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";

export const RatingPopup = (props) => {
    useEffect(() => {
        AOS.init();
    }, []);

    const starRef1 = useRef(null);
    const starRef2 = useRef(null);
    const starRef3 = useRef(null);
    const starRef4 = useRef(null);
    const starRef5 = useRef(null);

    const [rating, setRating] = useState(0);
    const [ratingHover, setRatingHover] = useState(0);

    function HoverFunction(starRef1, starRef2, starRef3, starRef4, starRef5) {
        useEffect(() => {
            function handleHoverOver(event) {
                if (
                    starRef1.current &&
                    starRef2.current &&
                    starRef3.current &&
                    starRef4.current &&
                    starRef5.current
                ) {
                    if (starRef1 && starRef1.current.contains(event.target)) {
                        setRatingHover(1);
                    }
                    if (starRef2 && starRef2.current.contains(event.target)) {
                        setRatingHover(2);
                    }
                    if (starRef3 && starRef3.current.contains(event.target)) {
                        setRatingHover(3);
                    }
                    if (starRef4 && starRef4.current.contains(event.target)) {
                        setRatingHover(4);
                    }
                    if (starRef5 && starRef5.current.contains(event.target)) {
                        setRatingHover(5);
                    }
                }
            }
            function handleHoverOut(event) {
                setRatingHover(0);
            }

            // Bind the event listener
            document.addEventListener("mouseover", handleHoverOver);
            document.addEventListener("mouseout", handleHoverOut);
            return () => {
                // Unbind the event listener on clean up
                document.addEventListener("mouseover", handleHoverOver);
                document.addEventListener("mouseout", handleHoverOut);
            };
        });
    }
    HoverFunction(starRef1, starRef2, starRef3, starRef4, starRef5);

    return props.show_modal ? (
        <Container>
            <Popup data-aos="fade-up">
                <ContentBox>
                    <Image
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/rating/horn.svg"
                        alt=""
                    />
                    <Title>Rate this chat session</Title>
                    <SubTitle>
                        Give this session a star rating from one to five
                    </SubTitle>
                    <RatingBox>
                        <Star
                            ref={starRef1}
                            src={
                                ratingHover >= 1
                                    ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/rating/star-colored.svg"
                                    : rating >= 1 && !ratingHover
                                    ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/rating/star-colored.svg"
                                    : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/rating/star.svg"
                            }
                            alt=""
                            onClick={() => {
                                setRating(1);
                            }}
                        />
                        <Star
                            ref={starRef2}
                            src={
                                ratingHover >= 2
                                    ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/rating/star-colored.svg"
                                    : rating >= 2 && !ratingHover
                                    ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/rating/star-colored.svg"
                                    : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/rating/star.svg"
                            }
                            alt=""
                            onClick={() => {
                                setRating(2);
                            }}
                        />
                        <Star
                            ref={starRef3}
                            src={
                                ratingHover >= 3
                                    ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/rating/star-colored.svg"
                                    : rating >= 3 && !ratingHover
                                    ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/rating/star-colored.svg"
                                    : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/rating/star.svg"
                            }
                            alt=""
                            onClick={() => {
                                setRating(3);
                            }}
                        />
                        <Star
                            ref={starRef4}
                            src={
                                ratingHover >= 4
                                    ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/rating/star-colored.svg"
                                    : rating >= 4 && !ratingHover
                                    ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/rating/star-colored.svg"
                                    : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/rating/star.svg"
                            }
                            alt=""
                            onClick={() => {
                                setRating(4);
                            }}
                        />
                        <Star
                            ref={starRef5}
                            src={
                                ratingHover >= 5
                                    ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/rating/star-colored.svg"
                                    : rating >= 5 && !ratingHover
                                    ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/rating/star-colored.svg"
                                    : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/rating/star.svg"
                            }
                            alt=""
                            onClick={() => {
                                setRating(5);
                            }}
                        />
                        <Rating>
                            {ratingHover === 1
                                ? "Very bad"
                                : ratingHover === 2
                                ? "Bad"
                                : ratingHover === 3
                                ? "Average"
                                : ratingHover === 4
                                ? "Good"
                                : ratingHover === 5
                                ? "Excellent"
                                : rating === 1
                                ? "Very bad"
                                : rating === 2
                                ? "Bad"
                                : rating === 3
                                ? "Average"
                                : rating === 4
                                ? "Good"
                                : rating === 5
                                ? "Excellent"
                                : null}
                        </Rating>
                    </RatingBox>
                    <Feedback placeholder="Type your message..."></Feedback>
                </ContentBox>
                <ButtonBox>
                    <Button
                        onClick={() => {
                            props.showModal && props.showModal("success");
                        }}
                        button_type="success"
                    >
                        <ButtonImg
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/rating/thumb.svg"
                            alt=""
                        />
                        <ButtonText>Submit</ButtonText>
                    </Button>
                    <Button
                        onCick={() => {
                            props.showModal && props.showModal();
                        }}
                    >
                        <ButtonImg
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support/rating/close.svg"
                            alt=""
                        />
                        <ButtonText>Cancel</ButtonText>
                    </Button>
                </ButtonBox>
            </Popup>
        </Container>
    ) : null;
};

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(177, 177, 177, 0.8);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Popup = styled.div`
    width: 40%;
    padding: 40px;
    background-color: #fff;
    @media only screen and (max-width: 1440px) {
        width: 50%;
    }
    @media only screen and (max-width: 768px) {
        width: 70%;
    }
    @media only screen and (max-width: 480px) {
        padding: 35px 20px;
        width: 100%;
        position: absolute;
        bottom: 0;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
    }
`;
const ContentBox = styled.div`
    margin-bottom: 25px;
    @media only screen and (max-width: 360px) {
        margin-bottom: 15px;
    }
`;
const Image = styled.img`
    display: block;
    width: 45px;
    @media only screen and (max-width: 360px) {
        width: 40px;
    }
`;
const Title = styled.h3`
    margin: 12px 0;
    color: #0c141d;
    font-family: product_sansbold;
    @media only screen and (max-width: 360px) {
        margin: 8px 0;
        font-size: 18px;
    }
`;
const SubTitle = styled.p`
    color: #0c141d;
    @media only screen and (max-width: 360px) {
        font-size: 15px;
    }
`;
const RatingBox = styled.div`
    display: flex;
    align-items: center;
    margin-top: 15px;
    @media only screen and (max-width: 360px) {
        margin-top: 10px;
    }
`;
const Star = styled.img`
    cursor: pointer;
    display: block;
    width: 40px;
    margin-right: 15px;
    @media only screen and (max-width: 360px) {
        margin-right: 10px;
        width: 30px;
    }
`;
const Rating = styled.span`
    margin-left: 10px;
    font-size: 14px;
    font-family: product_sansbold;
`;
const Feedback = styled.textarea`
    width: 100%;
    background-color: #f4f4f4;
    resize: none;
    padding: 15px;
    font-size: 14px;
    margin-top: 12px;
    @media only screen and (max-width: 480px) {
        height: 100px;
    }
    @media only screen and (max-width: 360px) {
        margin-bottom: 8px;
    }
`;
const ButtonBox = styled.div`
    display: flex;
    @media only screen and (max-width: 480px) {
        flex-direction: row-reverse;
    }
`;
const Button = styled.div`
    cursor: pointer;
    padding: 15px 30px;
    background-color: ${(props) =>
        props.button_type === "success" ? "#5ac66a" : "#fff"};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    border: ${(props) =>
        props.button_type !== "success" && "1px solid #b22824"};
    color: ${(props) => props.button_type !== "success" && "#b22824"};
    @media only screen and (max-width: 480px) {
        margin-right: unset;
        margin-left: 20px;
    }
`;
const ButtonImg = styled.img`
    display: block;
    margin-right: 8px;
`;
const ButtonText = styled.span`
    font-size: 14px;
`;
