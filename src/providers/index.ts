import axios from "axios";
import https from "https";

axios.defaults.httpAgent = new https.Agent({
  rejectUnauthorized: false,
});
export const Api = axios.create({
  baseURL: "https://erp.api-smartcomerci.com.br",
  //baseURL:'http://147.182.128.186'
});
