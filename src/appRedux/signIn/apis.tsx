import ApiHandler, {BASE_URL} from '@services/remote/apiHandler';

export const loginApi = (params) =>
  ApiHandler.request({
    url: `${BASE_URL}/oauth/token`,
    method: 'POST',
    body: params,
  });

export const loginSocialApi = (params) =>
  ApiHandler.request({
    url: `${BASE_URL}/api/v1/auth/verify`,
    method: 'POST',
    body: params,
  });

export const logoutApi = () => {
  return ApiHandler.request({
    url: `${BASE_URL}/api/v1/users/logout`,
    method: 'POST',
  });
};
