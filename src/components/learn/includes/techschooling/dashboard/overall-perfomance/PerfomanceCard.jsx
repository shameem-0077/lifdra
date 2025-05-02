import React from "react";
import styled from "styled-components";

export default function PerfomanceCard({ performance }) {
	const {
		designations_count,
		skills_count,
		lessons_count,
		topics_count,
		practices_count,
		workshops_count,
		assessments_count,
		support_chats_count,
	} = performance;
	return (
		<Container>
			<Box>
				<Column>
					<BigCard>
						<BigCardTop>
							Lessons
							<BlueIcon
								src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/blue-arrow.svg"
								alt=""
							/>
						</BigCardTop>
						<BigCardCount>{lessons_count}</BigCardCount>
					</BigCard>

					<BigCard>
						<BigCardTop>
							Topics
							<BlueIcon
								src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/blue-arrow.svg"
								alt="Image"
							/>
						</BigCardTop>
						<BigCardCount>{topics_count}</BigCardCount>
					</BigCard>

					<SmallCard>
						<SmallCardImageWrapper>
							<SmallCardImage
								src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/calendar.svg"
								alt="Image"
							/>
						</SmallCardImageWrapper>
						<SmallCardRight>
							<SmallCardTitle>
								Professions
							</SmallCardTitle>
							<SmallCardCount>
								{designations_count}
							</SmallCardCount>
						</SmallCardRight>
					</SmallCard>

					{/* <SmallCard>
                        <SmallCardImageWrapper>
                            <SmallCardImage
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/calendar.svg"
                                alt="Image"
                            />
                        </SmallCardImageWrapper>
                        <SmallCardRight>
                            <SmallCardTitle>DoubtHub Questions</SmallCardTitle>
                            <SmallCardCount>
                                {doubt_hub_questions_count}
                            </SmallCardCount>
                        </SmallCardRight>
                    </SmallCard> */}

					<SmallCard>
						<SmallCardImageWrapper>
							<SmallCardImage
								src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/calendar.svg"
								alt="Image"
							/>
						</SmallCardImageWrapper>
						<SmallCardRight>
							<SmallCardTitle>Skills</SmallCardTitle>
							<SmallCardCount>
								{skills_count}
							</SmallCardCount>
						</SmallCardRight>
					</SmallCard>

					{/* <SmallCard>
                        <SmallCardImageWrapper>
                            <SmallCardImage
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/calendar.svg"
                                alt="Image"
                            />
                        </SmallCardImageWrapper>
                        <SmallCardRight>
                            <SmallCardTitle>DoubtHub Answers</SmallCardTitle>
                            <SmallCardCount>
                                {doubt_hub_answers_count}
                            </SmallCardCount>
                        </SmallCardRight>
                    </SmallCard> */}

					<SmallCard>
						<SmallCardImageWrapper>
							<SmallCardImage
								src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/calendar.svg"
								alt="Image"
							/>
						</SmallCardImageWrapper>
						<SmallCardRight>
							<SmallCardTitle>Practices</SmallCardTitle>
							<SmallCardCount>
								{practices_count}
							</SmallCardCount>
						</SmallCardRight>
					</SmallCard>

					<SmallCard>
						<SmallCardImageWrapper>
							<SmallCardImage
								src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/calendar.svg"
								alt="Image"
							/>
						</SmallCardImageWrapper>
						<SmallCardRight>
							<SmallCardTitle>
								Assessments
							</SmallCardTitle>
							<SmallCardCount>
								{assessments_count}
							</SmallCardCount>
						</SmallCardRight>
					</SmallCard>

					{/* <BigCard>
                        <BigCardTop>
                            Total Hours
                            <BlueIcon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/blue-arrow.svg"
                                alt="Image"
                            />
                        </BigCardTop>
                        <BigCardCount>
                            210 <span className="small">hrs</span>
                        </BigCardCount>
                        <BigCardBottom>
                            <span className="blue">
                                7.34%
                                <img
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/grow.svg"
                                    alt="Image"
                                />
                            </span>
                            more than last month
                        </BigCardBottom>
                    </BigCard> */}
					<SmallCard>
						<SmallCardImageWrapper>
							<SmallCardImage
								src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/calendar.svg"
								alt="Image"
							/>
						</SmallCardImageWrapper>
						<SmallCardRight>
							<SmallCardTitle>Workshops</SmallCardTitle>
							<SmallCardCount>
								{workshops_count}
							</SmallCardCount>
						</SmallCardRight>
					</SmallCard>

					<SmallCard>
						<SmallCardImageWrapper>
							<SmallCardImage
								src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/calendar.svg"
								alt="Image"
							/>
						</SmallCardImageWrapper>
						<SmallCardRight>
							<SmallCardTitle>
								Premium Assists
							</SmallCardTitle>
							<SmallCardCount>
								{support_chats_count}
							</SmallCardCount>
						</SmallCardRight>
					</SmallCard>
				</Column>
			</Box>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
const Box = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;
	display: block;
`;
const Column = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 10px;
	@media all and (max-width: 1280px) {
		grid-template-columns: 1fr 1fr;
	}
	@media all and (max-width: 480px) {
		grid-template-columns: 1fr;
		width: 100%;
	}
`;
const BigCard = styled.div`
	background: #f1eefb;
	padding: 7px 17px;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;
const BigCardTop = styled.span`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-family: gordita_medium;
	font-size: 16px;
`;
const BigCardCount = styled.span`
	font-family: gordita_bold;
	display: block;
	font-size: 20px;
	margin: 6px 0;
	& .small {
		font-family: gordita_medium;
		font-size: 15px;
	}
`;
const BlueIcon = styled.img`
	display: none;
`;
const SmallCard = styled.div`
	background: #e8f3fd;
	display: flex;
	align-items: center;
	padding: 16px;
	border-radius: 5px;
`;
const SmallCardImageWrapper = styled.div`
	background: #63e7bd;
	height: 44px;
	width: 44px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	margin-right: 11px;
`;
const SmallCardImage = styled.img`
	display: block;
`;
const SmallCardRight = styled.div``;
const SmallCardTitle = styled.span`
	display: block;
	color: #7d848d;
	font-size: 13px;
	margin-bottom: 4px;
	line-height: 1rem;
	font-family: gordita_medium;
`;
const SmallCardCount = styled.span`
	font-family: gordita_medium;
	display: block;
	font-size: 20px;
	line-height: 1rem;
`;
