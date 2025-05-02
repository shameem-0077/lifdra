import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { formatBytes } from "../../../../helpers/functions";
const ChallengeQuestionCard = ({ file, size, name }) => {
    useEffect(() => {});

    return (
        <ContainerCard href={file} target="_blank">
            <ContainerInner>
                <Left>
                    <ImgContainer>
                        <AssetImage
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/zip.svg"
                            alt="Image"
                        />
                    </ImgContainer>
                    <Content>
                        <ContentHead>{name}</ContentHead>
                        <Contentspan>{formatBytes(size)}</Contentspan>
                    </Content>
                </Left>
                <Right>
                    <ImgContainerRight>
                        <AssetImageRight
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/cloud-download.svg"
                            alt="Image"
                        />
                    </ImgContainerRight>
                </Right>
            </ContainerInner>
        </ContainerCard>
    );
};
const ContainerCard = styled.a`
    display: block;
    width: 100%;
    padding: 20px;
    background-color: #f8f8ff;
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: unset;
    }
    @media all and (max-width: 480px) {
        padding: 13px;
    }
`;
const ContainerInner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Left = styled.div`
    display: flex;
    align-items: center;
`;
const ImgContainer = styled.div`
    width: 21%;
    margin-right: 20px;
    @media all and (max-width: 480px) {
        width: 18%;
    }
    @media (max-width: 360px) {
        width: 16%;
    }
`;
const AssetImage = styled.img`
    display: block;
    width: 100%;
`;
const Content = styled.div``;
const ContentHead = styled.h3`
    font-size: 14px;
    font-family: gordita_medium;
    color: #323c7f;
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
    @media all and (max-width: 360px) {
        font-size: 13px;
    }
`;
const Contentspan = styled.span`
    display: block;
    color: #8189a0;
    font-size: 14px;
    font-family: gordita_regular;
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
    @media all and (max-width: 360px) {
        font-size: 12px;
    }
`;
const Right = styled.div``;
const ImgContainerRight = styled.div`
    width: 84%;
    @media (max-width: 480px) {
        width: 82%;
    }
`;
const AssetImageRight = styled.img`
    display: block;
    width: 100%;
`;

export default ChallengeQuestionCard;
