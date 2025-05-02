import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { learnConfig } from "../../../../../axiosConfig";
import RequestLoader from "../../authentication/general/RequestLoader";

function ReportCommentModal({ isReport, setReport, isSelectedId, toast }) {
  const user_data = useSelector((state) => state.user_data);
  const { access_token } = user_data;
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [isReasons, setReasons] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const textareaRef = useRef(null);
  const middleSectionRef = useRef(null);

  const reasons = "Other";

  const fetchReasons = async () => {
    try {
      const response = await learnConfig.get(`/posts/list-reasons/`, {
        params: {},
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const { status_code, data } = response.data;

      if (status_code === 6000) {
        setReasons(data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
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
      formData.append("report_type", "post");

      const response = await learnConfig.post(
        `/posts/report-post/${isSelectedId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { status_code } = response.data;

      if (status_code === 6000) {
        setReport(false);
        setOtherReason("");
        setSelectedReason("");
        setLoading(true);
        toast.success("Post reported successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      setLoading(true);
      toast.warning("Post reported unsuccessful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <Backdrop isVisible={isReport} />
      <Container isVisible={isReport}>
        <Overlay>
          <InnerContainer>
            <CloseButton onClick={() => setReport(false)}>
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
                    <>
                      <ReasonItem>
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
                    </>
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
                <OtherReasonContainer isVisible={selectedReason === "Other"}>
                  <OtherReasonTextarea
                    ref={textareaRef}
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    placeholder="Please specify the reason"
                  />
                </OtherReasonContainer>
              </MiddleSection>
              <BottomSection>
                <ButtonContainer>
                  <CancelButton onClick={() => setReport(false)}>
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

export default ReportCommentModal;

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  backdrop-filter: blur(4px);
  z-index: 999;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s, visibility 0.3s;
  background: rgba(13, 18, 28, 0.6);
`;

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1000;
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
  width: 35vw;
  height: 65vh;
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
  @media (max-width: 980px) {
    width: 700px;
  }
  @media (max-width: 768px) {
    width: 560px;
  }
  @media (max-width: 640px) {
    width: 440px;
  }
  @media (max-width: 480px) {
    width: 350px;
  }
  @media (max-width: 360px) {
    width: 305px;
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
  right: 22px;
  top: 20px;

  img {
    display: block;
    width: 100%;
  }
  @media all and (max-width: 980px) {
    width: 15px;
    height: 15px;
  }
  @media all and (max-width: 480px) {
    width: 12px;
    height: 12px;
  }
  @media all and (max-width: 360px) {
    width: 10px;
    height: 10px;
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e3e8ef;
  padding: 24px;
`;

const Heading = styled.h2`
  color: #101828;
  font-size: 20px;
  font-family: "gordita_medium";
`;

const SubHeading = styled.h2`
  color: #101828;
  font-size: 20px;
  font-family: "gordita_medium";
  padding: 16px 24px 16px 24px;
`;

const MiddleSection = styled.div`
  padding: 0px 24px 16px 24px;
  overflow-y: auto;
`;

const ReasonList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ReasonItem = styled.li`
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  padding: 12px 0px;
`;

const RadioInput = styled.input`
  margin-right: 12px;
  cursor: pointer;
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #059664;
  border-radius: 50%;
  outline: none;

  &:checked {
    background-color: #059664;
    border: 2px solid #059664;
    box-shadow: inset 0 0 0 4px white;
  }
`;

const RadioLabel = styled.label`
  font-family: "gordita_medium";
  font-size: 16px;
  color: #344054;
  cursor: pointer;
`;

const OtherReasonContainer = styled.div`
  max-height: ${(props) => (props.isVisible ? "150px" : "0")};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
`;

const OtherReasonTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  background: #f8fafc;
  margin-top: 16px;
  padding: 12px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  font-family: "gordita_regular";
  font-size: 16px;
  resize: none;

  &:focus {
    outline: none;
    border-color: #059664;
  }
`;

const BottomSection = styled.div`
  padding: 24px;
  border-top: 1px solid #e3e8ef;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  font-family: "gordita_medium";
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
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
  min-width: 85px;

  &:hover {
    background-color: #048056;
  }
`;
