import axios from 'axios';

class AxiosService {
  constructor() {
    const instance = axios.create();
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    return Promise.reject(error);
  }

  get(url, config = {}) {
    return this.instance.get(url, config);
  }

  post(url, body, config = {}) {
    return this.instance.post(url, body, config);
  }

  put(url, body, config = {}) {
    return this.instance.put(url, body, config);
  }

  delete(url, config = {}) {
    return this.instance.delete(url, config);
  }
}

export default new AxiosService();
