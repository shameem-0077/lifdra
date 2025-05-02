import React from "react";
import colors from "../../../../Colors";
import styled from "styled-components";

class TopBanner extends React.PureComponent {
    renderDescription = () => {
        let { isBreadCrumbRequired, breadCrumb } = this.props;

        if (isBreadCrumbRequired === "true") {
            let iconColors = [
                colors.blue,
                colors.red,
                colors.purple,
                colors.orange,
                colors.amber,
                colors.cyan,
                colors.green,
            ];
            let message = [];
            breadCrumb.forEach((item, index) => {
                if (index !== 0) {
                    message.push(
                        <React.Fragment key={index}>
                            <span
                                className="topIcon"
                                style={{
                                    fontFamily: "product_sansbold",
                                    color: iconColors[index],
                                    margin: "0 5px",
                                }}
                            ></span>
                            <span>{item}</span>
                        </React.Fragment>
                    );
                } else {
                    message.push(<span key={index}>{item}</span>);
                }
            });

            return message;
        } else {
            return this.props.description;
        }
    };

    renderTitle = () => {
        if (this.props.autoId) {
            let title = `#${this.props.autoId} - ${this.props.title}`;
            return title;
        } else {
            return this.props.title;
        }
    };

    render() {
        return (
            <MainContainer className="top-banner">
                <Content className="content">
                    <Title {...this.props}>{this.renderTitle()}</Title>
                    <Description>{this.renderDescription()}</Description>
                </Content>
                <div className="image" style={this.styles.image_container}>
                    <Image src={this.props.image} alt="" />
                </div>
            </MainContainer>
        );
    }

    styles = {
        breadCrumb: {
            color: "#333",
            fontSize: "17px",
        },
        image_container: {
            position: "absolute",
            right: "-72px",
            top: "-30px",
        },
    };
}

const Title = styled.h3`
    color: ${(props) => props.color};
    font-size: 31px;
    font-family: "gordita_medium";
    margin-bottom: 11px;
    letter-spacing: 1px;
    line-height: 35px;
    @media only screen and (max-width: 1652px) {
        font-size: 30px;
    }
    @media only screen and (max-width: 1520px) {
        font-size: 28px;
    }
    @media only screen and (max-width: 1417px) {
        font-size: 26px;
    }
    @media only screen and (max-width: 1347px) {
        font-size: 25px;
    }
    @media only screen and (max-width: 1024px) {
        font-size: 20px;
    }
    @media only screen and (max-width: 640px) {
        font-size: 18px;
    }
`;
const Description = styled.p`
    color: rgb(51, 51, 51);
    font-size: 17px;
    font-family: "gordita_regular";
    width: 60%;
    @media only screen and (max-width: 1853px) {
        font-size: 16px;
        width: 70%;
    }
    @media only screen and (max-width: 1590px) {
        font-size: 16px;
        width: 74%;
    }
    @media only screen and (max-width: 1590px) {
        font-size: 14px;
        width: 85%;
    }
    @media only screen and (max-width: 640px) {
        font-size: 12px;
        width: 100%;
    }
`;
const Image = styled.img`
    height: 160px;
    display: block;
    @media only screen and (max-width: 640px) {
        display: none;
    }
`;
const Content = styled.div`
    width: 80%;
    @media only screen and (max-width: 640px) {
        width: 100%;
    }
`;
const MainContainer = styled.div`
    background: rgba(3, 155, 229, 0.1);
    display: flex;
    justify-content: space-between;
    padding: 25px 50px;
    position: relative;
    border-radius: 10px;
    margin-top: 50px;
    margin-bottom: 30px;
    width: calc(100% - 72px);
    min-height: 130px;
    @media only screen and (max-width: 640px) {
        width: 100%;
        padding: 25px 30px;
    }
`;

export default TopBanner;
