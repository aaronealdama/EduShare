import axios from 'axios';

export default {
    // function handles following users
    follow: function(obj) {
        axios({
            method: 'put',
            url: "api/follow",
            data: obj
        })
        .then(() => console.log("successfully followed user"))
        .catch(err => console.log(err))
    },
    // function handles following followers
    buddy: function(obj) {
        axios({
            method: 'put',
            url: "api/buddy",
            data: obj
        })
        .then(res => console.log(res.message))
        .catch(err => console.log(err));
    },
    // function that handles unfollowing a user
    remove: function(obj) {
        axios({
            method: 'put',
            url: "api/remove",
            data: obj
        })
        .then(res => console.log(res.message))
        .catch(err => console.log(err));
    }
}