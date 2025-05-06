import React, { useEffect, useMemo, useState } from "react";
import ControlPanal from "../components/ControlPanal";
import styled from "styled-components";
import LanguageSettings from "../components/LanguageSettings";
import NotificationSettings from "../components/NotificationSettings";
import {
  serverConfig,
  serverConfig,
} from "../../../axiosConfig";
import { useSelector } from "react-redux";

function MySttings() {
  const [tabType, setTabType] = useState({
    type: "language_preference",
    title: "Language Preference",
    index: 0,
  });
  const [settingData, setSettingData] = useState([]);
  const [language, setLanguage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [contentLanguage, setContentLanguage] = useState([]);
  const [selectedParentAppLanguage, setSelectedParentAppLanguage] =
    useState("");
  const [selectedContentLanguage, setSelectedContentLanguage] = useState("");

  const {
    user_data: { access_token },
  } = useSelector((state) => state);

  const parentData = {
    id: 1,
    title: "Steyp Parent App Language",
    description:
      "Changing the language here will update the entire Parent App.",
    selected_language: { name: selectedParentAppLanguage },
    name: "parent_app_language",
    key_slug: "parentapp_language_slug",
  };

  const contentData = {
    id: 2,
    title: "Content Language",
    description: "Choose your preferred language for all Steyp video content.",
    selected_language: { name: selectedContentLanguage },
    name: "content_language",
    key_slug: "preffered_language_slug",
  };

  const handleSubmit = async (key_slug, Language) => {
    const formData = new FormData();
    formData.append(key_slug, Language?.name.toLowerCase());

    try {
      const response = await serverConfig.post(
        "api/v1/users/profile/change/user-preffered-language/",
        formData,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      const { status_code, message } = response.data;

      if (status_code === 6000) {
        console.log("Success:", message);
      } else {
        console.error("Error:", message);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  const fetchNotificationSettings = async () => {
    try {
      const response = await serverConfig.get(
        "/main/list-notifications-groups/",
        {
          headers: { Authorization: `Bearer ${access_token}` },
          params: {
            q:
              tabType?.type === "community"
                ? "community"
                : tabType?.type === "learning"
                ? "learning"
                : tabType?.type === "leaderboard"
                ? "leaderboard"
                : tabType?.type === "community"
                ? "community"
                : "",
          },
        }
      );
      const { status_code, data } = response.data;
      if (status_code === 6000) {
        setLanguage(data);
      }
      if (status_code === 6001) {
        setSettingData([]);
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchNotificationSettings();
  }, [tabType]);

  const handleNotification = async (id) => {
    try {
      const response = await serverConfig.post(
        `main/add-user-preference-notification/${id}/`,
        null, // No body required for this API
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      const { status_code, message } = response.data;

      if (status_code === 6000) {
        fetchNotificationSettings();
        console.log("Notification toggled successfully:", message);
      } else {
        console.error("Failed to toggle notification:", message);
      }
    } catch (error) {
      console.error("Error toggling notification:", error);
      throw error; // Re-throw to handle it in the calling function
    }
  };

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const response = await serverConfig.get("/general/all-languages/", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            type: "content_languages",
          },
        });
        const { status_code, data } = response.data;
        if (status_code === 6000) {
          setSettingData(data);
        } else {
        }
      } catch (error) {}
    };
    const fetchprefferedLanguage = async () => {
      try {
        const response = await serverConfig.get(
          "/api/v1/users/profile/list/user-preffered-language/",
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );
        const { status_code, data } = response.data;
        if (status_code === 6000) {
          setSelectedParentAppLanguage(data?.parentapp_language);
          setSelectedContentLanguage(data?.preffered_language);
        } else {
        }
      } catch (error) {}
    };

    fetchLanguage();
    fetchprefferedLanguage();
  }, []);

  const menuData = useMemo(
    () => ({
      menu: [
        {
          title: "Language Preference",
          type: "language_preference",
          children: (
            <>
              {/* <LanguageSettings
                data={parentData}
                onSelectLanguage={setSelectedLanguage}
                selectedLanguage={selectedLanguage}
                languageData={settingData}
                handleSubmit={handleSubmit}
              /> */}
              <LanguageSettings
                data={contentData}
                onSelectLanguage={setContentLanguage}
                selectedLanguage={contentLanguage}
                languageData={settingData}
                handleSubmit={handleSubmit}
              />
            </>
          ),
        },
        // {
        //   title: "Notifications",
        //   type: "notifications",
        //   subMenu: [
        //     {
        //       title: "Community",
        //       type: "community",
        //       children: (
        //         <>
        //           <NotificationSettings
        //             notificationData={language}
        //             handleNotification={handleNotification}
        //             content={{
        //               title: "Community",
        //             }}
        //           />
        //         </>
        //       ),
        //     },
        //     {
        //       title: "Learning",
        //       type: "learning",
        //       children: (
        //         <NotificationSettings
        //           notificationData={language}
        //           handleNotification={handleNotification}
        //           content={{
        //             title: "Learning",
        //           }}
        //         />
        //       ),
        //     },
        //   ],
        // },
      ],
    }),
    [selectedLanguage, contentLanguage, language]
  );

  return (
    <>
      <Main>
        <ControlPanal
          menuData={menuData}
          setTabType={setTabType}
          tabType={tabType}
        />
        <RightBox>
          {menuData.menu.find((menu) => menu.type === tabType?.type)
            ?.children ||
            menuData.menu
              .flatMap((menu) => menu.subMenu || [])
              .find((subMenu) => subMenu.type === tabType?.type)?.children}
        </RightBox>
      </Main>
    </>
  );
}

export default MySttings;
const Main = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  @media all and (max-width: 440px) {
    gap: 4px;
  }
`;
const RightBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
