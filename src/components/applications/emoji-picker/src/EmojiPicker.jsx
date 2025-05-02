import React from "react";
import Picker from "emoji-picker-react";
import "../assets/css/style.css";

export default function EmojiPicker({ emojiEnabled,onEmojiClick }) {
    if (emojiEnabled) {
        return <Picker onEmojiClick={onEmojiClick} disableSearchBar />;
    } else return null;
}
