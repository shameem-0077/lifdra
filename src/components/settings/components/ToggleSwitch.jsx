import React, { useState } from "react";
import styled from "styled-components";

const ToggleSwitch = ({ isOn, handleToggle, id }) => {
  console.log(id, "======id inside toggle======>");
  console.log(id, "======id inside toggle======>");
  const [notificationId, setNotificationID] = useState();
  return (
    <ToggleContainer>
      <ToggleInput
        type="checkbox"
        id="toggle"
        checked={isOn}
        onChange={() => {
          setNotificationID(id);
          if (id == notificationId) {
            handleToggle(id);
          }
        }}
      />
      <ToggleLabel htmlFor="toggle" isOn={isOn}>
        <ToggleKnob isOn={isOn} />
      </ToggleLabel>
    </ToggleContainer>
  );
};

export default ToggleSwitch;

const ToggleContainer = styled.div`
  position: relative;
  width: 50px;
  height: 25px;
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
`;
