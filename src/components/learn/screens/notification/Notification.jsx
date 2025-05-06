import React from "react";
import TopBanner from "../../includes/general/TopBanner";
import colors from "../../../../Colors";
import CoinEmptyCard from "../../includes/claims/ClaimEmptyCard";
import { connect } from "react-redux";
import styled from "styled-components";
import TalropEdtechHelmet from "../../../helpers/TalropEdtechHelmet";
import NotificationCard from "../../includes/notification/NotificationCard";
import { getTimeStrFromDate, getDateStr } from "../../../helpers/functions";
import { serverConfig } from "../../../../axiosConfig";
import BasicLoading from "../../includes/general/BasicLoading";

function mapStateToProps(state) {
	return {
		divMainClass: state.divMainClass,
		user_data: state.user_data,
	};
}

class Notification extends React.PureComponent {
	state = {
		notifications: [],
		isLoading: true,
	};

	componentDidMount() {
		this.fetchNotifications();
	}

	fetchNotifications = () => {
		let { user_data } = this.props;
		let { access_token } = user_data;

		serverConfig
			.get("main/user-notifications/", {
				headers: { Authorization: `Bearer ${access_token}` },
			})
			.then((response) => {
				const { status_code, data } = response.data;

				if (status_code === 6000) {
					this.setState({
						notifications: data,
						isLoading: false,
					});
				}
				this.setState({
					isLoading: false,
				});
			})
			.catch((error) => {
				this.setState({
					isLoading: false,
				});
			});
	};

	renderPage() {
		let { notifications, isLoading } = this.state;
		if (notifications.length !== 0) {
			return notifications.map((notification) => (
				<NotificationCard
					key={notification.id}
					title={notification.message_category}
					description={notification.message}
					date={`${getTimeStrFromDate(notification.date_added)}, ${getDateStr(notification.date_added)}`}
					toggleNotificationModal={this.props.toggleNotificationModal}
				/>
			));
		} else {
			return isLoading ? null : (
				<div className="no-notifications-container" style={this.styles.no_notificatons_container}>
					<CoinEmptyCard
						// link="/tech-schooling/"
						link="/feed/"
						title="There are no notifications"
						description="You have successfully enrolled to the exclusive course to get ready for industry 4.0"
						button_content="Go to dashboard"
						container_width="45%"
						container_padding="20px"
						container_margin="65px 0 0"
					/>
				</div>
			);
		}
	}

	render() {
		let { isLoading } = this.state;
		return (
			<React.Fragment>
				<TalropEdtechHelmet title="Notifications" />
				<MainContainer>
					<BasicLoading show={isLoading} />
					<div className="grid-one">
						<TopBanner
							color={colors.lightBlue500}
							bgColor={colors.lightBlue500_10}
							title="Notifications"
							description="We care about you! Relevant information about your activities and messages will be notified here."
							image="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/top-banner.png"
						/>
					</div>
					<Container>{this.renderPage()}</Container>
				</MainContainer>
			</React.Fragment>
		);
	}

	styles = {
		button: {
			marginBottom: "25px",
		},
		no_notificatons_container: {
			textAlign: "-webkit-center",
		},
	};
}
const MainContainer = styled.div`
	padding: 13px 0;
	width: 100%;
	overflow-y: scroll;
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
	&::-webkit-scrollbar {
		display: none;
	}
`;

const Container = styled.div`
	margin: 20px 0;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 1em;
	@media only screen and (max-width: 1280px) {
		grid-template-columns: repeat(3, 1fr);
	}
	@media only screen and (max-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media only screen and (max-width: 480px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

export default connect(mapStateToProps)(Notification);
