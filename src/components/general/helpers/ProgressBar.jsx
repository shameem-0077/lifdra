import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ProgressBar = ({ value, height }) => {
  let val = value == null ? 0 : value;
  let [percent, setPercent] = useState(val);

  useEffect(() => {
    setPercent(Math.min(100, Math.max(val, 0)).toFixed());
  }, [val]);
  const percentage = (completedModulesCount, totalModulesCount) => {
    if (totalModulesCount === 0) {
      return 0;
    }
    return (completedModulesCount / totalModulesCount) * 100;
  };
  return (
    <>
      <MainContainer>
        <Bar val={percent} height={height}>
          <div />
        </Bar>
        <Value>{percent}%</Value>
      </MainContainer>
    </>
  );
};

export default ProgressBar;

const MainContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;
const Bar = styled.div`
  width: 100%;
  height: ${({ height }) => `${height}px`};
  background-color: #e3e8ef;
  border-radius: 8px;
  overflow: hidden;
  div {
    height: 100%;
    width: ${({ val }) => `${val}%`};
    background-color: #059664;
    border-radius: 8px;
  }
`;
const Value = styled.div`
  font-family: "gordita_medium";
  font-size: 12px;
  color: #364152;
`;
