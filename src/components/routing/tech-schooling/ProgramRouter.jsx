import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import "../../../assets/css/Style.css";
import RouteLoading from "../RouteLoading";
import queryString from "query-string";
import PracticeStore from "../../contexts/stores/PracticeStore";
import AssessmentStore from "../../contexts/stores/AssessmentStore";
import SupportModal from "../../learn/includes/premium-assist/SupportModal";
// import { learnConfig } from "../../../axiosConfig";
// import { SupportEngineerContext } from "../../contexts/stores/SupportEngineerStore";
import { SubscriptionPrivateRoute } from "../SubscriptionPrivateRoute";
import SubscribeModal from "../../learn/includes/techschooling/subscribe/SubscribeModal";
import Sidebar from "../../learn/includes/general/Sidebar";

const Error404 = lazy(() => import("../../error-pages/Error404"));
const TestimonialsPage = lazy(() =>
  import("../../learn/screens/techschooling/TestimonialsPage")
);
const ProgramInnerRouter = lazy(() => import("./ProgramInnerRouter"));
const AssessmentsInnerRouter = lazy(() =>
  import("./assessments/AssessmentsInnerRouter")
);
const PracticesInnerRouter = lazy(() =>
  import("./practices/PracticesInnerRouter")
);
const PremiumAssistRouter = lazy(() => import("../learn/PremiumAssistRouter"));

function mapStateToProps(state) {
  return {
    divMainClass: state.divMainClass,
  };
}

function ProgramRouter(props) {
  // User data present in redux
  const user_data = useSelector((state) => state.user_data);
  const dispatch = useDispatch();

  const { slug } = useParams();
  console.log(useParams());
  

  console.log('certificate slug==============', slug);


  const updateUserData = (user_data) => {
    dispatch({
      type: "UPDATE_USER_DATA",
      user_data: user_data,
    });
  };

  useEffect(() => {
    dispatch({ type: "ACTIVE_MENU", active_menu: ":slug" });
  }, []);

  const [action, setAction] = useState("");
  const navigate = useNavigate();

  const closeModal = () => {
    setAction("");
    navigate(props.location.pathname);
  };

  useEffect(() => {
    let { location } = props;
    let { search } = location;

    const values = queryString.parse(search);
    const action = values.action;
    setAction(action);
  }, [props.location.search]);

  return (
    <div id="main" className={props.divMainClass}>
      {action === "subscribe" && (
        <SubscribeModal
          user_data={user_data}
          updateUserData={updateUserData}
          closeModal={closeModal}
        />
      )}
      <Sidebar slug={slug} />
      <SupportModal />
      <Suspense fallback={<RouteLoading />}>
        <Routes>
          <Route path="/testimonials/" element={<TestimonialsPage />} />
          <Route
            path="/assessments/view/:id/"
            element={
              <SubscriptionPrivateRoute>
                <AssessmentStore>
                  <AssessmentsInnerRouter subject_slug={slug} />
                </AssessmentStore>
              </SubscriptionPrivateRoute>
            }
          />
          <Route
            path="/practices/view/:id/"
            element={
              <SubscriptionPrivateRoute>
                <PracticeStore>
                  <PracticesInnerRouter subject_slug={slug} />
                </PracticeStore>
              </SubscriptionPrivateRoute>
            }
          />
          <Route path="/" element={<ProgramInnerRouter program_slug={slug} />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default connect(mapStateToProps)(ProgramRouter);
