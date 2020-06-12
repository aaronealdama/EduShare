import axios from 'axios';

export default {
    send: function(obj) {
        axios({
            method: 'post',
            url: 'api/send/email',
            data: obj
        })
    }
}