import axios from 'axios';

export default {
    // function handles following users
    follow: function(obj) {
        axios({
            method: 'put',
            url: "/api/follow",
            data: obj
        })
    },
    // function handles following followers
    buddy: function(obj) {
        axios({
            method: 'put',
            url: "/api/buddy",
            data: obj
        }) 
    },
    // function that handles unfollowing a user who is a buddy
    remove: function(obj) {
        axios({
            method: 'put',
            url: "/api/remove",
            data: obj
        })
    },
    // function that handles unfollowing a user who is not buddy
    unfollow: function(obj) {
        axios({
            method: 'put',
            url: "/api/unfollow",
            data: obj
        })
    }
}