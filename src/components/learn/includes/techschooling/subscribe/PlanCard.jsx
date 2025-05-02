import React from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import dataAnimate from "../../../../../assets/lotties/basic-loader.json";
import { useSelector } from "react-redux";

const PlanCard = ({ data, onSelect, selected, subscriptionLoading }) => {
  const user_profile = useSelector((state) => state.user_profile);

  const dataLoader = {
    loop: true,
    autoplay: true,
    animationData: dataAnimate,
    rendererSettings: {},
  };

  if (subscriptionLoading) {
    return (
      <LottieCover>
        <Lottie options={dataLoader} height={100} width={100} />
      </LottieCover>
    );
  } else {
    return (
      <Container
        selected={data.id === selected ? "selected" : ""}
        onClick={() => onSelect && onSelect(data.id)}
      >
        <LeftBox>
          <Dot>
            <DotInner />
          </Dot>
          <TitleBox>
            <Title>{data.name}</Title>
            <Decription>{data.days} days duration</Decription>
          </TitleBox>
        </LeftBox>
        <RightBox>
          <PriceBox>
            <Price>
              {data.coins === 1 ? `${data.coins} Coin` : `${data.coins} Coins`}
            </Price>
            {user_profile.campus_verification_status === "approved" && (
              <PriceSmall>{data.actual_coins} Coins</PriceSmall>
            )}
          </PriceBox>
          <CostBox>
            <Cost>₹ {data.coins * 50}</Cost>
            {user_profile.campus_verification_status === "approved" && (
              <CostSmall>₹ {data.actual_coins * data.coin_value}</CostSmall>
            )}
          </CostBox>
        </RightBox>
      </Container>
    );
  }
};

export default PlanCard;

const Dot = styled.span`
  transform: translateY(4px);
  width: 10px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #5cc66a;
  border-radius: 50%;
  margin-right: 15px;
  @media all and (max-width: 360px) {
    margin-right: 6px;
  }
`;
const DotInner = styled.span`
  display: none;
  padding: 5px;
  border-radius: 50%;
  background-color: #5cc66a;
  @media (max-width: 640px) {
    padding: 2px;
  }
`;
const Container = styled.div`
  cursor: pointer;
  border: 0.5px solid #ccc;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  text-align: left;
  border-radius: 6px;
  margin-bottom: 10px;
  border-color: ${(props) => (props.selected === "selected" ? "#5cc66a" : "")};
  & ${Dot} {
    border-color: ${(props) =>
      props.selected === "selected" ? "#5cc66a" : ""};
    padding: ${(props) => (props.selected === "selected" ? "2px" : "")};
  }
  & ${DotInner} {
    display: ${(props) => (props.selected === "selected" ? "block" : "")};
  }
  border-color: ${(props) => (props.selected === "selected" ? "#5cc66a" : "")};
  &:hover {
    border-color: #5cc66a;
  }
  &:hover ${Dot} {
    border-color: #5cc66a;
    padding: 2px;
  }
  &:hover ${DotInner} {
    display: block;
  }
  &:last-child {
    margin-bottom: unset;
  }
  @media (max-width: 640px) {
    padding: 8px 11px;
  }
  @media (max-width: 360px) {
    padding: 8px 6px;
  }
`;
const LeftBox = styled.div`
  display: flex;
  margin-right: 10px;
`;
const RightBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;
const TitleBox = styled.div``;
const Title = styled.p`
  font-family: "gordita_medium";
  color: #333;
  @media (max-width: 640px) {
    font-size: 14px;
    margin-bottom: -3px;
  }
`;
const Decription = styled.small`
  font-family: gordita_regular;
  font-size: 13px;
  @media (max-width: 640px) {
    font-size: 13px;
  }
`;
const PriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
const Price = styled.p`
  font-family: "gordita_medium";
  color: #333;
  font-size: 14px;
  margin-right: 10px;
  @media (max-width: 640px) {
    font-size: 14px;
  }
`;
const PriceSmall = styled.span`
  text-decoration: line-through;
  font-family: gordita_regular;
  font-size: 13px;
  color: #999;
  @media (max-width: 640px) {
    font-size: 13px;
  }
`;
const CostBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
const Cost = styled.p`
  font-family: "gordita_medium";
  color: #5cc66a;
  font-size: 18px;
  margin-right: 10px;
  @media (max-width: 640px) {
    font-size: 12px;
  }
`;
const CostSmall = styled.span`
  text-decoration: line-through;
  font-family: "gordita_regular";
  color: #999;
  font-size: 13px;
  @media (max-width: 640px) {
    font-size: 11px;
  }
`;
const LottieCover = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
