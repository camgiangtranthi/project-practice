import { useForm, SubmitHandler,  } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from 'axios';
import { useState, useEffect } from "react";
import "./SignIn.scss";
import { SignInErrorResponse } from '../../shared/models/auth';
import authApi from "../../api/authApi";

type Inputs = {
  username: string;
  password: string;
};

const SignIn = () => {
  const [ errorMessage, setErrorMessage ] = useState<SignInErrorResponse>();
  const [ signInSuccessfully, setSignInSuccessfully ] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await authApi.signIn(data);
            setSignInSuccessfully(true);
            navigate('/');
        } catch (error) {
            const axiosError = error as AxiosError<SignInErrorResponse>;
            if (axiosError.response) {
                setErrorMessage(axiosError.response?.data);
                setSignInSuccessfully(false);
            }
        }
    }

    useEffect(() => {
        if (signInSuccessfully) {
            setErrorMessage(undefined);
        }
    }, [signInSuccessfully]);

  return (
      <div className="signin__wrapper">
        <div className="signin">
          <div className="signin__header">
            <h2 className="signin__title">Sign In</h2>
          </div>
          <form className="signin__form" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="username">Username </label>
              <input id="username" {...register("username", { required: true})} />
              {errors.username && <span className="error-message">Username is required</span>}
              {errorMessage?.errors.email && <p className="error-message">{errorMessage?.errors.email}</p>}
              <label htmlFor="password">Password </label>
              <input id="password" {...register("password", { required: true })} />
              {errors.password && <span>Password is required</span>}
              {errorMessage?.errors.password && <p className="error-message">{errorMessage?.errors.password}</p>}
              <button className="signin__btn">Sign in</button>
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