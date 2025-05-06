import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import AboutMeModal from "./AboutMeModal";
import EductionalDetailsModal from "./EducationalDetailsModal";
import AddCertificationsModal from "./AddCertificationsModal";
import UpdateSkills from "./UpdateSkills";
import EditGuardiansInfoModal from "./EditGuardiansInfoModal";
import AddAdditonalDetailsModal from "./AddAdditonalDetailsModal";
import SocialMediaModal from "./SocialMediaModal";
import ProfileSuccessModal from "./ProfileSuccessModal";
import $ from "jquery";

export default function NewUpdatesProfileModal({
    userProfileDetails,
    setReload,
}) {
    const { isNewUpdateModal, newUpdatesModalType } = useSelector(
        (state) => state
    );

    const dispatch = useDispatch();
    const [isOffline, setOffline] = useState(false);

    const handleOnlineEvent = (e) => {
        reloadWebPage()
        setOffline(false);
    };
    const handleOfflineEvent = (e) => {
        setOffline(true);
    };

    const reloadWebPage = () => {
        window.location.reload();
    };

    useEffect(() => {
        if (navigator.onLine) {
            setOffline(false);
        } else {
            setOffline(true);
        }
        window.addEventListener("offline", handleOfflineEvent);
        window.addEventListener("online", handleOnlineEvent);
    }, []);

    // const handleClose = () => {
    //     dispatch({
    //         type: "TOGGLE_NEW_UPDATES_MODAL",
    //     });
    //     dispatch({
    //         type: "UPDATE_MY_PROFILE_EDITING_DATA",
    //         selectedEditingMyProfileData: {},
    //     });
    // };

    useEffect(() => {
        if (isNewUpdateModal) {
            $("html").addClass("hide-tidio");
        } else {
            $("html").removeClass("hide-tidio");
        }
    }, [isNewUpdateModal]);

    const [innerHeight, setInnerHeight] = useState("");

    useEffect(() => {
        if (!innerHeight) {
            setInnerHeight(window?.innerHeight);
        }
    }, []);

    return (
        <>
            <MainContainer className="modal-open">
                <BackContainer
                    style={{ transform: isNewUpdateModal && "scale(1,1)" }}
                >
                    <Overlay
                    // onClick={handleClose}
                    ></Overlay>

                    {newUpdatesModalType === "add_social_media" ? (
                        <SocialMediaModal isOffline={isOffline} />
                    ) : newUpdatesModalType === "about_me" ? (
                        <AboutMeModal
                            bio={
                                userProfileDetails?.about_me
                                    ? userProfileDetails?.about_me
                                    : ""
                            }
                            isOffline={isOffline}
                        />
                    ) : newUpdatesModalType === "update_skills" ? (
                        <UpdateSkills
                            userProfileDetails={userProfileDetails}
                            isOffline={isOffline}
                        />
                    ) : newUpdatesModalType === "education_details" ? (
                        <EductionalDetailsModal isOffline={isOffline} />
                    ) : newUpdatesModalType === "add_certificates" ? (
                        <AddCertificationsModal isOffline={isOffline} />
                    ) : newUpdatesModalType === "add_additional_details" ? (
                        <AddAdditonalDetailsModal
                            userProfileDetails={userProfileDetails}
                            isOffline={isOffline}
                        />
                    ) : newUpdatesModalType === "edit_guardians_info" ? (
                        <EditGuardiansInfoModal
                            setReload={setReload}
                            isOffline={isOffline}
                        />
                    ) : newUpdatesModalType === "success" ? (
                        <ProfileSuccessModal setReload={setReload} />
                    ) : (
                        <></>
                    )}
                </BackContainer>
            </MainContainer>
        </>
    );
}

const MainContainer = styled.div``;
const BackContainer = styled.div`
    position: fixed;
    /* transition: 0.3s; */
    transform: scale(0, 0);
    width: 100%;
    height: ${({ height }) => (height ? `${height}px` : "100vh")};
    max-height: ${({ height }) => (height ? `${height}px` : "100vh")};

    z-index: 1000;
    left: 0;
    top: 0px;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(2px);
`;
const Overlay = styled.div`
    position: fixed;
    left: 0;
    top: 0px;
    width: 100%;
    height: 100vh;
`;
