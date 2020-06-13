import axios from "axios";

export default {
  delete: function (obj) {
    return new Promise((resolve, reject) => {
      axios({
        method: "put",
        url: "api/delete/notification",
        data: obj,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
  add: function (obj) {
    axios({
      method: "put",
      url: "/api/add/notification",
      data: obj,
    });
  },
};
