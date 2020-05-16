import axios from  'axios';

export default {
    getUser: function(username) {
        const obj = {
            username: JSON.parse(username)
        }
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: "api/user",
                data: obj
            })
            .then(res => {
                resolve(res)
            })
            .catch(res => reject(res));
        })
    },
    getAllUsers: function() {
        return new Promise((resolve, reject) => {
            axios.get("api/users")
            .then(res => resolve(res))
            .catch(err => reject(err));
        })
    },
    updateProfile: function(username, profile, teaches, about) {
        const obj = {
            username: JSON.parse(username),
            profile_pic: profile,
            teaches: teaches,
            about: about
        }
        axios({
            method: 'put',
            url: 'api/update',
            data: obj
        })
        .then(() => {
            console.log("successfully updated profile")
        })
        .catch(err => {
            console.log(err)
        })
    }
}