import React, { useState } from "react";
import styled from "styled-components";
import useUserStore from "../../../../store/authStore";
import { serverConfig } from "../../../../axiosConfig";
import { useNavigate } from "react-router-dom";
import loader from "../../../../assets/lotties/modal/buttonloader.json";
import Lottie from "react-lottie";

const StartNowModal = ({ topicId, setTopicId, isStartNowModal, setStartNowModal }) => {
    const { user_data } = useAuthStore();
    const [isButtonLoading, setButtonLoading] = useState(false);
    const navigate = useNavigate();

    const lottieDefaultOptions = {
        loop: false,
        autoplay: true,
        animationData: loader,
        rendererSettings: {},
    };

    const startCourse = async () => {
        setButtonLoading(true);
        const { access_token } = user_data;
        await serverConfig
            .post(
                `learning/start-course/${topicId}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            )
            .then((response) => {
                const { data } = response.data;
                setButtonLoading(false);
                setStartNowModal(false);
                navigate(`/learn/prime-programs/topic/${data.id}`);
            })
            .catch((err) => {
                console.log(err);
                setButtonLoading(false);
            });
    };

    return (
        <>
            <Overlay
                show={isStartNowModal}
                onClick={() => setStartNowModal(false)}
            />
            <ModalContainer show={isStartNowModal}>
                <Container>
                    <CloseButton onClick={() => setStartNowModal(false)}>
                        <CloseIcon
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/close.png"
                            alt="Arrow"
                        />
                    </CloseButton>
                    <Bg>
                        <BgImage
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/modalbg.svg"
                            alt="Image"
                        />
                    </Bg>
                    <Title>Start Course</Title>
                    <Button
                        onClick={startCourse}
                        disabled={isButtonLoading}
                    >
                        {!isButtonLoading ? (
                            "Start Now"
                        ) : (
                            <Lottie
                                options={lottieDefaultOptions}
                                height={45}
                                width={45}
                            />
                        )}
                    </Button>
                </Container>
            </ModalContainer>
        </>
    );
};

export default StartNowModal;

const Overlay = styled.div`
    position: fixed;
    left: 0;
    top: 0px;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    display: ${(props) => (props.show ? "block" : "none")};
`;

const ModalContainer = styled.div`
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
    transition: 0.3s;
    display: ${(props) => (props.show ? "block" : "none")};
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

const Container = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
`;

const CloseIcon = styled.img`
    width: 20px;
`;

const Bg = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const BgImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Title = styled.h4`
    font-size: 26px;
    margin-bottom: 10px;
    font-family: "gordita_medium";
    @media (max-width: 768px) {
        font-size: 22px;
    }
`;

const Button = styled.button`
    background-color: #15bf81;
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    font-family: "gordita_medium";
    color: #fff;
    border: none;
`;
