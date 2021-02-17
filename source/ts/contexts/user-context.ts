import * as React from "react";
import { User } from "../definitions/interfaces/user";

/**
 * User Context holding logged in user details
 */
export const USER_CONTEXT: React.Context<{
  /**
   * created user from BE.
   */
  user?: User;
  /**
   * a function to update current user
   */
  updateUser: (user: User, isLoggedIn?: boolean) => void;

  /**
   * refetch current user.
   */
  refreshUser: () => Promise<User>;
  /**
   * timestamp of the last time the user tried to login.
   * should be used in resend verification/login requests.
   */
  lastLogin?: number;
  /**
   * a boolean which is true if the user is loading.
   */
  isLoading?: boolean;

  /**
   * a boolean which is true if the user is logged in
   */
  isLoggedIn?: boolean;
}> = React.createContext({
  updateUser: null,
  refreshUser: null
});
