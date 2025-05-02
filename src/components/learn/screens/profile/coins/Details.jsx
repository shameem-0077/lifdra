import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { coinsConfig } from "../../../../../axiosConfig";
import { connect } from "react-redux";
import RouteLoading from "../../../../routing/RouteLoading.jsx";
import TalropEdtechHelmet from "../../../../helpers/TalropEdtechHelmet";

function mapStateToProps(state) {
  return {
    user_data: state.user_data,
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    updateActiveProfileMenu: (active_profile_menu) =>
      dispatch({
        type: "ACTIVE_PROFILE_MENU",
        active_profile_menu: active_profile_menu,
      }),
  };
}

function Details({ updateActiveProfileMenu, user_data }) {
  const [isLoading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    updateActiveProfileMenu("Coin Info");
    fetchDetails();
  }, []);

  const fetchDetails = () => {
    let { access_token } = user_data;
    setLoading(true);

    coinsConfig
      .get("/main/my-coin-deductions/", {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        const { StatusCode, data } = response.data;

        if (StatusCode === 6000) {
          setDetails(data);
          setLoading(false);
        } else if (StatusCode === 6001) {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const renderCard = details.map((item, index) => (
    <Card key={index}>
      <First>
        <Round>{index + 1}</Round>
        <CardTitle>{item.description}</CardTitle>
      </First>
      <Count>{`${item.coins} ${item.coins === 1 ? "Coin" : "Coins"}`}</Count>
    </Card>
  ));

  return isLoading ? (
    <RouteLoading />
  ) : (
    <>
      <TalropEdtechHelmet title="Coin info" />
      <PaddingContainer>
        <Title>Coin Info</Title>
        <CardsContainer>
          {details.length > 0 ? renderCard : null}
        </CardsContainer>
      </PaddingContainer>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchtoProps)(Details);

const First = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 360px) {
    position: relative;
  }
`;
const Title = styled.h4`
  font-family: "gordita_medium";
  font-size: 20px;
  margin-top: 10px;
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;
const CardsContainer = styled.div`
  margin-top: 26px;
  @media (max-width: 480px) {
    margin-top: 25px;
  }
`;
const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 15px 20px;
  border-radius: 18px;
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
  @media (max-width: 640px) {
    padding: 21px 16px;
    border-radius: 12px;
    margin-bottom: 12px;
  }
  @media (max-width: 480px) {
    padding: 15px 10px;
  }
  @media (max-width: 360px) {
    flex-wrap: wrap;
  }
`;
const Round = styled.span`
  width: 57px;
  height: 57px;
  margin-right: 30px;
  background: #f8f9fd;
  border-radius: 50%;
  display: flex;
  font-family: "gordita_medium";
  justify-content: center;
  align-items: center;
  @media (max-width: 640px) {
    width: 35px;
    height: 35px;
    margin-right: 14px;
    font-size: 14px;
  }
  @media (max-width: 360px) {
    position: absolute;
    top: 4px;
  }
`;
const CardTitle = styled.span`
  font-size: 16px;
  display: block;
  font-family: "gordita_medium";
  @media (max-width: 640px) {
    font-size: 16px;
    line-height: 1.4em;
  }
  @media (max-width: 640px) {
    font-size: 15px;
  }
  @media (max-width: 360px) {
    width: 100%;
    margin-left: 50px;
  }
`;
const Count = styled.span`
  font-size: 15px;
  font-family: "gordita_regular";
  display: block;
  color: #e9a030;
  @media (max-width: 640px) {
    font-size: 14px;
    line-height: 1.4em;
    width: 22%;
  }
  @media (max-width: 640px) {
    font-size: 13px;
  }
  @media (max-width: 480px) {
    width: 25%;
  }
  @media (max-width: 360px) {
    width: 100%;
    margin-left: 50px;
  }
`;
const PaddingContainer = styled.div`
  @media (max-width: 640px) {
    padding: 0 21px 13px;
  }
  @media (max-width: 480px) {
    padding: 0 17px 13px;
  }
  @media (max-width: 360px) {
    padding: 0 14px 13px;
  }
`;
