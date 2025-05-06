// First we need to import axios.js
import axios from "axios";

// Production configurations

const environment = import.meta.env.VITE_APP_ENVIRONMENT;

const prodChatBaseUrl = "wss://communication.steyp.com/";
const devChatBaseUrl = "wss://developers-communication.talrop.com/";


const prodServerConfig = axios.create({
  baseURL: "https://accounts.steyp.com",
});

const demoServerConfig = axios.create({
  baseURL: "https://accounts.steyp.com",
});

const localServerConfig = axios.create({
  baseURL: "https://accounts.steyp.com",
});

const serverConfig =
  environment === "development" ? demoServerConfig : environment === "production" ? prodServerConfig : localServerConfig;

const chatBaseUrl =
  environment === "development" ? devChatBaseUrl : prodChatBaseUrl;

export {
  serverConfig,
  chatBaseUrl
};


