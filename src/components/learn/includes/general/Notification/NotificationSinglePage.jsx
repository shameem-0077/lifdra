import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import TechUpdatesNavBar from "../../../screens/tech-updates/TechUpdatesNavBar";
import NotificationNavBar from "./NotificationNavBar";
import NotificationCard from "./NotificationCard";
import { useSelector } from "react-redux";
import { serverConfig } from "../../../../../axiosConfig";
import Nodata from "./Nodata";
import NotificationSkeleton from "./NotificationSkeleton";
import useInfiniteScroll from "./component/useInfiniteScroll";
import TalropEdtechHelmet from "../../../../helpers/TalropEdtechHelmet";

const NotificationSinglePage = () => {
  const [notificationData, setNotificationData] = useState([]);
  const [pageNationData, setPageNationData] = useState([]);
  const [page, setPage] = useState();
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const fetchNotificationRef = useRef();
  const {
    user_data: { access_token },
  } = useSelector((state) => state);

  const fetchNotification = useCallback(async (loadMore = false) => {
    if (page === 1) {
      setInitialLoading(true);
    } else {
      setLoading(true);
    }
    try {
      const response = await notificationsConfig.get(
        `/main/list-notifications/`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            per_page: 15,
            page: loadMore ? page + 1 : 1,
            notification_type: activeTab ? activeTab : "all",
          },
        }
      );

      const { status_code, data, pagination_data } = response.data;

      if (status_code === 6000) {
        setNotificationData((prevData) =>
          loadMore ? [...prevData, ...data] : data
        );
        setPageNationData(pagination_data);
        setPage((prev) => (loadMore ? prev + 1 : 1));
        setTimeout(() => setLoading(false), 500);
        setTimeout(() => setInitialLoading(false), 500);
      } else {
        setNotificationData([]);
        setInitialLoading(false);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finally");
      setInitialLoading(false);
    }
  });

  useEffect(() => {
    fetchNotification();
  }, [activeTab]);

  useInfiniteScroll(fetchNotificationRef, isLoading, pageNationData, () =>
    fetchNotification(true)
  );
  return (
    <>
      <TalropEdtechHelmet title="Notifications" />
      
      <MainContainer>
        <Container>
          <ContentContainer>
            <Heading>Notifications</Heading>
            <NotificationNavBar
              setActiveTab={setActiveTab}
              activeTab={activeTab}
              setNotificationData={setNotificationData}
            />
          </ContentContainer>
        </Container>
        <ContentContainerBox ref={fetchNotificationRef}>
          {notificationData?.length === 0 && !isLoading && !initialLoading && (
            <>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Nodata activeTab={activeTab} />
              </div>
            </>
          )}
          <div style={{ maxWidth: "948px", paddingTop: "2px" }}>
            {initialLoading ? (
              <>
                {[...Array(14)].map((_, index) => (
                  <NotificationSkeleton key={index} />
                ))}
              </>
            ) : (
              <>
                {notificationData && (
                  <>
                    {notificationData?.map((items, intex) => (
                      <NotificationCard key={intex} data={items} />
                    ))}
                  </>
                )}
              </>
            )}
            {isLoading && (
              <>
                {[...Array(3)].map((_, index) => (
                  <NotificationSkeleton key={index} />
                ))}
              </>
            )}
          </div>
        </ContentContainerBox>
      </MainContainer>
    </>
  );
};

export default NotificationSinglePage;

const MainContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1440px;
  margin-top: 83px;
  padding: 20px 48px 48px;
  @media all and (max-width: 1100px) {
    padding: 20px 16px 20px;
  }
  @media all and (max-width: 768px) {
    margin-top: 68px;
    padding: 20px 6px 20px;
  }
  @media all and (max-width: 440px) {
    padding-bottom: 80px;
  }
`;

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid #e3e8ef;
  max-width: 948px;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;
  justify-content: flex-start;
`;

const Heading = styled.h1`
  font-family: "gordita_medium";
  font-size: 1.5rem;
  color: #202939;
  text-align: start;
`;
const ContentContainerBox = styled.div`
  height: calc(100vh - 180px);
  overflow-y: auto;
`;
