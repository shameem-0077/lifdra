import html2canvas from "html2canvas";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getDateStr } from "../../../helpers/functions";

export default function IdCard() {
  const { user_profile, userSubscriptionType } = useSelector((state) => state);
  // const [imageUrl, setImageUrl] = useState("");

  // async function loadImage() {
  //   const response = await fetch(
  //     "https://ddl0zi5h2jlue.cloudfront.net/media/profile/SAVE_20230505_173158.jpg"
  //   );
  //   const blob = await response.blob();
  //   const url = URL.createObjectURL(blob);
  //   setImageUrl(url);
  // }

  // useEffect(() => {
  //   loadImage();
  // }, [user_profile.photo]);

  return (
    <>
      <IdContainer id="idcard" className="id-download-##">
        <TopImageContainer className="id-download-##">
          <TopImage
            className="id-download-##"
            src={require("../../../../assets/images/idcard/circleback.svg")}
            alt="Image"
          />
        </TopImageContainer>
        <AllContainer>
          <LogoContainer className="id-download-##">
            <Logo
              className="id-download-##"
              src={require("../../../../assets/images/idcard/id-logo.svg")}
              alt="Image"
            />
          </LogoContainer>
          {/* 
          {imageUrl ? (
            <IdDpContainer className="id-download-##">
              <IdDp
                src={imageUrl}
                alt={user_profile.name}
                className="id-download-##"
              />
            </IdDpContainer>
          ) : ( */}
          <IdDpContainer className="id-download-##">
            <IdDp
              className="id-download-##"
              src={require("../../../../assets/images/idcard/avatar.png")}
              // src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/avatar.png"
              alt="Image"
            />
          </IdDpContainer>
          {/* )} */}

          <IdName className="id-download-##">{user_profile.name}</IdName>
          <Position className="id-download-##">Student at Steyp</Position>
          <CardId className="id-download-##">ID:{user_profile?.user_id}</CardId>
          <ValidityContainer className="id-download-##">
            <Validity className="left id-download-##">
              <ValidityTop className="join id-download-##">
                Joined On
              </ValidityTop>
              <ValidityDate className="id-download-##">
                {getDateStr(user_profile.date_added)}
              </ValidityDate>
            </Validity>
            <Validity className="right id-download-##">
              <ValidityTop className="expiry id-download-##">
                Expiring On
              </ValidityTop>
              <ValidityDate>
                {getDateStr(user_profile.subscription_data.end_timestamp)}
              </ValidityDate>
            </Validity>
          </ValidityContainer>
          <BottomContainer className="id-download-##">
            <BottomImageContainer className="id-download-##">
              <BottomImage
                className="id-download-##"
                src={require("../../../../assets/images/idcard/bottom-image.svg")}
                // src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/bottom-image.svg
                // "
                alt="Image"
              />
            </BottomImageContainer>
            <ContactContainer className="id-download-##">
              <Contact className="id-download-##">
                <Tech className="id-download-##">
                  {user_profile.program.name}
                </Tech>
                <Url className="id-download-##">www.steyp.com</Url>
                <Number className="id-download-##">8589998066</Number>
              </Contact>
              <Right className="id-download-##">
                <QrContainer className="id-download-##">
                  <QRImage
                    className="id-download-##"
                    src={require("../../../../assets/images/idcard/qr-code.png")}
                    alt="Image"
                  />
                </QrContainer>
                {userSubscriptionType === "paid_subscription" &&
                user_profile.id ? (
                  <ReferralContainer className="id-download-##">
                    {user_profile.subscription_data.referral_code ? (
                      <>
                        <Referral className="id-download-##">
                          Referral Code:
                        </Referral>
                        <Code className="id-download-##">
                          {user_profile.subscription_data
                            ? user_profile.subscription_data.referral_code
                            : ""}
                        </Code>
                      </>
                    ) : null}
                  </ReferralContainer>
                ) : null}
              </Right>
            </ContactContainer>
          </BottomContainer>
        </AllContainer>
      </IdContainer>
    </>
  );
}

const IdContainer = styled.div`
  width: 300px;
  height: 470px;
  border-radius: 5px;
  background: #fff;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #f1f5f0;
  position: relative;
`;
const TopImageContainer = styled.div`
  height: 261px;
  overflow: hidden;
`;
const TopImage = styled.img`
  width: 100%;
  display: block;
`;
const AllContainer = styled.div`
  margin-top: -190px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LogoContainer = styled.div`
  width: 24%;
  margin-bottom: 20px;
`;
const Logo = styled.img`
  display: block;
  width: 100%;
`;
const IdDpContainer = styled.div`
  width: 36%;
  border: 1px solid #60d141;
  border-radius: 50%;
  /* padding: 3px; */
  overflow: hidden;
`;
const IdDp = styled.img`
  display: block;
  width: 100%;
`;
const IdName = styled.div`
  text-align: center;
  line-height: 1.3;
  margin-top: 10px;
  font-family: "baloo_paaji_2semibold";
  font-size: 20px;
  text-transform: capitalize;
`;
const Position = styled.p`
  color: #333333;
  font-family: "gordita_medium";
  font-size: 14px;
`;
const CardId = styled.p`
  color: #15bf81;
  font-size: 16px;
  font-family: "gordita_medium";
  margin-top: -3px;
  font-size: 15px;
`;
const ValidityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 3px;
`;
const Validity = styled.div`
  &.left {
    padding-right: 5px;
    text-align: right;
    border-right: 1px solid #60d141;
  }
  &.right {
    padding-left: 5px;
    text-align: left;
  }
`;
const ValidityTop = styled.div`
  font-size: 14px;
  border-bottom: 1px solid #60d141;
`;
const ValidityDate = styled.div`
  font-size: 15px;
`;
const BottomContainer = styled.div`
  margin-top: 11px;
`;
const BottomImageContainer = styled.div`
  overflow: hidden;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
`;
const BottomImage = styled.img`
  display: block;
  width: 100%;
`;
const ContactContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin-bottom: 10px;
`;
const Contact = styled.div`
  width: 67%;
  color: #fff;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: flex-end;
  margin-bottom: 4px;
`;
const Tech = styled.div`
  font-size: 13px;
  line-height: 1;
  font-family: "gordita_medium";
`;
const Url = styled.div`
  font-size: 12px;
`;
const Number = styled.div`
  font-size: 12px;
  line-height: 1;
`;
const Right = styled.div`
  width: 57%;
  padding-right: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const QrContainer = styled.div`
  width: 50px;
`;
const QRImage = styled.img`
  display: block;
  width: 100%;
`;
const ReferralContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Referral = styled.p`
  font-size: 10px;
  color: #fff;
  opacity: 0.62;
  margin-right: 5px;
  margin-top: 2.4px;
`;
const Code = styled.div`
  color: #fff;
  font-size: 13px;
  font-family: "gordita_medium";
`;
