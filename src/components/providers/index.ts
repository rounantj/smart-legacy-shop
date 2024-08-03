import axios from "axios";
import https from "https";

axios.defaults.httpAgent = new https.Agent({
  rejectUnauthorized: false,
});

console.log({ urlP: process.env.SMART_API })
export const Api = axios.create({
  baseURL: process.env.SMART_API,
});
