import React, { Suspense, useEffect, useState, lazy } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import TechUpdatesSingle from "../../learn/includes/tech-updates/TechUpdatesSingle";
import SideBox from "../../learn/includes/tech-updates/SideBox";
import TechUpdatesFeatures from "../../learn/screens/tech-updates/TechUpdatesFeatures";
import AllTopics from "../../learn/screens/tech-updates/AllTopics";
import SavedPostsPage from "../../learn/screens/tech-updates/SavedPostsPage";
import RouteLoading from "../RouteLoading";

function mapStateToProps(state) {
  return {
    divMainClass: state.divMainClass,
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    updateActiveMenu: (active_menu) =>
      dispatch({
        type: "ACTIVE_MENU",
        active_menu: active_menu,
      }),
  };
}

function TechUpdatesRouter(props) {
  const { divMainClass, tech_topic, user_profile } = useSelector(
    (state) => state
  );
  const [showSideBox, setShowBox] = useState(false);
  const [inner, setInner] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    props.updateActiveMenu("tech_updates");
  }, []);

  useEffect(() => {
    if (
      location.pathname.includes("saved-posts") ||
      location.pathname.includes("topics")
    ) {
      setInner(true);
    } else {
      setInner(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    let tech_topic = localStorage.getItem("tech_topic");
    tech_topic = JSON.parse(tech_topic);
    if (tech_topic) {
      dispatch({
        type: "UPDATE_TECH_CATEGORY",
        tech_topic: tech_topic,
      });
    }
  }, []);

  useEffect(() => {
    document.body.classList.add("tech-updates");

    return () => {
      document.body.classList.remove("tech-updates");
    };
  }, []);

  return (
    <div id="main" className={`${divMainClass} tech-update`}>
      {/* {user_profile?.is_free_trial_enabled !== undefined &&
		user_profile?.subscription_data?.has_active_subscription !== undefined &&
		user_profile?.subscription_data?.is_premium_user !== undefined ? (
			user_profile?.is_free_trial_enabled ||
			user_profile?.subscription_data?.has_active_subscription ||
			user_profile?.subscription_data?.is_premium_user ? ( */}
      <MainContainer>
        <LeftContainerBox inner={inner}>
          {/* {!inner && (
            <Heading>
              {console.log(tech_topic, "tech_topic")}
              {tech_topic ? tech_topic : "Tech Updatessssss"}
            </Heading>
          )} */}
          {/* {!inner && (
					<HambergMenu>
						<SearchIcon to="/tech-updates/topics/">
							<img src={Searched} />
						</SearchIcon>
						<SaveIcon to="/tech-updates/saved-posts/?updates=all">
							<img src={Save} />
						</SaveIcon>
					</HambergMenu>
				)} */}
          <Suspense fallback={<RouteLoading />}>
            <Routes>
              <Route path="/" element={<TechUpdatesFeatures />} />
              <Route path="/post/:slug/" element={<TechUpdatesSingle />} />
              <Route path="/topics/" element={<AllTopics />} />
              <Route path="/saved-posts/" element={<SavedPostsPage />} />
            </Routes>
          </Suspense>
        </LeftContainerBox>
        {!inner && (
          <RightContainerBox className={showSideBox && "active"}>
            <SideBox />
          </RightContainerBox>
        )}
      </MainContainer>
      {/* ) : (
			<UnAutharisedPage />
			)
		) : (
			<RouteLoading />
		)} */}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchtoProps)(TechUpdatesRouter);

// const Heading = styled.h2`
//   font-size: 1.714rem;
//   color: #3e3e3e;
//   font-family: "gordita_medium";
//   margin-top: 20px;

//   @media all and (max-width: 980px) {
//     font-size: 18px;
//   }
//   @media all and (max-width: 768px) {
//     font-size: 18px;
//   }
//   @media all and (max-width: 640px) {
//     font-size: 16px;
//   }
// `;
const HambergMenu = styled.span`
  display: none;
  position: absolute;
  top: 20px;
  right: 20px;
  @media all and (max-width: 768px) {
    display: none;
    /* display: flex;
    flex-direction: row-reverse; */
  }
`;
const SearchIcon = styled(Link)`
  cursor: pointer;
  display: none;
  border-radius: 8px;
  border: 1px solid #e7e7e7;
  width: 35%;
  padding: 2px;

  @media all and (max-width: 768px) {
    display: block;
  }
  img {
    display: block;
    width: 100%;
  }
`;
const SaveIcon = styled(Link)`
  cursor: pointer;
  display: none;
  border-radius: 8px;
  border: 1px solid #e7e7e7;
  width: 35%;
  padding: 2px;
  margin-right: 10px;
  @media all and (max-width: 768px) {
    display: block;
  }
  img {
    display: block;
    width: 100%;
  }
`;
const MainContainer = styled.div`
  /* padding: 32px 0px 0px; */
  display: flex;
  justify-content: space-between;
  @media all and (max-width: 360px) {
    padding: 0;
  }
`;
const LeftContainerBox = styled.div`
  width: ${({ inner }) => (inner ? "100%" : "72%")};
  position: relative;

  &:after {
    content: "";
    top: 400px;
    right: 0;
    width: 20px;
    height: 500px;
    background: #000;
  }
  @media all and (max-width: 1024px) {
    width: 100%;
  }
  @media all and (max-width: 768px) {
    width: ${({ inner }) => (inner ? "100%" : "100%")};
  }
  @media all and (max-width: 640px) {
    width: ${({ inner }) => (inner ? "100%" : "100%")};
  }
`;
const RightContainerBox = styled.div`
  padding: 48px 0px 20px 0px;
  width: 26%;
  @media all and (max-width: 1024px) {
    display: none;
  }
  @media all and (max-width: 768px) {
    position: absolute;
    background: white;
    width: 300px;
    height: 100vh;
    transition: 0.9s ease all;
    right: -300px;
    &.active {
      right: 0;
    }
  }
`;
