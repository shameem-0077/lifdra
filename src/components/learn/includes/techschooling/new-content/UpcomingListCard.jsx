import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const UpcomingListCard = ({ data }) => {
  return (
    <UpcomingListCardContent
      to={`/tech-schooling/new-content/practices/view/${data.id}/`}
    >
      <LockedCardImgContainer>
        <LockedCardImg src={data.image} alt="Image" />
      </LockedCardImgContainer>
      <LockedCardContent>
        {/* <LockImgConSpan className="las la-lock"></LockImgConSpan> */}
        <LockedContentSide>
          <LockedContentSpan>#{data.order_id}</LockedContentSpan>
          <MidSpan>|</MidSpan>
          {data.title}
        </LockedContentSide>
        <IconContent>{data.designation}</IconContent>

        {/* <LockedCardContentAsset>
                        <Icon className="las la-play-circle"></Icon>
                        <IconContent>
                            {data.topics === 1 ? "1 Topic" : `${data.topics} Topics`}
                        </IconContent>
                    </LockedCardContentAsset>
                    <LockedCardContentAsset>
                        <Icon className="las la-play-circle"></Icon>
                        <IconContent>{secondsTohm(data.duration)}</IconContent>
                    </LockedCardContentAsset> */}
      </LockedCardContent>
    </UpcomingListCardContent>
  );
};
const UpcomingListCardContent = styled(Link)`
  background-color: #fafafa;
  position: relative;
  padding: 20px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  &:first-child {
    margin-top: 0;
  }
  @media all and (max-width: 1280px) {
    margin-bottom: 10px;
    margin-top: 0;
    padding: 20px;
  }
  @media all and (max-width: 980px) {
    width: 100%;
  }
  @media all and (max-width: 640px) {
    flex-wrap: wrap;
  }
  @media all and (max-width: 361px) {
    padding: 12px;
  }
`;
const LockedCardImgContainer = styled.div`
  width: 39%;
  overflow: hidden;
  border-radius: 6px;
  @media all and (max-width: 640px) {
    width: 100%;
  }
`;
const LockedCardImg = styled.img`
  width: 100%;
  display: block;
`;
const LockImgConSpan = styled.i`
  position: absolute;
  font-size: 23px;
  right: 30px;
  top: 20px;
  @media all and (max-width: 1550px) {
    top: unset;
    bottom: 30px;
  }
  @media all and (max-width: 1280px) {
    bottom: 20px;
  }
`;
const LockedCardContent = styled.div`
  margin-left: 20px;
  @media all and (max-width: 640px) {
    margin-left: 0px;
    margin-top: 20px;
  }
`;
const LockedContentSide = styled.h3`
  color: #1e4e52;
  font-size: 17px;
  width: 100%;
  font-family: "gordita_medium";
  @media all and (max-width: 640px) {
    line-height: 1.5rem;
  }
`;
const LockedContentSpan = styled.span`
  color: #49b27c;
  font-family: "gordita_medium";
  font-size: 18px;
`;
const MidSpan = styled.span`
  color: #333333;
  font-family: "gordita_medium";
  font-size: 18px;
  margin: 0 5px;
`;
const LockedCardContentAssets = styled.ul`
  display: flex;
  align-items: center;
  margin-top: 20px;
  @media all and (max-width: 1550px) {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 8px;
  }
  @media all and (max-width: 1280px) {
    display: flex;
    flex-direction: column;
  }
`;
const LockedCardContentAsset = styled.li`
  color: #9b9b9b;
  margin-right: 20px;
  display: flex;
  align-items: center;
  @media all and (max-width: 1280px) {
    margin-right: 8px;
  }
`;
const Icon = styled.i`
  color: #9b9b9b;
  font-size: 18px;
  margin-right: 5px;
  display: flex;
  align-items: center;
`;
const IconContent = styled.span`
  font-size: 14px;
  font-family: baloo_paaji_2Regular;
`;
export default UpcomingListCard;
