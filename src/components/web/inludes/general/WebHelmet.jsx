import React from "react";
import { Helmet } from "react-helmet";

const WebHelmet = (props) => {
    if (props.title) {
        return (
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`${props.title}`}</title>
            </Helmet>
        );
    } else {
        return (
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    Steyp | An EdTech company, a beginning of the Digital University for Industry
                    4.0.S
                </title>
            </Helmet>
        );
    }
};

export default WebHelmet;
