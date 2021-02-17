/**
 * @author Ahmed Serag
 * @Date: 2019-6-13
 * @description Implementation of Common utilities.
 * @filename common.ts
 */
import { Payload } from "interfaces/payload";
import { ERRORS } from "consts/errors";

/**
 * check if this value not null and not undefined.
 *
 * @param {*} value an object to check if it exists or not.
 * @param {Array<string>} [keys=undefined] List of keys to look for inside the object.
 * @returns {boolean} return true if the Object and it's keys both exist.
 */
export function exist(value: unknown, keys: string[] = undefined): boolean {
  // first missing key if found
  let missingKey: string;
  let isExist = true;

  if (value === undefined || value === null) {
    isExist = false;
  }

  if (isExist && keys !== undefined && keys !== null) {
    missingKey = keys.find((key: string) => {
      return value[key] === null || value[key] === undefined;
    });
  }

  return isExist && !missingKey;
}

/**
 * check if the given value is empty.
 *
 * @param {*} value any type of object.
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEmpty(value: any) {
  return value === undefined || value === null || value.length === 0;
}

/**
 * return number in a comma separated format.
 *
 * @param {number} value a valid number to be formatted.
 * @returns {string} formatted value of the number.
 */
export function getCommaSeparatedNumber(value: number): string {
  return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null;
}

/**
 * get the part in the first array that doesn't exist in the other array.
 *
 * @template T type of the objects inside the array.
 * @param {T[]} mainArray the main array that needs manipulation.
 * @param {T[]} slice the array that needs to be excluded from the main array if found.
 * @param {string} key a unique key to compare based on it.
 * @returns {T[]} part of the array that doesn't exist in the other one.
 */
export function getDifference<T>(mainArray: T[], slice: T[], key: string): T[] {
  const modifiedArray: T[] = [];
  const map: {
    [index: string]: T;
  } = mainArray.reduce((acc, cur) => {
    acc[cur[key]] = cur;
    return acc;
  }, {});

  for (const s of slice) {
    delete map[s[key]];
  }

  for (const i in map) {
    modifiedArray.push(map[i]);
  }

  return modifiedArray;
}

/**
 * compare between date hours
 *
 * @param {*} dt2
 * @param {*} dt1
 * @returns
 */
export function getHoursDifference(dt2, dt1) {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
}

/**
 * extract set of values assigned to a specific key
 * in Fragment part in the url.
 *
 * @param {string} key key/name of the parameter.
 * @param {string} search search part in the UrlFragment.
 * @returns {Array<string>} values related to the provided key.
 */
export function getParamFromSearchUrl(key: string, search: string): string[] {
  let paramValues: string[] = [];
  let params: string[];

  if (exist(key) && exist(search) && search.length > 0) {
    params =
      search[0] === "?" ? search.substr(1).split("&") : search.split("&");
    paramValues = params.filter((param: string): boolean => {
      return param.indexOf(`${key}=`) === 0;
    });
  }

  return paramValues.map((paramValue: string): string => {
    return paramValue.substr(key.length + 1);
  });
}

/**
 * handle errors occurred in the system before
 * displaying them to the user.
 *
 * @param {*} error an error happened in the process.
 * @returns {Array<string>} array of error messages to be displayed.
 */
export function handleError(error: unknown): string[] {
  let errors: string[] = [];

  switch (typeof error) {
    case "string":
      errors.push(error);
      break;
    case "object":
      for (const key in error) {
        errors = [...errors, ...handleError(error[key])];
      }
      break;
    default:
      errors.push(ERRORS.unexpected);
  }

  return errors;
}

/**
 * Convert 24h time format to 12 time format.
 *
 * @param {string} time a string that contains 24h time format.
 * @returns {string} equivalent value with 12h format.
 */
export function convertTime(time: string): string {
  const timeSlots = time.split(":");
  let convertedTime: string;

  if (Number(timeSlots[0]) < 12) {
    timeSlots.pop();
    convertedTime = `${timeSlots.join(":")} AM`;
  } else {
    timeSlots[0] = `${Number(timeSlots[0]) - 12}`;
    timeSlots.pop();
    convertedTime = `${timeSlots.join(":")} PM`;
  }

  return convertedTime;
}

/**
 * get data from payload.
 *
 * @export
 * @template T Type of the payload.
 * @param {Payload<T>} payload Payload to extract data from.
 * @returns {Promise<T>} Promise to return the data from the payload.
 */
export function getPayloadData<T extends unknown = unknown>(
  payload: Payload<T>
): Promise<T> {
  if (!exist(payload)) {
    return Promise.reject();
  }

  if (!exist(payload.data)) {
    return Promise.reject(payload.errors);
  }

  return Promise.resolve(payload.data);
}
