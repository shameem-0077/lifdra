import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";

function TrialEnded({ isTrialended, setTrialEnded }) {
  useEffect(() => {
    if (isTrialended) {
      $("html").addClass("modal-enabled");
    } else {
      $("html").removeClass("modal-enabled");
    }
  }, [isTrialended]);
  const history = useHistory();

  return (
    <>
      <View className={isTrialended ? "overlay active" : "overlay"}></View>
      <View className={isTrialended ? "container active" : "container"}>
        <View className="contentBox">
          <View className="tick">
            <Image
              src={
                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-04-2023/Asset+17-8+2.jpg"
              }
            />
          </View>
          <Text className="Heading">Your trial has ended!</Text>
          <BottomText>
            Your 5 days free trial has ended. Upgrade now to continue learning.
          </BottomText>
          <ButtonContiner>
            <Cancel
              // to="/dashboard/"
              className="Btn"
              onClick={() => {
                setTrialEnded(!isTrialended);
              }}
            >
              <Text className="CnlTxt">Cancel</Text>
            </Cancel>
            <Button
              // to="/dashboard/"
              className="Btn"
              onClick={() => {
                setTrialEnded(!isTrialended);
                history.push("/nanodegree/");
              }}
            >
              <Text className="BtnTxt">Go to NanoDegree</Text>
            </Button>
          </ButtonContiner>
        </View>
      </View>
    </>
  );
}
const View = styled.div`
  &.overlay {
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    display: flex;
    flex: 1;
    height: 100%;
    aspect-ratio: 1;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 1000;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: none;

    &.active {
      display: block;
    }
  }
  &.container {
    width: 100%;
    display: flex;
    flex: 1;
    height: 100%;
    aspect-ratio: 1;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 1000;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    transition: ease 0.4s;
    transform: scale(0, 0);
    &.active {
      transform: scale(1, 1);
    }
  }
  &.contentBox {
    background: #fff;
    width: 600px;
    /* min-height: 55%; */
    border-radius: 10px;
    position: relative;
    box-sizing: border-box;
    padding: 20px 40px 40px 40px;
    border-bottom: 7px solid #2ca17f;
    ::after {
      content: "";
      width: 100%;
      height: 1px;
      border-top: 6px solid #27c590;
      position: absolute;
      bottom: -1px;
      left: 0;
    }

    @media all and (max-width: 700px) {
      width: 90%;
    }
    @media all and (max-width: 480px) {
      padding: 20px;
    }
  }
  &.Btn {
    background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    cursor: pointer;
  }
  &.tick {
    width: 150px;
    height: 150px;
    margin: 0 auto 25px;

    @media all and (max-width: 640px) {
      width: 100px;
      height: 100px;
    }
    @media all and (max-width: 480px) {
      margin-bottom: 0;
    }
  }
`;
const Image = styled.img`
  width: 100%;
`;
const Text = styled.p`
  padding: 0px;
  margin: 0px;
  &.Title {
    background: linear-gradient(97.32deg, #78bc6d 2.85%, #0ca3ac 96.04%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-family: "gordita_medium" !important;
    margin-top: 15px;
    font-size: 20px;
    width: 65%;
    text-align: center;
  }
  &.Heading {
    margin: 30px 0;
    font-size: 30px;
    color: #0a0a0a;
    font-family: "gordita_medium" !important;
    text-align: center;
    margin-bottom: 15px;

    @media all and (max-width: 640px) {
      font-size: 24px;
    }
  }
  &.subTitile {
    color: #009262;
    font-family: "gordita_regular";
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    text-align: center;
    margin-bottom: 30px;

    & span {
      color: #009262;
      font-family: "gordita_medium" !important;
    }

    & br {
      @media all and (max-width: 640px) {
        display: none;
      }
    }

    @media all and (max-width: 640px) {
      font-size: 15px;
    }
    @media all and (max-width: 480px) {
      font-size: 14px;
    }
  }
  &.BtnTxt {
    font-size: 15px;
    font-family: "gordita_medium" !important;
    color: #fff;
    @media all and (max-width: 480px) {
      font-size: 13px;
    }
  }
  &.CnlTxt {
    font-size: 15px;
    font-family: "gordita_medium" !important;
    color: #707070;
    @media all and (max-width: 480px) {
      font-size: 13px;
    }
  }
`;
const Button = styled.div`
  background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  cursor: pointer;
  width: 40%;
  text-decoration: none;
  @media all and (max-width: 480px) {
    padding: 10px 0px;
  }
`;
const BottomText = styled.p`
  margin-bottom: 30px;
  text-align: center;
`;
const ButtonContiner = styled.div`
  display: flex;
  justify-content: space-evenly;

  align-items: center;
`;
const Cancel = styled.div`
  background: #fff;
  border-radius: 8px;
  border: 1px solid #0fa76f;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  cursor: pointer;
  width: 40%;
  text-decoration: none;
  @media all and (max-width: 480px) {
    padding: 10px 0px;
  }
`;

export default TrialEnded;
