import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import PlaceHolder from "../../../general/PlaceHolder";
import { numberWithCommas, secondsTohm } from "../../../helpers/functions";
import auth from "../../../routing/auth";
import { useAuthStore } from "../../../../store/authStore";
import { serverConfig } from "../../../../axiosConfig";
import Lottie from "react-lottie";
import loader from "../../../../assets/lotties/prime-progrmmes/voucherLoader.json";

const PrimeProgramsCard = ({ course }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isStartNowLoading, setStartNowLoading] = useState(false);
    const { user_data } = useAuthStore();

    function onLoad() {
        setIsLoading(false);
    }

    function StartCourse() {
        const access_token = user_data.access_token;
        setStartNowLoading(true);
        serverConfig
            .get(`learning/start-course/${course.id}/`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((response) => {
                const { status_code, data } = response.data;
                if (status_code === 6000) {
                    navigate(`/prime-programs/${course.slug}/${course.first_topic}/`);
                    setStartNowLoading(false);
                } else if (status_code === 6001) {
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
        <Card>
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
            <CardBottom>
                <CardTitle>{course.name}</CardTitle>
                <CardSubTitle>{course.description}</CardSubTitle>
                <CardFooter>
                    <CardFooterLeft>
                        <CardFooterItem>
                            <CardFooterIcon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/clock.svg"
                                alt="Icon"
                            />
                            <CardFooterText>
                                {secondsTohm(course.duration)}
                            </CardFooterText>
                        </CardFooterItem>
                        <CardFooterItem>
                            <CardFooterIcon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/lessons.svg"
                                alt="Icon"
                            />
                            <CardFooterText>
                                {course.total_lessons} Lessons
                            </CardFooterText>
                        </CardFooterItem>
                    </CardFooterLeft>
                    <CardFooterRight>
                        <CardFooterItem>
                            <CardFooterIcon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/students.svg"
                                alt="Icon"
                            />
                            <CardFooterText>
                                {numberWithCommas(course.total_students)} Students
                            </CardFooterText>
                        </CardFooterItem>
                    </CardFooterRight>
                </CardFooter>
                {auth.isAuthenticated() ? (
                    course.is_purchased ? (
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
                            <StudCardText>Continue Learning</StudCardText>
                        </StudCard>
                    ) : (
                        <StudCard
                            to={`/prime-programs/${course.slug}/info/?action=buy-course&c=${course.id}`}
                        >
                            <StudCardText>Start Now</StudCardText>
                        </StudCard>
                    )
                ) : (
                    <StudCard
                        to={`/prime-programs/${course.slug}/info/?action=login`}
                    >
                        <StudCardText>Start Now</StudCardText>
                    </StudCard>
                )}
            </CardBottom>
        </Card>
    );
};

export default PrimeProgramsCard;

const Card = styled.div`
    position: relative;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CardTop = styled.div`
    position: relative;
    width: 100%;
    padding-top: 55.34%;
`;

const CardImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Badge = styled.img`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 80px;
`;

const CardBottom = styled.div`
    padding: 20px;
`;

const CardTitle = styled.h4`
    font-size: 18px;
    margin-bottom: 10px;
    font-family: "gordita_medium";
`;

const CardSubTitle = styled.p`
    font-size: 14px;
    color: #585858;
    margin-bottom: 20px;
`;

const CardFooter = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const CardFooterLeft = styled.div`
    display: flex;
    align-items: center;
`;

const CardFooterRight = styled.div`
    display: flex;
    align-items: center;
`;

const CardFooterItem = styled.div`
    display: flex;
    align-items: center;
    margin-right: 15px;
`;

const CardFooterIcon = styled.img`
    width: 16px;
    margin-right: 5px;
`;

const CardFooterText = styled.p`
    font-size: 12px;
    color: #585858;
`;

const StudCard = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #15bf81;
    height: 40px;
    border-radius: 5px;
    text-decoration: none;
`;

const StudCardText = styled.span`
    font-size: 16px;
    color: #fff;
    font-family: "gordita_medium";
`;
