import axios from 'axios';

export default {
    // function handles following users
    follow: function(obj) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'put',
                url: "/api/follow",
                data: obj
            })
            .then(res => {
                console.log("successfully followed user")
                resolve(res);
            })
            .catch(err => reject(err))
        })
        
    },
    // function handles following followers
    buddy: function(obj) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'put',
                url: "/api/buddy",
                data: obj
            })
            .then(res => {
                console.log("successfully made buddy")
                resolve(res);
            })
            .catch(err => reject(err));
        })
     
    },
    // function that handles unfollowing a user who is a buddy
    remove: function(obj) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'put',
                url: "/api/remove",
                data: obj
            })
            .then(res => {
                console.log("successfully unfollowed")
                resolve(res);
            })
            .catch(err => reject(err));
        })
      
    },
    // function that handles unfollowing a user who is not buddy
    unfollow: function(obj) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'put',
                url: "/api/unfollow",
                data: obj
            })
            .then(res => {
                console.log("successfully unfollowed");
                resolve(res);
            })
            .catch(err => reject(err));
        })
        
    }
}