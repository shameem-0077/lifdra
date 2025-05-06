import React, { useEffect, useState } from "react";
import styled from "styled-components";

function NotificationSettings({
  content,
  notificationData,
  handleNotification,
}) {
  const [isOn, setIsOn] = useState({});

  useEffect(() => {
    if (notificationData) {
      const initialState = notificationData.reduce(
        (acc, { id, is_enabled }) => {
          acc[id] = is_enabled;
          return acc;
        },
        {}
      );
      setIsOn(initialState);
    }
  }, [notificationData]);

  const handleToggle = (id) => {
    const currentState = isOn[id];

    setIsOn((prevState) => ({
      ...prevState,
      [id]: !currentState,
    }));

    handleNotification(id);
  };

  return (
    <Main>
      <Title>{content?.title}</Title>
      <SettingsBox>
        <SettingContainer>
          {notificationData?.map((data, index) => (
            <li key={index}>
              <SettingTitle>{data?.title}</SettingTitle>
              <ToggleContainer>
                <ToggleInput
                  type="checkbox"
                  id={`toggle-${data?.id}`}
                  checked={isOn[data?.id]}
                  onChange={() => handleToggle(data?.id)}
                />
                <ToggleLabel
                  htmlFor={`toggle-${data?.id}`}
                  isOn={isOn[data?.id]}
                >
                  <ToggleKnob isOn={isOn[data?.id]} />
                </ToggleLabel>
              </ToggleContainer>
            </li>
          ))}
        </SettingContainer>
      </SettingsBox>
    </Main>
  );
}

export default NotificationSettings;

const pxToRem = (px) => `${(px / 16).toFixed(2)}rem`;

const Main = styled.div`
  max-width: 999px;
  width: 100%;
  padding: 24px;
  background-color: #f8fafc;
  border: 1px solid #eef2f6;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media all and (max-width: 540px) {
    padding: 10px;
  }
  @media all and (max-width: 440px) {
    padding: 10px;
    gap: 12px;
  }
`;

const Title = styled.h3`
  font-size: ${pxToRem(18)};
  font-family: "gordita_regular";
  font-weight: 600;
  color: #101828;
`;

const SettingsBox = styled.div``;

const SettingContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0 20px 0;
    border-bottom: 1px solid #eef2f6;

    &:last-child {
      border: none;
    }
  }

  @media all and (max-width: 440px) {
    gap: 10px;
    li {
      align-items: flex-start;
      flex-direction: column;
      gap: 10px;

      padding: 0px 0 10px 0;
    }
  }
`;

const SettingTitle = styled.span`
  font-size: ${pxToRem(14)};
  font-family: "gordita_regular";
  font-weight: 600;
  color: #475467;

  @media all and (max-width: 440px) {
    /* font-size: ${pxToRem(12)}; */
  }
`;

const ToggleContainer = styled.div`
  position: relative;
  width: 50px;
  height: 25px;
  @media all and (max-width: 440px) {
    width: 44px;
    height: 20px;
  }
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const ToggleLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ isOn }) => (isOn ? "#059664" : "#ccc")};
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const ToggleKnob = styled.div`
  position: absolute;
  top: 2px;
  left: ${({ isOn }) => (isOn ? "27px" : "2px")};
  width: 21px;
  height: 21px;
  background: white;
  border-radius: 50%;
  transition: left 0.3s ease;
  @media all and (max-width: 440px) {
    width: 15px;
    height: 16px;
  }
`;
