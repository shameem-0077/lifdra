import React from "react";
import styled from "styled-components";

function TrendToggle({ selected, setSelected }) {
  return (
    <>
      <TabContainer>
        <PostSwitchDiv>
          <Option
            selected={selected === "for_you"}
            onClick={() => setSelected("for_you")}
          >
            {selected === "for_you" ? (
              <SparklesIcon>
                <img src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/01-06-2024/foryou-active.svg" />
              </SparklesIcon>
            ) : (
              <SparklesIcon>
                <img src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/01-06-2024/foryou.svg" />
              </SparklesIcon>
            )}
            <span>For you</span>
          </Option>
          <Option
            selected={selected === "trending"}
            onClick={() => setSelected("trending")}
          >
            {selected === "trending" ? (
              <SparklesIcon>
                <img src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/01-06-2024/trend-active.svg" />
              </SparklesIcon>
            ) : (
              <SparklesIcon>
                <img src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/01-06-2024/trend.svg" />
              </SparklesIcon>
            )}
            <span>Trending</span>
          </Option>
          <ActiveIndicator selected={selected} />
        </PostSwitchDiv>
      </TabContainer>
    </>
  );
}

export default TrendToggle;

const PostSwitchDiv = styled.div`
  display: flex;
  background-color: #eef2f6;
  border-radius: 30px;
  padding: 4px;
  margin: 16px 0;
  position: relative;
  max-width: 272px;
  height: 50px;
  width: 100%;
  justify-content: space-between;
  @media all and (max-width: 440px) {
    max-width: 100%;
    height: 44px;
    margin-top: 6px;
  }
`;

const Option = styled.button`
  flex: 1;
  font-family: "gordita_medium";
  font-weight: 500;
  font-size: 1rem;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  z-index: 2;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;

  span {
    font-family: "gordita_medium";
    font-weight: 500;
    font-size: 1rem;
    color: ${(props) => (props.selected ? "#0FA76F" : "#697586")};
    transition: color 0.3s ease;
  }
  &:focus {
    outline: none;
  }

  @media all and (max-width: 440px) {
    span {
      font-size: 14px;
    }
  }
`;

const SparklesIcon = styled.div`
  margin-right: 6px;
  display: inline-block;
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;

  img {
    width: 100%;
    display: inline-block;
  }

  ${Option}:hover & {
    transform: scale(1.1);
  }
`;

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ActiveIndicator = styled.div`
  position: absolute;
  top: 3px;
  left: ${(props) => (props.selected === "for_you" ? "3px" : "50%")};
  width: calc(50% - 3px);
  height: calc(100% - 6px);
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 1;
`;
