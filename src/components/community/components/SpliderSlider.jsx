import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const SpliderSlider = ({ item }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (item && item.attachments) {
      const photoAttachments = item.attachments
        .filter((attachment) => attachment.type === "photo")
        .map((attachment) => ({
          url: attachment.attachment,
          title: `Image ${attachment.order_id}`,
        }));
      setImages(photoAttachments);
    }
  }, [item]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const showArrows = images.length > 1;

  return (
    <SliderContainer>
      <SlideWrapper>
        <Slide index={currentIndex}>
          {images.map((image, index) => (
            <ImageContainer key={index}>
              <Image src={image.url} alt={image.title} />
            </ImageContainer>
          ))}
        </Slide>
      </SlideWrapper>
      {showArrows && (
        <>
          <Arrow direction="left" onClick={prevSlide}>
            <img
              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/left-arrow.png"
              alt="left"
            />
          </Arrow>
          <Arrow direction="right" onClick={nextSlide}>
            <img
              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/right-arrow.png"
              alt="right"
            />
          </Arrow>
        </>
      )}
    </SliderContainer>
  );
};

export default SpliderSlider;

const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SliderContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
  height: 100%;
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  transition: transform 0.5s ease-in-out;
  transform: ${(props) => `translateX(-${props.index * 100}%)`};
  height: 100%;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const ImageContainer = styled.div`
  flex: 0 0 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  ${(props) => (props.direction === "left" ? "left: 10px;" : "right: 10px;")}
`;
