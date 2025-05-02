import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { createRipples } from "react-ripples";
import { primeprogramsConfig } from "../../../../axiosConfig";
import arrowImage from "../../../../assets/images/new-dashboard/arrow.svg";
import learnImage from "../../../../assets/images/new-dashboard/learning.svg";
import leaderImage from "../../../../assets/images/new-dashboard/leader-board.svg";
import primeImage from "../../../../assets/images/new-dashboard/prime.svg";
import supportImage from "../../../../assets/images/new-dashboard/support.svg";
import meetImage from "../../../../assets/images/meet/videoconference 2.svg";
import techImage from "../../../../assets/images/new-dashboard/techupdates.svg";
import projects from "../../../../assets/images/projects-Image/projects.svg";

function mapDispatchtoProps(dispatch) {
  return {
    toggleRespMenu: (value) =>
      dispatch({
        type: "TOGGLE_RESP_SIDE_MENU",
        value: value,
      }),
    handleLearnModal: (value) =>
      dispatch({
        type: "TOGGLE_LEARN_MODAL",
        isLearnDiv: value,
      }),
  };
}
function mapStatetoProps(state) {
  return {
    menu_type: state.menu_type,
    active_menu: state.active_menu,
    respSideMenuClass: state.respSideMenuClass,
    menuIconRef: state.menuIconRef,
    user_data: state.user_data,
    user_profile: state.user_profile,
    isLearnDiv: state.isLearnDiv,
  };
}

const MyRipple = createRipples({
  color: "#ffffff63",
});

class Sidebar extends React.PureComponent {
  state = {
    isHover: false,
    height: window.innerHeight,
    courses: 0,
  };

  handleResize = () => {
    this.setState({ height: window.innerHeight });
  };

  fetchCourses = () => {
    const { access_token } = this.props.user_data;
    primeprogramsConfig
      .get("learning/purchased-courses/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const { StatusCode, data } = response.data;
        if (StatusCode === 6000) {
          this.setState({ courses: data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.fetchCourses();

    document.addEventListener("mouseover", this.handleOverOnSideBar);
    document.addEventListener("mouseout", this.handleOutOnSideBar);
    document.addEventListener("mouseup", this.handleClickOutside);
    document.addEventListener("touchend", this.handleClickOutside);
    window.addEventListener("resize", this.handleResize);
  }

  setSideBarRef = (node) => {
    this.sideBarRef = node;
  };

  componentWillUnmount() {
    document.removeEventListener("mouseover", this.handleOverOnSideBar);
    document.removeEventListener("mouseout", this.handleOutOnSideBar);
    document.removeEventListener("mouseup", this.handleClickOutside);
    document.removeEventListener("touchend", this.handleClickOutside);
    window.addEventListener("resize", this.handleResize);
  }

  handleClickOutside = (event) => {
    if (this.props.menu_type === "hidden") {
      if (
        this.props.menuIconRef &&
        !this.props.menuIconRef.contains(event.target)
      ) {
        if (this.sideBarRef && !this.sideBarRef.contains(event.target)) {
          this.props.toggleRespMenu("hide");
        }
      }
    }
  };

  handleOverOnSideBar = (event) => {
    if (this.sideBarRef && this.sideBarRef.contains(event.target)) {
      this.setState({
        isHover: true,
      });
    }
  };

  handleOutOnSideBar = (event) => {
    if (this.sideBarRef && this.sideBarRef.contains(event.target)) {
      this.setState({
        isHover: false,
      });
    }
  };

  renderClassName = () => {
    if (this.props.menu_type === "mini-sidebar") {
      if (this.state.isHover) {
        return "normal";
      } else {
        return "mini-sidebar";
      }
    } else if (this.props.menu_type === "hidden") {
      return "hidden";
    } else {
      return "normal";
    }
  };

  render() {
    let { height } = this.state;
    return (
      <>
        <Overlay
          onClick={() => {
            if (window.innerWidth <= 1100) {
              this.props.toggleRespMenu("hide");
            }
          }}
          show={this.props.respSideMenuClass}
        />
        <MainSection
          height={height}
          ref={this.setSideBarRef}
          id="web-menu"
          className={`${this.renderClassName()} ${
            this.props.respSideMenuClass
          }`}
        >
          <WrapParent height={height}>
            <InnerWrapper>
              <ul>
                <li
                  className={
                    this.props.active_menu === "daily-syllabus" ? "active" : ""
                  }
                  style={this.styles.button_style}
                >
                  <RippleButton>
                    <Link
                      onClick={() => {
                        if (window.innerWidth <= 1100) {
                          this.props.toggleRespMenu("hide");
                        }
                        this.props.handleLearnModal(false);
                      }}
                      style={this.styles.link_style}
                      to={`/nanodegree/${this.props.slug}/daily-syllabus/`}
                    >
                      <MenuItemIcon
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/menu/dashboard.svg"
                        alt="Icon"
                      />
                      <span>Dashboard</span>
                      {/* <span></span> */}
                    </Link>
                  </RippleButton>
                </li>

                <li
                  className={this.props.isLearnDiv ? "learn-active" : ""}
                  style={this.styles.button_style}
                >
                  <RippleButton
                    className={
                      this.props.isLearnDiv
                        ? "learn learn-active"
                        : "learn learn-ripple"
                    }
                  >
                    <LearnDiv
                      onClick={(e) => {
                        this.props.handleLearnModal(!this.props.isLearnDiv);
                        e.preventDefault();
                        // if (window.innerWidth <= 1100) {
                        //     this.props.toggleRespMenu(
                        //         "hide"
                        //     );
                        // }
                      }}
                      style={this.styles.link_style}
                    >
                      <LearnHead>
                        <MenuItemIcon src={learnImage} alt="Icon" />
                        <span className="learn">Learning</span>
                        <ArrowIcon
                          src={arrowImage}
                          alt="Arrow"
                          className={
                            this.props.isLearnDiv
                              ? "learn-arrow arrow-active"
                              : "learn-arrow"
                          }
                        />
                      </LearnHead>
                    </LearnDiv>
                    <LearnUl
                      className={this.props.isLearnDiv ? "learn-active" : ""}
                    >
                      <LearnList
                        to={`/nanodegree/${this.props.slug}/professions/`}
                        onClick={(e) => {
                          if (window.innerWidth <= 1100) {
                            this.props.toggleRespMenu("hide");
                          }
                        }}
                      >
                        <SubMenuItemIcon
                          className="submenuIcon"
                          src={require("../../../../assets/images/new-dashboard/syllabus.svg")}
                          alt="Icon"
                        />
                        <span>Syllabus</span>
                      </LearnList>
                      <LearnList
                        to={`/nanodegree/${this.props.slug}/practices`}
                        onClick={(e) => {
                          if (window.innerWidth <= 1100) {
                            this.props.toggleRespMenu("hide");
                          }
                        }}
                      >
                        <SubMenuItemIcon
                          className="submenuIcon"
                          src={require("../../../../assets/images/new-dashboard/practice.svg")}
                          alt="Icon"
                        />
                        <span>Practices</span>
                      </LearnList>
                      <LearnList
                        to={`/nanodegree/${this.props.slug}/workshops`}
                        onClick={(e) => {
                          if (window.innerWidth <= 1100) {
                            this.props.toggleRespMenu("hide");
                          }
                        }}
                      >
                        <SubMenuItemIcon
                          className="submenuIcon"
                          src={require("../../../../assets/images/new-dashboard/workshop.svg")}
                          alt="Icon"
                        />
                        <span>Workshops</span>
                      </LearnList>
                      <LearnList
                        to={`/nanodegree/${this.props.slug}/assessments`}
                        onClick={(e) => {
                          if (window.innerWidth <= 1100) {
                            this.props.toggleRespMenu("hide");
                          }
                        }}
                      >
                        <SubMenuItemIcon
                          className="submenuIcon"
                          src={require("../../../../assets/images/new-dashboard/assessment.svg")}
                          alt="Icon"
                        />
                        <span>Assessments</span>
                      </LearnList>
                      <LearnList
                        to={`/nanodegree/${this.props.slug}/certification`}
                        onClick={(e) => {
                          if (window.innerWidth <= 1100) {
                            this.props.toggleRespMenu("hide");
                          }
                        }}
                      >
                        <SubMenuItemIcon
                          className="submenuIcon"
                          src={require("../../../../assets/images/new-dashboard/certification.svg")}
                          alt="Icon"
                        />
                        <span>Certification</span>
                      </LearnList>
                    </LearnUl>
                    {/* )} */}
                  </RippleButton>
                </li>

                <li
                  className={
                    this.props.active_menu === "support" ? "active" : ""
                  }
                  style={this.styles.button_style}
                >
                  <RippleButton>
                    <Link
                      onClick={() => {
                        if (window.innerWidth <= 1100) {
                          this.props.toggleRespMenu("hide");
                        }
                      }}
                      style={this.styles.link_style}
                      to={`/nanodegree/${this.props.slug}/support/`}
                    >
                      <MenuItemIcon
                        src={require("../../../../assets/images/support.svg")}
                        alt="Icon"
                      />
                      <span>Support</span>
                      {/* <BetaIcon
                                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/badge-new.svg"
                                                    // {require("../../../../assets/images/support/beta.png")}
                                                    alt="Arrow"
                                                    className={
                                                        this.props.isLearnDiv
                                                            ? "learn-arrow arrow-active"
                                                            : "learn-arrow"
                                                    }
                                                /> */}
                    </Link>
                  </RippleButton>
                </li>
                {/* ----------------- meet section start---------------- */}
                <li
                  className={this.props.active_menu === "meet" ? "active" : ""}
                  style={this.styles.button_style}
                >
                  <RippleButton>
                    <Link
                      onClick={() => {
                        this.props.handleLearnModal(false);
                        if (window.innerWidth <= 1100) {
                          this.props.toggleRespMenu("hide");
                        }
                      }}
                      to={`/nanodegree/${this.props.slug}/meet/`}
                      style={this.styles.link_style}
                    >
                      <MenuItemIcon src={meetImage} alt="Icon" />
                      <span className="g-regular">Meet</span>
                    </Link>
                  </RippleButton>
                </li>
                {/* ----------------- meet section end---------------- */}
              </ul>
              <ul>
                <li
                  className={
                    this.props.active_menu === "leader_board" ? "active" : ""
                  }
                  style={this.styles.button_style}
                >
                  <RippleButton>
                    <Link
                      onClick={() => {
                        this.props.handleLearnModal(false);
                        if (window.innerWidth <= 768) {
                          this.props.toggleRespMenu("hide");
                        }
                      }}
                      style={this.styles.link_style}
                      to={`/nanodegree/${this.props.slug}/leaderboard/`}
                    >
                      <MenuItemIcon src={leaderImage} alt="Icon" />
                      <span>Weekly Leaderboard</span>
                    </Link>
                  </RippleButton>
                </li>
                {/* {this.props.user_profile.subscription_data
                                    .has_active_subscription &&
                                !this.props.user_profile.subscription_data
                                    .expired_subscription ? (
                                    <li
                                        className={
                                            this.props.active_menu ===
                                            "monthly_report"
                                                ? "active"
                                                : ""
                                        }
                                        style={this.styles.button_style}
                                    >
                                        <RippleButton>
                                            <Link
                                                onClick={() => {
                                                    this.props.handleLearnModal(
                                                        false
                                                    );
                                                    if (
                                                        window.innerWidth <= 768
                                                    ) {
                                                        this.props.toggleRespMenu(
                                                            "hide"
                                                        );
                                                    }
                                                }}
                                                style={this.styles.link_style}
                                                to="/monthly-report/"
                                            >
                                                <MenuItemIcon
                                                    src={MonthlyIcon}
                                                    alt="Icon"
                                                />
                                                <span>Monthly Report</span>
                                            </Link>
                                        </RippleButton>
                                    </li>
                                ) : null} */}
                {/* {this.state.courses.length > 0 && (
                  <li
                    className={
                      this.props.active_menu === "prime-programs"
                        ? "active"
                        : ""
                    }
                    style={this.styles.button_style}
                  >
                    <RippleButton>
                      <Link
                        onClick={() => {
                          this.props.handleLearnModal(false);
                          if (window.innerWidth <= 1100) {
                            this.props.toggleRespMenu("hide");
                          }
                        }}
                        style={this.styles.link_style}
                        to="/prime-programs/courses/"
                      >
                        <MenuItemIcon src={primeImage} alt="Icon" />
                        <span>Prime Programs</span>
                      </Link>
                    </RippleButton>
                  </li>
                )} */}

                <li
                  className={
                    this.props.active_menu === "projects" ? "active" : ""
                  }
                  style={this.styles.button_style}
                >
                  <RippleButton>
                    <Link
                      onClick={() => {
                        this.props.handleLearnModal(false);
                        if (window.innerWidth <= 1100) {
                          this.props.toggleRespMenu("hide");
                        }
                      }}
                      style={this.styles.link_style}
                      to={`/nanodegree/${this.props.slug}/projects/`}
                    >
                      <MenuItemIcon src={projects} alt="Icon" />
                      <span>Projects</span>
                    </Link>
                  </RippleButton>
                </li>

                {/* {(this.props.user_profile?.is_free_trial_enabled ||
                  this.props.user_profile?.subscription_data
                    ?.has_active_subscription ||
                  this.props.user_profile?.subscription_data
                    ?.is_premium_user) && ( */}
                {/* <li
                  className={
                    this.props.active_menu === "tech_updates" ? "active" : ""
                  }
                  style={this.styles.button_style}
                >
                  <RippleButton>
                    <Link
                      onClick={() => {
                        this.props.handleLearnModal(false);
                        if (window.innerWidth <= 1100) {
                          this.props.toggleRespMenu("hide");
                        }
                      }}
                      style={this.styles.link_style}
                      to="/tech-updates/?updates=all"
                    >
                      <MenuItemIcon src={techImage} alt="Icon" />
                      <span>Tech Updates</span>
                    </Link>
                  </RippleButton>
                </li> */}

                {/* --------- community sidebar ---------------

                {
                  <li
                    className={
                      this.props.active_menu === "community" ? "active" : ""
                    }
                    style={this.styles.button_style}
                  >
                    <RippleButton>
                      <Link
                        onClick={() => {
                          this.props.handleLearnModal(false);
                          if (window.innerWidth <= 1100) {
                            this.props.toggleRespMenu("hide");
                          }
                        }}
                        style={this.styles.link_style}
                        to="/community/"
                      >
                        <MenuItemIcon
                          src={
                            "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/01-06-2024/community.svg"
                          }
                          alt="Icon"
                        />
                        <span>Community</span>
                      </Link>
                    </RippleButton>
                  </li>
                } */}

                {/* <li
                                    className={
                                        this.props.active_menu === "challenges"
                                            ? "active"
                                            : ""
                                    }
                                    style={this.styles.button_style}
                                    title="Challenges"
                                >
                                    <RippleButton>
                                        <Link
                                            onClick={() => {
                                                this.props.handleLearnModal(
                                                    false
                                                );
                                                if (window.innerWidth <= 1100) {
                                                    this.props.toggleRespMenu(
                                                        "hide"
                                                    );
                                                }
                                            }}
                                            style={this.styles.link_style}
                                            to="/challenges/"
                                        >
                                            <MenuItemIcon
                                                src={challengeImage}
                                                alt="Icon"
                                            />
                                            <span>Challenges</span>
                                        </Link>
                                    </RippleButton>
                                </li> */}

                {/* {this.props.user_profile.subscription_data &&
                                    !this.props.user_profile.subscription_data
                                        .expired_subscription &&
                                    this.props.user_data.signup_type ===
                                        "tech_schooling" && (
                                        <li
                                            className={
                                                this.props.active_menu ===
                                                "premium_assist"
                                                    ? "active"
                                                    : ""
                                            }
                                            style={this.styles.button_style}
                                            title="Premium Assist"
                                        >
                                            <RippleButton>
                                                <Link
                                                    onClick={() => {
                                                        if (
                                                            window.innerWidth <=
                                                            1100
                                                        ) {
                                                            this.props.toggleRespMenu(
                                                                "hide"
                                                            );
                                                        }
                                                    }}
                                                    style={
                                                        this.styles.link_style
                                                    }
                                                    to="/premium-assist/"
                                                >
                                                    <MenuItemIcon
                                                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp-images/support-img.svg"
                                                        alt="Icon"
                                                    />
                                                    <span>Premium Assist</span>
                                                </Link>
                                            </RippleButton>
                                        </li>
                                    )} */}
              </ul>
              {/* <ul style={{ borderBottom: "unset" }}>
                                <li
                                    className={
                                        this.props.active_menu === "my_club"
                                            ? "active"
                                            : ""
                                    }
                                    style={this.styles.button_style}
                                >
                                    <RippleButton>
                                        <Link
                                            onClick={() => {
                                                if (window.innerWidth <= 768) {
                                                    this.props.toggleRespMenu(
                                                        "hide"
                                                    );
                                                }
                                            }}
                                            style={this.styles.link_style}
                                            to="/my-club/"
                                        >
                                            <MenuItemIcon
                                                src={require("../../../../assets/images/myClub/my-club-logo.svg")}
                                                alt="Icon"
                                            />
                                            <span>My Club</span>
                                        </Link>
                                    </RippleButton>
                                </li> */}

              {/* <li
                                    className={
                                        this.props.active_menu === "ceo_talks"
                                            ? "active"
                                            : ""
                                    }
                                    style={this.styles.button_style}
                                >
                                    <RippleButton>
                                        <Link
                                            onClick={() => {
                                                if (window.innerWidth <= 1100) {
                                                    this.props.toggleRespMenu(
                                                        "hide"
                                                    );
                                                }
                                            }}
                                            style={this.styles.link_style}
                                            to="/talrop-talks/"
                                        >
                                            <MenuItemIcon
                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp-images/ceotalk.svg"
                                                alt="Icon"
                                            />
                                            <span>Talrop Talks</span>
                                        </Link>
                                    </RippleButton>
                                </li> */}

              {/* <li
								className={
									this.props.active_menu === "my-activities"
										? "active"
										: ""
								}
								style={this.styles.button_style}
							>
								<RippleButton>
									<Link
										onClick={() => {
											if (window.innerWidth <= 1100) {
												this.props.toggleRespMenu(
													"hide"
												);
											}
										}}
										style={this.styles.link_style}
										to="/my-activities/"
									>
										<MenuItemIcon
											src={Calender}
											alt="Icon"
										/>
										<span>My Activities</span>
									</Link>
								</RippleButton>
							</li> */}
              {/* </ul>  */}
            </InnerWrapper>
            {/* <ReferMainContainer>
                            {this.props.user_profile.subscription_data &&
                                !this.props.user_profile.subscription_data
                                    .expired_subscription && (
                                    <ReferContainer
                                        to="/merchandise/"
                                        className="social"
                                        onClick={() => {
                                            if (window.innerWidth <= 1100) {
                                                this.props.toggleRespMenu(
                                                    "hide"
                                                );
                                            }
                                        }}
                                    >
                                        <ReferImageContainer>
                                            <ReferImage
                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/merchandise/ReferImage.png"
                                                alt=""
                                            />
                                        </ReferImageContainer>
                                        <Button to="/merchandise/">
                                            <ReferIconSpan>
                                                <ReferIcon
                                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/merchandise/ReferIcon.svg"
                                                    alt=""
                                                />
                                            </ReferIconSpan>
                                            Refer and Earn
                                        </Button>
                                    </ReferContainer>
                                )}
                        </ReferMainContainer> */}
          </WrapParent>
          <Social className="bottom-fixed">
            {/* <li className="social">
              <SocialWrapper>
                <SocialLink
                  target="_blank"
                  href="https://www.linkedin.com/company/steyp/"
                  rel="noopener noreferrer"
                >
                  <SocialIcon
                    alt="Steyp"
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/social/linkedin.svg"
                  />
                </SocialLink>
                <SocialLink
                  target="_blank"
                  href="https://twitter.com/steypworld/"
                  rel="noopener noreferrer"
                >
                  <SocialIcon
                    alt="Steyp"
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/twitterx.svg"
                  />
                </SocialLink>
                <SocialLink
                  target="_blank"
                  href="https://www.facebook.com/steypworld/"
                  rel="noopener noreferrer"
                >
                  <SocialIcon
                    alt="Steyp"
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/social/facebook.svg"
                  />
                </SocialLink>
                <SocialLink
                  target="_blank"
                  href="https://www.instagram.com/steypworld/"
                  rel="noopener noreferrer"
                >
                  <SocialIcon
                    alt="Steyp"
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/social/instagram.svg"
                  />
                </SocialLink>
                <SocialLink
                  target="_blank"
                  href="https://www.youtube.com/c/Steyp/"
                  rel="noopener noreferrer"
                >
                  <SocialIcon
                    alt="Steyp"
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/social/youtube.svg"
                  />
                </SocialLink>
              </SocialWrapper>
            </li> */}
            <li className="explore">
              <ExploreLink target="_blank" href="https://www.talrop.com/">
                <ExploreText>Explore Talrop</ExploreText>
                <ExploreIcon
                  src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/explore-white-arrow.svg"
                  alt="Talrop"
                />
              </ExploreLink>
            </li>
          </Social>
        </MainSection>
      </>
    );
  }
  styles = {
    button_style: {
      padding: "0px",
      overflow: "hidden",
    },
    link_style: {
      padding: "10px 21px",
      width: " -webkit-fill-available",
    },
    switch_style: {
      padding: "10px 13px",
      background: "rgba(76,175,80,1)",
    },
  };
}

const WrapParent = styled.div`
  height: ${(props) => props.height - 201 + "px"};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const InnerWrapper = styled.div`
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  li {
    width: 100%;
  }
`;
const MainSection = styled.aside`
  background: #f9f9fb;
  width: 238px;
  border-top: 1px solid #efefef;
  position: fixed;
  z-index: 100;
  top: 70px;
  left: 0;
  transition: all 0.2s ease-in-out;
  min-height: ${(props) => props.height - 60 + "px"};

  overflow-y: scroll;
  overscroll-behavior-y: contain;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex !important;
  flex-direction: column;
  justify-content: space-between;
  &::-webkit-scrollbar {
    display: none;
  }
  &.mini-sidebar .submenuIcon {
    display: block;
  }
  @media only screen and (max-width: 1100px) {
    top: 60px;
    min-height: ${(props) => props.height - 50 + "px"};
  }
  a:focus {
    text-decoration: none;
  }
  @media all and (max-width: 440px) {
    top: 67px;
    min-height: ${(props) => props.height - 142 + "px"};
  }
`;
const ExploreLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ExploreText = styled.span`
  font-family: "gordita_medium";
  color: #fff !important;
  margin-right: 12px;
`;
const ExploreIcon = styled.img`
  width: 15px;
`;
const SocialWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SocialLink = styled.a`
  width: 36px;
  height: 36px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  &:last-child {
    margin-right: 0;
  }
`;
const SocialIcon = styled.img`
  display: block;
  width: 17px;
`;
const RippleButton = styled(MyRipple)`
  display: flex !important;
  justify-content: flex-start;
  position: relative;

  &.learn {
    display: block !important;
  }

  &.learn-active {
    max-height: 328px;
    height: 328px;
    transition: all 0.4s ease 0s;
  }

  &.learn-ripple {
    transition: all 0.4s ease 0s;
    max-height: 48px;
    height: 48px;
  }
`;
const BetaIcon = styled.img`
  /* display: block;
    margin-left: auto;
    width: 12px;
    max-height: 12px;
    transition: all 0.4s ease 0s;
    transform: rotate(90deg); */
  position: absolute;
  @media (max-width: 1100px) {
    left: 124px;
  }
  left: 146px;
  @media (max-width: 480px) {
    left: 172px;
  }
`;
const ArrowIcon = styled.img`
  display: block;
  margin-left: auto;
  width: 12px;
  max-height: 12px;
  transition: all 0.4s ease 0s;
  transform: rotate(90deg);
  @media (max-width: 480px) {
    width: 10px;
  }

  &.arrow-active {
    transform: rotate(-90deg);
  }
`;
const MenuItemIcon = styled.img`
  display: block;
  width: 24px;
  max-height: 24px;
  margin-bottom: 4px;
  @media (max-width: 480px) {
    width: 14px;
  }
`;
const SubMenuItemIcon = styled.img`
  display: none;
  width: 20px;
  max-height: 20px;
  margin-left: -35px;
  margin-right: 18px;
  margin-bottom: 4px;

  @media (max-width: 480px) {
    width: 14px;
  }
`;
const Social = styled.ul`
  position: absolute;
  bottom: 10px;
  margin: 0 !important;
`;
const Overlay = styled.div`
  display: none;
  @media only screen and (max-width: 1100px) {
    display: ${(props) => props.show === "show" && "block"};
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 98;
  }
`;
const ReferMainContainer = styled.div`
  /* @media (max-width: 480px) {
        display: none;
    } */
`;
const ReferContainer = styled(Link)`
  background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/merchandise/referback.png");
  background-size: cover;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  box-shadow: 0px 3px 9px #00000029;
  padding-bottom: 8px;
  margin-top: 50px;
  @media all and (max-width: 1100px) {
    // margin-bottom: 160px;
    margin-top: 15px;
    margin-left: 0px;
    margin-right: 0px;
  }
`;
const ReferImageContainer = styled.div`
  width: 136px;
  position: absolute;
  top: -15px;
`;
const ReferImage = styled.img`
  display: block;
  width: 100%;
`;
const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0fa76f;
  box-shadow: 0px 3px 9px #00000029;
  border-radius: 5px;
  margin-top: 91px;
  padding: 5px;
  height: 30px;
  max-height: 30px;
  width: 86%;
  color: #fff;
  font-size: 13px;
  font-family: "gordita_medium";
  overflow: hidden;
`;
const ReferIconSpan = styled.span`
  margin-right: 8px;
  width: 20px;
`;
const ReferIcon = styled.img`
  display: block;
  width: 100%;
`;
const LearnDiv = styled.div`
  cursor: pointer;
  span {
    font-family: "gordita_medium";
    font-size: 14px;
    color: #333;
    margin-left: 14px;
  }
`;
const LearnUl = styled.div`
  margin-top: 10px;
  transition: all 0.4s ease 0s;
  transform: translate(-500px);

  &.learn-active {
    transform: translate(0);
    transition: all 0.4s ease 0s;
  }
`;
const LearnList = styled(NavLink)`
  display: flex;
  padding: 15px 10px 15px 58px;
  position: relative;

  &.active {
    background-color: #fff;
  }

  &.active:before {
    position: absolute;
    content: " ";
    left: 0;
    top: 0;
    height: 100%;
    width: 5px;
    background: #56c081;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
  }

  &.active span {
    color: #5dc66a !important;
  }

  & span {
    font-family: "gordita_medium";
    font-size: 14px;
    color: #333;
    margin-left: 1.125rem;
  }
`;
const LearnHead = styled.div`
  display: flex;
  align-items: center;
`;

export default connect(mapStatetoProps, mapDispatchtoProps)(Sidebar);
