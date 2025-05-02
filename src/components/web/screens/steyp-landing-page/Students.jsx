import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Students = ({ setFormModal }) => {
    return (
        <Container className="wrapper">
            <ContentTop>
                <Title>
                    <span>40%</span> of students from
                    <br /> a classroom opts for Engineering
                </Title>
                <Description>
                    A large number of students opts for Engineering because of
                    various reasons. Some students opt it out of passion while
                    some out of peer pressure. A majority of Engineering
                    graduated do not land a core job, because they are not meant
                    to become Engineers, but they might become a good artist, a
                    doctor, a teacher, a dancer, etc. The fact remains is,
                    everyone are not meant for Engineering.
                </Description>
                <Description>
                    Here is where Steyp comes in, to check the eligibility of
                    students, that whether a student is fit for Engineering or
                    not.
                </Description>
                <Button
                    to="/tech-schooling/apply/"
                    // onClick={() => setFormModal(true)}
                >
                    Apply for SAT
                    <span>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/right-side.svg"
                            alt=""
                        />
                    </span>
                </Button>
            </ContentTop>
            <RightSection>
                <img
                    src={
                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/side-image.png"
                    }
                    alt="Image"
                />
            </RightSection>
        </Container>
    );
};

export default Students;

const Container = styled.div`
    padding: 90px 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    @media all and (max-width: 980px) {
        display: flex;
        flex-wrap: wrap;
        grid-gap: 55px;
    }
    @media all and (max-width: 768px) {
        padding: 80px 0;
    }
    @media all and (max-width: 640px) {
        padding: 60px 0;
    }
    @media all and (max-width: 480px) {
        width: 92% !important;
        grid-gap: 45px;
    }
`;

const ContentTop = styled.div``;
const Title = styled.h1`
    color: #212121;
    font-family: gordita_medium;
    position: relative;
    font-size: 34px;

    br {
        @media all and (max-width: 768px) {
            display: none;
        }
    }
    span {
        font-family: gordita_medium;
        color: #0fa76f;
    }

    @media all and (max-width: 1280px) {
        font-size: 30px;
        max-width: 92%;
    }
    @media all and (max-width: 1080px) {
        width: unset;
        max-width: unset;
    }
    @media all and (max-width: 980px) {
        font-size: 38px;
    }
    @media all and (max-width: 768px) {
        font-size: 28px;
    }
    @media all and (max-width: 640px) {
        font-size: 26px;
        margin-top: 0px;
    }
    @media all and (max-width: 480px) {
        font-size: 22px;
    }
`;
const Description = styled.p`
    width: 79%;
    margin: 10px 0 30px;
    position: relative;

    @media all and (max-width: 980px) {
        font-size: 18px;
    }
    @media all and (max-width: 768px) {
        font-size: 16px;
        margin: 10px 0 20px;
        max-width: 80%;
    }
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
        margin: 15px 0;
        max-width: 100%;
        width: 100%;
    }
    @media all and (max-width: 360px) {
        font-size: 13px;
    }
`;
const Button = styled(Link)`
    cursor: pointer;
    width: 200px;
    padding: 15px 14px;
    background: transparent linear-gradient(100deg, #0fa76f 0%, #0f9ea7 100%) 0%
        0% no-repeat padding-box;
    font-size: 15px;
    color: #ffffff;
    font-family: gordita_medium;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    transition: all 0.4s ease;
    span {
        width: 0;
        display: block;
        transition: all 0.4s ease;
        img {
            display: block;
            width: 100%;
            transition: all 0.4s ease;
        }
    }
    &:hover {
        width: 220px;
        span {
            width: 18px;
            margin-left: 10px;
        }
    }

    @media all and (max-width: 980px) {
        height: 50px;
        width: 250px;
    }

    @media all and (max-width: 640px) {
        height: 40px;
        width: 200px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
        position: relative;
        z-index: 5;
    }
`;

const RightSection = styled.div`
    & img {
        width: 100%;
        display: block;
    }
`;
