import api from "../../api";
import fs from "fs";
import path from "path";
const ipPath = path.resolve(__dirname, "../../data/ip.json");
class Ip {
  getIpList = async (req, res) => {
    //读取ip文件
    let ipData = fs.readFileSync(ipPath);
    ipData = ipData.toString();
    ipData = ipData ? JSON.parse(ipData) : null;
    //文件内容为空 存数据
    if (!ipData || ipData === "null") {
      let ipList = await this.getIpApi();
      ipList = JSON.stringify(ipList);
      fs.writeFileSync(ipPath, ipList);
    }
  };
  getIpApi(page, country = "中国", order_by = "speed", order_rule = "ASC") {
    let params = {
      page: page || 1,
      country,
      order_by,
      order_rule,
    };
    return api.getIpList(params);
  }
}

export default new Ip();
