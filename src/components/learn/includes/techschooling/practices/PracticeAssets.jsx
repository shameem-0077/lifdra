import React from "react";
import styled from "styled-components";
import { formatBytes } from "../../../../helpers/functions";
import ziphoto from "../../../../../assets/images/web/techDegree/zip file.svg";

const PracticeAssets = ({ data }) => {
	return (
		<Container target="_blank" href={data.attachment}>
			<ImageContainer>
				<Image
					src={
						// data.file_type === "doc"
						//     ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/doc.svg"
						//     : data.file_type === "pdf"
						//     ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/pdf.svg"
						//     : data.file_type === "zip"
						//     ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/zip.svg"
						//     : data.fil1111111111e_type === "xlsx"
						//     ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/sheets.svg"
						//     : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/doc.svg"
						ziphoto
					}
				/>
			</ImageContainer>
			<FileName>{data.title_of_attachment}</FileName>
			<FileSize>{formatBytes(data.file_size)}</FileSize>
		</Container>
	);
};

export default PracticeAssets;
const Container = styled.a`
	display: block;
	text-align: center;
	background-color: #f1f1f1;
	padding: 30px 20px 20px;
	width: 100%;
	border-radius: 10px;
	cursor: pointer;
	@media all and (max-width: 480px) {
		padding: 20px 10px 10px;
	}
`;
const ImageContainer = styled.div``;
const Image = styled.img``;
const FileName = styled.h6`
	font-size: 14px;
	font-family: gordita_medium;
`;
const FileSize = styled.small`
	font-family: gordita_medium;
	color: #9b9b9b;
`;
