import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

class SearchDoubtHubResult extends React.PureComponent {
    render() {
        let { id, title, designation, link } = this.props;
        return (
            <Link
                onClick={this.props.onClick}
                style={{ display: "contents" }}
                to={link}
            >
                <div className="doubtCard" style={this.styles.doubtCard}>
                    <span className="idSpan" style={this.styles.idSpan}>
                        #{id}
                    </span>
                    <div className="doubtCardTitle">
                        <Title>{title}</Title>
                    </div>
                    <Button className="button">{designation}</Button>
                </div>
            </Link>
        );
    }

    styles = {
        doubtCard: {
            padding: "21px",
            borderRadius: "10px",
            backgroundColor: "#ffffff",
        },
        idSpan: {
            color: "#3ca1f6",
            fontFamily: "product_sansbold",
            display: "block",
        },
    };
}

export const Title = styled.div`
    color: rgb(69, 69, 69);
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: left;
    font-size: 18px;
    line-height: 1.6em;
    @media only screen and (max-width: 1024px) {
        font-size: 16px;
    }
`;

export const Button = styled.div`
    padding: 10px 24px;
    background-color: rgb(219, 240, 230);
    color: rgb(54, 160, 93);
    display: inline-block;
    border-radius: 20px;
    font-size: 15px;
    @media only screen and (max-width: 1024px) {
        font-size: 13px;
    }
`;

export default SearchDoubtHubResult;
