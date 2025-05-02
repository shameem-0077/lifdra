import React, { Component } from "react";
import colors from "../../../../Colors";
import { Link } from "react-router-dom";
import styled from "styled-components";

class SearchQaSpotResult extends Component {
    render() {
        let {
            answers_count,
            title,
            designation,
            last_answered,
            backgroundColor,
            link,
        } = this.props;

        return (
            <Link onClick={this.props.onClick} to={link}>
                <section className="main">
                    <Item backgroundColor={backgroundColor} className="item">
                        <LeftContainer className="left">
                            <span
                                className="round"
                                style={this.styles.roundIcon}
                            >
                                <small>
                                    <AnswerCount>
                                        {answers_count} Answers
                                    </AnswerCount>
                                </small>
                            </span>
                        </LeftContainer>
                        <div className="right" style={{ width: "50%" }}>
                            <Title>{title}</Title>
                            <BottomContainer>
                                <Designation className="badge">
                                    {designation}
                                </Designation>
                                {last_answered && (
                                    <span>{`last asnwered on ${last_answered}`}</span>
                                )}
                            </BottomContainer>
                        </div>
                    </Item>
                </section>
            </Link>
        );
    }

    styles = {
        leftContainer: {
            marginRight: "50px",
        },
        roundIcon: {
            border: `2px solid ${colors.green}`,
            borderRadius: "50%",
            padding: "20px 10px",
            color: colors.green,
            display: "inline-block",
            width: "85px",
            height: "85px",
            textAlign: "center",
        },
        designation: {
            backgroundColor: colors.roseViolet300,
            color: colors.violet,
            padding: "10px 20px",
            borderRadius: "50px",
            display: "inline-block",
            fontSize: "15px",
        },
        title: {
            marginBottom: "20px",
            fontSize: "20px",
        },
        date: {
            margin: "0 20px",
        },
    };
}

const LeftContainer = styled.div`
    margin-right: 50px;
    @media only screen and (max-width: 1350px) {
        margin-right: 35px;
    }
    @media only screen and (max-width: 1250px) {
        margin-right: 25px;
    }
`;

const Designation = styled.span`
    background-color: rgb(227, 220, 239);
    color: rgb(105, 79, 184);
    padding: 10px 20px;
    border-radius: 50px;
    display: inline-block;
    font-size: 15px;
    width: fit-content;
    margin-right: 10px;
    @media only screen and (max-width: 1350px) {
        padding: 8px 16px;
        font-size: 14px;
    }
    @media only screen and (max-width: 1250px) {
        padding: 6px 14px;
        font-size: 13px;
    }
`;

const Title = styled.h4`
    margin-bottom: 20px;
    font-size: 20px;
    line-height: 23px;
    @media only screen and (max-width: 1440px) {
        font-size: 18px;
    }
    @media only screen and (max-width: 1250px) {
        font-size: 16px;
    }
`;

const Item = styled.div`
    padding: 30px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.backgroundColor};
    @media only screen and (max-width: 1024px) {
    }
`;
const BottomContainer = styled.div`
    display: flex;
    align-items: center;
`;

const AnswerCount = styled.b``;

export default SearchQaSpotResult;
