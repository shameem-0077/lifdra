import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Medal1 from "../../../../../../assets/images/leader-board/First-medal.svg";
import Medal2 from "../../../../../../assets/images/leader-board/Second-medal.svg";
import Medal3 from "../../../../../../assets/images/leader-board/Third-medal.svg";
import NormalMedal from "../../../../../../assets/images/leader-board/Normal-medal.svg";
import PointsSection from "./PointsSection";
import { useDispatch, useSelector } from "react-redux";
import { serverConfig } from "../../../../../../axiosConfig";
import Avatar from "react-avatar";

function YourPositionHorizontal() {
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
				<Cotentses>
					<Contents>
						<Container>
							<Header>
								<h4>Your Position</h4>
							</Header>
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
									{myPosition.position
										? myPosition.position
										: "0"}
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
					</Contents>
					<YourPoints>
						<Header className="last">
							<h4>Your Points</h4>
						</Header>
						<PointsSection data={myPosition} />
					</YourPoints>
				</Cotentses>
			</MainContainer>
		</>
	);
}

export default YourPositionHorizontal;

const Cotentses = styled.div`
	display: flex;
	justify-content: space-between;

	@media all and (max-width: 1280px) {
		flex-direction: column;
	}
	@media all and (max-width: 1050px) {
		flex-direction: row;
	}
	@media all and (max-width: 980px) {
		flex-direction: column;
	}
`;
const MainContainer = styled.div`
	width: 100%;
	padding: 30px 0px;
	display: none;
	@media all and (max-width: 1440px) {
	}
	@media all and (max-width: 1280px) {
		display: block;
	}
	@media all and (max-width: 1050px) {
		border-bottom: none;
	}
	@media all and (max-width: 360px) {
		padding: 0;
	}
`;
const Contents = styled.div`
	display: flex;
	flex-direction: column;
	width: 30%;
	@media all and (max-width: 1280px) {
		width: 100%;
	}
	@media all and (max-width: 1050px) {
		width: 50%;
		margin-right: 30px;
	}
	@media all and (max-width: 980px) {
		width: 100%;
	}
`;
const ImageContainer = styled.div`
	text-align: center;
	@media all and (max-width: 1080px) {
		width: 60%;
		margin: 0 auto;
	}
	@media all and (max-width: 980px) {
		width: 40%;
		margin: 0 auto;
	}
	@media all and (max-width: 480px) {
		width: 51%;
	}
	@media all and (max-width: 360px) {
		width: 55%;
	}
`;
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
	margin: 0 auto;
	border-radius: 50%;
	overflow: hidden;
	background-color: #fff;
	top: 5px;
	left: 5px;
	transform: rotate(315deg);
	@media all and (max-width: 1280px) {
		width: 100px;
		min-width: 100px;
		height: 100px;
	}

	@media all and (max-width: 1080px) {
	}
	@media all and (max-width: 480px) {
		top: 5px;
		left: 5px;
	}
`;

const Header = styled.div`
	/* margin: 30px 0px; */

	@media all and (max-width: 1280px) {
		/* margin: 16px 0px 26px 0px; */
		margin-bottom: 20px;
		/* margin-top: 40px; */
		/* &.last {
            margin-bottom: 0px;
        } */
	}
	@media all and (max-width: 980px) {
		margin: 16px 0px 10px 0px;
	}
	@media all and (max-width: 360px) {
		margin: 30px 0 10px;
	}
	&.last {
		/* padding: 16px 0px 0px 0px; */
	}
	h4 {
		font-size: 18px;
		font-family: "gordita_medium";
		color: #656563;
	}
`;
const Container = styled.div``;
const Name = styled.h3`
	padding: 20px 5px;
	color: #003c3c;
	font-size: 18px;
	font-family: "gordita_Regular";
	@media all and (max-width: 1050px) {
		font-size: 16px;
		padding: 10px 3px;
	}
	@media all and (max-width: 980px) {
		padding: 20px 5px;
	}

	@media all and (max-width: 640px) {
		font-size: 16px;
	}
	@media all and (max-width: 360px) {
		font-size: 14px;
	}
`;
const MarkContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin: 0 auto;
	@media all and (max-width: 1050px) {
		width: 90%;
		margin: 0 auto;
	}
	@media all and (max-width: 980px) {
		padding-bottom: 30px;
	}

	@media all and (max-width: 768px) {
		width: 60%;
	}
	@media all and (max-width: 640px) {
		width: 75%;
	}
	@media all and (max-width: 480px) {
		width: 90%;
	}
	@media all and (max-width: 360px) {
		width: 100%;
		padding-bottom: 20px;
	}
`;
const Rank = styled.div`
	width: 31%;
	background: rgba(15, 167, 111, 0.08);
	text-align: center;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	padding: 12px 6px;
	min-height: 70px;
	@media all and (max-width: 1280px) {
		width: 30%;
	}
	@media all and (max-width: 1080px) {
		width: 30%;
	}
	@media all and (max-width: 360px) {
		min-height: 60px;
	}
	h3 {
		font-size: 20px;
		font-family: "gordita_medium";
		color: #0fa76f;
		@media all and (max-width: 1050px) {
			font-size: 16px;
		}
		@media all and (max-width: 640px) {
			font-size: 14px;
		}
	}
	p {
		font-family: "gordita_regular";
		color: #003c3c;
		font-size: 14px;
		@media all and (max-width: 1050px) {
			font-size: 14px;
		}
		@media all and (max-width: 360px) {
			font-size: 12px;
		}
	}
`;
const Points = styled.div`
	width: 35%;
	background: rgba(15, 167, 111, 0.08);
	text-align: center;
	padding: 12px 6px;
	color: #0fa76f;
	min-height: 70px;
	@media all and (max-width: 1050px) {
		width: 34%;
	}
	@media all and (max-width: 360px) {
		min-height: 60px;
	}

	/* @media all and (max-width: 640px) {
        width: 45%;
    }
    @media all and (max-width: 480px) {
        width: 34%;
    } */
	h3 {
		font-size: 20px;
		font-family: "gordita_medium";
		color: #0fa76f;
		@media all and (max-width: 1050px) {
			font-size: 16px;
		}
		@media all and (max-width: 640px) {
			font-size: 14px;
		}
	}
	p {
		font-family: "gordita_regular";
		color: #003c3c;
		font-size: 14px;
		@media all and (max-width: 1050px) {
			font-size: 14px;
		}
		@media all and (max-width: 360px) {
			font-size: 12px;
		}
	}
`;
const MedalContainer = styled.div`
	width: 30px;
	height: 30px;
	margin: 0 auto;
	@media all and (max-width: 1280px) {
		width: 25px;
	}

	@media all and (max-width: 640px) {
		width: 25px;
	}
	@media all and (max-width: 360px) {
		width: 23px;
	}
	img {
		display: block;
		width: 85%;
		@media all and (max-width: 640px) {
			width: 75%;
		}
	}
`;
const Badge = styled.div`
	width: 32%;
	min-height: 70px;
	font-family: gordita_regular;
	background: rgba(15, 167, 111, 0.08);
	text-align: center;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	padding: 12px 8px;
	@media all and (max-width: 1050px) {
		width: 33%;
		padding: 10px 7px;
	}
	@media all and (max-width: 360px) {
		height: 60px;
		padding: 8px 7px;
	}
	p {
		padding-top: 11px;
		line-height: 0.6;
		color: #003c3c;
		font-family: "gordita_regular";
		font-size: 14px;
		@media all and (max-width: 1280px) {
			padding-top: 5px;
		}
		@media all and (max-width: 1050px) {
			font-size: 14px;
			padding-top: 5px;
		}
		@media all and (max-width: 640px) {
			padding-top: 1px;
		}
		@media all and (max-width: 360px) {
			padding-top: 0px;
			font-size: 12px;
		}
	}
`;
const YourPoints = styled.div`
	width: 65%;
	margin-top: 40px;

	@media all and (max-width: 1280px) {
		width: 100%;
	}
	@media all and (max-width: 1050px) {
		width: 67%;
		margin-top: 0;
	}
	@media all and (max-width: 980px) {
		width: 100%;
	}
	@media all and (max-width: 480px) {
		margin-top: 0;
	}
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
