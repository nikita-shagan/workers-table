import Api from "./Api";
import {MAIN_API_URL, mockData} from "../constants/constants";

class MockiApi extends Api {
  get_workers(month) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockData);
      }, 300);
    });
  }
}

const mockiApi = new MockiApi(MAIN_API_URL);
export default mockiApi;
