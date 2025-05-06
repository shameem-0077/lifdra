import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "../../routing/PrivateRoute";

import Error404 from "../../general/pages/Error404";
import RouteLoading from "../../../general/conponents/RouteLoading";

import MyProfileRouter from "./MyProfileRouter";

const ReferAndEarn = lazy(() =>
    import("../../learn/screens/profile/ReferAndEarn")
);
const Notification = lazy(() =>
    import("../../notifications/pages/Notification")
);

const ProfileRouter = () => {
    return (
        <>
            <Suspense fallback={<RouteLoading />}>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/profile/refer/:param/"
                        component={ReferAndEarn}
                    />
                    <PrivateRoute
                        exact
                        path="/profile/notifications/"
                        component={Notification}
                    />
                    <PrivateRoute
                        exact
                        path="/profile/*"
                        component={MyProfileRouter}
                    />

                    <Route component={Error404} />
                </Switch>
            </Suspense>
        </>
    );
};

export default ProfileRouter;
