import axios from 'axios'

export default {
  find: function (user) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: "api/find",
        data: user,
      })
        .then((res) => resolve(res))
        .catch((res) => reject(res));
    });
  },
  signup: function (user) {
    axios({
      method: "post",
      url: "api/newUser",
      data: user,
    })
      .then((res) => console.log(res))
      .catch((res) => console.log(res));
  },
};
