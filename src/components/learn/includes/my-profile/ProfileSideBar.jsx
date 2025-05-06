import React, { Component } from "react";
import colors from "../../../../Colors";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Jdenticon from "react-jdenticon";
import { serverConfig } from "../../../../axiosConfig";
import { db } from "../../../../firebase";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";

function mapStatetoProps(state) {
  return {
    profile_menu_right: state.profile_menu_right,
    user_profile: state.user_profile,
    isUserDataLoading: state.isUserDataLoading,
    user_data: state.user_data,
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    toggleProfile: () =>
      dispatch({
        type: "TOGGLE_PROFILE_MENU",
      }),
    updateUserProfile: (user_profile) =>
      dispatch({
        type: "UPDATE_USER_PROFILE",
        user_profile: user_profile,
      }),
    userProfileLoader: () =>
      dispatch({
        type: "TOGGLE_PROFILE_LOADING",
      }),
  };
}

var day = new Date();

class ProfileSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      selectedMonth: day.getMonth(),
      startDate: new Date(
        "Sat Jan 1 2020 00:00:00 GMT+0530 (India Standard Time)"
      ),
      isLogoutRedirect: false,
      user_profile: {},
      //   gum: "scroll"
    };
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleClickOutside);
    document.addEventListener("touchend", this.handleClickOutside);
    let menu_right = null;
    let menu_width = null;
    if (window.innerWidth <= 980) {
      menu_right = "-37%";
      menu_width = "37%";
    } else if (window.innerWidth <= 1280) {
      menu_right = "-28%";
      menu_width = "28%";
    } else if (window.innerWidth <= 1366) {
      menu_right = "-27%";
      menu_width = "27%";
    } else if (window.innerWidth <= 1440) {
      menu_right = "-25%";
      menu_width = "25%";
    } else {
      menu_right = "-28%";
      menu_width = "28%";
    }
    this.setState({ menu_right: menu_right, menu_width: menu_width });

    const userProfile = this.props?.user_profile || {};
    if (Object.keys(userProfile).length === 0) {
      this.fetchUserProfileData();
    }
  }
  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleScrollTop = () => {
    var myDiv = document.getElementById("scroll");
    myDiv.scrollTop = 0;
  };

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleClickOutside);
    document.removeEventListener("touchend", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.props.profile_menu_right === 0)
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        this.props.toggleProfile();
        this.handleScrollTop();
      }
  };

  onChange = (date) => {
    this.setState({ date, selectedMonth: date.getMonth() });
  };

  renderSlideBarPlaceholder = () => {
    const userProfile = this.props?.user_profile || {};
    const { user_id = '', name = '', phone = '', total_coins = 0 } = userProfile;
    
    return (
      <div>
        <h4 style={this.styles.userIdColor}># {user_id}</h4>
        <h3 className="g-medium" style={this.styles.name}>
          {name}
        </h3>
        <PhoneContainer className="phone">
          <span className="las la-phone" style={this.styles.phoneIcon}></span>
          <small
            style={{
              fontFamily: "gordita_medium",
              fontSize: "13px",
            }}
          >
            {phone}
          </small>
        </PhoneContainer>
        <Link
          to="/coins/"
          onClick={() => {
            this.props.toggleProfile();
          }}
          className="coin"
          style={this.styles.coinContainer}
        >
          <span className="icon" style={this.styles.coinIcon}>
            <img
              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/talrop-coin.svg"
              alt=""
              style={this.styles.coinImage}
            />
          </span>
          <Coin>{total_coins} coins</Coin>
        </Link>
      </div>
    );
  };

  //For fetching profile details
  fetchUserProfileData = () => {
    let { user_data } = this.props;
    if (user_data) {
      let { access_token } = user_data;
      if (access_token) {
        serverConfig
          .get("/api/v1/users/profile/", {
            params: { response_type: "minimal" },
            headers: { Authorization: `Bearer ${access_token}` },
          })
          .then((response) => {
            const { status_code, data } = response.data;
            if (status_code === 6000) {
              this.props.updateUserProfile(data);
              //this.props.userProfileLoader();
            } else {
            }
          })
          .catch((error) => {});
      }
    }
  };

  renderPhoto = () => {
    const userProfile = this.props?.user_profile || {};
    const { name = '', photo = '' } = userProfile;
    
    if (photo) {
      return (
        <ImageContainer className="imageContainer">
          <img src={photo} alt="" style={this.styles.profileImage} />
        </ImageContainer>
      );
    } else {
      return (
        <ImageContainer className="imageContainer">
          <Jdenticon size="150" value={name || "Name"} />
        </ImageContainer>
      );
    }
  };

  onChange = (date) => {
    this.setState({ date, selectedMonth: date.getMonth() });
  };

  removeChatUser = async (user_data) => {
    if (user_data?.uid) {
      const docRef = doc(db, "users", user_data.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        updateDoc(doc(db, "users", user_data.uid), {
          isOnline: false,
          lastActiveTime: Timestamp.fromDate(new Date()),
          activeDeviceToken: null,
        });
      }
    }
    localStorage.clear();
    window.location.href = "/";
  };

  onLogout = (user_data) => {
    serverConfig
      .post(
        "/authentication/logout/",
        {},
        {
          headers: {
            Authorization: `Bearer ${user_data?.access_token}`,
          },
        }
      )
      .then((response) => {
        const { status_code, data } = response.data;

        if (status_code === 6000) {
          // Handle successful logout
          this.removeChatUser(user_data);
        } else {
          // Handle error during logout
        }
      })
      .catch((error) => {
        // Handle network error or other exceptions
      });
  };

  // const accessClearing = () => {
  //   let { access_token } = this.props.user_data;

  // };

  render() {
    let { profile_menu_right } = this.props;

    return (
      <>
        <Overlay profile_menu_right={profile_menu_right} />
        <Container
          ref={this.setWrapperRef}
          right={profile_menu_right}
          id="scroll"
        >
          <div className="top" style={this.styles.topContainer}>
            <Link
              onClick={() => {
                this.props.toggleProfile();
              }}
              to={"/profile/"}
            >
              <SettingsContainer className="left">
                <Settings>Settings</Settings>
                <span
                  className="las la-cog"
                  style={this.styles.settingsIcon}
                ></span>
              </SettingsContainer>
            </Link>
            <SettingsContainer
              className="right"
              onClick={() => this.onLogout(this.props.user_data)}
            >
              <Settings>Logout</Settings>
              <span
                className="las la-sign-out-alt"
                style={this.styles.settingsIcon}
              ></span>
            </SettingsContainer>
          </div>
          <div className="profilePhoto" style={this.styles.profileContainer}>
            {this.renderPhoto()}
            {/* <StarContainer className="starContainer">
                            <small>{star} </small>{" "}
                            <span className="las la-star"></span>
                        </StarContainer> */}
          </div>
          <div className="data" style={this.styles.dataContainer}>
            {this.renderSlideBarPlaceholder()}

            <Link
              onClick={() => {
                this.props.toggleProfile();
              }}
              to="/feed/profile"
            >
              {" "}
              <ProfileButton>View my profile</ProfileButton>
            </Link>
          </div>
          {/* <div
                    className="designaiton"
                    style={this.styles.designationContainer}
                >
                    <div className="left">
                        <IdNumber className="id">#1</IdNumber>
                    </div>
                    // Designtion Progress bar
                    <Designation className="center">
                        <h3>UI Engineer</h3>
                        <small style={this.styles.designationType}>
                            High intermediate
                        </small>
                    </Designation>
                    <div className="right" style={this.styles.right}>
                        <ProfileProgressBar
                            result={5}
                            total={10}
                            barColor="#4d7afa"
                        />
                    </div>
                </div> */}
          {/* <div className="calendar">
                        <Calendar
                            onChange={this.onChange}
                            value={this.state.date}
                            className="calendar-container"
                            tileClassName="calendar-tile"
                            minDetail="month"
                            minDate={this.state.startDate}
                            tileContent={({ date, view }) => {
                                let dates = [
                                    new Date(
                                        "Sat Feb 1 2020 00:00:00 GMT+0530 (India Standard Time)"
                                    ),
                                    new Date(
                                        "Sat Feb 2 2020 00:00:00 GMT+0530 (India Standard Time)"
                                    ),
                                ];
                                var today = new Date();
                                let flag = false;
                                today.setHours(0, 0, 0, 0);
                                dates.forEach((item) => {
                                    if (
                                        item.getDate() === date.getDate() &&
                                        item.getMonth() === date.getMonth() &&
                                        item.getYear() === date.getYear()
                                    ) {
                                        flag = true;
                                    }
                                });
                                if (
                                    date.getMonth() === this.state.selectedMonth
                                ) {
                                    if (flag) {
                                        return (
                                            <span className="active">
                                                {date.getDate()}
                                            </span>
                                        );
                                    } else if (date > today) {
                                        return <span>{date.getDate()}</span>;
                                    } else if (
                                        date.getDate() === today.getDate() &&
                                        date.getMonth() === today.getMonth() &&
                                        date.getYear() === today.getYear()
                                    ) {
                                        return (
                                            <span className="today active">
                                                {date.getDate()}
                                            </span>f
                                        );
                                    } else {
                                        return (
                                            <span className="inactive">
                                                {date.getDate()}
                                            </span>
                                        );
                                    }
                                } else {
                                    return <span>{date.getDate()}</span>;
                                }
                            }}
                        />
                    </div> */}
        </Container>
      </>
    );
  }

  styles = {
    topContainer: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "20px",
    },
    settingsIcon: {
      marginLeft: "10px",
      color: colors.lightGrey,
    },
    profileContainer: {
      margin: "30px 0",
    },
    profileImage: {
      width: "100%",
      borderRadius: "50%",
    },
    dataContainer: {
      textAlign: "center",
      marginBottom: "30px",
    },
    phoneIcon: {
      marginRight: "10px",
      fontSize: "20px",
    },
    coinContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    coinIcon: {
      width: "20px",
      display: "inline-flex",
      marginRight: "15px",
    },
    coinImage: {
      width: "100%",
    },
    designationContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItem: "center",
      padding: "50px 0",
    },
    designationType: {
      color: "grey",
      marginTop: "10px",
      display: "inline-block",
    },
    tabCount: {
      display: "block",
      textAlign: "right",
      color: colors.blue,
    },
    tabBar: {
      padding: "3px 35px",
      backgroundColor: colors.lightBlue,
      borderRadius: "100px",
      display: "inline-block",
    },
    right: {
      width: "40%",
    },
    userIdColor: {
      color: "#0FA76F",
      fontFamily: "gordita_medium",
    },
  };
}

const Container = styled.div`
  padding: 100px 30px;
  background: #f8f8f8;
  width: 400px;
  position: fixed;
  top: 0;
  right: ${(props) => props.right};
  z-index: 500;
  transition: 0.6s;
  height: 100vh;
  overflow-y: scroll;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  @media only screen and (max-width: 480px) {
    width: 320px;
    padding: 100px 10px;
  }
  @media only screen and (max-width: 360px) {
    width: 300px;
    padding: 100px 5px;
  }
  @media only screen and (max-width: 340px) {
    width: 280px;
    padding: 100px 5px;
  }
`;
const Settings = styled.small`
  color: #000;
  font-family: "gordita_medium";
  font-size: 14px;
  &:hover {
    color: #0399f4;
  }
  @media only screen and (max-width: 1450px) {
    font-size: 14px;
  }
`;
const ProfileButton = styled.small`
  /* background-color: rgb(139, 195, 74); */
  border-radius: 6px;
  background: linear-gradient(127deg, #0fa76f -9.18%, #0f9ea7 129.96%);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  &:hover {
    /* background-color: #0399f4; */
    transition: 2s;
  }
  display: inline-block;
  padding: 10px 20px;
  color: rgb(255, 255, 255);
  background-color: rgb(139, 195, 74);
  border-radius: 10px;
  margin-top: 15px;
  font-family: "gordita_medium";
  font-size: 15px;
`;
const PhoneContainer = styled.div`
  margin: 10px 0;
  font-size: 20px;
  color: ${colors.grey};
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1450px) {
    font-size: 18px;
  }
`;
const Coin = styled.small`
  font-size: 22px;
  font-family: "baloo_paaji_2semibold";
  @media only screen and (max-width: 1450px) {
    font-size: 20px;
  }
`;
const SettingsContainer = styled.div`
  font-family: "baloo_paaji_2semibold";
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 auto;
  position: relative;
  border: 1px solid ${colors.lightGrey};
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  @media all and (max-width: 980px) {
    width: 130px;
    height: 130px;
  }
  @media all and (max-width: 420px) {
    width: 110px;
    height: 110px;
  }
`;
const Overlay = styled.div`
  display: none;
  @media only screen and (max-width: 640px) {
    display: ${(props) => props.profile_menu_right === 0 && "block"};
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    height: calc(100vh - 3.2rem);
    z-index: 98;
  }
`;

export default connect(mapStatetoProps, mapDispatchtoProps)(ProfileSideBar);
