import React from "react";
import styled from "styled-components";

function SyllabusCard({ items }) {
  return (
    <>
      <Container>
        <ImgContainer>
          <img src={items.image} alt="image" />
        </ImgContainer>
        <Div>
          {items.time != " " ? <Top></Top> : null}
          <Heading>{items.heading}</Heading>
          <Subhead>{items.subhead}</Subhead>
        </Div>
      </Container>
    </>
  );
}

export default SyllabusCard;
const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-right: 20px;
  background: #f8f8f8;
  border-radius: 8px;
  padding: 20px;

  @media all and (max-width: 980px) {
    padding: 16px;
  }
`;
const ImgContainer = styled.div`
  margin: 0 auto;
  img {
    width: 100%;
    display: block;
    border-radius: 6px;
  }
`;
const Div = styled.div`
  padding-top: 15px;
`;
const Top = styled.div`
  display: none;
  justify-content: left;
  margin-bottom: 6px;
  transform: translateY(2px);
  align-items: center;
  img {
    width: 15px;
    display: block;
    margin-right: 6px;
    @media all and (max-width: 768px) {
      width: 16px;
    }
  }
  @media all and (max-width: 640px) {
    margin: 15px 0 7px 0px;
  }
`;
const Heading = styled.h5`
  color: #48445b;
  font-size: 15px;
  font-family: "gordita_medium";
  margin-top: 10px;
  @media all and (max-width: 1080px) {
    font-size: 15px;
  }
  @media all and (max-width: 980px) {
    font-size: 15px;
  }
  @media all and (max-width: 768px) {
    font-size: 14px;
  }
`;
const Time = styled.span`
  font-size: 14px;
  font-family: "gordita_medium";
  color: #497571;
  margin-top: 5px;
`;
const Subhead = styled.h6`
  color: #707070;
  font-size: 14px;
  font-family: "gordita_regular";
  margin-top: 10px;
`;
