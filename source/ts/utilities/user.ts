
import { string, object, ObjectSchema } from "yup";
import { ERRORS } from "consts/errors";
import { User as UserAPI } from "api/user";
import { PhoneVerificationInput } from "interfaces/inputs/phone-verification-input";
import { User as UserInterface } from "interfaces/user";
import { UserInput } from "interfaces/inputs/user-input";
import { Payload } from "interfaces/payload";
import {
  getPayloadData as _getPayloadData,
  handleError as _handleError
} from "./common";
import { TypeOfShape } from "yup/lib/object";

/**
 * schema to validate the fields for code verification.
 */
export const PHONE_VERIFICATION_SCHEMA: ObjectSchema = object().shape({
  codeBox1: string()
    .required("Code1 is required")
    .matches(/^((\d*))$/i, "Please enter a valid digit"),
  codeBox2: string()
    .required("Code2 is required")
    .matches(/^((\d*))$/i, "Please enter a valid digit"),
  codeBox3: string()
    .required("Code3 is required")
    .matches(/^((\d*))$/i, "Please enter a valid digit"),
  codeBox4: string()
    .required("Code4 is required")
    .matches(/^((\d*))$/i, "Please enter a valid digit")
});

export const USER_VERIFICATION_SCHEMA: ObjectSchema = object().shape({
  verification_code: string().required("verification code"),
  phone: string().required("phone is required")
});

export const USER_INPUT_SCHEMA: ObjectSchema = object().shape({
  phone: string()
    .required("Please enter your phone number")
    .matches(/^((\d{11}))$/i, "Please enter a valid phone number"),
  name: string().required("Please enter your name"),
  // .matches(/^([a-z ]+)$/i, "Please enter a valid name"),
  email: string()
    .required("Please enter your email")
    .email("Please enter a valid email")
});

export const CREATE_USER_INPUT_SCHEMA: ObjectSchema = object().shape({
  phone: string()
    .required("Please enter your phone number")
    .matches(/^((\d{11}))$/i, "Please enter a valid phone number"),
  last_name: string().required("Please enter your name"),
  // .matches(/^([a-z ]+)$/i, "Please enter a valid name"),
  email: string()
    .required("Please enter your email")
    .email("Please enter a valid email"),
  password: string()
    .required("Please enter your password")
    .min(8),
  first_name: string()
    .matches(/^([a-zA-Z ])$/i, "Please enter a valid firstname"),
});
/**
 * a class that contains user related utilities.
 *
 * @export
 * @class User
 */
export class User {
  /**
   * create new user with new credentials
   *
   * @static
   * @param {UserInput} input
   * @returns {Promise<UserInterface>}
   */
  public static createUser(input: UserInput): Promise<UserInterface> {
    console.log(122);
    return UserAPI.createUser(input)
      .then(result => {
        return _getPayloadData(result);
      })
      .catch(error => {
        // User is trying to login/create multiple times without verifying with OTP.
        if (error?.status === ERRORS.createUser.codeAlreadySent) {
          return Promise.reject(error?.status);
        }
        return Promise.reject(_handleError(error));
      });
  }

  /**
   * get current logged in user details.
   *
   * @static
   * @returns {Promise<UserInterface>} current logged in user details
   */
  public static getCurrentUser(): Promise<UserInterface> {
    return UserAPI.getCurrentUser()
      .then(result => {
        return _getPayloadData(result);
      })
      .catch(error => {
        return Promise.reject(_handleError(error));
      });
  }

  /**
   * send a request to the api to verify user and
   * set user authentication details in the local storage.
   *
   * @static
   * @param {PhoneVerificationInput} input
   * @returns {Promise<UserInterface>}
   */
  public static verifyPhone(
    input: PhoneVerificationInput
  ): Promise<UserInterface> {
    let promise = USER_VERIFICATION_SCHEMA.isValid(input).then(
      (valid: boolean): Promise<unknown> => {
        return valid ? Promise.resolve() : Promise.reject(ERRORS.validation);
      }
    );

    promise = promise.then(() => {
      return UserAPI.verifyUser(input);
    });

    return promise
      .then((result: Payload) => {
        return _getPayloadData(result).then(
          (payloadData: { user: UserInterface }) => {
            return payloadData.user;
          }
        );
      })
      .catch(error => {
        return Promise.reject(_handleError(error));
      });
  }

  /**
   * remove current user Card.
   */
  public static removeUserCard(): Promise<UserInterface> {
    return UserAPI.removeUserCard()
      .then(result => {
        return _getPayloadData<UserInterface>(result);
      })
      .catch(error => {
        return Promise.reject(_handleError(error));
      });
  }

    /**
   * authenticate user 
   *
   * @static
   * @param {UserInput} input
   * @returns {Promise<UserInterface>}
   */
  public static authenticateUser(input: UserInput): Promise<UserInterface> {
    return UserAPI.authenticateUser(input)
      .then(result => {
        return _getPayloadData(result);
      })
      .catch(error => {
        // User is trying to login/create multiple times without verifying with OTP.
 
        return Promise.reject(_handleError(error));
      });
  }


  /**
   * authenticate user 
   *
   * @static
   * @param {UserInput} input
   * @returns {Promise<UserInterface>}
   */
  public static authenticateSocialUser(token: string, driver: string): Promise<UserInterface> {
    return UserAPI.authenticateSocialUser(token, driver)
      .then(result => {
        return _getPayloadData(result);
      })
      .catch(error => {
        // User is trying to login/create multiple times without verifying with OTP.
 
        return Promise.reject(_handleError(error));
      });
  }

   /**
   * invalidate user 
   *
   * @static
   * @param {UserInput} input
   * @returns {Promise<UserInterface>}
   */
  public static InvalidateUser(): Promise<UserInterface> {
    return UserAPI.invalidateUser()
      .then(result => {
        return _getPayloadData(result);
      })
      .catch(error => {
        // User is trying to login/create multiple times without verifying with OTP.
 
        return Promise.reject(_handleError(error));
      });
  }


}
