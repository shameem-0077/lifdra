import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NormalMedal from "../../../../../../assets/images/leader-board/Normal-medal.svg";
import Medal1 from "../../../../../../assets/images/leader-board/First-medal.svg";
import Medal2 from "../../../../../../assets/images/leader-board/Second-medal.svg";
import Medal3 from "../../../../../../assets/images/leader-board/Third-medal.svg";
import PointsSection from "./PointsSection";
import { useDispatch, useSelector } from "react-redux";
import { serverConfig } from "../../../../../../axiosConfig";
import Avatar from "react-avatar";
import { data } from "jquery";

function YourPosition() {
	const { user_profile, user_data } = useSelector((state) => state);
	const [myPosition, setMyPosition] = useState([]);
	const dispatch = useDispatch();
	function fetchMyPosition() {
		const { access_token } = user_data;

		serverConfig
			.get("leader-boards/my-position/", {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			})
			.then((res) => {
				const { status_code, data } = res.data;
				if (status_code === 6000) {
					setMyPosition(data);
				} else if (status_code === 6001) {
				}
			})
			.catch((err) => {
				dispatch({
					type: "UPDATE_ERROR",
					error: err,
					errorMessage: "Server error, please try again",
				});
			});
	}
	useEffect(() => {
		fetchMyPosition();
	}, []);
	return (
		<>
			<MainContainer>
				<Header>
					<h4>Your Position</h4>
				</Header>
				<Container>
					<ImageContainer>
						<ImageCover>
							<Main>
								{user_profile.photo ? (
									<UpdateProfile>
										<img
											src={user_profile.photo}
											alt="Profile picture"
										/>
									</UpdateProfile>
								) : (
									<Avatar
										name={user_profile.name}
										size="100%"
										maxInitials={2}
									/>
								)}
							</Main>
							{/* <Bg>
                                <img src={Eclips} alt="Eclips" />
                            </Bg> */}
						</ImageCover>
						<Name>{user_profile.name}</Name>
					</ImageContainer>
				</Container>
				<MarkContainer>
					<Rank>
						<h3>
							{myPosition.position ? myPosition.position : "0"}
						</h3>
						<p>Rank</p>
					</Rank>
					<Points>
						<h3>
							{myPosition.total_point
								? myPosition.total_point
								: "0"}
						</h3>
						<p>Total Points</p>
					</Points>
					<Badge>
						<MedalContainer>
							{myPosition.position === 1 ? (
								<img src={Medal1} alt="Medal" />
							) : myPosition.position === 2 ? (
								<img src={Medal2} alt="Medal" />
							) : myPosition.position === 3 ? (
								<img src={Medal3} alt="Medal" />
							) : (
								<img src={NormalMedal} alt="Medal" />
							)}
						</MedalContainer>
						<p>Badge</p>
					</Badge>
				</MarkContainer>
				<YourPoints>
					<Header>
						<h4>Your Points</h4>
					</Header>
					<PointsSection data={myPosition} />
				</YourPoints>
			</MainContainer>
		</>
	);
}

export default YourPosition;

const MainContainer = styled.div`
	@media all and (max-width: 1280px) {
		width: 35%;
		padding: 22px 20px;
	}
	@media all and (max-width: 1050px) {
		width: 35%;
	}
`;
const ImageContainer = styled.div``;
const ImageCover = styled.div`
	position: relative;
	width: 120px;
	height: 120px;
	min-width: 120px;
	margin: 0 auto;
	border: 5px solid #0fa76f;
	border-radius: 50%;
	transform: rotate(45deg);
`;
const Main = styled.div`
	position: absolute;
	width: 100px;
	min-width: 100px;
	height: 100px;
	margin: 0 auto;
	border-radius: 50%;
	overflow: hidden;
	background-color: #fff;
	top: 5px;
	left: 5px;
	transform: rotate(315deg);
`;
const Bg = styled.div`
	position: absolute;
	top: -9px;
	right: 90px;
	width: 39%;
	@media all and (max-width: 1440px) {
	}
	@media all and (max-width: 1280px) {
		top: -7px;
		right: 27%;
		width: 43%;
	}
	@media all and (max-width: 1050px) {
		top: -7px;
		right: 28%;
		width: 41%;
	}

	img {
		display: block;
		width: 100%;
	}
`;
const Header = styled.div`
	/* padding: 13px 0px; */
	h4 {
		font-size: 18px;
		font-family: "gordita_medium";
		color: #656563;
	}
`;
const Container = styled.div`
	text-align: center;
	margin-top: 30px;
`;
const Name = styled.h3`
	padding: 20px 5px;
	color: #003c3c;
	font-size: 18px;
	font-family: "gordita_Regular";
`;
const MarkContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin: 0 auto;
`;
const Rank = styled.div`
	width: 31%;
	background: rgba(15, 167, 111, 0.08);
	text-align: center;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	padding: 12px 6px;
	h3 {
		font-size: 18px;
		font-family: "gordita_medium";
		color: #0fa76f;
	}
	p {
		color: #003c3c;
		font-size: 12px;
		font-family: "gordita_regular";
	}
`;
const Points = styled.div`
	width: 35%;
	background: rgba(15, 167, 111, 0.08);
	text-align: center;
	padding: 12px 6px;
	@media all and (max-width: 480px) {
		width: 60%;
	}

	h3 {
		font-size: 18px;
		font-family: "gordita_medium";
		color: #0fa76f;
	}
	p {
		color: #003c3c;
		font-size: 12px;
		font-family: "gordita_regular";
	}
`;
const MedalContainer = styled.div`
	width: 20px;
	height: 25px;
	margin: 0 auto;
	img {
		display: block;
		width: 85%;
	}
`;
const Badge = styled.div`
	width: 32%;
	background: rgba(15, 167, 111, 0.08);
	text-align: center;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	padding: 10px 6px;
	p {
		padding-top: 9px;
		line-height: 0.6;
		color: #003c3c;
		font-size: 12px;
		font-family: "gordita_regular";
	}
`;
const YourPoints = styled.div`
	margin-top: 30px;
`;
const UpdateProfile = styled.div`
	/* width: 75%; */
	overflow: hidden;
	/* max-width: 150px;
  min-width: 150px;
  max-height: 150px;
  min-height: 150px; */
	border-radius: 50%;
	/* border: 7px solid #f8f8f8; */
	/* overflow: hidden; */
	box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
	margin: 0 auto;
	margin-bottom: 15px;
	img {
		display: block;
		width: 100%;
	}
	/* @media all and (max-width: 480px) {
    max-width: 120px;
    min-width: 120px;
    max-height: 120px;
    min-height: 120px;
  } */
`;
