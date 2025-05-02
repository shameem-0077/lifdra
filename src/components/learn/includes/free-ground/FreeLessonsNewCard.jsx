import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PlaceHolder from "../../../general/PlaceHolder";
import { secondsTohms } from "../../../helpers/functions";

export default function FreeLessonsNewCard({ data, margin }) {
    const [isLoading, setIsLoading] = useState(true);

    function onLoad() {
        setTimeout(() => setIsLoading(false));
    }

    return (
        <Container
            to={`/free-ground/topics/view/${data.id}/`}
            style={{ marginBottom: margin }}
        >
            <Top>
                <PlaceHolder isLoading={isLoading} paddingTop="62.5%" />
                <Image
                    onLoad={onLoad}
                    style={{ display: isLoading ? "none" : "block" }}
                    src={data.image}
                />
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
    padding: 10px 0;
    @media (max-width: 640px) {
        padding: 8px 0px;
    }
    @media (max-width: 480px) {
        padding: 6px 0px;
    }
`;
const Title = styled.span`
    display: block;
    letter-spacing: 0.01rem;
    color: #464646;
    font-family: "gordita_regular";
    font-size: 14px;
    @media (max-width: 480px) {
        font-size: 13px;
    }
`;
const Time = styled.span`
    font-size: 13px;
    color: #777;
    margin-top: 2px;
    display: block;
    font-family: "gordita_regular";
    font-size: 13px;
    @media (max-width: 640px) {
        margin-top: 3px;
    }
`;
