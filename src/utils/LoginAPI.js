const axios = require('axios');

export default {
    login: function(user) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: '/api/login',
                data: user
            })
            .then(res => resolve(res))
            .catch(res => reject(res));
        });
    }
};