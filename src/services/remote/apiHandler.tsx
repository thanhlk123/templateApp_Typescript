import {ajax} from 'rxjs/ajax';

class ApiHandler {
  static request = (params) =>
    ajax({
      method: 'GET',
      ...params,
    });
}

export const BASE_URL = 'https://looop.plusteam.io';
export default ApiHandler;
