import React from "react";
import styled from "styled-components";
import { Link, NavLink, useParams } from "react-router-dom";
import { Container } from "../../assessments/QuestionGraph";
import DescriptiveQuestion from "./modals/DescriptiveQuestion";
import { useSelector } from "react-redux";

function Aside({ subject_slug }) {
    const { id } = useParams();
    const { user_profile } = useSelector((state) => state);
    return (
        <>
            <ConteinerLeft>
                <NavItem
                    to={`/nanodegree/${subject_slug}/assessments/view/${id}/questions/descriptives/`}
                    exact
                    activeClassName="selected"
                >
                    <IconActive>
                        <Image1
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/assessments/questions/descriptive-active.svg"
                            alt=""
                        />
                    </IconActive>
                    <Icon>
                        <Image1
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/assessments/questions/descriptive.svg"
                            alt=""
                        />
                    </Icon>
                    Descriptive
                </NavItem>
                <NavItem
                    to={`/nanodegree/${subject_slug}/assessments/view/${id}/questions/objectives/`}
                    exact
                    activeClassName="selected"
                >
                    <IconActive>
                        <Image2
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/assessments/questions/objective-active.svg"
                            alt=""
                        />
                    </IconActive>
                    <Icon>
                        <Image2
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/assessments/questions/objective.svg"
                            alt=""
                        />
                    </Icon>
                    Objective
                </NavItem>
                <NavItem
                    to={`/nanodegree/${subject_slug}/assessments/view/${id}/questions/challenge/`}
                    exact
                    activeClassName="selected"
                >
                    <IconActive>
                        <Image3
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/assessments/questions/challenge-active.svg"
                            alt=""
                        />
                    </IconActive>
                    <Icon>
                        <Image3
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/assessments/questions/challenge.svg"
                            alt=""
                        />
                    </Icon>
                    Challenge
                </NavItem>
            </ConteinerLeft>
        </>
    );
}

const ConteinerLeft = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 60px;
    @media all and (max-width: 768px) {
        margin-bottom: 40px;
        width: 100%;
        margin-right: 0;
    }
`;
const IconActive = styled.span`
    margin-right: 18px;
    width: 22px;
    display: none;
`;
const Icon = styled.span`
    margin-right: 18px;
    width: 22px;
`;
const NavItem = styled(NavLink)`
    text-transform: capitalize;
    /* color: #6b7bf9; */
    display: flex;
    align-items: center;
    margin-bottom: 18px;
    font-family: gordita_regular;
    font-size: 16px;
    &.selected {
        font-family: gordita_medium;
        color: #6c81ff;
        & ${IconActive} {
            display: block;
        }
        & ${Icon} {
            display: none;
        }
    }
    @media all and (max-width: 768px) {
        justify-content: center;
        margin-bottom: 14px;
    }
`;
const ChallengeButton = styled(Link)`
    text-transform: capitalize;
    display: flex;
    align-items: center;
    margin-bottom: 35px;
    font-weight: bold;
    @media all and (max-width: 768px) {
        justify-content: center;
        margin-bottom: 18px;
    }
`;
const DownloadButton = styled(Link)`
    text-transform: capitalize;
    display: flex;
    align-items: center;
    background-color: #4dc56b;
    color: #fff;
    padding: 5px 40px;
    border-radius: 4px;
    justify-content: center;
    font-size: 15px;
`;
const DownloadIcon = styled.span`
    margin-right: 18px;
    width: 15px;
`;
const Image1 = styled.img`
    display: block;
    width: 100%;
`;
const Image2 = styled.img`
    display: block;
    width: 100%;
`;
const Image3 = styled.img`
    display: block;
    width: 100%;
`;
const Image4 = styled.img`
    display: block;
    width: 100%;
`;

export default Aside;
