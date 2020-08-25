import http from "../services/http";
import parse from "../services/parse.js";

import config from "../config/index";
// 公共接口
const services = config.apiConfig.commonBase;
const services1 = {
  url: "http://localhost",
  port: 3005,
};
let api = {
  /********************* www.1156zy.com api *****************/

  // 列表查询
  getList: (params) => {
    return new Promise((resolve, reject) => {
      http.get("", params, services).then(
        (res) => {
          return resolve(parse.parseListHtml(res || ""));
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
  // 列表搜索
  searchList: (params) => {
    return new Promise((resolve, reject) => {
      http.get("?m=vod-search", params, services).then(
        (res) => {
          return resolve(parse.parseListHtml(res).body);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
  getListItem: (params) => {
    return new Promise((resolve, reject) => {
      http.get("", params, services).then(
        (res) => {
          return resolve(parse.parseItemHtml(res));
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
  /********************* www.245bt.com api *****************/
  // 获得tabs列表
  get245BtHeader: (params) => {
    return new Promise((resolve, reject) => {
      return http.get("", params, services1).then(
        (res) => {
          return resolve(parse.parse245BtHeader(res));
          // return resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
  // 根据tab 拉取list
  get245BtTabData: (prefix, params) => {
    return new Promise((resolve, reject) => {
      http.get(prefix, params, services1).then(
        (res) => {
          return resolve(parse.parse245BtListHtml(res));
          // return resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
  // 获得明细详情
  get245BtListItem: (path) => {
    return new Promise((resolve, reject) => {
      http.get(path, {}, services1).then(
        (res) => {
          return resolve(parse.parse245BtItemHtml(res));
          // return resolve(res)
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
  // 解析视频url
  get245BtPlayerUrl: (path) => {
    return new Promise((resolve, reject) => {
      http.get(path, {}, services1).then(
        (res) => {
          return resolve(parse.parser245BtPlayerUrl(res));
          // return resolve(res)
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
  // 模糊搜索
  search245BtBykeywords: (prefix, params) => {
    return new Promise((resolve, reject) => {
      http.get(prefix, params, services1).then(
        (res) => {
          return resolve(parse.parse245BtSearchList(res));
          // return resolve(res)
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
  /**
   * 参数名	     数据类型	  必传	说明	   例子
      page	      int	      N	  第几页	  1
      country	   string	    N 	所属国	  中国,美国
      isp	       string	    N	  ISP	      电信,阿里云
      order_by	 string	    N	  排序字段  speed:响应速度,validated_at:最新校验时间 created_at:存活时间
      order_rule string     N	  排序方向	DESC:降序 ASC:升序
   */
  //获取代理ip
  getIpList: (params) => {
    return http.get("", params, {
      url: "http://ip.jiangxianli.com/api/proxy_ips",
      port: "",
    });
  },
};
module.exports = api;
