import React from "react";
import styled from "styled-components";

export default function TopicAssetCard(props) {
	return (
		<>
			<Container>
				<Image src={props.icon} />
				<Content>
					<Middle>
						<Title>{props.title}</Title>
						<Size>{props.size}</Size>
					</Middle>
					<Right
						href={props.item_link}
						className="thumb"
						download
						rel="noopener noreferrer"
						target="_blank"
					>
						<DownloadImage src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/cloud-download.svg" />
					</Right>
				</Content>
			</Container>
		</>
	);
}

const Container = styled.div`
	display: flex;
	align-items: center;
	padding: 15px 0;
	/* border-bottom: 1px solid #e7e7e7; */
	@media (max-width: 1024px) {
		width: 100%;
	}
`;
const Image = styled.img`
	display: block;
	width: 39px;
	margin-right: 20px;
	@media (max-width: 640px) {
		width: 30px;
		margin-right: 15px;
	}
`;
const Content = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;
const Middle = styled.div``;
const Title = styled.span`
	display: block;
	font-family: "gordita_medium";
	font-size: 17px;
	margin-bottom: -4px;
	@media (max-width: 640px) {
		font-size: 16px;
		margin-bottom: -1px;
	}
`;
const Size = styled.span`
	display: block;
	font-size: 16px;
	color: #9e9e9e;
	@media (max-width: 640px) {
		font-size: 14px;
	}
`;
const Right = styled.a`
	cursor: pointer;
	@media (max-width: 640px) {
		width: 28px;
	}
`;
const DownloadImage = styled.img`
	width: 29px;
`;
