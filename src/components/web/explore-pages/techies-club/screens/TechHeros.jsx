import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WatchStoriesStudentsCard from "../includes/WatchStoriesStudentsCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import VideoModal from "../../general/VideoModal";
import { serverConfig } from "../../../../../axiosConfig";
import axios from "axios";

const TechHeros = ({ type }) => {
    const [videoData, setVideoData] = useState({});
    const [isModal, setModal] = useState(false);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchPlans = () => {
            serverConfig
                .get("testimonials/techies-club/")
                .then((response) => {
                    let { status_code, data } = response.data;
                    if (status_code === 6000) {
                        setStudents(data);
                    }
                });
        };
        fetchPlans();
    }, []);

    return (
        <Container className="wrapper">
            <VideoModal
                isModal={isModal}
                setModal={setModal}
                videoUrl={videoData.video_url}
                videoThumnail={videoData.video_thumbnail}
            />
            <TriColor type={type}>
                <img src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/background-image.svg" />
            </TriColor>
            <Title type={type}>
                <span>ഞങ്ങൾ</span>
                <br />
                <small>Tech</small> ഹീറോസ്
            </Title>
            {type === "vacation" ? (
                <Content>
                    {" "}
                    <small>Steyp-</small>ലൂടെ ടെക്ക്നോളജിയിൽ നേട്ടം കൈവരിച്ച
                    ഞങ്ങളുടെ കുട്ടി എഞ്ചിനീയേഴ്സിന് പറയാനുള്ളത്.
                </Content>
            ) : (
                <Content>
                    {" "}
                    ടെക്കീസ് ക്ലബിലൂടെ ടെക്ക്നോളജിയിൽ നേട്ടം കൈവരിച്ച ഞങ്ങളുടെ
                    കുട്ടി എഞ്ചിനീയേഴ്സിന് പറയാനുള്ളത്.
                </Content>
            )}
            <StudentsContainer>
                {students.map((data) => (
                    <StudentCardCover key={data.id}>
                        <WatchStoriesStudentsCard
                            data={data}
                            setModal={setModal}
                            setVideoData={setVideoData}
                        />
                    </StudentCardCover>
                ))}
                {type === "vacation" ? (
                    <CircleShape>
                        <img
                            src={require("../../../../../assets/images/vacation/circle.svg")}
                            alt=""
                        />
                    </CircleShape>
                ) : (
                    <Ellipise>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/light-blue-ellipise.svg"
                            alt=""
                        />
                    </Ellipise>
                )}
            </StudentsContainer>
        </Container>
    );
};

export default TechHeros;

const Container = styled.div`
    padding: 100px 8%;
    position: relative;

    @media all and (max-width: 1280px) {
        padding: 80px 8%;
    }
    @media all and (max-width: 1100px) {
        padding: 70px 8%;
    }
    @media all and (max-width: 768px) {
        padding: 60px 5%;
    }
    @media all and (max-width: 640px) {
        padding: 60px 0;
    }
`;

const Title = styled.h2`
    color: #2d2d2d;
    text-align: center;
    margin-bottom: 20px;
    font-size: 38px;
    font-family: "EGGIndulekhaUni";
    span {
        color: ${(props) =>
            props.type === "vacation" ? "#2334a7" : "#0fa76f"};
    }
    small {
        font-family: gordita_bold;
    }
    @media all and (max-width: 640px) {
        margin-bottom: 15px;
        font-size: 34px;
        small {
            font-size: 32px;
        }
    }
    @media all and (max-width: 480px) {
        margin-bottom: 10px;
        font-size: 32px;
        small {
            font-size: 30px;
        }
    }
    @media all and (max-width: 360px) {
        margin-bottom: 10px;
        font-size: 30px;
        small {
            font-size: 28px;
        }
    }
`;
const Content = styled.p`
    font-family: "Indulekha_regular" !important;
    margin: 0 auto;
    margin-bottom: 60px;
    font-size: 18px;
    text-align: center;
    width: 70%;
    max-width: 600px;
    small {
        font-family: gordita_regular !important;
    }
    @media all and (max-width: 1280px) {
        margin-bottom: 50px;
    }
    @media all and (max-width: 1100px) {
        font-size: 16px;
    }
    @media all and (max-width: 980px) {
        width: 85%;
    }
    @media all and (max-width: 640px) {
        width: 100%;
        margin-bottom: 40px;
        font-size: 15px;
    }
    @media all and (max-width: 360px) {
        width: 100%;
        margin-bottom: 30px;
        font-size: 14px;
    }
`;

const StudentsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 0 -10px;
    flex-wrap: wrap;
    position: relative;

    @media all and (max-width: 480px) {
        /* display: none; */
        margin: 0 -5px;
    }
`;

const StudentCardCover = styled.div`
    width: calc(25% - 20px);
    margin: 0 10px;
    margin-bottom: 20px;
    border-radius: 10px;
    overflow: hidden;
    @media all and (max-width: 1100px) {
        width: calc(33% - 20px);
    }
    @media all and (max-width: 768px) {
        width: calc(50% - 20px);
    }

    @media all and (max-width: 480px) {
        width: calc(50% - 10px);
        margin: 0 5px;
        margin-bottom: 10px;
    }
`;
const CircleShape = styled.span`
    display: block;
    width: 190px;
    position: absolute;
    right: -50px;
    bottom: -50px;
    z-index: -1;

    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 1100px) {
        right: 65px;
    }
    @media all and (max-width: 768px) {
        display: none !important;
    }
`;
const Ellipise = styled.span`
    display: block;
    width: 300px;
    position: absolute;
    right: -50px;
    bottom: -50px;
    z-index: -1;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 1280px) {
        width: 240px;
    }
    @media all and (max-width: 768px) {
        display: none !important;
    }
`;
const TriColor = styled.span`
    display: ${(props) => (props.type === "vacation" ? "none" : "block")};
    width: 250px;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: -1;
    opacity: 0.2;
    img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 1280px) {
        width: 210px;
    }
    @media all and (max-width: 1100px) {
        width: 160px;
    }
    @media all and (max-width: 980px) {
        width: 120px;
    }
    @media all and (max-width: 768px) {
        display: none;
    }
`;

const ResStudentsContainer = styled.div`
    display: none;
    @media all and (max-width: 480px) {
        /* display: block; */
    }
`;
