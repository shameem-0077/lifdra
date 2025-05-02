import React from "react";
import styled from "styled-components";

function SheduleTimeTable({
    setSelectedId,
    selectedId,
    setModal,
    setSelectedDay,
}) {
    const days = [
        { id: 1, day: "monday" },
        { id: 2, day: "tuesday" },
        { id: 3, day: "wednesday" },
        { id: 4, day: "thursday" },
        { id: 5, day: "friday" },
        { id: 6, day: "saturday" },
        { id: 7, day: "sunday" },
    ];
    const daySelection = (data) => {
        !selectedId.includes(data.id)
            ? setSelectedId([...selectedId, data.id])
            : setSelectedId(selectedId.filter((i) => i !== data.id));
    };
    return (
        <Container>
            <Title>Your Goal</Title>
            <GoalSection>
                <Top>
                    <TitleLabel>Set your goal</TitleLabel>
                    <Description>
                        Your more likely to reach our goal if you decide some
                        time in your schedule for learning choose the day that
                        works for you.
                    </Description>
                </Top>
                <DaysContainer>
                    {days &&
                        days.map((data) => (
                            <Day
                                key={data.id}
                                onClick={() => {
                                    // setModal((prev) => !prev);
                                    setModal(true);
                                    daySelection(data);
                                    setSelectedDay(data.day);
                                }}
                                className={
                                    selectedId.includes(data.id) && "active"
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

export default SheduleTimeTable;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    /* width: 33%; */
    @media all and (max-width: 980px) {
        width: 100%;
    }
`;

const Title = styled.h2`
    font-family: gordita_medium;
    font-size: 18px;
    margin-bottom: 10px;
    color: #3f3f3f;
    @media all and (max-width: 480px) {
        font-size: 16px;
    }
`;

const GoalSection = styled.div`
    border: 1px solid #e4e4e4;
    border-radius: 5px;
    padding: 20px;
    /* flex: 1; */
    /* display: flex;
    justify-content: space-between;
    flex-direction: column; */
`;

const TitleLabel = styled.h3`
    font-family: gordita_medium;
    font-size: 18px;
    margin-bottom: 20px;
    color: #3f3f3f;
    text-transform: capitalize;
`;

const Description = styled.p`
    font-size: 15px;
`;

const Top = styled.div`
    /* margin-bottom: 50px; */
    margin-bottom: 88px;
    @media all and (max-width: 480px) {
        margin-bottom: 30px;
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
    @media all and (max-width: 480px) {
        width: 30px;
        height: 30px;
        min-width: 30px;
        margin-right: 5px;
        font-size: 13px;
    }
`;
