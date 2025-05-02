import React from "react";
import styled from "styled-components";
const ToggleButton = ({ english, setEnglish }) => {
  const handleChange = (e) => {
    if (e.target.checked) {
      setEnglish(true);
    } else {
      setEnglish(false);
    }
  };
  return (
    <Container>
      <CheckBoxWrapper>
        <InnerCheckBox
          id="inner-checkbox"
          type="checkbox"
          onChange={(e) => handleChange(e)}
        />
        <CheckBoxLabel htmlFor="inner-checkbox" />
      </CheckBoxWrapper>
    </Container>
  );
};

const Container = styled.div``;

const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 64px;
  height: 33px;
  border-radius: 26px;
  background: #4fbe79;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    margin-top: 3px;
    margin-left: 5px;
    background: #fefefe;
    transition: 0.2s;
  }
`;
const InnerCheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;

  &:checked + ${CheckBoxLabel} {
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      margin-left: 35px;
      margin-top: 4px;
      transition: 0.2s;
    }
  }
`;
export default ToggleButton;
