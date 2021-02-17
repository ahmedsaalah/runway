/**
 * @author Ahmed Serag
 * @date 2020-07-05
 * @description implementation of Payload interface that
 * is returned for each request.
 * @filename payload.ts
 */

/**
 * Error type returned from the API
 *
 * @export
 */
export type APIError = Record<string, string[]>;

/**
 * payload for response from the API.
 *
 * @export
 */
export interface Payload<D extends unknown = unknown> {
  /**
   * Message sent with the response.
   *
   * @type {string}
   * @memberof Payload
   */
  message: string;

  /**
   * data returned with the payload.
   *
   * @type {D}
   * @memberof Payload
   */
  data: D;

  /**
   * set of errors returned in the payload
   *
   * @type {APIError}
   * @memberof Payload
   */
  errors: APIError;
}
