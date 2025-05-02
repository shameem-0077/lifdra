import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import PlaceHolder from "../../../../general/PlaceHolder";
// import { secondsTohm } from "../../../../helpers/functions";

function PrimeProgramCourseCard({ data }) {
  const secondsTohm = (d) => {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);

    let hDisplay = h > 0 ? h + (h === 1 ? "h" : "h") + (m > 0 ? ", " : "") : "";
    let mDisplay = m > 0 ? m + (m === 1 ? "m" : "m") : "";
    return hDisplay + mDisplay;
  };
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  function onLoad() {
    setIsLoading(false);
  }

  return (
    <Course key={data.id} to={`/prime-programs/${data.slug}/info/`}>
      <PlaceHolder isLoading={isLoading} paddingTop="55.34%" />
      <Thumbnail>
        <img
          style={{ display: isLoading ? "none" : "block" }}
          src={data.cover_image}
          onLoad={onLoad}
          alt="Course thumnail"
        />
      </Thumbnail>
      <DetailsSection>
        <Play
          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/play.svg"
          alt="Play button"
        />
        <LabelSection>
          <Duration>
            <Icon>
              <img
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/clock.svg"
                alt="icon"
              />
            </Icon>{" "}
            {secondsTohm(data.duration)}
          </Duration>
        </LabelSection>
        <CourseName>{data.name}</CourseName>
      </DetailsSection>
      <BottomSection>
        <ViewCourse
          onClick={(e) => {
            history.push({
              pathname: `/prime-programs/${data.slug}/info`,
            });
          }}
        >
          View Course
        </ViewCourse>
        <Arrow>
          <img
            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/19-03-2022/union.svg"
            alt=""
          />
        </Arrow>
      </BottomSection>
    </Course>
  );
}

export default PrimeProgramCourseCard;
const Course = styled(Link)`
  background: #f8fbf4;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  width: calc(25% - 20px);
  margin: 0 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;

  @media all and (max-width: 1000px) {
    width: calc(33.33% - 20px);
  }
  @media all and (max-width: 780px) {
    width: calc(50% - 20px);
  }
  @media all and (max-width: 520px) {
    width: 100%;
    margin: 0;
    margin-bottom: 20px;
  }
`;

const Thumbnail = styled.div`
  img {
    display: block;
    width: 100%;
  }
`;

const DetailsSection = styled.div`
  padding: 20px;
  position: relative;
`;
const CourseName = styled.h3`
  font-size: 18px;
  margin-top: 20px;
  @media all and (max-width: 980px) {
    font-size: 16px;
  }
`;

const LabelSection = styled.span`
  display: flex;
  align-items: center;
`;

const Lesson = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 13px;
  color: #696969;
  margin-right: 20px;
  @media all and (max-width: 1010px) {
    margin-right: 10px;
  }
  @media all and (max-width: 1000px) {
    margin-right: 20px;
  }
`;
const Duration = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 13px;
  color: #696969;
`;
const Icon = styled.span`
  display: block;
  width: 15px;
  margin-right: 5px;
  img {
    display: block;
    width: 100%;
  }
`;

const Play = styled.img`
  width: 50px;
  display: block;
  position: absolute;
  top: -25px;
  right: 20px;
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 50%;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  margin: 0 20px;
  border-top: 1px solid #d9d9d9;
`;

const Arrow = styled.span`
  width: 20px;
  display: block;
  img {
    display: block;
    width: 100%;
  }
`;
const ViewCourse = styled.span`
  display: block;
  font-size: 14px;
  color: #4ca473;
  font-family: gordita_medium;
`;
