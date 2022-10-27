import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useRef, useState, useEffect } from "react";
import "./SignUp.scss";
import authApi from "../../api/authApi";
import { SignUpErrorResponse } from "../../shared/models/auth";

type Inputs = {
  username: string;
  password: string;
  confirm_password: string;
};

const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d].{8,16}$/;

const SignUp = () => {
  const [signUpSuccessfully, setSignUpSuccessfully] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<SignUpErrorResponse>();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await authApi
      .signUp(data)
      .then((response) => {
        setSignUpSuccessfully(true);
      })
      .catch((error: AxiosError<SignUpErrorResponse>) => {
        setErrorMessage(error.response?.data);
        setSignUpSuccessfully(false);
      });
  };

  useEffect(() => {
    if (signUpSuccessfully) {
      navigate("/signin");
    }
  }, [signUpSuccessfully]);

  return (
    <div className="signup__wrapper">
      <div className="signup">
        <div className="signup__header">
          <h2 className="signup__title">Sign Up</h2>
        </div>
        <form
          className="signup__form"
          onSubmit={handleSubmit(onSubmit)}
          method="post"
        >
          <label htmlFor="username">Username </label>
          <input
            className="signup__form-input"
            {...register("username", {
              required: "Username is required",
              maxLength: {
                value: 20,
                message: "Username must be less than 20 characters",
              },
            })}
          />
          {errors.username && (
              <p className="error-message">{errors.username.message}</p>
          )}
          {errorMessage?.error && (
            <p className="error-message">{errorMessage?.error}</p>
          )}
          <label htmlFor="password">Password </label>
          <input
            className="signup__form-input"
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: regexPassword,
                message:
                  "Password must be contains at least one uppercase letter, one lowercase letter and between 8-16 characters.",
              },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              maxLength: {
                value: 16,
                message: "Password must be less than 16 characters",
              },
            })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
          <label className="signup__form-label">Confirm password</label>
          <input
            className="signup__form-input"
            type="password"
            {...register("confirm_password", {
              required: "Confirm password is required",
              validate: (value) =>
                value === password.current || "The password does not match",
            })}
          />
          {errors.confirm_password && (
            <p className="error-message">{errors.confirm_password.message}</p>
          )}
          <button className="signup__btn">Create account</button>
          <div className="signup__footer">
            <span>Already have an account?</span>
            <Link to="/signin">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
