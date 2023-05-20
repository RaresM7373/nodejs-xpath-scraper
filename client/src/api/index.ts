import axios, { AxiosInstance } from 'axios';

export class ApiService<T> {
  url: string;
  api: AxiosInstance;

  constructor(url: string) {
    this.url = url;
    this.api = axios.create({
      baseURL: 'http://localhost:4000/',
      timeout: 5000,
    });
  }

  getAll() {
    return this.api.get(this.url);
  }

  create(data: T) {
    return this.api.post(this.url, data);
  }
}
