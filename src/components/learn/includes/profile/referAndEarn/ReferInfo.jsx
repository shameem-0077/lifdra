import React from "react";
import styled from "styled-components";

function ReferInfo() {
    return (
        <div>
            <Refer>
                <ReferTitle>Refer a friend</ReferTitle>
                <Referdetails>
                    You can refer your friend and earn coins on each referral
                </Referdetails>
                <HowWorks>
                    <i className="las la-exclamation-circle"></i> How it works?
                </HowWorks>
                <div>
                    <WorkStructure>
                        <StepIconWrap>
                            <StepIcon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/profile/invite.svg"
                                alt="icon"
                            />
                        </StepIconWrap>
                        <InnerDetails>
                            <StepText>Invite your friend</StepText>
                            <StepDetail>Just share your link</StepDetail>
                        </InnerDetails>
                    </WorkStructure>
                    <WorkStructure>
                        <StepIconWrap>
                            <StepIcon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/profile/join.svg"
                                alt="icon"
                            />
                        </StepIconWrap>
                        <InnerDetails>
                            <StepText>They join in Steyp</StepText>
                            <StepDetail>
                                Join and subscribe a package
                            </StepDetail>
                        </InnerDetails>
                    </WorkStructure>
                    <WorkStructure>
                        <StepIconWrap>
                            <StepIcon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/dashboard/verification.svg"
                                alt="icon"
                            />
                        </StepIconWrap>
                        <InnerDetails>
                            <StepText>Upload Id card</StepText>
                            <StepDetail>
                                Upload your student id card for discounts
                            </StepDetail>
                        </InnerDetails>
                    </WorkStructure>
                    <WorkStructure>
                        <StepIconWrapLast>
                            <StepIcon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/profile/medal.svg"
                                alt="icon"
                            />
                        </StepIconWrapLast>
                        <InnerDetails>
                            <StepText>Referral reward</StepText>
                            <StepDetail>
                                You will get coins for subscribed referral
                            </StepDetail>
                        </InnerDetails>
                    </WorkStructure>
                </div>
            </Refer>
        </div>
    );
}

export default ReferInfo;
const InnerDetails = styled.div`
    width: 80%;
`;
const Refer = styled.div`
    // margin-top: 20px;
    padding: 15px 15px;
    margin-bottom: 20px;
    background-color: #ecf6fe;
    border-radius: 5px;
    @media all and (max-width: 640px) {
        margin-top: 20px;
    }
`;
const ReferTitle = styled.span`
    display: block;
    font-family: "gordita_medium";
    font-size: 18px;
`;
const Referdetails = styled.span`
    font-size: 13px;
    font-family: "gordita_medium";
    display: block;
    line-height: 1.4rem;
    // width: 77%;
    margin-top: 6px;
`;
const HowWorks = styled.span`
    font-family: "gordita_medium";
    color: #6f6bfa;
    font-size: 15px;
    display: flex;
    align-items: center;
    margin: 20px 0px 22px;
    i {
        margin-right: 7px;
    }
`;
const WorkStructure = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 17px;
    justify-content: flex-start;
    &:last-child {
        // margin-bottom: 0;
    }
`;
const StepIconWrap = styled.div`
    background: #fff;
    z-index: 15;
    height: 43px;
    width: 43px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
    margin-right: 10px;
    position: relative;
    padding: 13px;
    &::after {
        content: "";
        position: absolute;
        border: 1px dashed #989898;
        bottom: -40px;
        height: 37px;
    }
`;
const StepIconWrapLast = styled.div`
    background: #fff;
    z-index: 15;
    height: 43px;
    width: 43px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
    margin-right: 10px;
    padding: 13px;
`;
const StepIcon = styled.img`
    width: 100%;
    display: block;
`;
const StepText = styled.span`
    font-family: "gordita_medium";
    font-size: 13px;
    margin-bottom: 4px;
    display: block;
    letter-spacing: 0.005rem;
`;
const StepDetail = styled.span`
    font-family: "gordita_regular";
    color: #8a8a8a;
    font-size: 12px;
    display: block;
    letter-spacing: 0.005rem;
`;
const ReferCodeContainer = styled.div`
    background: #f1f1fe;
    padding: 17px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    margin-top: 26px;
    @media (max-width: 640px) {
        margin-top: 0;
    }
`;
const ReferCode = styled.span`
    color: #6f6bfa;
    font-size: 16px;
    letter-spacing: 0.01rem;
    line-height: 1.4rem;
    .code {
        font-family: "baloo_paaji_2semibold";
        letter-spacing: 0.1rem;
        font-size: 17px;
    }
`;
const Copy = styled.span`
    cursor: pointer;
    background: #6f6bfa;
    color: #fff;
    padding: 5px 13px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: "baloo_paaji_2semibold";
    border-radius: 4px;
    i {
        margin-right: 5px;
    }
`;
const CountContainer = styled.div`
    margin-top: 0.5em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 0.5em;
`;
const CountCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #e3f4fe;
    padding: 17px;
    border-radius: 5px;
    @media (max-width: 640px) {
        align-items: center;
        justify-content: center;
    }
`;
