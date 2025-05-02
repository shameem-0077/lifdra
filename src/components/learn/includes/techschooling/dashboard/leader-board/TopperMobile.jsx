import React from "react";
import Avatar from "react-avatar";
import styled from "styled-components";
import BannerBg1 from "../../../../../../assets/images/leader-board/bannerBg.svg";

function TopperMobile({ toppers }) {
  return (
    <Container>
      <TopSection>
        {toppers
          .filter((item) => item.position === 1)
          .map((data) => (
            <FirstCard key={data.id}>
              <Cover>
                {" "}
                <ImageContainer>
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
                </ImageContainer>
                <Badge style={{ width: "35px" }}>
                  <img
                    src={require("../../../../../../assets/images/leader-board/First-medal.svg")}
                    alt="First medal"
                  />
                </Badge>
              </Cover>
              <ContentSection>
                <Point>{data.point}</Point>
                <Name>{data?.student_details.student_name}</Name>
              </ContentSection>
            </FirstCard>
          ))}
      </TopSection>
      <BottomSection>
        <div style={{ maxWidth: "180px", width: "60%", margin: "0 auto" }}>
          {toppers
            .filter((item) => item.position === 2)
            .map((data) => (
              <SecondCard key={data.id}>
                <SecondCover>
                  <SecondImageContainer>
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
                  </SecondImageContainer>
                  <Badge>
                    <img
                      src={require("../../../../../../assets/images/leader-board/Second-medal.svg")}
                      alt="First medal"
                    />
                  </Badge>
                </SecondCover>
                <ContentSection style={{ marginTop: "0px" }}>
                  <Point>{data.point}</Point>
                  <Name>{data?.student_details.student_name}</Name>
                </ContentSection>
              </SecondCard>
            ))}
        </div>
        <div style={{ width: "100%" }}>
          {" "}
          {toppers
            .filter((item) => item.position === 3)
            .map((data) => (
              <ThirdCard key={data.id}>
                <ThirdCover>
                  <ThirdImageContainer>
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
                  </ThirdImageContainer>
                  <Badge>
                    <img
                      src={require("../../../../../../assets/images/leader-board/Third-medal.svg")}
                      alt="First medal"
                    />
                  </Badge>
                </ThirdCover>
                <ContentSection style={{ marginTop: "-20px" }}>
                  <Point>{data.point}</Point>
                  <Name>{data?.student_details.student_name}</Name>
                </ContentSection>
              </ThirdCard>
            ))}
        </div>
      </BottomSection>
    </Container>
  );
}

export default TopperMobile;
const Container = styled.div`
  display: none;
  padding: 20px;
  background-color: #003c3c;
  background-image: url(${BannerBg1});
  background-position: inherit;
  background-size: 100%;
  border-radius: 15px;
  @media all and (max-width: 480px) {
    display: block;
  }
`;

const TopSection = styled.div``;
const FirstCard = styled.div`
  width: 60%;
  margin: 0 auto;
  max-width: 180px;
  background: linear-gradient(180.35deg, #fab036 -44.32%, #ffffff 99.7%);
  border-radius: 5px;
`;
const Cover = styled.div`
  width: 100px;
  position: relative;
  margin: 0 auto;
  transform: translateY(-60px);
  margin-top: 70px;
`;
const SecondCover = styled.div`
  width: 90px;
  position: relative;
  margin: 0 auto;
  transform: translateY(-50px);
  margin-top: 20px;
`;
const ThirdCover = styled.div`
  width: 80px;
  position: relative;
  margin: 0 auto;
  transform: translateY(-45px);
  margin-top: 20px;
`;
const ThirdImageContainer = styled.div`
  border-radius: 50%;
  width: 100%;
  height: 80px;
  border: 2px solid #fff;

  overflow: hidden;
`;
const ImageContainer = styled.div`
  border-radius: 50%;
  width: 100%;
  height: 100px;
  border: 2px solid #fff;
  overflow: hidden;
`;
const SecondImageContainer = styled.div`
  border-radius: 50%;
  width: 100%;
  height: 90px;
  border: 2px solid #fff;
  overflow: hidden;
`;
const Badge = styled.span`
  position: absolute;
  width: 30px;
  left: 50%;
  transform: translateX(-50%);
  bottom: -20px;
  img {
    display: block;
    width: 100%;
  }
`;
const ContentSection = styled.div`
  margin-top: -30px;
  padding: 0 15px 15px;
`;
const Point = styled.h3`
  color: #01b95b;
  font-size: 14px;
  font-family: "gordita_medium";
  text-align: center;
`;
const Name = styled.h3`
  font-size: 14px;
  font-family: "gordita_medium";
  text-transform: capitalize;
  text-align: center;
`;
const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 50px;
  gap: 20px;
  align-items: flex-end;
`;
const SecondCard = styled.div`
  background: linear-gradient(180.9deg, #6dc1fd -66.94%, #ffffff 99.22%);
  border-radius: 5px;
  width: 100%;
`;
const ThirdCard = styled.div`
  background: linear-gradient(180deg, #0fa76f -78.06%, #ffffff 100%);
  border-radius: 5px;
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
