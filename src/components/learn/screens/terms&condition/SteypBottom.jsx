import React from "react";
import Footer from "./SteypFooter";

export default class Bottom extends React.PureComponent {
    render() {
        return (
            <div style={this.styles.container}>
                <Footer isTos={this.props.isTos} />
            </div>
        );
    }
    styles = {
        container: {
            padding: window.innerWidth > 580 ? "62px 0" : "62px 0 6px",
        },
    };
}
