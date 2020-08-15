import film from "./film";

export default app => {
  app.use("/film", film);
};
