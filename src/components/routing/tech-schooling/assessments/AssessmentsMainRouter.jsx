import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { PrivateRoute } from "../../PrivateRoute";

const TechSchoolingAssessments = lazy(() =>
  import(
    "../../../learn/screens/techschooling/assessments/TechSchoolingAssessments"
  )
);
const AllAssessments = lazy(() =>
  import("../../../learn/screens/techschooling/assessments/AllAssessments")
);

export default function AssessmentsMainRouter({ subject_slug }) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<TechSchoolingAssessments subject_slug={subject_slug} />}
        />
      </Routes>
    </>
  );
}

const Container = styled.div`
  padding: 25px 0;
`;
