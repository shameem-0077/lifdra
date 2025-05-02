import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import PlaceHolder from "../../../general/PlaceHolder";
import { numberWithCommas, secondsTohm } from "../../../helpers/functions";
import auth from "../../../routing/auth";
import { useSelector } from "react-redux";
import { primeprogramsConfig } from "../../../../axiosConfig";
import Lottie from "react-lottie";
import loader from "../../../../assets/lotties/prime-progrmmes/voucherLoader.json";

const PrimeProgramsCard = ({ course }) => {
    const location = useLocation();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [isStartNowLoading, setStartNowLoading] = useState(false);
    const { user_data } = useSelector((state) => state);
    const { prime_program_subscription } = useSelector(
        (state) => state.user_profile
    );

    function onLoad() {
        setIsLoading(false);
    }

    function StartCourse() {
        const access_token = user_data.access_token;
        setStartNowLoading(true);
        primeprogramsConfig
            .get(`learning/start-course/${course.id}/`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((response) => {
                const { StatusCode, data } = response.data;
                if (StatusCode === 6000) {
                    history.push(
                        `/prime-programs/${course.slug}/${course.first_topic}/`
                    );
                    setStartNowLoading(false);
                } else if (StatusCode === 6001) {
                    setStartNowLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setStartNowLoading(false);
            });
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: {},
    };

    return (
        <>
            {prime_program_subscription?.is_subscription &&
            !prime_program_subscription?.is_expired ? (
                !course.is_started ? (
                    <StartNowCard>
                        <PlaceHolder
                            isLoading={isLoading}
                            paddingTop="55.34%"
                        />
                        <CardTop
                            style={{ display: isLoading ? "none" : "block" }}
                        >
                            <CardImage
                                onLoad={onLoad}
                                src={course.cover_image}
                                alt="Image"
                            />
                        </CardTop>
                        {course.is_purchased && (
                            <Badge
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/life-time-tags.svg"
                                alt="Image"
                            />
                        )}

                        <CardMiddle>
                            <Course>{course.name}</Course>
                            <LessonInfo>
                                <LessonCont>
                                    <LessonIcon className="las la-layer-group"></LessonIcon>
                                    <LessonText>
                                        {course.lessons_count} Lessons
                                    </LessonText>
                                </LessonCont>
                                <TimeCont>
                                    <TimeIcon className="las la-clock"></TimeIcon>
                                    <TimeText>
                                        {secondsTohm(course.duration)}
                                    </TimeText>
                                </TimeCont>
                            </LessonInfo>
                            <DivBtm>{course.short_description}</DivBtm>
                        </CardMiddle>
                        {isStartNowLoading ? (
                            <StartNow>
                                <Lottie
                                    options={defaultOptions}
                                    height={35}
                                    width={35}
                                />
                            </StartNow>
                        ) : (
                            <StartNow onClick={StartCourse}>Start Now</StartNow>
                        )}
                    </StartNowCard>
                ) : course.is_started && !course.is_completed ? (
                    <StudCard
                        to={
                            course.is_started
                                ? `/prime-programs/${course.slug}/${
                                      course.current_topic
                                          ? course.current_topic
                                          : course.first_topic
                                  }/`
                                : `/prime-programs/${course.slug}/info/`
                        }
                    >
                        <PlaceHolder
                            isLoading={isLoading}
                            paddingTop="55.34%"
                        />
                        <CardTop
                            style={{ display: isLoading ? "none" : "block" }}
                        >
                            <CardImage
                                onLoad={onLoad}
                                src={course.cover_image}
                                alt="Image"
                            />
                        </CardTop>
                        {course.is_purchased && (
                            <Badge
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/life-time-tags.svg"
                                alt="Image"
                            />
                        )}

                        <CardMiddle>
                            <Course>{course.name}</Course>
                            <LessonInfo>
                                <LessonCont>
                                    <LessonIcon className="las la-layer-group"></LessonIcon>
                                    <LessonText>
                                        {course.lessons_count} Lessons
                                    </LessonText>
                                </LessonCont>
                                <TimeCont>
                                    <TimeIcon className="las la-clock"></TimeIcon>
                                    <TimeText>
                                        {secondsTohm(course.duration)}
                                    </TimeText>
                                </TimeCont>
                            </LessonInfo>
                            <DivBtm>{course.short_description}</DivBtm>
                        </CardMiddle>

                        <StartNow>Continue</StartNow>
                    </StudCard>
                ) : course.is_completed ? (
                    <StudCard
                        to={
                            course.is_started
                                ? `/prime-programs/${course.slug}/${
                                      course.current_topic
                                          ? course.current_topic
                                          : course.first_topic
                                  }/`
                                : `/prime-programs/${course.slug}/info/`
                        }
                    >
                        <PlaceHolder
                            isLoading={isLoading}
                            paddingTop="55.34%"
                        />
                        <CardTop
                            style={{ display: isLoading ? "none" : "block" }}
                        >
                            <CardImage
                                onLoad={onLoad}
                                src={course.cover_image}
                                alt="Image"
                            />
                        </CardTop>
                        {course.is_purchased && (
                            <Badge
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/life-time-tags.svg"
                                alt="Image"
                            />
                        )}

                        <CardMiddle>
                            <Course>{course.name}</Course>
                            <LessonInfo>
                                <LessonCont>
                                    <LessonIcon className="las la-layer-group"></LessonIcon>
                                    <LessonText>
                                        {course.lessons_count} Lessons
                                    </LessonText>
                                </LessonCont>
                                <TimeCont>
                                    <TimeIcon className="las la-clock"></TimeIcon>
                                    <TimeText>
                                        {secondsTohm(course.duration)}
                                    </TimeText>
                                </TimeCont>
                            </LessonInfo>
                            <DivBtm>{course.short_description}</DivBtm>
                        </CardMiddle>
                        <ButtonContainer>
                            {" "}
                            <CertificateButton
                                to={`/certificate/?id=${course.certificate_id}`}
                            >
                                <ButtonText>Certificate</ButtonText>
                                <DownloadIcon
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/04-08-2021/green-download.svg
                                        "
                                    alt="Download"
                                />
                            </CertificateButton>
                            <StartNow>Continue</StartNow>
                        </ButtonContainer>
                    </StudCard>
                ) : null
            ) : prime_program_subscription?.is_expired &&
              course?.is_completed ? (
                <StudCard
                    to={
                        course.is_started
                            ? `/prime-programs/${course.slug}/${
                                  course.current_topic
                                      ? course.current_topic
                                      : course.first_topic
                              }/`
                            : `/prime-programs/${course.slug}/info/`
                    }
                >
                    <PlaceHolder isLoading={isLoading} paddingTop="55.34%" />
                    <CardTop style={{ display: isLoading ? "none" : "block" }}>
                        <CardImage
                            onLoad={onLoad}
                            src={course.cover_image}
                            alt="Image"
                        />
                    </CardTop>
                    {course.is_purchased && (
                        <Badge
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/life-time-tags.svg"
                            alt="Image"
                        />
                    )}

                    <CardMiddle>
                        <Course>{course.name}</Course>
                        <LessonInfo>
                            <LessonCont>
                                <LessonIcon className="las la-layer-group"></LessonIcon>
                                <LessonText>
                                    {course.lessons_count} Lessons
                                </LessonText>
                            </LessonCont>
                            <TimeCont>
                                <TimeIcon className="las la-clock"></TimeIcon>
                                <TimeText>
                                    {secondsTohm(course.duration)}
                                </TimeText>
                            </TimeCont>
                        </LessonInfo>
                        <DivBtm>{course.short_description}</DivBtm>
                    </CardMiddle>

                    {course.is_purchased ? (
                        <CardBottom>
                            {" "}
                            <CertificateButton
                                to={`/certificate/?id=${course.certificate_id}`}
                            >
                                <ButtonText>Certificate</ButtonText>
                                <DownloadIcon
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/04-08-2021/green-download.svg
                       "
                                    alt="Download"
                                />
                            </CertificateButton>
                            <TextCont
                                status={"continue"}
                                to={
                                    course.is_purchased
                                        ? `/prime-programs/${course.slug}/${
                                              course.current_topic
                                                  ? course.current_topic
                                                  : course.first_topic
                                          }/`
                                        : `/prime-programs/${course.slug}/info/`
                                }
                            >
                                Continue
                            </TextCont>
                        </CardBottom>
                    ) : (
                        <CertificateButton
                            to={`/certificate/?id=${course.certificate_id}`}
                        >
                            <ButtonText>View Certificate</ButtonText>
                            <DownloadIcon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/04-08-2021/green-download.svg
                                        "
                                alt="Download"
                            />
                        </CertificateButton>
                    )}
                </StudCard>
            ) : (
                <StudCard
                    to={
                        course.is_purchased
                            ? `/prime-programs/${course.slug}/${
                                  course.current_topic
                                      ? course.current_topic
                                      : course.first_topic
                              }/`
                            : `/prime-programs/${course.slug}/info/`
                    }
                >
                    <PlaceHolder isLoading={isLoading} paddingTop="55.34%" />
                    <CardTop style={{ display: isLoading ? "none" : "block" }}>
                        <CardImage
                            onLoad={onLoad}
                            src={course.cover_image}
                            alt="Image"
                        />
                    </CardTop>
                    {!course.is_purchased &&
                    course.coins < course.actual_coins ? (
                        <Badge
                            src={require("../../../../assets/images/prime-program/apply-voucher/label.svg")}
                            alt="Image"
                        />
                    ) : (
                        <Badge
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/life-time-tags.svg"
                            alt="Image"
                        />
                    )}
                    {!course.is_purchased ? (
                        course.coins < course.actual_coins ? (
                            <Offer>
                                {parseInt(
                                    100 -
                                        (course.coins / course.actual_coins) *
                                            100
                                )}
                                % off
                            </Offer>
                        ) : (
                            " "
                        )
                    ) : (
                        <></>
                    )}
                    <CardMiddle>
                        <Course>{course.name}</Course>
                        <LessonInfo>
                            <LessonCont>
                                <LessonIcon className="las la-layer-group"></LessonIcon>
                                <LessonText>
                                    {course.lessons_count} Lessons
                                </LessonText>
                            </LessonCont>
                            <TimeCont>
                                <TimeIcon className="las la-clock"></TimeIcon>
                                <TimeText>
                                    {secondsTohm(course.duration)}
                                </TimeText>
                            </TimeCont>
                        </LessonInfo>
                        <DivBtm>{course.short_description}</DivBtm>
                    </CardMiddle>

                    <CardBottom>
                        {!course.is_purchased && (
                            <CoursePrice>
                                <Discount>
                                    ₹{" "}
                                    {numberWithCommas(
                                        course.coins * course.coin_value
                                    )}
                                </Discount>
                                {course.actual_coins > course.coins ? (
                                    <ActualPrice>
                                        ₹{" "}
                                        {numberWithCommas(
                                            course.actual_coins *
                                                course.coin_value
                                        )}
                                    </ActualPrice>
                                ) : (
                                    <></>
                                )}
                            </CoursePrice>
                        )}
                        {!course.is_purchased ? (
                            <TextCont
                                status={"buynow"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (auth.isAuthenticated()) {
                                        history.push({
                                            pathname: location.pathname,
                                            search: `?action=buy-course&c=${course.slug}`,
                                        });
                                    } else {
                                        history.push({
                                            pathname: location.pathname,
                                            search: `?action=login&next=/prime-programs/courses/`,
                                        });
                                    }
                                }}
                            >
                                Buy Now
                            </TextCont>
                        ) : (
                            <>
                                {course.certificate_id ? (
                                    <CertificateButton
                                        to={`/certificate/?id=${course.certificate_id}`}
                                    >
                                        <ButtonText>Certificate</ButtonText>
                                        <DownloadIcon
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/04-08-2021/green-download.svg
                                        "
                                            alt="Download"
                                        />
                                    </CertificateButton>
                                ) : (
                                    <div></div>
                                )}
                                <TextCont
                                    status={"continue"}
                                    to={
                                        course.is_purchased
                                            ? `/prime-programs/${course.slug}/${
                                                  course.current_topic
                                                      ? course.current_topic
                                                      : course.first_topic
                                              }/`
                                            : `/prime-programs/${course.slug}/info/`
                                    }
                                >
                                    Continue
                                </TextCont>
                            </>
                        )}
                    </CardBottom>
                </StudCard>
            )}
        </>
    );
};

export default PrimeProgramsCard;

const StudCard = styled(Link)`
    position: relative;
    padding: 20px;
    background: #f9f9fb;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation: fade 300ms ease-in-out 0ms;
    @keyframes fade {
        0% {
            opacity: 0;
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    &:hover {
        opacity: 1 !important;
    }
`;
const StartNowCard = styled.div`
    position: relative;
    padding: 20px;
    background: #f9f9fb;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation: fade 300ms ease-in-out 0ms;
    @keyframes fade {
        0% {
            opacity: 0;
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    &:hover {
        opacity: 1 !important;
    }
`;
const CardTop = styled.div`
    display: flex;
    justify-content: space-between;
`;
const CardImage = styled.img`
    display: block;
    width: 100%;
`;
const Badge = styled.img`
    position: absolute;
    left: -21px;
    top: -3px;
    /* box-shadow: 0px 8px 26px #0000001f; */
`;
const Offer = styled.span`
    position: absolute;
    left: 33px;
    top: 37px;
    color: #51a471;
    font-size: 14px;
    font-family: "gordita_medium";
`;
const CardMiddle = styled.div``;
const Course = styled.h4`
    cursor: pointer;
    font-size: 15px;
    margin: 10px 0 11px 0;
    font-family: "gordita_medium";
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -ms-box-orient: vertical;
    box-orient: vertical;
    -webkit-line-clamp: 2;
    -moz-line-clamp: 2;
    -ms-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    @media (max-width: 640px) {
        font-size: 18px;
    }
    @media (max-width: 480px) {
        font-size: 15px;
    }
`;
const DivBtm = styled.p`
    width: 100%;
    height: 65px;
    line-height: 22px;
    font-size: 13px;
    font-family: "gordita_regular";
    color: #737070ad;
    margin: 10px 0 10px 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -ms-box-orient: vertical;
    box-orient: vertical;
    -webkit-line-clamp: 3;
    -moz-line-clamp: 3;
    -ms-line-clamp: 3;
    line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
`;
const LessonInfo = styled.div`
    display: flex;
    align-items: center;
    @media (max-width: 340px) {
        flex-direction: column;
    }
`;
const LessonCont = styled.div`
    display: flex;
    align-items: center;
    margin-right: 10px;
    @media (max-width: 340px) {
        width: 100%;
        margin-right: 0;
    }
`;
const LessonIcon = styled.span`
    font-size: 19px;
`;
const LessonText = styled.p`
    font-size: 13px;
    margin-left: 3px;
    font-family: "gordita_medium";
    color: #505050;
`;
const TimeCont = styled.div`
    margin-left: 5px;
    display: flex;
    @media (max-width: 340px) {
        width: 100%;
    }
`;
const TimeIcon = styled.span`
    font-size: 19px;
`;
const TimeText = styled.p`
    font-size: 13px;
    margin-left: 5px;
    font-family: "gordita_medium";
    color: #505050;
    align-self: flex-end;
`;
const Discount = styled.span`
    font-size: 18px;
    font-family: "gordita_medium";
    margin-right: 6px;
    @media (max-width: 480px) {
        font-size: 16px;
    }
    @media (max-width: 330px) {
        margin-right: 0;
    }
`;
const ActualPrice = styled.span`
    font-size: 13px;
    font-family: "gordita_regular";
    text-decoration: line-through;
    line-height: 0.9;
`;
const CardBottom = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
`;
const CoursePrice = styled.div`
    font-size: 13px;
    align-items: center;
    display: flex;
    @media (max-width: 330px) {
        flex-direction: column;
    }
`;
const TextCont = styled(Link)`
    background-color: #0fa76f;
    font-family: "gordita_medium";
    cursor: pointer;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    @media (max-width: 640px) {
        font-size: 16px;
        height: 37px;
        width: 122px;
    }
    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
const CertificateButton = styled(Link)`
    border: 1px solid #0fa76f;
    font-family: "gordita_medium";
    cursor: pointer;
    border-radius: 5px;
    color: #0fa76f;
    font-size: 16px;
    height: 45px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 640px) {
        font-size: 16px;
        height: 37px;
        /* width: 122px; */
    }
`;
const ButtonText = styled.span`
    margin-right: 5px;
`;
const DownloadIcon = styled.img`
    display: block;
`;

const StartNow = styled.span`
    background-color: #0fa76f;
    font-family: "gordita_medium";
    cursor: pointer;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    cursor: pointer;
    @media (max-width: 640px) {
        font-size: 16px;
        height: 37px;
        /* width: 122px; */
    }
    @media (max-width: 480px) {
        font-size: 14px;
    }
`;

const ButtonContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
`;
