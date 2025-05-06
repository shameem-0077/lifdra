import React from "react";
import { Helmet } from "react-helmet";

const TalropEdtechHelmet = ({ title }) => {
    if (title) {
        return (
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`${title}`} | Steyp</title>
                <meta
                    id="og-title"
                    property="og:title"
                    content={`${title} | Steyp`}
                />
            </Helmet>
        );
    } else {
        return (
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    Steyp | An EdTech company for students to become skilled
                    engineers & future scientists, an initiative from Talrop.
                </title>
                <meta
                    id="og-title"
                    property="og:title"
                    content="Steyp is an EdTech company for students to become skilled engineers & future scientists, an initiative from Talrop."
                />
            </Helmet>
        );
    }
};

export default TalropEdtechHelmet;
