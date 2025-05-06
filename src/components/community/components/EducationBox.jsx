import React, { useState } from "react";
import styled from "styled-components";
import Moment from "moment";
import { parseISO, format } from "date-fns";
import textbook from "../../../assets/images/profile-screen/textbook.svg";

function EducationBox({ userProfileDetails }) {
  const [academicDetailsPage, setacademicDetailsPage] = useState(3);
  const [isModal, setModal] = useState(false);
  const [selectedid, setSelectedId] = useState("");
  const [isDeleted, setDeleted] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [confirmationHeading, setConfirmationHeading] = useState("");
  const [deleteCondition, setDeleteCondition] = useState("");

  function formatDate(date) {
    if (!date) return "---";

    const parsedDate = parseISO(date);
    const formattedDate = format(parsedDate, "do MMMM yyyy");

    return formattedDate;
  }

  return (
    <>
      {userProfileDetails?.academic_history?.length > 0 ? (
        <Education>
          <Heading>Education</Heading>
          {userProfileDetails?.academic_history
            ?.slice(0, academicDetailsPage)
            ?.map((item, index) => (
              <InstituteLogoContainer key={index}>
                <div>
                  <LogoContainer>
                    <InstituteLogo
                      src={
                        item?.institute?.logo ? item?.institute?.logo : textbook
                      }
                      alt="textbookImage"
                    />
                  </LogoContainer>
                  <SubHeadingText>
                    {item?.speciality?.name
                      ? item?.speciality?.name
                      : item?.student_class?.name}
                  </SubHeadingText>
                  <SubParagraph>
                    {item?.campus_name
                      ? item?.campus_name
                      : item?.institute?.name}
                  </SubParagraph>
                  <SubParagraph className="flex">
                    {item?.start_date &&
                      formatDate(
                        Moment(item?.start_date)?.format("YYYY-MM-DD")
                      )}

                    {item?.is_current ? (
                      " - Present"
                    ) : item?.end_date ? (
                      <>
                        {" - "}
                        {formatDate(
                          Moment(item.end_date)?.format("YYYY-MM-DD")
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </SubParagraph>
                </div>
              </InstituteLogoContainer>
            ))}
          {userProfileDetails?.academic_history?.length >
            academicDetailsPage && (
            <MoreDetails
              className="double"
              onClick={() => setacademicDetailsPage(academicDetailsPage + 3)}
            >
              View more
            </MoreDetails>
          )}
        </Education>
      ) : (
        ""
      )}
    </>
  );
}

export default EducationBox;

const Education = styled.div`
  background: #f9f9fb;
  padding: 24px;
  border-radius: 8px;
  /* margin-bottom: 15px; */

  span {
    font-size: 14px;
    font-family: "gordita_medium";
  }
`;
const SubContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Plus = styled.img`
  display: block;
  width: 100%;
`;
const AddText = styled.h3`
  font-size: 16px;
  font-family: "gordita_medium";
  padding-top: 4px;
  @media (max-width: 640px) {
    font-size: 14px;
  }
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
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const InstituteLogoContainer = styled.div`
  border-bottom: 1px solid #eaecf0;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  overflow-wrap: break-word;
  word-break: break-all;
  position: relative;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0px;
  }
`;
const LogoContainer = styled.div`
  width: 48px;
  margin-bottom: 12px;
  @media (max-width: 640px) {
    width: 43px;
  }
`;
const InstituteLogo = styled.img`
  display: block;
  width: 100%;
`;
const SubHeadingText = styled.h4`
  font-size: 16px;
  font-family: "gordita_medium";
  color: #2d2d2d;
  margin-bottom: 5px;
  overflow-wrap: break-word;
  word-break: break-all;
  word-break: normal;
  @media (max-width: 640px) {
    font-size: 15px;
  }
  @media (max-width: 360px) {
    font-size: 13px;
  }
`;
const SubParagraph = styled.p`
  font-size: 14px;
  font-family: "gordita_regular";
  margin-bottom: 5px;
  color: rgba(45, 45, 45, 1);
  overflow-wrap: break-word;
  word-break: break-all;
  word-break: normal;
  &.flex {
    color: #707070;
    font-size: 14px;
    font-family: "gordita_regular";
    overflow-wrap: break-word;
    word-break: break-all;
    word-break: normal;
  }

  span {
    display: block;
    color: rgba(112, 112, 112, 1);
    font-family: "gordita_regular";
    margin-bottom: 20px;
  }
  @media (max-width: 360px) {
    font-size: 13px;
  }
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
const MoreDetails = styled.span`
  font-size: 14px;
  display: block;
  color: #3f3f46;
  cursor: pointer;
  &.double {
    border-bottom: ${({ isborder }) => isborder && "1px solid #eaecf0"};
    padding-bottom: ${({ isborder }) => isborder && "20px"};
  }
`;
