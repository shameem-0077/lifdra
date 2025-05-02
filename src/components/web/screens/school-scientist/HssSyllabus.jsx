import styled from "styled-components";
import React, { useState } from "react";

function HssSyllabus() {
	const [science, setSeience] = useState(false);
	const [maths, setMaths] = useState(false);
	return (
		<>
			<HeadCover>
				<MinHeading>
					<b>HSS</b> Section
				</MinHeading>
			</HeadCover>

			<ListCover>
				<ItemCard>
					<SubList>
						<TopListhead>
							<ListHeading>
								<ImageContiner>
									<img
										src={
											"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-01-2023/syllabus2.svg"
										}
										alt="Science"
									/>
								</ImageContiner>
							</ListHeading>
							<ListSubheding>SCIENCE</ListSubheding>
						</TopListhead>
						<DivContainer className={science ? "science" : ""}>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>
									Physical World and Measurement
								</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>Laws of Motion</SudLanguage>
							</BottomSubitems>

							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>
									Work, Energy and Power
								</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>
									Oscillations and Waves
								</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>Current Electricity</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>
									Ray Optics & Optical Instruments
								</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>Atoms</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>
									Chemical Bonding and Molecular Structure
								</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>Thermodynamics</SudLanguage>
							</BottomSubitems>

							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>Redox Reactions</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>
									Organic Chemistry – Some Basic Principles &
									Techniques
								</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>Electro-Chemistry</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>Surface Chemistry</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>
									Alcohols, Phenols, and ethers
								</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>Biomolecules</SudLanguage>
							</BottomSubitems>
						</DivContainer>
						<SpanCover
							onClick={() => {
								setSeience(!science);
							}}
						>
							<SpanList>
								{science ? "View less" : "View more"}
							</SpanList>
							<SpanArrow>
								<img
									src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/arrow-black.svg"
									alt="Arrow Navigate"
								/>
							</SpanArrow>
						</SpanCover>
					</SubList>
					<SubList>
						<TopListhead>
							<ListHeading>
								<ImageContiner>
									<img
										src={
											"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-01-2023/syllabus3.svg"
										}
										alt="Engineering"
									/>
								</ImageContiner>
							</ListHeading>
							<ListSubheding>
								TECHNOLOGY & ENGINEERING
							</ListSubheding>
						</TopListhead>
						<DivContainer>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>
									Information Technology
								</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>
									Artificial Intelligence
								</SudLanguage>
							</BottomSubitems>

							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>Robotics</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>Programming & Coding</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>
									Internet of Things (IoT)
								</SudLanguage>
							</BottomSubitems>
						</DivContainer>
					</SubList>
					<SubList>
						<TopListhead>
							<ListHeading>
								<ImageContiner>
									<img
										src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/syllabus04.svg"
										alt="Maths"
									/>
								</ImageContiner>
							</ListHeading>
							<ListSubheding>MATHEMATICS</ListSubheding>
						</TopListhead>
						<DivContainer className={maths ? "maths" : ""}>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>
									Relations and Functions
								</SudLanguage>
							</BottomSubitems>

							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>
									Trigonometric Functions
								</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>
									Permutations and Combinations
								</SudLanguage>
							</BottomSubitems>

							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>
									Limits and Derivatives
								</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>Statistics</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>Probability</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>Matrices</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>
									Application of Derivatives
								</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>Integrals</SudLanguage>
							</BottomSubitems>

							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>
									Differential Equations
								</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>Linear Programming</SudLanguage>
							</BottomSubitems>
							<BottomSubitems>
								<Subitemnumber></Subitemnumber>
								<SudLanguage>Probability</SudLanguage>
							</BottomSubitems>
						</DivContainer>
						<SpanCover
							onClick={() => {
								// setChange(!change);
								setMaths(!maths);
							}}
						>
							<SpanList>
								{maths ? "View less" : "View more"}
							</SpanList>
							<SpanArrow>
								<img
									src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/arrow-black.svg"
									alt=""
								/>
							</SpanArrow>
						</SpanCover>
					</SubList>
				</ItemCard>
			</ListCover>
		</>
	);
}

export default HssSyllabus;
const Top = styled.div`
	position: absolute;
	right: 63px;
	top: -32px;
	width: 84%;
	display: flex;
	align-items: center;
	padding: 10px 5px;
	border-radius: 10px;
	@media all and (max-width: 1280px) {
		width: 80%;
	}
	@media all and (max-width: 1080px) {
		width: 90%;
		right: 45px;
		top: -18px;
	}
	@media all and (max-width: 640px) {
		width: 82%;
		right: 57px;
	}
	&.yellow {
		background: #efcc6b;
	}
	&.blue {
		background: #52a4be;
	}
	&.green {
		background: #75dcbd;
	}
	&.pink {
		background: #d97199;
	}
`;

const HeadCover = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 16px 20px 10px;
	gap: 10px;
	width: 239px;
	height: 57px;
	background: #dae5ed;
	border-radius: 24px 24px 0px 0px;
	margin-bottom: 8px;
	margin-left: 40px;
`;
const MinHeading = styled.div`
	font-size: 24px;
	font-family: "gordita_medium";
	text-align: center;
	color: #2d2d2d;
`;
const ListCover = styled.div`
	width: 100%;
	padding: 4%;
	display: grid;
	background: #e3ebf0;
	border-radius: 24px;
`;

const ItemCard = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin: 0 auto;
	flex-wrap: wrap;
`;
const SubList = styled.div`
	width: 30%;
	margin: 0 auto;
	padding: 32px 24px;

	border-width: 3px;
	border-style: solid;
	border-radius: 24px;
	border: 1px solid #74aed6;
	transition: background-color 0.3s ease-in-out;
	&:hover {
		background-color: #79b0d7;
		border-width: 3px;
		border-style: solid;
		border-radius: 24px;
		transition: background-color 0.3s ease-in-out;
	}
	@media all and (max-width: 1080px) {
		width: 100%;
		margin-bottom: 20px;
	}
	@media all and (max-width: 768px) {
	}
`;
const TopListhead = styled.div`
	display: flex;
	margin-bottom: 10px;
`;
const ListHeading = styled.div``;
const ListSubheding = styled.h5`
	color: #0a0a0a;
	font-size: 20px;
	font-family: "gordita_medium";
`;
const DivContainer = styled.div`
	height: 230px;
	overflow: hidden;
	margin-bottom: 30px;
	transition: all 0.4s ease;
	&.science {
		height: 612px;
		@media all and (max-width: 768px) {
			height: 500px;
		}
	}
	&.maths {
		height: 612px;
		@media all and (max-width: 768px) {
			height: 400px;
		}
	}
`;
const SpanCover = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	cursor: pointer;
`;
const SpanList = styled.div`
	color: #2d2d2d;
	font-family: "gordita_medium";
	font-size: 16px;
	margin-right: 10px;
	line-height: 18px;
`;
const SpanArrow = styled.div`
	img {
		width: 100%;
		display: block;
	}
`;

const BottomSubitems = styled.div`
	display: flex;
	align-items: flex-start;
	margin-bottom: 5px;
	align-items: center;
`;
const Subitemnumber = styled.span`
	min-width: 8px;
	height: 8px;
	background-color: #2d2d2d;
`;
const SudLanguage = styled.p`
	color: #2d2d2d;
	font-size: 18px;
	margin-left: 10px;
	@media all and (max-width: 480px) {
		font-size: 16px;
	}
`;
const ImageContiner = styled.div`
	width: 70%;
	img {
		display: block;
		width: 100%;
	}
`;
