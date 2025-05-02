import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import ViewModal from "./ViewModal";

function MultiImageViewer({ images, item }) {
  const [isModal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const showOverlay = images && images.length > 4;
  const isSingleImage = images && images.length === 1;
  const isTwoImages = images && images.length === 2;
  const isThreeImages = images && images.length === 3;
  const isFourImages = images && images.length === 4;
  const remainingCount = showOverlay ? images.length - 4 : 0;

  useEffect(() => {
    const imagePromises = images?.slice(0, 4).map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
      });
    });

    Promise.all(imagePromises).then(() => {
      setIsLoading(false);
    });
  }, [images]);

  return (
    <>
      <Container
        isSingleImage={isSingleImage}
        isTwoImages={isTwoImages}
        isThreeImages={isThreeImages}
        isFourImages={isFourImages}
      >
        {images?.slice(0, 4).map((attachment, index) => (
          <ImageItem
            key={attachment.id}
            isOverlay={index === 3 && showOverlay}
            isSingleImage={isSingleImage}
            isTwoImages={isTwoImages}
            isThreeImages={isThreeImages}
            isFourImages={isFourImages}
            index={index}
          >
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <>
                <img src={attachment} alt={`Image ${index + 1}`} />
                {index === 3 && showOverlay && (
                  <Overlay>
                    <OverlayText>+{remainingCount}</OverlayText>
                  </Overlay>
                )}
              </>
            )}
          </ImageItem>
        ))}
      </Container>
    </>
  );
}

export default MultiImageViewer;

const Container = styled.div`
  display: grid;
  grid-gap: 4px;
  overflow: hidden;

  ${({ isSingleImage, isTwoImages, isThreeImages, isFourImages }) => {
    if (isSingleImage) {
      return `
        grid-template-columns: 1fr;
        grid-auto-rows: auto;
      `;
    } else if (isTwoImages) {
      return `
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: auto;
      `;
    } else if (isThreeImages) {
      return `
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: auto auto;
      `;
    } else if (isFourImages) {
      return `
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: auto;
      `;
    } else {
      return `
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: auto;
      `;
    }
  }}
`;

const ImageItem = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;

  ${({ isSingleImage, isTwoImages, isThreeImages, isFourImages, index }) => {
    if (isSingleImage) {
      return `
        max-width: 100%;
        max-height: 80vh;
        margin: 0 auto;
      `;
    } else if (isThreeImages) {
      if (index === 0) {
        return `
          grid-column: 1 / 3;
        `;
      }
    } else if (!isTwoImages && !isFourImages) {
      return `
        &:first-child {
          grid-column: 1 / 4;
        }
      `;
    }
  }}

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
    ${({ isSingleImage, isThreeImages, index }) =>
      isSingleImage
        ? `
          max-height: 80vh;
          max-width: 100%;
          object-fit: contain;
        `
        : isThreeImages && index === 0
        ? `
          aspect-ratio: 2 / 1;
          object-fit: cover;
        `
        : `
          aspect-ratio: 3 / 2;
          object-fit: cover;
        `}
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OverlayText = styled.span`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SkeletonLoader = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;
