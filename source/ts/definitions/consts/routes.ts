/**
 * @author Ahmed Serag
 * @date 2019-07-15
 * @description declaration of available routes in the app.
 * @filename routes.ts
 */
import { Home } from "layouts/home";
import { Login } from "layouts/login";
import { Profile } from "layouts/profile";
import { NotFound } from "layouts/not-found";
import { Header } from "layouts/header";
import  history  from "utilities/history";


/**
 * map of available routes in the app to their locations in the url.
 */
export const ROUTES = {
  // Add Available Routes with it's Components and other details

  Home: {
    component: Home,
    // eslint-disable-next-line object-curly-newline
    props: {
      // Add Special Props to the component if needed
      // eslint-disable-next-line object-curly-newline
    },
    path: "/",
    exact: true
  },
  Profile: {
    component: Profile,
    // eslint-disable-next-line object-curly-newline
    props: {
      // Add Special Props to the component if needed
      // eslint-disable-next-line object-curly-newline
    },
    path: "/profile",
    exact: true
  },
  Header: {
    component: Header,
    // eslint-disable-next-line object-curly-newline
    props: {
      // Add Special Props to the component if needed
      // eslint-disable-next-line object-curly-newline
    },
    path: "/header",
    exact: false
  },
  Login: {
    component: Login,
    // eslint-disable-next-line object-curly-newline
    props: {
      // Add Special Props to the component if needed
      // eslint-disable-next-line object-curly-newline
    },
    path: "/login",
    exact: true
  },
  NotFound: {
    component: NotFound,
    exact: false
  },

};
