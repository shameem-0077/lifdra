import React, { useState } from "react";
import styled from "styled-components";
import AudioMsg from "./AudioMsg";
import Lightbox from "react-modal-image";
import ChatItemAttachment from "../chat/ChatItemAttachment";
import ChatItemLoader from "../chat/ChatItemLoader";
import { getTimeFromDate } from "../../../../helpers/functions";

export default function ChatMessage(props) {
  const renderAttachmentLoading = () => {
    let { uploading, selectedFile } = props;
    let { isUploadingAttachment, isUploadingImage, isUploadingAudio } =
      uploading;

    return isUploadingAttachment ? (
      <ChatItemLoader
        sender="user"
        type={"attachment"}
        attachment_name={selectedFile.name}
        attachment_size={this.bytesToSize(selectedFile.size)}
        attachment_type="other"
        time={new Date()}
      />
    ) : isUploadingImage ? (
      <ChatItemLoader
        sender="user"
        type="image"
        time={new Date()}
        show_image_modal={this.state.show_image_modal}
        onImageClick={this.renderImageModal}
      />
    ) : isUploadingAudio ? (
      <ChatItemLoader
        sender="user"
        type="image"
        time={new Date()}
        show_image_modal={this.state.show_image_modal}
        onImageClick={this.renderImageModal}
      />
    ) : null;
  };

  const renderChatItem = props.messages.map((item, index) => (
    <MsgItemContainer
      key={index}
      className="d-f"
      style={{
        padding:
          item.author === props.contactPk
            ? window.innerWidth <= 480
              ? "0 5px 0 0"
              : "0 24px 0 0"
            : window.innerWidth <= 480
            ? "0 0 0 5px"
            : "0 0 0 24px",
        flexDirection: item.author === props.contactPk ? "row-reverse" : "row",
      }}
    >
      {item.message_type === "text" ? (
        <MsgItem
          className="medium"
          user={item.author === props.contactPk && "user"}
          style={{
            background: item.author === props.contactPk ? "#55c597" : "#fff",
            color: item.author === props.contactPk ? "#fff" : "#3c434d",
            borderRadius: item.author === props.contactPk ? "#55c597" : "#fff",
          }}
        >
          {item.content}
        </MsgItem>
      ) : item.message_type === "image" ? (
        <ImageContainer>
          <Image small={item.image} medium={item.image} large={item.image} />
          {/* <Image src={item.image} /> */}
        </ImageContainer>
      ) : item.message_type === "audio" ? (
        <MsgItem
          user={item.author === props.contactPk && "user"}
          style={{
            background: item.author === props.contactPk ? "#55c597" : "#fff",
          }}
          className="medium"
        >
          <AudioMsg voice={item.audio} />
        </MsgItem>
      ) : item.message_type === "attachment" ? (
        <MsgItem
          user={item.author === props.contactPk && "user"}
          style={{
            background: "#fff",
            padding: "10px 15px",
          }}
          className="medium "
        >
          <ChatItemAttachment
            name={item.attachment_name}
            attachment_type={item.attachment_type}
            attachment_size={`${item.attachment_size} KB`}
            time={getTimeFromDate(item.timestamp)}
            attachment={`${item.attachment}`}
          />
        </MsgItem>
      ) : null}

      <Time
        is_groupable={item.is_groupable}
        style={{
          display: item.is_groupable ? "none" : "block",
          margin: item.author === props.contactPk ? "0 8px 0 0" : "0 0 0 8px",
        }}
      >
        {getTimeFromDate(item.timestamp)}
      </Time>
    </MsgItemContainer>
  ));

  return (
    <Container>
      <MsgList>
        {renderChatItem}
        {renderAttachmentLoading}
      </MsgList>
    </Container>
  );
}

const Container = styled.div`
  align-items: flex-end;
  margin-bottom: 30px;
`;
const MsgItemContainer = styled.div`
  margin-bottom: 10px;
  align-items: flex-end;
`;
const MsgList = styled.div``;
const MsgItem = styled.div`
  font-size: 16px;
  padding: 14px 19px;
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
  @media only screen and (max-width: 980px) {
    padding: 13px 18px;
  }
  @media only screen and (max-width: 640px) {
    font-size: 14px;
    max-width: 300px;
  }
`;
const Time = styled.span`
  color: #b0b9c2;
  font-size: 15px;
  @media only screen and (max-width: 640px) {
    font-size: 14px;
  }
  @media only screen and (max-width: 640px) {
    font-size: 12px;
  }
`;
const ImageContainer = styled.div`
  width: 34%;
  cursor: pointer;
  @media only screen and (max-width: 768px) {
    width: 40%;
  }
  @media only screen and (max-width: 480px) {
    width: 48%;
  }
`;
const Image = styled(Lightbox)`
  display: block;
  width: 100%;
  border-radius: 25px;
  overflow: hidden;
  @media only screen and (max-width: 768px) {
    border-radius: 10px;
  }
  @media only screen and (max-width: 480px) {
    border-radius: 5px;
  }
`;
