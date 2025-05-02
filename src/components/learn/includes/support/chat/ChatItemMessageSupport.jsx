import React from "react";
import { Link } from "react-router-dom";

class ChatItemMessageSupport extends React.PureComponent {
    render() {
        return (
            <div className="chat-item left" style={this.styles.chat_item}>
                <div className="content" style={this.styles.chat_item_content}>
                    <div className="user" style={this.styles.chat_item_user}>
                        <span>{this.props.type}</span>
                    </div>
                    <div
                        className="message"
                        style={this.styles.chat_item_content_message}
                    >
                        <p
                            style={
                                this.styles.chat_item_content_message_content
                            }
                        >
                            {this.props.message}
                        </p>
                        <span style={this.styles.chat_item_bottom_text}>
                            {this.props.time}
                        </span>
                    </div>
                    <div
                        className="action"
                        style={this.styles.chat_item_action}
                    >
                        <Link to="#" style={this.styles.chat_item_action_link}>
                            <i className="las la-ellipsis-h"></i>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
    styles = {
        chat_item_content_message: {
            background: "#E1ECFE",
            padding: "10px 18px",
            borderRadius: "16px",
            borderBottomLeftRadius: 0,
            color: "#4D7CFE",
            margin: "0 10px",
            Width: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between"
        },
        chat_item_content_message_content: {
            fontFamily: "product_sansbold"
        },
        chat_item: {
            marginBottom: "25px",
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "column",
            width: "70%"
        },
        chat_item_user: {
            width: "36px",
            height: "36px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#4D7CFE",
            fontSize: "14px",
            textTransform: "uppercase",
            background: "#E1ECFE",
            borderRadius: "50%",
            overflow: "hidden"
        },
        chat_item_content: {
            display: "flex",
            maxWidth: "55%",
            alignItems: "flex-end",
            justifyContent: "flex-start"
        },
        chat_item_user_image: {
            width: "100%",
            display: "block"
        },

        chat_item_bottom: {
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "20px",
            marginLeft: "50px"
        },
        chat_item_bottom_text: {
            color: "#A4A6B2",
            fontSize: "15px"
        },
        chat_item_action: {
            display: "flex",
            alignSelf: "center"
        },
        chat_item_action_link: {
            color: "#A2A2A2"
        },
        chat_item_img: {
            width: "40%",
            margin: "0 10px",
            borderRadius: "16px",
            overflow: "hidden",
            cursor: "pointer"
        }
    };
}

export default ChatItemMessageSupport;
