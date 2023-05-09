import axios from "axios";
const API = process.env.REACT_APP_API;
class ItemServices {
  getItems() {
    return axios.get(API + "/items");
  }
  getSingleItem(id) {
    return axios.get(API + "/items/" + id);
  }
  getCategories() {
    return axios.get(API + "/items/categories");
  }
  postItem(item) {
    return axios.post(API + "/items/", item);
  }
  deleteItem(id) {
    return axios.delete(API + "/items/" + id);
  }
}

export default new ItemServices();
