import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { accountsConfig } from "../../../../../axiosConfig";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import RequestLoader from "../../authentication/general/RequestLoader";

function UploadProfilePicture({ setSrc, src }) {
  const { user_data, is_profile_update } = useSelector((state) => state);
  const dispatch = useDispatch();

  let { access_token } = user_data;

  const [cropData, setCropData] = useState("#");
  const cropperRef = useRef(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCropData(cropper.getCroppedCanvas().toDataURL());
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    setLoading(true);
    formData.append("image", dataURItoBlob(cropData), "image.jpg");
    try {
      const res = await accountsConfig.post(
        "api/v1/users/signup/set-profile-picture/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (6000) {
        setSrc("");
        setFormSubmitted(!formSubmitted);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      alert(
        "Unable to update profile. Please check your data connection and try again."
      );
      setSrc("");
      console.error(err);
      setLoading(false);
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return blob;
  };

  useEffect(() => {
    dispatch({
      type: "TOGGLE_IS_PROFILE_UPDATE",
      is_profile_update: !is_profile_update,
    });
  }, [formSubmitted]);

  return (
    <BackContainer src={src}>
      <Overlay onClick={() => src("")} />
      <ModalContainer src={src}>
        <Heading>Upload Profile Picture</Heading>
        <hr />
        <CropContainer>
          <ProfileBox>
            {src && (
              <Cropper
                src={src}
                style={{ height: 320, width: "100%" }}
                initialAspectRatio={1}
                aspectRatio={1}
                guides={false}
                autoCropArea={0.5}
                dragMode="move"
                crop={onCrop}
                ref={cropperRef}
                minCropBoxWidth={50}
                minCropBoxHeight={50}
                viewMode={1}
                // background={false}
              />
            )}
          </ProfileBox>
        </CropContainer>
        <hr />

        <ButtonContainer>
          <ButtonCancel
            onClick={() => {
              setSrc("");
            }}
          >
            Cancel
          </ButtonCancel>
          {!loading ? (
            <ButtonCrop onClick={handleSubmit}>Crop & Save</ButtonCrop>
          ) : (
            <ButtonCrop>
              {" "}
              <RequestLoader />{" "}
            </ButtonCrop>
          )}
        </ButtonContainer>
      </ModalContainer>
    </BackContainer>
  );
}
export default UploadProfilePicture;

// =====================
const BackContainer = styled.div`
  position: fixed;
  transition: 0.3s;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  left: 0;
  top: 0;
  opacity: ${({ src }) => (src ? "1" : "0")};
  visibility: ${({ src }) => (src ? "unset" : "hidden")};
`;
const Overlay = styled.div`
  background-color: rgba(43, 43, 43, 0.06);
  backdrop-filter: blur(4px);

  width: 100%;
  height: 100vh;
`;
const ModalContainer = styled.div`
  position: absolute;
  padding: 40px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: 0.4s ease-in-out;
  ${({ src }) => (src ? "scale(1,1)" : "scale(0,0)")};
  border-radius: 9px;
  overflow: hidden;
  background-color: #fff;
  width: 550px;
  height: 515px;
  padding: 40px;
  hr {
    display: inline-block;
    margin: 10px 0;
    width: 100%;
    height: 1px;
    background-color: #eeeeee;
  }

  @media (max-width: 640px) {
    width: 440px;
  }
  @media all and (max-width: 480px) {
    width: 340px;
  }
  @media all and (max-width: 360px) {
    width: 305px;
    padding: 15px 40px;
  }
`;
const Heading = styled.h3`
  font-size: 22px;
  font-family: gordita_medium;
  color: #0a0a0a;
  @media all and (max-width: 480px) {
    font-size: 18px;
  }
`;
const ProfileBox = styled.div`
  img {
    width: 100%;
    display: block;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const ButtonCancel = styled.button`
  padding: 10px 40px;
  font-size: 14px;
  display: inline-block;
  color: #747474;
  border: 1px solid #747474;
  font-family: gordita_medium;
  border-radius: 6px;
  margin-right: 15px;
  cursor: pointer;
  @media all and (max-width: 640px) {
    padding: 13px 27px;
  }
  @media all and (max-width: 480px) {
    padding: 10px 34px;
  }
  @media all and (max-width: 360px) {
    padding: 8px 16px;
  }
`;
const ButtonCrop = styled.button`
  padding: 5px 25px;
  font-size: 14px;
  width: 156px;
  height: 46px;
  font-family: gordita_medium;
  display: inline-block;
  color: #fff;
  border: 1px solid #0fa76f;
  background-color: #0fa76f;
  border-radius: 6px;
  cursor: pointer;
  @media all and (max-width: 640px) {
    padding: 5px 27px;
  }
  @media all and (max-width: 480px) {
    padding: 5px 18px;
  }
`;
const CropContainer = styled.div``;
