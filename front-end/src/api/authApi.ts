import axiosClient from "../shared/axios-client/axiosClient";
import {
  SignInData,
  SignUpData,
  SignUpInfoResponse,
} from "../shared/models/auth";
import { UserResponse } from "../shared/models/user";
import { AxiosPromise } from "axios";

const authApi = {
  signUp(data: SignUpData): AxiosPromise<SignUpInfoResponse> {
    const url = `/sign-up`;
    return axiosClient.post(url, data);
  },
  signIn(data: SignInData): AxiosPromise<UserResponse> {
    const url = `/sign-in`;
    return axiosClient.post(url, data);
  },
};

export default authApi;
