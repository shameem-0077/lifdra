import React from "react";
import { getTimeStrFromDate } from "../../../../helpers/functions";

class ChatItemImage extends React.PureComponent {
    onClick = (image_url) => {
        this.props.onImageClick(image_url);
    };

    render() {
        return (
            <div className="chat-item right" style={this.styles.chat_item}>
                <div className="content" style={this.styles.chat_item_content}>
                    <div className="img" style={this.styles.chat_item_img}>
                        <img
                            onClick={(e) => this.onClick(this.props.image)}
                            src={this.props.image}
                            alt=""
                            style={{
                                width: "auto",
                                height: "auto",
                                maxWidth: "100%",
                                maxHeight: "100%",
                            }}
                        />
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

export default ChatItemImage;
