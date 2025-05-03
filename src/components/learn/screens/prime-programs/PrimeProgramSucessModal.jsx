import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import successData from "../../../../assets/lotties/modal/successtick.json";
import failedData from "../../../../assets/lotties/modal/failed.json";
import queryString from "query-string";

function PrimeProgramSucessModal({ topicId }) {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: successData,

        rendererSettings: {},
    };
    const failedOptions = {
        loop: false,
        autoplay: true,
        animationData: failedData,

        rendererSettings: {},
    };
    const location = useLocation();
    const navigate = useNavigate();
    const { course_id } = useParams();

    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const [topic, setTopic] = useState("");
    const [plan, setPlan] = useState("");
    const [course, setCourse] = useState("");

    const closeModal = () => {
        setStatus("");
        setType("");
        setTopic("");
        setPlan("");
        navigate({
            pathname: location.pathname,
        });
    };

    useEffect(() => {
        let { search } = location;

        const values = queryString.parse(search);
        const status = values.status;
        const type = values.type;
        const topic = values.topic;
        const plan = values.plan;
        const course = values.course;

        setStatus(status);
        setType(type);
        setTopic(topic);
        setPlan(plan);
        setCourse(course);
    }, [location.search]);

    return (
        <>
            <Overlay
                style={{
                    display:
                        (status === "success" && type === "c") ||
                        (status === "success" && type === "p")
                            ? "block"
                            : status === "failed" && type === "p"
                            ? "block"
                            : null,
                }}
            ></Overlay>
            <BackContainer
                style={{
                    transform:
                        (status === "success" && type === "c") ||
                        (status === "success" && type === "p")
                            ? "scale(1,1)"
                            : status === "failed" && type === "p"
                            ? "scale(1,1)"
                            : null,
                }}
            >
                {status === "success" ? (
                    <Container>
                        <Circle>
                            <LottieContainer>
                                <Lottie
                                    options={defaultOptions}
                                    height={120}
                                    width="90%"
                                />
                            </LottieContainer>
                        </Circle>
                        <Title>Success</Title>
                        <Text>
                            {type === "p"
                                ? "Your subscription has been successfully done. Start accessing you courses."
                                : type === "c"
                                ? "Your course has been successfully purchased, Now you can access your course"
                                : null}
                        </Text>
                        <Button
                            to={
                                type === "p"
                                    ? `/prime-programs/courses/`
                                    : type == "c"
                                    ? `/prime-programs/${course}/${topic}/`
                                    : `/prime-programs/courses/`
                            }
                        >
                            Continue
                        </Button>
                    </Container>
                ) : status === "failed" ? (
                    <Container>
                        <Circle>
                            <LottieContainer>
                                <Lottie
                                    options={failedOptions}
                                    height={120}
                                    width="90%"
                                />
                            </LottieContainer>
                        </Circle>
                        <Title>Sorry!</Title>
                        <Text>
                            {type === "p"
                                ? "Your Subscription has been Failed, Please try again "
                                : type === "c"
                                ? "Your course has been has been Failed, Please try again "
                                : null}
                        </Text>
                        <Button
                            style={{
                                backgroundColor: "red",
                                borderColor: "red",
                            }}
                            to={
                                type === "p"
                                    ? `/prime-programs/courses/?action=subscribe-prime-programs`
                                    : type === "c"
                                    ? `/prime-programs/courses/?action=buy-course&c=${plan}`
                                    : null
                            }
                        >
                            Continue
                        </Button>
                    </Container>
                ) : null}
            </BackContainer>
        </>
    );
}

export default PrimeProgramSucessModal;
const BackContainer = styled.div`
    position: fixed;
    transform: scale(0, 0);
    transition: 0.3s;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    left: 0;
    top: 0px;
`;
const Overlay = styled.div`
    position: fixed;
    left: 0;
    top: 0px;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    z-index: 999;
    display: none;
`;
const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    transform: translate(-50%, -50%);
    text-align: center;
    background-color: rgb(255, 255, 255);
    padding: 55px 40px 40px;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 5px;
    z-index: 1000;

    transition: all 0.3s ease 0s;
    @media (max-width: 560px) {
        width: 400px;
    }
    @media (max-width: 440px) {
        width: 370px;
        padding: 55px 25px 30px;
    }
    @media (max-width: 385px) {
        width: 340px;
    }
    @media (max-width: 385px) {
        width: 300px;
    }
`;
const LottieContainer = styled.div`
    width: 130px;
    height: 130px;
    position: absolute;
    top: 1px;
    left: 39px;
    transform: translate(-45px, -3px);
    margin: 0px auto;
    @media (max-width: 560px) {
        transform: translate(-45px, -8px);
        width: 120px;
        height: 120px;
    }
    @media (max-width: 440px) {
        transform: translate(-44px, -18px);
        width: 100px;
        height: 100px;
    }
    @media (max-width: 385px) {
        transform: translate(-44px, -23px);
        width: 90px;
    }
`;
const Title = styled.h4`
    font-size: 26px;
    margin-bottom: 10px;
    font-family: "gordita_medium";
    @media (max-width: 768px) {
        font-size: 22px;
    }
`;
const Text = styled.p`
    font-size: 16px;
    color: #000;
    margin-bottom: 20px;
    font-family: "gordita_medium";
`;
const Button = styled(Link)`
    background-color: ${(props) =>
        props.type === "failed" ? "#fff" : "#15bf81"};
    height: 45px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    font-family: "gordita_medium";
    border: 1px solid
        ${(props) => (props.type === "failed" ? "#f9003a" : "#15bf81")};
    color: ${(props) => (props.type === "failed" ? "#f9003a" : "white")};
`;
const Circle = styled.div`
    background-color: #fff;
    padding: 10px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    position: absolute;
    top: -70px;
    left: 150px;
    transform: translate(40px, 0);
    border: 1px solid rgb(250, 250, 250);
    @media (max-width: 560px) {
        transform: translate(-10px, 0);
        width: 110px;
        height: 110px;
    }
    @media (max-width: 440px) {
        width: 90px;
        height: 90px;
        top: -40px;
    }
    @media (max-width: 385px) {
        width: 80px;
        height: 80px;
        top: -40px;
        transform: translate(-40px, -6px);
    }
`;
const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 60px;
    @media (max-width: 560px) {
        padding: 0 20px;
    }
    @media (max-width: 440px) {
        padding: 0 40px;
    }
    @media (max-width: 385px) {
        padding: 0 10px;
    }
`;
