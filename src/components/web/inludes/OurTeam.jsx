import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import "../../../assets/css/web/style.css";
import bggradient from "../../../assets/images/web/color.png";
import { communityConfig } from "../../../axiosConfig";

export default function OurTeam() {
    const [team, setTeam] = useState([]);
    useEffect(() => {
        const getTeam = () => {
            communityConfig
                .get("/team/steyp-team-members/")
                .then((response) => {
                    const { StatusCode, data } = response.data;
                    if (StatusCode === 6000) {
                        setTeam(data);
                    }
                })
                .catch((error) => console.log(error));
        };
        getTeam();
    }, []);

    return (
        <Container className="ourteam" data-aos="fade-left">
            <OurTeams>
                {team.map((team_member) => (
                    <Card>
                        <HoverSection className="hh">
                            <Triangle></Triangle>
                            <Name>{team_member.name}</Name>

                            <Designation>{team_member.designation}</Designation>
                            <IconContainer
                                target="_blank"
                                href={team_member.linkedin_profile}
                            >
                                <Icon
                                    src={require("../../../assets/images/web/linkedin.svg")}
                                    alt="Image"
                                />
                            </IconContainer>
                        </HoverSection>

                        <DpContainer className="pp">
                            <Dp src={team_member.photo} alt="Image" />
                        </DpContainer>
                    </Card>
                ))}
            </OurTeams>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
    padding-bottom: 50px;
    @media all and (max-width: 640px) {
        padding-top: 44px;
    }
`;

const OurTeams = styled.div`
    display: flex;
    flex-wrap: wrap;
    grid-gap: 34px;
    margin-top: 20px;
    justify-content: center;
    @media all and (max-width: 800px) {
        grid-gap: 41px;
    }
    @media all and (max-width: 720px) {
        grid-gap: 52px;
    }
    @media all and (max-width: 620px) {
        grid-gap: 69px;
    }
    @media all and (max-width: 530px) {
        grid-gap: 43px;
    }
    @media all and (max-width: 480px) {
        grid-gap: 32px;
    }
    @media all and (max-width: 450px) {
        grid-gap: 22px;
    }
    @media all and (max-width: 400px) {
        grid-gap: 10px;
    }
    @media all and (max-width: 370px) {
        grid-gap: 40px;
    }
`;
const Card = styled.div`
    border-radius: 50%;
    position: relative;
`;
const DpContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 81px;
    height: 81px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
`;
const HoverSection = styled.div`
    transition: 0.4s ease;
    display: none;
    width: 217px;
    background-color: #fff;
    padding: 14px 9px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: 0px 7px 20px #00000029;
    z-index: 2;
    position: absolute;
    top: -89px;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    ${Card}:hover & {
        display: flex;
    }
    @media all and (max-width: 450px) {
        width: 185px;
        padding: 14px 3px;
    }
`;
const Triangle = styled.span`
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 9px solid #fff;
    position: absolute;
    left: 102px;
    bottom: -8px;
    @media all and (max-width: 450px) {
        left: 87px;
    }
`;
const Name = styled.div`
    font-size: 15px;
    margin-bottom: 6px;
    text-align: center;
`;
const Designation = styled.div`
    font-size: 12px;
    color: #14b077;
    text-align: center;
    @media all and (max-width: 580px) {
        max-width: 170px;
    }
    @media all and (max-width: 501) {
        max-width: 100%;
    }
`;
const IconContainer = styled.a`
    display: block;
    width: 13px;
    margin: 6px 0 auto;
    cursor: pointer;
`;
const Icon = styled.img`
    width: 100%;
    display: block;
    &:hover {
        filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(181deg)
            brightness(104%) contrast(97%);
    }
`;
const Dp = styled.img`
    width: 100%;
    display: block;
`;
