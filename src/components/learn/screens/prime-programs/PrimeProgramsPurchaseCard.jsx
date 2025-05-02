import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { secondsTohm } from "../../../helpers/functions";
import loader from "../../../../assets/lotties/modal/buttonloader.json";
import Lottie from "react-lottie";
import { useSelector } from "react-redux";
import { primeprogramsConfig } from "../../../../axiosConfig";
import PlaceHolder from "../../../general/PlaceHolder";

const PrimeProgramsPurchaseCard = ({ item, isButtonLoading }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isStartNowLoading, setStartNowLoading] = useState(false);
  const { user_data } = useSelector((state) => state);
  const { prime_program_subscription } = useSelector(
    (state) => state.user_profile
  );
  const history = useHistory();

  function StartCourse() {
    const access_token = user_data.access_token;
    setStartNowLoading(true);
    primeprogramsConfig
      .get(`learning/start-course/${item.id}/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const { StatusCode, data } = response.data;
        if (StatusCode === 6000) {
          history.push(`/prime-programs/${item.slug}/${item.first_topic}/`);
          setStartNowLoading(false);
        } else if (StatusCode === 6001) {
          setStartNowLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setStartNowLoading(false);
      });
  }

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: loader,
    rendererSettings: {},
  };

  function onLoad() {
    setIsLoading(false);
  }
  return (
    <StudCard>
      <PlaceHolder isLoading={isLoading} paddingTop="55.34%" />
      <CardTop style={{ display: isLoading ? "none" : "block" }}>
        <CardImage onLoad={onLoad} src={item.cover_image} alt="Image" />
      </CardTop>

      <CardMiddle>
        <Course>{item.name}</Course>
        <LessonInfo>
          <LessonCont>
            <LessonIcon className="las la-layer-group"></LessonIcon>
            <LessonText>{item.lessons_count} Lessons</LessonText>
          </LessonCont>
          <TimeCont>
            <TimeIcon className="las la-clock"></TimeIcon>
            <TimeText>{secondsTohm(item.duration)}</TimeText>
          </TimeCont>
        </LessonInfo>
        <DivBtm>{item.short_description}</DivBtm>
      </CardMiddle>
      <CardBottom grid={item.certificate_id ? "1fr 1fr" : "1fr"}>
        {item.certificate_id && (
          <CertificateButton to={`/certificate/?id=${item.certificate_id}`}>
            <ButtonText>Certificate</ButtonText>
            <DownloadIcon
              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/04-08-2021/green-download.svg
                            "
              alt="Download"
            />
          </CertificateButton>
        )}
        {prime_program_subscription?.is_subscription &&
        !prime_program_subscription?.is_expired &&
        !item.is_started ? (
          <TextCont onClick={StartCourse}>
            {isStartNowLoading ? (
              <Lottie options={defaultOptions} height={45} width={45} />
            ) : (
              "Start"
            )}
          </TextCont>
        ) : item.is_started && !item.is_completed ? (
          <Button
            to={`/prime-programs/${item.slug}/${
              item.current_topic ? item.current_topic : item.first_topic
            }/`}
          >
            {isStartNowLoading ? (
              <Lottie options={defaultOptions} height={45} width={45} />
            ) : (
              "Continue"
            )}
          </Button>
        ) : item.is_completed ? (
          <Button
            to={`/prime-programs/${item.slug}/${
              item.current_topic ? item.current_topic : item.first_topic
            }/`}
          >
            {isStartNowLoading ? (
              <Lottie options={defaultOptions} height={45} width={45} />
            ) : (
              "Continue"
            )}
          </Button>
        ) : (
          <Button
            to={`/prime-programs/${item.slug}/${
              item.current_topic ? item.current_topic : item.first_topic
            }/`}
          >
            {isStartNowLoading ? (
              <Lottie options={defaultOptions} height={45} width={45} />
            ) : (
              "Continue"
            )}
          </Button>
        )}
      </CardBottom>
    </StudCard>
  );
};

export default PrimeProgramsPurchaseCard;

const Button = styled(Link)`
  background-color: #0fa76f;
  font-family: "gordita_medium";
  cursor: pointer;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  @media (max-width: 640px) {
    font-size: 16px;
    height: 37px;
    width: 122px;
  }
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const StudCard = styled.div`
  padding: 15px 15px;
  background: #f9f9fb;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: fade 300ms ease-in-out 0ms;
  @keyframes fade {
    0% {
      opacity: 0;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  &:hover {
    opacity: 1 !important;
  }
`;
const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CardImage = styled.img`
  display: block;
  width: 100%;
`;
const CardMiddle = styled.div``;
const Course = styled.h2`
  cursor: pointer;
  font-size: 15px;
  margin: 10px 0 11px 0;
  font-family: "gordita_medium";
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -ms-box-orient: vertical;
  box-orient: vertical;
  -webkit-line-clamp: 2;
  -moz-line-clamp: 2;
  -ms-line-clamp: 2;
  line-clamp: 2;

  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  @media (max-width: 640px) {
    font-size: 18px;
  }
`;
const DivBtm = styled.p`
  width: 100%;
  height: 67px;
  word-break: break-word;
  font-size: 13px;
  font-family: "gordita_regular";
  color: #737070ad;
  margin: 10px 0 10px 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -ms-box-orient: vertical;
  box-orient: vertical;
  -webkit-line-clamp: 5;
  -moz-line-clamp: 5;
  -ms-line-clamp: 5;
  line-clamp: 5;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;
const LessonInfo = styled.div`
  display: flex;
  align-self: center;
`;
const LessonCont = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;
const LessonIcon = styled.span`
  font-size: 19px;
`;
const LessonText = styled.p`
  font-size: 13px;
  margin-left: 3px;
  font-family: "gordita_medium";
  color: #737070ad;
`;
const TimeCont = styled.div`
  margin-left: 5px;
  display: flex;
`;
const TimeIcon = styled.span`
  font-size: 19px;
`;
const TimeText = styled.p`
  font-size: 12px;
  margin-left: 5px;
  font-family: "gordita_medium";
  color: #737070ad;
  align-self: flex-end;
`;
const CardBottom = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.grid};
  grid-gap: 10px;
`;
const TextCont = styled.div`
  background-color: #0fa76f;
  font-family: "gordita_medium";
  cursor: pointer;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  height: 45px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 640px) {
    font-size: 16px;
    height: 37px;
    width: 122px;
  }
  @media (max-width: 480px) {
    font-size: 15px;
  }
`;
const CertificateButton = styled(Link)`
  border: 1px solid #0fa76f;
  font-family: "gordita_medium";
  cursor: pointer;
  border-radius: 5px;
  color: #0fa76f;
  font-size: 16px;
  height: 45px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 640px) {
    font-size: 16px;
    height: 37px;
    width: 122px;
  }
`;
const ButtonText = styled.span`
  margin-right: 5px;
`;
const DownloadIcon = styled.img`
  display: block;
`;
