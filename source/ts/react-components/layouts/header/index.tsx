import React from "react";
import { USER_CONTEXT } from "contexts/user-context";
import { User as UserUtilities } from "utilities/user";
import { ROUTES } from "consts/routes";
import { RouteComponentProps, Redirect, Link } from "react-router-dom";

/**
 * React Component that renders Not-found Layout.
 *
 * @export
 * @class NotFound
 * @extends {React.Component}
 */
export class Header extends React.Component {
  declare context: React.ContextType<typeof USER_CONTEXT>;

  onLogin = () => {
    this.props.history.push(ROUTES.Login.path);
  };

  onLogout = () => {
    UserUtilities.InvalidateUser().then(() => {
      this.context.updateUser(
        {
          id: null,
          name: null,
        },
        false
      );
      this.props.history.push(ROUTES.Login.path);
    });
  };

  render(): React.ReactNode {
    return (
      <div>
        <USER_CONTEXT.Consumer>
          {(value) => {
            return (
              <>
                {value.isLoggedIn ? (
                  <div className="authentication">
                    <button onClick={this.onLogout}>Logout </button>
                  </div>
                ) : (
                  <Link to={ROUTES.Login.path} className="item">
                    login
                  </Link>
                )}
              </>
            );
          }}
        </USER_CONTEXT.Consumer>
      </div>
    );
  }
}
Header.contextType = USER_CONTEXT;
