import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Introduction = ({ setFormModal }) => {
    const techPlatform = [
        {
            id: 1,
            type: "Tech Schooling",
            name: "School Students",
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/club.svg",
            link: "/techies-club/",
        },
        {
            id: 1,
            type: "Tech Degree",
            name: "College Students ",
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/hub.svg",
            link: "/techies-hub/",
        },
        {
            id: 1,
            type: " Tech Grad",
            name: " Graduates",
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/degree.svg",
            link: "/tech-degree/",
        },
    ];
    return (
        <Container className="wrapper" data-aos="fade-up" data-aos-once="true">
            <Title>
                <span>Steyp's</span> Engineering program is designed for{" "}
                <br className="break" /> School students, College students and
                Graduates
            </Title>
            <IconSection>
                {techPlatform.map((data) => (
                    <>
                        <Card key={data.id}>
                            <Icon>
                                <img src={data.icon} alt="Icon" />
                            </Icon>
                            <CardTitle>{data.name}</CardTitle>
                            <CardLabel>
                                <span>{data.type}</span>
                            </CardLabel>
                            <Button
                                to="/tech-schooling/apply/"
                                className="button"
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
                        </Card>
                        <Border></Border>
                    </>
                ))}
            </IconSection>
        </Container>
    );
};

export default Introduction;

const Container = styled.div`
    padding: 140px 0 150px !important;
    @media all and (max-width: 768px) {
        padding: 130px 0 !important;
    }
    @media all and (max-width: 768px) {
        padding: 100px 0 !important;
    }
    @media all and (max-width: 480px) {
        padding: 60px 0 30px !important;
    }
    @media all and (max-width: 360px) {
        /* padding: 60px 0 !important; */
    }
`;
const Title = styled.h2`
    font-family: gordita_medium;
    position: relative;
    font-size: 34px;
    margin-bottom: 30px;
    color: #2d2d2d;
    text-align: center;
    /* max-width: 750px; */
    span {
        font-family: gordita_medium;
        color: #57c289;
        font-size: 40px;
        position: relative;
        &::before {
            content: "";
            position: absolute;
            top: -80px;
            left: -100px;
            width: 300px;
            height: 300px;
            background-size: contain;
            display: block;
            z-index: -1;
        }
    }
    small {
        border-bottom: 4px solid #57c289;
        font-size: 34px;
    }
    @media all and (max-width: 1110px) {
        margin-bottom: 20px;
        font-size: 32px;
        span {
            color: #57c289;
            font-size: 36px;
        }
        small {
            border-bottom: 3px solid #57c289;
            font-size: 32px;
        }
    }
    @media all and (max-width: 768px) {
        font-size: 30px;
        .break {
            display: none !important;
        }
        span {
            color: #57c289;
            font-size: 32px;
        }
        small {
            border-bottom: 3px solid #57c289;
            font-size: 30px;
        }
    }

    @media all and (max-width: 640px) {
        font-size: 26px;

        span {
            color: #57c289;
            font-size: 28px;
            &::before {
                content: "";
                position: absolute;
                top: -50px;
                left: -100px;
                width: 250px;
                height: 250px;
                background: url("https:s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/color.png")
                    no-repeat;
                background-size: contain;
                display: block;
                z-index: -1;
            }
        }
        small {
            border-bottom: 3px solid #57c289;
            font-size: 26px;
        }
    }
    @media all and (max-width: 480px) {
        font-size: 24px;

        span {
            color: #57c289;
            font-size: 26px;
        }
        small {
            border-bottom: 3px solid #57c289;
            font-size: 24px;
        }
    }
    @media all and (max-width: 360px) {
        font-size: 22px;
        margin-bottom: 15px;

        span {
            color: #57c289;
            font-size: 24px;
        }
        small {
            border-bottom: 3px solid #57c289;
            font-size: 22px;
        }
    }
`;
const Description = styled.p`
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 60px;
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
        margin-bottom: 45px;
    }
    @media all and (max-width: 360px) {
        font-size: 13px;
        margin-bottom: 40px;
    }
`;
const IconSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    @media all and (max-width: 768px) {
        flex-direction: column;
    }
`;
const Card = styled.div`
    display: block;
    width: 300px;
    padding: 25px 0;
    /* cursor: pointer; */
    background-color: #fff;
    min-width: 200px;
    border: 2px solid #e9e9e9;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.4s ease;
    &:hover {
        border: 2px solid #57c289;
        position: relative;
        transition: all 0.4s ease;
        & a.button {
            height: 40px;
            opacity: 1;
        }
    }

    @media all and (max-width: 480px) {
        width: 90%;
    }
`;
const Icon = styled.span`
    display: block;
    width: 70px;
    margin: 0 auto;
    margin-bottom: 20px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 768px) {
        width: 50px;
    }
    @media all and (max-width: 640px) {
        width: 60px;
    }
    @media all and (max-width: 480px) {
        width: 50px;
    }
`;
const CardTitle = styled.h3`
    color: #545454;
    font-family: gordita_medium;
    font-size: 18px;
    @media all and (max-width: 768px) {
        font-size: 16px;
    }
    @media all and (max-width: 640px) {
        font-size: 18px;
    }
    @media all and (max-width: 480px) {
        font-size: 15px;
    }
`;
const CardLabel = styled.p`
    color: #545454;
    font-family: gordita_medium;
    font-size: 14px;
    margin-bottom: 10px;
    span {
        color: #57c289;
        font-family: gordita_bold;
    }
    @media all and (max-width: 768px) {
        font-size: 12px;
    }
    @media all and (max-width: 480px) {
        font-size: 13px;
    }
`;
const Button = styled(Link)`
    /* margin: 20px auto 0px;
	cursor: pointer;
	width: 160px;
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
    transform: scaleX(0);
    height: 0;
	transition: all 0.4s ease; */

    width: 160px;
    height: 0px;
    opacity: 0;
    background: transparent linear-gradient(100deg, #0fa76f 0%, #0f9ea7 100%) 0%
        0% no-repeat padding-box;
    color: #ffffff;
    font-family: gordita_medium;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-size: 12px;
    padding-top: 4px;
    border-radius: 5px;
    transition: all 0.3s ease 0s;
    cursor: pointer;

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
        height: 40px;
        opacity: 1;
        span {
            width: 18px;
            margin-left: 10px;
        }
    }

    @media all and (max-width: 980px) {
    }
    @media all and (max-width: 768px) {
    }
    @media all and (max-width: 640px) {
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
        position: relative;
        z-index: 5;
    }
`;
const Border = styled.span`
    width: 50px;
    height: 2px;
    display: block;
    border-bottom: 2px dashed #57c289;
    &:last-child {
        display: none;
    }
    @media all and (max-width: 768px) {
        width: 2px;
        height: 50px;
        border-bottom: none;
        border-left: 2px dashed #57c289;
    }
    @media all and (max-width: 360px) {
        height: 30px;
    }
`;
