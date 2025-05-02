import React, { Suspense, useState } from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import TechUpdatesSingle from "../../learn/includes/tech-updates/TechUpdatesSingle";
import SideBox from "../../learn/includes/tech-updates/SideBox";
import TechUpdatesFeatures from "../../learn/screens/tech-updates/TechUpdatesFeatures";
import Search from "../../../assets/images/tech-update/searched.svg";
import Save from "../../../assets/images/tech-update/saved.svg";
import styled from "styled-components";

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
function TechUpdatesInnerRouter() {
  const [showSideBox, setShowBox] = useState(false);
  return (
    <MainContainer>
      <LeftContainerBox>
        <Heading>
          <h2>Tech Updates</h2>
        </Heading>
        <HambergMenu
        //   onClick={() => {
        //     setShowBox(true);
        //   }}
        >
          <SearchIcon to="/tech-updates/topics/">
            <img src={Search} />
          </SearchIcon>
          <SaveIcon to="/tech-updates/saved-posts/?updates=all">
            <img src={Save} />
          </SaveIcon>
        </HambergMenu>
		
        <Suspense fallback={<h1>Loading...</h1>}>
          <Route exact path="/tech-updates/" component={TechUpdatesFeatures} />
          <Route exact path="/post/:slug/" component={TechUpdatesSingle} />
        </Suspense>
      </LeftContainerBox>
      <RightContainerBox className={showSideBox && "active"}>
        <SideBox />
      </RightContainerBox>
    </MainContainer>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(TechUpdatesInnerRouter);

const Heading = styled.h2`
	font-family: "gordita_medium";
	margin-top: 20px;
	h3 {
		font-size: 24px;
		color: #3e3e3e;
		@media all and (max-width: 980px) {
		font-size: 18px;
		}
		@media all and (max-width: 768px) {
		font-size: 18px;
		}
		@media all and (max-width: 640px) {
		font-size: 16px;
		}
	}
`;
const HambergMenu = styled.span`
	display: none;
	display: flex;
	position: absolute;
	top: 20px;
	right: 20px;
	@media all and (max-width: 640px) {
		display: block;
	}
`;
const SearchIcon = styled(Link)`
	cursor: pointer;
	display: none;
	border-radius: 8px;
	border: 1px solid #e7e7e7;
	width: 35%;
	padding: 2px;
	margin-right: 10px;
	@media all and (max-width: 640px) {
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
	@media all and (max-width: 640px) {
		display: block;
	}
	img {
		display: block;
		width: 100%;
	}
`;
const MainContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;
const LeftContainerBox = styled.div`
	width: 72%;
	position: relative;
	&:after {
		content: "";
		top: 400px;
		right: 0;
		width: 20px;
		height: 500px;
		background: #000;
	}
`;
const RightContainerBox = styled.div`
	width: 26%;
	@media all and (max-width: 640px) {
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
