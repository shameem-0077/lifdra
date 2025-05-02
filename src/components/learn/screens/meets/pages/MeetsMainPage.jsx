import React from "react";
import styled from "styled-components";
import MeetCard from "../components/MeetCard";
import { meetCardsData } from "../test";


const MeetsMainPage = () => {
   console.log(meetCardsData);
   
  return (
    <>
      <div className="meet-mainpage">
        <MainContainer>
          <Heading>
           Upcoming Meets 
          </Heading>

          <Cards>
            {
              meetCardsData.map((datas, i)=>{
                console.log(datas);
                
                 return <MeetCard key={i} datas={datas}/>
              })
            }
              <MeetCard/>
          </Cards>
        </MainContainer>
       
      </div>
    </>
  );
};

export default MeetsMainPage;

const pxToRem = (px) => `${(px / 14).toFixed(2)}rem`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 1023px) {
    padding: 0 16px;
  }
`;

const Heading = styled.h2`
  font-family: "gordita_medium";
  font-size: ${pxToRem(24)};
  color: #202939;

  @media (max-width: 1023px) {
    font-size: ${pxToRem(20)};
  }
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;
  justify-items: center;

  @media (max-width: 1248px) {
    gap: 16px;
  }
  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
  }

  @media (max-width: 649px) {
    gap: 18px;
    grid-template-columns: repeat(1, 1fr);
    justify-content: center;
  }
`;

