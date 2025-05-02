import React from "react";
import styled from "styled-components";
import AcademicDetails from "../../includes/profile/AcademicDetails";
import ProfileDetails from "../../includes/profile/ProfileDetails";
import ProfileModal from "../../includes/profile/modals/ProfileModal";
import TalropEdtechHelmet from "../../../helpers/TalropEdtechHelmet";
import NewUpdatesProfileModal from "../../includes/profile/modals/NewUpdatesProfileModal";

function ProfileNewUi() {
    return (
        <>
            <ProfileModal />
            <NewUpdatesProfileModal />
            <TalropEdtechHelmet title="Profile" />
            <Container>
                <Title>Profile</Title>
                <OuterCover>
                    <Cover>
                        <UserDetails>
                            <ProfileDetails />
                        </UserDetails>
                        <RightSection>
                            <AcademicDetails />
                        </RightSection>
                    </Cover>
                </OuterCover>
            </Container>
        </>
    );
}

export default ProfileNewUi;
const Container = styled.div``;
const Title = styled.h2`
    font-family: "gordita_medium";
    font-size: 26px;
    margin-bottom: 10px;
    @media all and (max-width: 480px) {
        font-size: 24px;
    }
`;
const OuterCover = styled.div`
    background-color: #f9f9fb;
    padding: 15px;
    border-radius: 3px;
    @media all and (max-width: 480px) {
        padding: 0;
    }
`;
const Cover = styled.div`
    background-color: #fff;
    border: 1px solid #f3f2f4;
    border-radius: 3px;
    padding: 20px;
    display: grid;
    grid-template-columns: 2fr 4fr;
    grid-gap: 20px;
    @media all and (max-width: 1120px) {
        grid-template-columns: 1fr;
    }
    @media all and (max-width: 980px) {
        grid-template-columns: 2fr 3fr;
    }

    @media all and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
    @media all and (max-width: 480px) {
        border: none;
        padding: 0;
    }
`;
const UserDetails = styled.div`
    @media all and (max-width: 768px) {
        border: none;
    }
    @media all and (max-width: 480px) {
        border: 1px solid #eeebeb;
    }
    @media all and (max-width: 360px) {
        border: none;
    }
`;
const RightSection = styled.div``;
