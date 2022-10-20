export interface SignUpData {
  username: string;
  password: string;
  confirm_password: string;
}

export interface SignInData {
  username: string;
  password: string;
}

interface UserInfo {
  id: number;
  username: string;
  email: string;
  updated_at: string;
  created_at: string;
}

export interface SignUpInfoResponse {
  data: {
    user: UserInfo;
    token: string;
  };
  message: string;
}

export interface SignUpErrorResponse {
  message: string;
  error: string;
}

export interface SignInErrorResponse {
  error: string;
}
