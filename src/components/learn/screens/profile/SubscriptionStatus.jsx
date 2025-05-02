import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDateStr } from "../../../helpers/functions";

function SubscriptionStatus() {
  const user_profile = useSelector((state) => state.user_profile);
  const [state, setState] = useState({});
  const userSubscriptionType = useSelector(
    (state) => state.userSubscriptionType
  );
  const studentData = useSelector((state) => state.user_profile);
  const subscription_states = [
    {
      image:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/renew.png",
      title: "Tech Schooling Subscription",
      description: `Your subscription started on $start_date and will end on $end_date.`,
      background: "#6488d4",
      status: "Active",
      color: "#4ee3aa",
      button: "extend",
    },
    {
      image:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/renew1.png",
      title: "Tech Schooling Subscription",
      description:
        "Your subscription has expired. Please renew your subscription to continue learning.",
      background: "#f8acac",
      status: "Expired",
      color: "#f17578",
      button: "renew",
    },
    {
      image:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/renew1.png",
      title: "Tech Schooling Subscription",
      description:
        "Your trial has expired. Please subscribe to continue learning.",
      background: "#f8acac",
      status: "Trial Expired",
      color: "#f17578",
      button: "subscribe",
    },
    {
      image:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/renew1.png",
      title: "Tech Schooling Subscription",
      description:
        "You have not yet subscribed to Tech Schooling. Subscribe now to build your tech career for Industry 4.0.",
      background: "#93a7b0",
      status: "",
      color: "",
      button: "subscribe",
    },
    {
      image:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/renew.png",
      title: "Tech Schooling Subscription",
      description: `Your trial started on $start_date and will end on $end_date.`,
      background: "#6488d4",
      status: "Trial",
      color: "#4ee3aa",
      button: "subscribe",
    },
  ];

  useEffect(() => {
    let data = null;
    if (userSubscriptionType === "paid_subscription") {
      data = subscription_states.find((item) => item.status === "Active");
      data.description = data.description.replace(
        "$start_date",
        getDateStr(user_profile.subscription_data.start_timestamp)
      );
      data.description = data.description.replace(
        "$end_date",
        getDateStr(user_profile.subscription_data.end_timestamp)
      );
    } else if (userSubscriptionType === "trial_active") {
      data = subscription_states.find((item) => item.status === "Trial");
      data.description = data.description.replace(
        "$start_date",
        getDateStr(user_profile.subscription_data.start_timestamp)
      );
      data.description = data.description.replace(
        "$end_date",
        getDateStr(user_profile.subscription_data.end_timestamp)
      );
    } else if (userSubscriptionType === "trial_end") {
      data = subscription_states.find(
        (item) => item.status === "Trial Expired"
      );
    } else if (userSubscriptionType === "expired_subscription") {
      data = subscription_states.find((item) => item.status === "Expired");
    } else {
      data = subscription_states.find((item) => item.status === "");
    }
    setState(data);
  }, [userSubscriptionType]);

  return (
    userSubscriptionType !== "" && (
      <Container background={state.background}>
        <Top>
          {/* <Title>{state.title}</Title> */}
          <Title>{studentData.program.name}</Title>
          <Status
            style={{
              display: state.status === "none" && "none",
            }}
            color={state.color}
          >
            {state.status}
          </Status>
        </Top>
        <Content>{state.description}</Content>
        <Bottom>
          {/* <Button to="/tech-schooling/subscribe/">
                        {state.button}
                    </Button> */}
          <ImageContainer>
            <Image src={state.image} alt="Image" />
          </ImageContainer>
        </Bottom>
      </Container>
    )
  );
}
const Container = styled.div`
  background: ${(props) => props.background};
  padding: 19px 18px 6px 18px;
  border-radius: 5px;
  margin-bottom: 10px;
  @media all and (max-width: 640px) {
    margin-bottom: 20px;
  }
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h2`
  text-transform: capitalize;
  font-family: "gordita_medium";
  font-size: 18px;
  color: #fff;
  margin-right: 7px;
`;
const Status = styled.span`
  background: ${(props) => props.color};
  color: #fff;
  font-family: "gordita_medium";
  font-size: 14px;
  height: 31px;
  width: 109px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 5px;
  @media (max-width: 1100px) {
    width: 150px;
  }
`;
const Content = styled.p`
  color: #fff;
  font-family: "gordita_regular";
  font-size: 13px;
  margin: 10px 0 10px 0;
  max-width: 300px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Button = styled(Link)`
  border: 1px solid #fff;
  width: 130px;
  height: 40px;
  display: flex;
  font-family: "gordita_regular";
  font-size: 13px;
  align-items: center;
  border-radius: 5px;
  justify-content: center;
  color: #fff;
  text-transform: capitalize;
`;
const ImageContainer = styled.div``;
const Image = styled.img`
  display: block;
  width: 100%;
`;

export default SubscriptionStatus;
