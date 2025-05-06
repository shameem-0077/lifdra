import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import closeIcon from "../../assets/images/close_button.svg";
import line from "../../assets/images/bottom_line.svg";
import { useSelector } from "react-redux";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { TimePicker } from "@mui/lab";
import TextField from "@mui/material/TextField";
import { serverConfig } from "../../axiosConfig";
import RequestLoader from "../learn/includes/authentication/general/RequestLoader";
function ScheduleModal({
  setModal,
  isModal,
  selectedId,
  setSelectedId,
  setSuccess,
  setSelectedDay,
  selectedDay,
}) {
  const user_data = useSelector((state) => state.user_data);
  const access_token = user_data.access_token;
  const [startValue, setStartValue] = useState(new Date());
  const [endValue, setEndValue] = useState(new Date());
  const [days, setDays] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // const days = [
  // 	{ id: 1, day: "Monday" },
  // 	{ id: 2, day: "Tuesday" },
  // 	{ id: 3, day: "Wednesday" },
  // 	{ id: 4, day: "Thursday" },
  // 	{ id: 5, day: "Friday" },
  // 	{ id: 6, day: "Saturday" },
  // 	{ id: 7, day: "Sunday" },
  // ];

  useEffect(() => {
    learnConfig
      .get(`/schedules/view-schedule/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        if (response.data.StatusCode === 6000) {
          setDays(response.data.data);
        } else if (response.data.StatusCode === 6001) {
          setDays(response.data.data);
        }
      })
      .catch((error) => {});
  }, []);

  const daySelection = (item) => {
    setSelectedDay(item.day);
    !selectedId.includes(item.id)
      ? setSelectedId([...selectedId, item.id])
      : setSelectedId(selectedId.filter((i) => i !== item.id));
  };

  let start = startValue;
  let start_utc = start.getTime() + start.getTimezoneOffset() * 60000;
  let start_nd = new Date(start_utc + 3600000 * +5.5);
  var start_ist = start_nd.toLocaleTimeString();

  let end = endValue;
  let end_utc = end.getTime() + end.getTimezoneOffset() * 60000;
  let end_nd = new Date(end_utc + 3600000 * +5.5);
  var end_ist = end_nd.toLocaleTimeString();

  const handleModal = () => {
    setModal((prev) => !prev);
  };

  const setSchedule = () => {
    if (start_ist != end_ist) {
      learnConfig
        .post(
          `/schedules/set-schedule/`,
          {
            day: selectedDay,
            from_time: start_ist,
            to_time: end_ist,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((response) => {
          const { StatusCode, data } = response.data;
          if (StatusCode === 6000) {
            setLoading(false);
            setModal((prev) => !prev);
            setSuccess(true);
          } else if (StatusCode === 6001) {
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  return (
    <BackContainer style={{ transform: isModal && "scale(1,1)" }}>
      <Overlay isModal={isModal}>
        <Modal
          onClick={() => {
            handleModal();
          }}
        >
          <Container>
            <Title>Set your schedule</Title>
            <CloseIconContainer onClick={() => setModal((prev) => !prev)}>
              <CloseIcon src={closeIcon} alt="close icon" />
            </CloseIconContainer>
            <Description>
              You're more likely to reach your goal if you dedicate some time in
              your schedule for learnig. Choose the day that works for you.
            </Description>
            <DaysList>
              {/* {day.map((item) => (
								<Day
									key={item.id}
									onClick={() => {
										daySelection(item);
									}}
									className={
										selectedId[selectedId.length - 1] ===
											item.id && "selected"
									}
								>
									{item.day.substring(0, 2)}
								</Day>
							))} */}
              {days &&
                days.map((data) => (
                  <Day
                    key={data.id}
                    onClick={() => {
                      // setModal((prev) => !prev);
                      daySelection(data.day);
                      setModal(false);
                      // setSelectedDay(data.day);
                    }}
                    className={selectedId.includes(data.id) && "active"}
                  >
                    {data.day.substring(0, 2)}
                  </Day>
                ))}
            </DaysList>
            <TimeTable>
              <TimeContainer>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    value={startValue}
                    onChange={(newValue) => {
                      setStartValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </TimeContainer>
              <Span>to</Span>
              <TimeContainer>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    value={endValue}
                    onChange={(newValue) => {
                      setEndValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </TimeContainer>
            </TimeTable>
            <ButtonsContainer>
              <Button onClick={() => setModal((prev) => !prev)}>Cancel</Button>
              <Button className="submit" onClick={() => setSchedule()}>
                {isLoading ? <RequestLoader /> : "Submit"}
              </Button>
            </ButtonsContainer>
            <LineContainer>
              <BottomLine src={line} alt="bottom line" />
            </LineContainer>
          </Container>
        </Modal>
      </Overlay>
    </BackContainer>
  );
}

export default ScheduleModal;

const BackContainer = styled.div`
  position: fixed;
  transition: 0.3s;
  transform: scale(0, 0);
  width: 100%;
  height: 100%;
  z-index: 1000;
  left: 0;
  top: 0px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
`;
const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0px;
  width: 100%;
  height: 100%;
`;
const Modal = styled.div`
  width: 550px;
  max-height: 90vh;
  overflow: hidden;
  background: #fff;
  background-position: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  padding: 30px;
  border-radius: 5px;
  transition: 0.5s;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  @media all and (max-width: 980px) {
    width: 500px;
  }
  @media all and (max-width: 768px) {
    width: 450px;
  }
  @media all and (max-width: 640px) {
    width: 400px;
  }
  @media all and (max-width: 480px) {
    width: 355px;
    padding: 30px 15px;
  }
  @media all and (max-width: 360px) {
    width: 300px;
  }
  position: relative;
`;
const Container = styled.div``;
const Title = styled.h4`
  font-family: "gordita_medium";
  color: #484848;
  font-size: 20px;
  padding-bottom: 30px;
  border-bottom: 1px solid #70707040;
`;
const CloseIconContainer = styled.span`
  display: block;
  width: 16px;
  position: absolute;
  cursor: pointer;
  top: 40px;
  right: 40px;
  @media all and (max-width: 480px) {
    top: 25px;
    right: 25px;
  }
`;
const CloseIcon = styled.img`
  width: 100%;
  display: block;
`;
const Description = styled.p`
  font-family: "gordita_regular";
  max-width: 90%;
  margin-top: 20px;
  color: #57656b;
  font-size: 14px;
  @media all and (max-width: 480px) {
    font-size: 12px;
  }
`;
const DaysList = styled.ul`
  margin-top: 15px;
  display: flex;
  align-items: center;
`;
const Day = styled.li`
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid #dddddd;
  font-family: "gordita_medium";
  font-size: 14px;
  color: #515b63;
  margin-right: 8px;
  text-transform: capitalize;
  /* cursor: pointer; */
  &:last-child {
    margin-right: 0px;
  }
  /* &.selected {
		border: 1px solid #08bd80;
		background: #08bd80;
		color: #fff;
	} */
  &.active {
    border: 1px solid #3fbd7f;
    background-color: #3fbd7f;
    color: #fff;
  }
  @media all and (max-width: 480px) {
    font-size: 12px;
    margin-right: 5px;
    width: 35px;
    height: 35px;
    min-width: 35px;
    min-height: 35px;
  }
  @media all and (max-width: 360px) {
    margin-right: 3px;
    width: 32px;
    height: 32px;
    min-width: 32px;
    min-height: 32px;
  }
`;
const TimeTable = styled.div`
  margin-top: 23px;
  display: flex;
  align-items: center;
`;
const TimeContainer = styled.div`
  width: 115px;
  color: #57656b;
  height: 40px;
  border-radius: 4px;
  font-family: "gordita_medium";
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Span = styled.span`
  margin: 0 10px;
  font-family: "gordita_medium";
  font-size: 14px;
`;
const ButtonsContainer = styled.div`
  margin: 40px 0 20px;
  display: flex;
  justify-content: end;
`;
const Button = styled.span`
  display: inline-block;
  width: 130px;
  height: 40px;
  color: #57656b;
  height: 40px;
  border: 1px solid #57656b;
  border-radius: 4px;
  font-family: "gordita_medium";
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  &.submit {
    margin-right: 0px;
    color: #fff;
    border: 1px solid #08bd80;
    background: #08bd80;
  }
`;
const LineContainer = styled.span`
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
`;
const BottomLine = styled.img`
  display: block;
  width: 100%;
`;
