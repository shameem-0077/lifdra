import React from "react";
import styled from "styled-components";

class ChatItemAttachmentLoader extends React.PureComponent {
    truncate = (str) => {
        if (str) {
            return str.length > 13 ? str.substring(0, 10) + "..." : str;
        } else {
            return "attachment";
        }
    };
    render() {
        let {
            attachment,
            name,
            attachment_type,
            attachment_size,
            attachmentLoading,
        } = this.props;
        return (
            <Container
                href={attachment}
                className="doc"
                style={this.styles.doc}
                download={name}
                target="_blank"
                rel="noopener noreferrer"
                title={name}
            >
                <Overlay />
                <TopContainer className="top">
                    <LeftBox className="left">
                        <img
                            src={
                                attachment_type === "pdf"
                                    ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/pdf.svg"
                                    : attachment_type === "zip" ||
                                      attachment_type === "rar"
                                    ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/zip.svg"
                                    : attachment_type === "doc" ||
                                      attachment_type === "docx"
                                    ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/doc.svg"
                                    : attachment_type === "xslx"
                                    ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/sheets.svg"
                                    : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/doc.svg"
                            }
                            style={this.styles.icon}
                            alt="icon"
                        />
                    </LeftBox>
                    <div className="right" style={this.styles.right}>
                        <Title className="title">{this.truncate(name)}</Title>
                        <span style={this.styles.size} className="size">
                            {attachment_size}
                        </span>
                    </div>
                </TopContainer>
                {attachmentLoading ? (
                    <div className="progress" style={this.styles.progress}>
                        <span className="progressbar"></span>
                        <span className="note" style={this.styles.note}>
                            Sending...
                        </span>
                    </div>
                ) : null}
            </Container>
        );
    }
    styles = {
        icon: {
            display: "block",
            width: "100%",
        },
        right: {
            display: "flex",
            flexDirection: "column",
        },
        size: {
            color: "#c0c0c0",
            fontSize: "11px",
        },
        note: {
            fontSize: "10px",
            color: "#9fb8fc",
        },
        progress: {
            display: "flex",
            justifyContent: "flex-end",
        },
    };
}

const TopContainer = styled.div`
    display: flex
    align-items: center
`;

const LeftBox = styled.div`
    width: 35px;
    margin-right: 10px;

    @media only screen and (max-width: 640px) {
        width: 20px;
    }
`;

const Title = styled.span`
    color: #4f7afa;
    font-weight: 600;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;

    @media only screen and (max-width: 640px) {
        font-size: 14px;
    }
`;

const Container = styled.a`
    max-width: 85%;
    background: #f1f6fe;
    border-radius: 16px 16px 16px 0px;
    padding: 14px 20px;
    margin: 0 10px;
    position: relative;

    @media only screen and (max-width: 640px) {
        padding: 5px 15px;
    }
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.8);
`;

export default ChatItemAttachmentLoader;
