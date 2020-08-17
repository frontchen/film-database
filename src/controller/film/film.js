import FilmModel from "../../models/film/film";
import api from "../../api";
import fs from "fs";
import path from "path";
import crawler from "../../services/crawler";
import parse from "../../services/parse";
import userAgents from "../../services/userAgent";
const headerPath = path.resolve(__dirname, "../../data/header.json");
const bodyPath = path.resolve(__dirname, "../../data/body.json");
const listPath = path.resolve(__dirname, "../../data/list.json");
const ipPath = path.resolve(__dirname, "../../data/ip.json");
class Film {
  getList = async (req, res) => {
    let vm = this;
    //读取header文件
    let headerData = fs.readFileSync(headerPath);
    headerData = headerData.toString();
    headerData = headerData ? JSON.parse(headerData) : null;
    //文件内容为空 存数据
    if (!headerData || headerData === "null") {
      let headerList = await this.getHeader();
      headerList = JSON.stringify(headerList);
      fs.writeFileSync(headerPath, headerList);
    }

    //读取body文件
    let bodyData = fs.readFileSync(bodyPath);
    bodyData = bodyData.toString();
    bodyData = bodyData ? JSON.parse(bodyData) : null;
    //文件内容为空 存数据
    if (!bodyData || bodyData === "null") {
      let bodyList = [];
      let bodyApis = headerData.map(item => {
        return this.getBodyList(item.path);
      });
      Promise.all(bodyApis).then(res => {
        bodyList = JSON.stringify(res);
        fs.writeFileSync(bodyPath, bodyList);
      });
    }
    let bodyPages = (bodyData || []).map((v, i) => {
      return {
        currentPage: v.currentPage,
        totalPage: v.totalPage,
        path: headerData[i].path
      };
    });
    let baseUrl = `http://localhost:3005`;
    //读取list文件
    let listData = fs.readFileSync(listPath);
    listData = listData.toString();
    listData = listData ? JSON.parse(listData) : null;
    //文件内容为空 存数据
    if (!listData || listData === "null") {
      let result = "";
      let allListApis = [];
      let count = 0;
      for (let i = 0; i < bodyPages.length; i++) {
        const item = bodyPages[i];
        const totalPage = Number(item.totalPage);
        for (let page = 0; page < totalPage; page++) {
          let path = `${baseUrl}${item.path}`;
          if (page > 1) {
            let newPath = item.path.split(".");
            newPath[0] = `${newPath[0]}-${i}`;
            path = newPath.join(".");
            path = `${baseUrl}${path}`;
          }
          let ipItem = vm.getProxyIp();
          let userAgent =
            userAgents[parseInt(Math.random() * userAgents.length)];
          allListApis.push({
            url: path,
            callback: (error, res, done) => {
              if (!error) {
                result += res.body || "";
              }
              done();
            },
            headers: {
              ["User-Agent"]: userAgent
            },
            proxy: `http://${ipItem.ip}:${ipItem.port}`
          });
        }
      }
      crawler.queue(allListApis);
      // crawler.on("schedule", function(options) {

      //   options.proxy = `http://${ipItem.ip}:${ipItem.port}`;
      // });
      crawler.on("request", function(options) {
        count += 1;
        console.log(`当前请求第${count}次`);
      });
      /** 队列全部运行完调用 */
      crawler.on("drain", () => {
        result = parse.parse245BtListHtml(result);
        result = result.reduce((cur, next) => {
          return (cur.body || []).concat(next.body || []);
        }, {});
        result = JSON.stringify(result);
        fs.writeFileSync(listPath, result);
        res.json(result);
      });
    }

    res.json(bodyData);
  };

  getHeader = async () => {
    let headerList = await api.get245BtHeader({}).catch(err => {
      console.log(["header", err]);
    });
    return headerList || [];
  };
  getBodyList = async path => {
    let list = [];
    if (!path) return list;
    list = await api.get245BtTabData(path).catch(err => {
      console.log(["list", err]);
    });
    return list;
  };
  getProxyIp = () => {
    //读取代理ip文件
    let ips = fs.readFileSync(ipPath);
    ips = ips.toString();
    ips = ips ? JSON.parse(ips) : null;
    if (!ips || ips === "null") {
      return "http://localhost:3005";
    }
    return ips[parseInt(Math.random() * ips.length)];
  };
}
export default new Film();
