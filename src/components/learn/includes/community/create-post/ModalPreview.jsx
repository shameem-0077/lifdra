import React from "react";
import styled from "styled-components";

function Preview({ images, videos, onRemoveImage, onRemoveVideo }) {
  const totalItems = images.length + videos.length;

  return (
    <PreviewContainer totalItems={totalItems}>
      {images.map((image, index) => (
        <PreviewItem
          key={`image-${index}`}
          index={index}
          totalItems={totalItems}
        >
          <PreviewContent>
            <PreviewImage src={image.preview} alt={`Preview ${index}`} />
          </PreviewContent>
          <RemoveButton onClick={() => onRemoveImage(index)}>
            <span>
              <img
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/17-07-2024/remove-btn.svg"
                alt="close"
              />
            </span>
          </RemoveButton>
        </PreviewItem>
      ))}
      {videos.map((video, index) => (
        <PreviewItem
          key={`video-${index}`}
          index={images.length + index}
          totalItems={totalItems}
        >
          <PreviewContent>
            <PreviewVideo
              src={video.preview}
              controls
              controlsList="nodownload"
            />
          </PreviewContent>
          <RemoveButton onClick={() => onRemoveVideo(index)}>
            <span>
              <img
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/17-07-2024/remove-btn.svg"
                alt="close"
              />
            </span>
          </RemoveButton>
        </PreviewItem>
      ))}
    </PreviewContainer>
  );
}

export default Preview;

const PreviewContainer = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 20px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-auto-rows: 1fr;
`;

const PreviewItem = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
`;

const PreviewContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const PreviewVideo = styled.video`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  img {
    display: block;
    width: 100%;
  }
  span {
    width: 11px;
    height: 11px;
  }
`;
