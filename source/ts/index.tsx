/**
 * @author Ahmed Serag
 * @date 2019-07-15
 * @description start point of the react application that uses
 * react dom to manipulate the root div.
 * @filename index.tsx
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, RouteProps } from "react-router-dom";
import { Router } from 'react-router';
import { NotFound } from "layouts/not-found";
import { ROUTES } from "./definitions/consts/routes";
import { USER_CONTEXT } from "./contexts/user-context";
import { User as UserInterface } from "./definitions/interfaces/user";
import { User as UserUtilities } from "utilities/user";
import { Header } from "layouts/header";

/**
 * state of application component.
 *
 * @interface AppState
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppState {
  /**
   * timestamp of the last time the user tried to login.
   */
  lastUserLogin?: number;
  /**
   * a boolean which is true if loading user data.
   */
  loadingUser?: boolean;
  /**
   * current logged in user
   */
  user?: UserInterface;
  /**
   * a boolean which is true if the user is logged in
   */
  isLoggedIn?: boolean;

}

/**
 * the Start point of the project.
 *
 * @class App
 * @extends {React.Component<{}, AppState>}
 */
class App extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);

    // eslint-disable-next-line object-curly-newline
    this.state = {
      isLoggedIn:false,
      // user,
      // loadingUser,
      // lastUserLogin
      // Add App State Here if any.
      // eslint-disable-next-line object-curly-newline
    };

    this.fetchCurrentUser = this.fetchCurrentUser.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
  }

  componentDidMount() {
    this.fetchCurrentUser();
  }

  fetchCurrentUser(): Promise<UserInterface> {
    this.setState({ loadingUser: true });
    return UserUtilities.getCurrentUser()
      .then(user => {
        console.log(user)
        return new Promise((resolve: (user: UserInterface) => void) => {
          this.setState(
            {
              user,
              loadingUser: false,
              isLoggedIn: true

            },
            () => resolve(user)
          );
        });
      })
      .catch(error => {
        if (error) {
          Sentry.captureException(error);
        }
        return new Promise((resolve: (user: UserInterface) => void) => {
          this.setState({ loadingUser: false,  isLoggedIn: false }, () => resolve(null));
        });
      });
  }


  /**
   * update state with current user.
   *
   * @param {User} user
   * @memberof App
   */
  updateCurrentUser(user: UserInterface, isCurrentlyLoggedIn?: boolean){
    this.setState((prevState) => {
      return {
        user,
        isLoggedIn: isCurrentlyLoggedIn ?? prevState.isLoggedIn,
      };
    });
  }

  render(): React.ReactNode {
    return (
      <USER_CONTEXT.Provider
        value={{
          user: this.state.user,
          isLoading: this.state.loadingUser,
          updateUser: this.updateCurrentUser,
          lastLogin: this.state.lastUserLogin,
          refreshUser: this.fetchCurrentUser,
          isLoggedIn: this.state.isLoggedIn
        }}
      >
        <BrowserRouter>
 
        {/* <Header/> */}
      

        <Route
                  render={(renderProps: RouteProps) => (
                    <Header {...renderProps}  />
                  )}
                />


        {/* <Header location={props.location} /> */}
          <Switch>
            {Object.keys(ROUTES).map((route, index) => {
              // tslint:disable-next-line: variable-name
                
              const Component = ROUTES[route].component;
              return (
                <Route
                  key={index}
                  path={ROUTES[route].path}
                  exact={ROUTES[route].exact}
                  render={(renderProps: RouteProps) => (
                    <Component {...renderProps} {...ROUTES[route].props} />
                  )}
                />
              );
            })}
            <Route key="not-found" render={() => <NotFound />} />
          </Switch>

        </BrowserRouter>
      </USER_CONTEXT.Provider>
    );
  }
}

/**
 * The application.
 *
 * @type {(void|Element|React.Component<*, React.ComponentState, *>)}
 */
ReactDOM.render(<App />, document.getElementById("root"));
