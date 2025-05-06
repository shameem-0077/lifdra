import React, { useState } from "react";
import styled from "styled-components";

function LanguageSettings({
  data,
  languageData,
  onSelectLanguage,
  selectedLanguage,
  handleSubmit,
}) {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  return (
    <>
      <MainConatiner key={data?.id}>
        <LeftContainer>
          <Title>{data?.title}</Title>
          <Description>{data?.description}</Description>
        </LeftContainer>
        <RightContainer>
          <DropDownBox
            onClick={() =>
              setOpenDropdownId(openDropdownId === data?.id ? null : data?.id)
            }
          >
            <span>
              <strong>
                {selectedLanguage?.name
                  ? selectedLanguage?.name
                  : data?.selected_language?.name}
              </strong>
            </span>
            <DownIconBox>
              <img
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/17-10-2024/chevron-down.svg"
                alt="Down arrow"
              />
            </DownIconBox>
          </DropDownBox>
          {openDropdownId === data?.id && (
            <LanguageContainer>
              {languageData.map((language, index) => (
                <LanguageBox
                  key={index}
                  onClick={() => {
                    console.log(language, "language===");
                    onSelectLanguage(language);
                    setOpenDropdownId(null);
                    handleSubmit(data?.key_slug, language);
                  }}
                >
                  <span>
                    <strong>{language?.name}</strong>
                  </span>
                  {selectedLanguage?.name === language?.name && (
                    <SelectedIcon>
                      <img
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/14-10-2024/check.svg"
                        alt="Selected icon"
                      />
                    </SelectedIcon>
                  )}
                </LanguageBox>
              ))}
            </LanguageContainer>
          )}
        </RightContainer>
      </MainConatiner>
    </>
  );
}

export default LanguageSettings;

const pxToRem = (px) => `${(px / 16).toFixed(2)}rem`;

const MainConatiner = styled.div`
  max-width: 951px;
  width: 100%;
  background-color: #f8fafc;
  border: 1px solid #eef2f6;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  @media all and (max-width: 540px) {
    padding: 10px;
    flex-direction: column;
    gap: 10px;
  }
`;

const LeftContainer = styled.div``;

const RightContainer = styled.div`
  max-width: 180px;
  width: 100%;
  position: relative;
`;

const Title = styled.div`
  font-size: ${pxToRem(18)};
  font-family: "gordita_regular";
  font-weight: 600;
  color: #202939;
  margin-bottom: 6px;
  @media all and (max-width: 440px) {
    font-size: ${pxToRem(16)};
  }
`;

const Description = styled.div`
  font-size: ${pxToRem(16)};
  font-family: "gordita_regular";
  font-weight: 500;
  color: #697586;
  @media all and (max-width: 440px) {
    font-size: ${pxToRem(14)};
  }
`;

const DropDownBox = styled.button`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #eef2f6;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  span {
    font-size: ${pxToRem(16)};
    font-family: "gordita_regular";
    font-weight: 400;
    color: #364152;
    strong {
      font-family: "gordita_medium";
      font-weight: 500;
      font-size: ${pxToRem(16)};
      color: #364152;
    }
  }
  @media all and (max-width: 440px) {
    span {
      font-size: ${pxToRem(14)};

      strong {
        font-size: ${pxToRem(14)};
      }
    }
  }
`;

const DownIconBox = styled.div`
  width: 20px;
  height: 20px;
  img {
    width: 100%;
    display: block;
    filter: invert();
  }
`;

const LanguageContainer = styled.div`
  position: absolute;
  top: 45px;
  right: 0;
  z-index: 500 !important;
  max-width: 180px;
  max-height: 350px;
  overflow-y: scroll;
  width: 100%;
  border: 1px solid #eef2f6;
  background-color: #fff;
  border-radius: 8px;
  padding: 4px;
`;

const SelectedIcon = styled.div`
  width: 20px;
  height: 20px;
  img {
    width: 100%;
    height: 20px;
    display: inline-block;
  }
`;

const LanguageBox = styled.div`
  width: 100%;
  padding: 6px 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#f8fafc" : "transparent")};
  span {
    font-size: ${pxToRem(12)};
    font-family: "gordita_regular";
    font-weight: 400;
    color: #364152;
    strong {
      font-family: "gordita_medium";
      font-weight: 500;
      font-size: ${pxToRem(12)};
      color: #364152;
    }
  }
  &:hover {
    background-color: #f8fafc;
  }
`;
