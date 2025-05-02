import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const ToggleButton = ({ english, setEnglish }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.checked) {
      console.log("english checked");
      dispatch({
        type: "CHANGE_LANGUAGE",
        isMalayalam: false,
      });
      setEnglish(true);
    } else {
      console.log("english uncheked");
      setEnglish(false);
      dispatch({
        type: "CHANGE_LANGUAGE",
        isMalayalam: true,
      });
    }
  };
  return (
    <Container>
      <CheckBoxWrapper>
        <CheckBox id="checkbox" type="checkbox" onChange={handleChange} />
        <CheckBoxLabel htmlFor="checkbox" />
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
  width: 46px;
  height: 21px;
  border-radius: 26px;
  background: #fff;
  border: 1px solid #4fbe79;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 17px;
    margin: 1px;
    background: #4fbe79;
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 24px;
  border: 1px solid #4fbe79;

  &:checked + ${CheckBoxLabel} {
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 17px;
      margin-left: 25px;
      transition: 0.2s;
    }
  }
`;
export default ToggleButton;
