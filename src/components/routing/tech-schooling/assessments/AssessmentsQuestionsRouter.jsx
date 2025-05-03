import React, { lazy, Suspense } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";

import styled from "styled-components";
import Aside from "../../../learn/includes/techschooling/assessments/Aside";
import RouteLoading from "../../RouteLoading";

const ObjectiveQuestions = lazy(() =>
    import(
        "../../../learn/screens/techschooling/assessments/inner-pages/ObjectiveQuestions"
    )
);
const DescriptiveQuestions = lazy(() =>
    import(
        "../../../learn/screens/techschooling/assessments/inner-pages/DescriptiveQuestions"
    )
);
const Challengequestions = lazy(() =>
    import(
        "../../../learn/screens/techschooling/assessments/inner-pages/Challengequestions"
    )
);

export default function AssessmentsQuestionsRouter({ subject_slug }) {
    const location = useLocation();

    return (
        <>
            <BottomContainer>
                <Aside subject_slug={subject_slug} />
                <Suspense fallback={<RouteLoading />}>
                    <Routes>
                        <Route
                            path="/questions"
                            element={
                                <Navigate
                                    to={`${location.pathname}descriptives/`}
                                    replace
                                />
                            }
                        />
                        <Route
                            path="/questions/descriptives"
                            element={<DescriptiveQuestions />}
                        />
                        <Route
                            path="/questions/objectives"
                            element={<ObjectiveQuestions />}
                        />
                        <Route
                            path="/questions/challenge"
                            element={<Challengequestions />}
                        />
                    </Routes>
                </Suspense>
            </BottomContainer>
        </>
    );
}

const BottomContainer = styled.div`
    display: flex;
    padding: 29px 10px;
    @media all and (max-width: 768px) {
        flex-wrap: wrap;
        padding: 4px;
    }
`;
