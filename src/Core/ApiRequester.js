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

    isSnapshotReady(){
        return axios.get(`${this.serverURL}/save/snapshot/ready`)
        .then(res => {
        const text = res.data;
        return text;
      })
    }

    createSnapshot(){
      return axios.get(`${this.serverURL}/save/snapshot`);
    }    

    download(){
      window.open(`${this.serverURL}/save/download`, "_blank");     
    }

    isSeverUp(){
      return axios.get(`${this.serverURL}/server/started`);
    }

    startServer(passwd){
      return axios.post(`${this.serverURL}/server/start`,{password:passwd});
    }

    stopServer(passwd){
      return axios.post(`${this.serverURL}/server/shutdown`,{password:passwd});
    }
  }

export default ApiRequester;