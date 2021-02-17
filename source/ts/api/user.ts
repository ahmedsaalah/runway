import { Payload } from "interfaces/payload";
import { PhoneVerificationInput } from "interfaces/inputs/phone-verification-input";
import { UserInput } from "interfaces/inputs/user-input";
import { User as UserInterface } from "interfaces/user";
import { exist as _exist } from "utilities/common";
import { Network } from "./network";
import { ENDPOINTS } from "./endpoints";

/**
 * implement user related calls.
 */
export class User {
  /**
   * call create/login endpoint to create a new user.
   *
   * @param input new user info.
   */
  public static createUser(input: UserInput): Promise<Payload<UserInterface>> {
    const promise = Network.fetch(
      `${process.env.API_ENDPOINT}${ENDPOINTS.createUser.path}`,
      {
        method: ENDPOINTS.createUser.method,
        body: JSON.stringify(input),
      }
    );

    return promise;
  }

  /**
   * Fetch current loggedIn user details
   *
   */
  public static getCurrentUser(): Promise<Payload<UserInterface>> {
    const userToken = localStorage.getItem(process.env.ACCESS_TOKEN_KEY);
    let promise: Promise<Payload<UserInterface>> = userToken
      ? Promise.resolve(null)
      : Promise.reject();

    promise = promise.then(() => {
      return Network.fetch(
        `${process.env.API_ENDPOINT}${ENDPOINTS.CurrentUser.path}`,
        { method: ENDPOINTS.CurrentUser.method }
      );
    });

    return promise;
  }

  /**
   * call create/login endpoint to create a new user.
   *
   * @param input new user info.
   */
  public static authenticateUser(
    input: UserInput
  ): Promise<Payload<UserInterface>> {
    let promise = Network.fetch(
      `${process.env.API_ENDPOINT}${ENDPOINTS.AuthenticateUser.path}`,
      {
        method: ENDPOINTS.AuthenticateUser.method,
        body: JSON.stringify(input),
      }
    );

    promise = promise.then((payload) => {
      if (_exist(payload?.data, ["access_token"])) {
        localStorage.setItem(
          process.env.ACCESS_TOKEN_KEY,
          payload.data.access_token
        );
      }

      return payload;
    });

    return promise;
  }

  /**
   * call create/login endpoint to create a new user.
   *
   * @param input new user info.
   */
  public static authenticateSocialUser(
    token: string, driver:string
  ): Promise<Payload<UserInterface>> {
    let input = {
      "token": token,
    }
    let promise = Network.fetch(
      `${process.env.API_ENDPOINT}${ENDPOINTS.SocialLogin.path(driver)}`,
      {
        method: ENDPOINTS.SocialLogin.method,
        body: JSON.stringify(input),
      }
    );

    promise = promise.then((payload) => {
      if (_exist(payload?.data, ["access_token"])) {
        localStorage.setItem(
          process.env.ACCESS_TOKEN_KEY,
          payload.data.access_token
        );
      }

      return payload;
    });

    return promise;
  }
  /**
   * call logout for user.
   *
   */
  public static invalidateUser(): Promise<Payload<UserInterface>> {
    let promise = Network.fetch(
      `${process.env.API_ENDPOINT}${ENDPOINTS.InvalidateUser.path}`,
      {
        method: ENDPOINTS.InvalidateUser.method,
      }
    );

    promise = promise.then((payload) => {
      localStorage.removeItem(process.env.ACCESS_TOKEN_KEY);

      return payload;
    });

    return promise;
  }
}
