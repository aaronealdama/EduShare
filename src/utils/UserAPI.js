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
                console.log(res);
                resolve(res)
            })
            .catch(res => reject(res));
        })
    }
}