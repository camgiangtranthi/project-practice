import { useForm, SubmitHandler, ValidationRule } from "react-hook-form";
import { Link, useNavigate  } from "react-router-dom";
import { AxiosError } from 'axios';
import { useRef, useState, useEffect } from 'react';
import "./SignUp.scss";
import authApi from "../../api/authApi";
import { SignUpData, SignUpErrorResponse } from '../../shared/models/auth';

type Inputs = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const regexPassword: ValidationRule<RegExp> = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.]).*$/;

const SignUp = () => {
  const [signUpSuccessfully, setSignUpSuccessfully] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<SignUpErrorResponse>();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const signUpData: SignUpData = {
      username: data.username,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation
    };

    try {
      const response = await authApi.signUp(signUpData);
      setSignUpSuccessfully(true);
      navigate('/sign-in');
    } catch (error) {
      const axiosError = error as AxiosError<SignUpErrorResponse>;
      if (axiosError.response) {
        setErrorMessage(axiosError.response?.data);
        setSignUpSuccessfully(false);
      }
    }
  }

    useEffect(() => {
        if (signUpSuccessfully) {
            setErrorMessage(undefined);
        }
    }, [signUpSuccessfully]);

  return (
      <div className="signup__wrapper">
        <div className="signup">
          <div className="signup__header">
            <h2 className="signup__title">Sign Up</h2>
          </div>
          <form className="signup__form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">Username </label>
            <input
                className="signup__form-input"
                {...register('username', {
                  required: 'Username is required',
                  maxLength: {
                    value: 20,
                    message: 'Username must be less than 20 characters',
                  },
                })}
            />
            {errors.username && <p className="error-message">{errors.username.message}</p>}
            {errorMessage?.errors.password && <p className="error-message">{errorMessage?.message}</p>}
            <label htmlFor="password">Password </label>
            <input
                className="signup__form-input"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value: regexPassword,
                    message:
                        'Password must be contains at least one uppercase letter, one lowercase letter and one special character.',
                  },
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  maxLength: {
                    value: 16,
                    message: 'Password must be less than 16 characters',
                  },
                })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
            {errorMessage?.errors.password && <p className="error-message">{errorMessage?.message}</p>}
            <label className="signup__form-label">Confirm password</label>
            <input
                className="signup__form-input"
                type="password"
                {...register('password_confirmation', {
                  required: 'Confirm password is required',
                  validate: (value) => value === password.current || 'The password does not match',
                })}
            />
            {errors.password_confirmation && (
                <p className="error-message">{errors.password_confirmation.message}</p>
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
