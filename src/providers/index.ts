import axios from "axios";
import https from "https";

axios.defaults.httpAgent = new https.Agent({
  rejectUnauthorized: false,
});
export const Api = axios.create({
  baseURL: "https://api-smart-939610cb57d8.herokuapp.com",
  //baseURL:'http://147.182.128.186'
});
