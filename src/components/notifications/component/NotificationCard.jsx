import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

class NotificationCard extends Component {
    render() {
        let { title, date, description, toggleNotificationModal } = this.props;
        return (
            <Container
                onClick={() =>
                    toggleNotificationModal && toggleNotificationModal()
                }
                to={
                    title === "Evaluated student practice"
                        ? "/tech-schooling/practices/"
                        : title === "Evaluated student assessment"
                        ? "/tech-schooling/assessments/"
                        : "/coins/manage/"
                }
            >
                <LeftBox>
                    <Title>
                        {title === "Evaluated student practice"
                            ? "Practice result"
                            : title === "Evaluated student assessment"
                            ? "Assessment result"
                            : title}
                    </Title>
                    <Time>{date}</Time>
                    <Desc>{description}</Desc>
                </LeftBox>
                <RightBox>
                    <Icon className="las la-bell" />
                </RightBox>
            </Container>
        );
    }
}

const LeftBox = styled.div``;
const Title = styled.h3`
    font-family: "baloo_paaji_2semibold";
    font-size: 18px;
`;
const Time = styled.p`
    font-size: 12px;
`;
const Desc = styled.small`
    font-size: 14px;
    color: #666;
`;
const RightBox = styled.div``;
const Icon = styled.span`
    font-size: 25px;
`;
const Container = styled(Link)`
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    &:hover {
        ${Title} {
            color: #03a9f4;
        }
        ${Icon} {
            color: #03a9f4;
        }
        border: 2px solid #03a9f4;
        border-left: 5px solid #03a9f4;
        padding: 8px;
        padding-left: 5px;
    }
`;
export default NotificationCard;
