import superagent from "superagent";
import querystring from "querystring";
import config from "../config";
// 错误提示
const networkErr = "网络请求超时";
const http = {
  formatData: (code, res) => {
    return new Promise((resolve, reject) => {
      if (res.status === 200) {
        let data = res.text;
        return resolve(data);
      } else {
        return reject(res.statusText);
      }
    });
  },
  get: (path, params, { url = "", port = 3005, code = false }) => {
    return new Promise((resolve, reject) => {
      let apiUrl = `${config.apiUrl}:${port}${config.apiBaseUrl}${path}`;
      if (url) {
        apiUrl = `${url}:${port}${config.apiBaseUrl}${path}`;
      }
      return superagent
        .get(apiUrl)
        .query(params)
        .then(res => {
          return http.formatData(code, res).then(resolve, reject);
        })
        .catch(err => {
          return reject(err || networkErr);
        });
    });
  },
  post: (
    path,
    params,
    { url = "", port = 8810, code = false, raw = false, file = false }
  ) => {
    return new Promise((resolve, reject) => {
      let data = params;

      let ContentType = "application/json;charset=UTF-8";
      if (file) {
        ContentType = "multipart/form-data";
      } else if (!raw) {
        data = querystring.stringify(params);
        ContentType = "application/x-www-form-urlencoded";
      }

      let apiUrl = `${config.apiUrl}:${port}${config.apiBaseUrl}${path}`;
      if (url) {
        apiUrl = `${url}:${port}${Config.apiBaseUrl}${path}`;
      }

      return instance
        .post(apiUrl)
        .set("Content-Type", ContentType)
        .send(data)
        .then(
          res => {
            return http.formatData(code, res).then(resolve, reject);
          },
          err => {
            return reject(err.msg || networkErr);
          }
        );
    });
  }
};
export default http;
