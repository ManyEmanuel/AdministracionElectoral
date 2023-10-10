import { boot } from "quasar/wrappers";
import axios from "axios";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: "http://sistema.ieenayarit.org:9370/api",
  //baseURL: "http://192.168.2.110:9370/api",
});
//const api = axios.create({ baseURL: "https://sistema.ieenayarit.org:9270/api" });
api.interceptors.request.use((config) => {
  config.headers = {
    //Authorization: `Bearer ${localStorage.getItem("tokenE")}`,
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjI1MmM3Yjg0LTU5ZDAtNDQwYy05MzUxLTRjYmNlZmFmZTBmMSIsImV4cCI6MTY5NzA0MzY5MX0.ZGQCxnHFEnVQ70g_xWnqdogNmTqrPYvTg-GsBRf5ZAM`,
  };
  return config;
});

/*api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status == 401) {
      alert("Su sesión ha expirado, sera redireccionado al logín");
      localStorage.clear();
      window.location = "http://sistema.ieenayarit.org:9171?return=false";
    }
    return Promise.reject();
  }
);*/

export { api };
