import React from "react";
import styled from "styled-components";

const ScoreStatusCard = ({ score, total_score, name }) => {
    return (
        <Container>
            <Head>You got the score of</Head>
            <Headspan>{score}</Headspan>
            <StarRate>
                <StarSmall className="las la-star"></StarSmall>
                <LeftSpan>
                    {score}
                    <MidSpan>/</MidSpan>
                    {total_score}
                </LeftSpan>
            </StarRate>
            <ReportSpan>Great work, {name}</ReportSpan>
        </Container>
    );
};
const Container = styled.div`
    width: 100%;
    padding: 30px 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;
const Head = styled.h3`
    color: #474747;
    font-size: 22px;
    text-align: center;
    width: 100%;
    font-family: gordita_medium;
    @media all and (max-width: 480px) {
        font-size: 20px;
    }
`;
const Headspan = styled.h3`
    font-size: 40px;
    font-family: gordita_medium;
    margin: 20px 0;
    @media all and (max-width: 480px) {
        font-size: 32px;
    }
`;
const StarRate = styled.span`
    display: block;
    background-color: #f7e502;
    padding: 8px 20px 5px;
    border-radius: 15px;
    border-radius: 30px;
    /* width: 24%; */
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    @media all and (max-width: 480px) {
    }
    /* width: 35%; */
`;
const StarSmall = styled.i`
    color: #DBA665;
    font-size: 15px;
    margin-right: 5px;
    transform: translateY(-3px);
`;
const LeftSpan = styled.span`
    color: #fff;
    font-size: 12px;
    font-family: gordita_medium;
`;
const MidSpan = styled.span`
    color: #fff;
    font-size: 12px;
    font-family: gordita_medium;
`;
const ReportSpan = styled.span`
    font-size: 16px;
    font-family: gordita_bold;
    color: #40c081;
    display: inline-block;
    margin-top: 20px;
`;

export default ScoreStatusCard;
