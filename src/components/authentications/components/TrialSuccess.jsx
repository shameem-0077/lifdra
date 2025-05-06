import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "../../../../web/screens/exam-screens/components/modals/Loader";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function TrialSuccess() {
  const [showLoader, setShowLoader] = useState(false);
  const { is_trialSuccess } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  //For Showing Lotties

  useEffect(() => {
    let timer;
    if (is_trialSuccess) {
      setShowLoader(true);
      timer = setTimeout(() => {
        setShowLoader(false);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [is_trialSuccess]);

  return (
    <>
      <View className={is_trialSuccess ? "overlay active" : "overlay"}></View>
      <View className={is_trialSuccess ? "container active" : "container"}>
        {showLoader && <Loader />}
        <View className="contentBox">
          <View className="tick">
            <Image
              src={
                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-04-2023/celebration.svg"
              }
            />
          </View>
          <Text className="Heading">Congratulations!</Text>
          <Text className="subTitile">
            Your <span> 5 days </span> fully-featured free trail has started!
          </Text>
          <BottomText>
            Embark on your tech journey today and unlock endless possibilities!
          </BottomText>
          <Button
            className="Btn"
            onClick={() => {
              dispatch({
                type: "TOGGLE_IS_TEIALSUCCESS_UPDATE",
                is_trialSuccess: !is_trialSuccess,
              });
              history.push("/feed/");
            }}
          >
            <Text className="BtnTxt">Start now!</Text>
          </Button>
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
  }
`;
const Button = styled.div`
  background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  cursor: pointer;
  text-decoration: none;
`;
const BottomText = styled.p`
  margin-bottom: 30px;
  text-align: center;
`;
export default TrialSuccess;
