// 服务接口地址
const services = {
  commonBase: {
    url: "http://192.168.1.90",
    port: 3006
  }
};
// 数据库链接信息
let dbconfig = {
  //mongbodb配置
  development: {
    url: "localhost:27017/film",
    user: "root",
    password: "123456"
  },
  production: {
    url: "api.blog.chenzhen:27017/film",
    user: "root",
    password: "123456"
  },
  uat: {
    url: "api.blog.chenzhen:27017/film",
    user: "root",
    password: "123456"
  }
};
dbconfig = dbconfig[process.env.NODE_ENV];
module.exports = {
  apiUrl: "http://api.1156zy.chenzhen.work",
  apiBaseUrl: "",
  apiConfig: services,
  dbconfig
};
