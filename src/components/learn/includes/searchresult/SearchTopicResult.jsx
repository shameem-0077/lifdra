import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

class SearchTopicResult extends React.PureComponent {
    render() {
        let { image, title, id, label, length, link } = this.props;
        return (
            <Container onClick={this.props.onClick} to={link}>
                <ImageContainer className="img">
                    <img src={image} style={this.styles.image} alt={title} />
                </ImageContainer>
                <ContentContainer className="content">
                    <h3 style={this.styles.title}>
                        <span style={this.styles.idSpan}>#{id}</span> | {title}
                    </h3>

                    <span className="label" style={this.styles.label}>
                        <span className="icon" style={this.styles.icon}>
                            <i className="las la-layer-group"></i>
                        </span>
                        {label}
                    </span>
                    <span className="label" style={this.styles.label}>
                        <span className="icon" style={this.styles.icon}>
                            <i className="las la-clock"></i>
                        </span>
                        {length}
                    </span>
                </ContentContainer>
                <div />
            </Container>
        );
    }

    styles = {
        card: {},
        image: {
            width: "100%",
            display: "block",
            borderRadius: "10px",
        },
        title: {
            fontFamily: "gordita_medium",
            fontSize: "16px",
            marginBottom: "20px",
        },
        idSpan: {
            color: "#0F9D58",
            fontFamily: "gordita_medium",
        },
        label: {
            color: "#929292",
            fontSize: "15px",
            display: "block",
            marginBottom: "10px",
        },
        icon: {
            marginRight: "10px",
        },
    };
}

const Container = styled(Link)`
    padding: 25px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    @media only screen and (max-width: 980px) {
        width: 85%;
    }
    @media only screen and (max-width: 768px) {
        width: 100%;
    }
    @media only screen and (max-width: 480px) {
        flex-direction: column;
    }
`;

const ImageContainer = styled.div`
    width: 30%;
    display: flex;
    align-items: center;
    @media only screen and (max-width: 480px) {
        width: 100%;
    }
`;

const ContentContainer = styled.div`
    width: 65%;
    @media only screen and (max-width: 480px) {
        width: 100%;
        margin-top: 10px;
    }
`;

export default SearchTopicResult;
