import React from "react";
import TalropEdtechHelmet from "../../helpers/TalropEdtechHelmet";
import { connect } from "react-redux";

function mapStateToProps(state) {
    return {
        divMainClass: state.divMainClass,
    };
}

class Error404 extends React.PureComponent {
    render() {
        return (
            <React.Fragment>
                <TalropEdtechHelmet title="page not found" />
                <section id="main" className={this.props.divMainClass}>
                    <h1>Page Not Found</h1>
                </section>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(Error404);
