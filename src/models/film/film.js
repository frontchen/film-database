import mongoose from "mongoose";
const Schema = mongoose.Schema;

const filmSchema = new Schema({
  id: Number,
  sort: String, //大分类
  name: String, //剧集名称
  img_path: String, //影视图片
  title: [{ label: String, value: String }], //影视说明
  body: [{ source: String, list: [{ path: String, title: String }] }], //剧集列表
  author: String //作者
});
const Film = mongoose.model("film", filmSchema);
export default Film;
