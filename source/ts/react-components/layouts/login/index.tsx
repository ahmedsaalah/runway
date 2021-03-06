import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { User as UserUtilities } from "utilities/user";
import { ROUTES } from "consts/routes";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { USER_CONTEXT } from "contexts/user-context";
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login';


export class Login extends React.Component {
  declare context: React.ContextType<typeof USER_CONTEXT>;
  responseFacebook = (response) => {
    UserUtilities.authenticateSocialUser(response.accessToken, "facebook")
      .then(() =>
        this.context.refreshUser().then(() => {
          this.props.history.push(ROUTES.Profile.path)
        }
        )
      );

  }
  responseGoogle = (response) => {
    UserUtilities.authenticateSocialUser(response.accessToken, "google")
      .then(() =>
        this.context.refreshUser().then(() => {
          this.props.history.push(ROUTES.Profile.path)
        }
        )
      );

  }
  onFormSubmit = event => {
    event.preventDefault();
    UserUtilities.authenticateUser(this.state)
      .then(() =>
        this.context.refreshUser().then(() => {
          this.props.history.push(ROUTES.Profile.path)
        }
        )
      );

  }
  state = { password: '', phone: '', country_id: '' };
  render(): React.ReactNode {

    return (
      <div>
        <USER_CONTEXT.Consumer>
          {(value) => {

            return (
              <>
                {value.isLoggedIn && (

                  <Redirect to={ROUTES.Profile.path} />
                )}
              </>
            );
          }}
        </USER_CONTEXT.Consumer>


        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paper">
            <Avatar className="avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
          </Typography>
            <form className="form" onSubmit={this.onFormSubmit} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="country id"
                name="country_id"
                autoComplete="email"
                value={this.state.country_id}
                onChange={e => this.setState({ country_id: e.target.value })}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="phone"
                name="phone"
                autoComplete="email"
                value={this.state.phone}
                onChange={e => this.setState({ phone: e.target.value })}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign In
            </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>

          </Box>
          <FacebookLogin
            appId="712139389405545"
            fields="name,email,picture"
            cssClass="my-facebook-button-class"
            icon="fa-facebook"

            // onClick={componentClicked}
            callback={this.responseFacebook} />

          <GoogleLogin
            clientId="301126685240-bgredcf2ibq41uhkduj6i8fneq2ora08.apps.googleusercontent.com"
            render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
            )}
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />

        </Container>
      </div>
    );
  }
}


Login.contextType = USER_CONTEXT;