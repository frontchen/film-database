import Crawler from "crawler";
import parse from "../services/parse";
const crawler = new Crawler({
  maxConnections: 10, //只有在rateLimit == 0时起作用，限制并发数
  rateLimit: 0, //请求最小间隔
  timeout: 15000, //15s req无响应，req失败
  retries: 3, //重试次数，请求不成功会重试3次
  retryTimeout: 4000, //重试间隔
  // This will be called for each crawled page
  callback: function(error, res, done) {
    let result = {};
    if (error) {
      console.log(error);
    } else {
      result = parse.parse245BtListHtml(res);
    }
    done(result);
  }
});
export default crawler;
