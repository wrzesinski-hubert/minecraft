import axios from 'axios';

class ApiRequester {
    constructor(serverURL){
        this.serverURL=serverURL;
    }

    getDate()
    {
        return axios.get(`${this.serverURL}/save/snapshot/last`)
        .then(res => {
        const snapshot = res.data;
        return new Date(snapshot);
      })
    }

}

export default ApiRequester;