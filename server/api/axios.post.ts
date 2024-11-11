import type { AxiosRequestConfig } from "axios";

const get = async (url: string, data?: object) => {
  const axios = (await import("axios")).default;
  return axios.get(url, data);
};

const post = async <T extends object>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig<T>
) => {
  const axios = require("axios");
  return axios.post(url, data, config);
};

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const body = await readBody(event);
  switch (query["function"]) {
    case "get":
      const getData = await get(body.url, body.data);
      return { data: getData.data, status: getData.status };
    case "post":
      const postData = await post(body.url, body.data, body.config);
      return { data: postData.data, status: postData.status };
    default:
      throw new Error(`Unsupported function: ${query["function"]}`);
  }
});
