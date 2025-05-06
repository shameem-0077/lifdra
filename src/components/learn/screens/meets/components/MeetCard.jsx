import React, { useState } from "react";
import styled from "styled-components";
import {
  calender,
  nanodegreeCardBgImg,
  verifedTick,
} from "../../../../../assets/icons/styep 3.0/icons";
import Seats from "./Seats";
import MeetMessage from "../components/MeetMessage";
import { meetCardsData } from "../test";
import MeetButton from "../../../includes/meet/MeetButton";
import { useSelector } from "react-redux";
import { serverConfig } from "../../../../../axiosConfig";
import { ZoomMtg } from "@zoom/meetingsdk";

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

const MeetCard = ({ datas, setShowSuccessModal }) => {
  const [loadingStates, setLoadingStates] = useState({});
  const [isButtonLoader, setButtonLoader] = useState(false);

  const user_data = useSelector((state) => state.user_data);

  var authEndpoint = `https://learn.steyp.com/api/v1/events/zoom-signature/`;
  var sdkKey = "gqikImZzRJekVXQ36gLnlw";
  var role = 0;
  var userName = user_data?.name;
  var userEmail = "";
  var registrantToken = "";
  var zakToken = "";
  // var leaveUrl = "https://steyp.com/meet/";
  var leaveUrl = window.location.origin + "/meet";


  function getSignature(data) {
    var url =
      authEndpoint + "?meet_id=" + data.zoom_meeting_id + "&role=" + role;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_data.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        startMeeting(response.data.signature, data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function startMeeting(signature, data) {
    document.getElementById("zmmtg-root").style.display = "block";

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      patchJsMedia: true,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: data.zoom_meeting_id,
          passWord: data.zoom_meeting_password,
          userName: userName,
          userEmail: userEmail,
          tk: registrantToken,
          zak: zakToken,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  const submitData = (id) => {
    // setButtonLoader(true);
    const { access_token } = user_data;
    if (id) {
      learnConfig
        .post(
          `events/register/${id}/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((response) => {
          const { status_code } = response.data;
          if (status_code === 6000) {
            setShowSuccessModal(true);
            // setButtonLoader(false);
          } else {
            // setButtonLoader(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const Onsubmit = (id) => {
    const { access_token } = user_data;
    if (id) {
      learnConfig
        .post(
          `events/participate/${id}/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((response) => {
          const { status_code, data } = response.data;
          if (status_code === 6000) {
            // setShowSuccessModal(true);
            getSignature(data);
            // setButtonLoader(false);
          } else {
            // setButtonLoader(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleClick = (id, status) => {
    if (status === "upcoming") {
      setLoadingStates((prevStates) => ({
        ...prevStates,
        [id]: true,
      }));
    }
    submitData(id);
  };

  const handleForJoin = (id, status) => {
    if (status === "started") {
      setLoadingStates((prevStates) => ({
        ...prevStates,
        [id]: true,
      }));
    }
    Onsubmit(id);
  };

  if (!datas) {
    return null;
  }
  //   console.log(datas);

  // const [data, setData]=useState(datas)

  // console.log(data);
  const {
    id,
    cover_image,
    total_seats,
    total_registrations,
    status,
    title,
    month,
    day,
    time,
    is_participable,
    is_registered,
  } = datas;


  //   const { total_seats, total_registrations, status, title, month, day, time } =
  //     data;
  //   let month = "Oct";
  //   let day = "14";
  //   let time = "Mon 06:40 AM";
  //   let title = "AI and Machine Learning for Beginners";

  const getFullMonth = (monthAbbr) => {
    const date = new Date(`${monthAbbr} 1`);
    return date.toLocaleString("default", { month: "long" });
  };

  const getDayName = (date) => {
    return date.toLocaleString("default", { weekday: "long" });
  };

  const fullMonth = getFullMonth(month);

  const timeString = time.split(" ")[1] + " " + time.split(" ")[2];

  const currentYear = new Date().getFullYear();

  const dateTime = new Date(`${month} ${day}, ${currentYear} ${timeString}`);

  const dayName = getDayName(dateTime);

  const formattedTime = dateTime.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  let widthKeeper = window.innerWidth;

  let displayText;

  switch (true) {
    // case (widthKeeper <= 500):
    //   displayText = `${month} ${day}, ${time}`;
    //   break;
    // case (widthKeeper <= 768):
    //   displayText = `${month} ${day}, ${dayName}`;
    //   break;
    case widthKeeper <= 1024:
      displayText = `${month} ${day}, ${dayName}, ${formattedTime}`;
      break;
    default:
      displayText = `${month} ${day}, ${dayName}, ${formattedTime}`;
      break;
  }

  return (
    <>
      <MainCardContainer>
        <div>
          <ImgContainer>
            <img src={cover_image} alt="Image_Banner" />
            {status === "started" && (
              <LiveContainer>
                <span />
                Live now
              </LiveContainer>
            )}
          </ImgContainer>
        </div>

        <Right>
          <TimeAndDate>
            <img src={calender} alt="Image_Banner" />
            <p>
              {month} {day}, {dayName}, {formattedTime}
            </p>
          </TimeAndDate>

          <Title>{title}</Title>

          <Container>
            {status === "cancelled" ? (
              null
            ) : (
              <Seats
                totalSeats={total_seats}
                totalRegistrations={total_registrations}
              />
            )}

            <div>
              {status === "cancelled" ? (
                <MeetMessage message={'This meet has been canceled. We apologize for any inconvenience.'}/>
              ) : is_participable && status === "started" ? (
                <MeetButton
                  onClick={() => handleForJoin(id, status)}
                  setButtonLoader={setButtonLoader}
                  isButtonLoader={loadingStates[id]}
                  condition={status}
                />
              ) : is_registered ? (
                <MeetButton condition={"registrated"} />
              ) : (
                // total_seats === total_registrations ? (
                //   <MeetButton condition={"closed"} />
                // ) :
                // (is_registered === false && status === "started") ||
                //   "upcoming" ? (
                //   <MeetButton
                //     onClick={() => handleClick(id, status)}
                //     setButtonLoader={setButtonLoader}
                //     isButtonLoader={loadingStates[id]}
                //     condition={"upcoming"}
                //   />
                // ) :
                <MeetButton
                  onClick={() => handleClick(id, status)}
                  setButtonLoader={setButtonLoader}
                  isButtonLoader={loadingStates[id]}
                  condition={status}
                  isRegistered={is_registered}
                />
              )}
            </div>
            {/* <MeetButton
              onClick={() => handleClick(id, status)}
              setButtonLoader={setButtonLoader}
              isButtonLoader={loadingStates[id]}
              condition={status}
            /> */}
          </Container>
        </Right>
      </MainCardContainer>
    </>
  );
};

export default MeetCard;

const pxToRem = (px) => `${(px / 14).toFixed(2)}rem`;

const MainCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1.6px solid #e3e8ef;
  background-color: #fcfcfd;
  border-radius: 16px;
  padding: 10px 10px 16px 10px;
  font-size: 14px !important;

  /* overflow: hidden; */
  transition: all 0.3s ease-in-out;

  @media (max-width: 649px) {
    flex-direction: row;
  }
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const ImgContainer = styled.div`
  position: relative;
  border-radius: 8px;
  position: relative;
  width: 100%;
  /* height: 167.63px; */
  overflow: hidden;
  /* @media (max-width: 1023px) {
    width: 80px;
    height: 80px;
  } */
  @media (max-width: 649px) {
    width: 42vw;
    /* height: 154px; */
  }
  @media (max-width: 500px) {
    width: 100%;
    /* height: 167.63px; */
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
`;

const TimeAndDate = styled.div`
  display: flex;
  gap: 4px;
  border: 1px solid #e3e8ef;
  background-color: #eef2f6;
  padding: 8px 16px 4px 8px;
  border-radius: 10px;
  align-items: center;

  img {
    display: block;
  }
  p {
    font-family: "gordita_medium" !important;
    /* font-size: ${pxToRem(12)} !important; */
    font-size: 12px !important;
    color: #364152;
    margin: 0 !important;
  }
`;

const Title = styled.h4`
  flex-grow: 1;
  font-family: "gordita_medium";
  /* font-size: ${pxToRem(16)} !important; */
  font-size: 16px !important;
  color: #202939;
  margin: 0 !important;

  @media (max-width: 1023px) {
    font-size: ${pxToRem(14)};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Right = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 8px;
  padding-right: 8px;
`;

const LiveContainer = styled.div`
  position: absolute;
  top: 6px;
  left: 8px;
  display: flex;
  gap: 4px;
  align-items: center;
  width: fit-content;
  padding: 2px 8px;
  color: #364152;
  font-family: "gordita_medium";
  font-size: ${pxToRem(12)};
  background-color: #f8fafc;
  border: 1px solid #e3e8ef;
  border-radius: 24px;

  span {
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background-color: #d92d20;
    padding: 2px;
  }
`;
