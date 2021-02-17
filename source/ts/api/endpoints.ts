/**
 * @author Ahmed Serag
 * @date 2019-07-16
 * @description implementation of endpoints in the api.
 * @filename endpoints.ts
 */

/**
 * set of endpoints in the API.
 */
// eslint-disable-next-line object-curly-newline
export const ENDPOINTS = {
      SocialLogin: {
        path: (driver: string) =>`/api/user/social-login/${driver}`,
        method: "POST"
      },
      AuthenticateUser:{
        path: "/api/user/login",
        method: "POST"
      },
      CurrentUser: {
        path: "/api/user",
        method: "GET"
      },
      InvalidateUser: {
        path: "/api/user/logout",
        method : "POST"
      },
      createUser: {
        path: "/api/user",
        method: "POST"
      },
};
