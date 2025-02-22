import { useFormik } from "formik";
import React, { useState } from "react";
import authFunctions from "../authFunctions";
import {
  Button,
  CircularProgress,
  DialogContent,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";
import logo from "../assets/images/logo.png";
import "./LoginForm.scss";
import { useAuthHooks } from "../hooks/authHook";
function LoginForm({ handleClose }) {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const { loading, ...authUtils } = useAuthHooks();

  const handleSignup = () => {
    setIsSignup(!isSignup);
    formData.setTouched(true);
    formData.resetForm();
  };
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/i.test(values.password)
    ) {
      errors.password =
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number";
    }

    if (isSignup) {
      if (!values.confirmPassword && isSignup) {
        errors.confirmPassword = "Required";
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Password does not match";
      }
    }
    return errors;
  };

  const formData = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      formData.setTouched(true);
      isSignup
        ? authUtils.registerUser(
            values.email,
            values.password,
            handleClose,
            formData,
            dispatch
          )
        : authUtils.loginUser(
            values.email,
            values.password,
            handleClose,
            formData,
            dispatch
          );
    },
  });

  return (
    <DialogContent className="dWrapper">
      <img loading="lazy" className="dialogTitleImg" src={logo} alt=""></img>
      <div className="dialogWrapper">
        <div className="form">
          <form onSubmit={formData.handleSubmit}>
            <TextField
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              autoFocus
              variant="standard"
              onBlur={formData.handleBlur}
              value={formData.values.email}
              onChange={formData.handleChange}
            />
            {formData.errors.email ? (
              <div className="errorText">{formData.errors.email}</div>
            ) : null}
            <TextField
              required
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              onBlur={formData.handleBlur}
              value={formData.values.password}
              onChange={formData.handleChange}
            />
            {formData.errors.password ? (
              <div className="errorText">{formData.errors.password}</div>
            ) : null}

            {isSignup && (
              <>
                <TextField
                  required
                  margin="dense"
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  variant="standard"
                  onBlur={formData.handleBlur}
                  value={formData.values.confirmPassword}
                  onChange={formData.handleChange}
                />
                {formData.errors.confirmPassword && isSignup ? (
                  <div className="errorText">
                    {formData.errors.confirmPassword}
                  </div>
                ) : null}
              </>
            )}
            <div className="signUpdirect">
              {isSignup ? `Already a user?` : `Don't have an account?`}
            </div>
            <div className="signUp" onClick={() => handleSignup()}>
              {isSignup ? `Login here.` : `SignUp here.`}
            </div>
            <Button
              disabled={!(formData.isValid && formData.values)}
              className="submitbutton"
              type="submit"
            > 
            {loading ? <CircularProgress fontSize="small"></CircularProgress> : (isSignup ? `Sign Up` : `Login`)}
            </Button>
            <div className="or">or</div>
            <div className="socialLogin">
              <GoogleIcon fontSize="medium" className="googleIcon"></GoogleIcon>
              <AppleIcon fontSize="medium" className="appleIcon"></AppleIcon>
              <FacebookIcon fontSize="medium"></FacebookIcon>
            </div>
          </form>
        </div>
      </div>
    </DialogContent>
  );
}

export default LoginForm;
