import film from "./film";
import ip from "./ip";
export default app => {
  app.use("/film", film);
  app.use("/ip", ip);
};
