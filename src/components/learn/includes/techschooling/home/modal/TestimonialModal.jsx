import React, { useEffect } from "react";
import styled from "styled-components";
import quotes from "../../../../../../assets/images/web/test.svg";
import $ from "jquery";
const TestimonialModal = ({ isModal, handleModal, data }) => {
    useEffect(() => {
        if (isModal) {
            $("html").addClass("modal-enabled");
        } else {
            $("html").removeClass("modal-enabled");
        }
    }, [isModal]);

    return (
        <BackContainer style={{ transform: isModal && "scale(1,1)" }}>
            <Overlay onClick={handleModal}></Overlay>
            <Modal>
                <Cover>
                    <TopSection>
                        <ProfileImage>
                            <img src={data.photo} alt="" />
                        </ProfileImage>
                        <Name>{data.name}</Name>
                        {data.program_type === "techies_degree" && data.company_logo ? (
                            <Designation degree={true} className="single">
                                Placed @{" "}
                                <a href={data.company_link} target="_blank">
                                    <img src={data.company_logo} alt="" />
                                </a>
                            </Designation>
                        ) : (
                            <Designation margin={data.linkedin_profile} className="single">
                                {data.campus}
                            </Designation>
                        )}
                        {/* <Designation>{data.campus}</Designation> */}
                        {data.linkedin_profile ? (
                            <Linkedin href={data.linkedin_profile} target="_blank">
                                <LinkedinIcon>
                                    <img
                                        // src={require("../../../../../../assets/images/web/used/linkedin-white.svg")}
                                        src={require("../../../../../../assets/images/web/used/linkedin-white.svg")}
                                        alt=""
                                    />
                                </LinkedinIcon>
                                <p>Linkedin Profile</p>
                            </Linkedin>
                        ) : null}
                    </TopSection>
                    <Review>{data.message}</Review>
                </Cover>
                <Close onClick={handleModal}>
                    <img src={require("../../../../../../assets/images/web/close.svg")} alt="" />
                </Close>
                <BottomLine></BottomLine>
            </Modal>
        </BackContainer>
    );
};
export default TestimonialModal;

const BackContainer = styled.div`
    position: fixed;
    transition: 0.3s;
    transform: scale(0, 0);
    width: 100%;
    height: 100vh;
    z-index: 1000;
    left: 0;
    top: 0px;
    /* background: rgba(0, 0, 0, 0.2); */
    backdrop-filter: blur(4px);
`;
const Overlay = styled.div`
    position: fixed;
    left: 0;
    top: 0px;
    width: 100%;
    height: 100vh;
`;
const Modal = styled.div`
    width: 650px;
    max-height: 90vh;
    overflow: hidden;
    margin: 0 auto;
    background: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 40px;
    border-radius: 10px;
    transition: 0.5s;
    z-index: 101;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    @media all and (max-width: 980px) {
        width: 650px;
    }
    @media all and (max-width: 768px) {
        width: 600px;
    }
    @media all and (max-width: 640px) {
        width: 450px;
        padding: 30px;
    }
    @media all and (max-width: 480px) {
        width: 350px;
    }
    @media all and (max-width: 360px) {
        width: 320px;
    }
`;
const Cover = styled.div`
    padding-right: 10px;
    margin-right: -10px;
    overflow-y: scroll;
    max-height: calc(90vh - 100px);
    &::-webkit-scrollbar {
        width: 5px;
        margin-left: 10px;
        border: none;
    }
    &::-webkit-scrollbar-track {
        background: #fff;
    }
    &::-webkit-scrollbar-thumb {
        background: #4ba870;
        border-radius: 3px;
    }
`;
const TopSection = styled.div``;
const ProfileImage = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 10px;
    overflow: hidden;
    margin: 0 auto;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 980px) {
        width: 100px;
        height: 100px;
    }
`;
const Name = styled.h3`
    font-size: 20px;
    font-family: gordita_medium;
    margin-top: 20px;
    text-align: center;
    @media all and (max-width: 980px) {
        margin-top: 15px;
        font-size: 18px;
    }
    @media all and (max-width: 480px) {
        font-size: 16px;
    }
`;
const Designation = styled.p`
    text-align: center;
    font-size: 14px;
    /* margin-top: 20px; */
    font-family: gordita_medium;
    display: flex;
    justify-content: center;
    align-items: center;

    color: #777575;
    a {
        transform: translateY(-2px);
        display: inline-block;
        height: 20px;
        margin-left: 5px;
        img {
            display: block;
            height: 100%;
        }
    }
    @media all and (max-width: 980px) {
        font-size: 12px;
    }
    @media all and (max-width: 480px) {
        font-size: 11px;
    }
`;
const Linkedin = styled.a`
    display: flex;
    align-items: center;
    width: 160px;
    background-color: #2b7ebc;
    height: 35px;
    justify-content: center;
    border-radius: 3px;
    cursor: pointer;
    margin: 0 auto;
    margin-top: 20px;

    p {
        font-size: 12px;
        font-family: gordita_medium;
        color: #fff;

        display: flex;
        justify-content: flex-start;
        /* align-items: center; */
        /* line-height: 12px;*/
        transform: translateY(2px);
    }
    @media all and (max-width: 980px) {
        margin-top: 15px;
    }

    @media all and (max-width: 480px) {
        width: 150px;
        align-items: center;
        height: 30px;
        /* margin-bottom: 20px; */
        p {
            display: flex;
            /* transform: translateY(1px); */
        }
    }
`;
const LinkedinIcon = styled.span`
    display: flex;
    height: 20px;
    width: 25px;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #fff;
    padding-right: 6px;
    margin-right: 6px;
    img {
        display: block;
        width: 15px;
        transform: translateY(-3px);
    }

    @media all and (max-width: 480px) {
        border-right: 1px solid #fff;
        padding-right: 6px;
        margin-right: 6px;
        img {
            transform: translateY(-3px);
        }
    }
`;
const Review = styled.p`
    margin-top: 40px;
    font-size: 15px;
    text-align: center;
    position: relative;
    &::before {
        content: url(${quotes});
        position: absolute;
        left: 0;
        top: -18px;
        color: #2d2d2d;
        width: 10px;
        display: block;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
        margin-top: 30px;
        &::before {
            content: url(${quotes});
            position: absolute;
            left: 0;
            top: -18px;
            color: #2d2d2d;
            width: 7px;
            display: block;
        }
    }
`;
const BottomLine = styled.span`
    display: block;
    width: 100%;
    border-top: 5px solid #5ac78b;
    border-bottom: 5px solid #459e7b;
    position: absolute;
    bottom: 0;
    left: 0;
`;
const Close = styled.span`
    display: block;
    width: 15px;
    position: absolute;
    top: 40px;
    right: 40px;
    cursor: pointer;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 640px) {
        top: 30px;
        right: 30px;
    }
`;
