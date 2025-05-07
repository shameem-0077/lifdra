import React, { useState, useEffect } from "react";
import useUserStore from "../../../store/userStore";
import Jdenticon from "react-jdenticon";
import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";

function ModalHeaderDetails({ item }) {
  const loginData = useUserStore((state) => state.loginData);
  const currentTime = moment();
  const [showProgram, setShowProgram] = useState(true);
  const hasProgram = !!item?.author?.program?.name;

  useEffect(() => {
    if (hasProgram) {
      const interval = setInterval(() => {
        setShowProgram((prev) => !prev);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [hasProgram]);

  return (
    <Container>
      <ProfileNav
        to={
          loginData?.userId === item?.author?.user_id
            ? "/feed/profile"
            : `/feed/profile/${item?.author?.username}`
        }
      >
        <ProfileIcon>
          {item?.author?.photo ? (
            <img src={item?.author?.photo} alt="Profile" />
          ) : (
            <Jdenticon value={item?.author?.name} />
          )}
        </ProfileIcon>
        <ProfileDiv>
          <UserName>{item?.author?.name ?? "--"}</UserName>
          <AlternatingText>
            {hasProgram ? (
              <>
                {item?.author?.designation && (
                  <UserProgram show={showProgram}>
                    {item?.author?.designation ?? "--"}
                  </UserProgram>
                )}
                <Time show={!showProgram}>
                  {moment.utc(item?.date_updated).fromNow(currentTime)} ago
                </Time>
              </>
            ) : (
              <Time show={true}>
                {moment.utc(item?.date_updated).fromNow(currentTime)} ago
              </Time>
            )}
          </AlternatingText>
        </ProfileDiv>
      </ProfileNav>
    </Container>
  );
}

export default ModalHeaderDetails;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;

const ProfileDiv = styled.div`
  margin-left: 12px;
`;

const ProfileIcon = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (min-width: 768px) {
    height: 48px;
    width: 48px;
  }
`;

const UserName = styled.h2`
  width: fit-content;
  color: #364152;
  font-size: 16px;
  font-family: "gordita_medium";
`;

const UserNameModal = styled.h2`
  color: #364152;
  font-size: 17px;
  font-family: "gordita_medium";
`;

const ProfileNav = styled(Link)`
  display: flex;
  align-items: center;
`;

const AlternatingText = styled.div`
  position: relative;
  height: 20px;
`;

const TransitionText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.show ? 0 : 1)};  
  transition: opacity 0.5s ease-in-out;
`;

const UserProgram = styled(TransitionText)`
  color: #737376;
  font-size: 12px;
  margin: 0;
  width: max-content;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const Time = styled(TransitionText)`
  color: #9aa4b2;
  font-size: 12px;
  margin: 0;
  width: max-content;
`;
