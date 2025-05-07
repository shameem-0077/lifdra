import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { serverConfig } from "../../../axiosConfig";
import RequestLoader from "../../authentications/components/RequestLoader";
import useUserStore from "../../../store/userStore";

function ReportModal({
  isReport,
  setReport,
  isSelectedId,
  isOptions,
  setOptions,
  setSelectedId,
  toast,
}) {
  const { loginData } = useUserStore();
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [isReasons, setReasons] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const textareaRef = useRef(null);
  const middleSectionRef = useRef(null);

  const reasons = "Other";

  const handleClose = () => {
    setReport(false);
    setOptions(false);
    setOtherReason("");
    setSelectedReason("");
  };

  const fetchReasons = async () => {
    try {
      const response = await serverConfig.get(`api/v1/posts/list-reasons/`, {
        params: {},
        headers: {
          Authorization: `Bearer ${loginData?.accessToken}`,
        },
      });
      const { status_code, data } = response.data;

      if (status_code === 6000) {
        setReasons(data);
      }
    } catch (error) {
      console.error("Error fetching reasons:", error);
    }
  };

  useEffect(() => {
    fetchReasons();
  }, [isReport]);

  useEffect(() => {
    if (selectedReason === "Other" && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedReason]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("note", otherReason);
      formData.append(
        "report_category",
        selectedReason === "Other" ? "" : selectedReason
      );
      formData.append("report_type", isOptions ? "comment" : "post");

      const postId = isOptions || isSelectedId;
      if (!postId) {
        throw new Error("No valid post ID provided");
      }
      const response = await serverConfig.post(
        `api/v1/posts/report-post/${postId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${loginData?.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { status_code, message } = response.data;

      if (status_code === 6000) {
        setReport(false);
        setOtherReason("");
        setSelectedReason("");
        setSelectedId("");
        setLoading(false);
        setOptions(false);
        toast.success(message?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.warn(message?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error reporting post:", error);
      setLoading(false);
      toast.error("Failed to report post", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setSelectedId("");
      setOptions(false);
    }
  };

  return (
    <>
      <Backdrop isVisible={isReport} />
      <Container isVisible={isReport}>
        <Overlay>
          <InnerContainer>
            <CloseButton onClick={() => handleClose()}>
              <img
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-09-2024/cross-icon.svg"
                alt="close"
              />
            </CloseButton>
            <ContentSection>
              <TopSection>
                <Heading>Report</Heading>
              </TopSection>
              <SubHeading>Why are you reporting this post?</SubHeading>
              <MiddleSection ref={middleSectionRef}>
                <ReasonList>
                  {isReasons?.map((item, index) => (
                    <ReasonItem key={index}>
                      <RadioInput
                        type="radio"
                        id={`reason-${index}`}
                        name="report-reason"
                        value={item?.id}
                        checked={selectedReason === item?.id}
                        onChange={(e) => setSelectedReason(e.target.value)}
                      />
                      <RadioLabel htmlFor={`reason-${index}`}>
                        {item?.title}
                      </RadioLabel>
                    </ReasonItem>
                  ))}
                  <ReasonItem>
                    <RadioInput
                      type="radio"
                      id={`reason-${reasons}`}
                      name="report-reason"
                      value={reasons}
                      checked={selectedReason === reasons}
                      onChange={(e) => setSelectedReason(e.target.value)}
                    />
                    <RadioLabel htmlFor={`reason-${reasons}`}>
                      {reasons}
                    </RadioLabel>
                  </ReasonItem>
                </ReasonList>
                {selectedReason === "Other" && (
                  <TextArea
                    ref={textareaRef}
                    placeholder="Please specify the reason..."
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                  />
                )}
              </MiddleSection>
              <BottomSection>
                <ButtonContainer>
                  <CancelButton onClick={() => handleClose()}>
                    Cancel
                  </CancelButton>
                  <SubmitButton onClick={handleSubmit}>
                    {isLoading ? <RequestLoader height={24} /> : "Submit"}
                  </SubmitButton>
                </ButtonContainer>
              </BottomSection>
            </ContentSection>
          </InnerContainer>
        </Overlay>
      </Container>
    </>
  );
}

export default ReportModal;

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  backdrop-filter: blur(4px);
  z-index: 2000;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s, visibility 0.3s;
  background: rgba(13, 18, 28, 0.6);
`;

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 2001;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s, visibility 0.3s;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0px;
  width: 100%;
  height: 100vh;
`;

const InnerContainer = styled.div`
  width: 90%;
  max-width: 500px;
  /* height: 80vh; */
  margin: 0 auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  border-radius: 10px;
  transition: 0.5s;
  z-index: 101;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    width: 70%;
    max-width: 500px;
  }

  @media (min-width: 1440px) {
    width: 60%;
    max-width: 600px;
  }

  @media (min-width: 2560px) {
    width: 50%;
    max-width: 700px;
  }
`;

const ContentSection = styled.div`
  background: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CloseButton = styled.div`
  height: 20px;
  width: 20px;
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 15px;

  img {
    display: block;
    width: 100%;
  }

  @media (min-width: 768px) {
    right: 20px;
    top: 20px;
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e3e8ef;
  padding: 16px;

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

const Heading = styled.h2`
  color: #101828;
  font-size: 18px;
  font-family: "gordita_medium";

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const SubHeading = styled.h2`
  color: #101828;
  font-size: 16px;
  font-family: "gordita_medium";
  padding: 12px 16px;

  @media (min-width: 768px) {
    font-size: 18px;
    padding: 16px 24px;
  }
`;

const MiddleSection = styled.div`
  padding: 0px 16px 16px;
  overflow-y: auto;

  @media (min-width: 768px) {
    padding: 0px 24px 16px;
  }
`;

const ReasonList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ReasonItem = styled.li`
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  padding: 10px 0px;

  @media (min-width: 768px) {
    padding: 12px 0px;
  }
`;

const RadioInput = styled.input`
  margin-right: 10px;
  cursor: pointer;
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #059664;
  border-radius: 50%;
  outline: none;

  &:checked {
    background-color: #059664;
    border: 2px solid #059664;
    box-shadow: inset 0 0 0 3px white;
  }

  @media (min-width: 768px) {
    width: 20px;
    height: 20px;
    margin-right: 12px;
  }
`;

const RadioLabel = styled.label`
  font-family: "gordita_medium";
  font-size: 14px;
  color: #344054;
  cursor: pointer;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 80px;
  background: #f8fafc;
  margin-top: 12px;
  padding: 10px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  font-family: "gordita_regular";
  font-size: 14px;
  resize: none;

  &:focus {
    outline: none;
    border-color: #059664;
  }

  @media (min-width: 768px) {
    height: 100px;
    margin-top: 16px;
    padding: 12px;
    font-size: 16px;
  }
`;

const BottomSection = styled.div`
  padding: 16px;
  border-top: 1px solid #e3e8ef;

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  @media (min-width: 768px) {
    gap: 12px;
  }
`;

const Button = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  font-family: "gordita_medium";
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  @media (min-width: 768px) {
    padding: 10px 16px;
  }
`;

const CancelButton = styled(Button)`
  background-color: #ffffff;
  color: #344054;
  border: 1px solid #d0d5dd;

  &:hover {
    background-color: #f9fafb;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #059664;
  color: #ffffff;
  border: none;
  min-width: 75px;

  &:hover {
    background-color: #048056;
  }

  @media (min-width: 768px) {
    min-width: 85px;
  }
`;
