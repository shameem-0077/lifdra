import React from "react";
import { Helmet } from "react-helmet";

const TalropTechSchoolingHelmet = ({ title }) => {
    if (title) {
        return (
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`${title}`} | Steyp's Tech Schooling</title>
                <meta id="og-title" property="og:title" content={`${title} | Steyp EdTech`} />
            </Helmet>
        );
    } else {
        return (
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    Steyp | An EdTech company, a beginning of the Digital University for Industry
                    4.0.
                </title>
                <meta
                    id="og-title"
                    property="og:title"
                    content="Steyp | An EdTech company, a beginning of the Digital University for Industry 4.0."
                />
            </Helmet>
        );
    }
};

export default TalropTechSchoolingHelmet;
