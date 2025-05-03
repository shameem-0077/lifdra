import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import auth from "../../../../routing/auth";

function DescriptionSections({ img_right, bgc, points, section, image }) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user_profile = useSelector((state) => state.user_profile);
    // const { is_expired, is_subscription } = useSelector(
    //     (state) => state.user_profile.prime_program_subscription
    // );

    function SectionContent() {
        return (
            <>
                {section === "learn" ? (
                    <>
                        <Title>
                            <span>What </span> are Prime <br /> Programs?
                        </Title>

                        <Description>
                            Prime Programs are specially designed Full-stack
                            Development program for college students, where they
                            can explore their interests and skills in the wide
                            range of programs offered and learn from the best!
                        </Description>
                    </>
                ) : section === "pricing" ? (
                    <>
                        <Title>
                            <span>Rs 10</span>/day!
                        </Title>

                        <Description>
                            You can now avail the subscription to these
                            well-organised courses under Prime Programs at just
                            Rs 10 per day (for a yearly subscription).
                        </Description>
                    </>
                ) : section === "limits" ? (
                    <>
                        <Title>
                            <span>Learn </span>without limits
                        </Title>

                        <Description>
                            Learn as much as you can without any limits on
                            learning hours.
                        </Description>
                    </>
                ) : section === "future_course" ? (
                    <>
                        <Title>
                            <span>Never Miss</span>
                            <br />
                            Out on Any Future Courses
                        </Title>

                        <Description>
                            You will be granted access to all the newly added
                            courses to the Prime Programs in the future.
                        </Description>
                    </>
                ) : null}
            </>
        );
    }

    return (
        <Container bgc={bgc}>
            <Section className="wrapper">
                <ImageSection img_right={img_right}>
                    <img src={image} alt="Spotlight image" />
                </ImageSection>
                <ContentSection img_right={img_right}>
                    {SectionContent()}
                    {points &&
                        points.map((data, index) => (
                            <DetailPoints key={index}>
                                <Tick>
                                    <img
                                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/tick.svg"
                                        alt="tick icon"
                                    />
                                </Tick>
                                <span>{data.point}</span>
                            </DetailPoints>
                        ))}
                    {user_profile.length > 0 ? (
                        user_profile.prime_program_subscription
                            .is_subscription &&
                        !user_profile.prime_program_subscription.is_expired ? (
                            <SubscribeButton
                                onClick={(e) => {
                                    navigate(`/prime-programs/courses/`);
                                }}
                            >
                                Continue
                            </SubscribeButton>
                        ) : (
                            <SubscribeButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (auth.isAuthenticated()) {
                                        navigate(`/prime-programs/courses/?action=subscribe-prime-programs`);
                                    } else {
                                        navigate(`${location.pathname}?action=login&next=/prime-programs/courses?action=subscribe-prime-programs`);
                                    }
                                }}
                            >
                                Subscribe Now
                            </SubscribeButton>
                        )
                    ) : (
                        <SubscribeButton
                            onClick={(e) => {
                                e.preventDefault();
                                if (auth.isAuthenticated()) {
                                    navigate(`/prime-programs/courses/?action=subscribe-prime-programs`);
                                } else {
                                    navigate(`${location.pathname}?action=login&next=/prime-programs/courses?action=subscribe-prime-programs`);
                                }
                            }}
                        >
                            Subscribe Now
                        </SubscribeButton>
                    )}
                </ContentSection>
            </Section>
        </Container>
    );
}

export default DescriptionSections;

const Container = styled.div`
    padding: 120px 0;
    background-color: ${(props) => props.bgc};
    @media all and (max-width: 980px) {
        padding: 100px 0;
    }
    @media all and (max-width: 768px) {
        padding: 80px 0;
    }
    @media all and (max-width: 640px) {
        padding: 70px 0;
    }
    @media all and (max-width: 480px) {
        padding: 60px 0;
    }
    @media all and (max-width: 360px) {
        padding: 50px 0;
    }
`;
const Section = styled.div`
    padding: 0 5%;
    display: grid;
    grid-gap: 50px;
    grid-template-columns: 1fr 1fr;

    @media all and (max-width: 980px) {
        @media all and (max-width: 980px) {
            grid-gap: 30px;
        }
    }
    @media all and (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-gap: 0px;
    }
`;
const ImageSection = styled.div`
    order: ${(props) => (props.img_right ? 2 : 1)};
    display: flex;
    align-items: center;

    img {
        /* max-width: 500px;
        margin: 0 auto; */
        display: block;
        width: 100%;
    }
    @media all and (max-width: 768px) {
        margin-top: ${(props) => (props.img_right ? "50px" : 0)};
    }
`;
const ContentSection = styled.div`
    order: ${(props) => (props.img_right ? 1 : 2)};
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* margin-right: 20px; */
    &:nth-child(2n) {
        margin-right: 0;
        /* margin-left: 50px; */
    }
`;
const Title = styled.h2`
    font-family: gordita_medium;
    font-size: 34px;
    margin-bottom: 10px;
    span {
        color: #4ca473;
    }
    @media all and (max-width: 1100px) {
        font-size: 32px;
    }
    @media all and (max-width: 768px) {
        font-size: 28px;
    }
    @media all and (max-width: 480px) {
        font-size: 24px;
    }
    @media all and (max-width: 360px) {
        font-size: 22px;
    }
`;

const Description = styled.p`
    max-width: 400px;
    margin-bottom: 20px;
    @media all and (max-width: 980px) {
        font-size: 16px;
    }
    @media all and (max-width: 480px) {
        font-size: 15px;
    }
`;
const SubscribeButton = styled.span`
    display: block;
    width: 200px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4ca473;
    border: 2px solid #fff;
    color: #fff;
    font-family: gordita_medium;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 30px;
    transition: all 0.3s ease-in-out;
    &:hover {
        color: #4ca473;
        background-color: #fff;
        border: 2px solid #4ca473;
    }
    @media all and (max-width: 980px) {
        margin-top: 20px;
        font-size: 16px;
    }
    @media all and (max-width: 360px) {
        margin-top: 20px;
        width: 200px;
        height: 50px;
    }
`;

const DetailPoints = styled.span`
    display: flex;
    margin-bottom: 10px;
    color: #595959;
    span {
        font-size: 16px;
    }
    @media all and (max-width: 640px) {
        span {
            font-size: 15px;
        }
    }
`;
const Tick = styled.span`
    display: block;
    width: 20px;
    margin-right: 15px;
    img {
        display: block;
        width: 100%;
    }
`;
