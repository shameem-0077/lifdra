import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { learnConfig, primeprogramsConfig } from "../../../../../axiosConfig";
import auth from "../../../../routing/auth";
import PrimeProgramCourseCard from "../includes/PrimeProgramCourseCard";

function OurCourse() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const user_profile = useSelector((state) => state.user_profile);

    useEffect(() => {
        function fetchData() {
            primeprogramsConfig
                .get("/learning/courses/")
                .then((res) => {
                    let { data, StatusCode } = res.data;
                    if (StatusCode === 6000) {
                        setCourses(data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        fetchData();
    }, []);

    return (
        <Container className="wrapper">
            <Title>
                <span>Our</span> Courses
            </Title>
            <Description>Here is the list of courses we offer</Description>
            <CourseContainer>
                {courses.map((data) => (
                    <PrimeProgramCourseCard data={data} />
                ))}
            </CourseContainer>
            {user_profile.length > 0 ? (
                user_profile.prime_program_subscription.is_subscription &&
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
                                navigate(`${location.pathname}?action=login`);
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
                            navigate(`${location.pathname}?action=login`);
                        }
                    }}
                >
                    Subscribe Now
                </SubscribeButton>
            )}
        </Container>
    );
}

export default OurCourse;
const Container = styled.div`
    padding: 100px 0;
    border-radius: 30px;
    @media all and (max-width: 768px) {
        padding: 80px 0;
    }
    @media all and (max-width: 640px) {
        padding: 70px 0;
    }
    @media all and (max-width: 360px) {
        padding: 50px 0;
    }
`;

const Title = styled.div`
    font-family: gordita_medium;
    font-size: 34px;
    margin-bottom: 10px;
    text-align: center;
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
`;

const Description = styled.p`
    max-width: 500px;
    margin-bottom: 30px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 50px;
    font-size: 16px;
    @media all and (max-width: 980px) {
        margin-bottom: 30px;
    }
    @media all and (max-width: 480px) {
        font-size: 15px;
    }
`;

const CourseContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    /* grid-template-columns: 1fr 1fr 1fr 1fr; */
    /* grid-gap: 20px; */
    margin-bottom: 30px;
    @media all and (max-width: 1100px) {
        /* grid-template-columns: 1fr 1fr 1fr; */
    }
    @media all and (max-width: 480px) {
        /* margin-bottom: 50px; */
    }
`;
const KnowMore = styled(Link)`
    display: block;
    width: 180px;
    height: 50px;
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    background-color: #4ca473;
    color: #fff;
    font-family: gordita_medium;
    border-radius: 5px;
    position: relative;
    border: 2px solid transparent;
    z-index: 1;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
        color: #4ca473;
        background-color: #fff;
        border: 2px solid #4ca473;
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
    margin: 0 auto;
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
