import axios from "axios";
export const normalPost = (data, api) => {
  return axios.post(api, data);
};
export const normalGet = (api) => {
  return axios.get(api);
};
export const authGet = (api, token) => {
  return axios.get(api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const authPost = (api, data, token) => {
  return axios.post(api, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
