export interface UserRequest {
  email: string;
  password: string;
}
export interface User {
  id: string;
  username: string;
  firstname?: string;
  lastname?: string;
  avatar?: string;
  email: string;
  password: string;
}

export interface UserResponse {
  data: any;
  user: User;
  token: string;
}

export interface UserLocal {
  user: User;
}
