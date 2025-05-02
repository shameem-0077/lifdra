import React, { useState } from "react";
import styled from "styled-components";
import { secondsTohms } from "../../../../helpers/functions";
import PlaceHolder from "../../../../general/PlaceHolder";

function TopicActivityCardNew({ data }) {
    const [isLoading, setIsLoading] = useState(true);

    function onLoad() {
        setIsLoading(false);
    }
    return (
        <UpComingActivityCard className="anim-fade">
            <UpComingCardImage style={{ display: isLoading ? "none" : "block" }}>
                <img onLoad={onLoad} src={data.image} alt="" />
            </UpComingCardImage>
            <PlaceHolder isLoading={isLoading} paddingTop="61.98%" />
            <UpComingCardContent>
                <Left>
                    {data.name && <Title>{data.name}</Title>}
                    {data.title && <Title>{data.title}</Title>}
                    {data.designation && <Category>{data.designation}</Category>}
                    {data.designation_name && <Category>{data.designation_name}</Category>}
                    {data.duration && (
                        <Duration>
                            <DurationIcon>
                                <img
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/dashboard/save-time.svg"
                                    alt=""
                                />
                            </DurationIcon>
                            <DurationData>{secondsTohms(data.duration)}</DurationData>
                        </Duration>
                    )}
                    {data.time_allotted && (
                        <Duration>
                            <DurationIcon>
                                <img
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/dashboard/save-time.svg"
                                    alt=""
                                />
                            </DurationIcon>
                            <DurationData>
                                {`${data.time_allotted} ${data.time_allotted === 1 ? "Hr" : "Hrs"}`}
                            </DurationData>
                        </Duration>
                    )}
                </Left>
                <Right>
                    <LockIcon>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/dashboard/lock.svg"
                            alt=""
                        />
                    </LockIcon>
                </Right>
            </UpComingCardContent>
        </UpComingActivityCard>
    );
}

export default TopicActivityCardNew;
const UpComingActivityCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    background: rgb(248, 249, 248);
    border-radius: 11px;
    position: relative;
    @media all and (max-width: 640px) {
        flex-direction: row;
        align-items: center;
    }
    @media all and (max-width: 550px) {
        display: flex;
        flex-direction: column;
    }
`;
const UpComingCardImage = styled.div`
    width: 100%;
    margin-bottom: 20px;
    border-radius: 6px;
    overflow: hidden;
    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        display: block;
    }
    @media all and (max-width: 640px) {
        width: 40%;
        margin-right: 10px;
        margin-bottom: unset;
    }
    @media all and (max-width: 550px) {
        width: 100%;
        margin-bottom: 20px;
        border-radius: 6px;
        overflow: hidden;
    }
`;
const UpComingCardContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media all and (max-width: 640px) {
        width: 60%;
    }
    @media all and (max-width: 550px) {
        width: 100%;
    }
`;
const Title = styled.span`
    font-family: gordita_medium;
    display: block;
    font-size: 15px;
    line-height: 1.5rem;
    min-width: 90%;
`;
const Category = styled.p`
    display: block;
    font-size: 13px;
    color: #909090;
    margin-top: 6px;
    font-family: gordita_regular;
`;
const Left = styled.div`
    display: flex;
    flex-direction: column;
`;
const Right = styled.div`
    display: flex;
`;
const Duration = styled.div`
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #909090;
    margin-top: 6px;
`;
const DurationIcon = styled.span`
    width: 13px;
    height: 20px;
    margin-right: 8px;
    img {
        display: block;
        width: 100%;
    }
`;
const DurationData = styled.p`
    font-size: 13px;
    font-family: gordita_medium;
    line-height: 1.3em;
`;
const LockIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    box-shadow: rgb(0 0 0 / 10%) 0px 16px 24px;
`;
