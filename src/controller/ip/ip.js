import api from "../../api";
import fs from "fs";
import path from "path";
import userAgents from "../../services/userAgent";
import unit from "../../services/unit";
const ipPath = path.resolve(__dirname, "../../data/ip.json");
class Ip {
  getList = async (req, res) => {
    let vm = this;

    //读取ip文件
    let ipData = fs.readFileSync(ipPath);
    ipData = ipData.toString();
    ipData = ipData ? JSON.parse(ipData) : null;
    let result = [];
    //文件内容为空 存数据
    let ipResult = await vm.getIpApi(1);
    ipResult = JSON.parse(ipResult);
    ipResult = ipResult.data;

    const pages = {
      currentPage: ipResult.current_page,
      totalPage: ipResult.last_page || 1,
    };
    let ipApis = [];
    let count = 0;
    for (let page = 1; page <= pages.totalPage; page++) {
      let itemRes = await vm.getIpApi(page);
      console.log(["itemRes", itemRes]);
      try {
        itemRes = JSON.parse(itemRes);
        itemRes = itemRes.data.data;
        result.push(...itemRes);
      } catch (error) {}
      if (page === pages.currentPage) {
        console.log(JSON.stringify(result));
      }
    }
    result = result.map((item) => {
      return {
        ip: item.ip,
        port: item.port,
      };
    });
    result = unit.objectArrayReduce(ipData.concat(ipData || []), "ip");

    result = JSON.stringify(result);
    fs.writeFileSync(ipPath, result);
    res.json(result);
  };
  testIp = () => {
    //读取ip文件
    let ipData = fs.readFileSync(ipPath);
    ipData = ipData.toString();
    ipData = ipData ? JSON.parse(ipData) : null;
    let testApis = [];
    if (Array.isArray(ipData)) {
      for (let i = 0; i < ipData.length; i++) {
        const item = ipData[i];
        let userAgent = userAgents[parseInt(Math.random() * userAgents.length)];
        testApis.push({
          url: "http://www.baidu.com",
          callback: (error, res, done) => {
            console.log(["res", res]);
            if (!error) {
            }
            done();
          },
          headers: {
            ["User-Agent"]: userAgent,
          },
          // proxy: `http://${ipItem.ip}:${ipItem.port}`
        });
      }
    }
  };
  getIpApi = (
    page,
    country = "中国",
    order_by = "speed",
    order_rule = "DESC"
  ) => {
    let params = {
      page: page || 1,
      country,
      order_by,
      order_rule,
    };
    return api.getIpList(params);
  };
}

export default new Ip();
