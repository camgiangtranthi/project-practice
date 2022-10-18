import axiosClient from "../shared/axios-client/axiosClient";
import {SignUpData, SignUpInfoResponse} from "../shared/models/auth";

const authApi = {
    signUp(data: SignUpData): Promise<SignUpInfoResponse> {
        const url = `/sign-up`;
        return axiosClient.post(url, data);
    }
}

export default authApi;