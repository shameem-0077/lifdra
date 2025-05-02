import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "../../../../includes/techschooling/general/loaders/Loader";
import NormalMedal from "../../../../../../assets/images/leader-board/Normal-medal.svg";
import {
  accountsConfig,
  learnConfig,
  studentActivitiesConfig,
} from "../../../../../../axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "react-avatar";
import { useParams } from "react-router-dom";

function StudentsPosition() {
  const { user_profile, divMainClass, userSubscriptionType, user_data } =
    useSelector((state) => state);
  const [students, setStudents] = useState([]);
  const [isStudentLoading, setStudentLoading] = useState(false);
  const dispatch = useDispatch();
  const { slug } = useParams();
  function fetchStudentPosition() {
    const { access_token } = user_data;
    setStudentLoading(true);
    learnConfig
      .get(`/learn/nano-degree/${slug}/student-positions/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        const { status_code, data } = res.data;
        if (status_code === 6000) {
          setStudents(data);
          setStudentLoading(false);
        } else if (status_code === 6001) {
          setStudents([]);
          setStudentLoading(false);
        }
      })
      .catch((err) => {
        dispatch({
          type: "UPDATE_ERROR",
          error: err,
          errorMessage: "Server error, please try again",
        });
        setStudentLoading(false);
      });
  }
  useEffect(() => {
    fetchStudentPosition();
  }, []);

  return (
    <>
      <MainContainer>
        <Header>
          <TxtConainer>
            <Text>Students Position</Text>
          </TxtConainer>
          {/* <RoundImages>
                        <ImageContainers>
                            <Top>
                                <p>100+</p>
                            </Top>
                            <Second>
                                <Avatar
                                    name="S N"
                                    size="100%"
                                    maxInitials={2}
                                />
                            </Second>
                            <Third>
                                <Avatar
                                    name="L K"
                                    size="100%"
                                    maxInitials={2}
                                />
                            </Third>
                        </ImageContainers>
                    </RoundImages> */}
        </Header>{" "}
        {isStudentLoading ? (
          <LoaderCover>
            <Loader />
          </LoaderCover>
        ) : (
          <CardContainer>
            {students.map((data) => (
              <Card key={data.id}>
                <div>
                  <Images>
                    <ProfileContainer>
                      {data?.student_details.student_image ? (
                        <UpdateProfile>
                          <img
                            src={data.student_details.student_image}
                            alt="Profile picture"
                          />
                        </UpdateProfile>
                      ) : (
                        <Avatar
                          name={data?.student_details.student_name}
                          size="105%"
                          maxInitials={2}
                        />
                      )}
                    </ProfileContainer>
                    <MedalCotainer>
                      <img src={NormalMedal} alt="Medal" />
                    </MedalCotainer>
                  </Images>
                  <Name>{data.student_details.student_name}</Name>
                </div>
                <Score>
                  <Rank>
                    <h4>{data.position}</h4>
                    <p>Rank</p>
                  </Rank>
                  <Ponits>
                    <h4>{data.point}</h4>
                    <p>Points</p>
                  </Ponits>
                </Score>
              </Card>
            ))}
          </CardContainer>
        )}
      </MainContainer>
    </>
  );
}

export default StudentsPosition;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const TxtConainer = styled.div``;
const MainContainer = styled.div`
  /* margin-top: 20px; */
  background-color: #fff;
  border-radius: 5px;
  padding: 22px 0px;
  @media all and (max-width: 1050px) {
    margin-top: 0px;
  }
`;

const RoundImages = styled.div`
  /* position: relative; */
`;
const ImageContainers = styled.div`
  display: flex;
  /* position: absolute; */
  right: 75px;
  @media all and (max-width: 1280px) {
    right: 70px;
  }
`;
const Third = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 35px;
  height: 35px;
  border: 2px solid #fff;
  /* position: absolute; */
  z-index: 1;
  transform: translate(-27px, -1px);
  left: 6px;
  background-color: #fdd835;
  @media all and (max-width: 1280px) {
    width: 35px;
    height: 35px;
    left: 9px;
  }
  @media all and (max-width: 980px) {
    width: 35px;
    height: 35px;
  }
  @media all and (max-width: 360px) {
    width: 32px;
    height: 32px;
    padding: 0px;
    transform: translate(-29px, -1px);
  }

  img {
    display: block;
    width: 100%;
  }
`;
const Second = styled.div`
  border-radius: 50%;
  border-radius: 50%;
  overflow: hidden;
  width: 35px;
  height: 35px;
  border: 2px solid #fff;
  /* position: absolute; */
  z-index: 2;
  left: 20px;
  background-color: #4285f4;
  transform: translate(22px, -1px);
  @media all and (max-width: 1280px) {
    width: 35px;
    height: 35px;
    left: 21px;
  }
  @media all and (max-width: 980px) {
    width: 35px;
    height: 35px;
  }
  @media all and (max-width: 360px) {
    width: 34px;
    height: 32px;
    padding: 0px;
    transform: translate(18px, -1px);
  }

  img {
    display: block;
    width: 100%;
  }
`;
const Top = styled.div`
  border-radius: 50%;
  width: 35px;
  height: 35px;
  border: 2px solid #fff;
  padding: 6px 1px;
  background-color: green;
  /* position: absolute; */
  left: 33px;
  z-index: 3;
  transform: translate(71px, -1px);
  @media all and (max-width: 1280px) {
    width: 35px;
    height: 35pxpx;
  }
  @media all and (max-width: 980px) {
    width: 35px;
    height: 35px;
  }
  @media all and (max-width: 360px) {
    width: 34px;
    height: 32px;
    padding: 5px 1px;
    transform: translate(65px, -1px);
  }
  p {
    font-size: 11px;
    color: #fff;
    text-align: center;
    transform: translateY(2px);
  }
`;
const Text = styled.div`
  color: #656563;
  font-size: 18px;
  font-family: "gordita_medium";
`;

const CardContainer = styled.ul`
  padding-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 15px;
  @media all and (max-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media all and (max-width: 980px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media all and (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
  @media all and (max-width: 480px) {
    padding-top: 30px;
  }
  @media all and (max-width: 360px) {
    grid-template-columns: 1fr;
  }
`;
const Card = styled.li`
  text-align: center;
  background-color: #f9f9fb;
  padding: 19px 20px;
  border-radius: 10px;
  position: relative;
  border: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media all and (max-width: 980px) {
    padding: 25px 15px;
  }
  @media all and (max-width: 768px) {
    padding: 15px;
  }
`;
const Images = styled.div``;
const ProfileContainer = styled.div`
  width: 85px;
  min-width: 85px;
  height: 85px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #fff;
  background-color: #fff;
`;
const MedalCotainer = styled.div`
  width: 12%;
  position: absolute;
  top: 0;
  right: 20px;
  img {
    display: block;
    width: 100%;
  }
`;
const Name = styled.h4`
  font-size: 18px;
  font-family: "gordita_medium";
  color: #003c3c;
  padding: 20px 0;
  text-transform: capitalize;
  @media all and (max-width: 1050px) {
    font-size: 15px;
    padding: 15px 10px;
  }
  @media all and (max-width: 1280px) {
    padding: 15px 5px;
  }
`;
const Score = styled.div`
  display: flex;
`;
const Rank = styled.div`
  width: 50%;
  border-right: 1px solid #d4d4d4;
  h4 {
    color: #0fa76f;
    font-family: "gordita_medium";
    @media all and (max-width: 1050px) {
      font-size: 16px;
    }
    @media all and (max-width: 1280px) {
      font-size: 14px;
    }
  }
  p {
    font-size: 14px;
    font-family: "gordita_regular";
    @media all and (max-width: 1050px) {
      font-size: 14px;
    }
  }
`;
const Ponits = styled.div`
  width: 50%;
  h4 {
    color: #0fa76f;
    font-family: "gordita_medium";
    @media all and (max-width: 1050px) {
      font-size: 16px;
    }
    @media all and (max-width: 1280px) {
      font-size: 14px;
    }
  }
  p {
    font-size: 14px;
    font-family: "gordita_regular";
    @media all and (max-width: 1280px) {
      font-size: 14px;
    }
    @media all and (max-width: 1050px) {
      font-size: 14px;
    }
  }
`;
const LoaderCover = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  width: 100%;
`;
const UpdateProfile = styled.div`
  border-radius: 50%;

  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  margin: 0 auto;
  margin-bottom: 15px;
  img {
    display: block;
    width: 100%;
  }
`;
