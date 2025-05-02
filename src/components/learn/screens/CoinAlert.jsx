import React, { Component } from "react";
import TalropEdtechHelmet from "../../helpers/TalropEdtechHelmet";
import TopBanner from "../includes/general/TopBanner";
import colors from "../../../Colors";
import CoinAlertCard from "../includes/general/CoinAlertCard";
import { connect } from "react-redux";
import styled from "styled-components";

function mapStateToProps(state) {
    return {
        divMainClass: state.divMainClass,
        user_profile: state.user_profile,
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

class CoinAlert extends Component {
    constructor(props) {
        super(props);
        this.props.updateActiveMenu("practices");
        this.state = {
            next_activity_type: "topic",
        };
    }
    render() {
        return (
            <React.Fragment>
                <div id="main" className={this.props.divMainClass}>
                    <TalropEdtechHelmet title="Coin Alert" />
                    <section>
                        <div className="grid-one">
                            <TopBanner
                                color={colors.lightBlue500}
                                bgColor={colors.lightBlue500_10}
                                title="Ooops! It seems you ran out of coins"
                                description="Purchse coins to continue"
                                image="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/top-banner.png"
                            />
                        </div>
                        <Container>
                            <CoinAlertCard />
                        </Container>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}
const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2em;
    margin-top: 30px !important;
    @media only screen and (max-width: 780px) {
        grid-template-columns: unset;
    }
`;

export default connect(mapStateToProps, mapDispatchtoProps)(CoinAlert);
