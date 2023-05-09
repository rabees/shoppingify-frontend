import axios from "axios";
const API = process.env.REACT_APP_API;
class ListServices {
  createList(list) {
    return axios.post(API + "/shopList/", list);
  }
  getLists() {
    return axios.get(API + "/shopList/");
  }
  getTopSaleByField(field) {
    return axios.get(API + "/shopList/topItemsByField/" + field);
  }
  getTopSelledByMonth() {
    return axios.get(API + "/shopList/topProductsByMonth");
  }
  getSingleList(id) {
    return axios.get(API + "/shopList/" + id);
  }
}

export default new ListServices();
