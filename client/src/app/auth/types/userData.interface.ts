export interface UserDataInterface {
  message: string;
  user: UserInterface;
}

export interface UserInterface {
  email: string;
  id: string;
  token: string;
  country: string;
  expiresIn: number | string;
  fullName: string;
}
