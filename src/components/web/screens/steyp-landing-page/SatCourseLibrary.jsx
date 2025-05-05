import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../../store/authStore";

const Container = styled.div`
	width: 100%;
	padding: 80px 0;
	background: #f8f9fa;
`;

const Wrapper = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
`;

const LeftSection = styled.div`
	flex: 1;
	padding-right: 40px;
`;

const Title = styled.h1`
	font-size: 48px;
	font-weight: 700;
	color: #1a1a1a;
	margin-bottom: 20px;
`;

const Description = styled.p`
	font-size: 18px;
	line-height: 1.6;
	color: #666;
	margin-bottom: 30px;
`;

const CourseList = styled.div`
	margin-bottom: 30px;
`;

const CourseItem = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 15px;
`;

const CourseIcon = styled.span`
	width: 24px;
	height: 24px;
	background: #4ca473;
	color: white;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 15px;
	font-size: 14px;
`;

const CourseText = styled.span`
	font-size: 16px;
	color: #333;
`;

const Button = styled.button`
	padding: 12px 30px;
	background: #4ca473;
	color: white;
	border: none;
	border-radius: 5px;
	font-size: 16px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		background: #3d8b5f;
	}
`;

const RightSection = styled.div`
	flex: 1;
	display: flex;
	justify-content: flex-end;
`;

const Image = styled.img`
	max-width: 100%;
	height: auto;
`;

const SatCourseLibrary = () => {
	const { user_profile } = useAuthStore();
	const navigate = useNavigate();
	const location = useLocation();

	const handleModal = () => {
		if (user_profile?.user_id) {
			navigate("/dashboard");
		} else {
			navigate({
				pathname: location.pathname,
				search: `action=login`,
			});
		}
	};

	return (
		<Container>
			<Wrapper>
				<LeftSection>
					<Title>SAT Course Library</Title>
					<Description>
						Access our comprehensive SAT course library with expert-curated content
						and practice materials to help you excel in your exam.
					</Description>
					<CourseList>
						<CourseItem>
							<CourseIcon>✓</CourseIcon>
							<CourseText>Math Practice</CourseText>
						</CourseItem>
						<CourseItem>
							<CourseIcon>✓</CourseIcon>
							<CourseText>Reading Comprehension</CourseText>
						</CourseItem>
						<CourseItem>
							<CourseIcon>✓</CourseIcon>
							<CourseText>Writing & Language</CourseText>
						</CourseItem>
						<CourseItem>
							<CourseIcon>✓</CourseIcon>
							<CourseText>Practice Tests</CourseText>
						</CourseItem>
					</CourseList>
					<Button onClick={handleModal}>
						{user_profile?.user_id ? "Go to Dashboard" : "Start Learning"}
					</Button>
				</LeftSection>
				<RightSection>
					<Image
						src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/sat/library.png"
						alt="SAT Course Library"
					/>
				</RightSection>
			</Wrapper>
		</Container>
	);
};

export default SatCourseLibrary;
