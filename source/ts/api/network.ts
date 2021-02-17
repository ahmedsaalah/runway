/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @author Ahmed Serag
 * @date 2019-07-16
 * @description implementation of network calls.
 * @filename network.ts
 */
import * as Sentry from "@sentry/react";
import { ERRORS } from "consts/errors";

/**
 * class responsible for executing network requests.
 *
 * @export
 * @class network
 */
export class Network {
  /**
   * execute a request to a given url with given options
   *
   * @static
   * @param {string} url url of the request.
   * @param {RequestInit} init set of options sent with the url.
   * @returns {Promise<any>} promise to return the Json response of the request.
   * @memberof Network
   */
  public static fetch(
    url: string,
    init: RequestInit,
    addAuth = true
  ): Promise<any> {
    console.log(url);
    return fetch(url, {
      mode: "cors",
      ...init,
      headers: Network.getHeaders(init.headers, addAuth)
    }).then((response: Response) => {
      return Network.handleResponseBasedOnStatus(response);
    });
  }

  /**
   * get headers that should be added to the request.
   *
   * @static
   * @param {HeadersInit} [originalHeaders] optional headers to be
   * added/overwrite the default headers.
   * @returns {HeadersInit} headers object that needs to be added to the request.
   * @memberof Network
   */
  public static getHeaders(
    originalHeaders?: HeadersInit,
    addAuth = true
  ): HeadersInit {
    let headers: HeadersInit = {
      "content-type": "application/json",
      accept: "application/json"
    };

    if (addAuth && localStorage.getItem(process.env.ACCESS_TOKEN_KEY)) {
      headers.Authorization = `bearer ${localStorage.getItem(
        process.env.ACCESS_TOKEN_KEY
      )}`;
    }

    headers = {
      ...headers,
      ...originalHeaders
    };

    return headers;
  }

  /**
   * handle various types of errors from network request based on response status.
   *
   * @static
   * @param {Response} response response from network request
   * @returns {Promise<any>} promise to return an error with a specific message
   * @memberof Network
   */
  private static handleResponseBasedOnStatus(
    response: Response
  ): Promise<unknown> {
    let promise: Promise<unknown>;

    switch (response.status) {
      case 200:
      case 201:
        promise = response.json();
        break;
      case 409:
        // trying to create a resource that
        // some of it's dependencies aren't available.
        promise = response.json().then(data => {
          return Promise.reject(data);
        });
        break;
      case 422:
        promise = response.json().then(data => {
          return Promise.reject(data && (data.errors || data.message));
        });
        break;
      case 401:
        // eslint-disable-next-line no-case-declarations
        const sentryEvent: Sentry.Event = {
          message: "invalid credentials",
          environment: `${process.env.sentry_environment}`,
          contexts: {
            credentials: {
              token: localStorage.getItem(process.env.ACCESS_TOKEN_KEY)
            }
          }
        };
        Sentry.captureEvent(sentryEvent);
        localStorage.removeItem(process.env.ACCESS_TOKEN_KEY);
        promise = response.json().then(data => {
          return Promise.reject(data?.message);
        });
        break;
      case 400:
        promise = response.json().then(data => {
          return Promise.reject(data.data);
        });
        break;
      default:
        promise = response.json().then(data => {
          return Promise.reject({
            message: data?.message,
            status: response.status
          });
        });
    }

    return promise.catch(error => {
      return Promise.reject(error ?? ERRORS.unexpected);
    });
  }
}
