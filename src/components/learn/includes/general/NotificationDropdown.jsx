import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { getDateStr, getTimeStrFromDate } from "../../../helpers/functions";
import AOS from "aos";
import "aos/dist/aos.css";
import NotificationCard from "../notification/NotificationCard";
import { Link, useNavigate, useLocation } from "react-router-dom";
import auth from "../../../routing/auth";

const NotificationDropdown = (props) => {
    const ref = useRef(null);
    useEffect(() => {
        props.setNotifModalRef(ref);
    }, [ref]);
    const styles = {
        sub_container: {
            marginBottom: "15px",
        },
        empty_container: {
            textAlign: "center",
        },
        empty_image: {
            width: "80px",
            display: "block",
            margin: "0 auto",
        },
        empty_title: {
            fontSize: "20px",
            fontWeight: 700,
            marginTop: "20px",
            color: "#4B535C",
            textAlign: "center",
        },
        empty_text: {
            fontSize: "14px",
            color: "#959595",
            textAlign: "center",
        },
    };

    useEffect(() => {
        AOS.init({
            duration: 400,
        });
    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const renderNotifcations = () => {
        let { notifications } = props;
        if (auth.isAuthenticated()) {
            if (notifications.length > 0) {
                return notifications.map((notification) => (
                    <NotificationCard
                        key={notification.id}
                        title={notification.message_category}
                        description={notification.message}
                        date={`${getTimeStrFromDate(
                            notification.date_added
                        )}, ${getDateStr(notification.date_added)}`}
                        toggleNotificationModal={props.toggleNotificationModal}
                    />
                ));
            } else {
                return (
                    <div className="empty" style={styles.empty_container}>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/social-media.svg"
                            alt="Notification"
                            style={styles.empty_image}
                        />
                        <h3 style={styles.empty_title}>No new notifications</h3>
                        <p style={styles.empty_text}>
                            Currently you have no new notification to display
                        </p>
                    </div>
                );
            }
        } else {
            return (
                <div className="empty" style={styles.empty_container}>
                    <img
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/social-media.svg"
                        alt="Notification"
                        style={styles.empty_image}
                    />
                    <h3 style={styles.empty_title}>No new notifications</h3>
                    <p style={styles.empty_text}>
                        Currently you have no new notification to display
                    </p>
                    <LoginButton
                        onClick={() =>
                            navigate(`${location.pathname}?action=login`)
                        }
                    >
                        Login to view your notifications
                        <i class="las la-arrow-right"></i>
                    </LoginButton>
                </div>
            );
        }
    };

    let { notifications_count } = props;

    return !props.isNotificationModalVisible ? null : (
        <Container
            data-aos="fade-down"
            ref={ref}
            className="container"
            notifications_count={notifications_count}
        >
            {renderNotifcations()}
            {notifications_count > 3 && (
                <div style={styles.button}>
                    <Button
                        to="/profile/notifications/"
                        onClick={props.toggleNotificationModal}
                    >
                        View all
                    </Button>
                </div>
            )}
        </Container>
    );
};

const LoginButton = styled.span`
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    margin: 0 auto;
    background: #57c081;
    color: #fff;
    padding: 3px 16px;
    border-radius: 4px;
    margin-top: 10px;
    font-size: 16px;
    i {
        margin-left: 5px;
    }
`;
const Container = styled.div`
    padding: 20px;
    background: ${(props) =>
        props.notifications_count > 0 ? "#f8f3f7" : "#fff"};
    width: 450px;
    position: absolute;
    top: 50px;
    right: 50px;
    z-index: 500;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
    max-height: 400px;
    overflow-y: scroll;
    @media only screen and (max-width: 640px) {
        padding: 10px;
        top: 40px;
        right: 20px;
    }
    @media only screen and (max-width: 480px) {
        padding: 10px;
        top: 45px;
        right: 0;
        width: 100%;
    }
`;
const Button = styled(Link)`
    padding: 15px;
    width: 100%;
    color: rgb(255, 255, 255);
    text-align: center;
    font-size: 15px;
    font-family: "baloo_paaji_2semibold";
    background-color: rgb(63, 191, 129);
    border-radius: 10px;
    display: inline-block;
    cursor: pointer;
`;

export default NotificationDropdown;
