import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

function SatApplyNowSection() {
  const category = [
    {
      id: 1,
      name: "Tech Schooling",
      type: "School Students",
      image:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/school.svg",
      link: "/tech-schooling/apply",
    },
    {
      id: 2,
      name: "Tech Degree",
      type: "College Students",
      image:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/college.svg",
      // link: "/jobdesk/apply/",
      link: "/tech-degree/apply",
    },
    // {
    //     id: 3,
    //     name: "Tech Grad",
    //     type: "Graduates",
    //     image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/graduate.svg",
    //     // link: "/jobdesk/apply/",
    //     link: "/tech-grad/apply",
    // },
  ];

  const history = useHistory();
  const dispatch = useDispatch();
  const handleRoute = (data) => {
    localStorage.setItem("student", JSON.stringify(data.type ? data.type : ""));
    dispatch({
      type: "UPDATE_STUDENT_TYPE",
      student_type: data.type,
    });
    history.push(data.link);
  };
  return (
    <Container>
      <InnerContainer>
        <TopSection>
          <Title>Apply Now</Title>
        </TopSection>
        <CategorySection>
          {category.map((data) => (
            <Cover to={data.link} onClick={() => handleRoute(data)}>
              <Category>
                <AvatarImage>
                  <img src={data.image} alt={data.type} />
                </AvatarImage>
                <DetailSection>
                  <LeftSection>
                    <CategoryFor>{data.type}</CategoryFor>
                    <CategoryName>{data.name}</CategoryName>
                  </LeftSection>
                  <Arrow>
                    <i class="las la-arrow-right"></i>
                  </Arrow>
                </DetailSection>
              </Category>
            </Cover>
          ))}
        </CategorySection>
        <Decorative>
          <img
            src={
              "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/green-deco.svg"
            }
            alt=""
          />
        </Decorative>
      </InnerContainer>
    </Container>
  );
}

export default SatApplyNowSection;
const Container = styled.div`
  position: relative;
`;
const InnerContainer = styled.div`
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  position: relative;
  z-index: 2;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  max-width: 1100px;
  margin: 0 auto;
  @media all and (max-width: 768px) {
    width: 80%;
  }
  @media all and (max-width: 480px) {
    width: 100%;
    padding: 20px;
  }
`;
const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  @media all and (max-width: 980px) {
    display: block;
  }
`;
const Title = styled.h3`
  font-family: gordita_medium;
  color: #2d2d2d;
  font-size: 20px;
  @media all and (max-width: 980px) {
    font-size: 20px;
    margin-bottom: 6px;
  }
  @media all and (max-width: 480px) {
    font-size: 18px;
  }
`;

const CategorySection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  @media all and (max-width: 1280px) {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;
const Cover = styled.div`
  background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
  border-radius: 6px;

  @media all and (max-width: 1280px) {
    width: calc(50% - 10px);
  }
  @media all and (max-width: 768px) {
    width: 100%;
  }
`;
const Category = styled.div`
  padding: 10px;
  background-color: #edf5eb;
  border-radius: 5px;
  transition: all 0.3s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0);
    &.de_active {
      display: none !important;
      opacity: 0 !important;
    }
    &.active {
      display: block !important;
      opacity: 1 !important;
    }
    h3,
    p,
    i {
      transition: all 0.3s;
      color: #fff !important;
    }
  }
`;

const AvatarImage = styled.div`
  width: 60px;
  min-width: 60px;
  display: block;
  margin-right: 20px;
  img {
    width: 100%;
    display: block;
  }
  @media all and (max-width: 980px) {
    width: 50px;
    min-width: 50px;
  }
  @media all and (max-width: 480px) {
    width: 40px;
    min-width: 40px;
    margin-right: 12px;
  }
  @media all and (max-width: 360px) {
    width: 35px;
    min-width: 35px;
    margin-right: 12px;
  }
`;
const DetailSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const LeftSection = styled.div``;
const Arrow = styled.span`
  display: block;
  transition: all 0.3s;
  i {
    display: block;
    color: #0fa76f;
    font-size: 30px;
    @media all and (max-width: 768px) {
      font-size: 26px;
    }
    @media all and (max-width: 360px) {
      font-size: 20px;
    }
  }
`;
const CategoryFor = styled.h3`
  color: #2d2d2d;
  font-family: gordita_medium;
  font-size: 18px;
  @media all and (max-width: 980px) {
    font-size: 16px;
  }
  @media all and (max-width: 360px) {
    font-size: 14px;
  }
`;
const CategoryName = styled.p`
  color: #13b077;
  font-family: gordita_medium !important;
  font-size: 14px;
  @media all and (max-width: 768px) {
    font-size: 13px;
  }
`;

const Decorative = styled.span`
  position: absolute;
  top: -40px;
  left: -60px;
  width: 100px;
  img {
    width: 100%;
    display: block;
  }
  @media all and (max-width: 480px) {
    top: -28px;
    left: -29px;
    width: 65px;
  }
`;
