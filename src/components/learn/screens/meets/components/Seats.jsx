import React from "react";
import styled from "styled-components";

const Seats = ({totalSeats, totalRegistrations}) => {
  return (
    <>
      <MainContainer>
        <Container>
          <p>Total Seats</p>
          <span>{totalSeats}</span>
        </Container>

        <Container>
          <p>Registrations</p>
          <span style={{color:"#047853"}}>{totalRegistrations}</span>
        </Container>
      </MainContainer>
    </>
  );
};

export default Seats;

const pxToRem = (px) => `${(px / 14).toFixed(2)}rem`;

const MainContainer = styled.div`
  max-width: 221px;
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-shrink: 0;


  p {
    font-family: "gordita_regular";
    font-size: ${pxToRem(14)};
    color: #475467;
    margin: 0 !important; 

  }

  span {
    font-family: "gordita_medium";
    font-size: ${pxToRem(14)};

  }
`;
