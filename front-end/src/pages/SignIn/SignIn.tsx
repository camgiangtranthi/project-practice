import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useState, useEffect, useContext } from "react";
import "./SignIn.scss";
import { SignInErrorResponse, SignInData } from "../../shared/models/auth";
import authApi from "../../api/authApi";
import { UserContext } from "../../contexts/UserContext";

type Inputs = {
  username: string;
  password: string;
};

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState<SignInErrorResponse>();
  const [signInSuccessfully, setSignInSuccessfully] = useState<boolean>(false);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (userContext?.userReponse) {
      navigate("/");
    }
  }, [userContext?.userReponse, navigate]);

  useEffect(() => {
    if (signInSuccessfully) {
      setErrorMessage(undefined);
    }
  }, [signInSuccessfully]);

  const onSubmit: SubmitHandler<Inputs> = async (data: SignInData) => {
    await authApi
      .signIn(data)
      .then((response) => {
        setSignInSuccessfully(true);
        localStorage.setItem("current_user", JSON.stringify(response.data));
        navigate("/");
      })
      .catch((error: AxiosError<SignInErrorResponse>) => {
        setErrorMessage(error.response?.data);
        setSignInSuccessfully(false);
      });
  };

  return (
    <div className="signin__wrapper">
      <div className="signin">
        <div className="signin__header">
          <h2 className="signin__title">Sign In</h2>
        </div>
        <form
          className="signin__form"
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <label htmlFor="username">Username </label>
          <input id="username" {...register("username", { required: true })} />
          {errorMessage?.error && (
            <span className="error-message">{errorMessage?.error}</span>
          )}
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
          />
          {errorMessage?.error && (
            <span className="error-message">{errorMessage?.error}</span>
          )}
          <button className="signin__btn" type="submit">
            Sign in
          </button>
          <div className="signin__footer">
            <span>Don't have an account?</span>
            <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
