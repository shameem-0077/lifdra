import React from "react";
import styled from "styled-components";

const SliderNavigation = ({ sliderRef, totalSlides, perPage }) => {
  const handlePrev = () => {
    const splide = sliderRef?.current.splide;
    splide.go("<");
  };
  const handleNext = () => {
    const splide = sliderRef?.current.splide;
    splide.go(">");
  };

  const disableButtons = totalSlides <= perPage;

  return (
    <NavigationContainer className="custom-navigation">
      <Button onClick={() => handlePrev()} disabled={disableButtons}>
        <img
          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/left-arrow.png"
          alt="Prev"
        />
      </Button>
      <Button onClick={() => handleNext()} disabled={disableButtons}>
        <img
          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/right-arrow.png"
          alt="Next"
        />
      </Button>
    </NavigationContainer>
  );
};

export default SliderNavigation;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: end;
  /* margin-top: 20px; */
  width: 100%;
`;

const Button = styled.button`
  margin: 0 10px;
  cursor: pointer;
  width: 33px;
  height: 33px;

  img {
    width: 100%;
    display: inline-block;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
