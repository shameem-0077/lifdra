import React, { useState } from "react";
import styled from "styled-components";
import TalropEdtechHelmet from "../../../helpers/TalropEdtechHelmet";
import ProfileView from "../../includes/community/community-profile/ProfileView";
import UnfollowModal from "../../includes/community/modals/UnfollowModal";

function PostProfile({
  followCount,
  userProfileDetails,
  setFollowCount,
  setShowUnfollowModal,
  showUnfollowModal,
  setIsFollow,
  isFollow,
  setModal,
}) {
  return (
    <>
      <TalropEdtechHelmet title={userProfileDetails?.name} />
      <Container>
        <ProfileView
          followCount={followCount}
          setFollowCount={setFollowCount}
          userProfileDetails={userProfileDetails}
          setShowUnfollowModal={setShowUnfollowModal}
          showUnfollowModal={showUnfollowModal}
          setIsFollow={setIsFollow}
          isFollow={isFollow}
          setModal={setModal}
        />
      </Container>
    </>
  );
}

export default PostProfile;

const Container = styled.section`
  /* padding-top: 32px; */
  width: 100%;

  @media all and (max-width: 321px) {
    padding-top: 0;
  }
`;
