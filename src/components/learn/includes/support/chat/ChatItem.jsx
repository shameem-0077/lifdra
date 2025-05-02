import React from "react";
import { Link } from "react-router-dom";
import ChatItemMessage from "./ChatItemMessage";
import ChatItemAudio from "./ChatItemAudio";
import ChatItemAttachment from "./ChatItemAttachment";
import ChatItemImage from "./ChatItemImage";
import styled from "styled-components";

class ChatItem extends React.PureComponent {
    renderType() {
        if (this.props.type === "text") {
            return this.props.sender === "user" ? (
                <ChatItemMessage
                    message={this.props.message}
                    time={this.props.time}
                    background="#fff"
                    color="#6d6d6d"
                    radius="10px 10px 0px 10px"
                />
            ) : (
                <ChatItemMessage
                    message={this.props.message}
                    time={this.props.time}
                    background="#e8eefe"
                    color="#4d7afa"
                    direction="row-reverse"
                    radius="10px 10px 10px 0px"
                />
            );
        }
        if (this.props.type === "audio") {
            return <ChatItemAudio audioFile={`${this.props.audio}`} />;
        }
        if (this.props.type === "attachment") {
            return (
                <ChatItemAttachment
                    name={this.props.attachment_name}
                    attachment_type={this.props.attachment_type}
                    attachment_size={this.props.attachment_size}
                    size="259.85 KB"
                    time={this.props.time}
                    attachment={`${this.props.attachment}`}
                />
            );
        }

        if (this.props.type === "image") {
            return (
                <ChatItemImage
                    image={`${this.props.image}`}
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

    leftContent() {
        if (this.props.sender === "user") {
            return (
                <div className="action" style={this.styles.chat_item_action}>
                    <Link to="#" style={this.styles.chat_item_action_link}>
                        <i className="las la-ellipsis-h"></i>
                    </Link>
                </div>
            );
        } else {
            return (
                <ChatItemUser>
                    <span>SE</span>
                </ChatItemUser>
            );
        }
    }
    rightContent() {
        if (this.props.sender === "user") {
            return (
                <ChatItemUser>
                    <img
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/person.png"
                        style={this.styles.chat_item_user_image}
                        alt="Name"
                    />
                </ChatItemUser>
            );
        } else {
            return (
                <div className="action" style={this.styles.chat_item_action}>
                    <Link to="#" style={this.styles.chat_item_action_link}>
                        <i className="las la-ellipsis-h"></i>
                    </Link>
                </div>
            );
        }
    }
    renderStyle() {
        if (this.props.sender === "user") {
            return "flex-end";
        } else {
            return "flex-start ,flex-direction: row-reverse";
        }
    }
    render() {
        return (
            <ChatItemContainer justify_content={this.renderStyle()}>
                {this.leftContent()}
                {this.renderType()}
                {this.rightContent()}
            </ChatItemContainer>
        );
    }
    styles = {
        chat_item_content: {
            display: "flex",
            width: "100%",
            alignItems: "flex-end",
            justifyContent: "flex-start",
        },
        chat_item_user_image: {
            width: "100%",
            display: "block",
        },

        chat_item_bottom: {
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "20px",
            marginLeft: "50px",
        },
        chat_item_bottom_text: {
            color: "#A4A6B2",
            fontSize: "15px",
        },
        chat_item_action: {
            display: "flex",
            alignSelf: "center",
            display: "none",
        },
        chat_item_action_link: {
            color: "#A2A2A2",
        },
        chat_item_img: {
            width: "40%",
            margin: "0 10px",
            borderRadius: "16px",
            overflow: "hidden",
            cursor: "pointer",
        },
    };
}

const ChatItemContainer = styled.div`
    margin-bottom: 25px;
    display: flex;
    width: 100%;
    justify-content: ${(props) => props.justify_content};
    align-items: center;
    @media only screen and (max-width: 640px) {
        margin-bottom: 5px;
    }
`;
const ChatItemUser = styled.div`
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #4d7cfe;
    font-size: 14px;
    text-transform: uppercase;
    background: #e1ecfe;
    border-radius: 50%;
    overflow: hidden;
    @media only screen and (max-width: 640px) {
        display: none;
    }
`;

export default ChatItem;
