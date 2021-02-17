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
import { ROUTES } from "consts/routes";
import { User as UserUtilities, CREATE_USER_INPUT_SCHEMA } from "utilities/user";

export class Signup extends React.Component {
    onFormSubmit = event => {
        event.preventDefault();
        const formInitiallyValid = CREATE_USER_INPUT_SCHEMA.isValidSync(
            this.state
        );
        if (formInitiallyValid == false) {
            alert("Passwords did not match");
        }else{
            UserUtilities.createUser(this.state)
            .then(() => this.props.history.push(ROUTES.Login.path)
            )
            .catch(error => {
                console.log(Object.values(error));
                this.setState({ error: Object.values(error) })
            }
            );
        }
    }
    state = { first_name: '', last_name: '', email: '', password: '', password_confirmation: '', phone: '', country_id: '', error: [] };
    render(): React.ReactNode {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div>
                    <Avatar>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
        </Typography>
                    <form onSubmit={this.onFormSubmit} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="first_name"
                                    variant="outlined"
                                    fullWidth
                                    id="first_name"
                                    label="First Name"
                                    value={this.state.first_name}
                                    onChange={e => this.setState({ first_name: e.target.value })}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="last_name"
                                    autoComplete="lname"
                                    value={this.state.last_name}
                                    onChange={e => this.setState({ last_name: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="country_id"
                                    label="country id"
                                    name="country id"
                                    value={this.state.country_id}
                                    onChange={e => this.setState({ country_id: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="phone"
                                    variant="outlined"
                                    fullWidth
                                    id="phone"
                                    label="phone"
                                    autoFocus
                                    value={this.state.phone}
                                    onChange={e => this.setState({ phone: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={this.state.email}
                                    onChange={e => this.setState({ email: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={this.state.password}
                                    onChange={e => this.setState({ password: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password confirmation"
                                    label="password confirmation"
                                    type="password"
                                    id="password_confirmation"
                                    value={this.state.password_confirmation}
                                    onChange={e => this.setState({ password_confirmation: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                </Box>
                <div >
                    <ol style={{ color: "red" }}>
                        {this.state.error.map(err => (
                            <li key={err}>{err}</li>
                        ))}
                    </ol>
                </div>
            </Container>

        );

    }
}