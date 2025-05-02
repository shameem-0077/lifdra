import React, { Component } from "react";
import RoundGraph from "../../includes/general/RoundGraph";
import styled from "styled-components";

class QuestionGraph extends Component {
    render() {
        if (this.props.count) {
            return (
                <Container className={`container ${this.props.class}`}>
                    <RoundGraph
                        count={this.props.count}
                        content={this.props.count}
                        total={this.props.total}
                        color={this.props.objectives_color}
                        colorLight={this.props.objectives_colorLight}
                        is_background={true}
                        dimension={50}
                        strokewidthPercent={90}
                        contentColor={"#fff"}
                    />
                    <Title className="title" style={this.styles.title}>
                        {this.props.title}
                    </Title>
                </Container>
            );
        } else {
            return null;
        }
    }
    styles = {
        title: {
            color: this.props.titleColor,
        },
    };
}

export const Title = styled.h3`
    font-size: 20px;
    font-family: product_sansbold;
    margin-left: 20px;
    @media only screen and (max-width: 1500px) {
        font-size: 18px;
    }
    @media only screen and (max-width: 1450px) {
        font-size: 16px;
    }
    @media only screen and (max-width: 980px) {
        margin-left: 5px;
        font-size: 16px;
    }
    @media only screen and (max-width: 768px) {
        text-align: center;
    }
`;
export const Container = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid rgb(223, 223, 223);
    padding: 0px 38px;
    border-radius: 19px;
    margin-bottom: 15px;
    @media only screen and (max-width: 1500px) {
        padding: 0px 34px;
    }
    @media only screen and (max-width: 1450px) {
        padding: 0px 27px;
    }
    @media only screen and (max-width: 980px) {
        padding: 0px 10px;
        margin-bottom: 0;
    }
    @media only screen and (max-width: 768px) {
        flex-direction: column;
        padding: 15px;
    }
    @media only screen and (max-width: 640px) {
        flex-basis: 48%;
        margin-bottom: 10px;
    }
`;

export default QuestionGraph;
