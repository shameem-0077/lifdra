import React, { useState } from "react";
import styled from "styled-components";
import SubscriptionBanner from "./SubscriptionBanner";

// Mock data for courses
const courses = [
  {
    id: 1,
    title: "School of UI UX",
    badge: "50% off",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    lessons: 32,
    duration: "12h 42m",
    description: "Learn to design intuitive and engaging digital experiences with our UI/UX Design course. This program introduces you to the fundamentals of user interface and user experience design.",
    price: 5000,
    oldPrice: 12000,
    buyUrl: "#",
  },
  {
    id: 2,
    title: "School Of Design",
    badge: "50% off",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
    lessons: 18,
    duration: "3h 42m",
    description: "Dive into the creative world of visual communication with our Graphic Design course. From mastering design principles and tools to creating stunning visuals.",
    price: 7000,
    oldPrice: 10000,
    buyUrl: "#",
  },
  {
    id: 3,
    title: "Nano grad",
    badge: "50% off",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    lessons: 22,
    duration: "7h 42m",
    description: "Our Nano Graduate Course in Design offers a fast-tracked, intensive learning experience across major design disciplines—including UI/UX, graphic design, and more.",
    price: 8000,
    oldPrice: 14000,
    buyUrl: "#",
  },
  {
    id: 4,
    title: "3D Designing",
    badge: "50% off",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg",
    lessons: 14,
    duration: "9h 42m",
    description: "Step into the world of 3D creation with our 3D Designing course, where you'll learn to model, texture, and render stunning visuals for games and animation.",
    price: 12000,
    oldPrice: 16000,
    buyUrl: "#",
  },
];

const Nav = () => {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <Container>
      <Heading>Prime Programmes</Heading>
      <BannerWrapper>
        <SubscriptionBanner />
      </BannerWrapper>
      <Tabs>
        <Tab
          active={activeTab === "courses"}
          onClick={() => setActiveTab("courses")}
        >
          Courses
        </Tab>
        <Tab
          active={activeTab === "purchased"}
          onClick={() => setActiveTab("purchased")}
        >
          Purchased
        </Tab>
      </Tabs>
      <Underline activeTab={activeTab} />
      {activeTab === "courses" && (
        <Grid>
          {courses.map((course) => (
            <Card key={course.id}>
              <Badge>{course.badge}</Badge>
              <CardTitleRow>
                <CardTitle>{course.title}</CardTitle>
                <CardIcon src={course.icon} alt="icon" />
              </CardTitleRow>
              <CardInfo>
                <span>{course.lessons} Lessons</span>
                <span>{course.duration}</span>
              </CardInfo>
              <CardDesc>{course.description}</CardDesc>
              <CardPriceRow>
                <CardPrice>₹{course.price.toLocaleString()}</CardPrice>
                <CardOldPrice>₹{course.oldPrice.toLocaleString()}</CardOldPrice>
              </CardPriceRow>
              <BuyButton href={course.buyUrl}>Buy Now</BuyButton>
            </Card>
          ))}
        </Grid>
      )}
      {activeTab === "purchased" && (
        <EmptyMsg>No purchased courses yet.</EmptyMsg>
      )}
    </Container>
  );
};

export default Nav;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px 0 24px;
`;

const Heading = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 24px;
`;

const BannerWrapper = styled.div`
  margin-bottom: 32px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 0;
`;

const Tab = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  width: 120px;
  color: ${({ active }) => (active ? "#a02060" : "#888")};
  cursor: pointer;
  padding: 0 0 12px 0;
  outline: none;
  position: relative;
`;

const Underline = styled.div`
  height: 3px;
  width: 120px;
  background: #a02060;
  margin-left: ${({ activeTab }) => (activeTab === "courses" ? "0px" : "120px")};
  margin-bottom: 32px;
  transition: margin-left 0.3s;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 24px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 20px 20px 16px 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Badge = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  background: #a02060;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 6px;
`;

const CardTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  margin-top: 24px;
`;

const CardTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
`;

const CardIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const CardInfo = styled.div`
  display: flex;
  gap: 16px;
  color: #a02060;
  font-size: 0.98rem;
  margin-bottom: 8px;
`;

const CardDesc = styled.p`
  color: #444;
  font-size: 0.98rem;
  margin-bottom: 16px;
  min-height: 48px;
`;

const CardPriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 12px;
`;

const CardPrice = styled.span`
  color: #a02060;
  font-size: 1.2rem;
  font-weight: 700;
`;

const CardOldPrice = styled.span`
  color: #888;
  font-size: 1rem;
  text-decoration: line-through;
`;

const BuyButton = styled.a`
  background: #a02060;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 0;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  margin-top: auto;
  transition: background 0.2s;
  &:hover {
    background: #7a1847;
  }
`;

const EmptyMsg = styled.div`
  color: #888;
  font-size: 1.1rem;
  text-align: center;
  margin-top: 48px;
`;
