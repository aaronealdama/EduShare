import axios from 'axios';

export default {
  login: function (user) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: "api/login",
        data: user,
      })
        .then((res) => resolve(res))
        .catch((res) => reject(res));
    });
  },
  logout: function(username) {
    const obj = {
      username: JSON.parse(username)
    }
    axios({
      method: "post",
      url: "api/logout",
      data: obj
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
};
