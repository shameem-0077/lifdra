import React from "react";
import { getTimeStrFromDate } from "../../../../helpers/functions";
import styled from "styled-components";

class ChatItemImageLoader extends React.PureComponent {
    onClick = (image_url) => {
        this.props.onImageClick(image_url);
    };

    render() {
        return (
            <div className="chat-item right" style={this.styles.chat_item}>
                <Overlay />
                <div className="content" style={this.styles.chat_item_content}>
                    <div className="img" style={this.styles.chat_item_img}>
                        <p>Uploading</p>
                    </div>
                </div>
                <div className="bottom" style={this.styles.chat_item_bottom}>
                    <span style={this.styles.chat_item_bottom_text}>
                        {getTimeStrFromDate(this.props.time)}
                    </span>
                </div>
            </div>
        );
    }
    styles = {
        chat_item: {
            marginBottom: "25px",
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "column",
            maxWidth: "35%",
        },
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
        chat_item_img: {
            width: "100%",
            margin: "0 10px",
            borderRadius: "16px",
            overflow: "hidden",
            cursor: "pointer",
            display: "block",
        },
    };
}

const Overlay = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.8);
`;

export default ChatItemImageLoader;
