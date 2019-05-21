import axios from "axios";

export const fetchTalks = ({ setTalks }) => {
  const data = {
    query: `query { talks { authors title status speechStatus description image id } }`
  };

  const opts = {
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    headers: {
      "content-type": "application/json"
    }
  };

  return axios
    .post("/v1/cjvw2o8ir9r8q01ghokd2aojc/master", data, opts)
    .then(res => {
      const talks = res.data && res.data.data && res.data.data.talks;
      setTalks(talks);
      return talks;
    });
};
