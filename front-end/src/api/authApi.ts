import axiosClient from "../shared/axios-client/axiosClient";
import {SignUpData, SignUpInfoResponse} from "../shared/models/auth";
import {UserResponse} from "../shared/models/user";

class Inputs {

}

const authApi = {
    signUp(data: SignUpData): Promise<SignUpInfoResponse> {
        const url = `/sign-up`;
        return axiosClient.post(url, data);
    },
    signIn(data: Inputs): Promise<UserResponse> {
        const url = `/sign-in`;
        return axiosClient.post(url, data);
    },
}

export default authApi;