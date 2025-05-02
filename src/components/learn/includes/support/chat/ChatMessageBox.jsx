import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

class ChatMessageBox extends React.PureComponent {
    render() {
        return window.innerWidth <= 640 ? (
            <div className="message-box" style={this.styles.mobile_message_box}>
                <div className="actions" style={this.styles.actions}>
                    <label
                        htmlFor="attachment"
                        className="attachement"
                        style={this.styles.attachement}
                    >
                        <MessageIcon className="las la-paperclip"></MessageIcon>
                    </label>
                    <input
                        id="attachment"
                        name="attachment"
                        style={{ visibility: "hidden", position: "absolute" }}
                        type="file"
                        onChange={(e) => {
                            this.props.onUploadAttachment(e, "attachment");
                        }}
                    />
                    <label
                        htmlFor="chatImage"
                        className="image"
                        style={this.styles.image}
                    >
                        <MessageIcon className="las la-image"></MessageIcon>
                    </label>
                    <input
                        id="chatImage"
                        name="chatImage"
                        style={{ visibility: "hidden", position: "absolute" }}
                        type="file"
                        accept="image/x-png,image/gif,image/jpeg"
                        onChange={(e) => {
                            this.props.onUploadAttachment(e, "image");
                        }}
                    />
                </div>
                <MessageForm action="#">
                    <textarea
                        name=""
                        placeholder="Type your message"
                        id=""
                        cols="30"
                        rows="1"
                        onKeyDown={this.props.handleKeyDown}
                        onChange={this.props.onEnterText}
                        style={this.styles.message_input}
                        value={this.props.value}
                    ></textarea>
                </MessageForm>
                <Link
                    to="#"
                    onClick={this.props.recordAudio}
                    className="audio"
                    style={this.styles.audio}
                >
                    <MessageIcon className="las la-microphone"></MessageIcon>
                </Link>
                <MobileSend
                    onClick={this.props.onSendMessageHandler}
                    className="send"
                >
                    <i className="las la-paper-plane"></i>
                </MobileSend>
            </div>
        ) : (
            <div className="message-box" style={this.styles.message_box}>
                <div className="actions" style={this.styles.actions}>
                    <label
                        htmlFor="attachment"
                        className="attachement"
                        style={this.styles.attachement}
                    >
                        <MessageIcon className="las la-paperclip"></MessageIcon>
                    </label>
                    <input
                        id="attachment"
                        name="attachment"
                        style={{ visibility: "hidden", position: "absolute" }}
                        type="file"
                        onChange={(e) => {
                            this.props.onUploadAttachment(e, "attachment");
                        }}
                    />
                    <label
                        htmlFor="chatImage"
                        className="image"
                        style={this.styles.image}
                    >
                        <MessageIcon className="las la-image"></MessageIcon>
                    </label>
                    <input
                        id="chatImage"
                        name="chatImage"
                        style={{ visibility: "hidden", position: "absolute" }}
                        type="file"
                        accept="image/x-png,image/gif,image/jpeg"
                        onChange={(e) => {
                            this.props.onUploadAttachment(e, "image");
                        }}
                    />
                </div>
                <MessageForm action="#">
                    <textarea
                        name=""
                        placeholder="Type your message"
                        id=""
                        cols="30"
                        rows="1"
                        onKeyDown={this.props.handleKeyDown}
                        onChange={this.props.onEnterText}
                        style={this.styles.message_input}
                        value={this.props.value}
                    ></textarea>
                </MessageForm>
                <Link
                    to="#"
                    onClick={this.props.recordAudio}
                    className="audio"
                    style={this.styles.audio}
                >
                    <MessageIcon className="las la-microphone"></MessageIcon>
                </Link>
                <Send
                    onClick={this.props.onSendMessageHandler}
                    className="send"
                >
                    <i className="las la-paper-plane"></i>
                </Send>
            </div>
        );
    }
    styles = {
        message_box: {
            display: "flex",
            justifyContent: " space-between",
            padding: "30px 10px 10px",
            position: "relative",
            alignItems: "center",
        },
        mobile_message_box: {
            display: "flex",
            justifyContent: " space-between",
            padding: "5px",
            position: "relative",
            alignItems: "center",
        },
        actions: {
            width: "8%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        message_icon: {
            fontSize: "28px",
            color: "#a6a6a6",
        },
        message_input: {
            width: "100%",
            padding: "10px",
            resize: "none",
            fontSize: "14px",
        },
        audio: {
            width: "8%",
        },
    };
}

const MobileSend = styled.div`
    background: #4d7afa;
    height: 40px;
    width: 40px;
    color: #fff;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
`;
const Send = styled.div`
    background: #4d7afa;
    height: 60px;
    width: 60px;
    color: #fff;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -30px;
    right: 10px;

    @media only screen and (max-width: 1500px) {
        height: 45px;
        width: 45px;
        top: -22px;
    }
`;
const MessageForm = styled.form`
    width: 80%;
    @media only screen and (max-width: 930px) {
        width: 75%;
    }
    @media only screen and (max-width: 770px) {
        width: 70%;
    }
    @media only screen and (max-width: 450px) {
        width: 65%;
    }
    @media only screen and (max-width: 400px) {
        width: 60%;
    }
`;
const MessageIcon = styled.i`
    font-size: 28px;
    color: #a6a6a6;
    @media only screen and (max-width: 500px) {
        font-size: 22px;
    }
    @media only screen and (max-width: 640px) {
        font-size: 20px;
    }
`;

export default ChatMessageBox;
