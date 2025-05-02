import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import ProgressiveImage from "react-progressive-image-loading";

function mapStateToProps(state) {
    return {
        startLearningSelected: state.startLearningSelected,
        user_data: state.user_data,
    };
}

function mapDispatchtoProps(dispatch) {
    return {
        selectTopic: (selectedTopic) =>
            dispatch({
                type: "SELECT_TOPIC",
                selectedTopic: selectedTopic,
            }),
        selectLesson: (selectedLesson) =>
            dispatch({
                type: "SELECT_LESSON",
                selectedLesson: selectedLesson,
            }),
    };
}

class TopicSingleAsideActiveCard extends React.PureComponent {
    render() {
        return (
            <Link
                onClick={() => {
                    this.props.handleClick(this.props.id);
                }}
                to={this.props.navigateTo}
            >
                <div
                    className="singleTopicAsideCard"
                    style={this.styles.singleTopicAsideCard}
                >
                    <div
                        className="thumbnailBox"
                        style={this.styles.thumbnailBox}
                    >
                        <ProgressiveImage
                            alt=""
                            placeholder={this.props.placeholder}
                            src={this.props.image}
                            style={this.styles.image}
                            transitionTime={1000}
                            transitionFunction="ease"
                            render={(src, style) => (
                                <Img src={src} style={style} />
                            )}
                        />
                        <small
                            className="thumbnailIcon las la-play"
                            style={this.styles.thumbnailIcon}
                        ></small>
                        <div
                            className="overlay"
                            style={this.styles.overlay}
                        ></div>
                    </div>
                    <div className="content" style={this.styles.content}>
                        <Title>
                            #{this.props.order_id} - {this.props.title}
                        </Title>
                        <div className="infoBox" style={this.styles.infoBox}>
                            <IconBox className="infoBoxIcon las la-clock"></IconBox>
                            <IconText className="infoBoxText">
                                {this.props.duration}
                            </IconText>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    styles = {
        singleTopicAsideCard: {
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            padding: "10px",
            borderRadius: "10px",
            overflow: "hidden",
        },
        thumbnailBox: {
            flex: 1,
            position: "relative",
            textAlign: "center",
            marginRight: "10px",
        },
        content: {
            flex: 3,
        },
        image: {
            display: "block",
            width: "100%",
        },
        thumbnailIcon: {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            color: "#fff",
            fontSize: "20px",
            margin: "auto",
            width: "30px",
            height: "30px",
            lineHeight: "30px",
            zIndex: 10,
        },
        overlay: {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.3)",
            zIndex: 9,
        },
        infoBox: {
            color: "#999",
            display: "flex",
            alignItems: "center",
        },
    };
}

export const Title = styled.h4`
    margin-bottom: 10px ;
    color: colors.blueGrey700;
    font-family: "gordita_medium";
    font-size: 15px;
    line-height: 1.4em;
    @media only screen and (max-width: 1450px) {
    font-size: 15px;
  }
`;
export const IconBox = styled.small`
    color: colors.blueGrey700;
    font-size: 23px;
    margin-right: 10px;
    @media only screen and (max-width: 1450px) {
        font-size: 20px;
    }
`;
export const IconText = styled.span`
    color: colors.blueGrey700;
    font-family: "gordita_regular";
    font-size: 13px;
    @media only screen and (max-width: 1450px) {
        font-size: 13px;
    }
`;
const Img = styled.img`
    width: 100%;
    display: block;
`;

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(TopicSingleAsideActiveCard);
