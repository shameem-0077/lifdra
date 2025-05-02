import React from "react";
import ChatItemAudio from "./ChatItemAudio";
import ChatItemImageLoader from "./ChatItemImageLoader";
import styled from "styled-components";
import ChatItemAttachmentLoader from "./ChatItemAttachmentLoader";

class ChatItemLoader extends React.PureComponent {
    renderType() {
        if (this.props.type === "audio") {
            return (
                <ChatItemAudio
                    audioFile={`https://learn.talrop.com${this.props.audio}`}
                />
            );
        }
        if (this.props.type === "attachment") {
            return (
                <ChatItemAttachmentLoader
                    name={this.props.attachment_name}
                    attachment_type={this.props.attachment_type}
                    attachment_size={this.props.attachment_size}
                    size="259.85 KB"
                    time={this.props.time}
                    attachment={this.props.attachment}
                />
            );
        }

        if (this.props.type === "image") {
            return (
                <ChatItemImageLoader
                    image={this.props.image}
                    time={this.props.time}
                    show_image_modal={this.props.show_image_modal}
                    onImageClick={this.initiateImageModal}
                />
            );
        }
    }

    onImageClick = (image_url) => {
        this.props.onImageClick(image_url);
    };

    initiateImageModal = (image_url) => {
        this.onImageClick(image_url);
    };

    renderStyle() {
        if (this.props.sender === "user") {
            return "flex-end";
        }
    }
    render() {
        return (
            <ChatItemContainer justify_content={this.renderStyle()}>
                {this.renderType()}
            </ChatItemContainer>
        );
    }
}

const ChatItemContainer = styled.div`
    font-size: 16px;
    /* background: ${(props) =>
        props.author === props.contactPk ? "#55c597" : "#f2f3f7"};
    color: ${(props) =>
        props.author === props.contactPk ? "#fff" : "#3c434d"}; */
    width: fit-content;
    border-top-left-radius: ${(props) =>
        props.user !== "user" ? "6px" : "25px"};
    border-bottom-left-radius: ${(props) =>
        props.user !== "user" ? "6px" : "25px"};
    border-top-right-radius: ${(props) =>
        props.user === "user" ? "6px" : "25px"};
    border-bottom-right-radius: ${(props) =>
        props.user === "user" ? "6px" : "25px"};
    max-width: 455px;
    &:last-child {
        margin-bottom: 0;
    }
    &:first-child {
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
        border-bottom-left-radius: ${(props) =>
            props.user !== "user" ? "6px" : "25px"};
        border-bottom-right-radius: ${(props) =>
            props.user === "user" ? "6px" : "25px"};
    }
    @media only screen and (max-width: 640px) {
        font-size: 14px;
        max-width: 300px;
    }
`;
export default ChatItemLoader;
