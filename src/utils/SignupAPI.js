const axios = require('axios');

export default {
    find: function(user) {
        console.log(user);
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/find',
                data: user
            })
            .then(res => resolve(res))
            .catch(res => reject(res))
        })
        
    },
    signup: function(user) {
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/newUser',
            data: user
        })
        .then(res => console.log(res))
        .catch(res => console.log(res))
    }
}