import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import enquireImage from "../../../assets/images/info-logo.svg";

export default function SatCampusModal({
    isCampusModal,
    setCampusModal,
    setFormModal,
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // useEffect(() => {
    //     setTimeout(() => {
    //         campusSearch();
    //     }, [300]);
    //     if (searchTerm.length === 0) setErrorMessage("");
    // }, [searchTerm]);

    // const campusSearch = () => {
    //     if (user_data && searchTerm) {
    //         setLoading(true);
    //         setError(false);
    //         yiaaiConfig
    //             .get(`campuses/list-campuses/?q=${searchTerm}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${access_token}`,
    //                 },
    //             })
    //             .then((response) => {
    //                 const { StatusCode, data } = response.data;
    //                 if (StatusCode === 6000) {
    //                     setErrorMessage("");
    //                     setSearchResults(data);
    //                     setLoading(false);
    //                     setError(false);
    //                     dispatch({
    //                         type: "UPDATE_CAMPUS",
    //                         payload: {
    //                             campus_id: data.id,
    //                             campus_name: data.campus,
    //                         },
    //                     });
    //                 } else if (StatusCode === 6001) {
    //                     setErrorMessage("Campus Not Found");
    //                     setLoading(false);
    //                     setError(true);
    //                 }
    //             })
    //             .catch((error) => {
    //                 setError(true);
    //                 setLoading(false);
    //             });
    //     }
    // };

    return (
        <>
            <Overlay className={isCampusModal ? "active" : ""}></Overlay>
            <Container className={isCampusModal ? "active" : ""}>
                <FormContainer>
                    <TopHead>
                        <H5>Join With Us</H5>
                        <Close
                            onClick={() => {
                                setCampusModal(false);
                            }}
                        >
                            <img
                                src={
                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/close.svg"
                                }
                                alt="Close"
                            />
                        </Close>
                    </TopHead>
                    <Bottom>
                        <BottomMiddle>
                            <Description for="school-code">
                                Enter your School Code
                            </Description>
                            <Input
                                type="text"
                                placeholder="Enter your school code"
                                id="school-code"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <EnquirerDiv>
                                <EnquireLogo>
                                    <img src={enquireImage} alt="Enquiry" />
                                </EnquireLogo>
                                <Enquire>
                                    Don't know your school code{" "}
                                    <EnquireLink to="/applicant-form/">
                                        Enquire Us
                                    </EnquireLink>
                                </Enquire>
                            </EnquirerDiv>
                            <Error></Error>
                        </BottomMiddle>

                        <ButtonConatiner>
                            <Submit
                                onClick={() => {
                                    setFormModal(true);
                                    setCampusModal(false);
                                }}
                            >
                                Next
                            </Submit>
                        </ButtonConatiner>
                    </Bottom>
                    <LightBanner></LightBanner>
                    <DarkBanner></DarkBanner>
                </FormContainer>
            </Container>
        </>
    );
}

const Container = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    /* transform: scale(0); */
    transition: ease-in-out 0.2s;

    &.active {
        /* transform: scale(1); */
        opacity: 1;
        visibility: visible;
    }
`;
const Overlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1000;
    display: none;
    backdrop-filter: blur(5px);
    background: rgba(0, 0, 0, 0.5);
    &.active {
        display: block;
    }
`;
const FormContainer = styled.div`
    position: fixed;
    z-index: 1001;
    transform: scale(0);
    width: 600px;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 8px;
    overflow: hidden;
    padding: 50px 55px 55px 50px;

    &.active {
        transform: scale(1);
    }
    @media all and (max-width: 640px) {
        width: 91%;
        padding: 31px 31px;
    }
    @media all and (max-width: 480px) {
        /* width: 91%; */
        padding: 31px 21px;
    }
`;
const TopHead = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    margin-bottom: 25px;
    border-bottom: 2px solid #dfdfdf;
`;
const H5 = styled.h5`
    font-size: 21px;
    font-family: gordita_medium;
    @media all and (max-width: 480px) {
        font-size: 17px;
    }
`;
const Close = styled.div`
    cursor: pointer;
    width: 25px;
    height: 25px;
    img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 480px) {
        width: 17px;
        height: 17px;
    }
`;
const Bottom = styled.div``;
const Input = styled.input`
    width: 100%;
    border: 2px solid #0fa679;
    border-radius: 8px !important;
    font-size: 16px;
    padding: 15px;
    margin-bottom: 15px;
    color: #1c1c1c;
    font-family: gordita_regular;
    background: #fff;
    margin-top: 5px;
    @media all and (max-width: 480px) {
        font-size: 14px;
        padding: 8px 13px;
    }
`;
const BottomMiddle = styled.div`
    margin-bottom: 25px;
`;
const Description = styled.label`
    color: #6c6c6c;
    font-size: 14px;
    @media all and (max-width: 480px) {
        font-size: 12px;
    }
`;
const EnquirerDiv = styled.div`
    display: flex;
`;
const EnquireLogo = styled.span`
    margin-right: 5px;
    width: 20px;
    height: 20px;
    & img {
        width: 100%;
        display: block;
    }
`;
const Enquire = styled.p`
    color: #6c6c6c;
    font-size: 14px;
    & b {
        color: #4ca473;
        border-bottom: 1px solid #4ca473;
    }
    @media all and (max-width: 480px) {
        font-size: 12px;
    }
    @media all and (max-width: 480px) {
        font-size: 11px;
        margin-top: 3px;
    }
`;
const EnquireLink = styled(Link)`
    color: #4ca473;
    border-bottom: 1px solid #4ca473;
`;
const ButtonConatiner = styled.div`
    display: flex;
    justify-content: flex-end;
`;
const Submit = styled.div`
    min-height: 48px;
    width: 25%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #fff;
    background: transparent linear-gradient(114deg, #0fa76f 0%, #0f9ea7 100%) 0%
        0% no-repeat padding-box;
    border-radius: 8px;
    font-family: gordita_medium;
    @media all and (max-width: 480px) {
        width: 40%;
        font-size: 14px;
        max-height: 35px;
        min-height: 35px;
        font-family: "gordita_medium";
    }
    &.disabled {
        filter: contrast(0.5);
        cursor: not-allowed;
    }
`;
const LightBanner = styled.div`
    position: absolute;
    width: 100%;
    height: 7px;
    left: 0;
    bottom: 7px;
    background: #6dce9f;
`;
const DarkBanner = styled.div`
    position: absolute;
    width: 100%;
    height: 7px;
    left: 0;
    bottom: 0;
    background: #529f7b;
`;
const Error = styled.p`
    color: red;
    font-size: 14px;
    text-align: right;
    margin-bottom: 5px;
    @media all and (max-width: 480px) {
        color: red;
        font-size: 12px;
    }
`;
