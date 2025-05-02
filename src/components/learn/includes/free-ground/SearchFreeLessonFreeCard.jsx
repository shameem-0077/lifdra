import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { secondsTohms } from "../../../helpers/functions";

export default function SearchFreeLessonFreeCard({ data, margin }) {
    return (
        <Container
            className="anim-fade"
            to={`/free-ground/topics/view/${data.id}/`}
            style={{ marginBottom: margin }}
        >
            <Top>
                <Image src={data.image} />
            </Top>
            <Bottom>
                <Title>{data.name}</Title>
                <Time>{secondsTohms(data.duration)}</Time>
            </Bottom>
        </Container>
    );
}

const Container = styled(Link)`
    display: block;
`;
const Top = styled.div``;
const Image = styled.img`
    display: block;
    width: 100%;
`;
const Bottom = styled.div`
    padding: 11px 0;
    @media (max-width: 640px) {
        padding: 8px 0px;
    }
    @media (max-width: 480px) {
        padding: 6px 0px;
    }
`;
const Title = styled.span`
    display: block;
    line-height: 1.5rem;
    letter-spacing: 0.01rem;
    color: #464646;
    @media (max-width: 480px) {
        font-size: 16px;
    }
`;
const Time = styled.span`
    font-size: 13px;
    color: #777;
    margin-top: 4px;
    display: block;
    @media (max-width: 640px) {
        margin-top: 3px;
    }
`;
