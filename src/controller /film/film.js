import FilmModel from "../../models/film/film";
import api from "../../api";
class Film {
  async getList(req, res) {
    let headerList = await api.get245BtHeader({}).catch(err => {
      console.log(["header", err]);
    });

    res.json(headerList);
  }
}
export default new Film();
