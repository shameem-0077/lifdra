import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const FormattedTextarea = ({ value, onChange, placeholder }) => {
  const textareaRef = useRef(null);
  const [formattedContent, setFormattedContent] = useState("");

  useEffect(() => {
    adjustTextareaHeight();
    formatContent(value);
  }, [value]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleInput = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  const formatContent = (text) => {
    if (!text) {
      setFormattedContent("");
      return;
    }

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const formattedText = text.replace(urlRegex, '<span class="url">$1</span>');
    setFormattedContent(formattedText);
  };

  return (
    <Container>
      <StyledTextarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        placeholder={placeholder}
      />
      <FormattedContent
        dangerouslySetInnerHTML={{ __html: formattedContent || placeholder }}
        isEmpty={!value}
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 50px;
  resize: none;
  font-size: 18px;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  color: transparent;
  caret-color: black;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  overflow: hidden;
  line-height: 1.5;
  padding: 0;
`;

const FormattedContent = styled.div`
  width: 100%;
  min-height: 50px;
  font-size: 18px;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: ${(props) => (props.isEmpty ? "#999" : "inherit")};
  pointer-events: none;
  line-height: 1.5;

  .url {
    color: rgba(15, 167, 111, 1);
    text-decoration: underline;
  }
`;

export default FormattedTextarea;
