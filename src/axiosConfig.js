// First we need to import axios.js
import axios from "axios";

// Production configurations
export const prodChatBaseUrl = "wss://communication.steyp.com/";

export const prodAccountsConfig = axios.create({
  baseURL: "https://accounts.steyp.com",
});
export const prodLearnConfig = axios.create({
  baseURL: "https://learn.steyp.com/api/v1",
});
export const prodNotificationsConfig = axios.create({
  baseURL: "https://notifications.talrop.com/api/v1",
});
export const prodCoinsConfig = axios.create({
  baseURL: "https://coins.steyp.com/api/v1",
});
export const prodWebConfig = axios.create({
  baseURL: "https://api-tce.talrop.com/api/v1/web",
});
export const prodCommunicationsConfig = axios.create({
  baseURL: "https://communication.steyp.com/api/v1/",
});
export const prodCommunityConfig = axios.create({
  baseURL: "https://community.talrop.com/api/v1/",
});
export const prodPrimeprogramsConfig = axios.create({
  baseURL: "https://prime-programs.steyp.com/api/v1/",
});
export const prodChallengesConfig = axios.create({
  baseURL: "https://challenges.steyp.com/api/v1/",
});
export const prodManagersConfig = axios.create({
  baseURL: "https://api-tce.talrop.com/api/v1/",
});
export const prodStudentActivitiesConfig = axios.create({
  baseURL: "https://activities.steyp.com/api/v1/",
});
export const prodScholarshipAccountsConfig = axios.create({
  baseURL: "https://api-scholarship.steyp.com/api/v1/accounts/",
});
export const prodScholarshipCertificate = axios.create({
  baseURL: "https://api-scholarship.steyp.com/api/v1/certificate/",
});
export const prodScholarshipExamConfig = axios.create({
  baseURL: "https://api-scholarship.steyp.com/api/v1/exams/",
});
export const prodScholarshipProgramConfig = axios.create({
  baseURL: "https://api-scholarship.steyp.com/api/v1/program/",
});
export const prodScholarshipProgramsConfig = axios.create({
  baseURL: "https://api-scholarship.steyp.com/api/v1/programs/",
});

// Development configurations
// Common configurations
const devChatBaseUrl = "wss://developers-communication.talrop.com/";
const devAccountsConfig = axios.create({
  baseURL: "https://developers-accounts.talrop.com",
});
const devLearnConfig = axios.create({
  baseURL: "https://developers-learn.talrop.com/api/v1",
});
const devNotificationsConfig = axios.create({
  baseURL: "https://developers-notifications.talrop.com/api/v1",
});
const devCoinsConfig = axios.create({
  baseURL: "https://developers-coins.talrop.com/api/v1",
});
const devWebConfig = axios.create({
  baseURL: "https://developers-api-tce.talrop.com/api/v1/web",
});
const devCommunicationsConfig = axios.create({
  baseURL: "https://developers-communication.talrop.com/api/v1/",
});
const devCommunityConfig = axios.create({
  baseURL: "https://developers-community.talrop.com/api/v1/",
});
const devChallengesConfig = axios.create({
  baseURL: "https://developers-challenges.steyp.com/api/v1/",
});
const devPrimeprogramsConfig = axios.create({
  baseURL: "https://demo-prime-programs.talrop.works/api/v1/",
});
const devManagersConfig = axios.create({
  baseURL: "https://developers-managers.talrop.com/api/v1/",
});
const devStudentActivitiesConfig = axios.create({
  baseURL: "https://developers-activities.steyp.com/api/v1/",
});
export const devScholarshipAccountsConfig = axios.create({
  baseURL: "https://developers-steyp-scholarship.talrop.works/api/v1/accounts/",
});
export const devScholarshipCertificate = axios.create({
  baseURL:
    "https://developers-steyp-scholarship.talrop.works/api/v1/certificate/",
});
export const devScholarshipExamConfig = axios.create({
  baseURL: "https://developers-steyp-scholarship.talrop.works/api/v1/exams/",
});
export const devScholarshipProgramConfig = axios.create({
  baseURL: "https://developers-steyp-scholarship.talrop.works/api/v1/program/",
});
export const devScholarshipProgramsConfig = axios.create({
  baseURL: "https://developers-steyp-scholarship.talrop.works/api/v1/programs/",
});

const environment = import.meta.env.VITE_APP_ENVIRONMENT;

const accountsConfig =
  environment === "development" ? devAccountsConfig : prodAccountsConfig;
const learnConfig =
  environment === "development" ? devLearnConfig : prodLearnConfig;
const notificationsConfig =
  environment === "development"
    ? devNotificationsConfig
    : prodNotificationsConfig;
const coinsConfig =
  environment === "development" ? devCoinsConfig : prodCoinsConfig;
const webConfig = environment === "development" ? devWebConfig : prodWebConfig;
const communicationsConfig =
  environment === "development"
    ? devCommunicationsConfig
    : prodCommunicationsConfig;
const communityConfig =
  environment === "development" ? devCommunityConfig : prodCommunityConfig;
const challengesConfig =
  environment === "development" ? devChallengesConfig : prodChallengesConfig;
const primeprogramsConfig =
  environment === "development"
    ? devPrimeprogramsConfig
    : prodPrimeprogramsConfig;
const manageConfig =
  environment === "development" ? devManagersConfig : prodManagersConfig;
const studentActivitiesConfig =
  environment === "development"
    ? devStudentActivitiesConfig
    : prodStudentActivitiesConfig;
const scholarshipAccountsConfig =
  environment === "development"
    ? devScholarshipAccountsConfig
    : prodScholarshipAccountsConfig;
const scholarshipCertificate =
  environment === "development"
    ? devScholarshipCertificate
    : prodScholarshipCertificate;
const scholarshipExamConfig =
  environment === "development"
    ? devScholarshipExamConfig
    : prodScholarshipExamConfig;
const scholarshipProgramConfig =
  environment === "development"
    ? devScholarshipProgramConfig
    : prodScholarshipProgramConfig;
const scholarshipProgramsConfig =
  environment === "development"
    ? devScholarshipProgramsConfig
    : prodScholarshipProgramsConfig;
const chatBaseUrl =
  environment === "development" ? devChatBaseUrl : prodChatBaseUrl;

export {
  chatBaseUrl,
  accountsConfig,
  learnConfig,
  notificationsConfig,
  coinsConfig,
  webConfig,
  challengesConfig,
  communicationsConfig,
  communityConfig,
  primeprogramsConfig,
  manageConfig,
  studentActivitiesConfig,
  scholarshipAccountsConfig,
  scholarshipCertificate,
  scholarshipExamConfig,
  scholarshipProgramConfig,
  scholarshipProgramsConfig,
};

// #### DEVELOPER LOCAL SERVER CONFIGS #### //
// export const chatBaseUrl = "ws://192.168.0.84:8006/";
// export const accountsConfig = axios.create({
//     baseURL: "http://192.168.1.63:8000",
// });s
// export const learnConfig = axios.create({
//     baseURL: "http://192.168.1.63:8001/api/v1",
// });
// export const notificationsConfig = axios.create({
//     baseURL: "http://192.168.1.63:8003/api/v1",
// });
// export const coinsConfig = axios.create({
//     baseURL: "http://192.168.1.63:8002/api/v1",
// });
// export const webConfig = axios.create({
//     baseURL: "http://192.168.1.63:8004/api/v1/web",
// });
// export const communicationsConfig = axios.create({
//     baseURL: "http://192.168.1.63:8006/api/v1/",
// });
// export const communityConfig = axios.create({
//     baseURL: "http://192.168.1.63:8000/api/v1/",
// });
// export const challengeConfig = axios.create({
//     baseURL: "http://developers-challenges.steyp.com/api/v1/",
// });
// export const primeprogramsConfig = axios.create({
//     baseURL: "http://demo-prime-programs.talrop.works/api/v1/",
// });
// export const manageConfig = axios.create({
//     baseURL: "http://192.168.1.63:8004/api/v1/",
// });
// export const studentActivitiesConfig = axios.create({
//     baseURL: "https://192.168.1.63:8007/api/v1/",
// });
