import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { getDateStrWithoutReplace } from "../../../../../helpers/functions";

function DayPickModal({
  isDayModal,
  setDayModal,
  activeDay,
  setActiveDay,
  dayNumber,
  setDayNumber,
  setDataDays,
  dataDays,
  setActiveDayId,
  activeDayId,
  dateIndex,
}) {
  ///dont remove these
  const dispatch = useDispatch();

  const [scrollDay, setScrollday] = useState("");
  const { current_day_id, user_profile } = useSelector((state) => state);
  const [openDays, setOpenDays] = useState(0);
  let today = new Date();
  var getDaysArray = function (s, e) {
    for (
      var a = [], d = new Date(s);
      d <= new Date(e);
      d.setDate(d.getDate() + 1)
    ) {
      a.push(new Date(d));
    }
    return a;
  };
  var daylist = getDaysArray(new Date("2021-04-23"), new Date("2021-07-01"));

  const Days = daylist.map((data, i) => (
    <DayCard
      key={i}
      className={activeDay === i + 1 && "active"}
      onClick={() => setActiveDay(i + 1)}
    >
      <Top>
        <p>Day</p>
        <h6>{i + 1}</h6>
      </Top>
      <Bottom>{getDateStrWithoutReplace(data)}</Bottom>
    </DayCard>
  ));
  useEffect(() => {
    setOpenDays(dataDays.length > 0 ? dataDays[dataDays.length - 1]?.day : 0);
  }, [dataDays]);

  const focusDay = (id) => {
    let elem = document.getElementById(id);
    elem &&
      elem.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
  };

  useEffect(() => {
    setTimeout(() => {
      focusDay(activeDayId);
    }, 2000);
  }, [activeDayId]);

  const updateCurrentDayData = (id, day) => {
    dispatch({
      type: "UPDATE_CURRENT_DAY",
      current_day_id: id,
      current_day_number: day,
    });
  };
  const totalDays = dataDays?.program_details?.program_days;

  return (
    <>
      {" "}
      <Overlay
        style={{
          visibility: isDayModal && "visible",
        }}
      ></Overlay>
      <Container
        style={{
          visibility: isDayModal && "visible",
          opacity: isDayModal && 1,
        }}
      >
        <DayPickSection>
          <TopSection>
            <Heading>Pick your class day</Heading>
            <CancelDiv onClick={() => setDayModal(false)}>
              <CancelImg
                src={require("../../../../../../assets/images/new-dashboard/modal/cancel.png")}
              />
            </CancelDiv>
          </TopSection>
          <BottomSection>
            <CardSection>
              {Array.from({ length: totalDays }).map((_, index) => {
                const dayNumber = index + 1;
                const dayData = dataDays?.student_days?.find(
                  (item) => item.day_number === dayNumber
                );

                if (dayData) {
                  return (
                    <DayCard
                      key={dayData.id}
                      onClick={() => {
                        updateCurrentDayData(
                          dayData.day_pk,
                          dayData.day_number
                        );
                        setActiveDayId(dayData.day_pk);
                        focusDay(dayData.id);
                        setDayModal(false);
                      }}
                      id={dayData.id}
                      className={
                        current_day_id === dayData.day_pk ? "active" : ""
                      }
                    >
                      <span
                        style={{
                          fontFamily: "gordita_regular",
                          color: "#3E3E3E99",
                          fontSize: "14px",
                        }}
                      >
                        Day
                      </span>{" "}
                      <span style={{ fontSize: "20px" }}>{dayNumber}</span>
                    </DayCard>
                  );
                } else {
                  return (
                    <DayCardLock key={index}>
                      <span style={{ fontSize: "14px" }}>Day</span> <br />
                      {dayNumber}
                    </DayCardLock>
                  );
                }
              })}

              {/* {comingSoon} */}
            </CardSection>
          </BottomSection>
        </DayPickSection>
      </Container>
    </>
  );
}

export default DayPickModal;
const Container = styled.div`
  position: fixed;
  transition: 0.3s;
  visibility: hidden;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  left: 0;
  top: 0px;
  display: block;
  opacity: 0;
`;
const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  top: 0px;
  width: 100%;
  height: 100vh;
  visibility: hidden;
  z-index: 1000;
  /* transition: all 0.2s ease; */
`;
const DayCardLock = styled.span`
  background: #f8fbf4;
  border-radius: 6px;
  padding: 15px 5px;
  font-family: "gordita_medium";
  cursor: not-allowed;
  transition: all 0.3s ease;
  color: #3e3e3e33;
`;
const DayPickSection = styled.div`
  width: 95%;
  max-width: 95%;
  max-height: 90vh;
  overflow: hidden;
  margin: 0 auto;
  transition: 0.2s;
  background: #fff;
  left: 50%;
  top: 50%;
  position: absolute;
  padding: 50px;
  border-radius: 5px;

  z-index: 101;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  transform: translate(-50%, -50%);
  opacity: 1;
  @media all and (max-width: 1280px) {
    padding: 30px 20px;
  }
`;
const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(212, 212, 212, 0.3);
  align-items: center;
  padding-bottom: 20px;
`;
const Heading = styled.h3`
  font-family: "gordita_medium";
  font-size: 18px;
  color: #4b4c4a;
`;
const CancelDiv = styled.div`
  width: 20px;
  max-width: 20px;
  cursor: pointer;
  @media all and (max-width: 360px) {
    width: 15px;
  }
`;
const CancelImg = styled.img`
  display: block;
  width: 100%;
`;
const BottomSection = styled.div`
  /* padding: 30px 0 40px 0; */
  @media all and (max-width: 480px) {
    padding: 10px 0;
  }
`;
const CardSection = styled.div`
  display: grid;
  padding: 10px 0 60px 0;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 10px;
  text-align: center;
  max-height: calc(90vh - 180px);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media all and (max-width: 1280px) {
    grid-template-columns: repeat(10, 1fr);
  }
  @media all and (max-width: 1080px) {
    grid-template-columns: repeat(9, 1fr);
  }
  @media all and (max-width: 980px) {
    grid-template-columns: repeat(7, 1fr);
  }
  @media all and (max-width: 768px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media all and (max-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media all and (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5px;
  }
  @media all and (max-width: 360px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media all and (max-width: 320px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const DayCard = styled.div`
  background: #f8fbf4;
  border-radius: 6px;
  padding: 15px 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "gordita_medium";
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  span {
    display: block;
    font-family: "gordita_medium";
    width: 100%;
    color: #989996;
  }
  &.active {
    background: #0fa76f;
    span {
      color: #fff !important;
    }
    h6 {
      color: #fff;
      font-family: "gordita_medium";
    }
    p {
      color: #fff;
      font-family: "gordita_medium";
    }
    div {
      color: #fff;
    }
  }
  &.disable {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover {
    background: #0fa76f;
    h6 {
      color: #fff;
    }
    p {
      color: #fff;
    }
    span {
      color: #fff !important;
    }
    div {
      border-bottom: 1px solid #fff;
    }
  }
  @media all and (max-width: 1081px) {
    padding: 12px 8px;
  }
  @media all and (max-width: 768px) {
    padding: 12px 6px;
  }
  @media all and (max-width: 320px) {
    padding: 12px 4px;
  }
`;
const Top = styled.div`
  margin-bottom: 5px;
  border-bottom: 1px solid #ffffff;
  transition: all 0.3s ease;
  h6 {
    color: #3e3e3ee5;
    font-size: 18px;
    font-family: "gordita_medium";
    transition: all 0.3s ease;
  }
  p {
    color: #3e3e3ee5;
    font-family: "gordita_regular";
    font-size: 12px;
    margin-bottom: 5px;
    transition: all 0.3s ease;
  }
`;

const Bottom = styled.span`
  color: #007a5eb2;
  font-size: 12px;
  font-family: "gordita_regular";
  transition: all 0.3s ease;
  @media all and (max-width: 1280px) {
    font-size: 11px;
  }
`;
