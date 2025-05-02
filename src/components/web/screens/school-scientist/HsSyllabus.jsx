import styled from "styled-components";
import React, { useState } from "react";

function HsSyllabus() {
	const [science, setSeience] = useState(false);
	const [change, setChange] = useState(false);
	return (
		<>
			<MainContiner>
				<HeadBody>
					<HeadCover>
						<MinHeading>
							<b>HS</b> Section
						</MinHeading>
					</HeadCover>
				</HeadBody>

				<ListCover>
					<ItemCard>
						<SubList>
							<TopListhead>
								<ListHeading>
									<ImageContiner>
										<img
											src={
												"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-01-2023/syllabus.svg"
											}
											alt=""
										/>
									</ImageContiner>
								</ListHeading>
								<ListSubheding>SCIENCE</ListSubheding>
							</TopListhead>
							<DivContainer className={science ? "science" : ""}>
								<BottomSubitems>
									<Subitemnumber></Subitemnumber>
									<SudLanguage>
										Properties of Matter
									</SudLanguage>
								</BottomSubitems>

								<BottomSubitems>
									<Subitemnumber></Subitemnumber>
									<SudLanguage>Chemical Changes</SudLanguage>
								</BottomSubitems>
								<BottomSubitems>
									<Subitemnumber></Subitemnumber>
									<SudLanguage>Force</SudLanguage>
								</BottomSubitems>

								<BottomSubitems>
									<Subitemnumber></Subitemnumber>
									<SudLanguage>
										Reflection of Light in Spherical Mirrors
									</SudLanguage>
								</BottomSubitems>
								<BottomSubitems>
									<Subitemnumber></Subitemnumber>
									<SudLanguage>
										Static Electricity
									</SudLanguage>
								</BottomSubitems>
								<BottomSubitems>
									<Subitemnumber></Subitemnumber>
									<SudLanguage>
										Acids, Bases, Salts
									</SudLanguage>
								</BottomSubitems>
								<BottomSubitems>
									<Subitemnumber></Subitemnumber>
									<SudLanguage>
										Protectors Of the Biosphere
									</SudLanguage>
								</BottomSubitems>
								<BottomSubitems>
									<Subitemnumber></Subitemnumber>
									<SudLanguage>
										Simple Nutrients Into Cells
									</SudLanguage>
								</BottomSubitems>
								<BottomSubitems>
									<Subitemnumber></Subitemnumber>
									<SudLanguage>Gravitation</SudLanguage>
								</BottomSubitems>
								<BottomSubitems>
									<Subitemnumber></Subitemnumber>
									<SudLanguage>
										Reactivity Series & Electrochemistry
									</SudLanguage>
								</BottomSubitems>
								<BottomSubitems>
									<Subitemnumber></Subitemnumber>
									<SudLanguage>
										Production of metals
									</SudLanguage>
								</BottomSubitems>
								<BottomSubitems>
									<Subitemnumber></Subitemnumber>
									<SudLanguage>
										Genetics of the future
									</SudLanguage>
								</BottomSubitems>
							</DivContainer>
							<SpanCover
								onClick={() => {
									setChange(!change);
									setSeience(!science);
								}}
							>
								<SpanList>
									{change ? "View less" : "View more"}
								</SpanList>
								<SpanArrow>
									<img
										src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/arrow-black.svg"
										alt="Arrow Native"
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
											alt=""
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
									<SudLanguage>
										Programming & Coding
									</SudLanguage>
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
							<DivContainer>
								<BottomSubitems>
									<Subitemnumber></Subitemnumber>
									<SudLanguage>Equations</SudLanguage>
								</BottomSubitems>

								<BottomSubitems>
									<Subitemnumber></Subitemnumber>
									<SudLanguage>Identities</SudLanguage>
								</BottomSubitems>
								<BottomSubitems>
									<Subitemnumber></Subitemnumber>
									<SudLanguage>Area</SudLanguage>
								</BottomSubitems>

								<BottomSubitems>
									<Subitemnumber></Subitemnumber>
									<SudLanguage>New Numbers </SudLanguage>
								</BottomSubitems>
								<BottomSubitems>
									<Subitemnumber></Subitemnumber>
									<SudLanguage>Real Numbers</SudLanguage>
								</BottomSubitems>
								<BottomSubitems>
									<Subitemnumber></Subitemnumber>
									<SudLanguage>
										Arithmetic Sequences
									</SudLanguage>
								</BottomSubitems>
								<BottomSubitems>
									<Subitemnumber></Subitemnumber>
									<SudLanguage>Polynomials</SudLanguage>
								</BottomSubitems>
							</DivContainer>
						</SubList>
					</ItemCard>
				</ListCover>
			</MainContiner>
		</>
	);
}

export default HsSyllabus;

const MainContiner = styled.div`
	margin-bottom: 30px;
`;

const SubContainer = styled.div``;
const Ul = styled.ul``;
const Li = styled.li``;
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

const DivContainer = styled.div`
	height: 230px;
	overflow: hidden;
	margin-bottom: 30px;
	transition: all 0.4s ease;
	&.science {
		height: 450px;
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

const HeadBody = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	@media all and (max-width: 560px) {
		justify-content: flex-start;
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
	background: #d9eee1;
	border-radius: 24px 24px 0px 0px;
	margin-bottom: 8px;
	margin-right: 40px;
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
	background: #d9eee1;
	border-radius: 24px;
`;

const ItemCard = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	flex-wrap: wrap;
	margin: 0 auto;
`;
const SubList = styled.div`
	width: 32%;
	margin: 0 auto;
	/* height: 450px; */
	padding: 32px 24px;
	border-width: 3px;
	border-style: solid;
	border-radius: 24px;
	border: 1px solid #66a98e;

	transition: background-color 0.3s ease-in-out;
	&:hover {
		background-color: #7fc4a9;
		border-width: 3px;
		border-style: solid;
		transition: background-color 0.3s ease-in-out;
	}
	@media all and (max-width: 1080px) {
		width: 100%;
		margin-bottom: 20px;
	}
`;
const TopListhead = styled.div`
	display: flex;
	align-items: center;

	margin-bottom: 10px;
`;
const ListHeading = styled.div``;
const ListSubheding = styled.h5`
	color: #0a0a0a;
	font-size: 20px;
	margin-left: 6px;
	font-family: "gordita_medium";
`;
const BottomSubitems = styled.div`
	display: flex;
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
