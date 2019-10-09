import axios from 'axios'
axios.defaults.timeout = 10000;
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'http://192.168.1.188:8080' : 'http://localhost:8080';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
export default {
  fetchGet(url, params = {}) {
    return new Promise((resolve, reject) => {
      console.log(url);
      axios.get(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost(url, params = {}) {
    // let config = {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'，
    //   },
    // };
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPut(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.put(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchDelete(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
