import React, { useEffect, useState } from "react";
import styled from "styled-components";
import bg from "../../../../../assets/images/new-dashboard/yourgoal-bg.png";
import { serverConfig } from "../../../../../axiosConfig";
import { useSelector } from "react-redux";

function SetYourGoal({
    setModal,
    setSelectedDay,
    setSheduledFromTime,
    setSheduledEndTime,
    setActive,
    isModal,
}) {
    let [day, setDays] = useState([]);
    const user_data = useSelector((state) => state.user_data);
    const access_token = user_data.access_token;

    const sheduledTime = () => {};
    useEffect(() => {
        learnConfig
            .get(`/schedules/view-schedule/`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((response) => {
                const { StatusCode, data } = response.data;
                if (StatusCode === 6000) {
                    setDays([]);
                    setDays(data);
                    if (data.is_scheduled) {
                        setActive(true);
                    }
                } else if (StatusCode === 6001) {
                    // setDays(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [isModal]);
    // console.log(active, "active state printing");
    // const daySelection = (data) => {
    // 	!selectedId.includes(data.id)
    // 		? setSelectedId([...selectedId, data.id])
    // 		: setSelectedId(selectedId.filter((i) => i !== data.id));
    // };

    return (
        <Container>
            <GoalSection>
                <Top>
                    {" "}
                    <TitleLabel>Set your goal</TitleLabel>
                    <Description>
                        You're more likely to reach our goal if you decide some
                        time in your schedule for learning choose the day that
                        works for you.
                    </Description>
                </Top>
                <DaysContainer>
                    {day.map((data, i) => (
                        <Day
                            key={i}
                            onClick={() => {
                                setModal(true);

                                setSelectedDay(data);
                                data.is_scheduled_temp = true;
                            }}
                            className={
                                data.is_scheduled || data.is_scheduled_temp
                                    ? "active"
                                    : ""
                            }
                        >
                            {data.day.substring(0, 2)}
                        </Day>
                    ))}
                </DaysContainer>
            </GoalSection>
        </Container>
    );
}

export default SetYourGoal;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    background: url(${bg}) no-repeat;
    background-size: cover;
    background-position: left bottom;
    @media all and (max-width: 980px) {
        width: 100%;
    }
`;

const GoalSection = styled.div`
    border: 1px solid #e4e4e4;
    border-radius: 5px;
    padding: 20px;
    @media all and (max-width: 640px) {
        padding: 15px;
    }
    @media all and (max-width: 480px) {
        padding: 10px;
    }
`;

const TitleLabel = styled.h3`
    font-family: gordita_medium;
    font-size: 18px;
    margin-bottom: 10px;
    color: #4d4d4d;
    @media all and (max-width: 360px) {
        font-size: 16px;
    }
`;

const Description = styled.p`
    font-size: 15px;
    font-family: gordita_regular;
    @media all and (max-width: 640px) {
        font-size: 13px;
    }
`;

const Top = styled.div`
    margin-bottom: 30px;
    @media all and (max-width: 640px) {
        margin-bottom: 10px;
    }
`;

const DaysContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const Day = styled.span`
    display: block;
    width: 40px;
    height: 40px;
    min-width: 40px;
    border-radius: 50%;
    background-color: #fff;
    color: #3f3f3f;
    border: 1px solid #e4e4e4;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-family: "gordita_medium";
    margin-right: 10px;
    text-transform: capitalize;

    cursor: pointer;
    &.active {
        border: 1px solid #3fbd7f;
        background-color: #3fbd7f;
        color: #fff;
    }
    &:last-child {
        margin-right: 0;
    }
    @media all and (max-width: 480px) {
        width: 30px;
        height: 30px;
        min-width: 30px;
        margin-right: 5px;
        font-size: 13px;
    }
    @media all and (max-width: 360px) {
        font-size: 12px;
    }
`;
