import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { learnConfig } from "../../../../../axiosConfig";

function NavBar(props) {
    const { user_profile, user_data } = useSelector((state) => state);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        let { access_token } = user_data;
        learnConfig
            .get(`learn/new-content/skills/`, {
                headers: { Authorization: `Bearer ${access_token}` },
            })
            .then((response) => {
                let { StatusCode, data } = response.data;
                if (StatusCode === 6000) {
                    setSkills(data);
                }
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <Container>
            <NavItem exact activeClassName="active" to="/tech-schooling/">
                Dashboard
            </NavItem>
            <NavItem activeClassName="active" to="/tech-schooling/elearning/">
                Learning
            </NavItem>
            <NavItem activeClassName="active" to="/tech-schooling/practices/">
                Practices
            </NavItem>
            <NavItem activeClassName="active" to="/tech-schooling/workshops/">
                Workshops
            </NavItem>
            <NavItem activeClassName="active" to="/tech-schooling/assessments/">
                Assessments
            </NavItem>
            {/* <NavItem
                activeClassName="active"
                to="/tech-schooling/subscribe/"
            >
                Subscribe
            </NavItem> */}
            <NavItem activeClassName="active" to="/tech-schooling/explore/">
                Explore Tech Schooling
            </NavItem>
            {user_profile.subscription_data &&
                !user_profile.subscription_data.expired_subscription &&
                skills.length > 0 && (
                    <NavItem
                        activeClassName="active"
                        to="/tech-schooling/new-content/"
                    >
                        New Content
                    </NavItem>
                )}

            {/* <NavItem
                activeClassName="active"
                to="/tech-schooling/qa-spot/"
            >
                QA Spot
            </NavItem>
            <NavItem
                activeClassName="active"
                to="/tech-schooling/doubt-hub/"
            >
                Doubt Hub
            </NavItem> */}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    overflow-x: scroll;
    /* box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1); */
    padding: 12px 25px;
    border-radius: 6px;
    margin-bottom: 35px;
    &::-webkit-scrollbar {
        height: 5px;
    }
    &::-webkit-scrollbar-track {
        background: #fff;
    }
    &::-webkit-scrollbar-thumb {
        background: #e5e5e5;
        border-radius: 0.625rem;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #b7b7b7;
    }
    @media (max-width: 768px) {
        margin-bottom: 23px;
    }
`;
const NavItem = styled(NavLink)`
    min-width: fit-content;
    display: inline-block;
    color: #717171;
    font-size: 15px;
    margin-right: 55px;
    font-family: gordita_regular !important;
    &:last-child {
        padding-right: 25px;
    }
    &.active {
        font-family: gordita_medium !important;
        color: #5fd18a;
    }
    @media (max-width: 480px) {
        font-size: 14px;
        margin-right: 35px;
    }
`;
export default NavBar;
