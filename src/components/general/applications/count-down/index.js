import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useCountdown } from "../../hooks/useCountdown";

export default function CountDown({ targetDate, onComplete, handleDispatch }) {
    const [days, hours, minutes, seconds, isLoading, isDanger] =
        useCountdown(targetDate);

    const dispatch = useDispatch();

    const setZeroPad = (value) => {
        if (value <= 9) {
            return "0" + value;
        } else {
            return value;
        }
    };

    useEffect(() => {
        // console.log(
        //     days,
        //     hours,
        //     minutes,
        //     seconds,

        //     "TIMEEEEEEEEE"
        // );
        if (!isLoading) {
            if (days + hours + minutes + seconds <= 0) {
                if(handleDispatch && onComplete){
                    handleDispatch({
                        time_status: 0,
                    });
                    onComplete();
                }
                
            }
        }
    }, [days, hours, minutes, seconds, isLoading]);

    if (!isLoading)
        if (days + hours + minutes + seconds <= 0) {
            return (
                <TimeDiv>
                    <Min>00 : </Min>
                    <Sec>00</Sec>
                </TimeDiv>
            );
        } else {
            return (
                <TimeDiv isDanger={isDanger}>
                    <Min isDanger={isDanger}>
                        {minutes ? setZeroPad(minutes) : "00"}
                    </Min>
                    :{" "}
                    <Sec isDanger={isDanger}>
                        {seconds ? setZeroPad(seconds) : "00"}
                    </Sec>
                </TimeDiv>
            );
        }
    else {
        return (
            <TimeDiv>
                <Min>-- :</Min>
                <Sec>--</Sec>
            </TimeDiv>
        );
    }
}

const TimeDiv = styled.div`
    color: ${({ isDanger }) => (isDanger ? "red" : "#0fa76f")};
    display: flex;
    align-items: center;
`;
const Min = styled.span`
    color: ${({ isDanger }) => (isDanger ? "red" : "#0fa76f")};
    position: relative;
    margin-right: 5px;
    font-size: 21px;
    font-family: "gordita_medium";
    ::before {
        font-family: "gordita_regular";
        content: "Min";
        position: absolute;
        color: ${({ isDanger }) => (isDanger ? "red" : "#0fa76f")};
        bottom: -23px;
        font-size: 14px;
    }
    @media all and (max-width: 640px) {
        &::before {
            content: "";
        }
    }
`;
const Sec = styled.span`
    position: relative;
    margin-left: 5px;
    font-size: 21px;
    font-family: "gordita_medium";
    color: ${({ isDanger }) => (isDanger ? "red" : "#0fa76f")};
    ::before {
        font-family: "gordita_regular";
        content: "Sec";
        position: absolute;
        color: ${({ isDanger }) => (isDanger ? "red" : "#0fa76f")};
        bottom: -23px;
        font-size: 14px;
    }
    @media all and (max-width: 640px) {
        &::before {
            content: "";
        }
    }
`;
