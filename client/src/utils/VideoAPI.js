import axios from "axios";

export default {
  // function for getting all the videos
  getVideos: function () {
    return new Promise((resolve, reject) => {
      axios
        .get("api/videos")
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
  // function that posts a video
  postVideo: function (obj) {
    axios({
      method: "post",
      url: "api/post",
      data: obj,
    })
      .then(() => {
        console.log("video sucessfully posted");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // function that handles a user liking a video
  likeVideo: function (obj) {
    axios({
      method: "put",
      url: "api/like",
      data: obj,
    })
      .then(() => {
        console.log("successfully updated video");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // function that finds a specific video
  getVideo: function (obj) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: "/api/video",
        data: obj,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
};
