import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import profileIcon from "../../../../assets/images/profile-screen/about-me.svg";
import skillImage from "../../../../assets/images/profile-screen/skills.svg";
import eductionIcon from "../../../../assets/images/profile-screen/educaton.svg";
import certificateicon from "../../../../assets/images/profile-screen/certification.svg";
import additionalInfo from "../../../../assets/images/profile-screen/additional-info.svg";
import gurdians from "../../../../assets/images/profile-screen/gurdians.svg";

function ProfileDetails() {
    const dispatch = useDispatch();

    const handleEducation = () => {
        dispatch({
            type: "TOGGLE_NEW_UPDATES_MODAL",
        });
        dispatch({
            type: "UPDATE_NEW_UPDATES_MODAL_TYPE",
            newUpdatesModalType: "education_details",
        });
    };
    const handleEditEducation = () => {
        dispatch({
            type: "TOGGLE_NEW_UPDATES_MODAL",
        });
        dispatch({
            type: "UPDATE_NEW_UPDATES_MODAL_TYPE",
            newUpdatesModalType: "edit_educational_details",
        });
    };
    const handleCertificates = () => {
        dispatch({
            type: "TOGGLE_NEW_UPDATES_MODAL",
        });
        dispatch({
            type: "UPDATE_NEW_UPDATES_MODAL_TYPE",
            newUpdatesModalType: "add_certificates",
        });
    };

    const handleGuardiansInfo = () => {
        dispatch({
            type: "TOGGLE_NEW_UPDATES_MODAL",
        });
        dispatch({
            type: "UPDATE_NEW_UPDATES_MODAL_TYPE",
            newUpdatesModalType: "edit_guardians_info",
        });
    };

    const handleBio = () => {
        dispatch({
            type: "TOGGLE_NEW_UPDATES_MODAL",
        });
        dispatch({
            type: "UPDATE_NEW_UPDATES_MODAL_TYPE",
            newUpdatesModalType: "about_me",
        });
    };
    const handleSkills = () => {
        dispatch({
            type: "TOGGLE_NEW_UPDATES_MODAL",
        });
        dispatch({
            type: "UPDATE_NEW_UPDATES_MODAL_TYPE",
            newUpdatesModalType: "update_skills",
        });
    };

    const handleAdditionalDetails = () => {
        dispatch({
            type: "TOGGLE_NEW_UPDATES_MODAL",
        });
        dispatch({
            type: "UPDATE_NEW_UPDATES_MODAL_TYPE",
            newUpdatesModalType: "add_additional_details",
        });
    };
    return (
        <Details>
            <AboutContainer>
                <BottomContainerLeft>
                    <DetailsAddContainer>
                        <ListContainer>
                            <Heading>About me</Heading>
                            <ProfileIconContainer>
                                <ProfileIcon
                                    src={profileIcon}
                                    alt="profileIcon"
                                />
                            </ProfileIconContainer>
                            <SmallParagraph>
                                Describe yourself briefly, including who you
                                are, what you like, and what you have to offer.
                            </SmallParagraph>
                            <AddDetails onClick={handleBio}>Add Bio</AddDetails>
                        </ListContainer>
                        <ListContainer>
                            <Heading>Skills and coding languages</Heading>
                            <ProfileIconContainer>
                                <ProfileIcon
                                    src={skillImage}
                                    alt="skillsIcon"
                                />
                            </ProfileIconContainer>
                            <SmallParagraph>
                                Tell us about your coding skills and coding
                                languages you know
                            </SmallParagraph>
                            <AddDetails onClick={handleSkills}>
                                Add Skills
                            </AddDetails>
                        </ListContainer>
                        <ListContainer>
                            <Heading>Education</Heading>
                            <ProfileIconContainer>
                                <ProfileIcon
                                    src={eductionIcon}
                                    alt="eductionIcon"
                                />
                            </ProfileIconContainer>
                            <SmallParagraph>
                                Share your educational qualification
                                information, such as your university and your
                                schooling
                            </SmallParagraph>
                            <AddDetails onClick={handleEducation}>
                                Add Education
                            </AddDetails>
                        </ListContainer>
                        <ListContainer>
                            <Heading>Certification</Heading>
                            <ProfileIconContainer>
                                <ProfileIcon
                                    src={certificateicon}
                                    alt="certificateicon"
                                />
                            </ProfileIconContainer>
                            <SmallParagraph>
                                Show off your certifications and let others know
                                what you're capable of.
                            </SmallParagraph>
                            <AddDetails onClick={handleCertificates}>
                                Add Certification
                            </AddDetails>
                        </ListContainer>
                    </DetailsAddContainer>
                </BottomContainerLeft>
                <BottomContainerRight>
                    <CardContainer>
                        <Content>
                            <Subheading>Additional info</Subheading>
                            <AdditionalContainer>
                                <InfoIcon src={additionalInfo} alt="info" />
                            </AdditionalContainer>
                            <Paragraph>
                                Share your contact details and other info
                                additional information.
                            </Paragraph>
                            <AddContent onClick={handleAdditionalDetails}>
                                Add Info
                            </AddContent>
                        </Content>
                        <Content>
                            <Subheading>Guardians info</Subheading>
                            <AdditionalContainer>
                                <InfoIcon src={gurdians} alt="gurdians" />
                            </AdditionalContainer>
                            <Paragraph>
                                Please provide us with the details of your
                                guardians.
                            </Paragraph>
                            <AddContent onClick={handleGuardiansInfo}>
                                Add Guardian
                            </AddContent>
                        </Content>
                    </CardContainer>
                </BottomContainerRight>
            </AboutContainer>
        </Details>
    );
}

const Details = styled.div``;

const AboutContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;
const BottomContainerLeft = styled.div`
    width: 64%;
    @media (max-width: 768px) {
        width: 100%;
    }
`;
const DetailsAddContainer = styled.div``;
const ListContainer = styled.div`
    background: #f9f9fb;
    margin-bottom: 32px;
    padding: 24px;
    border-radius: 8px;
`;
const Heading = styled.h3`
    margin-bottom: 68px;
    font-size: 18px;
    font-family: "gordita_medium";
    color: #101828;
    @media (max-width: 360px) {
        font-size: 17px;
    }
`;
const ProfileIconContainer = styled.div`
    width: 69px;
    margin: 0 auto 24px;
`;
const ProfileIcon = styled.img`
    width: 100%;
    display: block;
`;
const SmallParagraph = styled.p`
    color: #2d2d2d;
    font-family: "gordita_regular";
    font-size: 14px;
    text-align: center;
    width: 49%;
    margin: 0 auto 24px;
    @media (max-width: 980px) {
        width: 100%;
    }
`;
const AddDetails = styled.button`
    display: block;
    margin: 0 auto;
    background: #0fa76f;
    padding: 8px 12px;
    color: white;
    font-size: 14px;
    font-family: "gordita_medium";
    border-radius: 6px;
    cursor: pointer;
    @media (max-width: 360px) {
        padding: 8px 19px;
    }
`;
const BottomContainerRight = styled.div`
    width: 34%;
    @media (max-width: 768px) {
        width: 100%;
    }
`;
const CardContainer = styled.div``;
const Content = styled.div`
    background: #f8fbf4;
    margin-bottom: 24px;
    padding: 24px;
    &:last-child {
        margin-bottom: 0;
    }
`;
const Subheading = styled.h3`
    color: #101828;
    font-size: 18px;
    font-family: "gordita_medium";
    margin-bottom: 40px;
`;
const AdditionalContainer = styled.div`
    width: 69px;
    margin: 0 auto 24px;
`;
const InfoIcon = styled.img`
    width: 100%;
    display: block;
`;
const Paragraph = styled.p`
    color: #2d2d2d;
    font-size: 14px;
    font-family: "gordita_regular";
    text-align: center;
    width: 90%;
    margin: 0 auto 24px;
`;
const AddContent = styled.button`
    display: block;
    margin: 0 auto;
    background: #0fa76f;
    padding: 8px 12px;
    color: white;
    font-size: 14px;
    font-family: "gordita_medium";
    border-radius: 6px;
    cursor: pointer;
`;

export default ProfileDetails;
