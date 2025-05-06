import React, { useState } from "react";
import styled from "styled-components";
import { parseISO, format } from "date-fns";
import Moment from "moment";
import badge from "../../../assets/images/profile-screen/badge.svg";
import shareicon from "../../../assets/images/profile-screen/share.svg";

function CertificateBox({ userProfileDetails }) {
  const [certificatePage, setcertificatePage] = useState(3);
  const [isOptionModal, setOptionModal] = useState(false);
  const [selectedid, setSelectedId] = useState("");
  const [isDeleted, setDeleted] = useState(false);

  function formatDate(date) {
    if (!date) return "---";

    const parsedDate = parseISO(date);
    const formattedDate = format(parsedDate, "do MMMM yyyy");

    return formattedDate;
  }

  return (
    <>
      {userProfileDetails?.certificates?.length > 0 ? (
        <Certifications>
          <Heading>Certifications</Heading>
          {userProfileDetails?.certificates
            ?.slice(0, certificatePage)
            ?.map((certificate, index) => (
              <MainContent key={index}>
                <BothContainer>
                  <LeftContainer>
                    <Logo
                      src={certificate?.logo ? certificate?.logo : badge}
                      alt="Logo"
                    />
                  </LeftContainer>
                  <RightContainer>
                    <Heading>{certificate.name}</Heading>
                    <SmallText>{certificate.issued_by}</SmallText>
                    <Date>
                      <span>
                        Issued on {""}
                        {certificate.issued_date &&
                          formatDate(
                            Moment(certificate.issued_date)?.format(
                              "YYYY-MM-DD"
                            )
                          )}
                      </span>
                      {certificate?.valid_till ? (
                        <span className="expiry">
                          Expired on {""}
                          {formatDate(
                            Moment(certificate.valid_till)?.format("YYYY-MM-DD")
                          )}
                        </span>
                      ) : (
                        ""
                      )}
                    </Date>
                    <span>Certificate ID: {certificate.certificate_id}</span>
                    {certificate.link && (
                      <ViewButtonContainer
                        href={certificate.link}
                        target="blank"
                      >
                        <ViewButton>View certificate</ViewButton>
                        <ViewContainer>
                          <View src={shareicon} alt="Icon" />
                        </ViewContainer>
                      </ViewButtonContainer>
                    )}
                  </RightContainer>
                </BothContainer>
              </MainContent>
            ))}

          {userProfileDetails?.certificates?.length > certificatePage && (
            <More onClick={() => setcertificatePage(certificatePage + 3)}>
              View more
            </More>
          )}
        </Certifications>
      ) : (
        ""
      )}
    </>
  );
}

export default CertificateBox;

const Certifications = styled.div`
  background: #f9f9fb;
  padding: 24px;
  border-radius: 8px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Heading = styled.h4`
  font-size: 18px;
  font-family: "gordita_medium";
  color: #2d2d2d;
  margin-bottom: 30px;
  @media (max-width: 360px) {
    font-size: 13px;
  }
  @media (max-width: 640px) {
    font-size: 15px;
  }
`;
const AddContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  border-bottom: 1px solid #eaecf0;
  margin-bottom: 20px;
  padding-bottom: 20px;
  position: relative;
  overflow-wrap: break-word;
  word-break: break-all;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0px;
  }
`;
const BothContainer = styled.div`
  display: flex;

  @media (max-width: 480px) {
    flex-wrap: wrap;
  }
`;
const LeftContainer = styled.div`
  margin-right: 15px;
`;
const Logo = styled.img``;
const RightContainer = styled.div`
  span {
    font-size: 14px;
    color: #707070;
    margin-bottom: 12px;
    display: block;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;
const SmallText = styled.h5``;
const Date = styled.p`
  font-size: 14px;
  font-family: "gordita_medium";
  color: #707070;
  overflow-wrap: break-word;
  word-break: break-all;
  word-break: normal;

  & span {
    margin: 0;
    display: inline-block;

    &:last-child {
      position: relative;

      @media all and (max-width: 545px) {
        &:last-child {
          margin-left: 0;
        }
      }
    }
    &.expiry {
      margin-left: 20px;
    }
    &.expiry::before {
      content: "";
      width: 6px;
      height: 6px;
      background: #999292;
      position: absolute;
      border-radius: 50%;
      left: -12px;
      top: 44%;
      transform: translateY(-50%);
      @media all and (max-width: 545px) {
        display: none;
      }
    }
  }
`;
const ViewButtonContainer = styled.a`
  border: 1px solid #475467;
  padding: 6px;
  border-radius: 16px;
  cursor: pointer;
  width: 150px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ViewButton = styled.a`
  color: #475467;
  font-size: 14px;
  font-family: "gordita_medium";
  margin-right: 4px;
  padding-top: 2px;
`;
const ViewContainer = styled.div`
  width: 12px;
`;
const View = styled.img`
  width: 100%;
  display: block;
`;
const Common = styled.div`
  min-width: 23px;
  max-width: 23px;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
  }
`;
const More = styled.span`
  font-size: 14px;
  font-family: "gordita_medium";
  color: #3f3f46;
  display: block;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
