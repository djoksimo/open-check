import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "./modules/components/Typography";
import AppAppBar from "./modules/views/AppAppBar";
import AppForm from "./modules/views/AppForm";
import { email, required } from "./modules/form/validation";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import FormFeedback from "./modules/form/FormFeedback";
import axios from "axios";
import { Verify } from "./Verify";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

function SignUp() {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);
  const [registered, setRegistered] = React.useState(false);
  const [currentEmail, setCurrentEmail] = React.useState("");
  const [snackbarOpen, setSnackBarOpen] = React.useState(false);
  const [snackBarMsg, setSnackbarMessage] = React.useState("");

  const validate = (values) => {
    const errors = required(
      ["firstName", "lastName", "email", "password"],
      values
    );

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  const handleCloseSnackbar = () => {
    setSnackbarMessage("");
    setSnackBarOpen(false);
  };

  const handleSubmit = async (values) => {
    try {
      setCurrentEmail(values.email);
      const resp = await axios.post("http://localhost:5000/user/register", {
        ...values,
      });

      if (resp.data && resp.data.code === "UserRegistered") {
        console.log("registered...");
        setRegistered(true);
      } else {
        console.log(resp);
      }
    } catch (err) {
      console.log(err.response.data.message);
      setSnackbarMessage(err.response.data.message);
      setSnackBarOpen(true);
      console.log(err);
    }

    console.log(values);
    setSent(true);
  };

  return (
    <React.Fragment>
      <AppAppBar />

      {registered ? (
        <Verify email={currentEmail} />
      ) : (
        <AppForm>
          <React.Fragment>
            <Typography
              variant="h3"
              gutterBottom
              marked="center"
              align="center"
            >
              Sign Up
            </Typography>
            <Typography variant="body2" align="center">
              <Link
                href="/premium-themes/onepirate/sign-in/"
                underline="always"
              >
                Already have an account?
              </Link>
            </Typography>
          </React.Fragment>
          <Form
            onSubmit={handleSubmit}
            subscription={{ submitting: true }}
            validate={validate}
          >
            {({ handleSubmit: hs, submitting }) => (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("hi");
                  hs();
                }}
                className={classes.form}
                noValidate
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      autoFocus
                      component={RFTextField}
                      autoComplete="fname"
                      fullWidth
                      label="First name"
                      name="firstName"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={RFTextField}
                      autoComplete="lname"
                      fullWidth
                      label="Last name"
                      name="lastName"
                      required
                    />
                  </Grid>
                </Grid>
                <Field
                  autoComplete="email"
                  component={RFTextField}
                  disabled={submitting || sent}
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
                  required
                />
                <Field
                  fullWidth
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Password"
                  type="password"
                  margin="normal"
                />
                <FormSpy subscription={{ submitError: true }}>
                  {({ submitError }) =>
                    submitError ? (
                      <FormFeedback className={classes.feedback} error>
                        {submitError}
                      </FormFeedback>
                    ) : null
                  }
                </FormSpy>
                <FormButton
                  className={classes.button}
                  disabled={submitting || sent}
                  color="secondary"
                  fullWidth
                >
                  {submitting || sent ? "In progress…" : "Sign Up"}
                </FormButton>
              </form>
            )}
          </Form>
        </AppForm>
      )}
      <Snackbar
        autoHideDuration={6000}
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={snackBarMsg}
      />
    </React.Fragment>
  );
}

export default withRoot(SignUp);
